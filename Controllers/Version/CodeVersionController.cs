namespace Portal.Api.Controllers.Version;

using System.Diagnostics;
using System.Reflection;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Portal.Api.Controllers.Version.Models;

[Route("codeversion")]
[ApiController]
[Produces("application/json")]
public partial class CodeVersionController : ControllerBase
{
    /// <summary>
    /// Get Version
    /// </summary>
    /// <returns>Current version info</returns>
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(200)]
    public IActionResult Get()
    {
        var assembly = Assembly.GetEntryAssembly();

        if (assembly is null)
        {
            return NotFound();
        }

        var fvi = FileVersionInfo.GetVersionInfo(assembly.Location);

        var version = new CodeVersion(
            fvi.FileMajorPart,
            fvi.FileMinorPart,
            fvi.FileBuildPart,
            fvi.FilePrivatePart,
            fvi.Comments);

        return Ok(version);
    }
}
