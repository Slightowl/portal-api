namespace Portal.Api.Controllers.Auth.Responses;

public class LoginChallenge
{
    public LoginChallenge(
        Guid requestId,
        bool isCodeChallenge,
        IReadOnlyCollection<string> numbers)
    {
        RequestId = requestId;
        Numbers = numbers;

        ChallengeType = isCodeChallenge ? "code" : "nhs";
    }

    public Guid RequestId { get; }

    public string ChallengeType { get; }

    public IReadOnlyCollection<string> Numbers { get; }
}
