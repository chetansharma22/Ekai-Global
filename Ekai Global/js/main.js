/* Ekai Global — Main JavaScript */
document.addEventListener('DOMContentLoaded', () => {

  // Navbar shadow + active link
  const mainNav = document.getElementById('mainNav');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navItems.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  const progress = document.getElementById('progress');
  function onScroll() {
    mainNav.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNav();
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress && max > 0) progress.style.transform = `scaleX(${Math.min(window.scrollY / max, 1)})`;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Cursor spotlight on cards
  document.querySelectorAll('.spot').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // Stagger reveal delays among siblings
  document.querySelectorAll('.reveal').forEach(el => {
    const sibs = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
    const i = sibs.indexOf(el);
    if (i > 0) el.style.transitionDelay = `${Math.min(i, 5) * 90}ms`;
  });

  // Mobile menu
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => menu.classList.toggle('hidden'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.add('hidden')));
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          setTimeout(() => entry.target.classList.add('done'), 1800);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  // Lead form (Formspree)
  const form = document.getElementById('leadForm');
  if (!form) return;

  const btnText = document.getElementById('btnText');
  const btnLoader = document.getElementById('btnLoader');
  const submitBtn = document.getElementById('submitBtn');
  const msgSuccess = document.getElementById('formSuccess');
  const msgError = document.getElementById('formError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msgSuccess.classList.add('hidden');
    msgError.classList.add('hidden');

    // Spam trap: bots fill this hidden field, people never see it
    if (form.elements['_gotcha'] && form.elements['_gotcha'].value) return;

    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) { field.classList.add('error'); valid = false; }
    });
    const email = form.elements['email'];
    if (email.value && !emailRegex.test(email.value)) { email.classList.add('error'); valid = false; }
    const phone = form.elements['phone'];
    if (phone.value && phone.value.replace(/\D/g, '').length < 8) { phone.classList.add('error'); valid = false; }

    if (!valid) {
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    submitBtn.disabled = true;

    const f = form.elements;
    const formData = {
      interest: f['interest'].value,
      name: f['name'].value.trim(),
      email: f['email'].value.trim(),
      phone: f['phone'].value.trim(),
      organization: f['organization'].value.trim(),
      message: f['message'].value.trim(),
      timestamp: new Date().toISOString(),
      source: 'Ekai Global Website'
    };

    try {
      const res = await fetch('https://formspree.io/f/mreygdjb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Server error');
      form.reset();
      msgSuccess.classList.remove('hidden');
      msgSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (err) {
      msgError.classList.remove('hidden');
      console.error('Form error:', err);
    } finally {
      btnText.classList.remove('hidden');
      btnLoader.classList.add('hidden');
      submitBtn.disabled = false;
    }
  });

  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
});
