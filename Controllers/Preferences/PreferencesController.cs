namespace Portal.Api.Controllers.Preferences;

using ApplicationServices.Preferences;

using Domain.Cwp;
using Domain.Cwp.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Requests;

using Responses;

using CommunicationPreferencesResponse = Responses.CommunicationPreferencesResponse;

[Authorize]
[ApiController]
[Route("api/preferences")]
public class PreferencesController : ControllerBase
{
    public PreferencesController(
        IUserPreferenceStore userPrefs,
        ICwpQuery cwpQuery,
        ICwpUpdate cwpUpdate)
    {
        UserPrefs = userPrefs
            ?? throw new ArgumentNullException(nameof(userPrefs));

        CwpQuery = cwpQuery
            ?? throw new ArgumentNullException(nameof(cwpQuery));

        CwpUpdate = cwpUpdate
            ?? throw new ArgumentNullException(nameof(cwpUpdate));
    }

    private IUserPreferenceStore UserPrefs { get; }

    private ICwpQuery CwpQuery { get; }

    private ICwpUpdate CwpUpdate { get; }

    [HttpGet("user")]
    public async Task<IActionResult> GetUserPreferences()
    {
        var christieNumber = User.GetPatientId();

        if (string.IsNullOrWhiteSpace(christieNumber))
        {
            return Forbid();
        }

        var prefs = await UserPrefs.GetAllAsync(christieNumber);

        var response = new UserPreferencesResponse(christieNumber, prefs);

        return Ok(response);
    }

    [HttpPost("user")]
    public async Task<IActionResult> UpdateUserPreferences([FromBody] Dictionary<string, string> data)
    {
        var christieNumber = User.GetPatientId();

        if (string.IsNullOrWhiteSpace(christieNumber))
        {
            return Forbid();
        }

        foreach (var item in data)
        {
            await UserPrefs.SetAsync(christieNumber, item.Key, item.Value);
        }

        return Ok();
    }

    [HttpGet("comms")]
    public async Task<IActionResult> GetCommunicationPreferences()
    {
        var bearer = Request.GetBearerToken();

        if (string.IsNullOrWhiteSpace(bearer))
        {
            return Unauthorized();
        }

        var christieNumber = User.GetPatientId();

        if (string.IsNullOrWhiteSpace(christieNumber))
        {
            return Forbid();
        }

        var prefs =
            await CwpQuery.GetCommunicationPreferences(bearer, christieNumber);

        if (!prefs.IsSome(out var result))
        {
            return NotFound();
        }

        var response = new CommunicationPreferencesResponse(
            result.ContactViaEmail,
            result.ContactViaSms,
            result.ContactViaPost);

        return Ok(response);
    }

    [HttpPost("comms")]
    public async Task<IActionResult> UpdateCommunicationPreferences([FromBody] CommunicationPreferencesRequest request)
    {
        var bearer = Request.GetBearerToken();

        if (string.IsNullOrWhiteSpace(bearer))
        {
            return Unauthorized();
        }

        var christieNumber = User.GetPatientId();

        if (string.IsNullOrWhiteSpace(christieNumber))
        {
            return Forbid();
        }

        var command = new UpdateCommunicationPreferencesModel(
            request.ContactViaEmail,
            request.ContactViaSms,
            request.ContactViaPost);

        await CwpUpdate.UpdateCommunicationPreferences(bearer, christieNumber, command);

        return Ok();
    }
}