/* The Future Store – Shared JavaScript */

/* ── Hero Slider (only if slides exist on page) ── */
(function() {
  var slides = document.querySelectorAll('.slide');
  var dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  var current = 0, autoTimer;

  function goTo(n) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }
  function startAuto() { autoTimer = setInterval(function() { goTo(current + 1); }, 5000); }
  function resetAuto()  { clearInterval(autoTimer); startAuto(); }

  var nextBtn = document.getElementById('heroNext');
  var prevBtn = document.getElementById('heroPrev');
  if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); resetAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); resetAuto(); });
  dots.forEach(function(d) {
    d.addEventListener('click', function() { goTo(parseInt(d.dataset.slide)); resetAuto(); });
  });
  startAuto();
})();

/* ── Mobile Nav ── */
(function() {
  var overlay = document.getElementById('mobOverlay');
  var mobNav  = document.getElementById('mobNav');
  var menuBtn = document.getElementById('menuToggle');
  var closeBtn = document.getElementById('mobClose');
  if (!menuBtn || !mobNav || !overlay) return;

  function openNav() {
    mobNav.classList.add('open');
    overlay.classList.add('open');
    mobNav.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    mobNav.classList.remove('open');
    overlay.classList.remove('open');
    mobNav.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', openNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  overlay.addEventListener('click', closeNav);

  document.querySelectorAll('.mob-has-sub').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var sub  = link.nextElementSibling;
      var icon = link.querySelector('i');
      if (sub)  sub.classList.toggle('open');
      if (icon) icon.className = (sub && sub.classList.contains('open')) ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
    });
  });
})();

/* ── Sticky header + Back-to-top visibility ── */
(function() {
  var hdr     = document.getElementById('site-header');
  var backTop = document.getElementById('backTop');
  window.addEventListener('scroll', function() {
    if (hdr)     hdr.classList.toggle('scrolled', window.scrollY > 60);
    if (backTop) backTop.classList.toggle('show',   window.scrollY > 400);
  });
  if (backTop) {
    backTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

/* ── Contact form ── */
(function() {
  var form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var fname = (document.getElementById('fname') || {}).value || '';
    var email = (document.getElementById('email') || {}).value || '';
    var msg   = (document.getElementById('message') || {}).value || '';
    if (!fname.trim() || !email.trim() || !msg.trim()) {
      alert('Please fill in all required fields (marked with *).');
      return;
    }
    alert('Thank you, ' + fname.trim() + '!\n\nYour message has been received. We will respond shortly at ' + email.trim() + '.\n\nFor immediate help:\n☎ +263 242 793535\n✉ sales@thefuturestore.co.zw');
    form.reset();
  });
})();
