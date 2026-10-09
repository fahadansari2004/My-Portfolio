"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillItem {
  name: string;
  category: "Languages" | "Frameworks & UI" | "Databases" | "Tools & Practices";
}

const skillsList: SkillItem[] = [
  // Languages
  { name: "Python", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "PHP", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "C / C++", category: "Languages" },
  { name: "SQL", category: "Languages" },
  { name: "HTML5", category: "Languages" },
  { name: "CSS3", category: "Languages" },

  // Frameworks & UI
  { name: "Django", category: "Frameworks & UI" },
  { name: "Angular", category: "Frameworks & UI" },
  { name: "React", category: "Frameworks & UI" },
  { name: "Next.js", category: "Frameworks & UI" },
  { name: "Bootstrap", category: "Frameworks & UI" },
  { name: "Responsive Design", category: "Frameworks & UI" },

  // Databases
  { name: "MySQL", category: "Databases" },
  { name: "MongoDB", category: "Databases" },
  { name: "Supabase", category: "Databases" },
  { name: "SQLite", category: "Databases" },

  // Tools & Practices
  { name: "RESTful APIs", category: "Tools & Practices" },
  { name: "Git & GitHub", category: "Tools & Practices" },
  { name: "UI/UX Design", category: "Tools & Practices" },
  { name: "Postman", category: "Tools & Practices" },
  { name: "VS Code & PyCharm", category: "Tools & Practices" },
  { name: "Vercel", category: "Tools & Practices" },
  { name: "Agile Development", category: "Tools & Practices" },
];

const categories = ["All", "Languages", "Frameworks & UI", "Databases", "Tools & Practices"] as const;

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredSkills = activeCategory === "All"
    ? skillsList
    : skillsList.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative w-full min-h-screen flex items-center justify-center py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Technical Arsenal
          </motion.h2>
          <div className="w-24 h-1 bg-white/20 mx-auto rounded-full mb-8" />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all relative ${
                  activeCategory === category
                    ? "text-black font-semibold bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    : "text-gray-400 hover:text-white glass"
                }`}
                data-hover
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="flex flex-wrap justify-center gap-4 md:gap-5 max-w-5xl mx-auto"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, i) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.35, 
                  delay: i * 0.02,
                  type: "spring",
                  stiffness: 120 
                }}
                whileHover={{ 
                  scale: 1.08, 
                  boxShadow: "0 0 30px rgba(255,255,255,0.3)"
                }}
                className="glass px-6 py-3.5 rounded-2xl flex items-center justify-between gap-3 relative overflow-hidden group cursor-pointer border border-white/10 hover:border-white/30"
                data-hover
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                
                <span className="text-base md:text-lg font-medium text-gray-200 group-hover:text-white transition-colors relative z-10">
                  {skill.name}
                </span>

                <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 group-hover:text-white/70 relative z-10">
                  {skill.category.split(" ")[0]}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
