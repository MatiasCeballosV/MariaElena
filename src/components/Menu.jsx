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
            <div className="menu-col">
              <GrupoMenu
                titulo="Entradas"
                categoria="Entradas"
                platos={platos}
              />

              <GrupoMenu
                titulo="Platos Principales"
                categoria="Platos Principales"
                platos={platos}
              />
            </div>

            <div className="menu-col">
              <GrupoMenu
                titulo="Acompañamiento"
                categoria="Acompañamiento"
                platos={platos}
              />

              <GrupoMenu
                titulo="Cafetería"
                categoria="Cafeteria"
                platos={platos}
              />

              <GrupoMenu
                titulo="Pastelería"
                categoria="Pasteleria"
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