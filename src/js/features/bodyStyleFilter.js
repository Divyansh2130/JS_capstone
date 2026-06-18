//import { cars } from "../data/cars.js";
import { renderCars } from "../components/carRenderer.js";

export async function initBodyStyleFilter() {
  const template = document.getElementById("car-card-template");
  const container = document.getElementById("styles-cars-container");
  const bodyStyleCards = document.querySelectorAll("#body-styles-grid [data-style]");
  const prevBtn = document.getElementById("styles-cars-prev");
  const nextBtn = document.getElementById("styles-cars-next");
  
  console.log("bodyStyleCards found:", bodyStyleCards.length);
  
  const res= await fetch('./public/cars.json');
  const data= await res.json();
  
  const cars = data.cars;
  
  if (!template || !container) return;

  let activeType = "Sedan";
  let startIndex = 0;

  function getItemsPerPage() {
    if (window.innerWidth >= 1000) return 4;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  function getFilteredCars() {
    return cars.filter((car) => car.type === activeType);
  }

  function updateCars() {
    const filtered = getFilteredCars();
    const itemsPerPage = getItemsPerPage();

    const visibleCars = filtered.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    renderCars({
      cars: visibleCars,
      container,
      template,
    });

    // Disable buttons at edges
    prevBtn.disabled = startIndex === 0;
    nextBtn.disabled =
      startIndex + itemsPerPage >= filtered.length;
  }

  // cards CLICK
 bodyStyleCards.forEach((card) => {
    console.log("Attaching click listener to card:", card.dataset.style);
    card.addEventListener("click", () => {
      console.log("Style card clicked:", card.dataset.style);

      activeType = card.dataset.style; 
      startIndex = 0;

      // active UI state
      bodyStyleCards.forEach((c) =>
        c.classList.remove("text-blue-600")
      );
      card.classList.add("text-blue-600");

      updateCars();
    });
  });
  // NEXT
  nextBtn.addEventListener("click", () => {
    const itemsPerPage = getItemsPerPage();
    const filteredLength = getFilteredCars().length;

    if (startIndex + itemsPerPage < filteredLength) {
      startIndex += itemsPerPage;
      updateCars();
    }
  });

  // PREV
  prevBtn.addEventListener("click", () => {
    const itemsPerPage = getItemsPerPage();

    startIndex = Math.max(0, startIndex - itemsPerPage);
    updateCars();
  });

  // Responsive fix
  window.addEventListener("resize", updateCars);

  updateCars();
}
