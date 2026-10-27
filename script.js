'use strict';
const projects = window.PORTFOLIO_PROJECTS || [];
const grid = document.querySelector('#projects-grid');
const results = document.querySelector('#results-count');
const filters = [...document.querySelectorAll('[data-filter]')];
const icons = {
  arrow: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19 19 5M8 5h11v11"/></svg>',
  github: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.03c-3.1.68-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.64-1.64-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.15 1.72 1.15 1 .1.8 2.14 3.08 1.52.2-.73.39-1.23.71-1.52-2.47-.28-5.06-1.24-5.06-5.51 0-1.22.43-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.15A10.8 10.8 0 0 1 12 6.7c.96 0 1.9.13 2.79.38 2.14-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.68.11 2.96.71.78 1.15 1.78 1.15 3 0 4.28-2.6 5.22-5.08 5.5.4.35.76 1.03.76 2.09v2.61c0 .3.2.64.77.53A11.2 11.2 0 0 0 12 .8Z"/></svg>'
};
function art(type) {
  const photo = (src, alt, extra = '') => `<img class="project-photo ${extra}" src="${(window.PORTFOLIO_ASSETS && window.PORTFOLIO_ASSETS[src]) || ('assets/projects/' + src + '.webp')}" alt="${alt}" loading="lazy" decoding="async" />`;
  switch (type) {
    case 'keyboard':
      return `<div class="showcase showcase-uok">${photo('uok', 'Fotomontaje realista basado en el editor de teclado UrOwnKeyboard')}
        <span class="showcase-corner showcase-corner-light">LINUX / XKB + KEYD</span></div>`;
    case 'dvorak':
      return `<div class="showcase showcase-dvorak">${photo('dvorak', 'Fotomontaje realista de un teclado Dvorak para programación en español')}
        <span class="showcase-corner showcase-corner-light">LAYOUT / ISO ES</span></div>`;
    case 'fonycon':
      return `<div class="showcase showcase-fonycon"><div class="fonycon-meta"><span>WEB CORPORATIVA</span><strong>fonycon.es <span aria-hidden="true">↗</span></strong></div>
        <div class="fonycon-screenshot">${photo('fonycon', 'Captura original de la web corporativa de Fonycon')}</div>
        <div class="fonycon-vertical" aria-hidden="true">DISEÑO & DESARROLLO WEB</div></div>`;
    case 'bot':
      return `<div class="showcase showcase-skylbot"><div class="skylbot-intro"><span class="skylbot-dot" aria-hidden="true"></span><span>DISCORD / BOT COLABORATIVO</span><strong>SKYLBOT</strong></div>
        <div class="skylbot-chat">${photo('skylbot', 'Captura real de una conversación con Skylbot en Discord: blackjack, saldo y trabajo')}</div>
        <div class="skylbot-foot"><span>*blackjack allin</span><span>*balance</span><span>*work</span></div></div>`;
    case 'wombo':
      return `<div class="showcase showcase-wombo"><div class="wombo-heading"><span>WOMBO COMBO</span><strong>WEB <span>+</span> APP</strong></div>
        <div class="wombo-web-shot"><span class="wombo-web-header"><span aria-hidden="true">● ● ●</span> wombocombo.netlify.app</span>${photo('wombo-web', 'Captura real de la versión web de Wombo Combo con los juegos disponibles')}</div>
        <div class="wombo-app-shot">${photo('wombo-app', 'Captura real de la aplicación móvil de Wombo Combo')}</div>
        <span class="wombo-caption">UNA EXPERIENCIA / DOS FORMATOS</span></div>`;
    case 'a11y':
      return `<div class="showcase showcase-a11y"><div class="construction-grid" aria-hidden="true"></div>
         <span class="construction-top"><span class="construction-signal" aria-hidden="true"></span>A11Y / WORK IN PROGRESS</span>
         <div class="construction-main"><span class="construction-symbol" aria-hidden="true">{ }</span>
           <strong>EN<br><em>CONSTRUCCIÓN</em></strong><span>Motor de auditoría y remediación de accesibilidad web</span>
         </div><div class="construction-bottom"><span>ACCESIBILIDAD · CÓDIGO · IA</span><span>PRÓXIMAMENTE / ↗</span></div>
         <div class="construction-stripes" aria-hidden="true"></div></div>`;
    default: return '';
  }
}
function safeText(value) { return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;'); }
function projectCard(project) {
  const isSite = (project.kind === 'web' || project.kind === 'hybrid') && Boolean(project.url);
  const isPublicRepo = project.kind === 'software' && project.visibility === 'public' && Boolean(project.url);
  const role = project.ownership === 'coautor' ? 'COAUTOR' : 'AUTOR';
  const action = isSite
    ? `<a class="project-link" href="${safeText(project.url)}" target="_blank" rel="noopener noreferrer" aria-label="Visitar la web de ${safeText(project.title)}"><span class="external-link-icon">↗</span><span>Visitar web</span>${icons.arrow}</a>`
    : isPublicRepo
      ? `<a class="project-link" href="${safeText(project.url)}" target="_blank" rel="noopener noreferrer" aria-label="Ver código de ${safeText(project.title)} en GitHub">${icons.github}<span>Código</span>${icons.arrow}</a>`
      : `<span class="project-private"><span aria-hidden="true">↗</span> Repositorio privado</span>`;
  const status = project.status === 'development' ? `<span class="project-status">En construcción</span>` : '';
  return `<article class="project-card ${project.feature ? 'featured' : ''} ${project.wide ? 'project-wide' : ''}" data-ownership="${project.ownership}" data-visibility="${project.visibility}" data-kind="${project.kind}" data-project="${safeText(project.id)}"><div class="project-art art-${safeText(project.art)}-wrap">${art(project.art)}<div class="art-watermark">${safeText(project.number)} / ${String(projects.length).padStart(2, '0')}</div></div><div class="project-content"><div class="project-overline"><span>${safeText(project.number)} / ${safeText(project.kicker)}</span><span class="project-role">${role}</span></div><div class="project-title-row"><h3>${safeText(project.title)}</h3></div>${status}<p>${safeText(project.summary)}</p><div class="project-footer"><div class="project-tags">${project.tags.map(x => `<span>${safeText(x)}</span>`).join('')}</div>${action}</div></div></article>`;
}
function renderProjects(filter = 'todos') {
  const items = projects.filter(project => filter === 'todos' || (filter === 'publico' ? (project.kind === 'software' && project.visibility === 'public') : filter === 'webs' ? (project.kind === 'web' || (project.kinds || []).includes('web')) : project.ownership === filter));
  grid.innerHTML = items.map(projectCard).join('');
  results.textContent = `${items.length} ${items.length === 1 ? 'proyecto' : 'proyectos'}`;
  filters.forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  grid.querySelectorAll('.project-art').forEach(card => card.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch')
      return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  }));
}
if (grid) {
  renderProjects();
  filters.forEach(btn => btn.addEventListener('click', () => renderProjects(btn.dataset.filter)));
}
const menuButton = document.querySelector('#menu-button');
const mobileNav = document.querySelector('#mobile-nav');
if (menuButton && mobileNav) {
  const closeMenu = () => { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menú'); mobileNav.hidden = true; document.body.classList.remove('menu-open'); };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    mobileNav.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape')
      closeMenu();
  });
}
// Subtle parallax only for precise pointer devices and non-reduced-motion visitors.
if (window.matchMedia('(prefers-reduced-motion: no-preference) and (pointer: fine)').matches) {
  const visual = document.querySelector('.hero-visual');
  const terminal = document.querySelector('.terminal-card');
  if (visual && terminal) {
    visual.addEventListener('pointermove', e => {
      const rect = visual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - .5;
      const y = (e.clientY - rect.top) / rect.height - .5;
      terminal.style.transform = `translate(${x * 9}px,${y * 9}px) rotate(${x * 1.25}deg)`;
    });
    visual.addEventListener('pointerleave', () => { terminal.style.transform = ''; });
  }
}
