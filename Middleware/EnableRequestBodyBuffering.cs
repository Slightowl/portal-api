namespace Portal.Api.Middleware;

public class EnableRequestBodyBuffering
{
    public EnableRequestBodyBuffering(RequestDelegate next)
    {
        Next = next;
    }

    private RequestDelegate Next { get; }

    public async Task InvokeAsync(HttpContext context)
    {
        context.Request.EnableBuffering();

        await Next(context);
    }
}
