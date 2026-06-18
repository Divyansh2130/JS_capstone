export async function loadSections() {
  const sections = [
    { id: 'section-navbar', url: './partials/navbar.html' },
    { id: 'section-hero', url: './partials/hero.html' },
    { id: 'section-body-styles', url: './partials/body-styles.html' },
    { id: 'section-features', url: './partials/features.html' },
    { id: 'section-most-searched', url: './partials/most-searched-cars.html' },
    { id: 'section-cta', url: './partials/cta.html' },
    { id: 'section-recommended', url: './partials/recommended-cars.html' },
    { id: 'section-online', url: './partials/online-everywhere.html' },
    { id: 'section-upcoming', url: './partials/upcoming-cars.html' },
    { id: 'section-testimonials', url: './partials/testimonials.html' },
    { id: 'section-blog', url: './partials/blog.html' },
    { id: 'section-premium-brands', url: './partials/premium-brands.html' },
    { id: 'section-contact', url: './partials/contact.html' },
    { id: 'section-join', url: './partials/join-us.html' },
    { id: 'section-footer', url: './partials/footer.html' },
  ];

  await Promise.all(
    sections.map(async (section) => {
      const target = document.getElementById(section.id);
      if (!target) return;
      const response = await fetch(section.url);
      if (!response.ok) {
        throw new Error(`Failed to load ${section.url}: ${response.status}`);
      }
      target.innerHTML = await response.text();
    })
  );
}
