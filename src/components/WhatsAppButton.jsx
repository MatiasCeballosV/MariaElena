import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  // Reemplazar por el número del restaurante
  const telefono = "+56955391272";

  const mensaje = encodeURIComponent(
    "Hola, quisiera consultar por el menú de María Elena."
  );

  return (
    <a
      href={`https://wa.me/${telefono}?text=${mensaje}`}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      title="Escríbenos por WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppButton;