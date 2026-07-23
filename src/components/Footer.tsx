"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 py-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[100px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold tracking-widest text-white mb-6 md:mb-0"
        >
          FBA.
        </motion.div>

        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" data-hover>
            <FiGithub size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" data-hover>
            <FiLinkedin size={24} />
          </a>
          <a href="mailto:ansaryfahad950@gmail.com" className="text-gray-400 hover:text-white transition-colors" data-hover>
            <FiMail size={24} />
          </a>
        </div>

        <div className="text-gray-500 text-sm mt-6 md:mt-0">
          © {new Date().getFullYear()} Fahad Bin Ansari. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
