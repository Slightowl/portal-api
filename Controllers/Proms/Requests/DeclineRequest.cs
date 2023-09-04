namespace Portal.Api.Controllers.Proms.Requests;

using System.ComponentModel.DataAnnotations;

public class DeclineRequest
{
    [Required]
    public string Token { get; set; } = "";

    [Required]
    public string FormName { get; set; } = "";

    [Required]
    public string Reason { get; set; } = "";
}
