namespace Portal.Api.Controllers.Proms.Requests;

using System.ComponentModel.DataAnnotations;

public class PromCompletedRequest
{
    [Required]
    public string Token { get; set; } = "";

    [Required]
    public string CompositionId { get; set; } = "";
}
