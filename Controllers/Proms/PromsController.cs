namespace Portal.Api.Controllers.Proms;
using System;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Portal.Api.Controllers.Proms.Requests;
using Portal.Proms.Domain.Completed;
using Portal.Proms.Domain.Completed.Models;
using Portal.Proms.Domain.Declines;
using Portal.Proms.Domain.Declines.Models;
using Portal.Proms.Domain.FormRequests;
using Portal.Proms.Domain.FormRequests.Models;

[Authorize]
[ApiController]
[Route("api/proms")]
public class PromsController : ControllerBase
{
    public PromsController(
        IFormRequestQuery formRequests,
        IDeclinedPromStore declinedPromStore,
        ICompletedPromStore completedPromStore,
        IClock clock
    )
    {
        this.FormRequests = formRequests ?? throw new ArgumentNullException(nameof(formRequests));
        this.DeclinedPromStore = declinedPromStore ?? throw new ArgumentNullException(nameof(declinedPromStore));
        this.CompletedPromStore = completedPromStore ?? throw new ArgumentNullException(nameof(completedPromStore));
        this.Clock = clock ?? throw new ArgumentNullException(nameof(clock));
    }

    private IFormRequestQuery FormRequests { get; }

    private IDeclinedPromStore DeclinedPromStore { get; }

    private ICompletedPromStore CompletedPromStore { get; }

    private IClock Clock { get; }

    [HttpGet]
    public async Task<IActionResult> Get()
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

        var formRequests = await this.FormRequests.GetAsync(bearer);

        var completedProms = await this.CompletedPromStore.GetAsync(christieNumber);

        var result = formRequests.Select(formRequest => MapRecentlyCompleted(formRequest, completedProms));

        return Ok(result);
    }

    [HttpGet("{token}")]
    public async Task<IActionResult> GetByToken([FromRoute] string token)
    {
        var bearer = Request.GetBearerToken();

        if (string.IsNullOrWhiteSpace(bearer))
        {
            return Unauthorized();
        }

        var option = await this.FormRequests.GetByTokenAsync(token, bearer);

        if (!option.IsSome(out var details))
        {
            return BadRequest();
        }

        var christieNumber = User.GetPatientId();

        if (string.IsNullOrWhiteSpace(christieNumber) || details.ChristieNumber != christieNumber)
        {
            return Forbid();
        }

        return Ok(details);
    }

    [HttpPost("decline")]
    public async Task<IActionResult> DeclineProm([FromBody] DeclineRequest? model)
    {
        if (model is null)
        {
            return BadRequest();
        }

        var christieNumber = User.GetPatientId();

        if (string.IsNullOrWhiteSpace(christieNumber))
        {
            return Forbid();
        }

        var details = new DeclinedProm(model.Token, model.FormName, model.Reason, Clock.UtcNow);

        await DeclinedPromStore.DeclineAsync(christieNumber, details);

        return Ok();
    }

    [HttpPost("completed")]
    public async Task<IActionResult> NewPromCompleted([FromBody] PromCompletedRequest request)
    {
        var christieNumber = User.GetPatientId();

        if (string.IsNullOrWhiteSpace(christieNumber))
        {
            return Forbid();
        }

        await CompletedPromStore.PromCompletedAsync(
            request.Token,
            request.CompositionId,
            christieNumber,
            Clock.UtcNow);

        return Ok();
    }

    private static FormRequestReadModel MapRecentlyCompleted(FormRequestReadModel formRequest, IEnumerable<CompletedProm> completedProms)
    {
        if (formRequest.Status != "Pending")
        {
            return formRequest;
        }

        var completedProm = completedProms.FirstOrDefault(x => x.Token == formRequest.Token);

        if (completedProm == null)
        {
            return formRequest;
        }

        return formRequest with
        {
            Status = "Completed",
            CompletedAt = completedProm.CompletedUtc,
            CompositionId = completedProm.CompositionId
        };
    }
}
