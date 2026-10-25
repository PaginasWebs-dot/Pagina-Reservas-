
/*
 * Casa Vista Sur
 * IMPORTANTE: reemplaza el número por el WhatsApp real.
 * Formato internacional, solo números, sin + ni espacios.
 * Ejemplo de Chile: 56912345678
 */
const WHATSAPP_NUMBER = "56912345678";

function createWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Menú móvil
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.textContent = "☰";
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.textContent = "☰";
    }
  });
}

// Año automático del pie de página
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Enlaces de consulta general por WhatsApp
const generalMessage =
  "Hola, vi la página de Casa Vista Sur y quisiera consultar por disponibilidad, precios y condiciones de la estadía.";

document.querySelectorAll(".whatsapp-link").forEach(link => {
  link.href = createWhatsAppUrl(generalMessage);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

// Fecha mínima: hoy, según la fecha local del navegador
const dateInput = document.querySelector("#reservationDate");

if (dateInput) {
  const now = new Date();
  const localDate = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  ).toISOString().slice(0, 10);

  dateInput.min = localDate;
}

// Formulario de consulta
const reservationForm = document.querySelector("#reservationForm");

if (reservationForm) {
  reservationForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!reservationForm.reportValidity()) {
      return;
    }

    const date = document.querySelector("#reservationDate").value;
    const guests = document.querySelector("#guestCount").value;
    const time = document.querySelector("#timePreference").value;
    const extraMessage = document
      .querySelector("#reservationMessage")
      .value.trim();

    const [year, month, day] = date.split("-");
    const formattedDate = `${day}/${month}/${year}`;

    let message =
      "Hola, vi la página de Casa Vista Sur y quisiera consultar por una estadía.\n\n" +
      `Fecha de interés: ${formattedDate}\n` +
      `Cantidad de personas: ${guests}\n` +
      `Horario de interés: ${time}\n\n` +
      "¿Me podrían indicar disponibilidad, precio y condiciones?";

    if (extraMessage) {
      message += `\n\nMensaje adicional: ${extraMessage}`;
    }

    const feedback = document.querySelector("#reservationFeedback");
    const whatsappUrl = createWhatsAppUrl(message);

    if (feedback) {
      feedback.textContent =
        "Abriendo WhatsApp. Revisa tu consulta y envíala para contactar al alojamiento.";
    }

    // Abre WhatsApp con el mensaje preparado.
    const whatsappWindow = window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

    // Alternativa si el navegador bloquea la nueva ventana.
    if (!whatsappWindow) {
      window.location.href = whatsappUrl;
    }
  });
}
