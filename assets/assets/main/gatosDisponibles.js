
const contenedor = document.getElementById("gatos-container");
const gatosAMostrar = gatosParaAdoptar.slice(0, 4);

contenedor.innerHTML = gatosAMostrar.map((gato, index) => `
  <div class="relative group cursor-pointer text-center" data-aos="fade-up"
       data-aos-offset="250" data-aos-delay="${200 + index * 100}">

      <div class="relative overflow-hidden rounded-lg card-container">
          <img src="${gato.foto}" alt="${gato.nombre}"
              class="rounded-lg shadow-md w-full object-cover aspect-square
                     transition-all duration-300 ease-in-out
                     group-hover:brightness-75 group-hover:scale-105" />
          <div class="card-overlay-text">
              <p class="text-xl font-bold">${gato.nombre}</p>
              <p class="text-lg">${gato.sexo}</p>
              <p class="text-lg">${gato.edadTexto}</p>
          </div>
      </div>
      <p class="font-semibold text-gray-800 mt-2">${gato.nombre}</p>
  </div>
`).join('');
