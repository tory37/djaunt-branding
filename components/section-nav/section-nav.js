/* Djaunt section nav — scroll-spy. Optional: section-nav.css alone still
   renders a working jump-link bar without this file, it just won't
   highlight the section currently in view. Framework-free, self-contained;
   no-ops if the page has no .dj-section-nav. */
(() => {
  const nav = document.querySelector('.dj-section-nav');
  if (!nav || !('IntersectionObserver' in window)) return;

  const links = Array.from(nav.querySelectorAll('.dj-section-nav-link'));
  const targetId = (link) => link.getAttribute('data-dj-nav-target') || (link.getAttribute('href') || '').replace(/^#/, '');

  const targets = links
    .map((link) => ({ link, el: document.getElementById(targetId(link)) }))
    .filter((t) => t.el);
  if (!targets.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle('dj-section-nav-link-active', targetId(link) === id);
    });
  };

  setActive(targets[0].el.id);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (!visible.length) return;
      const top = visible.reduce((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? a : b));
      setActive(top.target.id);
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  targets.forEach(({ el }) => observer.observe(el));
})();
