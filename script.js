const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

if (menuButton && navigation) {
  const header = menuButton.closest('.site-header');
  const label = menuButton.querySelector('.menu-label');
  const setMenuOpen = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Close' : 'Menu';
    navigation.classList.toggle('is-open', open);
  };

  header.classList.add('nav-enhanced');
  menuButton.hidden = false;
  menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
  for (const eventName of ['pointerdown', 'focusin']) {
    document.addEventListener(eventName, (event) => {
      if (!header.contains(event.target)) setMenuOpen(false);
    });
  }
  window.matchMedia('(max-width: 760px)').addEventListener('change', () => setMenuOpen(false));
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

const hero = document.querySelector('[data-hero-slider]');
if (hero) {
  const slides = [...hero.querySelectorAll('.hero-slide')];
  const title = hero.querySelector('[data-hero-title]');
  const link = hero.querySelector('[data-hero-link]');
  const toggle = hero.querySelector('[data-hero-motion]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let timer;
  let inView = true;
  let paused = false;

  const canRotate = () => inView && !paused && !document.hidden && !reducedMotion.matches
    && !link.matches(':hover, :focus-within') && !toggle.matches(':focus');

  const loadSlide = async (index) => {
    const image = slides[index];
    if (image.dataset.src) {
      image.fetchPriority = 'low';
      image.src = image.dataset.src;
      delete image.dataset.src;
    }
    try {
      await image.decode();
      return image.naturalWidth > 0;
    } catch {
      return false;
    }
  };

  const showNext = async () => {
    for (let step = 1; step < slides.length; step++) {
      const candidate = (current + step) % slides.length;
      if (!await loadSlide(candidate)) continue;
      if (!canRotate()) break;
      const project = projects.find(({ slug }) => slug === slides[candidate].dataset.project);
      if (!project) continue;
      slides[current].classList.remove('is-active');
      slides[candidate].classList.add('is-active');
      current = candidate;
      title.textContent = project.title;
      link.href = 'project.html?slug=' + encodeURIComponent(project.slug);
      break;
    }
    schedule();
  };

  function schedule() {
    clearTimeout(timer);
    if (canRotate() && slides.length > 1) timer = setTimeout(showNext, 6500);
  }

  function updateMotionPreference() {
    toggle.hidden = reducedMotion.matches || slides.length < 2;
    schedule();
  }

  if (slides.length > 1) {
    toggle.addEventListener('click', () => {
      paused = !paused;
      toggle.textContent = paused ? 'Resume background rotation' : 'Pause background rotation';
      schedule();
    });
    [link, toggle].forEach((element) => {
      element.addEventListener('focus', schedule);
      element.addEventListener('blur', () => setTimeout(schedule, 0));
    });
    link.addEventListener('pointerenter', schedule);
    link.addEventListener('pointerleave', schedule);
    document.addEventListener('visibilitychange', schedule);
    reducedMotion.addEventListener('change', updateMotionPreference);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        schedule();
      }, { threshold: .2 });
      observer.observe(hero);
    }
    updateMotionPreference();
  }
}

function projectHref(project) {
  return `project.html?slug=${encodeURIComponent(project.slug)}`;
}

function card(project, index) {
  const loading = index < 3 ? 'eager' : 'lazy';
  return `<a class="portfolio-card" data-category="${project.category.toLowerCase()}" href="${projectHref(project)}">
    <span class="portfolio-card-media">
      <img src="${project.image}" alt="" loading="${loading}" decoding="async">
      <span class="portfolio-card-arrow" aria-hidden="true">↗</span>
    </span>
    <div class="portfolio-card-copy">
      <p class="portfolio-card-meta"><span>${project.category}</span><span aria-hidden="true">·</span><span>${project.place}</span></p>
      <h2 class="display portfolio-card-title">${project.title}</h2>
    </div>
  </a>`;
}

const projectGrid = document.querySelector('[data-projects="all"]');
if (projectGrid) {
  projectGrid.innerHTML = projects.map(card).join('');
  const cards = [...projectGrid.querySelectorAll('.portfolio-card')];
  const toolbar = document.querySelector('[data-portfolio-toolbar]');
  const filters = [...toolbar.querySelectorAll('[data-filter]')];
  const count = toolbar.querySelector('[data-portfolio-count]');
  const url = new URL(location.href);

  const setFilter = (active, updateUrl = false) => {
    let visible = 0;
    for (const filter of filters) {
      filter.setAttribute('aria-pressed', String(filter.dataset.filter === active));
    }
    for (const item of cards) {
      item.hidden = active !== 'all' && item.dataset.category !== active;
      if (!item.hidden) visible += 1;
    }
    count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
    if (updateUrl && (url.protocol === 'https:' || url.protocol === 'http:')) {
      if (active === 'all') url.searchParams.delete('type');
      else url.searchParams.set('type', active);
      history.replaceState(null, '', url);
    }
  };

  const selection = url.searchParams.get('type');
  setFilter(filters.some((filter) => filter.dataset.filter === selection) ? selection : 'all');
  filters.forEach((filter) => filter.addEventListener('click', () => setFilter(filter.dataset.filter, true)));
  toolbar.hidden = false;
}

function setupGallery(page, project) {
  const galleryLink = page.querySelector('[data-gallery-link]');
  const galleryCount = page.querySelector('[data-gallery-count]');
  const galleryStatus = page.querySelector('[data-gallery-status]');
  const grid = page.querySelector('[data-gallery-grid]');
  const retry = page.querySelector('[data-gallery-retry]');
  const viewer = page.querySelector('[data-gallery-viewer]');
  const viewerImage = viewer.querySelector('[data-viewer-image]');
  const viewerError = viewer.querySelector('[data-viewer-error]');
  const position = viewer.querySelector('[data-viewer-position]');
  const previous = viewer.querySelector('[data-viewer-previous]');
  const next = viewer.querySelector('[data-viewer-next]');
  const stage = viewer.querySelector('[data-viewer-stage]');
  const close = viewer.querySelector('[data-viewer-close]');
  let files = [];
  let current = 0;
  let opener;
  let touchStart;

  viewer.querySelector('[data-viewer-title]').textContent = project.title;

  const showImage = (index) => {
    current = (index + files.length) % files.length;
    viewerError.hidden = true;
    viewerImage.hidden = false;
    viewerImage.alt = `${project.title}, view ${current + 1}`;
    viewerImage.src = files[current];
    position.textContent = `Image ${current + 1} of ${files.length}`;
  };

  if (typeof viewer.showModal === 'function') {
    grid.addEventListener('click', (event) => {
      const link = event.target.closest('[data-gallery-index]');
      if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      showImage(Number(link.dataset.galleryIndex));
      viewer.showModal();
    });
    viewer.addEventListener('close', () => opener?.focus({ preventScroll: true }));
    viewer.addEventListener('click', (event) => {
      if (event.target === viewer) viewer.close();
    });
    viewer.addEventListener('keydown', (event) => {
      if (files.length < 2) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showImage(current + (event.key === 'ArrowLeft' ? -1 : 1));
      }
    });
    close.addEventListener('click', () => viewer.close());
    previous.addEventListener('click', () => showImage(current - 1));
    next.addEventListener('click', () => showImage(current + 1));
    viewerImage.addEventListener('error', () => {
      viewerImage.hidden = true;
      viewerError.hidden = false;
    });
    stage.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch' && event.isPrimary) {
        touchStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
      }
    });
    stage.addEventListener('pointercancel', () => { touchStart = null; });
    stage.addEventListener('pointerup', (event) => {
      if (!touchStart || touchStart.id !== event.pointerId || files.length < 2) return;
      const dx = event.clientX - touchStart.x;
      const dy = event.clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(dx) > 55 && Math.abs(dx) > 1.35 * Math.abs(dy)) showImage(current + (dx > 0 ? -1 : 1));
    });
  }

  async function loadGallery() {
    retry.hidden = true;
    grid.setAttribute('aria-busy', 'true');
    galleryStatus.textContent = 'Loading project images…';
    galleryStatus.hidden = false;
    try {
      const response = await fetch('galleries.json');
      if (!response.ok) throw new Error('Gallery unavailable');
      const galleries = await response.json();
      files = (galleries[project.number] || []).map((file) => file.replace(/\.heic$/i, '.webp'));
      const thumbnails = files.map((file, index) => {
        const link = document.createElement('a');
        link.className = 'case-gallery-thumb';
        link.href = file;
        link.dataset.galleryIndex = index;
        link.setAttribute('aria-label', `View image ${index + 1} of ${files.length}`);

        const image = document.createElement('img');
        image.src = file;
        image.alt = '';
        image.loading = 'lazy';
        image.decoding = 'async';

        const expand = document.createElement('span');
        expand.className = 'case-gallery-expand';
        expand.setAttribute('aria-hidden', 'true');
        expand.textContent = '↗';
        link.append(image, expand);
        return link;
      });
      grid.replaceChildren(...thumbnails);
      if (files.length) {
        galleryCount.textContent = `${files.length} ${files.length === 1 ? 'image' : 'images'}`;
        previous.hidden = next.hidden = files.length === 1;
        galleryLink.hidden = false;
        galleryStatus.hidden = true;
      } else {
        galleryStatus.textContent = 'Additional images are currently unavailable for this project.';
      }
    } catch {
      galleryStatus.textContent = 'The project gallery could not load.';
      retry.hidden = false;
    } finally {
      grid.removeAttribute('aria-busy');
    }
  }

  retry.addEventListener('click', loadGallery);
  void loadGallery();
}

const detailPage = document.querySelector('[data-project-detail]');
if (detailPage) {
  const slug = new URLSearchParams(location.search).get('slug');
  const project = slug ? projects.find((item) => item.slug === (slug === 'bihere-tsige' ? 'divine-entrance' : slug)) : projects[0];

  if (!project) {
    document.title = 'Project not found | Nolawi Architects';
    detailPage.querySelector('[data-project-unavailable]').hidden = false;
  } else {
    document.title = `${project.title} | Nolawi Architects`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', project.summary);
    detailPage.querySelector('[data-project-title]').textContent = project.title;
    detailPage.querySelector('[data-project-type]').textContent = project.category;
    detailPage.querySelector('[data-project-place]').textContent = project.place;
    detailPage.querySelector('[data-project-summary]').textContent = project.summary;

    const paragraphs = (projectLongDetails[project.slug] || [project.detail]).map((copy) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = copy;
      return paragraph;
    });
    detailPage.querySelector('[data-project-detail-text]').append(...paragraphs);

    const facts = projectFacts[project.slug] || { client: 'Private client', service: project.category };
    detailPage.querySelector('[data-project-client]').textContent = facts.client;
    detailPage.querySelector('[data-project-service]').textContent = facts.service;

    const image = detailPage.querySelector('[data-project-image]');
    image.src = project.image;
    image.alt = project.alt;
    detailPage.querySelector('[data-project-inquiry]').href = `contact.html?project=${encodeURIComponent(project.title)}`;

    const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
    detailPage.querySelector('[data-next-project]').href = projectHref(nextProject);
    detailPage.querySelector('[data-next-category]').textContent = nextProject.category;
    detailPage.querySelector('[data-next-title]').textContent = nextProject.title;
    detailPage.querySelector('[data-next-image]').src = nextProject.image;
    detailPage.querySelector('[data-case-study]').hidden = false;
    setupGallery(detailPage, project);
  }
}

const requestedProject = new URLSearchParams(location.search).get('project');
const contactProject = projects.find(({ title }) => title === requestedProject);
if (contactProject) {
  const note = document.querySelector('[data-project-note]');
  if (note) note.textContent = 'Interested in a project like ' + contactProject.title + '? Tell us what you have in mind.';
  const subject = encodeURIComponent('Project enquiry: ' + contactProject.title);
  document.querySelectorAll('[data-project-email]').forEach((link) => {
    link.href = 'mailto:nolawiarchitects@gmail.com?subject=' + subject;
  });
}
