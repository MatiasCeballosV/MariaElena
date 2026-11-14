import { useState } from "react";

const UBICACIONES = {
  local: {
    titulo: "Restaurante María Elena",
    direccion: "General Cruz #0451, Temuco",
    nota: "Salón principal y retiro de pedidos para llevar.",
    mapaUrl: "https://www.google.com/maps?q=General+Cruz+0451,+Temuco,+Chile&output=embed",
    linkExterno: "https://www.google.com/maps/search/?api=1&query=General+Cruz+0451+Temuco"
  },
  estacionamiento: {
    titulo: "Estacionamiento Exclusivo",
    direccion: "Caupolicán #1211, Temuco",
    nota: "Acceso directo y cómodo para nuestros clientes.",
    mapaUrl: "https://www.google.com/maps?q=Caupolican+1211,+Temuco,+Chile&output=embed",
    linkExterno: "https://www.google.com/maps/search/?api=1&query=Caupolican+1211+Temuco"
  }
};

function Contacto() {
  const [puntoActivo, setPuntoActivo] = useState("local");
  const actual = UBICACIONES[puntoActivo];

  return (
    <section id="contacto" className="contacto-section">
      <div className="contacto-container">
        <div className="contacto-layout">
          {/* Columna izquierda: Información editorial y selector interactivo */}
          <div className="contacto-info">
            <span className="contacto-eyebrow">UBICACIÓN & HORARIOS</span>
            <h2>Ven a almorzar con nosotros</h2>
            <p className="contacto-intro">
              Cocina chilena preparada día a día en un ambiente familiar. Haz clic en cada dirección para verla en el mapa interactivo.
            </p>

            <div className="ubicacion-selector">
              <button
                type="button"
                className={`ubicacion-fila ${puntoActivo === "local" ? "active" : ""}`}
                onClick={() => setPuntoActivo("local")}
              >
                <div>
                  <span className="ubicacion-etiqueta">SALÓN Y RETIRO</span>
                  <strong>General Cruz #0451</strong>
                  <small>Temuco, Región de La Araucanía</small>
                </div>
                <span className="ubicacion-flecha">Ver mapa →</span>
              </button>

              <button
                type="button"
                className={`ubicacion-fila ${puntoActivo === "estacionamiento" ? "active" : ""}`}
                onClick={() => setPuntoActivo("estacionamiento")}
              >
                <div>
                  <span className="ubicacion-etiqueta">ESTACIONAMIENTO CLIENTES</span>
                  <strong>Caupolicán #1211</strong>
                  <small>Exclusivo durante tu visita</small>
                </div>
                <span className="ubicacion-flecha">Ver mapa →</span>
              </button>
            </div>

            <div className="horario-bloque">
              <span>Horario de atención</span>
              <strong>Lunes a Sábado • 12:00 a 17:00 hrs</strong>
            </div>

            <div className="contacto-botones">
              <a
                href={actual.linkExterno}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                ABRIR RUTA EN GOOGLE MAPS
              </a>
              <a
                href="https://www.instagram.com/maria_elena_restaurante/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                INSTAGRAM
              </a>
            </div>
          </div>

          {/* Columna derecha: Mapa interactivo en vivo */}
          <div className="contacto-mapa-wrap">
            <iframe
              key={puntoActivo}
              title={actual.titulo}
              src={actual.mapaUrl}
              className="contacto-mapa"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;