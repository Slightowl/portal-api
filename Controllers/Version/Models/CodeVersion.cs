namespace Portal.Api.Controllers.Version.Models;

/// <summary>
/// Provides version information.
/// </summary>
public class CodeVersion
{
    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="major">The major version number.</param>
    /// <param name="minor">The minor version number.</param>
    /// <param name="patch">The patch number.</param>
    /// <param name="release">The release number.</param>
    /// <param name="summary">Summary information.</param>
    public CodeVersion(int major, int minor, int patch, int release, string? summary)
    {
        Major = major;
        Minor = minor;
        Patch = patch;
        Release = release;
        Summary = summary;
    }

    /// <summary>
    /// Gets the major version number.
    /// </summary>
    public int Major { get; set; }

    /// <summary>
    /// Gets the minor version number.
    /// </summary>
    public int Minor { get; set; }

    /// <summary>
    /// Gets the patch number.
    /// </summary>
    public int Patch { get; set; }

    /// <summary>
    /// Gets the release number.
    /// </summary>
    public int Release { get; set; }

    /// <summary>
    /// Gets the summary information.
    /// </summary>
    public string? Summary { get; set; }

    /// <inheritdoc />
    /// <remarks>
    /// Returns in the format: "{Major}.{Minor}.{Patch}".
    /// </remarks>
    public override string ToString()
    {
        return $"{Major}.{Minor}.{Patch}";
    }
}
