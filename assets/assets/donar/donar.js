// --- LOGICA PARA EL EFECTO HOVER (Opcional JS para mejorar UX en desktop) ---
        const donarPanel = document.getElementById('panel-donar');
        const apadrinarPanel = document.getElementById('panel-apadrinar');

        // --- LOGICA MODAL DONAR ---
        function openDonationModal() {
            const modal = document.getElementById('modal-donar');
            const content = document.getElementById('modal-content');
            modal.classList.remove('hidden');
            // Pequeño delay para permitir la transición CSS
            setTimeout(() => {
                content.classList.remove('scale-95', 'opacity-0');
                content.classList.add('scale-100', 'opacity-100');
            }, 10);
        }

        function closeDonationModal() {
            const modal = document.getElementById('modal-donar');
            const content = document.getElementById('modal-content');
            content.classList.remove('scale-100', 'opacity-100');
            content.classList.add('scale-95', 'opacity-0');
            
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 200);
        }

        // Cerrar modal si se hace click afuera
        document.getElementById('modal-donar').addEventListener('click', function(e) {
            if (e.target === this) {
                closeDonationModal();
            }
        });

        // --- LOGICA SECCION APADRINAR (ACORDEON) ---
        function scrollToApadrinar() {
            const section = document.getElementById('seccion-apadrinar-form');
            section.classList.remove('hidden');
            
            // Scroll suave hacia la sección
            section.scrollIntoView({ behavior: 'smooth' });
        }

        function toggleApadrinar() {
            const section = document.getElementById('seccion-apadrinar-form');
            section.classList.add('hidden');
            // Scroll de vuelta arriba
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // --- LOGICA SELECCION DE MICHIS ---
        function selectCat(cardElement) {
            // Toggle selection visual style
            cardElement.classList.toggle('selected');
            
            // Toggle check icon
            const checkIcon = cardElement.querySelector('.checkbox-indicator i');
            const indicator = cardElement.querySelector('.checkbox-indicator');
            
            if (cardElement.classList.contains('selected')) {
                checkIcon.classList.remove('hidden');
                indicator.classList.remove('border-gray-300');
                indicator.classList.add('bg-orange-500', 'border-orange-500');
            } else {
                checkIcon.classList.add('hidden');
                indicator.classList.add('border-gray-300');
                indicator.classList.remove('bg-orange-500', 'border-orange-500');
            }
        }

        // Selección de botones de cantidad (visual simple)
        const donationBtns = document.querySelectorAll('.donation-btn');
        donationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                donationBtns.forEach(b => b.classList.remove('bg-orange-100', 'border-orange-500', 'font-bold'));
                this.classList.add('bg-orange-100', 'border-orange-500', 'font-bold');
            });
        });

        const modalBtns = document.querySelectorAll('.modal-amount-btn');
        modalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                modalBtns.forEach(b => {
                    b.classList.remove('border-blue-500', 'bg-blue-50', 'text-blue-700', 'font-bold');
                    b.classList.add('border-gray-200', 'text-gray-600');
                });
                this.classList.remove('border-gray-200', 'text-gray-600');
                this.classList.add('border-blue-500', 'bg-blue-50', 'text-blue-700', 'font-bold');
            });
        });