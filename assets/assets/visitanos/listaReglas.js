  // ---- Datos de las reglas ----
  const reglas = [
    { titulo: "La base es el respeto", descripcion: "Respeta a los michis siempre. Esta es su casa. No son juguetes" },
    { titulo: "Qué no hacer", descripcion: "No debes de gritar, correr o hacer ruidos que los asusten" },
    { titulo: "Cargar a los michis", descripcion: "No los cargues si ellos no se acercan (Menos de 15 años tienen prohibido cargarlos)" },
    { titulo: "Collar Rojo", descripcion: "Tener especial cuidado con los michis de collar rojo" },
    { titulo: "Higiene", descripcion: "Lavate las manos antes de comer" },
    { titulo: "Alimentación", descripcion: "No alimentes a los michis" },
    { titulo: "Su sueño, su espacio", descripcion: "No los despiertes" },
    { titulo: "Pedir permiso", descripcion: "Pide que te abramos la puerta al entrar y salir" },
    { titulo: "Aléjate de los riesgos", descripcion: "Si un michi está estresado (gruñendo o erizado), aléjate de el, puede ser peligroso" },
    { titulo: "Tu responsabilidad", descripcion: "Si te rasguñan, lamen o muerden es bajo tu responsabilidad" },
    { titulo: "Fotos", descripcion: "Puedes tomar fotos sin flash" },
    
  ];

// Elementos del slider
const slidesContainer = document.getElementById("slides-container");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const pagination = document.getElementById("pagination");

// Variables de control
let currentSlide = 0;

// Generar slides: cada slide contiene el mismo layout "container -> grid md:grid-cols-2 ..."
reglas.forEach((regla, i) => {
  const numero = i + 1;
  const esPar = i % 2 === 0;

  const slide = `
    <div class="min-w-full flex items-center justify-center p-8">
      <div class="container mx-auto px-4 py-16">
        <div class="hover:shadow-2xl transition-shadow duration-500 ease-in-out">
          <div class="grid md:grid-cols-2 gap-8 items-center p-6 bg-slate-200 rounded-xl"
               data-aos="fade-up" data-aos-offset="200" data-aos-delay="${150 + i * 30}">

            ${esPar ? `
              <div class="flex justify-center">
                <!-- Imagen (puedes sustituir por <img src="...">) -->
                <div class="flex justify-center items-center">
                  <img src="assets/assets/visitanos/gatoRegla${numero}.png" alt="Gato ${numero}" class="max-h-80 w-auto object-contain">
                </div>
              </div>

              <div class="text-center md:text-left p-6 rounded-lg">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">${regla.titulo}</h3>
                <p class="text-gray-600 text-center md:text-justify leading-relaxed">${regla.descripcion}</p>
              </div>
            ` : `
              <div class="text-center md:text-left p-6 rounded-lg">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">${regla.titulo}</h3>
                <p class="text-gray-600 text-center md:text-justify leading-relaxed">${regla.descripcion}</p>
              </div>

              <div class="flex justify-center">
                <!-- Imagen (puedes sustituir por <img src="...">) -->
                <div class="flex justify-center items-center">
                  <img src="assets/assets/visitanos/gatoRegla${numero}.png" alt="Gato ${numero}" class="max-h-80 w-auto object-contain">
                </div>
              </div>
            `}

          </div>
        </div>
      </div>
    </div>
  `;

  slidesContainer.insertAdjacentHTML("beforeend", slide);
});

// Paginación inicial
pagination.textContent = `1 / ${reglas.length}`;

// Función para actualizar slide
function updateSlide() {
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  pagination.textContent = `${currentSlide + 1} / ${reglas.length}`;
  // opcional: focus en slide actual para accesibilidad
  const slides = slidesContainer.children;
  for (let i = 0; i < slides.length; i++) {
    slides[i].setAttribute("aria-hidden", i === currentSlide ? "false" : "true");
  }
}

// Controles
next.addEventListener("click", () => {
  currentSlide = Math.min(currentSlide + 1, reglas.length - 1);
  updateSlide();
});
prev.addEventListener("click", () => {
  currentSlide = Math.max(currentSlide - 1, 0);
  updateSlide();
});

// Soporte teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next.click();
  if (e.key === "ArrowLeft") prev.click();
});

// Swipe táctil básico
let startX = 0;
slidesContainer.addEventListener("touchstart", (e) => startX = e.touches[0].clientX);
slidesContainer.addEventListener("touchend", (e) => {
  const diff = startX - (e.changedTouches[0].clientX);
  if (diff > 40) next.click();
  if (diff < -40) prev.click();
});

// Inicializa
updateSlide();