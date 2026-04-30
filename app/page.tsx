import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Education from "../components/Education";
import Achievements from "../components/Achievements";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[680px] px-6 pb-24">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
