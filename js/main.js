/*
 * PHOTO BOOTH RENTAL FOR EVENTS - MAIN CORE JAVASCRIPT (2026)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. INITIALIZE CUSTOM PLUGINS & LIBRARIES
  initAOS();
  initSwiper();
  initGSAP();
  
  // 2. THEME & RTL MANAGEMENT
  initThemeToggle();
  initRtlToggle();
  
  // 3. NAVIGATION MANAGEMENT
  initStickyHeader();
  initMobileMenu();
  initActiveNavLink();
  
  // 4. GALLERY & LIGHTBOX
  initGalleryFilter();
  initLightbox();

  // 5. FORM HANDLERS & VALIDATION
  initForms();
});

/* ==========================================================================
   1. THIRD PARTY PLUGINS INITIALIZATION
   ========================================================================== */

function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
      disable: 'mobile' // Disabling on mobile to optimize performance
    });
  }
}

function initSwiper() {
  if (typeof Swiper !== 'undefined') {
    // Testimonials Swiper
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        }
      }
    });

    // Custom slider for brands ticker (fallback if CSS fails or for more sliders)
    new Swiper('.brands-swiper', {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 }
      }
    });
  }
}

function initGSAP() {
  if (typeof gsap !== 'undefined') {
    // Hero Text entrance animation
    gsap.from('.hero-content .hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2
    });
    
    gsap.from('.hero-content .hero-title', {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 0.4
    });

    gsap.from('.hero-content .hero-desc', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.6
    });

    gsap.from('.hero-content .button-group', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.8
    });

    // Stagger animation for floats/statistics cards in hero
    gsap.from('.hero-stats-card', {
      opacity: 0,
      scale: 0.9,
      y: 50,
      duration: 1,
      delay: 1,
      stagger: 0.2
    });
  }
}

/* ==========================================================================
   2. THEME & RTL MANAGEMENT
   ========================================================================== */

function initThemeToggle() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  if (themeToggles.length === 0) return;

  const currentTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const setDarkMode = (isDark) => {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    updateThemeIcons(isDark);
  };

  // Set initial state
  if (currentTheme === 'dark' || (!currentTheme && systemDark)) {
    setDarkMode(true);
  } else {
    setDarkMode(false);
  }

  // Toggle Action
  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcons(isDark);
    });
  });
}

function updateThemeIcons(isDark) {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(btn => {
    if (isDark) {
      btn.innerHTML = '<i data-lucide="sun"></i>';
    } else {
      btn.innerHTML = '<i data-lucide="moon"></i>';
    }
  });
  
  // Re-run lucide to render correct icon inside the dynamically updated toggle
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function initRtlToggle() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  if (rtlToggles.length === 0) return;

  const currentDir = localStorage.getItem('direction');

  const setDirection = (isRtl) => {
    if (isRtl) {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.setAttribute('dir', 'ltr');
    }
    updateRtlIcons(isRtl);
  };

  // Set initial state
  if (currentDir === 'rtl') {
    setDirection(true);
  } else {
    setDirection(false);
  }

  // Toggle Action
  rtlToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      const newDir = isRtl ? 'ltr' : 'rtl';
      setDirection(!isRtl);
      localStorage.setItem('direction', newDir);
      
      // Refresh AOS layout since page shifts
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    });
  });
}

function updateRtlIcons(isRtl) {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  rtlToggles.forEach(btn => {
    btn.innerHTML = '<i data-lucide="arrow-left-right"></i>';
  });

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* ==========================================================================
   3. NAVIGATION MANAGEMENT
   ========================================================================== */

function initStickyHeader() {
  const header = document.querySelector('header.premium-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

function initActiveNavLink() {
  const path = window.location.pathname;
  const pageName = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === pageName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   4. GALLERY & LIGHTBOX
   ========================================================================== */

function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length === 0 || galleryItems.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all btns
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden');
          // Trigger slight fade-in via script
          gsap.fromTo(item, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 });
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item-link');
  const lightbox = document.getElementById('premium-lightbox');
  if (galleryItems.length === 0 || !lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  
  let currentIndex = 0;
  const imageSources = Array.from(galleryItems).map(item => item.getAttribute('href'));

  const openLightbox = (index) => {
    currentIndex = index;
    lightboxImg.setAttribute('src', imageSources[currentIndex]);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % imageSources.length;
    gsap.fromTo(lightboxImg, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    lightboxImg.setAttribute('src', imageSources[currentIndex]);
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
    gsap.fromTo(lightboxImg, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    lightboxImg.setAttribute('src', imageSources[currentIndex]);
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   5. FORM HANDLERS & VALIDATION
   ========================================================================== */

function initForms() {
  const bookingForm = document.getElementById('event-booking-form');
  const inquiryForm = document.getElementById('inquiry-form');
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(bookingForm)) {
        showSuccessMessage(bookingForm);
      }
    });
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(inquiryForm)) {
        showSuccessMessage(inquiryForm);
      }
    });
  }
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  
  inputs.forEach(input => {
    // Reset invalid layout
    input.classList.remove('is-invalid');
    
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('is-invalid');
    } else if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        isValid = false;
        input.classList.add('is-invalid');
      }
    } else if (input.type === 'tel') {
      const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;
      if (!phoneRegex.test(input.value)) {
        isValid = false;
        input.classList.add('is-invalid');
      }
    }
  });

  return isValid;
}

function showSuccessMessage(form) {
  // Premium glass overlay for success feedback
  const overlay = document.createElement('div');
  overlay.className = 'floating-glass-card success-overlay';
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '100';
  overlay.style.textAlign = 'center';

  overlay.innerHTML = `
    <div class="category-icon" style="background: var(--gold-gradient); color: #000000; font-size: 2rem; width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
      <i data-lucide="check"></i>
    </div>
    <h3 style="color: var(--text-primary); margin-bottom: 0.5rem; font-family: var(--font-heading);">Request Received!</h3>
    <p style="color: var(--text-secondary); max-width: 300px; font-size: 0.95rem;">Our luxury event planning team will contact you within 2 hours to confirm details.</p>
  `;

  form.style.position = 'relative';
  form.appendChild(overlay);

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  gsap.from(overlay, {
    opacity: 0,
    scale: 0.95,
    duration: 0.5,
    ease: 'power3.out'
  });

  // Reset form
  setTimeout(() => {
    form.reset();
    gsap.to(overlay, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      onComplete: () => overlay.remove()
    });
  }, 4000);
}
