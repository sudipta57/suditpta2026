import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[680px] px-6 pb-16">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
