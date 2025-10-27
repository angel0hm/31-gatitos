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

// Calcular tiempo desde llegada
function tiempo(fechaTexto) {
  const [dia, mes, año] = fechaTexto.split('-').map(Number);
  const fechaLlegada = new Date(año, mes - 1, dia); // meses empiezan en 0
  const hoy = new Date();

  // diferencia en milisegundos
  const diffMs = hoy - fechaLlegada;

  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const meses = Math.floor(dias / 30);
  const años = Math.floor(dias / 365);

  console.log(dias, meses, años);
  if (dias < 1) return "Llegué hoy";
  if (dias > 0 && dias < 30) return `Llegué hace ${dias} día${dias > 1 ? "s" : ""}`;
  if (meses < 12) return `Llegué hace ${meses} mes${meses > 1 ? "es" : ""}`;
  return `Llegué hace ${años} año${años > 1 ? "s" : ""}`;
}