"use client";

import { motion } from "framer-motion";

const skills = [
  "Python", "PHP", "JavaScript", "HTML5", "CSS", "Java", "C/C++",
  "Django", "Bootstrap", "Next.js", "React", "MySQL", "MongoDB", "SQLite"
];

export default function Skills() {
  return (
    <section id="skills" className="relative w-full min-h-screen flex items-center justify-center py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Technical Arsenal
          </motion.h2>
          <div className="w-24 h-1 bg-white/20 mx-auto rounded-full" />
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.05,
                type: "spring",
                stiffness: 100 
              }}
              whileHover={{ 
                scale: 1.1, 
                rotate: Math.random() * 10 - 5,
                boxShadow: "0 0 30px rgba(255,255,255,0.4)"
              }}
              className="glass px-8 py-4 rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer"
              data-hover
            >
              {/* Particles on hover placeholder */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              
              <span className="text-xl font-medium text-gray-200 group-hover:text-white transition-colors relative z-10">
                {skill}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
