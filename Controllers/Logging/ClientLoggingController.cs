namespace Portal.Api.Controllers.Logging;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Portal.ApplicationServices.Logging;

[Route("api/client-logs")]
[ApiController]
[Authorize]
public class ClientLoggingController : ControllerBase
{
    public ClientLoggingController(IClientLogStore logStore, IClock clock)
    {
        LogStore = logStore
            ?? throw new ArgumentNullException(nameof(logStore));

        Clock = clock
            ?? throw new ArgumentNullException(nameof(clock));
    }

    private IClientLogStore LogStore { get; }

    private IClock Clock { get; }

    [HttpPost]
    public async Task<IActionResult> ReceiveClientLogs([FromBody] List<ClientLogRequest> logs)
    {
        if (logs == null || !logs.Any())
        {
            return Ok();
        }

        var christieNumber = User.GetPatientId();

        if (string.IsNullOrEmpty(christieNumber))
        {
            return Forbid();
        }

        var correlationId = HttpContext.GetCorrelationId();
        var timestamp = Clock.UtcNow;
        var mappedLogs = logs.Select(x => new ClientLog(x.Level, x.Message)).ToList();

        await LogStore.SaveAsync(christieNumber, correlationId, timestamp, mappedLogs);

        return Ok();
    }
}

public record ClientLogRequest(string Level, string Message);