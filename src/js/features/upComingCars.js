import { cars } from "../data/cars.js";
import { renderCars } from "../components/carRenderer.js";

export async function initUpcomingCars() {
  const template = document.getElementById("car-card-template");
  const container = document.getElementById("upcoming-cars");
  const prevBtn = document.getElementById("upcoming-prev");
  const nextBtn = document.getElementById("upcoming-next");
  const res= await fetch('./public/cars.json');
  const data= await res.json();
  
  const cars = data.cars;

  if (!template || !container || !prevBtn || !nextBtn) return;
  console.log({template,
  container,
  prevBtn,
  nextBtn,})

  let startIndex = 0;

  function getItemsPerPage() {
    if (window.innerWidth >= 1000) return 4;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  function updateCars() {
    const itemsPerPage = getItemsPerPage();

    const visibleCars = cars.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    renderCars({
      cars: visibleCars,
      container,
      template,
    });

    prevBtn.disabled = startIndex === 0;
    nextBtn.disabled =
      startIndex + itemsPerPage >= cars.length;
  }

  nextBtn.addEventListener("click", () => {
    const itemsPerPage = getItemsPerPage();
    if (startIndex + itemsPerPage < cars.length) {
      startIndex += itemsPerPage;
      updateCars();
    }
  });

  prevBtn.addEventListener("click", () => {
    const itemsPerPage = getItemsPerPage();
    startIndex = Math.max(0, startIndex - itemsPerPage);
    updateCars();
  });

  window.addEventListener("resize", updateCars);

  updateCars();
}
