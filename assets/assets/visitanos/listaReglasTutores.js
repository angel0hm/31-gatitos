  const reglasTutores = [
    { titulo: "No está diseñado para niños", descripcion: `Este Cat Café no es especializado en niños, no contamos con área infantil o servicio de niñeros.
                                                Es un santuario para los gatos, deben ser respetados y protegidos` },
    { titulo: "El respeto es importante", descripcion: `No deben de gritar, correr, brincar, subirse al inmobiliario, esconderse, cargar a los michis,
                                                        jalarles la cola, pergarles con los juguetes, pisarlos, alimentarlos ni acosarlos` },
    { titulo: "Edad", descripcion: "Los niños deben ser mayores a 12 años para interactuar con los michis, no se harán excepciones" },
    { titulo: "Supervisión", descripcion: "Los tutores deben estar junto a los niños en todo momento" },
    { titulo: "Compañía", descripcion: "Los niños no pueden estar solos sin compañia ni supervisión adulta" },
    { titulo: "Tranquilidad", descripcion: "No permitas que los niños pasen por las mesas de otros comensales" },    
  ];

// Elementos del slider
const slidesContainerTutores = document.getElementById("slides-container-tutores");
const prevTutores = document.getElementById("prev-tutores");
const nextTutores = document.getElementById("next-tutores");
const paginationTutores = document.getElementById("pagination-tutores");

// Variables de control
let currentSlideTutores = 0;

// Generar slides: cada slide contiene el mismo layout "container -> grid md:grid-cols-2 ..."
reglasTutores.forEach((reglat, i) => {
  const numeroTutores = i + 1;
  const esParTutores = i % 2 === 0;

  const slideTutores = `
    <div class="min-w-full flex items-center justify-center p-8">
      <div class="container mx-auto px-4 py-16">
        <div class="shadow-2xl">
          <div class="grid md:grid-cols-2 gap-8 items-center p-6 bg-slate-200 rounded-xl"
               data-aos="fade-up" data-aos-offset="200" data-aos-delay="${150 + i * 30}">

            ${esParTutores ? `
              <div class="flex justify-center">
                <!-- Imagen (puedes sustituir por <img src="...">) -->
                <div class="flex justify-center items-center">
                  <img src="assets/assets/visitanos/gatoReglaTutores${numeroTutores}.png" alt="Gato ${numeroTutores}" class="max-h-80 w-auto object-contain">
                </div>
              </div>

              <div class="text-center md:text-left p-6 rounded-lg">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">${reglat.titulo}</h3>
                <p class="text-gray-600 text-center md:text-justify leading-relaxed">${reglat.descripcion}</p>
              </div>
            ` : `
              <div class="text-center md:text-left p-6 rounded-lg">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">${reglat.titulo}</h3>
                <p class="text-gray-600 text-center md:text-justify leading-relaxed">${reglat.descripcion}</p>
              </div>

              <div class="flex justify-center">
                <!-- Imagen (puedes sustituir por <img src="...">) -->
                <div class="flex justify-center items-center">
                  <img src="assets/assets/visitanos/gatoReglaTutores${numeroTutores}.png" alt="Gato ${numeroTutores}" class="max-h-80 w-auto object-contain">
                </div>
              </div>
            `}

          </div>
        </div>
      </div>
    </div>
  `;

  slidesContainerTutores.insertAdjacentHTML("beforeend", slideTutores);
});

// Paginación inicial
paginationTutores.textContent = `1 / ${reglasTutores.length}`;

// Función para actualizar slide
function updateSlideTutores() {
  slidesContainerTutores.style.transform = `translateX(-${currentSlideTutores * 100}%)`;
  paginationTutores.textContent = `${currentSlideTutores + 1} / ${reglasTutores.length}`;
  // opcional: focus en slide actual para accesibilidad
  const slidesTutores = slidesContainerTutores.children;
  for (let i = 0; i < slidesTutores.length; i++) {
    slidesTutores[i].setAttribute("aria-hidden", i === currentSlideTutores ? "false" : "true");
  }
}

// Controles
nextTutores.addEventListener("click", () => {
  currentSlideTutores = Math.min(currentSlideTutores + 1, reglasTutores.length - 1);
  updateSlideTutores();
});
prevTutores.addEventListener("click", () => {
  currentSlideTutores = Math.max(currentSlideTutores - 1, 0);
  updateSlideTutores();
});

// Swipe táctil básico
let startXTutores = 0;
slidesContainerTutores.addEventListener("touchstart", (e) => startXTutores = e.touches[0].clientXTutores);
slidesContainerTutores.addEventListener("touchend", (e) => {
  const diffTutores = startXTutores - (e.changedTouches[0].clientXTutores);
  if (diffTutores > 40) nextTutores.click();
  if (diffTutores < -40) prevTutores.click();
});

// Inicializa
updateSlideTutores();

