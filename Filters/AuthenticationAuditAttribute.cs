namespace Portal.Api.Filters;

using Microsoft.AspNetCore.Mvc.Filters;

using Portal.Api;

using Portal.ApplicationServices.Audit.LogWriter;
using Portal.ApplicationServices.Audit.LogWriter.Items;
using Portal.ApplicationServices.Audit.LogWriter.Models;

using ILogger = Kernel.Logging.ILogger;

public class AuthenticationAuditAttribute : ActionFilterAttribute
{
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        await next();

        ILogger? logger = null;
        try
        {
            logger = context.HttpContext.RequestServices.GetRequiredService<ILogger>();
            var audit = context.HttpContext.RequestServices.GetRequiredService<IAuditLogWriter>();
            var clock = context.HttpContext.RequestServices.GetRequiredService<IClock>();

            var cid = context.HttpContext.GetCorrelationId();
            var ts = clock.UtcNow;

            context.HttpContext.Request.Body.Position = 0;

            using var reader = new StreamReader(context.HttpContext.Request.Body);
            var body = await reader.ReadToEndAsync();

            context.HttpContext.Request.Body.Position = 0;

            var item = new Audit_AuthenticationStep(
                context.HttpContext.Request.Method,
                context.HttpContext.Request.Path,
                context.HttpContext.Request.QueryString.ToString(),
                body,
                context.HttpContext.Response.StatusCode);

            var log = new LogEvent<Audit_AuthenticationStep>(cid, "auth", "auth", item, ts);

            _ = Task.Run(() => audit.LogAsync(log));
        }
        catch (Exception ex)
        {
            logger?.Fatal(
                ex,
                $"Could not write audit log entry from authentication {nameof(AuthenticationAuditAttribute)}");
        }
    }
}
