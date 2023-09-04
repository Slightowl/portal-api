namespace Portal.Api.Controllers.Auth.Requests;

using System.ComponentModel.DataAnnotations;

public class LoginRequest
{
    [Required]
    public string Surname { get; set; } = string.Empty;

    [Required]
    public string Postcode { get; set; } = string.Empty;

    [Required]
    public DateTime DateOfBirth { get; set; }
}
