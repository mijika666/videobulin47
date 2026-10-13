$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$localHome = Join-Path $root ".next-home"
$appData = Join-Path $localHome "AppData\Roaming"
$localAppData = Join-Path $localHome "AppData\Local"

New-Item -ItemType Directory -Force -Path $appData, $localAppData | Out-Null

$env:USERPROFILE = $localHome
$env:APPDATA = $appData
$env:LOCALAPPDATA = $localAppData

Push-Location $root
try {
  npx next build
}
finally {
  Pop-Location
}
