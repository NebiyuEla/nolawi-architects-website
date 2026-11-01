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
  { slug:'hope-haven', number:'01', title:'Hope Haven Youth Center', category:'Architecture', place:'Addis Ababa, Ethiopia', image:'assets/project-01.jpg', alt:'Hope Haven Youth Center architectural render', summary:'A versatile youth center for learning, gathering and shared activity.', detail:'Auditorium, classrooms, IT rooms, a library and workshops are organized across a sloping site. The plan uses the natural level change to shape circulation and make a welcoming place for the community.' },
  { slug:'commercial-pair', number:'02', title:'Commercial Pair', category:'Architecture', place:'Addis Ababa, Ethiopia', image:'assets/project-02.jpg', alt:'Commercial Pair building render', summary:'Two commercial buildings created for Bihere Tsige St. Mary Church.', detail:'A pair of G+3 buildings combines active ground-floor banks and cafes with flexible upper-level office, studio and rental spaces. The project is designed to support church revenue and street life.' },
  { slug:'timeless-fusion', number:'03', title:'Timeless Fusion Apartment', category:'Architecture', place:'Addis Ababa, Ethiopia', image:'assets/project-03.jpg', alt:'Timeless Fusion apartment render', summary:'A G+8 apartment that brings classical character into a contemporary city building.', detail:'Stone cladding, glass and a balanced facade give the apartment a distinct urban presence. Its interior and exterior language is designed to feel coherent, comfortable and enduring.' },
  { slug:'divine-entrance', number:'04', title:'Divine Entrance Church Gate', category:'Architecture', place:'Addis Ababa, Ethiopia', image:'assets/project-04.jpg', alt:'Divine Entrance church gate render', summary:'A new entrance that extends the identity and heritage of Bihere Tsige St. Mary Church.', detail:'The gate takes cues from the cathedral’s arches, proportions and material palette. Its solid composition conveys protection and permanence while retaining clear, accessible movement.' },
  { slug:'ene-misrak', number:'05', title:'Ene Misrak Mixed Use', category:'Architecture', place:'Addis Ababa, Ethiopia', image:'assets/project-05.jpg', alt:'Ene Misrak mixed-use building render', summary:'A G+9 mixed-use building with a contemporary facade and rooftop terrace.', detail:'White surfaces, dark vertical accents, generous glazing and planted balconies establish a strong urban identity. The lower floors open toward the city while upper levels provide homes and private outdoor space.' },
  { slug:'elevated-living', number:'06', title:'Elevated Living Residence', category:'Architecture', place:'Addis Ababa, Ethiopia', image:'assets/project-06.jpg', alt:'Elevated Living residence render', summary:'A G+2 family residence designed around openness, light and indoor-outdoor connection.', detail:'Open living areas, generous glazing and refined neutral finishes create a calm contemporary home. A separate two-bedroom rental apartment forms part of the upper level.' },
  { slug:'elegant-living', number:'07', title:'Elegant Living Apartment', category:'Interiors', place:'Addis Ababa, Ethiopia', image:'assets/project-07.jpg', alt:'Elegant Living apartment interior', summary:'A four-bedroom apartment interior defined by warm wood, off-white finishes and calm detail.', detail:'The open plan is designed to support family life while maintaining a quiet, luxurious atmosphere. Each bedroom balances comfort, functionality and a consistent material language.' },
  { slug:'elevated-living-interior', number:'08', title:'Elevated Living Interior', category:'Interiors', place:'Addis Ababa, Ethiopia', image:'assets/project-08.jpg', alt:'Elevated Living interior render', summary:'A Japandi-inspired residence that pairs natural wood with quiet white surfaces.', detail:'The interior uses Scandinavian and Japandi cues to create a light, composed home. Open planning, warm texture and minimal detail support a refined everyday living environment.' },
  { slug:'cedar-condominium', number:'09', title:'Cedar Condominium Renovation', category:'Interiors', place:'Addis Ababa, Ethiopia', image:'assets/project-09.jpg', alt:'Cedar Condominium interior renovation', summary:'A three-bedroom condominium renovation that blends classical and modern sensibilities.', detail:'White, gray and earth-toned finishes maintain a bright, open feel. The living, dining and corridor spaces are connected through a clear material palette and functional planning.' },
  { slug:'kitchen-residence', number:'10', title:'Kitchen Residence', category:'Interiors', place:'Addis Ababa, Ethiopia', image:'assets/project-10.jpg', alt:'Kitchen Residence interior', summary:'A modern kitchen with a central island, warm brown detail and a clean white palette.', detail:'Aluminum-framed glass doors, integrated lighting and practical storage create a bright, elegant kitchen designed for everyday use.' },
  { slug:'rental-apartment', number:'11', title:'Rental Apartment', category:'Interiors', place:'Addis Ababa, Ethiopia', image:'assets/project-11.jpg', alt:'Rental Apartment interior', summary:'A modern apartment interior designed to be comfortable, durable and ready to move into.', detail:'Contemporary finishes, useful storage and considered lighting make each room efficient and welcoming. The neutral palette supports broad rental appeal and long-term value.' },
  { slug:'brew-bloom', number:'12', title:'Brew and Bloom', category:'Interiors', place:'4 Kilo, Addis Ababa', image:'assets/project-12.jpg', alt:'Brew and Bloom interior', summary:'A warm, minimalist interior shaped around efficient use of space and a calm material palette.', detail:'Natural texture, soft tones and carefully planned furniture create an inviting setting that feels open, functional and contemporary.' },
  { slug:'ebo-bizztech', number:'13', title:'Smart Workspace Tech Office', category:'Interiors', place:'Meskel Flower, Addis Ababa', image:'assets/project-13.jpg', alt:'EBO BizzTech tech office interior', summary:'A bright collaborative office created for EBO BizzTech Solutions.', detail:'A six-person open workstation, management desks and guest seating are brought together in a compact workplace. Green, orange and white elements reflect the client identity without sacrificing focus.' },
  { slug:'airport-office', number:'14', title:'M Office and Conference Rooms', category:'Interiors', place:'Addis Ababa Airport Branch', image:'assets/project-14.jpg', alt:'M Office and Conference Rooms interior', summary:'A managerial office and conference environment with a modern, tailored character.', detail:'New finishes work with existing furniture to create a cohesive office. Conference rooms frame presentations clearly, while lighting, materials and display placement support professional use.' },
  { slug:'vibrant-space', number:'15', title:'Vibrant Space', category:'Interiors', place:'Lebu Gabriel, Addis Ababa', image:'assets/project-15.jpg', alt:'Vibrant Space printing and advertising interior', summary:'A compact printing and advertising shop that works hard in every square meter.', detail:'Reception, display, customer seating and production areas are organized into one clear workflow. Practical furniture and integrated storage keep the commercial interior efficient and welcoming.' },
  { slug:'ibn-office', number:'16', title:'Managerial Office', category:'Interiors', place:'Addis Ababa, Ethiopia', image:'assets/project-16.jpg', alt:'Managerial Office interior', summary:'A professional office interior balancing light gray finishes with natural wood.', detail:'The design creates a composed, luxurious atmosphere through warm timber, carefully placed lighting and a calm layout that supports focused executive work.' },
  { slug:'outdoor-bar', number:'17', title:'Outdoor Bar and Dining', category:'Interiors', place:'Private residence', image:'assets/project-17.jpg', alt:'Outdoor Bar and Dining render', summary:'An open-air bar and dining setting that brings contemporary detail into a garden atmosphere.', detail:'Wood, glass, greenery and contemporary finishes create a relaxed space for hosting. The design is warm, practical and closely connected to the outdoors.' }
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

const featuredSlugs = ['hope-haven', 'ebo-bizztech', 'divine-entrance', 'outdoor-bar'];
document.querySelectorAll('.featured .project-list .project-card').forEach((element, index) => {
  const project = projects.find((item) => item.slug === featuredSlugs[index]);
  if (!project) return;
  element.href = `project.html?slug=${encodeURIComponent(project.slug)}`;
  const image = element.querySelector('img');
  if (image) { image.src = project.image; image.alt = project.alt; }
  const title = element.querySelector('h3');
  if (title) title.textContent = project.title;
  const detail = element.querySelector('.project-info p');
  if (detail) detail.textContent = `${project.category} / ${project.place}`;
  const number = element.querySelector('.project-info small');
  if (number) number.textContent = project.number;
});

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
