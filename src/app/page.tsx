import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import ProductGallery from "@/components/ProductGallery";
import Brands from "@/components/Brands";
import Vision from "@/components/Vision";
import Franchise from "@/components/Franchise";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <About />
        <ProductGallery />
        <Brands />
        <Vision />
        <Franchise />
      </main>
      <Footer />
    </>
  );
}
