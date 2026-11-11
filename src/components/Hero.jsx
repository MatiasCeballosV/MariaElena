
function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-container">
        <div className="hero-left">
          <img 
            src="/images/logoPorFin.png" 
            alt="Logo Restaurant María Elena" 
            className="logo-hero logo-flotante" 
          />
        </div>

        <div className="hero-right">
          <h1>
            MARIA<br />
            <span>ELENA</span>
          </h1>

          <p className="subtitle">COMIDA CASERA</p>

          <a href="#menu" className="btn-primary">
            Ver Menú
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
