let testimonials = [];
let currentIndex = 0;

async function fetchTestimonials() {
  const res = await fetch('./public/testimonials.json');
  const data = await res.json();
  testimonials = data.testimonials;

  console.log(testimonials);
  renderTestimonial(currentIndex);
}

function renderTestimonial(index) {
  const t = testimonials[index];

  document.getElementById('testimonial-stars').src = t.ratingImage;
  document.getElementById('testimonial-name').textContent = t.name;
  document.getElementById('testimonial-role').textContent = t.role;
  document.getElementById('testimonial-review').textContent = t.review;

  renderAvatars(index);
}

function renderAvatars(activeIndex) {
  const avatarContainer = document.getElementById('testimonial-avatars');

  avatarContainer.innerHTML = testimonials
    .map((t, index) => {
      const isActive = index === activeIndex;

      return `
        <img
          src="${t.avatar}"
          class="
            ${isActive ? 'w-12 h-12 ring-2 ring-blue-500' : 'w-10 h-10 opacity-50'}
            rounded-full cursor-pointer transition-all
          "
          alt="users img"
          onclick="setTestimonial(${index})"
        />
      `;
    })
    .join('');
}

function setupNavigation() {
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    renderTestimonial(currentIndex);
  });

  prevBtn.addEventListener('click', () => {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial(currentIndex);
  });
}

function setTestimonial(index) {
  console.log("Button Clicked");
  currentIndex = index;
  renderTestimonial(currentIndex);
}

export {fetchTestimonials,setupNavigation};

