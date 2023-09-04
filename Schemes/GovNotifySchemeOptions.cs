namespace Portal.Api.Schemes;

using Microsoft.AspNetCore.Authentication;

public class GovNotifySchemeOptions : AuthenticationSchemeOptions
{
    public ISet<string> AllowedTokens { get; }
        = new HashSet<string>();

    public void AddAllowedToken(string token)
    {
        if (string.IsNullOrWhiteSpace(token))
        {
            return;
        }

        AllowedTokens.Add(token);
    }
}
