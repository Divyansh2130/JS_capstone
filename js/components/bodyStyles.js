//import { bodyStyles } from '../data/bodyStyles.js';

 
export async function  initBodyStyles() {
  const grid = document.getElementById('body-styles-grid');
  if (!grid) return;

  const res= await fetch('./public/bodyStyles.json');
  const data= await res.json();
  
  const bodyStyles = data.bodyStyles;
  
  console.log(bodyStyles);

  grid.innerHTML = bodyStyles
    .map(
      (style) => `
        <div
          class="flex flex-col items-center cursor-pointer group"
          data-style="${style.id}"
        >
          <img
            src="${style.image}"
            alt="${style.name}"
            class="h-22 object-contain mb-1 group-hover:scale-105 transition"
          />
          <p class="text-md font-medium">${style.name}</p>
        </div>
      `
    )
    .join('');
}
