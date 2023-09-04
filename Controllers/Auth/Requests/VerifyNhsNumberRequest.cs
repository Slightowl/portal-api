namespace Portal.Api.Controllers.Auth.Requests;

using System.ComponentModel.DataAnnotations;

public class VerifyNhsNumberRequest
{
    [Required]
    public Guid RequestId { get; set; }

    [Required]
    public string NhsNumber { get; set; } = string.Empty;
}
