import Backdrop from '@/components/three/Backdrop';
import Grain from '@/components/ui/Grain';
import Cursor from '@/components/ui/Cursor';
import SmoothScroll from '@/components/ui/SmoothScroll';
import ScrollProgress from '@/components/ui/ScrollProgress';
import MotionProvider from '@/components/ui/MotionProvider';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Pipeline from '@/components/sections/Pipeline';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <MotionProvider>
      {/* Ambient layers */}
      <Backdrop />
      <Grain />
      <Cursor />
      <SmoothScroll />
      <ScrollProgress />

      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-lg focus:bg-void-800 focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <Navigation />

      <main className="relative">
        <Hero />
        <About />
        <Pipeline />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </MotionProvider>
  );
}
