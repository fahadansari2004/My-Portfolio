"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 py-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[100px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-start"
        >
          <span className="text-2xl font-bold tracking-widest text-white">FBA.</span>
          <span className="text-xs text-gray-400 font-mono mt-1">Full Stack Web Developer • Kottayam, Kerala</span>
        </motion.div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/fahadansari2004"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            data-hover
            title="GitHub (fahadansari2004)"
          >
            <FiGithub size={22} />
          </a>
          <a
            href="https://linkedin.com/in/fahad-bin-ansari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            data-hover
            title="LinkedIn (fahad-bin-ansari)"
          >
            <FiLinkedin size={22} />
          </a>
          <a
            href="mailto:ansaryfahad950@gmail.com"
            className="text-gray-400 hover:text-white transition-colors"
            data-hover
            title="Email (ansaryfahad950@gmail.com)"
          >
            <FiMail size={22} />
          </a>
          <a
            href="tel:+917591920678"
            className="text-gray-400 hover:text-white transition-colors"
            data-hover
            title="Phone (+91 75919 20678)"
          >
            <FiPhone size={22} />
          </a>
        </div>

        <div className="text-gray-500 text-sm text-center md:text-right">
          <div>© {new Date().getFullYear()} Fahad Bin Ansari. All rights reserved.</div>
          <div className="text-xs text-gray-600 mt-0.5">fahadansari.online</div>
        </div>
      </div>
    </footer>
  );
}
