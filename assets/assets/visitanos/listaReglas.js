function crearSlider({
  idSeccion,
  idSlides,
  idPrev,
  idNext,
  idPagination,
  datos,
  nombreBaseImagen
}) {
  const seccion = document.getElementById(idSeccion);
  const slidesContainer = document.getElementById(idSlides);
  const prev = document.getElementById(idPrev);
  const next = document.getElementById(idNext);
  const pagination = document.getElementById(idPagination);

  let currentSlide = 0;

  // Generar slides
  datos.forEach((regla, i) => {
    const numero = i + 1;
    const esPar = i % 2 === 0;

    const slide = `
      <div class="min-w-full flex items-center justify-center p-8">
        <div class="container mx-auto px-4 py-16">
          <div class="shadow-2xl">
            <div class="grid md:grid-cols-2 gap-8 items-center p-6 bg-slate-200 rounded-xl"
                 data-aos="fade-up" data-aos-offset="200" data-aos-delay="${150 + i * 30}">
              ${esPar ? `
                <div class="flex justify-center">
                  <img src="assets/assets/visitanos/${nombreBaseImagen}${numero}.png" 
                       alt="Gato ${numero}" class="max-h-80 w-auto object-contain">
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
                  <img src="assets/assets/visitanos/${nombreBaseImagen}${numero}.png" 
                       alt="Gato ${numero}" class="max-h-80 w-auto object-contain">
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
    slidesContainer.insertAdjacentHTML("beforeend", slide);
  });

  pagination.textContent = `1 / ${datos.length}`;

  // actualizar
  function updateSlide() {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    pagination.textContent = `${currentSlide + 1} / ${datos.length}`;
  }

  // Botones
  next.addEventListener("click", () => {
    currentSlide = Math.min(currentSlide + 1, datos.length - 1);
    updateSlide();
  });
  prev.addEventListener("click", () => {
    currentSlide = Math.max(currentSlide - 1, 0);
    updateSlide();
  });

  // Swipe táctil
  let startX = 0;
  slidesContainer.addEventListener("touchstart", (e) => startX = e.touches[0].clientX);
  slidesContainer.addEventListener("touchend", (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 40) next.click();
    if (diff < -40) prev.click();
  });

  // Devuelve controladores y visibilidad
  return { seccion, next, prev };
}

// Reglas Generales
const sliderGeneral = crearSlider({
  idSeccion: "catalogo-reglas",
  idSlides: "slides-container",
  idPrev: "prev",
  idNext: "next",
  idPagination: "pagination",
  datos: [
    { titulo: "La base es el respeto", descripcion: "Respeta a los michis siempre. Esta es su casa. No son juguetes" },
    { titulo: "Qué no hacer", descripcion: "No debes de gritar, correr o hacer ruidos que los asusten" },
    { titulo: "Cargar a los michis", descripcion: "No los cargues si ellos no se acercan (Menos de 15 años tienen prohibido cargarlos)" },
    { titulo: "Collar Rojo", descripcion: "Tener especial cuidado con los michis de collar rojo <br>Collar rojo: Gato nervioso o con algún padecimiento" },
    { titulo: "Higiene", descripcion: "Lávate las manos antes de comer" },
    { titulo: "Alimentación", descripcion: "No alimentes a los michis" },
    { titulo: "Su sueño, su espacio", descripcion: "No los despiertes" },
    { titulo: "Pedir permiso", descripcion: "Pide que te abramos la puerta al entrar y salir" },
    { titulo: "Aléjate de los riesgos", descripcion: "Si un michi está estresado (gruñendo o erizado), aléjate de él, puede ser peligroso" },
    { titulo: "Tu responsabilidad", descripcion: "Si te rasguñan, lamen o muerden es bajo tu responsabilidad" },
    { titulo: "Fotos", descripcion: "Puedes tomar fotos sin flash" },
  ],
  nombreBaseImagen: "gatoRegla"
});

// Reglas Tutores
const sliderTutores = crearSlider({
  idSeccion: "catalogo-reglas-tutores",
  idSlides: "slides-container-tutores",
  idPrev: "prev-tutores",
  idNext: "next-tutores",
  idPagination: "pagination-tutores",
  datos: [
    { titulo: "No está diseñado para niños", descripcion: `Este Cat Café no es especializado en niños, no contamos con área infantil o servicio de niñeros.
                                                Es un santuario para los gatos, deben ser respetados y protegidos` },
    { titulo: "El respeto es importante", descripcion: `No deben de gritar, correr, brincar, subirse al inmobiliario, esconderse, cargar a los michis,
                                                        jalarles la cola, pergarles con los juguetes, pisarlos, alimentarlos ni acosarlos` },
    { titulo: "Edad", descripcion: "Los niños deben ser mayores a 12 años para interactuar con los michis, no se harán excepciones" },
    { titulo: "Supervisión", descripcion: "Los tutores deben estar junto a los niños en todo momento" },
    { titulo: "Compañía", descripcion: "Los niños no pueden estar solos sin compañia ni supervisión adulta" },
    { titulo: "Tranquilidad", descripcion: "No permitas que los niños pasen por las mesas de otros comensales" },  
  ],
  nombreBaseImagen: "gatoReglaTutores"
});

document.addEventListener("keydown", (e) => {
  // Detectar cuál slider está visible
  const sliders = [sliderGeneral, sliderTutores];
  const visible = sliders.find(({ seccion }) => {
    const rect = seccion.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
  });

  if (!visible) return;

  if (e.key === "ArrowRight") visible.next.click();
  if (e.key === "ArrowLeft") visible.prev.click();
});
