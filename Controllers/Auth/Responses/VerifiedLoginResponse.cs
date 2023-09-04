namespace Portal.Api.Controllers.Auth.Responses;

public class VerifiedLoginResponse
{
    public VerifiedLoginResponse(
        string jwt,
        AuthUser user)
    {
        Jwt = jwt;
        User = user;
    }

    public string Jwt { get; }

    public AuthUser User { get; }
}
