namespace Portal.Api.Controllers.Proms.Responses;

public class FormRequestResponse
{
    public FormRequestResponse(
        Guid id,
        string christieNumber,
        string formName,
        string formVersion,
        string status,
        string token,
        DateTime sentAt,
        DateTime submissionDueAt,
        DateTime? reminderSentAt,
        DateTime? completedAt,
        DateTime? declinedAt,
        string? compositionId
    )
    {
        this.Id = id;
        this.ChristieNumber = christieNumber;
        this.FormName = formName;
        this.FormVersion = formVersion;
        this.Status = status;
        this.Token = token;
        this.SentAt = sentAt;
        this.SubmissionDueAt = submissionDueAt;
        this.ReminderSentAt = reminderSentAt;
        this.CompletedAt = completedAt;
        this.DeclinedAt = declinedAt;
        this.CompositionId = compositionId;
    }

    public Guid Id { get; }

    public string ChristieNumber { get; }

    public string FormName { get; }

    public string FormVersion { get; }

    public string Status { get; }

    public string Token { get; }

    public DateTime SentAt { get; }

    public DateTime SubmissionDueAt { get; }

    public DateTime? ReminderSentAt { get; }

    public DateTime? CompletedAt { get; }

    public DateTime? DeclinedAt { get; }

    public string? CompositionId { get; }
}