const favicon = document.querySelector('link[rel~="icon"]') || document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/png';
favicon.href = 'assets/nolawi-favicon.png';
if (!favicon.parentElement) document.head.append(favicon);

const skipLink = document.createElement('a');
skipLink.className = 'skip-link';
skipLink.href = '#main-content';
skipLink.textContent = 'Skip to main content';
document.body.prepend(skipLink);
const mainContent = document.querySelector('main');
if (mainContent && !mainContent.id) mainContent.id = 'main-content';

document.querySelectorAll('.site-header').forEach((header) => {
  const aboutLink = header.querySelector('a[href="studio.html"]');
  if (aboutLink) aboutLink.textContent = 'About Us';
  if (header.querySelector('.header-title')) return;
  const title = document.createElement('a');
  title.className = 'header-title';
  title.href = 'index.html';
  title.setAttribute('aria-label', 'Nolawi Architects home');
  title.innerHTML = 'NOLAWI <span>ARCHITECTS</span>';
  header.insertBefore(title, header.querySelector('.site-nav'));
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
if (menuButton && navigation) {
  const setMenuOpen = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
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

const projectFacts = {
  'hope-haven': { client: 'Finote Birhan Sunday School', service: 'Full design service' },
  'commercial-pair': { client: 'Bihere Tsige St. Mary Church', service: 'Full design service' },
  'timeless-fusion': { client: 'Mr. Tariku Bahiru', service: 'Full design service' },
  'divine-entrance': { client: 'Bihere Tsige St. Mary Church', service: 'Full design service' },
  'ene-misrak': { client: 'Ene Misrak', service: 'Full design service' },
  'elevated-living': { client: 'Dr. Desalegn Ayalew', service: 'Full design, construction and finishing' },
  'elegant-living': { client: 'Mr. Iyasu Addisu / Tracon Real Estate', service: 'Interior design, furnishing and finishing' },
  'elevated-living-interior': { client: 'Dr. Desalegn Ayalew', service: 'Interior design, construction and finishing' },
  'cedar-condominium': { client: 'Cedar Furniture', service: 'Interior design' },
  'kitchen-residence': { client: 'Ato Wubsefer Mengistu', service: 'Interior design' },
  'rental-apartment': { client: 'Mr. Abdi Mohamed', service: 'Interior design, furnishing and finishing' },
  'brew-bloom': { client: 'Mr. Zelalem Birhanu', service: 'Interior design, finishing and furnishing' },
  'ebo-bizztech': { client: 'EBO BizzTech Solutions PLC', service: 'Interior design, finishing and furnishing' },
  'airport-office': { client: 'Customs Commission, Addis Ababa Airport Branch', service: 'Interior design bid' },
  'vibrant-space': { client: 'Mr. Haile Esayas', service: 'Interior design, finishing and furnishing' },
  'ibn-office': { client: 'IBN Import Export', service: 'Interior design' },
  'outdoor-bar': { client: 'Private client', service: 'Interior design' }
};

const projectLongDetails = {
  'hope-haven': [
    `Hope Haven is a versatile youth centre for Finote Birhan Sunday School in Addis Ababa, Ethiopia. The main auditorium extends from the ground floor into the semi-basement, while the upper floors contain smaller halls, gathering spaces, classrooms, IT rooms, a library and workshops. The building is being constructed on a 750-square-metre site.`,
    `The site has a considerable slope, so the design incorporates the natural level change into the auditorium seating and circulation. Accessibility and seamless movement between functional zones create a dynamic flow throughout the building, while strategically placed openings maximise natural light and ventilation.`,
    `The exterior combines concrete and wood with large glass panels to express transparency and openness. A grand arched entrance creates a welcoming arrival, and landscaped gardens, pathways and outdoor gathering areas encourage social interaction and connection with nature. The overall composition balances function and aesthetics to create an inspiring place for youth engagement and creativity.`
  ],
  'commercial-pair': [
    `This project comprises two consecutive commercial buildings for Bihere Tsige St. Mary Church, positioned in front of a school compound in Addis Ababa. The objective is to create functional and attractive rental units that generate income for the church while serving the surrounding community.`,
    `The first building occupies a 400-square-metre plot and the second a 225-square-metre plot. Both use a G+3 configuration to maximise commercial capacity. Their location benefits from strong visibility and foot traffic from the school and neighbourhood.`,
    `Banks and cafés activate the ground floors, while the upper levels provide offices, studios and flexible rental spaces for different tenants. Natural light and ventilation are prioritised through carefully placed openings. Conventional materials and modern detailing give the façades a simple, functional character that responds to the surrounding urban context.`
  ],
  'timeless-fusion': [
    `Timeless Fusion is a nine-storey G+8 apartment building that combines modern and classical architecture. Clean contemporary lines and open spaces are paired with traditional materials and carefully considered classical detailing, creating a distinctive identity with broad appeal.`,
    `Stone cladding and a glass façade give the building a strong urban presence. Efficient layouts, integrated amenities and sustainable features support contemporary living, while the exterior architectural language continues into the interior spaces to create a coherent experience throughout the building.`
  ],
  'divine-entrance': [
    `The church gate is designed to blend with the architectural identity of Bihere Tsige St. Mary Church. Existing arches, domes, ornamentation, proportions and materials inform the new design so that it respects the cathedral's heritage while introducing a functional entrance.`,
    `A sense of structural weight communicates protection, emphasis and respect. Robust stone elements and a substantial frame create permanence and make the gate a guardian of the sacred space. Natural finishes are intended to age gracefully, while wide openings and carefully placed decoration preserve clear, accessible movement for everyone.`
  ],
  'ene-misrak': [
    `This ten-storey G+9 mixed-use building with a rooftop terrace is envisioned as a contemporary urban landmark. Clean geometric forms, white exterior finishes, dark vertical accents and expansive glazing create a sophisticated composition that balances solid surfaces with transparency.`,
    `Floor-to-ceiling glazing on the lower levels strengthens the connection between the interior and the city. Repetitive upper-floor windows and recessed balconies improve function and provide private outdoor space for residents. Integrated greenery softens the façade, while the rooftop terrace offers an additional place for relaxation and leisure. The project brings together architectural elegance, practical planning and modern material expression for contemporary residential and commercial use.`
  ],
  'elevated-living': [
    `This G+2 residence in Addis Ababa expresses contemporary luxury through an open-plan organisation that supports fluid movement and visual connection. Large glazed openings frame views, increase natural light and strengthen the relationship between indoor and outdoor spaces.`,
    `Premium materials, refined detailing and neutral tones define the exterior. Modern geometry and textured plaster finishes create a sophisticated façade that remains connected to its local context. The ground floor contains the main living, dining and entertainment areas, organised around a feature staircase. Private suites with balconies occupy the upper floors, while the second floor includes a self-contained two-bedroom apartment for rental use.`
  ],
  'elegant-living': [
    `This four-bedroom apartment interior for Mr. Iyasu Addisu and Tracon Real Estate is defined by off-white tones, warm timber and soft cream hues. An open-plan layout improves light and spaciousness, while elegant finishes and refined detailing create a calm, sophisticated atmosphere. The bedrooms combine comfort and practical planning to support the needs of a large family.`
  ],
  'elevated-living-interior': [
    `The interior of this G+2 residence draws on Scandinavian and Japandi design. White surfaces and natural timber tones create a serene, minimalist atmosphere, while the open plan improves light and spatial flow. Warm textures and carefully controlled details balance simplicity with comfort and give the home a refined contemporary character.`
  ],
  'cedar-condominium': [
    `This three-bedroom condominium renovation combines classical and modern influences with an emphasis on clean lines, openness and function. White, grey and earth tones make the home feel bright and spacious, while the open plan connects the living, dining and corridor areas through a consistent material language.`
  ],
  'kitchen-residence': [
    `This modern residential kitchen is organised around a central island and a clean white-and-brown palette. Aluminium-framed glass doors, integrated lighting and carefully planned storage create an interior that is bright, elegant and practical for everyday use.`
  ],
  'rental-apartment': [
    `The apartment is designed as a stylish, comfortable and functional rental home. Clean lines, neutral colours, contemporary finishes and coordinated materials create a timeless atmosphere that can appeal to a broad range of tenants.`,
    `Each space maximises efficiency and comfort while maintaining one visual identity throughout the apartment. Modern lighting, practical storage, durable materials and carefully selected furniture create an elegant, low-maintenance and move-in-ready home that supports both rental appeal and long-term value.`
  ],
  'brew-bloom': [
    `Located in the 4 Kilo area, this one-bedroom interior uses a minimalist modern approach focused on simplicity, function and efficient use of space. A clean white palette is combined with warm tones, natural textures and carefully selected materials to create a calm and welcoming environment.`,
    `Thoughtful planning, functional furniture and smart storage make full use of the available area. Minimal detailing and a consistent material palette preserve openness and visual harmony, resulting in a practical and comfortable interior that balances modern simplicity with warmth.`
  ],
  'ebo-bizztech': [
    `This creative technology office for EBO BizzTech Solutions PLC is located in the Meskel Flower area. The interior is designed as a modern, dynamic and collaborative workplace. Green, orange and white elements carry the company's brand identity into the finishes, furniture and decoration while maintaining a professional atmosphere.`,
    `The layout includes a six-person open workstation, two dedicated management desks and a welcoming guest area. Efficient use of space, contemporary furniture, geometric forms, planned lighting and selected decorative details create a cohesive workplace that supports collaboration and reflects the identity of a growing technology company.`
  ],
  'airport-office': [
    `This interior-design bid for the Customs Commission Addis Ababa Airport Branch includes a general manager's office with a modern, luxurious character. Existing furniture is integrated into the new palette, and alternative treatments were developed for the bathroom wall to conceal the door and create a seamless appearance.`,
    `Two conference rooms were also designed with clean lines and functional simplicity. The central display and stage are visually framed for clear visibility, and display sizes are selected according to the dimensions of each room.`
  ],
  'vibrant-space': [
    `Located in the Lebu Gabriel area, this printing and advertising shop combines customer-facing areas with a functional production workshop in a compact space. Smart planning, efficient storage and multifunctional elements make use of every available square metre.`,
    `The layout includes a reception counter, product displays, customer seating and a dedicated printing and production area. Contemporary finishes, practical furniture and integrated storage maintain an efficient workflow while creating an organised, professional and welcoming commercial interior.`
  ],
  'ibn-office': [
    `This managerial office for IBN Import Export is designed to feel professional, modern and refined. Natural timber and light grey finishes introduce warmth, dependability and authenticity, while the coordinated palette and detailing create a graceful, luxurious executive environment.`
  ],
  'outdoor-bar': [
    `This outdoor bar and dining area for a private client combines contemporary design with natural materials. Clean lines and modern finishes are balanced by timber, glass and greenery, creating a warm setting for dining and entertaining with a strong connection to nature.`
  ]
};

const generalObjectives = document.querySelector('.objective-columns > div:first-child ul');
if (generalObjectives && !generalObjectives.textContent.includes('strong reputation')) {
  const objective = document.createElement('li');
  objective.textContent = 'Establish a strong reputation as a reliable, competitive and client-focused consultancy.';
  generalObjectives.append(objective);
}

/* A single hero controller shared by desktop, tablet and mobile. The first
   project renders without JavaScript; the remaining images load on demand. */
const heroSlider = document.querySelector('[data-hero-slider]');
if (heroSlider) {
  const slides = [...heroSlider.querySelectorAll('.hero-slide')];
  const featured = [
    { title: 'Ene Misrak Mixed Use', slug: 'ene-misrak' },
    { title: 'Hope Haven Youth Center', slug: 'hope-haven' },
    { title: 'Divine Entrance Church Gate', slug: 'divine-entrance' },
    { title: 'Smart Workspace Tech Office', slug: 'ebo-bizztech' }
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
  detailPage.querySelector('[data-project-detail-text]').textContent = (projectLongDetails[project.slug] || [project.detail]).join('\n\n');
  const facts = projectFacts[project.slug] || { client: 'Private client', service: project.category };
  detailPage.querySelector('[data-project-client]').textContent = facts.client;
  detailPage.querySelector('[data-project-service]').textContent = facts.service;
  const image = detailPage.querySelector('[data-project-image]'); image.src = project.image; image.alt = project.alt;
  detailPage.querySelector('[data-project-inquiry]').href = `contact.html?project=${encodeURIComponent(project.title)}`;
  fetch('galleries.json').then((response) => {
    if (!response.ok) throw new Error('Gallery unavailable');
    return response.json();
  }).then((galleries) => {
    const files = galleries[project.number] || [];
    const section = document.createElement('section');
    section.className = 'project-gallery';
    const heading = document.createElement('h2');
    heading.className = 'display';
    heading.textContent = 'Project gallery';
    section.append(heading);
    const grid = document.createElement('div');
    grid.className = 'gallery-grid';
    files.forEach((originalFile, index) => {
      const file = originalFile === 'assets/galleries/06/005.heic' ? 'assets/galleries/06/005.webp' : originalFile;
      const link = document.createElement('a');
      link.href = file;
      if (/\.(jpe?g|png|webp|gif)$/i.test(file)) {
        const image = document.createElement('img');
        image.src = file;
        image.loading = 'lazy';
        image.alt = `${project.title}, view ${index + 1}`;
        link.append(image);
      } else {
        link.className = 'gallery-download';
        link.textContent = `Download project file ${index + 1}`;
        link.setAttribute('download', '');
      }
      grid.append(link);
    });
    section.append(grid);
    detailPage.append(section);
  }).catch(() => {
    const message = document.createElement('p');
    message.className = 'project-gallery';
    message.textContent = 'The project gallery could not be loaded. Please refresh the page.';
    detailPage.append(message);
  });
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
