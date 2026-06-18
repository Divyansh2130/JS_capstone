import { heroSlides } from '../data/heroSlides.js';

export function initHeroSlider() {
  const image = document.getElementById('hero-image');
  const title = document.getElementById('hero-title');
  const subtitle = document.getElementById('hero-subtitle');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');

  if (!heroSlides.length) return;

  let currentIndex = 0;

  function renderSlide(index) {
    image.classList.add('opacity-0');

    setTimeout(() => {
      image.src = heroSlides[index].image;
      title.textContent = heroSlides[index].title;
      subtitle.textContent = heroSlides[index].subtitle;
      image.classList.remove('opacity-0');
    }, 200);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % heroSlides.length;
    renderSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex =
      (currentIndex - 1 + heroSlides.length) % heroSlides.length;
    renderSlide(currentIndex);
  }

  renderSlide(currentIndex);

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  setInterval(nextSlide, 5000);
}
