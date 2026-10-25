// Scroll-reveal: fade/slide sections in as they enter the viewport.
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in'));
}

// Rotating role line in the hero (edit the list to change the words).
const target = document.getElementById('typed');
if (target && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const words = JSON.parse(target.dataset.words || '[]');
  let w = 0, c = 0, deleting = false;
  const tick = () => {
    const word = words[w];
    target.textContent = word.slice(0, c);
    if (!deleting && c === word.length) { deleting = true; return setTimeout(tick, 1700); }
    if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; }
    c += deleting ? -1 : 1;
    setTimeout(tick, deleting ? 38 : 75);
  };
  tick();
}

/* click the email to copy it */
(function () {
  var el = document.getElementById('copy-email');
  if (!el) return;
  var timer;
  el.addEventListener('click', function (e) {
    var text = el.getAttribute('data-email');
    if (!navigator.clipboard || !navigator.clipboard.writeText) return; // fall back to mailto
    e.preventDefault();
    navigator.clipboard.writeText(text).then(function () {
      el.textContent = 'Email copied ✓';
      el.classList.add('copied');
      clearTimeout(timer);
      timer = setTimeout(function () { el.textContent = text; el.classList.remove('copied'); }, 1800);
    }, function () { window.location.href = el.href; });
  });
})();
