namespace Portal.Api.Controllers.GovNotify;
using System;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Newtonsoft.Json;

using Portal.Api.Controllers.GovNotify.Events;
using Portal.ApplicationServices.Comms;

using ILogger = Kernel.Logging.ILogger;

[Route("api/gov-notify")]
[ApiController]
[Authorize(Policy = "GovNotify_callback")]
public class GovNotifyController : ControllerBase
{
    public GovNotifyController(
        IConfiguration config,
        IGovNotifyReceiptsStore receiptStore,
        IClock clock,
        ILogger logger)
    {
        ArgumentNullException.ThrowIfNull(config);

        ReceiptStore = receiptStore
            ?? throw new ArgumentNullException(nameof(receiptStore));

        Clock = clock
            ?? throw new ArgumentNullException(nameof(clock));

        Logger = logger
            ?? throw new ArgumentNullException(nameof(logger));

        ChristieDebugBearer = config["GovNotify:AuthTokens:ChristieOnly"];
    }

    private IGovNotifyReceiptsStore ReceiptStore { get; }

    private IClock Clock { get; }

    private ILogger Logger { get; }

    private string ChristieDebugBearer { get; }

    [HttpPost("delivery-receipt")]
    public async Task<IActionResult> ProcessDeliveryReceipt([FromBody] GovNotifyDeliveryReceipt receipt)
    {
        var json = JsonConvert.SerializeObject(receipt);

        if (!string.IsNullOrWhiteSpace(ChristieDebugBearer)
            && Request.GetBearerToken() == ChristieDebugBearer)
        {
            Logger.Info($"Christie debug token used on GovNotify delivery receipt endpoint");
            return Ok(new { op = "DEBUG", payload = json });
        }

        await ReceiptStore.AddAsync(
            receipt.Id,
            receipt.To,
            receipt.NotificationType,
            json,
            Clock.UtcNow);

        return Ok();
    }
}
