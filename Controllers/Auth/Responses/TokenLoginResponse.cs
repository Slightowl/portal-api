namespace Portal.Api.Controllers.Auth.Responses;

public class TokenLoginResponse
{
    public TokenLoginResponse(
        Guid token,
        bool expired,
        string formName,
        string jwt,
        AuthUser user)
    {
        Token = token;
        Expired = expired;
        FormName = formName;
        Jwt = jwt;
        User = user;
    }

    public Guid Token { get; }

    public bool Expired { get; }

    public string FormName { get; }

    public string Jwt { get; }

    public AuthUser User { get; }
}
