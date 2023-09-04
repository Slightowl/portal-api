namespace Portal.Api.Controllers.Auth;

using ApplicationServices.Extensions;

using Domain.Cwp;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Portal.Api.Controllers.Auth.Requests;
using Portal.Api.Controllers.Auth.Responses;
using Portal.Api.Filters;
using Portal.ApplicationServices.Comms;
using Portal.ApplicationServices.LoginRequests;
using Portal.ApplicationServices.LoginRequests.Models;
using Portal.ApplicationServices.Users;
using Portal.ApplicationServices.Users.Models;
using Portal.Domain.Identity;

using ILogger = Kernel.Logging.ILogger;

[Authorize]
[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    public AuthController(
        ILogger logger,
        IConfiguration config,
        IUserQuery users,
        ILoginRequestChallengeCache cache,
        IIdentityServer identity,
        IPatientComms patientComms,
        ICwpQuery cwpQuery
    )
    {
        Logger = logger
            ?? throw new ArgumentNullException(nameof(logger));

        Config = config
            ?? throw new ArgumentNullException(nameof(config));

        Users = users
            ?? throw new ArgumentNullException(nameof(users));

        Cache = cache
            ?? throw new ArgumentNullException(nameof(cache));

        Identity = identity
            ?? throw new ArgumentNullException(nameof(identity));

        PatientComms = patientComms
            ?? throw new ArgumentNullException(nameof(patientComms));

        CwpQuery = cwpQuery
            ?? throw new ArgumentNullException(nameof(cwpQuery));
    }

    private ILogger Logger { get; }

    private IConfiguration Config { get; }

    private IUserQuery Users { get; }

    private ILoginRequestChallengeCache Cache { get; }

    private IIdentityServer Identity { get; }

    private IPatientComms PatientComms { get; }

    private ICwpQuery CwpQuery { get; }

    [AllowAnonymous]
    [HttpPost("login")]
    [AuthenticationAudit]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var apiToken = await Identity.GetApiToken();

        var userDetails = await Users.FindAsync(apiToken, request.Surname, request.Postcode, request.DateOfBirth);

        if (userDetails is null || !userDetails.Any())
        {
            return BadRequest();
        }

        var isCodeChallenge = false;
        SmsCodeChallenge? smsDetails = null;
        EmailCodeChallenge? emailDetails = null;

        if (userDetails.Count == 1)
        {
            var user = userDetails.First();

            if (user.IsDeceased)
            {
                LogDeceased(user.ChristieNumber);
                return BadRequest();
            }

            var communicationPreferencesResponse = await this.CwpQuery.GetCommunicationPreferences(apiToken, user.ChristieNumber);

            var allowSms = true;
            var allowEmail = true;

            if (communicationPreferencesResponse.IsSome(out var communicationPreferences))
            {
                allowSms = !string.IsNullOrWhiteSpace(user.PhoneNumber) && communicationPreferences.ContactViaSms;
                allowEmail = !string.IsNullOrWhiteSpace(user.Email) && communicationPreferences.ContactViaEmail;
            }

            var rnd = new Random();
            var code = rnd.Next(1000000).ToString("000000");

            if (allowSms)
            {
                var number = $"***** ***{user.PhoneNumber.Substring(user.PhoneNumber.Length - 3)}";

                var numbers = new HashSet<string> { number };
                while (numbers.Count < 5)
                {
                    var r = rnd.Next(1000).ToString("000");
                    numbers.Add($"***** ***{r}");
                }

                smsDetails = new(user.ChristieNumber, code, user.PhoneNumber, number, numbers.ToList());

                isCodeChallenge = true;
            }
            else if (allowEmail)
            {
                emailDetails = new(user.ChristieNumber, code, user.Email);

                isCodeChallenge = true;
            }
        }

        var expiry = Config.GetIntOrDefault("Portal:Login:ChallengeExpiryMinutes", 15);

        var requestId = Guid.NewGuid();
        var expires = DateTime.UtcNow.AddMinutes(expiry);

        var challenge = new LoginRequestChallenge(
            requestId,
            isCodeChallenge,
            request.Surname,
            request.Postcode,
            request.DateOfBirth,
            expires,
            smsDetails,
            emailDetails);

        await Cache.SetAsync(challenge);

        if (emailDetails is not null)
        {
            var emailBody =
                $"Verification code: {emailDetails.Code}\n" +
                $"\n" +
                $"You have received this email as you are attempting to log into the My Christie, My Health portal.\n" +
                $"If this was not you, you can ignore this message.\n";

            await PatientComms.SendEmailAsync(
                emailDetails.EmailAddress,
                "My Christie, My Health Sign In Verification",
                emailBody);
        }

        var response = new LoginChallenge(
            requestId,
            isCodeChallenge,
            smsDetails?.Numbers ?? new List<string>());

        return Ok(response);
    }

    [AllowAnonymous]
    [HttpPost("send-code")]
    [AuthenticationAudit]
    public async Task<IActionResult> SendCodeViaSms([FromBody] SendCodeRequest request)
    {
        var _challenge = await Cache.GetAsync(request.RequestId);

        if (!_challenge.IsSome(out var challenge))
        {
            // fail silently as a security measure
            // TODO: logging
            return Ok();
        }

        if (challenge.SmsCodeChallenge is null
            || challenge.SmsCodeChallenge.MaskedPhoneNumber != request.Number)
        {
            // fail silently as a security measure
            // TODO: logging
            return Ok();
        }

        await PatientComms.SendSmsAsync(
            challenge.SmsCodeChallenge.PhoneNumber,
            $"Verification code: {challenge.SmsCodeChallenge.Code}");

        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("verify-code")]
    [AuthenticationAudit]
    public async Task<ActionResult<VerifiedLoginResponse>> VerifyChallengeCode([FromBody] VerifyChallengeCodeRequest request)
    {
        var apiToken = await Identity.GetApiToken();

        var _challenge = await Cache.GetAsync(request.RequestId);

        if (!_challenge.IsSome(out var challenge))
        {
            return BadRequest();
        }

        if (
            (challenge.SmsCodeChallenge is null && challenge.EmailCodeChallenge is null)
            || (challenge.SmsCodeChallenge is not null && challenge.SmsCodeChallenge.Code != request.Code)
            || (challenge.EmailCodeChallenge is not null && challenge.EmailCodeChallenge.Code != request.Code)
        )
        {
            return BadRequest();
        }

        var christieNumber = challenge.SmsCodeChallenge?.ChristieNumber
            ?? challenge.EmailCodeChallenge?.ChristieNumber;

        if (string.IsNullOrWhiteSpace(christieNumber))
        {
            return BadRequest();
        }

        var _user = await Users.GetAsync(apiToken, christieNumber);

        if (!_user.IsSome(out var user) || user.IsDeceased)
        {
            return BadRequest();
        }

        var jwt = await Identity.SignInAsync(christieNumber);

        var authUser = ToAuthUser(user);

        var response = new VerifiedLoginResponse(jwt, authUser);

        return Ok(response);
    }

    [AllowAnonymous]
    [HttpPost("verify-nhs")]
    [AuthenticationAudit]
    public async Task<ActionResult<VerifiedLoginResponse>> VerifyNhsNumber([FromBody] VerifyNhsNumberRequest request)
    {
        var apiToken = await Identity.GetApiToken();

        var _challenge = await Cache.GetAsync(request.RequestId);

        if (!_challenge.IsSome(out var challenge))
        {
            return BadRequest();
        }

        var userDetails = await Users.FindAsync(
            apiToken,
            challenge.Surname,
            challenge.Postcode,
            challenge.DateOfBirth);

        var user = userDetails.SingleOrDefault(x => x.NhsNumber.RemoveWhiteSpace() == request.NhsNumber.RemoveWhiteSpace() && !x.IsDeceased);

        if (user is null)
        {
            return BadRequest();
        }

        var jwt = await Identity.SignInAsync(user.ChristieNumber);
        var authUser = ToAuthUser(user);

        var response = new VerifiedLoginResponse(jwt, authUser);

        return Ok(response);
    }

    [HttpGet("user-details")]
    public async Task<ActionResult<AuthUser>> GetLoggedOnUserDetails()
    {
        var apiToken = await Identity.GetApiToken();

        var christieNumber = User.GetPatientId();

        if (string.IsNullOrWhiteSpace(christieNumber))
        {
            return Unauthorized();
        }

        var _user = await Users.GetAsync(apiToken, christieNumber);

        if (!_user.IsSome(out var user) || user.IsDeceased)
        {
            if (user is not null && user.IsDeceased)
            {
                LogDeceased(christieNumber);
            }

            return Unauthorized();
        }

        return Ok(ToAuthUser(user));
    }

    private static AuthUser ToAuthUser(UserDetails user)
    {
        var authUser = new AuthUser(
            user.Forename,
            user.Surname,
            user.Email,
            user.PhoneNumber,
            user.Postcode,
            user.DateOfBirth,
            user.ChristieNumber);

        return authUser;
    }

    private void LogDeceased(string christieNumber)
    {
        Logger.Warn(
            $"Trying to fetch user details for deceased patient\n" +
            $"Christie Number: '{christieNumber}'");
    }
}
