
function Somos() {
  return (
    <section id="somos" className="somos-section">
      <div className="somos-container somos-split">
        <div className="somos-text">
          <h2>Sobre Nosotros</h2>

          <p>
            En Maria Elena, preparamos comida 100% casera con los
            mejores ingredientes y la tradición de siempre.
            Nuestro menú cambia cada día para ofrecerte lo más fresco.
          </p>

          <a href="#menu" className="btn-secondary">
            Volver a la Carta
          </a>
        </div>

        <div className="somos-image">
          <img
            src="/images/papas_carne.png"
            alt="Platos caseros de Maria Elena"
            className="img-somos-decor"
          />
        </div>
      </div>
    </section>
  );
}

export default Somos;
