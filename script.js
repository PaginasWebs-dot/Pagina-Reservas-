// CONFIGURACIÓN: cambia el número por el WhatsApp real del alojamiento.
// Formato internacional, solo números. Ejemplo Chile: 56912345678
const WHATSAPP_NUMBER = "56912345678";

const toggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#navLinks");

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  toggle.textContent = isOpen ? "×" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "☰";
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const message = encodeURIComponent(
  "Hola, vi la página de Casa Vista Sur y quisiera consultar por disponibilidad, precios y condiciones de la estadía."
);
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

document.querySelectorAll(".whatsapp-link").forEach(link => {
  link.href = whatsappUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

// Reemplaza el enlace de Google Maps en index.html por la ubicación real.
