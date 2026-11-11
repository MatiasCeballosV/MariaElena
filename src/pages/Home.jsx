import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import Menu from "../components/Menu.jsx";
import SobreNosotros from "../components/SobreNosotros.jsx";
import Contacto from "../components/Contacto.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Menu />
      <SobreNosotros />
      <Contacto />

      <WhatsAppButton />
    </>
  );
}

export default Home;