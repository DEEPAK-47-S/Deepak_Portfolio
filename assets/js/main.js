/**
 * S. DEEPAKUMAR PORTFOLIO — CORE APPLICATION SCRIPT
 * Cyber Security & Full Stack Engineering Aesthetic
 * Performance Optimized, Accessible, and Mobile-First
 */

document.addEventListener('DOMContentLoaded', () => {
  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. SCROLL REVEAL OBSERVER & ACTIVE NAV HIGHLIGHTING
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.nav-item-link');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Active Section Observer for Navigation
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinksList.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('is-current');
            } else if (href && href.startsWith('#')) {
              link.classList.remove('is-current');
            }
          });
        }
      });
    }, {
      threshold: 0.35
    });

    sections.forEach(sec => sectionObserver.observe(sec));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('active'));
  }

  /* ==========================================================================
     2. INTRO OVERRIDE SCREEN ANIMATION
     ========================================================================== */
  const introScreen = document.getElementById('intro-screen');

  function hideIntroScreen() {
    if (!introScreen || introScreen.dataset.hidden === 'true') return;
    introScreen.dataset.hidden = 'true';
    introScreen.style.opacity = '0';
    introScreen.style.pointerEvents = 'none';
    setTimeout(() => {
      introScreen.style.display = 'none';
    }, 550);
  }

  if (introScreen) {
    if (prefersReducedMotion) {
      introScreen.style.display = 'none';
    } else {
      // Allow user to click anywhere on intro screen to skip immediately
      introScreen.addEventListener('click', hideIntroScreen);
      // Automatic dismiss sequence
      setTimeout(hideIntroScreen, 2600);
      window.addEventListener('load', () => {
        setTimeout(hideIntroScreen, 2200);
      });
    }
  }

  /* ==========================================================================
     3. MATRIX HACKER RAIN CANVAS (RAF + PAGE VISIBILITY OPTIMIZED)
     ========================================================================== */
  const matrixCanvas = document.getElementById('matrix-rain');
  if (matrixCanvas && !prefersReducedMotion) {
    const ctx = matrixCanvas.getContext('2d');
    let animationFrameId = null;
    let isPageVisible = !document.hidden;
    const fontSize = 16;
    let columns = 0;
    let drops = [];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%#&_(),.;:?!|{}<>[]^~01';

    function initMatrixSize() {
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;
      columns = Math.ceil(matrixCanvas.width / fontSize);
      drops = Array.from({ length: columns }).fill(1);
    }

    initMatrixSize();

    let lastDrawTime = 0;
    const frameInterval = 42; // ~24 fps for retro matrix feel

    function drawMatrix(timestamp) {
      if (!isPageVisible) return;

      if (timestamp - lastDrawTime > frameInterval) {
        lastDrawTime = timestamp;
        ctx.fillStyle = 'rgba(3, 3, 5, 0.06)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

        for (let i = 0; i < drops.length; i++) {
          const char = letters.charAt(Math.floor(Math.random() * letters.length));
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.978) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      animationFrameId = requestAnimationFrame(drawMatrix);
    }

    animationFrameId = requestAnimationFrame(drawMatrix);

    // Pause when tab is inactive to preserve CPU / battery
    document.addEventListener('visibilitychange', () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        lastDrawTime = performance.now();
        animationFrameId = requestAnimationFrame(drawMatrix);
      } else if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });

    // Debounced resize
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initMatrixSize, 150);
    }, { passive: true });
  }

  /* ==========================================================================
     4. KALI DRAGON BACKGROUND & HIGH-VELOCITY AGGRESSIVE PREDATOR TRACKING
     ========================================================================== */
  const dragonContainer = document.getElementById('kali-dragon');
  if (dragonContainer && !prefersReducedMotion) {
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let huntTargetX = currentX;
    let huntTargetY = currentY;
    let prevX = currentX;
    let prevY = currentY;
    let isTrackingActive = false;
    let idleTimer = null;
    let lastDashTime = 0;
    let currentDashDuration = 750;
    let initialEmerged = false;

    function getProfileCenter() {
      const profileCard = document.querySelector('.profile-card');
      if (profileCard) {
        const rect = profileCard.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
      }
      return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }

    const initCenter = getProfileCenter();
    currentX = initCenter.x;
    currentY = initCenter.y;
    huntTargetX = currentX;
    huntTargetY = currentY;
    prevX = currentX;
    prevY = currentY;

    // Swift emergence right after intro
    dragonContainer.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease';
    dragonContainer.style.transform = `translate3d(${currentX - window.innerWidth / 2}px, ${currentY - window.innerHeight / 2}px, 0) scale(0.7)`;

    setTimeout(() => {
      initialEmerged = true;
      if (dragonContainer) dragonContainer.style.transition = 'none';
      pickAggressiveHuntTarget();
    }, 1100);

    function pickAggressiveHuntTarget() {
      const marginX = Math.max(20, window.innerWidth * 0.12);
      const marginY = Math.max(30, window.innerHeight * 0.14);
      
      // Dramatic wide lunges and tactical ambush sweeps
      const isLeft = Math.random() < 0.5;
      const isTop = Math.random() < 0.5;

      huntTargetX = isLeft 
        ? marginX + Math.random() * (window.innerWidth * 0.38)
        : window.innerWidth - marginX - Math.random() * (window.innerWidth * 0.38);

      huntTargetY = isTop
        ? marginY + Math.random() * (window.innerHeight * 0.38)
        : window.innerHeight - marginY - Math.random() * (window.innerHeight * 0.38);

      lastDashTime = performance.now();
      currentDashDuration = 600 + Math.random() * 800; // Fierce dashes every 600-1400ms
    }

    function onPointerActive(x, y) {
      pointerX = x;
      pointerY = y;
      isTrackingActive = true;
      clearTimeout(idleTimer);
      // Fast switchback to autonomous aggressive predator mode if pointer stops for 700ms
      idleTimer = setTimeout(() => {
        isTrackingActive = false;
        pickAggressiveHuntTarget();
      }, 700);
    }

    // High-responsiveness desktop mouse tracking
    window.addEventListener('mousemove', (e) => {
      onPointerActive(e.clientX, e.clientY);
    }, { passive: true });

    // Aggressive mobile touch tracking
    window.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        onPointerActive(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        onPointerActive(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isTrackingActive = false;
        pickAggressiveHuntTarget();
      }, 350);
    }, { passive: true });

    // Main 60fps Aggressive Predator Engine
    function animateDragon(now) {
      if (!document.hidden && initialEmerged) {
        // In idle / mobile untracked state, initiate aggressive random lunges & feints
        if (!isTrackingActive) {
          const timeSinceDash = now - lastDashTime;
          const distToTarget = Math.hypot(huntTargetX - currentX, huntTargetY - currentY);
          if (timeSinceDash > currentDashDuration || distToTarget < 30) {
            pickAggressiveHuntTarget();
          }
        }

        let targetX = isTrackingActive ? pointerX : huntTargetX;
        let targetY = isTrackingActive ? pointerY : huntTargetY;

        // When in idle hunting mode, inject continuous predatory twitch and rapid organic cyber flutter
        if (!isTrackingActive) {
          const t = now * 0.007;
          targetX += Math.sin(t * 2.2) * 26 + Math.cos(t * 4.6) * 14;
          targetY += Math.cos(t * 1.8) * 22 + Math.sin(t * 3.8) * 12;
        }

        // Fast & aggressive pursuit lerp speed:
        // 0.115 for ultra-fast snappy reaction to user cursor/finger!
        // 0.082 for aggressive predatory dashes when idle/untracked!
        const lerpFactor = isTrackingActive ? 0.115 : 0.082;
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        currentX += dx * lerpFactor;
        currentY += dy * lerpFactor;

        // Instantaneous physical velocity calculation
        const vx = currentX - prevX;
        const vy = currentY - prevY;
        prevX = currentX;
        prevY = currentY;

        const speed = Math.hypot(vx, vy);

        // Aggressive 3D Banking, Tilting, and Dynamic Lunge Scale
        const bankZ = Math.max(-28, Math.min(28, vx * 2.8));
        const tiltX = Math.max(-25, Math.min(25, -vy * 2.4));
        const tiltY = Math.max(-25, Math.min(25, vx * 2.4));
        const lungeScale = 0.95 + Math.min(0.18, speed * 0.022);

        // Strict boundary calculation accounting for scale & banking to guarantee 0px overflow on all screens
        const effectiveHalfW = ((dragonContainer.offsetWidth || 220) / 2) * 1.18;
        const effectiveHalfH = ((dragonContainer.offsetHeight || 220) / 2) * 1.18;
        const maxMoveX = Math.max(8, (window.innerWidth / 2) - effectiveHalfW - 12);
        const maxMoveY = Math.max(8, (window.innerHeight / 2) - effectiveHalfH - 12);

        const moveX = Math.max(-maxMoveX, Math.min(maxMoveX, currentX - window.innerWidth / 2));
        const moveY = Math.max(-maxMoveY, Math.min(maxMoveY, currentY - window.innerHeight / 2));

        dragonContainer.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0) rotateX(${tiltX.toFixed(1)}deg) rotateY(${tiltY.toFixed(1)}deg) rotateZ(${bankZ.toFixed(1)}deg) scale(${lungeScale.toFixed(2)})`;
      }
      requestAnimationFrame(animateDragon);
    }

    requestAnimationFrame(animateDragon);
  }

  /* ==========================================================================
     5. MOBILE NAVIGATION TOGGLE & ACCESSIBILITY TRAP
     ========================================================================== */
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');
  const navBackdrop = document.getElementById('navBackdrop');

  function setMobileMenuState(open) {
    if (!navLinks) return;
    if (open) {
      navLinks.classList.add('nav-active');
      if (navBackdrop) navBackdrop.classList.add('active');
      document.body.classList.add('menu-open');
      if (mobileNavToggle) {
        mobileNavToggle.setAttribute('aria-expanded', 'true');
        mobileNavToggle.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
      }
      // Focus first link in drawer
      const firstLink = navLinks.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      navLinks.classList.remove('nav-active');
      if (navBackdrop) navBackdrop.classList.remove('active');
      document.body.classList.remove('menu-open');
      if (mobileNavToggle) {
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        mobileNavToggle.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
      }
    }
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = navLinks && navLinks.classList.contains('nav-active');
      setMobileMenuState(!isOpen);
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => setMobileMenuState(false));
  }

  // Close menu when navigation item clicked
  document.querySelectorAll('.nav-item-link').forEach(link => {
    link.addEventListener('click', () => setMobileMenuState(false));
  });

  // Close menu on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('nav-active')) {
      setMobileMenuState(false);
      if (mobileNavToggle) mobileNavToggle.focus();
    }
  });

  /* ==========================================================================
     6. CONTACT FORM AJAX HANDLER (WITH CLIENT VALIDATION & FEEDBACK)
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formStatus && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      const honeypotInput = document.getElementById('hp_field');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';
      const honeypot = honeypotInput ? honeypotInput.value.trim() : '';

      // Client-side quick checks
      if (name.length < 2) {
        showStatus('Please enter your name (at least 2 characters).', false);
        if (nameInput) nameInput.focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus('Please enter a valid email address.', false);
        if (emailInput) emailInput.focus();
        return;
      }

      if (message.length < 5) {
        showStatus('Please enter a message of at least 5 characters.', false);
        if (messageInput) messageInput.focus();
        return;
      }

      // Check if running on file:// protocol (local offline file preview)
      const mailtoUrl = `mailto:skdeepakumar000@gmail.com?subject=${encodeURIComponent('Portfolio Message from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;

      if (window.location.protocol === 'file:') {
        window.location.href = mailtoUrl;
        showStatus('Thank you! Opening your email app to send your message directly to Deepak...', true);
        contactForm.reset();
        return;
      }

      // Enter submitting state
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
      submitBtn.innerHTML = `
        <span class="btn-spinner" aria-hidden="true"></span>
        Sending Message...
      `;
      formStatus.style.display = 'none';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ name, email, message, honeypot })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success) {
          showStatus(data.message || 'Thank you! Your message has been sent successfully.', true);
          contactForm.reset();
        } else {
          // If server reported unavailable or rate-limited, provide seamless 1-click email launch
          window.location.href = mailtoUrl;
          showStatus('Thank you! Opening email app to complete sending to skdeepakumar000@gmail.com...', true);
          contactForm.reset();
        }
      } catch (error) {
        // Fallback directly to email client on network disconnect
        window.location.href = mailtoUrl;
        showStatus('Thank you! Opening email client to send message to skdeepakumar000@gmail.com...', true);
        contactForm.reset();
      } finally {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
        submitBtn.innerHTML = 'Send Message';
      }
    });

    function showStatus(msg, isSuccess) {
      formStatus.innerHTML = msg;
      formStatus.className = isSuccess ? 'status-success' : 'status-error';
      formStatus.style.display = 'block';
      if (isSuccess) {
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 8000);
      }
    }
  }

  /* ==========================================================================
     7. SCROLL TO TOP FLOATING BUTTON
     ========================================================================== */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    let isScrollBtnVisible = false;

    window.addEventListener('scroll', () => {
      const shouldShow = window.scrollY > 350;
      if (shouldShow !== isScrollBtnVisible) {
        isScrollBtnVisible = shouldShow;
        scrollTopBtn.classList.toggle('visible', shouldShow);
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* ==========================================================================
     8. BRAND LOGO CLICK SMOOTH SCROLL
     ========================================================================== */
  const brandLogo = document.querySelector('.logo');
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* ==========================================================================
     9. PROJECT CATEGORY FILTERING
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedFilter = btn.getAttribute('data-filter') || 'all';

        projectCards.forEach(card => {
          const cardCategories = (card.getAttribute('data-category') || '').split(' ');
          if (selectedFilter === 'all' || cardCategories.includes(selectedFilter)) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  /* ==========================================================================
     10. INTERACTIVE CERTIFICATE MODAL LIGHTBOX
     ========================================================================== */
  const certModal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalCertImg');
  const modalTitle = document.getElementById('modalCertTitle');
  const modalViewOriginalBtn = document.getElementById('modalViewOriginalBtn');
  const modalDownloadBtn = document.getElementById('modalDownloadBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalZoomInBtn = document.getElementById('modalZoomInBtn');
  const modalZoomOutBtn = document.getElementById('modalZoomOutBtn');
  const modalZoomResetBtn = document.getElementById('modalZoomResetBtn');

  if (certModal && modalImg) {
    let currentScale = 1;

    function applyZoom(scale) {
      currentScale = Math.min(Math.max(scale, 0.5), 2.5);
      modalImg.style.transform = `scale(${currentScale})`;
    }

    function openCertModal(title, imgSrc, pdfUrl) {
      if (modalTitle) modalTitle.textContent = title || 'Certificate Preview';
      modalImg.src = imgSrc || '';
      modalImg.alt = title || 'Certificate Preview';
      modalImg.classList.remove('zoomed');
      currentScale = 1;
      modalImg.style.transform = 'scale(1)';

      if (modalViewOriginalBtn) {
        modalViewOriginalBtn.href = pdfUrl || imgSrc;
      }
      if (modalDownloadBtn) {
        modalDownloadBtn.href = pdfUrl || imgSrc;
      }

      certModal.classList.add('is-active');
      document.body.classList.add('menu-open');
    }

    function closeCertModal() {
      certModal.classList.remove('is-active');
      document.body.classList.remove('menu-open');
      modalImg.src = '';
      currentScale = 1;
      modalImg.style.transform = 'scale(1)';
    }

    // Attach trigger listeners to all view certificate triggers
    document.querySelectorAll('.view-cert-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const title = trigger.getAttribute('data-cert-title');
        const imgSrc = trigger.getAttribute('data-cert-img');
        const pdfUrl = trigger.getAttribute('data-cert-pdf');
        openCertModal(title, imgSrc, pdfUrl);
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeCertModal);
    }

    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        closeCertModal();
      }
    });

    // Keyboard support: Escape closes modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal.classList.contains('is-active')) {
        closeCertModal();
      }
    });

    // Zoom controls
    if (modalZoomInBtn) {
      modalZoomInBtn.addEventListener('click', () => applyZoom(currentScale + 0.25));
    }
    if (modalZoomOutBtn) {
      modalZoomOutBtn.addEventListener('click', () => applyZoom(currentScale - 0.25));
    }
    if (modalZoomResetBtn) {
      modalZoomResetBtn.addEventListener('click', () => applyZoom(1));
    }

    modalImg.addEventListener('click', () => {
      if (currentScale === 1) {
        applyZoom(1.5);
      } else {
        applyZoom(1);
      }
    });
  }
});
