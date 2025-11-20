const panTemporada = [
  { titulo: "Michi rosca", descripcion: `Michi pan artesanal con forma de la tradicional pan de rosca. ¡Pruébalo antes de que se termine!` },
  { titulo: "Michi morido", descripcion: `Michi pan artesanal usando la tradicional forma del pan de muerto. ¡Únicamente hasta el 5 de Noviembre!` },
];

const slidesContainerPan = document.getElementById("slides-pan-temporada");
const prevPan = document.getElementById("prev-pan");
const nextPan = document.getElementById("next-pan");
const paginationPan = document.getElementById("pagination-pan");

let currentSlidePan = 0;


panTemporada.forEach((reglat, i) => {
  const numeroPan = i + 1;
  const slidePan = `
    <div class="min-w-full flex items-center justify-center p-8">
      <div class="container mx-auto px-4 py-16">
        <div class="shadow-2xl">
          <div class="grid md:grid-cols-2 gap-8 items-center p-6 bg-white rounded-xl"
              data-aos="fade-up" data-aos-offset="200" data-aos-delay="${150 + i * 30}">
            
            <div class="flex justify-center">
              <img src="assets/assets/menu/temporada/${numeroPan}.png" alt="Gato ${numeroPan}" 
                   class="max-h-80 w-auto rounded-lg object-contain">
            </div>

            <div class="text-center md:text-left p-6 rounded-lg">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">${reglat.titulo}</h3>
              <p class="text-gray-600 text-center md:text-justify leading-relaxed">
                ${reglat.descripcion}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;
  slidesContainerPan.insertAdjacentHTML("beforeend", slidePan);
});


paginationPan.textContent = `1 / ${panTemporada.length}`;


function updateSlidePan() {
  slidesContainerPan.style.transform = `translateX(-${currentSlidePan * 100}%)`;
  paginationPan.textContent = `${currentSlidePan + 1} / ${panTemporada.length}`;
}

// ----- AUTOPLAY -----
let autoPlayPan;
let restartTimeoutPan = null;


function startAutoPlayPan() {
  stopAutoPlayPan();
  autoPlayPan = setInterval(() => {
    currentSlidePan = (currentSlidePan + 1) % panTemporada.length; // LOOP
    updateSlidePan();
  }, 3000);
}

function stopAutoPlayPan() {
  if (autoPlayPan) {
    clearInterval(autoPlayPan);
    autoPlayPan = null;
  }
}

function restartAutoPlayPan() {
  stopAutoPlayPan();

  if (restartTimeoutPan) clearTimeout(restartTimeoutPan);

  restartTimeoutPan = setTimeout(startAutoPlayPan, 5000);
}


nextPan.addEventListener("click", () => {
  stopAutoPlayPan();
  currentSlidePan = (currentSlidePan + 1) % panTemporada.length;
  updateSlidePan();
  restartAutoPlayPan();
});

prevPan.addEventListener("click", () => {
  stopAutoPlayPan();
  currentSlidePan = (currentSlidePan - 1 + panTemporada.length) % panTemporada.length;
  updateSlidePan();
  restartAutoPlayPan();
});

// Swipe táctil
let startXPan = 0;
slidesContainerPan.addEventListener("touchstart", (e) => {
  stopAutoPlayPan();
  startXPan = e.touches[0].clientX;
});
slidesContainerPan.addEventListener("touchend", (e) => {
  const diffPan = startXPan - e.changedTouches[0].clientX;
  if (diffPan > 40) nextPan.click();
  if (diffPan < -40) prevPan.click();
  restartAutoPlayPan();
});


updateSlidePan();
startAutoPlayPan();