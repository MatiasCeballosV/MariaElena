import { useState } from "react";
import { useMenu } from "../hooks/useMenu.js";
import MenuItem from "./MenuItem.jsx";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "local", label: "En el local", titulo: "Carta en el local" },
  { id: "bebestibles", label: "Bebestibles", titulo: "Carta de Bebestibles" },
  { id: "llevar", label: "Para llevar", titulo: "Carta para llevar" }
];

function CartaSelector() {
  const [tipo, setTipo] = useState("local");
  const [direccion, setDireccion] = useState(1);

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

  // Efecto de libro
  const bookPageVariants = {
    enter: (dir) => ({
      rotateY: dir > 0 ? 75 : -75,
      x: dir > 0 ? 60 : -60,
      scale: 0.96,
      opacity: 0,
      transformOrigin: dir > 0 ? "left center" : "right center"
    }),
    center: {
      rotateY: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      transformOrigin: "center center",
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 22,
        mass: 0.9
      }
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -75 : 75,
      x: dir > 0 ? -60 : 60,
      scale: 0.96,
      opacity: 0,
      transformOrigin: dir > 0 ? "left center" : "right center",
      transition: {
        duration: 0.28,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

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

        {}

        <div className="carta-book-viewport">
          <AnimatePresence mode="wait" custom={direccion}>
            <motion.div
              key={tipo}
              custom={direccion}
              variants={bookPageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="carta-hoja-wrapper"
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
    </section>
  );
}

export default CartaSelector;