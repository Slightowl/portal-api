namespace Portal.Api.Controllers.Proms.Responses;

public record CompletedPromHeader
{
    public CompletedPromHeader(
        string name,
        string description,
        string compositionId,
        DateTime dateCompleted)
    {
        Name =
            Ensure.NotNullOrWhitespace(name);

        Description =
            Ensure.NotNullOrWhitespace(description);

        CompositionId =
            Ensure.NotNullOrWhitespace(compositionId);

        DateCompleted = dateCompleted;
    }

    public string Name { get; }

    public string Description { get; }

    public string CompositionId { get; }

    public DateTime DateCompleted { get; }
}
