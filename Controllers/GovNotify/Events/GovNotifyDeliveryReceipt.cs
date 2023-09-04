namespace Portal.Api.Controllers.GovNotify.Events;

using Newtonsoft.Json;

/// <summary>
/// When you send an email or text message, Notify will send a receipt to your
/// callback URL with the status of the message. This is an automated method to
/// get the status of messages.
/// </summary>
/// <remarks>
/// https://docs.notifications.service.gov.uk/rest-api.html#delivery-receipts
/// </remarks>
public class GovNotifyDeliveryReceipt
{
    /// <summary>
    /// Notify’s id for the status receipts. Format: UUID
    /// </summary>
    [JsonProperty("id")]
    public string Id { get; set; } = "";

    /// <summary>
    /// The reference sent by the service, or null.
    /// </summary>
    [JsonProperty("reference")]
    public string? Reference { get; set; }

    /// <summary>
    /// The email address or phone number of the recipient.
    /// </summary>
    [JsonProperty("to")]
    public string To { get; set; } = "";

    /// <summary>
    /// The status of the notification.
    /// </summary>
    /// <remarks>
    /// Values:
    ///  - delivered
    ///  - permanent-failure
    ///  - temporary-failure
    ///  - technical-failure
    /// </remarks>
    [JsonProperty("status")]
    public string Status { get; set; } = "";

    /// <summary>
    /// The time the service sent the request.
    /// </summary>
    [JsonProperty("created_at")]
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// The last time the status was updated, or null.
    /// </summary>
    [JsonProperty("completed_at")]
    public DateTime? CompletedAt { get; set; }

    /// <summary>
    /// The time the notification was sent, or null.
    /// </summary>
    [JsonProperty("sent_at")]
    public DateTime? SentAt { get; set; }

    /// <summary>
    /// The notification type.
    /// </summary>
    /// <remarks>
    /// Values:
    ///  - email
    ///  - sms
    /// </remarks>
    [JsonProperty("notification_type")]
    public string NotificationType { get; set; } = "";

    /// <summary>
    /// The id of the template that was used. Format: UUID.
    /// </summary>
    [JsonProperty("template_id")]
    public string TemplateId { get; set; } = "";

    /// <summary>
    /// The version number of the template that was used.
    /// </summary>
    [JsonProperty("template_version")]
    public int TemplateVersion { get; set; }
}
