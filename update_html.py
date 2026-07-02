import os
import glob

# Files to update
files = glob.glob('c:/slot5/Photo_Booth_Rental_for_Events-main/*.html')
exclude = ['index.html', 'login.html', 'register.html']
files = [f for f in files if os.path.basename(f) not in exclude]

replacements = [
    (
        '''      <a href="index.html" class="brand-logo">
        <i data-lucide="camera"></i> LUXE<span>BOOTH</span>
      </a>''',
        '''      <a href="index.html" class="brand-logo">
        <div class="brand-logo-icon-wrapper">
          <i data-lucide="aperture"></i>
        </div>
        LUXE<span>BOOTH</span>
      </a>'''
    ),
    (
        '''          <!-- Mobile & Tablet menu controls -->
          <li class="mobile-menu-controls">
            <button class="icon-btn theme-toggle" aria-label="Toggle Dark/Light Mode">
              <i data-lucide="moon"></i>
            </button>
            <button class="icon-btn rtl-toggle" aria-label="Toggle RTL Alignment">
              <i data-lucide="arrow-left-right"></i>
            </button>
            <a href="contact.html" class="btn-gold-primary">Book Now</a>
          </li>''',
        '''          <!-- Mobile & Tablet menu controls -->
          <li class="mobile-menu-controls">
            <button class="icon-btn theme-toggle" aria-label="Toggle Dark/Light Mode">
              <i data-lucide="moon"></i>
            </button>
            <button class="icon-btn rtl-toggle" aria-label="Toggle RTL Alignment">
              <i data-lucide="arrow-left-right"></i>
            </button>
            <a href="login.html" class="btn-glass-secondary">Login</a>
            <a href="contact.html" class="btn-gold-primary">Book Now</a>
          </li>'''
    ),
    (
        '''      <!-- Header controls for Desktop -->
      <div class="header-controls">
        <div class="header-ctas">
          <a href="contact.html" class="btn-gold-primary">Book Now</a>
        </div>
        <button class="icon-btn theme-toggle" aria-label="Toggle Dark/Light Mode">
          <i data-lucide="moon"></i>
        </button>
        <button class="icon-btn rtl-toggle" aria-label="Toggle RTL Alignment">
          <i data-lucide="arrow-left-right"></i>
        </button>
        <button id="hamburger" class="hamburger-menu" aria-label="Open Mobile Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>''',
        '''      <!-- Header controls for Desktop -->
      <div class="header-controls">
        <button class="icon-btn theme-toggle" aria-label="Toggle Dark/Light Mode">
          <i data-lucide="moon"></i>
        </button>
        <button class="icon-btn rtl-toggle" aria-label="Toggle RTL Alignment">
          <i data-lucide="arrow-left-right"></i>
        </button>
        <div class="header-ctas">
          <a href="login.html" class="btn-glass-secondary">Login</a>
          <a href="contact.html" class="btn-gold-primary">Book Now</a>
        </div>
        <button id="hamburger" class="hamburger-menu" aria-label="Open Mobile Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>'''
    ),
    (
        '''          <a href="index.html" class="footer-logo">
            <i data-lucide="camera"></i> LUXE<span>BOOTH</span>
          </a>''',
        '''          <a href="index.html" class="footer-logo brand-logo">
            <div class="brand-logo-icon-wrapper">
              <i data-lucide="aperture"></i>
            </div>
            LUXE<span>BOOTH</span>
          </a>'''
    )
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content_lf = content.replace('\r\n', '\n')
    for old, new in replacements:
        if old in content_lf:
            content_lf = content_lf.replace(old, new)
            print(f"Replaced snippet in {file}")
        else:
            print(f"Warning: could not find snippet in {file}")
    
    if '\r\n' in content:
        content_lf = content_lf.replace('\n', '\r\n')
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content_lf)
