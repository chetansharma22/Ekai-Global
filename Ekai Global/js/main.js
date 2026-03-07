/* ══════════════════════════════════════════
   EKAI GLOBAL — Main JS
══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ─────────────────
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // ── Mobile hamburger ─────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close on nav link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // ── Active nav highlighting ──────────────
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });

    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // ── Scroll reveal ────────────────────────
  const revealEls = document.querySelectorAll(
    '.service-card, .why-card, .about-text, .about-visual, .step, .highlight-card, .info-card, .contact-form-wrap, .pillar, .mission-card'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // ── Lead Form ────────────────────────────
  const form      = document.getElementById('leadForm');
  const btnText   = document.getElementById('btnText');
  const btnLoader = document.getElementById('btnLoader');
  const submitBtn = document.getElementById('submitBtn');
  const msgSuccess = document.getElementById('formSuccess');
  const msgError   = document.getElementById('formError');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msgSuccess.style.display = 'none';
      msgError.style.display   = 'none';

      // Basic validation
      let valid = true;
      const required = form.querySelectorAll('[required]');

      required.forEach(field => {
        field.classList.remove('error');
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
      });

      // Email validation
      const emailField = form.querySelector('#email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField && emailField.value && !emailRegex.test(emailField.value)) {
        emailField.classList.add('error');
        valid = false;
      }

      if (!valid) {
        const firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
        return;
      }

      // Show loading state
      btnText.style.display   = 'none';
      btnLoader.style.display = 'inline';
      submitBtn.disabled = true;

      // Collect form data
      const formData = {
        firstName: form.firstName.value.trim(),
        lastName:  form.lastName.value.trim(),
        email:     form.email.value.trim(),
        phone:     form.phone.value.trim(),
        role:      form.role.value,
        interest:  form.interest.value,
        message:   form.message.value.trim(),
        timestamp: new Date().toISOString(),
        source:    'Ekai Global Website'
      };

      try {
        // ── Option A: Netlify Forms (recommended for your Netlify deployment)
        // Uncomment the form's data-netlify attribute in the HTML
        // and replace the try block with a fetch to the Netlify endpoint.

        // ── Option B: Formspree (easiest setup — replace YOUR_FORM_ID)
        // const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData),
        // });

        // ── For now: simulate a successful submission (remove for production)
        await new Promise(r => setTimeout(r, 1500));
        const res = { ok: true };

        if (res.ok) {
          form.reset();
          msgSuccess.style.display = 'block';
          msgSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        msgError.style.display = 'block';
        console.error('Form error:', err);
      } finally {
        btnText.style.display   = 'inline';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
      }
    });

    // Clear error on input
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => field.classList.remove('error'));
    });
  }

  // ── Smooth number counter on stats ───────
  function animateCounter(el, target) {
    const suffix = el.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(el => {
          const raw = el.textContent;
          const num = parseInt(raw.replace(/\D/g, ''), 10);
          if (!isNaN(num)) animateCounter(el, num);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

});