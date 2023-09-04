namespace Portal.Api.Controllers.Proms.Responses;

public record TokenDetailsResponse
{
    public TokenDetailsResponse(
        string token,
        string christieNumber,
        string formName,
        bool expired,
        bool hasBeenCompleted,
        string? compositionId = null)
    {
        Token =
            Ensure.NotNullOrWhitespace(token);

        ChristieNumber =
            Ensure.NotNullOrWhitespace(christieNumber);

        FormName =
            Ensure.NotNullOrWhitespace(formName);

        Expired = expired;
        HasBeenCompleted = hasBeenCompleted;
        CompositionId = compositionId;
    }

    public string Token { get; }

    public string ChristieNumber { get; }

    public string FormName { get; }

    public bool Expired { get; }

    public bool HasBeenCompleted { get; }

    public string? CompositionId { get; }
}
