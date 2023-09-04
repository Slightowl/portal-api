namespace Portal.Api.Middleware;

public class CorrelationParameters
{
    public CorrelationParameters(RequestDelegate next)
    {
        Next = next;
    }

    private RequestDelegate Next { get; }

    public async Task InvokeAsync(HttpContext context)
    {
        context.Items["correlation-id"] = Guid.NewGuid().ToString();

        await Next(context);
    }
}
