// script.js - language, theme, scroll reveal, form demo
(function(){
  const doc = document.documentElement;
  const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('ss-theme');
  const storedLang = localStorage.getItem('ss-lang') || 'en';

  function applyTheme(theme){
    if(theme==='dark') doc.setAttribute('data-theme','dark');
    else doc.removeAttribute('data-theme');
    document.getElementById('theme-toggle').textContent = theme==='dark' ? '☀' : '🌙';
    localStorage.setItem('ss-theme', theme);
  }
  function initTheme(){
    if(storedTheme) applyTheme(storedTheme);
    else applyTheme(userPrefersDark ? 'dark' : 'light');
  }

  function applyLang(lang){
    document.querySelectorAll('[data-en]').forEach(el=>{
      const en = el.getAttribute('data-en');
      const ua = el.getAttribute('data-ua') || en;
      el.textContent = lang==='ua' ? ua : en;
    });
    document.getElementById('lang-en').setAttribute('aria-pressed', lang==='en');
    document.getElementById('lang-ua').setAttribute('aria-pressed', lang==='ua');
    localStorage.setItem('ss-lang', lang);
  }

  document.getElementById('theme-toggle').addEventListener('click', ()=>{
    const current = localStorage.getItem('ss-theme') || (userPrefersDark ? 'dark' : 'light');
    applyTheme(current==='dark' ? 'light' : 'dark');
  });

  document.getElementById('lang-en').addEventListener('click', ()=> applyLang('en'));
  document.getElementById('lang-ua').addEventListener('click', ()=> applyLang('ua'));

  // Scroll reveal
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  // Form demo: prevent actual sending, show toast
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.name.value.trim() || 'Guest';
    // simple demo "send"
    alert('Thank you, ' + name + '! Your message was received (demo).');
    form.reset();
  });
  document.getElementById('reset-btn').addEventListener('click', ()=> form.reset());

  // Init
  initTheme();
  applyLang(storedLang);
})();
function toggleTheme() {
    const isDark = body.classList.toggle('dark');
    localStorage.setItem('ss-theme', isDark ? 'dark' : 'light');

    // підкреслити зміни: коротка анімація логотипу
    logoWrap.classList.remove('animate'); // перезапуск Анімації
    void logoWrap.offsetWidth;
    logoWrap.classList.add('animate');

    // опціонально: ре-apply show класу (щоб знову fade-in)
    logo.classList.remove('show');
    setTimeout(()=> logo.classList.add('show'), 120);
  }
 document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const logo = document.getElementById('logo');

  if (!themeBtn) {
    console.error("❌ Button with id='theme-toggle' not found!");
    return;
  }
  if (!logo) {
    console.error("❌ Logo with id='logo' not found!");
    return;
  }

  // Функція перемикання теми
  function setTheme(isDark) {
    if (isDark) {
      body.classList.add('dark');
      logo.src = 'assets/img/logo-dark.png';
    } else {
      body.classList.remove('dark');
      logo.src = 'assets/img/logo-light.png';
    }
    localStorage.setItem('ss-theme', isDark ? 'dark' : 'light');
  }

  // При кліку на кнопку теми
  themeBtn.addEventListener('click', () => {
    const darkNow = !body.classList.contains('dark');
    setTheme(darkNow);
  });

  // При завантаженні сторінки — перевір попередню тему
  const savedTheme = localStorage.getItem('ss-theme');
  if (savedTheme) {
    setTheme(savedTheme === 'dark');
  } else {
    // Визначити системну тему
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark);
  }
});
