import { useState } from "react";
function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false);
  return (
    <header>
      <div className="header-container">
        <div className="logo-container">
          <img
            src="/images/logo2.png"
            alt="Logo María Elena"
          />
        </div>

        <div className="horario-texto">
          Horario de Atención 11:00 a 18:00 hrs
        </div>

        <button
        id="menu-toggle"
        className="mobile-menu-btn"
        type="button"
        aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuAbierto}
        aria-controls="nav-menu"
        onClick={() => setMenuAbierto(!menuAbierto)}
        >
        ☰
        </button>
<nav id="nav-menu" className={menuAbierto ? "active" : ""}>
  <ul>
    <li>
      <a href="#inicio" onClick={() => setMenuAbierto(false)}>
        Inicio
      </a>
    </li>

    <li>
      <a href="#menu" onClick={() => setMenuAbierto(false)}>
        Menú
      </a>
    </li>

    <li>
      <a href="#somos" onClick={() => setMenuAbierto(false)}>
        Somos
      </a>
    </li>

    <li>
      <a href="#contacto" onClick={() => setMenuAbierto(false)}>
        Contacto
      </a>
    </li>
  </ul>
</nav>
      </div>
    </header>
  );
}

export default Header;
