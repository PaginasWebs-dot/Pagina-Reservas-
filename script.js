
/*
  Casa Vista Sur
  IMPORTANTE: reemplaza el número de ejemplo por el WhatsApp real.
  Usa código de país + número, sin el signo + ni espacios.
  Ejemplo de formato chileno: 56912345678
*/
const WHATSAPP_NUMBER = "56912345678";

const DEFAULT_MESSAGE =
  "Hola, quisiera consultar por Casa Vista Sur. ¿Me pueden compartir disponibilidad, tarifas y ubicación?";

function createWhatsAppUrl(message) {
  return "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message);
}

// Enlaces directos a WhatsApp.
document.querySelectorAll("[data-whatsapp]").forEach(function(link) {
  link.href = createWhatsAppUrl(DEFAULT_MESSAGE);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

// Año automático en el pie de página.
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Menú adaptable a celulares.
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", function() {
    const open = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open ? "Cerrar menú" : "Abrir menú"
    );
    menuToggle.textContent = open ? "✕" : "☰";
  });

  menu.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
      menu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.textContent = "☰";
    });
  });
}

// Evita seleccionar fechas anteriores al día actual.
const dateInput = document.getElementById("fecha");

if (dateInput) {
  const now = new Date();
  const localDate = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  ).toISOString().slice(0, 10);

  dateInput.min = localDate;
}

// Formulario: prepara la consulta y abre WhatsApp.
// No confirma automáticamente una reserva.
const bookingForm = document.getElementById("booking-form");

if (bookingForm) {
  bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!bookingForm.reportValidity()) return;

    const data = new FormData(bookingForm);
    const date = data.get("fecha");
    const time = data.get("horario");
    const people = data.get("personas");
    const extra = String(data.get("mensaje") || "").trim();

    const lines = [
      "Hola, quisiera consultar una reserva en Casa Vista Sur.",
      "Fecha: " + date,
      "Horario preferido: " + time,
      "Cantidad de personas: " + people
    ];

    if (extra) {
      lines.push("Mensaje adicional: " + extra);
    }

    lines.push("¿Me pueden confirmar disponibilidad, tarifa y ubicación?");

    window.open(
      createWhatsAppUrl(lines.join("\n")),
      "_blank",
      "noopener,noreferrer"
    );
  });
}
