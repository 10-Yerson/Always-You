import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import RecuerdosSection from './components/Recuerdossection';
import MetasSection from './components/Metassection';
import NavbarPublic from "./components/NavbarPublic";

export default function Home() {
  return (
    <>
      <NavbarPublic />
      <HomePage />
      <RecuerdosSection />
      <MetasSection />
      <Footer />
    </>
  );
}
