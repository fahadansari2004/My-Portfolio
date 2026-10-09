"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Education", "Contact"];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-[5000] px-6 py-4 flex justify-between items-center"
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md border-b border-white/10" />

      <div className="relative z-10 text-xl font-bold tracking-widest text-white cursor-pointer" data-hover>
        FBA.online
      </div>

      <div className="relative z-10 hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm uppercase tracking-widest text-gray-300 hover:text-white transition-colors relative group"
            data-hover
            onClick={() => setActiveSection(item.toLowerCase())}
          >
            {item}
            {activeSection === item.toLowerCase() && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 h-[1px] bg-white bottom-[-4px]"
              />
            )}
            <div className="absolute left-0 right-0 h-[1px] bg-white/50 bottom-[-4px] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>
        ))}
      </div>

      <div className="relative z-10 md:hidden text-white cursor-pointer" data-hover>
        {/* Mobile menu icon placeholder */}
        <div className="space-y-1.5">
          <div className="w-6 h-[2px] bg-white"></div>
          <div className="w-6 h-[2px] bg-white"></div>
        </div>
      </div>
    </motion.nav>
  );
}
