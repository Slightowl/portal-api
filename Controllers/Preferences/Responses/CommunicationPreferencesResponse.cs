namespace Portal.Api.Controllers.Preferences.Responses;

public record CommunicationPreferencesResponse
{
    public CommunicationPreferencesResponse(
        bool contactViaEmail,
        bool contactViaSms,
        bool contactViaPost)
    {
        ContactViaEmail = contactViaEmail;
        ContactViaSms = contactViaSms;
        ContactViaPost = contactViaPost;
    }

    public bool ContactViaEmail { get; }

    public bool ContactViaSms { get; }

    public bool ContactViaPost { get; }
}