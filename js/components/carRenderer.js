export function renderCars({
  cars,
  container,
  template,
}) {
  if (!container || !template) return;

  container.innerHTML = "";

  cars.forEach((car) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".car-image").src = car.image;
    clone.querySelector(".car-image").alt = car.title;
    clone.querySelector(".car-title").textContent = car.title;
    clone.querySelector(".car-subtitle").textContent = car.subtitle;
    clone.querySelector(".car-miles").textContent = car.miles;
    clone.querySelector(".car-fuel").textContent = car.fuel;
    clone.querySelector(".car-gear").textContent = car.gear;
    clone.querySelector(".car-price").textContent = car.price;

    const badge = clone.querySelector(".car-badge");
    if (car.badge) {
      badge.textContent = car.badge;
      badge.classList.remove("hidden");

      badge.classList.add(
        car.badge === "Great Price" ? "bg-green-500" : "bg-blue-500"
      );
    }

    container.appendChild(clone);
  });
}
