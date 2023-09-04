namespace Portal.Api.Controllers.Preferences.Requests;

public record CommunicationPreferencesRequest(
    bool ContactViaEmail,
    bool ContactViaSms,
    bool ContactViaPost
);