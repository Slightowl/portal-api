namespace Portal.Api.Schemes;

using System.Security.Claims;
using System.Text.Encodings.Web;

using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Portal.Api;

public class GovNotifySchemeHandler : AuthenticationHandler<GovNotifySchemeOptions>
{
    public GovNotifySchemeHandler(
        IOptionsMonitor<GovNotifySchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock
    )
        : base(options, logger, encoder, clock)
    {
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        var token = Request.GetBearerToken();

        if (string.IsNullOrWhiteSpace(token) || !Options.AllowedTokens.Contains(token))
        {
            Logger.LogWarning($"Failed login attempt for Gov Notify scheme.");

            return Task.FromResult(AuthenticateResult.Fail("Unauthorized"));
        }

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, "gov-notify-callback"),
        };

        var identity = new ClaimsIdentity(claims, nameof(GovNotifySchemeHandler));

        var principal = new ClaimsPrincipal(identity);

        var ticket = new AuthenticationTicket(principal, Scheme.Name);

        return Task.FromResult(AuthenticateResult.Success(ticket));
    }
}
