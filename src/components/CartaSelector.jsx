import { useState } from "react";
import { useMenu } from "../hooks/useMenu.js";
import MenuItem from "./MenuItem.jsx";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const TABS = [
  { id: "local", label: "En el local", titulo: "Carta en el local" },
  { id: "bebestibles", label: "Bebestibles", titulo: "Carta de Bebestibles" },
  { id: "llevar", label: "Para llevar", titulo: "Carta para llevar" }
];

const DURACION = 0.85;
const CURVA = [0.65, 0, 0.35, 1];
const ZINSTANT = { duration: 0 };

// Pasar la hoja sobre el espiral (bisagra en el borde izquierdo)
const variantesPagina = {
  enter: (dir) =>
    dir > 0
      ? { rotateY: 0, filter: "brightness(0.88)", zIndex: 1 } // queda debajo, se revela
      : { rotateY: -180, filter: "brightness(0.8)", zIndex: 3 }, // vuelve por encima
  center: {
    rotateY: 0,
    filter: "brightness(1)",
    transition: { duration: DURACION, ease: CURVA }
  },
  exit: (dir) =>
    dir > 0
      ? {
          rotateY: -180,
          filter: "brightness(0.8)",
          zIndex: 3,
          transition: { duration: DURACION, ease: CURVA, zIndex: ZINSTANT }
        }
      : {
          filter: "brightness(0.88)",
          zIndex: 1,
          transition: { duration: DURACION, ease: CURVA, zIndex: ZINSTANT }
        }
};

// Para personas con "reducir movimiento" activado en su equipo
const variantesSuave = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

function CartaSelector() {
  const [tipo, setTipo] = useState("local");
  const [direccion, setDireccion] = useState(1);
  const reducirMovimiento = useReducedMotion();

  const { platos, cargando, error } = useMenu(tipo);

  const cambiarTab = (nuevoTipo) => {
    if (nuevoTipo === tipo) return;
    const indexActual = TABS.findIndex((t) => t.id === tipo);
    const indexNuevo = TABS.findIndex((t) => t.id === nuevoTipo);
    setDireccion(indexNuevo > indexActual ? 1 : -1);
    setTipo(nuevoTipo);
  };

  const categorias = [...new Set(platos.map((plato) => plato.categoria))];
  const tabActual = TABS.find((t) => t.id === tipo);
  const variantes = reducirMovimiento ? variantesSuave : variantesPagina;

  return (
    <section id="menu" className="cartas-section">
      <div className="cartas-container">
        <h2 className="section-title">NUESTRAS CARTAS</h2>
        <p className="cartas-subtitulo">
          Selecciona una carta para hojear nuestros platos.
        </p>

        {/* Selector principal de las 3 cartas */}
        <div className="cartas-tabs" role="group" aria-label="Seleccionar carta">
          {TABS.map((tab) => {
            const activo = tipo === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`carta-tab ${activo ? "active" : ""}`}
                aria-pressed={activo}
                onClick={() => cambiarTab(tab.id)}
              >
                {activo && (
                  <motion.span
                    layoutId="selector-carta-bg"
                    className="carta-tab-bg"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="carta-tab-text">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="carta-book-viewport">
          <div className="carta-cuaderno">
            <AnimatePresence mode="popLayout" custom={direccion} initial={false}>
              <motion.div
                key={tipo}
                custom={direccion}
                variants={variantes}
                initial="enter"
                animate="center"
                exit="exit"
                className="carta-hoja-wrapper"
                style={{ transformOrigin: "left center" }}
              >
                {cargando && <p className="cartas-mensaje">Cargando carta...</p>}

                {error && (
                  <p className="cartas-mensaje" role="alert">
                    {error}
                  </p>
                )}

                {!cargando && !error && platos.length === 0 && (
                  <div className="carta-contenido carta-vacia">
                    <p className="cartas-mensaje">
                      Próximamente nuevos productos en esta carta.
                    </p>
                  </div>
                )}

                {!cargando && !error && platos.length > 0 && (
                  <div className="carta-contenido">
                    <div className="carta-encabezado-interno">
                      <span className="carta-sello">RESTAURANT MARÍA ELENA</span>
                      <h3 className="carta-titulo">{tabActual?.titulo}</h3>
                    </div>

                    {categorias.map((categoria) => {
                      const catLower = categoria.toLowerCase();
                      const esParrilla = catLower.includes("parrilla");
                      const esPlatosDeFondo = catLower.includes("platos de fondo");

                      return (
                        <div key={categoria} className="carta-categoria">
                          <div className="category-header">
                            <h4 className="category-title">{categoria}</h4>
                            {(esParrilla || esPlatosDeFondo) && (
                              <span className="category-note">
                                * Parrilla: preparación 25 min aprox.
                              </span>
                            )}
                          </div>

                          <div className="platos-lista">
                            {platos
                              .filter((plato) => plato.categoria === categoria)
                              .map((plato) => (
                                <MenuItem key={plato.id} plato={plato} />
                              ))}
                          </div>

                          {esParrilla && (
                            <p className="agregados-linea">
                              <strong>Agregados:</strong> Ensalada fresca, Pastelera de choclo, Arroz, Verduras al horno, Cremoso de mote, Puré de papa natural o Papas (fritas, doradas, provenzal, cocidas y mayo).
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartaSelector;