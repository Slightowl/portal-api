namespace Portal.Api.Controllers.Auth.Responses;
public class IsActiveResponse
{
    public static IsActiveResponse NotActive() => new(false, null);

    public static IsActiveResponse Active(AuthUser user) => new(true, user);

    private IsActiveResponse(bool isAuthenticated, AuthUser? user)
    {
        IsAuthenticated = isAuthenticated;
        User = user;
    }

    public bool IsAuthenticated { get; }

    public AuthUser? User { get; }
}
