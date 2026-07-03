import os
import glob
import re

dir_path = r'c:\slot5\Photo_Booth_Rental_for_Events-main'
files = glob.glob(os.path.join(dir_path, '*.html'))

pattern = re.compile(r'(<div\s+class="brand-logo-icon-wrapper">[\s\r\n]*)<i\s+data-lucide="aperture"></i>')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content, count = pattern.subn(r'\1<i data-lucide="camera"></i>', content)
    
    if count > 0:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {count} occurrences in {os.path.basename(file)}")
    else:
        print(f"No match found in {os.path.basename(file)}")
