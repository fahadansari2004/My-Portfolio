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
                Behind the Code
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Versatile Full-Stack Developer proficient in both front-end and back-end development, with hands-on experience using Python (Django) and PHP to build scalable web applications.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Adept at designing responsive UI/UX interfaces and managing relational and NoSQL databases like MySQL and MongoDB. Proven ability to handle complex problem-solving in fast-paced environments, underscored by recognized excellence in innovation hackathons.
              </p>
            </div>
          </motion.div>

          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-8 rounded-3xl"
            >
              <h3 className="text-6xl font-bold text-white mb-2">2+</h3>
              <p className="text-gray-400 uppercase tracking-widest text-sm">Years Coding</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass p-8 rounded-3xl"
            >
              <h3 className="text-6xl font-bold text-white mb-2">10+</h3>
              <p className="text-gray-400 uppercase tracking-widest text-sm">Projects Completed</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass p-8 rounded-3xl"
            >
              <h3 className="text-6xl font-bold text-white mb-2">4</h3>
              <p className="text-gray-400 uppercase tracking-widest text-sm">Hackathons Attended</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
