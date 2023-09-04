namespace Portal.Api.Controllers.Ehr;
using System;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Portal.ApplicationServices._Infrastructure.Ehr;
using Portal.Domain.Identity;

[Route("api/ehr")]
[ApiController]
[Authorize]
public class EhrController : ControllerBase
{
    public EhrController(
        IEhrServerApi ehrApi,
        IIdentityServer identity)
    {
        EhrApi = ehrApi
            ?? throw new ArgumentNullException(nameof(ehrApi));

        Identity = identity
            ?? throw new ArgumentNullException(nameof(identity));
    }

    private IEhrServerApi EhrApi { get; }

    private IIdentityServer Identity { get; }

    [HttpGet("get-or-create")]
    public async Task<IActionResult> GetOrCreateEhrId()
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

        var ehrId = await EhrApi.GetEhrIdAsync(christieNumber, bearer);

        if (ehrId is null)
        {
            var elevatedToken = await Identity.GetEhrWriteToken();
            ehrId = await EhrApi.CreateEhrIdAsync(christieNumber, elevatedToken);
        }

        return Ok(new EhrIdResponse(ehrId));
    }
}

public record EhrIdResponse(string EhrId);