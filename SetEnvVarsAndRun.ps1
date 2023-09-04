param(
    [String] $Folder = "C:\app"
)

Start-Sleep -s 20

$inputFile = "$Folder\appsettings.template.json";
$outputFile = "$folder\appsettings.json"

$inputFileContent = (Get-Content $inputFile);

# match on the templating format of #{VARNAME}#
$regex = '#{([^}#]+)}#'

 [regex]::Matches($inputFileContent,$regex) |
  foreach {
            $org = $_.groups[0].value
            #get the value for the environment variable with the template variable name
            $repl = iex ('$env:' + $_.groups[1].value)
            Write-Host "Replacing $org with $repl"
            $inputFileContent = $inputFileContent.replace($org,$repl)
          }

$inputFileContent | Set-Content $outputFile;

../data/Portal.Database.exe "Server=database;Database=PatientPortal;User Id=radcomm;Password=daunt3zodiac;"

dotnet Portal.Api.dll