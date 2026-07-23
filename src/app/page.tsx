"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundScene from "@/components/canvas/BackgroundScene";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <>
          <BackgroundScene />
          <Navbar />
          
          <div className="relative z-10 flex flex-col items-center w-full">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </div>
          
          <Footer />
        </>
      )}
    </main>
  );
}
