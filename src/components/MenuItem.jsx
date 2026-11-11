function MenuItem({ plato }) {
  return (
    <div className="menu-item">

      <div className="menu-item-info">
        <span className="menu-item-name">
          {plato.nombre}
        </span>

        {plato.descripcion && (
          <p className="menu-item-description">
            {plato.descripcion}
          </p>
        )}
      </div>

      <span className="price">
        {plato.precio}
      </span>

    </div>
  );
}

export default MenuItem;