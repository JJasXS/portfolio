# Prints resume/resume.html to public/resume/Jason-Choo-Resume.pdf using headless Chromium.
# The HTML is the source of truth; regenerate the PDF after editing it.

$ErrorActionPreference = "Stop"

$candidates = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
  "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe",
  "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
)

$browser = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) {
  throw "No Chrome or Edge installation found for PDF printing."
}

$root = Split-Path $PSScriptRoot -Parent
$source = Join-Path $PSScriptRoot "resume.html"
$target = Join-Path $root "public\resume\Jason-Choo-Resume.pdf"
$url = "file:///" + ($source -replace '\\', '/')

# Chromium reports success on stderr, which would otherwise trip the strict error mode above.
$ErrorActionPreference = "Continue"
& $browser --headless=new --disable-gpu --no-pdf-header-footer `
  --allow-file-access-from-files --virtual-time-budget=8000 `
  --print-to-pdf="$target" $url 2>&1 | Out-Null
$ErrorActionPreference = "Stop"

if (-not (Test-Path $target)) {
  throw "PDF was not written to $target"
}

$size = (Get-Item $target).Length
Write-Host "Wrote $target ($size bytes) using $(Split-Path $browser -Leaf)"
