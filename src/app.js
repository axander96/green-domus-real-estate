import './styles.css';
import './overrides.css';
import './detail-overrides.css';
import './admin-overrides.css';
import './description-overrides.css';
import './rounded-panels.css';
import './typography-overrides.css';
import './admin-crud.css';
import './admin-access.css';
import './agent-photo.css';
import './presentation-cleanup.css';
import { supabase, hasSupabase } from './supabase';

const heroSlides = [
  {
    eyebrow: 'Una nueva forma de encontrar hogar',
    title: 'Espacios que hacen crecer tu historia.',
    copy: 'Propiedades seleccionadas con criterio, visión y un acompañamiento verdaderamente humano.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=88'
  },
  {
    eyebrow: 'Vive donde todo sucede',
    title: 'Tu próxima dirección empieza aquí.',
    copy: 'Descubre apartamentos, villas y oportunidades de inversión en los lugares que importan.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=88'
  },
  {
    eyebrow: 'Invierte con perspectiva',
    title: 'Patrimonio con una mirada más verde.',
    copy: 'Te conectamos con propiedades que tienen valor hoy y posibilidades para mañana.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=88'
  }
];

const seedProperties = [
  { id: 1, title: 'Apartamento Jardines del Este', type: 'Apartamento', operation: 'Venta', price: 280000, location: 'Santo Domingo Este', area: 142, beds: 3, baths: 2, tag: 'Destacada', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85', gallery: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85'], description: 'Una residencia luminosa y serena, con espacios amplios y una distribución pensada para el día a día.' },
  { id: 2, title: 'Villa Brisa del Mar', type: 'Villa', operation: 'Venta', price: 875000, location: 'Punta Cana', area: 388, beds: 4, baths: 4, tag: 'Exclusiva', image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=85', description: 'Arquitectura abierta, jardín tropical y la calma de estar siempre cerca del mar.' },
  { id: 3, title: 'Casa Luz de Guavaberry', type: 'Casa', operation: 'Alquiler', price: 3500, location: 'Juan Dolio', area: 260, beds: 3, baths: 3, tag: 'Nueva', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85', description: 'Una casa familiar rodeada de verde, con terrazas habitables y una atmósfera tranquila.' },
  { id: 4, title: 'Penthouse Naco 360', type: 'Apartamento', operation: 'Venta', price: 645000, location: 'Naco, Santo Domingo', area: 312, beds: 3, baths: 3, tag: 'Destacada', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85', description: 'Vistas abiertas, acabados sobrios y una terraza que convierte cada atardecer en un plan.' },
  { id: 5, title: 'Local 27 · Piantini', type: 'Local comercial', operation: 'Alquiler', price: 4800, location: 'Piantini', area: 185, beds: 0, baths: 2, tag: 'Oportunidad', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85', description: 'Un espacio comercial flexible en una de las zonas más activas y conectadas de la ciudad.' },
  { id: 6, title: 'Solar Encanto del Valle', type: 'Terreno', operation: 'Venta', price: 195000, location: 'Jarabacoa', area: 1250, beds: 0, baths: 0, tag: 'Inversión', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85', description: 'Topografía generosa y vistas naturales para desarrollar un proyecto con identidad.' },
  { id: 7, title: 'Apartamento Cobalto', type: 'Apartamento', operation: 'Alquiler', price: 2200, location: 'Bella Vista', area: 118, beds: 2, baths: 2, tag: 'Disponible', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85', description: 'Diseño contemporáneo y una ubicación práctica para vivir la ciudad a tu ritmo.' },
  { id: 8, title: 'Oficinas Origen', type: 'Oficina', operation: 'Alquiler', price: 3200, location: 'Evaristo Morales', area: 156, beds: 0, baths: 2, tag: 'Disponible', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85', description: 'Luz natural, salas colaborativas y una escala profesional para tu próximo capítulo.' },
  { id: 9, title: 'Casa Arrecife', type: 'Casa', operation: 'Venta', price: 520000, location: 'Las Terrenas', area: 225, beds: 3, baths: 3, tag: 'Exclusiva', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=85', description: 'Materiales naturales y una conexión constante con el paisaje de la costa.' },
  { id: 10, title: 'Proyecto Terra 24', type: 'Proyecto inmobiliario', operation: 'Venta', price: 188000, location: 'Santo Domingo', area: 86, beds: 2, baths: 2, tag: 'En planos', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85', description: 'Un proyecto residencial contemporáneo, pensado para invertir con confianza.' },
  { id: 11, title: 'Villa Olivo', type: 'Villa', operation: 'Alquiler', price: 6900, location: 'Cap Cana', area: 460, beds: 5, baths: 5, tag: 'Exclusiva', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1000&q=85', description: 'Privacidad, amplitud y una vida exterior diseñada para disfrutar sin prisa.' },
  { id: 12, title: 'Apartamento Alto Prado', type: 'Apartamento', operation: 'Venta', price: 365000, location: 'Arroyo Hondo', area: 177, beds: 3, baths: 2, tag: 'Destacada', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85', description: 'Un hogar fresco y equilibrado, cerca de todo lo esencial y lejos del ruido.' }
];

const categories = [
  ['Apartamento', '01', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80'],
  ['Casa', '02', 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=600&q=80'],
  ['Villa', '03', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80'],
  ['Terreno', '04', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80']
];

let properties = [];
let contentSettings = { hero_slides: heroSlides, categories: [], agent_name: 'Asdrúbal Salas', agent_role: 'Agente de bienes raíces', agent_photo: '', phone_one: '(809) 671-1120', phone_two: '(829) 684-7760', whatsapp_number: '18096711120', contact_email: 'greendomusrealestate@gmail.com', header_logo: '/Favicon o logo/Logo blanco.svg', footer_logo: '/Favicon o logo/Diseño sin título.svg', social: {} };
let activeSlide = 0;
let activeFilter = 'Todos';
let searchTerm = '';
let adminProperties = [];
let adminMessage = '';
let editingPropertyId = null;
let adminLoading = false;
let adminLoaded = false;
let adminAuthenticated = false;
let settingsLoaded = false;

function mapRemoteProperty(property, images = []) {
  const galleryRecords = images.filter((image) => image.property_id === property.id).sort((a, b) => a.sort_order - b.sort_order);
  return { id: property.id, code: property.code, title: property.title, type: property.type, operation: property.operation, price: Number(property.price), location: property.location, area: Number(property.area), beds: property.beds, baths: property.baths, tag: property.tag, image: property.image_url, gallery: galleryRecords.map((image) => image.image_url), galleryRecords, description: property.description, is_published: property.is_published, is_featured: property.is_featured };
}

async function loadAdminProperties() {
  if (!supabase || adminLoading) return;
  adminLoading = true;
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) { adminLoading = false; return; }
  const { data: profile, error: profileError } = await supabase.from('profiles').select('role, full_name').eq('id', sessionData.session.user.id).maybeSingle();
  if (profileError || !profile || !['owner', 'creator'].includes(profile.role)) {
    adminMessage = profileError ? profileError.message : 'Tu cuenta inició sesión, pero todavía no tiene permisos de administrador.';
    adminAuthenticated = false;
    adminLoading = false;
    adminLoaded = true;
    render();
    return;
  }
  const { data, error } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
  if (error) { adminMessage = error.message; adminAuthenticated = false; adminLoading = false; adminLoaded = true; render(); return; }
  const { data: images } = data?.length ? await supabase.from('property_images').select('*').in('property_id', data.map((property) => property.id)) : { data: [] };
  adminProperties = (data || []).map((property) => mapRemoteProperty(property, images || []));
  adminAuthenticated = true;
  adminLoading = false;
  adminLoaded = true;
  render();
}

async function uploadPropertyImages(propertyId, files) {
  if (!supabase || !files.length) return [];
  const uploaded = [];
  for (const file of files) {
    const path = `${propertyId}/${crypto.randomUUID()}-${file.name}`;
    const { error } = await supabase.storage.from('property-images').upload(path, file, { upsert: false });
    if (!error) uploaded.push(supabase.storage.from('property-images').getPublicUrl(path).data.publicUrl);
  }
  return uploaded;
}

async function syncProperties() {
  if (!hasSupabase) {
    try {
      const response = await fetch('/content/properties.json', { cache: 'no-store' });
      const catalog = await response.json();
      const entries = Array.isArray(catalog) ? catalog : catalog.properties;
      properties = Array.isArray(entries) ? entries.filter((property) => property.is_published !== false).map((property, index) => ({ id: property.id || property.code || index, ...property, image: property.image || property.image_url, gallery: property.gallery || [] })) : [];
      render();
    } catch { properties = []; render(); }
    return;
  }
  const { data, error } = await supabase.from('properties').select('*').eq('is_published', true).order('is_featured', { ascending: false }).order('created_at', { ascending: false });
  if (error) return;
  if (!data?.length) { properties = []; render(); return; }
  const { data: images } = await supabase.from('property_images').select('*').in('property_id', data.map((property) => property.id));
  properties = data.map((property) => mapRemoteProperty(property, images || []));
  render();
}

async function syncSiteSettings() {
  if (!supabase) {
    try {
      const files = await Promise.all(['site', 'agent', 'branding', 'social', 'categories'].map((name) => fetch(`/content/${name}.json`, { cache: 'no-store' }).then((response) => response.json())));
      const [site, agent, branding, social, categoryData] = files;
      const data = { ...site, ...agent, header_logo: branding.header_logo, footer_logo: branding.footer_logo, social, categories: categoryData.categories || [] };
      contentSettings = { ...contentSettings, ...data };
      if (Array.isArray(data.hero_slides) && data.hero_slides.length) heroSlides.splice(0, heroSlides.length, ...data.hero_slides);
      if (Array.isArray(data.categories) && data.categories.length) categories.splice(0, categories.length, ...data.categories.map((category) => [category.name, category.number, category.image]));
      settingsLoaded = true;
      render();
    } catch { render(); }
    return;
  }
  const { data, error } = await supabase.from('site_settings').select('*').eq('id', 'main').maybeSingle();
  if (!error && data) {
    contentSettings = { ...contentSettings, ...data };
    if (Array.isArray(data.hero_slides) && data.hero_slides.length) heroSlides.splice(0, heroSlides.length, ...data.hero_slides);
    if (Array.isArray(data.categories) && data.categories.length) categories.splice(0, categories.length, ...data.categories);
    settingsLoaded = true;
    render();
  }
}

function applyEditableCopy() {
  const about = document.querySelector('.intro-band');
  if (!about) return;
  const eyebrow = about.querySelector('.eyebrow');
  const title = about.querySelector('h2');
  const body = about.querySelector(':scope > p');
  if (eyebrow) eyebrow.textContent = contentSettings.about_eyebrow;
  if (title) title.textContent = contentSettings.about_title;
  if (body) body.textContent = contentSettings.about_body;
}

function applyEditableAgent() {
  const heading = document.querySelector('.agent-heading');
  const contact = document.querySelector('.agent-contact');
  const message = document.querySelector('.agent-card textarea');
  if (!heading || !contact) return;
  const identity = heading.querySelector('div:last-child');
  if (identity) identity.innerHTML = `<h3>${contentSettings.agent_name}</h3><p>${contentSettings.agent_role}</p>`;
  const photo = contentSettings.agent_photo;
  const avatar = heading.querySelector('.agent-avatar, .agent-photo');
  if (photo && avatar) { const image = document.createElement('img'); image.className = 'agent-photo'; image.src = photo; image.alt = contentSettings.agent_name; avatar.replaceWith(image); }
  contact.innerHTML = `<a href="tel:${contentSettings.phone_one.replace(/\D/g, '')}">${icon('phone')} ${contentSettings.phone_one}</a><a href="tel:${contentSettings.phone_two.replace(/\D/g, '')}">${icon('phone')} ${contentSettings.phone_two}</a><a href="mailto:${contentSettings.contact_email}">${icon('mail')} ${contentSettings.contact_email}</a>`;
  if (message) message.value = `Hola ${contentSettings.agent_name}, tengo un cliente interesado en esta propiedad. ¿Sigue disponible?`;
}

const formatPrice = (value, operation) => {
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  return operation === 'Alquiler' ? `${price} / mes` : price;
};
const icon = (name) => ({
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m-5-5 5 5-5 5"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  bed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18v-7h18v7M5 11V7h6a3 3 0 0 1 3 3v1M3 15h18"/></svg>',
  bath: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M6 12V6a2 2 0 0 1 4 0v1M4 16c1 2 2 3 4 3h8c2 0 3-1 4-3"/></svg>',
  area: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6M4 4v6M20 4h-6M20 4v6M4 20h6M4 20v-6M20 20h-6M20 20v-6"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
  heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5-8.8 10.2-8.8 10.2S3.2 13.7 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.2" cy="6.8" r=".7" fill="currentColor" stroke="none"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 20v-7h2.5l.5-3H14V8.2c0-.9.3-1.7 1.8-1.7H17V3.8c-.5-.1-1.2-.2-2.1-.2-2.7 0-4.4 1.6-4.4 4.5V10H8v3h2.5v7"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9v9M6 6v.1M10 18v-5a3 3 0 0 1 6 0v5M10 9v9"/></svg>'
  ,phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4.5 9 3l2.2 4.2-1.8 1.6a14.8 14.8 0 0 0 5.8 5.8l1.6-1.8L21 15l-1.5 2.5c-.7 1.2-2.1 1.8-3.5 1.4A15.8 15.8 0 0 1 5.1 8c-.4-1.4.2-2.8 1.4-3.5Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="1.5"/><path d="m4 7 8 6 8-6"/></svg>'
  ,whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z"/><path d="M8.5 8.5c.3-.4.6-.4.9-.1l.8 1c.2.3.2.5 0 .8l-.4.5a6 6 0 0 0 2.8 2.8l.5-.4c.3-.2.5-.2.8 0l1 .8c.3.3.3.6-.1.9l-.4.3c-.5.4-1.2.5-1.8.2a8.2 8.2 0 0 1-4.9-4.9c-.3-.6-.2-1.3.2-1.8l.3-.4Z"/></svg>'
}[name]);

function render() {
  const app = document.querySelector('#app');
  const hash = window.location.hash;
  if (hash.startsWith('#property-')) {
    const property = properties.find((item) => item.id === Number(hash.replace('#property-', '')));
    app.innerHTML = property ? detailTemplate(property) : homeTemplate();
  } else if (hash === '#all') {
    app.innerHTML = allPropertiesTemplate();
  } else if (hash === '#admin') {
    window.location.href = '/admin/';
    return;
  } else {
    app.innerHTML = homeTemplate();
  }
  const footer = document.querySelector('footer');
  if (footer) footer.outerHTML = footerTemplate();
  document.querySelector('.site-header')?.classList.toggle('is-floating', window.scrollY > 40);
  bindEvents();
  applyEditableCopy();
  applyEditableAgent();
  if (hash === '#admin' && hasSupabase && !adminLoaded && !adminLoading) loadAdminProperties();
}

function headerTemplate() {
  return `<header class="site-header"><a class="brand" href="#"><img src="${contentSettings.header_logo}" alt=""/><span>GREEN DOMUS<small>REAL ESTATE</small></span></a><nav><a href="#properties">Propiedades</a><a href="#about">Nosotros</a><a href="#contact">Contacto</a></nav><a class="outline-button admin-link" href="/admin/">${icon('menu')} Admin</a><button class="mobile-menu">${icon('menu')}</button></header>`;
}

function footerTemplate() {
  const social = contentSettings.social || {};
  const links = [['instagram', social.instagram, 'Instagram'], ['facebook', social.facebook, 'Facebook'], ['linkedin', social.linkedin, 'LinkedIn']].filter(([, url]) => url).map(([name, url, label]) => `<a href="${url}" target="_blank" rel="noreferrer" aria-label="${label}">${icon(name)}</a>`).join('');
  return `<footer><div class="footer-brand-area"><div class="brand footer-brand"><img src="${contentSettings.footer_logo}" alt=""/><span>GREEN DOMUS<small>REAL ESTATE</small></span></div><p class="footer-motto">Propiedades con criterio,<br/>espacios con propósito.</p></div><div class="footer-details">${links ? `<div class="footer-social"><span>SÍGUENOS</span><div>${links}</div></div>` : ''}<div class="footer-contact"><a href="tel:${contentSettings.phone_one.replace(/\D/g, '')}">${icon('phone')} ${contentSettings.phone_one} / ${contentSettings.phone_two}</a><a href="mailto:${contentSettings.contact_email}">${icon('mail')} ${contentSettings.contact_email}</a><span>${icon('pin')} Santo Domingo, Distrito Nacional, Rep. Dom.</span></div></div><div class="footer-bottom"><span>© 2026 Green Domus Real Estate. Todos los derechos reservados</span><span>Desarrollado por <a href="https://www.aramultimedias.com/" target="_blank" rel="noreferrer"><strong>Ara Multimedias Services</strong></a></span></div></footer>`;
}

function searchTemplate() {
  return `<form class="search-panel" id="search-form"><div class="search-field wide"><label>¿Qué estás buscando?</label><select id="search-type"><option value="Todos">Todos los tipos</option>${['Apartamento', 'Casa', 'Villa', 'Terreno', 'Local comercial', 'Oficina', 'Proyecto inmobiliario'].map((type) => `<option>${type}</option>`).join('')}</select></div><div class="search-field"><label>Operación</label><select id="search-operation"><option value="Todos">Venta o alquiler</option><option>Venta</option><option>Alquiler</option></select></div><div class="search-field"><label>Ubicación</label><input id="search-location" placeholder="Ciudad o sector" /></div><button class="search-button" type="submit">${icon('search')} Buscar</button></form>`;
}

function propertyCode(property) {
  return property.code || `GD-${String(property.id).padStart(4, '0')}`;
}

function propertyGallery(property) {
  return [property.image, ...(property.gallery || [])].filter((image, index, images) => images.indexOf(image) === index);
}

function whatsappUrl(property) {
  const message = `Hola ${contentSettings.agent_name}, tengo un cliente interesado en la propiedad ${property.title} (código ${propertyCode(property)}). ¿Sigue disponible?`;
  return `https://wa.me/${contentSettings.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}

function homeTemplate() {
  const slides = contentSettings.hero_slides?.length ? contentSettings.hero_slides : heroSlides;
  const slide = slides[activeSlide % slides.length];
  const featured = properties.filter((item) => item.tag === 'Destacada' || item.tag === 'Exclusiva').slice(0, 6);
  return `<div class="page-shell">${headerTemplate()}<main><section class="hero" style="--hero-image: url('${slide.image}')"><div class="hero-overlay"></div><div class="hero-content"><p class="eyebrow">${slide.eyebrow}</p><h1>${slide.title}</h1><p class="hero-copy">${slide.copy}</p></div><div class="hero-control"><span>0${activeSlide + 1}</span><div class="hero-line"><i style="width:${((activeSlide + 1) / heroSlides.length) * 100}%"></i></div><span>0${heroSlides.length}</span><button class="hero-next" data-action="next-slide" aria-label="Siguiente">${icon('arrow')}</button></div><div class="hero-dots">${heroSlides.map((_, index) => `<button class="${index === activeSlide ? 'active' : ''}" data-slide="${index}" aria-label="Slide ${index + 1}"></button>`).join('')}</div>${searchTemplate()}</section><section class="intro-band" id="about"><div><p class="eyebrow dark">CONOCE GREEN DOMUS</p><h2>Encontrar una propiedad<br/><em>debería sentirse así.</em></h2></div><p>Somos una firma inmobiliaria que entiende que cada espacio es una decisión importante. Por eso unimos conocimiento local, criterio y una atención cercana para ayudarte a elegir bien.</p><a href="#contact" class="text-link">Conócenos ${icon('arrow')}</a></section><section class="section" id="properties"><div class="section-heading"><div><p class="eyebrow dark">SELECCIÓN GREEN DOMUS</p><h2>Propiedades con<br/><em>algo especial.</em></h2></div><a href="#all" class="outline-button">Ver todas ${icon('arrow')}</a></div><div class="property-grid">${featured.map(propertyCard).join('')}</div></section><section class="category-section"><div class="section-heading"><div><p class="eyebrow dark">EXPLORA POR TIPO</p><h2>Tu próximo espacio,<br/><em>a tu manera.</em></h2></div><p class="heading-note">Desde el primer apartamento hasta una inversión que mira al futuro.</p></div><div class="category-grid">${categories.map(([name, number, image]) => `<a href="#all?type=${encodeURIComponent(name)}" class="category-card"><img src="${image}" alt="${name}"/><span>${number}</span><strong>${name}</strong>${icon('arrow')}</a>`).join('')}</div></section><section class="contact-band" id="contact"><div><p class="eyebrow">HABLEMOS DE TU PRÓXIMO PASO</p><h2>Hay una puerta<br/>esperando por ti.</h2></div><a href="mailto:hola@greendomus.com" class="light-button">Escríbenos ${icon('arrow')}</a></section></main><footer><div class="brand footer-brand"><img src="/Favicon%20o%20logo/Dise%C3%B1o%20sin%20t%C3%ADtulo.svg" alt=""/><span>GREEN DOMUS<small>REAL ESTATE</small></span></div><p>© 2026 Green Domus Real Estate</p><p>Santo Domingo · República Dominicana</p></footer>${adminModal()}</div>`;
}

function propertyCard(property) {
  return `<article class="property-card"><a href="#property-${property.id}" class="property-image"><img src="${property.image}" alt="${property.title}"/><span class="property-tag">${property.tag}</span><button class="heart" data-heart aria-label="Guardar propiedad">${icon('heart')}</button></a><div class="property-info"><div class="property-meta"><span>${property.operation}</span><span>${property.type}</span></div><a href="#property-${property.id}"><h3>${property.title}</h3></a><p class="location">${icon('pin')}${property.location}</p><div class="property-bottom"><strong>${formatPrice(property.price, property.operation)}</strong><span>${property.area} m²</span></div></div></article>`;
}

function allPropertiesTemplate() {
  const filtered = filteredProperties();
  return `<div class="page-shell">${headerTemplate()}<main class="listing-page"><div class="listing-head"><div><p class="eyebrow dark">CATÁLOGO GREEN DOMUS</p><h1>Propiedades <em>disponibles.</em></h1><p>Encuentra un espacio que se parezca a tu siguiente capítulo.</p></div>${searchTemplate()}</div><div class="filter-row"><div class="filter-tabs">${['Todos', 'Venta', 'Alquiler'].map((filter) => `<button class="${activeFilter === filter ? 'active' : ''}" data-filter="${filter}">${filter}</button>`).join('')}</div><span>${filtered.length} propiedades encontradas</span></div><div class="property-grid all-grid">${filtered.length ? filtered.map(propertyCard).join('') : '<div class="empty-state"><h3>No encontramos esa combinación.</h3><p>Prueba con otra ciudad, operación o tipo de propiedad.</p></div>'}</div></main>${adminModal()}</div>`;
}

function detailTemplate(property) {
  const gallery = propertyGallery(property);
  const amenities = property.amenities || ['Acceso discapacitados', 'Comedor', 'Aire acondicionado', 'Cuarto de servicio', 'Amueblado', 'Garaje', 'Área social', 'Jardín', 'Baños', 'Mascotas permitidas', 'BBQ', 'Patio', 'Casa Club', 'Piscina', 'Cocina', 'Playa', 'Cocina Caliente', 'Recibidor', 'Terraza Exclusiva'];
  return `<div class="page-shell">${headerTemplate()}<main class="detail-page"><a href="#all" class="back-link">${icon('arrow')} Volver a propiedades</a><div class="detail-layout"><div class="detail-left"><div class="detail-gallery"><img src="${gallery[0]}" alt="${property.title}"/><div class="gallery-note">${property.tag}<span>Código ${propertyCode(property)}</span></div></div><div class="detail-thumbnails">${gallery.map((image, index) => `<button class="detail-thumbnail ${index === 0 ? 'active' : ''}" data-gallery-image="${image}" aria-label="Ver imagen ${index + 1}"><img src="${image}" alt=""/></button>`).join('')}</div><section class="property-panel description-panel"><h3>Descripción</h3><div class="description-copy"><p>${property.description}</p><p>Diseñada para quienes valoran la ubicación, la calidad y la posibilidad de hacer suyo cada rincón. Conoce todos los detalles conversando con nuestro equipo.</p></div></section><section class="property-panel"><h3>Información General</h3><div class="general-grid"><span><small>Código de la inmobiliaria</small><b>${propertyCode(property)}</b></span><span><small>Tipo</small><b>${property.type}</b></span><span><small>Operación</small><b>${property.operation}</b></span><span><small>Ubicación</small><b>${property.location}</b></span><span><small>Habitaciones</small><b>${property.beds || 0}</b></span><span><small>Baños</small><b>${property.baths || 0}</b></span><span><small>Área total</small><b>${property.area} m²</b></span><span><small>Precio</small><b>${formatPrice(property.price, property.operation)}</b></span></div></section><section class="property-panel"><h3>Amenidades</h3><div class="amenities-grid">${amenities.map((amenity) => `<span>${icon('check')}${amenity}</span>`).join('')}</div></section></div><div class="detail-right"><div class="detail-summary"><div class="property-meta"><span>${property.operation}</span><span>${property.type}</span></div><h1>${property.title}</h1><p class="location">${icon('pin')}${property.location}</p><strong class="detail-price">${formatPrice(property.price, property.operation)}</strong><div class="detail-specs"><span>${icon('area')}<b>${property.area} m²</b>Área total</span>${property.beds ? `<span>${icon('bed')}<b>${property.beds}</b>Habitaciones</span>` : ''}${property.baths ? `<span>${icon('bath')}<b>${property.baths}</b>Baños</span>` : ''}</div></div><aside class="agent-card"><div class="agent-heading"><div class="agent-avatar">AS</div><div><h3>Asdrúbal Salas</h3><p>Agente de bienes raíces</p></div></div><div class="agent-contact"><a href="tel:+18096711120">${icon('phone')} (809) 671-1120</a><a href="tel:+18296847760">${icon('phone')} (829) 684-7760</a><a href="mailto:greendomusrealestate@gmail.com">${icon('mail')} greendomusrealestate@gmail.com</a></div><textarea readonly>Hola Asdrúbal, tengo un cliente interesado en esta propiedad (código ${propertyCode(property)}). ¿Sigue disponible?</textarea><a class="whatsapp-button" href="${whatsappUrl(property)}" target="_blank" rel="noreferrer">${icon('whatsapp')} Enviar este mensaje ${icon('arrow')}</a></aside></div></div></main></div>`;
}

function adminModal() {
  return `<div class="modal-backdrop" id="admin-modal"><div class="admin-modal"><button class="modal-close" data-close>${icon('close')}</button><p class="eyebrow dark">GREEN DOMUS · ADMIN</p><h2>Gestiona tu catálogo.</h2><p class="modal-copy">Inicia sesión con una cuenta autorizada para publicar propiedades en Supabase.</p><form id="auth-form"><div class="form-columns"><label>Correo<input name="email" type="email" required placeholder="admin@greendomus.com" /></label><label>Contraseña<input name="password" type="password" required placeholder="••••••••" /></label></div><button class="outline-button" type="submit">Iniciar sesión</button><p class="auth-status" id="auth-status"></p></form><form id="admin-form"><label>Título<input name="title" required placeholder="Ej. Apartamento Vista Norte" /></label><div class="form-columns"><label>Código de propiedad<input name="code" required placeholder="GD-1026" /></label><label>Tipo<select name="type"><option>Apartamento</option><option>Casa</option><option>Villa</option><option>Terreno</option><option>Local comercial</option><option>Oficina</option><option>Proyecto inmobiliario</option></select></label></div><div class="form-columns"><label>Operación<select name="operation"><option>Venta</option><option>Alquiler</option></select></label><label>Precio (USD)<input name="price" type="number" required placeholder="250000" /></label></div><div class="form-columns"><label>Área (m²)<input name="area" type="number" required placeholder="120" /></label><label>Galería URLs<input name="gallery" placeholder="https://imagen-2.jpg, https://imagen-3.jpg" /></label></div><label>Ubicación<input name="location" required placeholder="Santo Domingo, República Dominicana" /></label><label>Imagen principal URL<input name="image" required placeholder="https://..." /></label><button class="primary-button" type="submit">Agregar propiedad ${icon('plus')}</button></form></div></div>`;
}

function adminPageTemplate() {
  const rows = adminProperties.map((property) => `<article class="admin-property-row"><img src="${property.image}" alt=""/><div class="admin-property-info"><div><span class="admin-status ${property.is_published ? 'published' : ''}">${property.is_published ? 'Publicada' : 'Borrador'}</span>${property.is_featured ? '<span class="admin-featured">Destacada</span>' : ''}</div><h3>${property.title}</h3><p>${propertyCode(property)} · ${property.location}</p><strong>${formatPrice(property.price, property.operation)}</strong></div><div class="admin-property-actions"><button type="button" data-admin-action="edit" data-property-id="${property.id}">Editar</button><button type="button" data-admin-action="toggle" data-property-id="${property.id}">${property.is_published ? 'Despublicar' : 'Publicar'}</button><button type="button" data-admin-action="feature" data-property-id="${property.id}">${property.is_featured ? 'Quitar destacada' : 'Destacar'}</button><button type="button" class="danger" data-admin-action="delete" data-property-id="${property.id}">Eliminar</button></div></article>`).join('');
  const editing = adminProperties.find((property) => property.id === editingPropertyId);
  const adminContent = adminAuthenticated ? `<div class="admin-toolbar"><div><p class="eyebrow dark">CATÁLOGO</p><h2>${adminProperties.length} propiedades</h2></div><button class="primary-button" type="button" data-admin-action="new">${icon('plus')} Nueva propiedad</button></div><div class="admin-property-list">${rows || '<div class="admin-empty">Todavía no hay propiedades en Supabase.</div>'}</div>${editing ? adminEditForm(editing) : ''}${adminSettingsForm()}` : '<div class="admin-locked">Después de iniciar sesión y validar los permisos aparecerá aquí el catálogo.</div>';
  return `<div class="page-shell">${headerTemplate()}<main class="admin-page"><a href="#" class="back-link">${icon('arrow')} Volver al sitio</a><div class="admin-page-intro"><p class="eyebrow dark">GREEN DOMUS · ADMINISTRACIÓN</p><h1>Gestiona tu<br/><em>catálogo.</em></h1><p>Publica, edita y organiza tus propiedades desde un solo lugar.</p></div><section class="admin-console"><div class="admin-auth-bar"><div><strong>Acceso administrador</strong><span id="admin-session-label">${adminMessage || 'Inicia sesión para gestionar el catálogo.'}</span></div><form id="admin-auth-form"><input name="email" type="email" required placeholder="Correo"/><input name="password" type="password" required placeholder="Contraseña"/><button class="primary-button" type="submit">Iniciar sesión</button></form></div><p class="auth-status" id="admin-status">${adminMessage}</p>${adminContent}</section></main></div>`;
}

function adminSettingsForm() {
  const slides = contentSettings.hero_slides?.length ? contentSettings.hero_slides : heroSlides;
  return `<section class="admin-settings"><div class="admin-editor-heading"><div><p class="eyebrow dark">CONTENIDO DEL SITIO</p><h2>Portada, textos y agente</h2></div></div><form id="site-settings-form"><label>Título de la sección Nosotros<input name="about_title" value="${contentSettings.about_title || ''}" required /></label><label>Texto de la sección Nosotros<textarea name="about_body" rows="4">${contentSettings.about_body || ''}</textarea></label><div class="admin-slide-grid">${slides.slice(0, 3).map((slide, index) => `<fieldset><legend>Portada ${index + 1}</legend><label>Etiqueta<input name="slide_${index}_eyebrow" value="${slide.eyebrow || ''}" /></label><label>Título<input name="slide_${index}_title" value="${slide.title || ''}" /></label><label>Texto<textarea name="slide_${index}_copy" rows="2">${slide.copy || ''}</textarea></label><label>Imagen URL<input name="slide_${index}_image" value="${slide.image || ''}" /></label></fieldset>`).join('')}</div><div class="form-columns"><label>Nombre del agente<input name="agent_name" value="${contentSettings.agent_name || ''}" /></label><label>Rol<input name="agent_role" value="${contentSettings.agent_role || ''}" /></label></div><div class="form-columns"><label>Teléfono 1<input name="phone_one" value="${contentSettings.phone_one || ''}" /></label><label>Teléfono 2<input name="phone_two" value="${contentSettings.phone_two || ''}" /></label></div><div class="form-columns"><label>WhatsApp (solo números)<input name="whatsapp_number" value="${contentSettings.whatsapp_number || ''}" /></label><label>Correo<input name="contact_email" type="email" value="${contentSettings.contact_email || ''}" /></label></div><label>Foto del agente (URL)<input name="agent_photo" value="${contentSettings.agent_photo || ''}" /></label><button class="primary-button" type="submit">Guardar contenido ${icon('arrow')}</button></form></section>`;
}

function adminEditForm(property = {}) {
  const existingImages = (property.galleryRecords || []).map((image) => `<div class="existing-image"><img src="${image.image_url}" alt=""/><button type="button" data-admin-action="delete-image" data-image-id="${image.id}" aria-label="Eliminar imagen">Eliminar</button></div>`).join('');
  return `<div class="admin-editor" id="admin-editor"><div class="admin-editor-heading"><div><p class="eyebrow dark">${property.id ? 'EDITAR PROPIEDAD' : 'NUEVA PROPIEDAD'}</p><h2>${property.id ? property.title : 'Agregar propiedad'}</h2></div><button type="button" data-admin-action="close-editor">Cerrar</button></div><form id="admin-property-form" data-property-id="${property.id || ''}"><div class="form-columns"><label>Título<input name="title" required value="${property.title || ''}" /></label><label>Código<input name="code" required value="${property.code || ''}" /></label></div><div class="form-columns"><label>Tipo<select name="type">${['Apartamento', 'Casa', 'Villa', 'Terreno', 'Local comercial', 'Oficina', 'Proyecto inmobiliario'].map((type) => `<option ${property.type === type ? 'selected' : ''}>${type}</option>`).join('')}</select></label><label>Operación<select name="operation"><option ${property.operation === 'Venta' ? 'selected' : ''}>Venta</option><option ${property.operation === 'Alquiler' ? 'selected' : ''}>Alquiler</option></select></label></div><div class="form-columns"><label>Precio (USD)<input name="price" type="number" required value="${property.price || ''}" /></label><label>Área (m²)<input name="area" type="number" required value="${property.area || ''}" /></label></div><div class="form-columns"><label>Habitaciones<input name="beds" type="number" min="0" value="${property.beds || 0}" /></label><label>Baños<input name="baths" type="number" min="0" value="${property.baths || 0}" /></label></div><label>Ubicación<input name="location" required value="${property.location || ''}" /></label><label>Descripción<textarea name="description" rows="5" required>${property.description || ''}</textarea></label><label>Imagen principal<input name="cover_image" type="file" accept="image/*" ${property.id ? '' : 'required'} /><small class="file-help">${property.id ? 'Selecciona una imagen solo si deseas reemplazar la portada.' : 'La portada se guardará en Supabase Storage.'}</small></label><label>Galería de imágenes<input name="images" type="file" accept="image/*" multiple /><small class="file-help">Puedes seleccionar varias imágenes adicionales.</small></label>${existingImages ? `<div class="existing-images"><span>Imágenes guardadas</span>${existingImages}</div>` : ''}<div class="editor-options"><label><input name="is_published" type="checkbox" ${property.is_published !== false ? 'checked' : ''}/> Publicar propiedad</label><label><input name="is_featured" type="checkbox" ${property.is_featured ? 'checked' : ''}/> Destacar en inicio</label></div><button class="primary-button" type="submit">${property.id ? 'Guardar cambios' : 'Crear propiedad'} ${icon('arrow')}</button></form></div>`;
}

function filteredProperties() {
  const type = document.querySelector('#search-type')?.value || 'Todos';
  const operation = document.querySelector('#search-operation')?.value || 'Todos';
  const location = document.querySelector('#search-location')?.value?.toLowerCase() || '';
  return properties.filter((property) => (activeFilter === 'Todos' || property.operation === activeFilter) && (type === 'Todos' || property.type === type) && (operation === 'Todos' || property.operation === operation) && (!location || property.location.toLowerCase().includes(location)) && (!searchTerm || `${property.title} ${property.location}`.toLowerCase().includes(searchTerm)));
}

function bindEvents() {
  document.querySelectorAll('[data-slide]').forEach((button) => button.addEventListener('click', () => { activeSlide = Number(button.dataset.slide); render(); }));
  document.querySelector('[data-action="next-slide"]')?.addEventListener('click', () => { activeSlide = (activeSlide + 1) % heroSlides.length; render(); });
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => { activeFilter = button.dataset.filter; render(); }));
  document.querySelectorAll('[data-heart]').forEach((button) => button.addEventListener('click', (event) => { event.preventDefault(); button.classList.toggle('saved'); }));
  document.querySelectorAll('[data-gallery-image]').forEach((button) => button.addEventListener('click', () => { const gallery = button.closest('.detail-left'); gallery.querySelector('.detail-gallery img').src = button.dataset.galleryImage; gallery.querySelectorAll('.detail-thumbnail').forEach((thumbnail) => thumbnail.classList.remove('active')); button.classList.add('active'); }));
  document.querySelectorAll('.admin-trigger').forEach((button) => button.addEventListener('click', () => document.querySelector('#admin-modal').classList.add('open')));
  document.querySelector('[data-close]')?.addEventListener('click', () => document.querySelector('#admin-modal').classList.remove('open'));
  document.querySelector('#admin-modal')?.addEventListener('click', (event) => { if (event.target.id === 'admin-modal') event.currentTarget.classList.remove('open'); });
  document.querySelector('#auth-form')?.addEventListener('submit', async (event) => { event.preventDefault(); const status = document.querySelector('#auth-status'); if (!supabase) { status.textContent = 'Configura Supabase para iniciar sesión.'; return; } const data = new FormData(event.target); const { error } = await supabase.auth.signInWithPassword({ email: data.get('email'), password: data.get('password') }); status.textContent = error ? error.message : 'Sesión iniciada. Ya puedes publicar propiedades.'; if (!error) await syncProperties(); });
  document.querySelector('#admin-auth-form')?.addEventListener('submit', async (event) => { event.preventDefault(); if (!supabase) { adminMessage = 'Supabase no está configurado.'; render(); return; } const data = new FormData(event.target); const { error } = await supabase.auth.signInWithPassword({ email: data.get('email'), password: data.get('password') }); adminMessage = error ? error.message : 'Sesión iniciada correctamente.'; if (!error) await loadAdminProperties(); else render(); });
  document.querySelectorAll('[data-admin-action]').forEach((button) => button.addEventListener('click', () => handleAdminAction(button.dataset.adminAction, Number(button.dataset.propertyId))));
  document.querySelector('#admin-property-form')?.addEventListener('submit', saveAdminProperty);
  document.querySelector('#site-settings-form')?.addEventListener('submit', saveSiteSettings);
  document.querySelector('#search-form')?.addEventListener('submit', (event) => { event.preventDefault(); if (window.location.hash !== '#all') window.location.hash = 'all'; else render(); });
  document.querySelector('#admin-form')?.addEventListener('submit', async (event) => { event.preventDefault(); const data = new FormData(event.target); const gallery = String(data.get('gallery') || '').split(',').map((image) => image.trim()).filter(Boolean); const property = { id: Date.now(), code: data.get('code'), title: data.get('title'), type: data.get('type'), operation: data.get('operation'), price: Number(data.get('price')), location: data.get('location'), area: Number(data.get('area')), beds: 0, baths: 0, tag: 'Nueva', image: data.get('image'), gallery, description: 'Una nueva propiedad de Green Domus, lista para descubrir.' };
    if (hasSupabase) { const { data: session } = await supabase.auth.getSession(); if (session.session) { const { data: created, error } = await supabase.from('properties').insert({ code: property.code, title: property.title, type: property.type, operation: property.operation, price: property.price, location: property.location, area: property.area, image_url: property.image, description: property.description, created_by: session.session.user.id }).select().single(); if (!error && created) { if (gallery.length) await supabase.from('property_images').insert(gallery.map((image, index) => ({ property_id: created.id, image_url: image, sort_order: index }))); properties = [mapRemoteProperty(created, gallery.map((image, index) => ({ property_id: created.id, image_url: image, sort_order: index }))), ...properties]; document.querySelector('#admin-modal').classList.remove('open'); render(); return; } } }
    properties = [property, ...properties]; localStorage.setItem('green-domus-properties', JSON.stringify(properties)); document.querySelector('#admin-modal').classList.remove('open'); render(); });
}

async function saveSiteSettings(event) {
  event.preventDefault();
  if (!supabase || !adminAuthenticated) return;
  const data = new FormData(event.target);
  const hero = (contentSettings.hero_slides || heroSlides).slice(0, 3).map((slide, index) => ({ eyebrow: data.get(`slide_${index}_eyebrow`), title: data.get(`slide_${index}_title`), copy: data.get(`slide_${index}_copy`), image: data.get(`slide_${index}_image`) }));
  const payload = { id: 'main', hero_slides: hero, categories, about_title: data.get('about_title'), about_body: data.get('about_body'), agent_name: data.get('agent_name'), agent_role: data.get('agent_role'), agent_photo: data.get('agent_photo'), phone_one: data.get('phone_one'), phone_two: data.get('phone_two'), whatsapp_number: String(data.get('whatsapp_number')).replace(/\D/g, ''), contact_email: data.get('contact_email'), updated_at: new Date().toISOString() };
  const { error } = await supabase.from('site_settings').upsert(payload);
  adminMessage = error ? error.message : 'Contenido actualizado.';
  if (!error) { contentSettings = { ...contentSettings, ...payload }; heroSlides.splice(0, heroSlides.length, ...hero); }
  render();
}

async function handleAdminAction(action, propertyId) {
  if (action === 'new') { editingPropertyId = null; render(); setTimeout(() => document.querySelector('#admin-editor')?.scrollIntoView({ behavior: 'smooth' }), 0); return; }
  if (action === 'close-editor') { editingPropertyId = null; render(); return; }
  const property = adminProperties.find((item) => item.id === propertyId);
  if (!property || !supabase) return;
  if (action === 'edit') { editingPropertyId = propertyId; render(); setTimeout(() => document.querySelector('#admin-editor')?.scrollIntoView({ behavior: 'smooth' }), 0); return; }
  if (action === 'delete') { if (!window.confirm(`¿Eliminar ${property.title}?`)) return; const { error } = await supabase.from('properties').delete().eq('id', propertyId); adminMessage = error ? error.message : 'Propiedad eliminada.'; if (!error) adminProperties = adminProperties.filter((item) => item.id !== propertyId); render(); return; }
  if (action === 'delete-image') { const { data: imageRecord } = await supabase.from('property_images').select('image_url').eq('id', propertyId).single(); const imagePath = imageRecord?.image_url?.split('/property-images/')[1]; if (imagePath) await supabase.storage.from('property-images').remove([imagePath]); const { error } = await supabase.from('property_images').delete().eq('id', propertyId); adminMessage = error ? error.message : 'Imagen eliminada.'; editingPropertyId = editingPropertyId || Number(document.querySelector('#admin-property-form')?.dataset.propertyId); if (!error) await loadAdminProperties(); else render(); return; }
  const updates = action === 'toggle' ? { is_published: !property.is_published } : { is_featured: !property.is_featured };
  const { error } = await supabase.from('properties').update(updates).eq('id', propertyId); adminMessage = error ? error.message : 'Cambios guardados.'; if (!error) Object.assign(property, updates); render();
}

async function saveAdminProperty(event) {
  event.preventDefault();
  if (!supabase) { adminMessage = 'Supabase no está configurado.'; render(); return; }
  const form = event.target;
  const data = new FormData(form);
  const propertyId = Number(form.dataset.propertyId);
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) { adminMessage = 'Inicia sesión antes de guardar.'; render(); return; }
  const existing = adminProperties.find((property) => property.id === propertyId);
  const coverFile = data.get('cover_image');
  if (!propertyId && (!(coverFile instanceof File) || !coverFile.size)) { adminMessage = 'Selecciona una imagen principal.'; render(); return; }
  const payload = { code: data.get('code'), title: data.get('title'), type: data.get('type'), operation: data.get('operation'), price: Number(data.get('price')), location: data.get('location'), area: Number(data.get('area')), beds: Number(data.get('beds') || 0), baths: Number(data.get('baths') || 0), description: data.get('description'), image_url: existing?.image || '', is_published: data.get('is_published') === 'on', is_featured: data.get('is_featured') === 'on', created_by: sessionData.session.user.id };
  let saved;
  let error;
  if (propertyId) ({ data: saved, error } = await supabase.from('properties').update(payload).eq('id', propertyId).select().single());
  else ({ data: saved, error } = await supabase.from('properties').insert(payload).select().single());
  if (error) { adminMessage = error.message; render(); return; }
  const files = [...(data.getAll('images') || [])].filter((file) => file instanceof File && file.size);
  const uploadedCover = coverFile instanceof File && coverFile.size ? await uploadPropertyImages(saved.id, [coverFile]) : [];
  if (uploadedCover[0]) { const { error: coverError } = await supabase.from('properties').update({ image_url: uploadedCover[0] }).eq('id', saved.id); if (coverError) { adminMessage = coverError.message; render(); return; } }
  const uploaded = await uploadPropertyImages(saved.id, files);
  if (uploaded.length) { await supabase.from('property_images').insert(uploaded.map((image, index) => ({ property_id: saved.id, image_url: image, sort_order: index }))); }
  adminMessage = propertyId ? 'Propiedad actualizada.' : 'Propiedad creada.';
  editingPropertyId = null;
  await loadAdminProperties();
}

window.addEventListener('hashchange', render);
window.addEventListener('scroll', () => document.querySelector('.site-header')?.classList.toggle('is-floating', window.scrollY > 40), { passive: true });
render();
syncProperties();
syncSiteSettings();
setInterval(() => { if (!window.location.hash || window.location.hash === '#') { activeSlide = (activeSlide + 1) % heroSlides.length; render(); } }, 7000);
