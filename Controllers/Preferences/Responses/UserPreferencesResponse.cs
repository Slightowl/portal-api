namespace Portal.Api.Controllers.Preferences.Responses;

public record UserPreferencesResponse
{
    public UserPreferencesResponse(
        string userId,
        Dictionary<string, string> preferences)
    {
        UserId =
            Ensure.NotNullOrWhitespace(userId);

        Preferences = preferences;
    }

    public string UserId { get; }

    public Dictionary<string, string> Preferences { get; }
}
