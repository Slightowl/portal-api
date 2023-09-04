namespace Portal.Api.Controllers.Auth.Requests;

using System.ComponentModel.DataAnnotations;

public class SendCodeRequest
{
    [Required]
    public Guid RequestId { get; set; }

    [Required]
    public string Number { get; set; } = string.Empty;
}
