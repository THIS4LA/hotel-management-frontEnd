import Footer from "../../components/footer";
import Header from "../../components/header";
import About from "./about";
import Contact from "./contact";
import Hero from "./hero";
import Rooms from "./rooms";

export default function Home() {
  return (
    <>
      <Hero />
      <About/>
      <Rooms/>
      <Contact />
    </>
  );
}
