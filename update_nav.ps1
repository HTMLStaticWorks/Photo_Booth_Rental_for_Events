$files = Get-ChildItem -Path "c:\slot5\Photo_Booth_Rental_for_Events-main" -Filter "*.html"

foreach ($file in $files) {
    if ($file.Name -eq "login.html" -or $file.Name -eq "register.html") {
        continue
    }

    $content = [System.IO.File]::ReadAllText($file.FullName)

    # Remove ' active' class from all nav links
    $content = $content.Replace('class="nav-link active"', 'class="nav-link"')

    # Add ' active' class to the link matching the current filename
    $target = 'href="' + $file.Name + '" class="nav-link"'
    $replacement = 'href="' + $file.Name + '" class="nav-link active"'
    
    $content = $content.Replace($target, $replacement)

    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
}

Write-Host "Updated active classes on all navbars."
