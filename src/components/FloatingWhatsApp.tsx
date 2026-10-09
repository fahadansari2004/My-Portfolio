"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "917591920678";
  const defaultMessage = encodeURIComponent("Hello Fahad! I visited your portfolio and would like to connect.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside aria-label="WhatsApp Quick Contact" className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[4900]">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center group cursor-pointer"
        data-hover
        aria-label="Chat with Fahad on WhatsApp"
      >
        {/* Pulsing ring aura */}
        <span className="absolute -inset-1.5 rounded-full bg-emerald-500/30 animate-ping pointer-events-none opacity-75" />

        {/* Floating tooltip label */}
        <motion.div
          initial={{ opacity: 0, x: 10, scale: 0.9 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : 10,
            scale: isHovered ? 1 : 0.9,
          }}
          transition={{ duration: 0.2 }}
          className="absolute right-16 pointer-events-none hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)] text-xs font-medium text-white whitespace-nowrap"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Chat on WhatsApp</span>
        </motion.div>

        {/* WhatsApp Icon Button */}
        <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] border border-white/20 transition-all duration-300 group-hover:shadow-[0_12px_40px_rgba(37,211,102,0.65)]">
          <FaWhatsapp size={30} className="md:w-8 md:h-8 drop-shadow-md" />
        </div>
      </motion.a>
    </aside>
  );
}
