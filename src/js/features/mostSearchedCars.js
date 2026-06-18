//import { cars } from "../data/cars.js";
import { renderCars } from "../components/carRenderer.js";

export async function initMostSearchedCars() {
  const template = document.getElementById("car-card-template");
  const container = document.getElementById("cars-container");
  const tabButtons = document.querySelectorAll("[data-tab]");
  const prevBtn = document.getElementById("cars-prev");
  const nextBtn = document.getElementById("cars-next");
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

  // TAB CLICK
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeType = btn.dataset.tab;
      startIndex = 0;

      tabButtons.forEach((b) =>
        b.classList.remove("text-blue-600")
      );
      btn.classList.add("text-blue-600");

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
