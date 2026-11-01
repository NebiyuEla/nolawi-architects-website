const favicon = document.querySelector('link[rel~="icon"]') || document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/png';
favicon.href = 'assets/nolawi-icon.png';
if (!favicon.parentElement) document.head.append(favicon);

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
if (menuButton && navigation) {
  const setMenuOpen = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
  };
  menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
  document.addEventListener('pointerdown', (event) => {
    if (menuButton.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) setMenuOpen(false);
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', () => setMenuOpen(false));
}

const projects = [
  { slug:'hope-haven', number:'01', title:'Hope Haven Youth Center', category:'Architecture', place:'Addis Ababa, Ethiopia', image:'assets/garden-house.webp', alt:'Hope Haven Youth Center architectural render', summary:'A youth center for learning, gathering and shared activity.', detail:'Auditorium, classrooms, IT rooms, a library and workshops are brought together across a sloping site. The plan follows the natural level change to make circulation clear and create a welcoming place for the community.' },
  { slug:'bihere-tsige', number:'02', title:'Bihere Tsige St. Mary Church', category:'Architecture', place:'Addis Ababa, Ethiopia', image:'assets/house-of-light.webp', alt:'Bihere Tsige St. Mary Church architectural render', summary:'A church project shaped by its spiritual and architectural setting.', detail:'The design takes direction from the surrounding church architecture, using proportion, arches and lasting natural finishes to create continuity with its setting.' },
  { slug:'ene-misrak', number:'03', title:'Ene Misrak Residence', category:'Architecture', place:'Ethiopia', image:'assets/eden-house.webp', alt:'Ene Misrak residential building', summary:'A contemporary residence with a confident street presence.', detail:'Practical planning, generous glazing and a contemporary exterior come together in a residential building designed for everyday use and a strong architectural identity.' },
  { slug:'ebo-bizztech', number:'04', title:'EBO BizzTech Office', category:'Interiors', place:'Meskel Flower, Addis Ababa', image:'assets/studio-office.webp', alt:'EBO BizzTech Office interior', summary:'A bright collaborative workplace for a growing technology company.', detail:'Open workstations, managerial desks and guest seating are arranged in a clear sequence. Green, orange and white accents connect the workplace to the client identity.' },
  { slug:'outdoor-bar', number:'05', title:'Outdoor Bar & Dining', category:'Interiors', place:'Private residence', image:'assets/outdoor-table.webp', alt:'Outdoor bar and dining project', summary:'An open-air place to eat, gather and spend time together.', detail:'Natural materials, greenery and contemporary finishes bring warmth to an outdoor dining space designed to feel relaxed and inviting.' },
  { slug:'desalegn-residence', number:'06', title:'Dr. Desalegn Ayalew Residence', category:'Architecture', place:'Addis Ababa, Ethiopia', image:'assets/family-home.webp', alt:'Dr. Desalegn Ayalew residence', summary:'A G+2 home organized around light, openness and family life.', detail:'An open plan supports fluid movement through the home. Large glazed areas bring daylight inside and strengthen the connection between rooms and the landscape.' }
];

/* A single hero controller shared by desktop, tablet and mobile. The first
   project renders without JavaScript; the remaining images load on demand. */
const heroSlider = document.querySelector('[data-hero-slider]');
if (heroSlider) {
  const slides = [...heroSlider.querySelectorAll('.hero-slide')];
  const featured = [
    { title: 'Ene Misrak Residence', slug: 'ene-misrak' },
    { title: 'Hope Haven Youth Center', slug: 'hope-haven' },
    { title: 'Bihere Tsige St. Mary Church', slug: 'bihere-tsige' },
    { title: 'EBO BizzTech Office', slug: 'ebo-bizztech' }
  ];
  const title = heroSlider.querySelector('[data-hero-title]');
  const link = heroSlider.querySelector('[data-hero-link]');
  const counter = heroSlider.querySelector('[data-hero-count]');
  const previous = heroSlider.querySelector('[data-hero-prev]');
  const next = heroSlider.querySelector('[data-hero-next]');
  const toggle = heroSlider.querySelector('[data-hero-toggle]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let timer = null;
  let requestId = 0;
  let userPaused = false;
  let focusPaused = false;
  let inView = true;
  const intervalMs = 6500;

  const prepare = (index) => {
    const image = slides[index];
    if (!image) return;
    const url = image.getAttribute('data-src');
    if (url) {
      image.loading = 'eager';
      image.fetchPriority = 'low';
      image.src = url;
      image.removeAttribute('data-src');
    }
  };
  const shouldRun = () => !userPaused && !focusPaused && inView && !document.hidden && !reducedMotion.matches;
  const restart = () => {
    if (timer !== null) window.clearInterval(timer);
    timer = shouldRun() && slides.length > 1
      ? window.setInterval(() => { void show((current + 1) % slides.length); }, intervalMs)
      : null;
  };
  const show = async (nextIndex) => {
    const candidate = (nextIndex + slides.length) % slides.length;
    if (candidate === current) return;
    const serial = ++requestId;
    prepare(candidate);
    const image = slides[candidate];
    try { await image.decode(); } catch { /* Keep the current photo if loading failed. */ }
    if (serial !== requestId || !image.naturalWidth) return;
    slides.forEach((slide, index) => {
      const active = index === candidate;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    current = candidate;
    title.textContent = featured[current].title;
    link.href = `project.html?slug=${encodeURIComponent(featured[current].slug)}`;
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    heroSlider.dataset.slideNumber = `N / ${String(current + 1).padStart(2, '0')}`;
    prepare((current + 1) % slides.length);
    restart();
  };

  if (slides.length === featured.length && title && link && counter && previous && next && toggle) {
    heroSlider.classList.add('is-ready');
    prepare(1);
    previous.addEventListener('click', () => { void show(current - 1); });
    next.addEventListener('click', () => { void show(current + 1); });
    toggle.addEventListener('click', () => {
      userPaused = !userPaused;
      toggle.textContent = userPaused ? 'Play' : 'Pause';
      toggle.setAttribute('aria-label', userPaused ? 'Resume slideshow' : 'Pause slideshow');
      toggle.setAttribute('aria-pressed', String(userPaused));
      restart();
    });
    heroSlider.addEventListener('focusin', (event) => {
      if (event.target.matches(':focus-visible')) { focusPaused = true; restart(); }
    });
    heroSlider.addEventListener('focusout', () => {
      window.setTimeout(() => {
        focusPaused = Boolean(heroSlider.querySelector(':focus-visible'));
        restart();
      }, 0);
    });
    let startX = null;
    heroSlider.querySelector('.hero-slides').addEventListener('touchstart', (event) => {
      if (event.touches.length === 1) startX = event.touches[0].clientX;
    }, { passive: true });
    heroSlider.querySelector('.hero-slides').addEventListener('touchend', (event) => {
      if (startX === null || !event.changedTouches.length) return;
      const delta = event.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(delta) > 55) void show(current + (delta < 0 ? 1 : -1));
    }, { passive: true });
    document.addEventListener('visibilitychange', restart);
    reducedMotion.addEventListener('change', restart);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        inView = entries[0].isIntersecting;
        restart();
      }, { threshold: .2 });
      observer.observe(heroSlider);
    }
    restart();
  }
}

function card(project) {
  return `<a class="project-card" data-category="${project.category.toLowerCase()}" href="project.html?slug=${encodeURIComponent(project.slug)}"><div class="project-image"><img src="${project.image}" alt="${project.alt}" loading="lazy"><i class="project-mark">↗</i></div><div class="project-info"><div><h3>${project.title}</h3><p>${project.category} / ${project.place}</p></div><small>${project.number}</small></div></a>`;
}
document.querySelectorAll('[data-projects="all"]').forEach((grid) => { grid.innerHTML = projects.map(card).join(''); });

document.querySelectorAll('.filter-button').forEach((button) => button.addEventListener('click', () => {
  const active = button.dataset.filter;
  document.querySelectorAll('.filter-button').forEach((item) => { const selected = item === button; item.classList.toggle('is-active', selected); item.setAttribute('aria-pressed', String(selected)); });
  document.querySelectorAll('.all-projects .project-card').forEach((item) => { item.hidden = active !== 'all' && item.dataset.category !== active; });
}));

const detailPage = document.querySelector('[data-project-detail]');
if (detailPage) {
  const project = projects.find((item) => item.slug === new URLSearchParams(location.search).get('slug')) || projects[0];
  document.title = `${project.title} | Nolawi Architects`;
  detailPage.querySelector('[data-project-title]').textContent = project.title;
  detailPage.querySelector('[data-project-type]').textContent = project.category;
  detailPage.querySelector('[data-project-place]').textContent = project.place;
  detailPage.querySelector('[data-project-summary]').textContent = project.summary;
  detailPage.querySelector('[data-project-detail-text]').textContent = project.detail;
  const image = detailPage.querySelector('[data-project-image]'); image.src = project.image; image.alt = project.alt;
  detailPage.querySelector('[data-project-inquiry]').href = `contact.html?project=${encodeURIComponent(project.title)}`;
}

const projectName = new URLSearchParams(location.search).get('project');
if (projectName) { const note = document.querySelector('[data-project-note]'); if (note) note.textContent = `Tell us about ${projectName}.`; document.querySelectorAll('[data-project-email]').forEach((link) => { link.href = `mailto:nolawiarchitects@gmail.com?${new URLSearchParams({subject:`Project enquiry: ${projectName}`})}`; }); }

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('has-motion');
  const scrollImages = [...document.querySelectorAll('.hero-visual img, .studio-photo img, .project-hero img')];
  const sections = [...document.querySelectorAll('main > section:not(.hero)')];
  let ticking = false;
  const updateMotion = () => {
    scrollImages.forEach((image) => {
      const rect = image.parentElement.getBoundingClientRect();
      const shift = Math.max(-16, Math.min(16, (window.innerHeight / 2 - (rect.top + rect.height / 2)) * .045));
      image.style.setProperty('--scroll-shift', `${shift}px`);
    });
    const availableScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    document.documentElement.style.setProperty('--page-progress', String(Math.min(1, window.scrollY / availableScroll)));
    ticking = false;
  };
  const requestMotionUpdate = () => {
    if (!ticking) { requestAnimationFrame(updateMotion); ticking = true; }
  };
  updateMotion();
  window.addEventListener('scroll', requestMotionUpdate, { passive: true });
  window.addEventListener('resize', requestMotionUpdate, { passive: true });
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle('is-inview', entry.isIntersecting)), { threshold: .08 });
  sections.forEach((section) => observer.observe(section));
}
