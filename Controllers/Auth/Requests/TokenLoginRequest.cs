namespace Portal.Api.Controllers.Auth.Requests;

using System.ComponentModel.DataAnnotations;

public class TokenLoginRequest
{
    [Required]
    public Guid Token { get; set; }

    [Required]
    public string Surname { get; set; } = string.Empty;

    [Required]
    public string Postcode { get; set; } = string.Empty;

    [Required]
    public DateTime DateOfBirth { get; set; }
}
