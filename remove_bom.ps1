$files = Get-ChildItem -Path "c:\slot5\Photo_Booth_Rental_for_Events-main" -Filter "*.html"
$utf8NoBom = New-Object System.Text.UTF8Encoding $False

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
}
Write-Host "Removed BOM from all HTML files."
