param(
  [switch]$RegisterDomains
)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
$astroRoot = Join-Path $repoRoot 'astro'
$astroDist = Join-Path $astroRoot 'dist'
$deployRoot = Join-Path $repoRoot 'deploy'
$reportDist = Join-Path $deployRoot 'desk'
$landingDist = Join-Path $deployRoot 'lp'
$oldDist = Join-Path $deployRoot 'old'

Push-Location $repoRoot
try {
  Write-Host 'Building Astro static output...'
  & npm.cmd --prefix $astroRoot run build
  if ($LASTEXITCODE -ne 0) { throw "Astro build failed with exit code $LASTEXITCODE" }

  foreach ($path in @($reportDist, $landingDist, $oldDist)) {
    if (Test-Path -LiteralPath $path) {
      Remove-Item -LiteralPath $path -Recurse -Force
    }
    New-Item -ItemType Directory -Path $path -Force | Out-Null
  }

  Copy-Item -Path (Join-Path $astroDist '*') -Destination $reportDist -Recurse -Force
  Copy-Item -Path (Join-Path $astroDist '*') -Destination $landingDist -Recurse -Force
  Copy-Item -Path (Join-Path $astroDist 'lp\*') -Destination $landingDist -Recurse -Force
  Copy-Item -LiteralPath (Join-Path $repoRoot 'legacy\index.html') -Destination $oldDist -Force
  Copy-Item -LiteralPath (Join-Path $repoRoot 'legacy\style.css') -Destination $oldDist -Force
  Copy-Item -Path (Join-Path $repoRoot 'legacy\images') -Destination $oldDist -Recurse -Force
  Copy-Item -Path (Join-Path $repoRoot 'legacy\enclosure') -Destination $oldDist -Recurse -Force

  if ($RegisterDomains) {
    Write-Host 'Registering static internal domains...'
    & idomains ensure desk.internal static $reportDist --owner desk --desc 'Static Astro report' --json
    & idomains ensure lp.desk.internal static $landingDist --owner desk --desc 'Static Astro landing' --json
    & idomains ensure old.desk.internal static $oldDist --owner desk --desc 'Static archived landing' --json
  }

  Write-Host "Static sites built under $deployRoot"
}
finally {
  Pop-Location
}
