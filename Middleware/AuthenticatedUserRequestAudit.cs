namespace Portal.Api.Middleware;

using Newtonsoft.Json;

using Portal.ApplicationServices.Audit.LogWriter;
using Portal.ApplicationServices.Audit.LogWriter.Items;
using Portal.ApplicationServices.Audit.LogWriter.Models;
using Portal.Kernel.Audit;

using ILogger = Kernel.Logging.ILogger;

public class AuthenticatedUserRequestAudit
{
    public AuthenticatedUserRequestAudit(
        RequestDelegate next,
        IAuditLogWriter audit,
        IClock clock,
        ILogger logger)
    {
        Next = next;

        Audit = audit
            ?? throw new ArgumentNullException(nameof(audit));

        Clock = clock
            ?? throw new ArgumentNullException(nameof(clock));

        Logger = logger
            ?? throw new ArgumentNullException(nameof(logger));
    }

    private RequestDelegate Next { get; }

    private IAuditLogWriter Audit { get; }

    private IClock Clock { get; }

    private ILogger Logger { get; }

    public async Task InvokeAsync(HttpContext context)
    {
        if (!context.User.Identity?.IsAuthenticated ?? false)
        {
            await Next(context);
            return;
        }

        var cid = context.GetCorrelationId();

        var userId = context.User.GetPatientId() ?? "bearer";
        var userIdKey = userId == "bearer"
            ? "bearer"
            : "christie-number";

        var start = Clock.UtcNow;

        await Next(context);

        var stop = Clock.UtcNow;

        var item = new Audit_ApiRequest(
            context.Request.Method,
            context.Request.Path,
            context.Request.QueryString.ToString(),
            context.Response.StatusCode,
            stop - start);

        var log = new LogEvent<Audit_ApiRequest>(cid, userId, userIdKey, item, start);

        _ = Task.Run(() => WriteLog(log));
    }

    private async Task WriteLog<T>(LogEvent<T> log) where T : notnull, IAuditItem
    {
        try
        {
            await Audit.LogAsync(log);
        }
        catch (Exception ex)
        {
            Logger.Fatal(ex, $"Could not create audit log entry in api pipeline.\nLog:\n{JsonConvert.SerializeObject(log)}");
        }
    }
}
