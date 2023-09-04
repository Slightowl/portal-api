namespace Portal.Api.Controllers.Auth.Requests;

using System.ComponentModel.DataAnnotations;

public class VerifyChallengeCodeRequest
{
    [Required]
    public Guid RequestId { get; set; }

    [Required]
    public string Code { get; set; } = string.Empty;
}
