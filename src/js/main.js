// Import all components and features
import { initMobileMenu } from './components/header.js';
import { initHeroSlider } from './components/heroSlider.js';
import { initBodyStyles } from './components/bodyStyles.js';
import { initBodyStyleFilter } from './features/bodyStyleFilter.js';
import { initMostSearchedCars } from "./features/mostSearchedCars.js";
import { initRecommendedCars } from "./features/recommendedCars.js";
import { initUpcomingCars } from './features/upComingCars.js';
import { initAIChatUI } from "./features/aiChat.js";
import { initPWA, isPWA, getPWADisplayMode } from "./components/pwa.js";
import { fetchTestimonials, setupNavigation } from './features/testimonials.js';
console.log("Main is called");

// Single initialization function
async function initializeApp() {
  // Initialize components
  initMobileMenu();
  initHeroSlider();
  await initBodyStyles();
  await initBodyStyleFilter();
  
  // Initialize features
  initMostSearchedCars();
  initRecommendedCars();
  initUpcomingCars();
  initAIChatUI();
  fetchTestimonials();
  setupNavigation();
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', initializeApp);

// Initialize PWA on full page load
window.addEventListener('load', () => {
  initPWA();
  console.log('PWA initialized');
  console.log('Display mode:', getPWADisplayMode());
  console.log('Is running as PWA:', isPWA());
});

