"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <motion.div 
            style={{ y }}
            className="w-full md:w-1/2"
          >
            <div className="relative glass-card p-12 rounded-3xl border border-white/10 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                About Fahad Bin Ansari
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I am Fahad Bin Ansari, a Full Stack Web Developer and Software Engineer with hands-on experience developing responsive web applications and backend systems using Python (Django), PHP, JavaScript, Angular, HTML5, and CSS.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I specialize in architecting scalable database structures (MySQL, MongoDB, SQLite, Supabase), engineering RESTful APIs, and crafting clean, accessible UI/UX interfaces. I have delivered production-grade platforms for event logistics, travel booking, and administrative management.
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                Ranked among the <span className="text-white font-semibold">Top 75 teams out of 1,500+</span> in the AICTE South India Idea Pitching Competition, with active participation in premier hackathons including the NASA International Space Apps Challenge and Smart India Hackathon.
              </p>
            </div>
          </motion.div>

          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-8 rounded-3xl relative overflow-hidden group"
            >
              <div className="flex items-baseline gap-2">
                <h3 className="text-6xl font-bold text-white mb-2">Top 75</h3>
                <span className="text-emerald-400 text-sm font-mono font-medium">/ 1,500+</span>
              </div>
              <p className="text-gray-300 font-medium">AICTE IDE Bootcamp</p>
              <p className="text-gray-500 uppercase tracking-widest text-xs mt-1">National Innovation Pitching</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass p-8 rounded-3xl relative overflow-hidden group"
            >
              <h3 className="text-6xl font-bold text-white mb-2">10+</h3>
              <p className="text-gray-300 font-medium">Projects & Systems Delivered</p>
              <p className="text-gray-500 uppercase tracking-widest text-xs mt-1">Full-Stack & Client Live Portals</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass p-8 rounded-3xl relative overflow-hidden group"
            >
              <h3 className="text-6xl font-bold text-white mb-2">4+</h3>
              <p className="text-gray-300 font-medium">National & Global Hackathons</p>
              <p className="text-gray-500 uppercase tracking-widest text-xs mt-1">NASA Space Apps • SIH • YIP</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
