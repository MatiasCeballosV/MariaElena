import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import SobreNosotros from "../components/SobreNosotros.jsx";
import Contacto from "../components/Contacto.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import CartaSelector from "../components/CartaSelector.jsx";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <CartaSelector />
      <SobreNosotros />
      <Contacto />

      <WhatsAppButton />
    </>
  );
}

export default Home;