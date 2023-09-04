namespace Portal.Api.Middleware;

using System.Net.Http.Headers;

using Portal.Domain.Identity;

public class EhrReverseProxy
{
    public EhrReverseProxy(
        RequestDelegate next,
        IConfiguration config,
        IIdentityServer identityServer)
    {
        _ = config ?? throw new ArgumentNullException(nameof(config));

        Next = next;
        EhrServerBaseAddress = config.GetOrThrow("EHR:BaseUrl");

        IdentityServer = identityServer
            ?? throw new ArgumentNullException(nameof(identityServer));
    }

    private static HttpClient HttpClient { get; } = new HttpClient();

    private RequestDelegate Next { get; }

    private IIdentityServer IdentityServer { get; }

    private string EhrServerBaseAddress { get; }

    public async Task Invoke(HttpContext context)
    {
        if (!context.Request.Path.StartsWithSegments("/ehr-proxy", out var remainingPath))
        {
            await Next(context);
            return;
        }

        var targetUri =
            context.Request.QueryString.HasValue
                ? new Uri($"{EhrServerBaseAddress}{remainingPath}{context.Request.QueryString.Value}")
                : new Uri($"{EhrServerBaseAddress}{remainingPath}");

        var targetRequestMessage = CreateTargetMessage(context, targetUri);

        await UpdateAuthTokenIfRequired(context, targetRequestMessage);

        using var responseMessage = await
            HttpClient
                .SendAsync(
                    targetRequestMessage,
                    HttpCompletionOption.ResponseHeadersRead,
                    context.RequestAborted);

        context.Response.StatusCode = (int)responseMessage.StatusCode;

        CopyFromTargetResponseHeaders(context, responseMessage);

        await ProcessResponseContent(context, responseMessage);
    }

    private static HttpRequestMessage CreateTargetMessage(HttpContext context, Uri targetUri)
    {
        var requestMessage = new HttpRequestMessage();

        var requestMethod = context.Request.Method;

        if (!HttpMethods.IsGet(requestMethod) &&
            !HttpMethods.IsHead(requestMethod) &&
            !HttpMethods.IsDelete(requestMethod) &&
            !HttpMethods.IsTrace(requestMethod))
        {
            var streamContent = new StreamContent(context.Request.Body);
            requestMessage.Content = streamContent;

            foreach (var header in context.Request.Headers)
            {
                requestMessage.Content?.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
            }
        }

        foreach (var header in context.Request.Headers)
        {
            requestMessage.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
        }

        requestMessage.RequestUri = targetUri;
        requestMessage.Headers.Host = targetUri.Host;
        requestMessage.Method = new HttpMethod(context.Request.Method);

        return requestMessage;
    }

    private static void CopyFromTargetResponseHeaders(HttpContext context, HttpResponseMessage responseMessage)
    {
        foreach (var header in responseMessage.Headers)
        {
            context.Response.Headers[header.Key] = header.Value.ToArray();
        }

        foreach (var header in responseMessage.Content.Headers)
        {
            context.Response.Headers[header.Key] = header.Value.ToArray();
        }

        context.Response.Headers.Remove("transfer-encoding");
    }

    private static async Task ProcessResponseContent(HttpContext context, HttpResponseMessage responseMessage)
    {
        var content = await responseMessage.Content.ReadAsByteArrayAsync();

        await context.Response.Body.WriteAsync(content);
    }

    private static bool IsElevatedRoute(HttpContext context)
    {
        return context.Request.Path.StartsWithSegments("/ehr-proxy/composition") && HttpMethods.IsPost(context.Request.Method);
    }

    private async Task UpdateAuthTokenIfRequired(HttpContext context, HttpRequestMessage targetRequestMessage)
    {
        if (IsElevatedRoute(context))
        {
            var token = await IdentityServer.GetEhrWriteToken();
            targetRequestMessage.Headers.Authorization = AuthenticationHeaderValue.Parse($"Bearer {token}");
        }
    }
}
