$files = Get-ChildItem -Path "c:\slot5\Photo_Booth_Rental_for_Events-main" -Filter "*.html"

$old_favicon = '<link rel="icon" type="image/svg+xml"
    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23d4af37%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z%22/><circle cx=%2212%22 cy=%2213%22 r=%223%22/></svg>">'

$new_favicon = '<link rel="icon" type="image/svg+xml"
    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23d4af37%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/><path d=%22m14.31 8 5.74 9.94%22/><path d=%22M9.69 8h11.48%22/><path d=%22m7.38 12 5.74-9.94%22/><path d=%22M9.69 16 3.95 6.06%22/><path d=%22M14.31 16H2.83%22/><path d=%22m16.62 12-5.74 9.94%22/></svg>">'

# This regex replaces the camera back to aperture only inside the brand-logo-icon-wrapper
$regex = '(<div\s+class="brand-logo-icon-wrapper">[\s\r\n]*)<i\s+data-lucide="camera"></i>'

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    $content = $content.Replace($old_favicon, $new_favicon)
    $content = [Regex]::Replace($content, $regex, '${1}<i data-lucide="aperture"></i>')
    
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
}

Write-Host "Reverted logo to aperture and updated favicon to aperture."
