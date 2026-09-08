/* ══════════════════════════════════════════
   EKAI GLOBAL — Main JavaScript
════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────
  // 1. NAVBAR SCROLL EFFECT
  // ─────────────────────────────────────
  const mainNav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // ─────────────────────────────────────
  // 2. MOBILE MENU TOGGLE
  // ─────────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // ─────────────────────────────────────
  // 3. ACTIVE NAV HIGHLIGHT
  // ─────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }

  // ─────────────────────────────────────
  // 4. SCROLL REVEAL ANIMATIONS
  // ─────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  // ─────────────────────────────────────
  // 5. ANIMATED STAT COUNTERS
  // ─────────────────────────────────────
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimal || '0');
    const duration = 1800;
    const startTime = performance.now();
    const suffixClass = suffix === '%' && target === 98.4 ? 'text-emerald-600' : 'text-ekai-orange';

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const value = (target * eased).toFixed(decimals);
      el.innerHTML = `${value}<span class="${suffixClass} font-bold">${suffix}</span>`;
      if (progress < 1) requestAnimationFrame(update);
      else el.innerHTML = `${target}<span class="${suffixClass} font-bold">${suffix}</span>`;
    }
    requestAnimationFrame(update);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.stat-item, section#hero').forEach(el => {
    if (el.querySelector('[data-count]')) statObserver.observe(el);
  });

  // ─────────────────────────────────────
  // 6. SLA MATRIX CALCULATOR
  // ─────────────────────────────────────
  const calcData = {
    b2c: {
      label: "Division 01 // Talent Acceleration",
      title: "Executive Placement Acceleration Track",
      sla: "7 Days to ATS Perfection",
      slaClass: "text-ekai-orange bg-orange-100/80",
      summary: "+$24,000 Average Annual Compensation Increase",
      cta: "Lock In Next B2C Sprint",
      deliverables: [
        { tag: "Deliverable Alpha", title: "Executive ATS-Calibrated Resume", desc: "Multi-format, 98.4% parser score against Fortune 500 criteria." },
        { tag: "Deliverable Beta", title: "LinkedIn Narrative Overhaul", desc: "Recruiter search indexing & high-impact headline overhaul." },
        { tag: "Deliverable Gamma", title: "1:1 Psychometric Report", desc: "Targeted role matrix based on intrinsic strengths & pay bands." },
        { tag: "Deliverable Delta", title: "Mock Interview & Comp Script", desc: "Live recorded dry-run with actionable compensation levers." }
      ]
    },
    b2b: {
      label: "Division 02 // Startup Ops Suite",
      title: "Turnkey People & Operational Infrastructure",
      sla: "14 Days to Complete HR Infrastructure",
      slaClass: "text-blue-700 bg-blue-100/80",
      summary: "60% Immediate Reduction in Administrative Burn Rate",
      cta: "Schedule Architecture Diagnostic",
      deliverables: [
        { tag: "Deliverable Alpha", title: "Custom Employee Handbooks", desc: "Multi-jurisdiction compliant handbooks and remote labor frameworks." },
        { tag: "Deliverable Beta", title: "Automated Cross-Border Payroll", desc: "Cloud setup compliant with US, UK, UAE & India tax laws." },
        { tag: "Deliverable Gamma", title: "Talent Acquisition Pipeline", desc: "Standardized scorecards, JD architectures, and ATS automation." },
        { tag: "Deliverable Delta", title: "Offshore Back-Office Pod", desc: "Dedicated high-performance ops associates managed in India." }
      ]
    },
    prc: {
      label: "Division 03 // Institutional PRC",
      title: "Outsourced Placement Readiness Cell (PRC)",
      sla: "Full Semester Integration SLA",
      slaClass: "text-emerald-800 bg-emerald-100/80",
      summary: "91% Verified Cohort Placement Within 90 Days",
      cta: "Request Institutional Proposal",
      deliverables: [
        { tag: "Deliverable Alpha", title: "Batch Resume Engineering Engine", desc: "Automated keyword calibration and portfolio standardization." },
        { tag: "Deliverable Beta", title: "Corporate Mentor Interview Panels", desc: "Weekly mock behavioral and technical sprints." },
        { tag: "Deliverable Gamma", title: "Placement Readiness Dashboard", desc: "Live institutional metrics, recruiter analytics, student progress." },
        { tag: "Deliverable Delta", title: "Direct Campus Hiring Pipeline", desc: "Exclusive hiring partner introductions and drive scheduling." }
      ]
    }
  };

  function renderCalculator(key) {
    const data = calcData[key];
    if (!data) return;

    document.querySelectorAll('.calc-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.key === key);
    });

    document.getElementById('calc-label').textContent = data.label;
    document.getElementById('calc-title').textContent = data.title;
    const slaEl = document.getElementById('calc-sla');
    slaEl.textContent = data.sla;
    slaEl.className = `px-3 py-1 rounded-full font-semibold text-xs shrink-0 ${data.slaClass}`;
    document.getElementById('calc-summary').textContent = data.summary;
    document.getElementById('calc-cta').textContent = data.cta;

    const grid = document.getElementById('calc-grid');
    grid.style.opacity = '0';
    setTimeout(() => {
      grid.innerHTML = data.deliverables.map(d => `
        <div class="p-4 rounded-xl bg-white border border-slate-200 hover:border-orange-200 transition-all">
          <div class="flex items-center gap-1.5 text-emerald-700 text-xs uppercase font-bold mb-1">
            <span class="material-symbols-outlined text-[15px]">verified</span>
            <span>${d.tag}</span>
          </div>
          <div class="text-sm font-bold text-navy-dark">${d.title}</div>
          <div class="text-xs text-slate-500 mt-1">${d.desc}</div>
        </div>
      `).join('');
      grid.style.opacity = '1';
    }, 150);
  }

  document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => renderCalculator(btn.dataset.key));
  });
  renderCalculator('prc'); // Default

  // ─────────────────────────────────────
  // 7. LEAD FORM (FORMSPREE INTEGRATION)
  // ─────────────────────────────────────
  const form = document.getElementById('leadForm');
  const btnText = document.getElementById('btnText');
  const btnLoader = document.getElementById('btnLoader');
  const btnIcon = document.getElementById('btnIcon');
  const submitBtn = document.getElementById('submitBtn');
  const msgSuccess = document.getElementById('formSuccess');
  const msgError = document.getElementById('formError');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msgSuccess.classList.add('hidden');
      msgError.classList.add('hidden');

      // Validate
      let valid = true;
      const required = form.querySelectorAll('[required]');
      required.forEach(field => {
        field.classList.remove('error');
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
      });

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

      // Loading
      btnText.classList.add('hidden');
      btnIcon.classList.add('hidden');
      btnLoader.classList.remove('hidden');
      submitBtn.disabled = true;

      const formData = {
        interest: form.interest.value,
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        organization: form.organization.value.trim(),
        message: form.message.value.trim(),
        timestamp: new Date().toISOString(),
        source: 'Ekai Global Website'
      };

      try {
        const res = await fetch('https://formspree.io/f/mreygdjb', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          form.reset();
          msgSuccess.classList.remove('hidden');
          msgSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        msgError.classList.remove('hidden');
        console.error('Form error:', err);
      } finally {
        btnText.classList.remove('hidden');
        btnIcon.classList.remove('hidden');
        btnLoader.classList.add('hidden');
        submitBtn.disabled = false;
      }
    });

    // Clear error on input
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => field.classList.remove('error'));
    });
  }

});
