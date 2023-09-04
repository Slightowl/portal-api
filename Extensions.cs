namespace Portal.Api;

using System.Security.Claims;

internal static class Extensions
{
    public static string? GetBearerToken(this HttpRequest request)
    {
        return request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
    }

    public static string GetCorrelationId(this HttpContext context)
    {
        var hasId = context.Items.TryGetValue("correlation-id", out var id);

        if (hasId && id is not null)
        {
#pragma warning disable CS8603 // Possible null reference return.

            // id can't be null as we're explicitly checking above
            // no idea why the compiler isn't on board with this one

            return id.ToString();

#pragma warning restore CS8603 // Possible null reference return.
        }

        var cid = Guid.NewGuid().ToString();

        context.Items["correlation-id"] = cid;

        return cid;
    }

    public static string? GetPatientId(this ClaimsPrincipal user)
    {
        return user.FindFirst("patientId")?.Value;
    }

    public static IApplicationBuilder UseMiddleware<TMiddleware>(this IApplicationBuilder app, Func<bool> condition)
    {
        if (condition())
        {
            app.UseMiddleware<TMiddleware>();
        }

        return app;
    }
}
