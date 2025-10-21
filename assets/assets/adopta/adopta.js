document.querySelectorAll('[data-accordion-target]').forEach(button => {
    button.addEventListener('click', () => {
        const targetSelector = button.getAttribute('data-accordion-target');
        const content = document.querySelector(targetSelector);

        if (!content) return;

        if (content.classList.contains('hidden')) {
            // Abrir
            content.style.display = 'block';
            const height = content.scrollHeight + 'px';
            content.style.maxHeight = '0px';

            requestAnimationFrame(() => {
                content.style.transition = 'max-height 0.4s ease';
                content.style.maxHeight = height;
            });

            content.addEventListener('transitionend', function handler() {
                content.style.maxHeight = 'none'; // Permite contenido dinámico
                content.removeEventListener('transitionend', handler);
            });

            content.classList.remove('hidden');
            button.setAttribute('aria-expanded', 'true');
        } else {
            // Cerrar
            const height = content.scrollHeight + 'px';
            content.style.maxHeight = height;

            requestAnimationFrame(() => {
                content.style.transition = 'max-height 0.4s ease';
                content.style.maxHeight = '0px';
            });

            content.addEventListener('transitionend', function handler() {
                content.classList.add('hidden');
                content.style.maxHeight = '';
                content.style.transition = '';
                content.style.display = '';
                content.removeEventListener('transitionend', handler);
            });

            button.setAttribute('aria-expanded', 'false');
        }
    });
});


const gatosParaAdoptar = [
  {
    id: 1,
    nombre: "Gato 1",
    foto: "assets/assets/main/gato_chilaquil.png",
    sexo: "Hembra",
    edadTexto: "3 Años",
    edadNum: 3,
  },
  {
    id: 2,
    nombre: "Gato 2",
    foto: "assets/assets/main/gato_hachi.png",
    sexo: "Hembra",
    edadTexto: "2 Años",
    edadNum: 2,
  },
  {
    id: 3,
    nombre: "Gato 3",
    foto: "assets/assets/main/gato_aliceb.png",
    sexo: "Hembra",
    edadTexto: "9 Años",
    edadNum: 9,
  },
  {
    id: 4,
    nombre: "Gato 4",
    foto: "assets/assets/main/gato_menganita.png",
    sexo: "Hembra",
    edadTexto: "2 Años",
    edadNum: 2,
  },
  {
    id: 5,
    nombre: "Gato 5",
    foto: "assets/assets/main/gato_chilaquil.png",
    sexo: "Hembra",
    edadTexto: "2 Años",
    edadNum: 2,
  },
  {
    id: 6,
    nombre: "Gato 6",
    foto: "assets/assets/main/gato_hachi.png",
    sexo: "Hembra",
    edadTexto: "12 Años",
    edadNum: 12,
  },
  {
    id: 7,
    nombre: "Gato 7",
    foto: "assets/assets/main/gato_aliceb.png",
    sexo: "Hembra",
    edadTexto: "2 Años",
    edadNum: 2,
  },
  {
    id: 8,
    nombre: "Gato 8",
    foto: "assets/assets/main/gato_menganita.png",
    sexo: "Hembra",
    edadTexto: "10 Años",
    edadNum: 10,
  },
  {
    id: 9,
    nombre: "Gato 9",
    foto: "assets/assets/main/gato_chilaquil.png",
    sexo: "Hembra",
    edadTexto: "2 Años",
    edadNum: 2,
  },
  {
    id: 10,
    nombre: "Gato 10",
    foto: "assets/assets/main/gato_hachi.png",
    sexo: "Hembra",
    edadTexto: "6 Años",
    edadNum: 6,
  },
  {
    id: 11,
    nombre: "Gato 11",
    foto: "assets/assets/main/gato_aliceb.png",
    sexo: "Hembra",
    edadTexto: "2 Años",
    edadNum: 2,
  },
  {
    id: 12,
    nombre: "Gato 12",
    foto: "assets/assets/main/gato_menganita.png",
    sexo: "Hembra",
    edadTexto: "1 Año",
    edadNum: 1,
  },
  {
    id: 13,
    nombre: "Gato 13",
    foto: "assets/assets/main/gato_chilaquil.png",
    sexo: "Hembra",
    edadTexto: "2 Años",
    edadNum: 2,
  },
  {
    id: 14,
    nombre: "Gato 14",
    foto: "assets/assets/main/gato_hachi.png",
    sexo: "Hembra",
    edadTexto: "2 Años",
    edadNum: 2,
  },
  {
    id: 15,
    nombre: "Gato 15",
    foto: "assets/assets/main/gato_aliceb.png",
    sexo: "Hembra",
    edadTexto: "4 Años",
    edadNum: 4,
  },
  {
    id: 16,
    nombre: "Gato 16",
    foto: "assets/assets/main/gato_menganita.png",
    sexo: "Hembra",
    edadTexto: "5 Años",
    edadNum: 5,
  },
  {
    id: 17,
    nombre: "Gato 17",
    foto: "assets/assets/main/gato_menganita.png",
    sexo: "Hembra",
    edadTexto: "8 Años",
    edadNum: 8,
  },
];

// Referencias
const contenedorGatos = document.getElementById("gatos-grid");
const perfilDetalle = document.getElementById("perfil-gato-detalle");
const requisitosSeccion = document.getElementById("requisitos-adopcion");

// 1. Mostrar tarjetas de gatos
gatosParaAdoptar.forEach(gato => {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer";
  card.innerHTML = `
    <img src="${gato.foto}" alt="${gato.nombre}" class="w-full h-48 object-cover">
    <div class="p-4 text-center">
      <h3 class="text-xl font-semibold text-gray-800">${gato.nombre}</h3>
      <p class="text-gray-600">${gato.edadTexto} • ${gato.sexo}</p>
    </div>
  `;
  
  // 2. Al hacer clic, mostrar el perfil
  card.addEventListener("click", () => {
    mostrarPerfilGato(gato);
  });

  contenedorGatos.appendChild(card);
});

// 3. Función para mostrar el perfil
function mostrarPerfilGato(gato) {
  perfilDetalle.innerHTML = `
    <div class="bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto mt-6 transition-all duration-500">
      <img src="${gato.foto}" alt="${gato.nombre}" class="w-full h-64 object-cover rounded-lg mb-4">
      <h2 class="text-2xl font-bold text-gray-900">${gato.nombre}</h2>
      <p class="text-gray-700 mt-2">Edad: ${gato.edadTexto}</p>
      <p class="text-gray-700">Sexo: ${gato.sexo}</p>
      <button id="cerrar-perfil" class="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Cerrar</button>
    </div>
  `;

  // Mostrar la sección si estaba oculta
  perfilDetalle.classList.remove("hidden");

  // Hacer scroll hasta el perfil
  perfilDetalle.scrollIntoView({ behavior: "smooth", block: "start" });

  // Cerrar perfil
  document.getElementById("cerrar-perfil").addEventListener("click", () => {
    perfilDetalle.classList.add("hidden");
  });
}
