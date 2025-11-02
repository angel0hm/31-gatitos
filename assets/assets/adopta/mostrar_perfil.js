document.addEventListener('DOMContentLoaded', function () {
    
    const catalogoGrid = document.getElementById('gatos-grid');
    const paginationControls = document.getElementById('pagination-controls');
    const sortButton = document.getElementById('dropdownDefaultButton');
    const sortDropdown = document.getElementById('dropdown-sort');
    const seccionCatalogo = document.querySelector('#gatos-grid')?.closest('section');
    const perfilDetalleContenedor = document.getElementById('perfil-gato-detalle');

    if (!catalogoGrid || !paginationControls || !sortButton || !sortDropdown) return;

    // ESTADO
    const itemsPerPage = 10;
    let currentPage = 1;
    let currentSort = 'recientes';
    let sortedGatos = Array.isArray(gatosParaAdoptar) ? [...gatosParaAdoptar] : [];

    // HELPERS
    const $id = (id) => document.getElementById(id);
    const safeText = (el, fallback = '') => (el ? el.innerText.trim() : fallback);

    // ORDENAMIENTO 
    function sortGatos(sortBy) {
        currentSort = sortBy;
        const parseFecha = (fechaStr) => {
            const [dia, mes, año] = fechaStr.split('-').map(Number);
            return new Date(año, mes - 1, dia);
        };

        switch (sortBy) {
            case 'recientes':
                sortedGatos.sort((a, b) => parseFecha(b.fecha).getTime() - parseFecha(a.fecha).getTime());
                break;
            case 'antiguos':
                sortedGatos.sort((a, b) => parseFecha(a.fecha).getTime() - parseFecha(b.fecha).getTime());
                break;
            case 'edadAsc':
                sortedGatos.sort((a, b) => a.edadNum - b.edadNum);
                break;
            case 'edadDesc':
                sortedGatos.sort((a, b) => b.edadNum - a.edadNum);
                break;
            case 'sexo':
                sortedGatos.sort((a, b) => a.sexo.localeCompare(b.sexo));
                break;
            default:
                sortedGatos.sort((a, b) => parseFecha(b.fecha).getTime() - parseFecha(a.fecha).getTime());
        }

        const opt = sortDropdown.querySelector(`[data-sort="${sortBy}"]`);
        const sortOptionText = safeText(opt, 'Recientes');
        sortButton.childNodes[0].nodeValue = `Ordenar por: ${sortOptionText} `;
        displayPage(1);
    }

    // MOSTRAR PÁGINA
    function displayPage(page) {
        currentPage = page;
        catalogoGrid.innerHTML = '';
        paginationControls.innerHTML = '';

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const gatosEnPagina = sortedGatos.slice(startIndex, endIndex);

        gatosEnPagina.forEach((gato, index) => {
            const delay = 0;
            const tarjetaHTML = `
                <div class="relative group cursor-pointer text-center" 
                     data-gato-id="${gato.id}" 
                     data-aos="fade-up" 
                     data-aos-offset="150" 
                     data-aos-delay="${delay}">
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
            `;
            catalogoGrid.innerHTML += tarjetaHTML;
        });

        // abrir perfil
        catalogoGrid.querySelectorAll('[data-gato-id]').forEach(tarjeta => {
            tarjeta.replaceWith(tarjeta.cloneNode(true));
        });
        catalogoGrid.querySelectorAll('[data-gato-id]').forEach(tarjeta => {
            tarjeta.addEventListener('click', function () {
                mostrarPerfilGato(this.dataset.gatoId);
            });
        });

        setupPagination();
        setTimeout(() => { if (window.AOS && AOS.refreshHard) AOS.refreshHard(); }, 50);
    }

    // PAGINACIÓN
    function setupPagination() {
        paginationControls.innerHTML = '';
        const baseButtonClasses = 'flex items-center justify-center px-3 h-8 text-sm font-medium';
        const normalButtonClasses = `${baseButtonClasses} text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700`;
        const activeButtonClasses = `${baseButtonClasses} text-violet-600 bg-violet-200 border border-transparent rounded-lg`;
        const totalPages = Math.ceil(sortedGatos.length / itemsPerPage);
        const maxPagesToShow = 5;

        // Botón
        if (currentPage > 1) {
            const prev = document.createElement('button');
            prev.innerHTML = `<svg class="w-2.5 h-2.5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/></svg>`;
            prev.className = normalButtonClasses;
            prev.onclick = () => displayPage(currentPage - 1);
            paginationControls.appendChild(prev);
        }

        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        if (endPage - startPage + 1 < maxPagesToShow)
            startPage = Math.max(1, endPage - maxPagesToShow + 1);

        for (let i = startPage; i <= endPage; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            btn.className = i === currentPage ? activeButtonClasses : normalButtonClasses;
            btn.onclick = () => displayPage(i);
            paginationControls.appendChild(btn);
        }

        // Botón
        if (currentPage < totalPages) {
            const next = document.createElement('button');
            next.innerHTML = `<svg class="w-2.5 h-2.5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/></svg>`;
            next.className = normalButtonClasses;
            next.onclick = () => displayPage(currentPage + 1);
            paginationControls.appendChild(next);
        }
    }

    // MOSTRAR PERFIL
    function mostrarPerfilGato(gatoId) {
        const gato = gatosParaAdoptar.find(g => g.id === parseInt(gatoId));
        if (!gato) return;

        seccionCatalogo?.classList.add('hidden');
        paginationControls.classList.add('hidden');

        perfilDetalleContenedor.innerHTML = `
            <button id="volver-catalogo" class="mb-6 text-violet-600 ml-8 md:ml-20 hover:text-violet-800 font-semibold transition">
                &larr; Volver
            </button>

            <div class="px-6 md:px-20">
                <!-- Encabezado -->
                <h1 class="text-4xl font-semibold text-zinc-800 mb-2">Mi nombre es ${gato.nombre}</h1>
                <h3 class="text-lg text-gray-600 mb-8">${tiempo(gato.fecha)}</h3>

                <!-- Layout principal -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                    <!-- Galería -->
                    <div class="relative w-full max-w-sm md:max-w-md lg:max-w-lg aspect-square mx-auto overflow-hidden">
                        <div class="relative w-full max-w-md aspect-square mx-auto overflow-hidden">
                            <img id="mainImage" src="${gato.foto}" alt="${gato.nombre}" 
                                class="w-full h-full object-cover rounded-lg transition-opacity duration-300 ease-in-out opacity-100">
                        </div>
                        
                        <!-- Flechas -->
                        <button id="prevBtn" class="absolute left-3 top-1/2 -translate-y-1/2 md:translate-y-[calc(-130%)] bg-black/40 text-white rounded-full p-2 hover:bg-black/60 hover:scale-105 transition duration-200 ease-in-out">
                            &#10094;
                        </button>
                        <button id="nextBtn" class="absolute right-3 top-1/2 -translate-y-1/2 md:translate-y-[calc(-130%)] bg-black/40 text-white rounded-full p-2 hover:bg-black/60 hover:scale-105 transition duration-200 ease-in-out">
                            &#10095;
                        </button>

                        <!-- Miniaturas -->
                        <div class="flex justify-center gap-2 mt-3 flex-wrap">
                            ${(gato.fotos?.length ? gato.fotos : [gato.foto]).map((img, i) => `
                                <img src="${img}" 
                                    class="w-14 h-14 object-cover rounded-lg border-2 cursor-pointer 
                                        ${i === 0 ? 'border-violet-500' : 'border-transparent'} 
                                        hover:border-violet-400 hover:scale-105 transition duration-200 ease-in-out"
                                    data-index="${i}">
                            `).join('')}
                            ${gato.fotos && gato.fotos.length > 6 ? `<div class="w-14 h-14 flex items-center justify-center bg-gray-300 text-sm text-gray-700 rounded-lg">+${gato.fotos.length - 6}</div>` : ''}
                        </div>
                    </div>

                    <!-- Información -->
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-3">Información básica</h2>
                        <div class="my-16 text-lg text-gray-700 space-y-1">
                            <div><strong>Edad:</strong> ${gato.edadTexto || gato.edad}</div>
                            <div><strong>Sexo:</strong> ${gato.sexo}</div>
                            <div><strong>Vacunas: </strong> ${gato.vacunas}</div>
                            <div><strong>Esterilizado:</strong> ${gato.esterilizado}</div>
                            <div><strong>Observaciones:</strong> ${gato.otros}</div>
                        </div>
                        <div class="flex flex-wrap gap-4 mt-12">
                            <button onclick="abrirFormularioAdopcion(${gato.id})"
                                class="bg-violet-500 text-white font-bold py-3 px-6 rounded-lg 
                                hover:bg-violet-800 hover:scale-110 active:scale-105 transition-all duration-150 ease-in-out">
                                Adóptame
                            </button>
                            <a href="apadrina.html#gato-${gato.id}"
                                class="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg 
                                hover:bg-gray-400 hover:scale-110 active:scale-105 transition-all duration-150 ease-in-out">
                                Apadríname
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Personalidad -->
            <div class="px-6 md:px-20">
                <h3 class="text-4xl font-semibold text-zinc-800 mb-4 mt-8">Personalidad</h3>
                <div id="personalidad" class="flex flex-wrap gap-3">
                    ${gato.personalidad?.map(trait => `
                    <span class="bg-violet-200 px-3 py-1 rounded font-medium text-violet-900 hover:bg-violet-300 transition duration-600 ease-in-out">
                        ${trait}
                    </span>
                    `).join('')}
                </div>
            </div>
            <!-- Detalles -->
            <div class="px-6 md:px-20">
                <h3 class="text-4xl font-semibold text-zinc-800 mb-4 mt-8">Detalles</h3>
                <div id="personalidad" class="flex flex-wrap gap-3">
                    ${gato.detalles && gato.detalles.length > 0
                        ? gato.detalles.map(trait => `
                            <span class="bg-violet-200 px-3 py-1 rounded font-medium text-violet-900 hover:bg-violet-300 transition duration-600 ease-in-out">
                                ${trait}
                            </span>
                        `).join('')
                        : `
                            <span class="bg-violet-200 px-3 py-1 rounded font-medium text-violet-900 hover:bg-violet-300 transition duration-600 ease-in-out">
                                Sin detalles
                            </span>
                        `
                    }
                </div>
            </div>
            <!-- Historia -->
            <div class="px-6 md:px-20">
                <h3 class="text-4xl font-semibold text-zinc-800 mb-2 mt-8">Mi historia</h3>
                <p class="text-lg text-gray-600 mb-4">Esto es lo que los humanos saben de mí</p>
                <p class="text-lg text-gray-600 mb-8 text-justify">${gato.biografia}</p>
            </div>
            
            <!-- Modal -->
            <div id="modal-adopcion-${gato.id}" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
                <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">

                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-2xl font-bold">Formulario de ${gato.nombre}</h2>
                        <button onclick="cerrarFormularioAdopcion(${gato.id})" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                    </div>

                    <form id="form-adopcion-${gato.id}">
                        <div id="form-step-1-${gato.id}">
                            <p class="text-sm text-gray-600 mb-4">Paso 1 de 2 <br>Antes de que me adoptes, los humanos que me cuidan necesitan saber de ti.</p>
                            <div class="space-y-4">
                                <div>
                                    
                                    <input type="text" id="nombre-${gato.id}" name="nombre" class="placeholder:text-gray-400 w-full px-3 py-2
                                    border-0 border-b border-gray-300
                                    focus:outline-none focus:ring-0 focus:border-violet-500" 
                                    required placeholder="Nombre completo">
                                </div>
                                <div>
                                    <input type="email" id="email-${gato.id}" name="email" autocomplete="email" class="placeholder:text-gray-400 w-full px-3 py-2
                                    border-0 border-b border-gray-300
                                    focus:outline-none focus:ring-0 focus:border-violet-500" 
                                    required placeholder="Correo electrónico">
                                </div>
                                <div>
                                    <input type="tel" id="telefono-${gato.id}" name="telefono" class="placeholder:text-gray-400 w-full px-3 py-2
                                    border-0 border-b border-gray-300
                                    focus:outline-none focus:ring-0 focus:border-violet-500" 
                                    required placeholder="Número telefónico">
                                </div>
                                <div class="flex items-center">
                                    <input type="checkbox" id="mayorEdad-${gato.id}" name="mayorEdad" class="h-4 w-4 text-violet-600 border-gray-300 rounded focus:outline-none focus:ring-0" required>
                                    <label for="mayorEdad-${gato.id}" class="ml-2 block text-sm text-gray-700">Confirmo que tengo la edad necesaria (+26 años)</label>
                                </div>
                            </div>
                            <div class="mt-6 flex justify-end">
                                <button type="button" onclick="irAPaso2(${gato.id})" class="bg-violet-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-violet-600 hover:scale-105 active:scale-95 transition duration:200 ease-in-out">
                                    Continuar
                                </button>
                            </div>
                        </div>

                        <div id="form-step-2-${gato.id}" class="hidden">
                            <p class="text-sm text-gray-600 mb-4">Paso 2 de 2<br>${gato.nombre} tiene que saber cómo será su futuro hogar.</p>
                            <div class="space-y-4">
                                <div>
                                    <label for="hogar-${gato.id}" class="block mb-1 text-sm font-medium text-gray-700">¿Quiénes viven en tu casa? (adultos, niños, edades)</label>
                                    <textarea id="hogar-${gato.id}" name="hogar" rows="2" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500"></textarea>
                                </div>
                                <div>
                                    <label for="mascotas-${gato.id}" class="block mb-1 text-sm font-medium text-gray-700">¿Tienes otras mascotas? Cuéntanos sobre ellas (especie, edad, carácter).</label>
                                    <textarea id="mascotas-${gato.id}" name="mascotas" rows="2" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500" required></textarea>
                                </div>
                                <div>
                                    <label for="motivo-${gato.id}" class="block mb-1 text-sm font-medium text-gray-700">¿Por qué te gustaría adoptar a ${gato.nombre}?</label>
                                    <textarea id="motivo-${gato.id}" name="motivo" rows="3" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500" required></textarea>
                                </div>
                                <div class="flex items-center">
                                    <input type="checkbox" id="gastos-${gato.id}" name="gastos" class="h-4 w-4 text-violet-600 border-gray-300 rounded focus:outline-none focus:ring-0" required>
                                    <label for="gastos-${gato.id}" required class="ml-2 block text-sm text-gray-700">Confirmo estar preparado/a para cubrir los gastos veterinarios y de cuidado que necesita un gato.</label>
                                </div>
                            </div>
                            <div class="mt-6 flex justify-between">
                                <button type="button" onclick="volverAPaso1(${gato.id})" class="text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-lg hover:scale-105 active:scale-95 transition duration:200 ease-in-out">
                                    &larr; Volver
                                </button>
                                <button type="button" onclick="finalizar(${gato.id})" class="bg-violet-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-violet-600 hover:scale-105 active:scale-95 transition duration-200 ease-in-out">
                                    Enviar Solicitud
                                </button>
                            </div>
                        </div>

                        <div id="form-step-3-${gato.id}" class="hidden">
                            <p class="text-sm text-gray-600 mb-4">Mensaje de ${gato.nombre}</p>
                            <div class="space-y-4">
                                <p class="block mb-1 text-sm text-justify font-medium text-gray-700 ">Espero conocerte pronto!
                                <br>Te llegará una notificación de que los humanos que me cuidan les llegó tu solicitud, después ellos se pondrán en contacto contigo 
                                en las próximas 24 - 48 horas. Muchas michigracias por querer adoptarme! ^-^
                                </p>
                                <img  src="${gato.foto}" alt="${gato.nombre}" 
                                class="w-full h-full object-cover rounded-lg transition-opacity duration-300 ease-in-out opacity-100">
                            </div>
                            <div class="mt-6 flex justify-between">
                                <button type="button" onclick="cerrarFinalizar(${gato.id})" class="bg-violet-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-violet-600 hover:scale-105 active:scale-95 transition duration:200 ease-in-out">
                                    Finalizar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;

        // FORM NAV HELPERS (expuestos en window para onclicks)
        function irAPaso2_local(gatoId) {
        const step1 = $id(`form-step-1-${gatoId}`);
            if (!step1) return;
            const campos = step1.querySelectorAll('input, select, textarea');
            for (const campo of campos) {
                if (!campo.checkValidity()) {
                    campo.reportValidity(); 
                    return;
                }
            }
            step1.classList.add('hidden');
            $id(`form-step-2-${gatoId}`).classList.remove('hidden');
        }
        function finalizar_local(gatoId) {
            const step1 = $id(`form-step-2-${gatoId}`);
            if (!step1) return;
            const campos = step1.querySelectorAll('input, select, textarea');
            for (const campo of campos) {
                if (!campo.checkValidity()) {
                    campo.reportValidity(); 
                    return;
                }
            }
            $id(`form-step-2-${gatoId}`).classList.add('hidden');
            $id(`form-step-3-${gatoId}`).classList.remove('hidden');
        }
        function volverAPaso1_local(gatoId) {
            $id(`form-step-2-${gatoId}`).classList.add('hidden');
            $id(`form-step-1-${gatoId}`).classList.remove('hidden');
        }
        function cerrarFinalizar_local(gatoId) {
            $id(`form-step-3-${gatoId}`).classList.add('hidden');
            const f = $id(`form-adopcion-${gatoId}`);
            if (f) f.reset();
            $id(`form-step-1-${gatoId}`).classList.remove('hidden');
            cerrarFormularioAdopcion(gatoId);
        }

        // exportar para onclick en HTML
        window.irAPaso2 = irAPaso2_local;
        window.finalizar = finalizar_local;
        window.volverAPaso1 = volverAPaso1_local;
        window.cerrarFinalizar = cerrarFinalizar_local;

        // MANEJO DEL ENVÍO DEL FORMULARIO
        if (!window.__adopcion_submit_installed) {
            document.addEventListener('submit', function (event) {
                if (event.target && event.target.id && event.target.id.startsWith('form-adopcion-')) {
                    event.preventDefault();
                    const gatoId = event.target.id.split('-')[2];
                    const formData = new FormData(event.target);
                    const data = Object.fromEntries(formData.entries());
                    console.log('Datos del formulario:', data);
                    alert(`¡Gracias por tu solicitud para adoptar! Nos pondremos en contacto contigo pronto.`);
                    cerrarFormularioAdopcion(gatoId);
                    event.target.reset();
                    // volver al paso 1 por si vuelve a abrirse
                    const step1 = $id(`form-step-1-${gatoId}`);
                    const step2 = $id(`form-step-2-${gatoId}`);
                    const step3 = $id(`form-step-3-${gatoId}`);
                    if (step1) step1.classList.remove('hidden');
                    if (step2) step2.classList.add('hidden');
                    if (step3) step3.classList.add('hidden');
                }
            });
            window.__adopcion_submit_installed = true;
        }

        // GALERÍA 
        const mainImage = $id("mainImage");
        const thumbnails = perfilDetalleContenedor.querySelectorAll("[data-index]");
        const prevBtn = $id("prevBtn");
        const nextBtn = $id("nextBtn");
        const fotos = gato.fotos?.length ? gato.fotos : [gato.foto];
        let currentIndex = 0;

        function cambiarImagen(nuevaSrc) {
            if (!mainImage) return;
            mainImage.classList.add("opacity-0");
            setTimeout(() => {
                mainImage.src = nuevaSrc;
                mainImage.onload = () => mainImage.classList.remove("opacity-0");
            }, 150);
        }

        thumbnails.forEach((thumb, i) => {
            thumb.addEventListener("click", () => {
                currentIndex = i;
                cambiarImagen(fotos[i]);
                thumbnails.forEach(t => t.classList.remove("border-violet-500"));
                thumb.classList.add("border-violet-500");
            });
        });

        if (prevBtn && nextBtn && fotos.length > 1) {
            prevBtn.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + fotos.length) % fotos.length;
                cambiarImagen(fotos[currentIndex]);
                thumbnails.forEach((t, i) => {
                    t.classList.toggle("border-violet-500", i === currentIndex);
                });
            });

            nextBtn.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % fotos.length;
                cambiarImagen(fotos[currentIndex]);
                thumbnails.forEach((t, i) => {
                    t.classList.toggle("border-violet-500", i === currentIndex);
                });
            });
        }

        perfilDetalleContenedor.classList.remove('hidden');
        const volverBtn = $id('volver-catalogo');
        if (volverBtn) volverBtn.addEventListener('click', mostrarCatalogo);
        perfilDetalleContenedor.scrollIntoView({ behavior: 'smooth' });
    }

    // VOLVER AL CATÁLOGO 
    function mostrarCatalogo() {
        perfilDetalleContenedor.classList.add('hidden');
        perfilDetalleContenedor.innerHTML = '';
        seccionCatalogo?.classList.remove('hidden');
        paginationControls.classList.remove('hidden');
        setTimeout(() => { if (window.AOS && AOS.refreshHard) AOS.refreshHard(); }, 50);
    }

    // MODAL
    function abrirFormularioAdopcion(gatoId) {
        const modal = $id(`modal-adopcion-${gatoId}`);
        if (modal) modal.classList.remove('hidden');
    }
    function cerrarFormularioAdopcion(gatoId) {
        const modal = $id(`modal-adopcion-${gatoId}`);
        if (modal) {
            modal.classList.add('hidden');
            const s1 = $id(`form-step-1-${gatoId}`);
            const s2 = $id(`form-step-2-${gatoId}`);
            const s3 = $id(`form-step-3-${gatoId}`);
            if (s1) s1.classList.remove('hidden');
            if (s2) s2.classList.add('hidden');
            if (s3) s3.classList.add('hidden');
            const f = $id(`form-adopcion-${gatoId}`);
            if (f) f.reset();
        }
    }

    // Exponer para onclick en HTML
    window.abrirFormularioAdopcion = abrirFormularioAdopcion;
    window.cerrarFormularioAdopcion = cerrarFormularioAdopcion;

    // DROPDOWN ORDEN 
    sortDropdown.addEventListener('click', function (event) {
        if (event.target.tagName === 'A' && event.target.dataset.sort) {
            event.preventDefault();
            sortGatos(event.target.dataset.sort);
        }
    });

    // INICIALIZAR
    sortGatos(currentSort);
});
