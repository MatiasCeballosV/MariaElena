import { useMenu } from "../hooks/useMenu.js";
import MenuItem from "./MenuItem.jsx";

function GrupoMenu({ titulo, categoria, platos }) {
  const filtrados = platos.filter(
    (plato) => plato.categoria === categoria
  );

  return (
    <>
      <h3 className="category-title">{titulo}</h3>

      {filtrados.map((plato) => (
        <MenuItem key={plato.id} plato={plato} />
      ))}
    </>
  );
}

function Menu() {
  const { platos, cargando, error } = useMenu();

  return (
    <section id="menu" className="menu-section">
      <div className="menu-container">
        <h2 className="section-title">MENÚ DEL DÍA</h2>

        {cargando && <p>Cargando menú...</p>}

        {error && (
          <p role="alert">
            No se pudo cargar el menú. Consulte en caja.
          </p>
        )}

        {!cargando && !error && (
          <div className="menu-grid">
            {/* PRIMERA COLUMNA (Izquierda) */}
            <div className="menu-col">
              <GrupoMenu
                titulo="Llevar"
                categoria="Llevar"
                platos={platos}
              />

              <GrupoMenu
                titulo="Platos de fondo"
                categoria="Platos de fondo"
                platos={platos}
              />

              <GrupoMenu
                titulo="Ensaladas"
                categoria="Ensaladas"
                platos={platos}
              />
            </div>

            {/* SEGUNDA COLUMNA (Derecha) */}
            <div className="menu-col">
              <GrupoMenu
                titulo="Parrilla tiempo de preparación 25 minutos aprox.."
                categoria="Parrilla"
                platos={platos}
              />

              <GrupoMenu
                titulo="Postres"
                categoria="Postres"
                platos={platos}
              />

              <GrupoMenu
                titulo="Colaciones"
                categoria="Colaciones"
                platos={platos}
              />
            </div>
          </div>
        
        )}
      </div>
    </section>
  );
}

export default Menu;