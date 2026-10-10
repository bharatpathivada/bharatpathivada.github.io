(() => {
  const STORAGE_KEY = 'bharat-site-theme';
  const body = document.body;
  const toggle = document.getElementById('theme-toggle');

  const preferredTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    const dark = theme === 'dark';
    body.classList.toggle('dark-mode', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    if (toggle) {
      toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      toggle.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
      const icon = toggle.querySelector('i');
      if (icon) icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
    }
  };

  applyTheme(preferredTheme());

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = body.classList.contains('dark-mode') ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  }

  // Some third-party publication badges calculate dimensions after load.
  // Reflowing after their scripts settle prevents clipping in flex layouts.
  window.addEventListener('load', () => {
    document.querySelectorAll('.pub-widgets').forEach(el => el.classList.add('widgets-ready'));
  });
})();

// Hide badge containers when providers return no usable metrics.
(function(){
  function updateBadges(){
    document.querySelectorAll('.pub-widgets').forEach(group=>{
      const alt=group.querySelector('.altmetric-embed');
      if(alt){
        const badge=alt.querySelector('a, img, .altmetric-embed, .altmetric-badge');
        if(!badge) alt.style.display='none';
      }
      const dim=group.querySelector('.dimensions-widget');
      if(dim){
        const label=(dim.textContent||'').trim();
        const links=dim.querySelectorAll('a');
        if(!links.length || /^(0|0 citations?|no citations?)$/i.test(label)) dim.style.display='none';
      }
      if(![...group.children].some(el=>el.style.display!=='none')) group.style.display='none';
    });
  }
  window.addEventListener('load',()=>{setTimeout(updateBadges,2500);setTimeout(updateBadges,6500);});
})();
