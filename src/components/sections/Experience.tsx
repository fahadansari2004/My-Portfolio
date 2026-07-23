"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "NeST Digital",
    role: "Web Developer Intern",
    period: "May 2026 – July 2026",
    description: [
      "Collaborated on UI/UX and full-stack development of web solutions.",
      "Implemented responsive front-end components using Angular.",
      "Assisted in optimizing backend workflows and database management tasks."
    ]
  },
  {
    company: "Illford Digital",
    role: "Web Developer Intern",
    period: "June 2025 – July 2025",
    description: [
      "Collaborated on UI/UX redesigns and full-stack development of web solutions.",
      "Implemented responsive front-end components using JavaScript and modern CSS.",
      "Assisted in optimizing backend workflows and database management tasks."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="relative w-full min-h-screen py-32 z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Experience
          </motion.h2>
          <div className="w-24 h-1 bg-white/20 mx-auto rounded-full" />
        </div>

        <div className="relative border-l border-white/20 pl-8 md:pl-0 md:border-none">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20 -translate-x-1/2" />
          
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`relative mb-16 md:mb-24 flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Dot */}
              <div className="absolute left-[-37px] top-1 md:left-1/2 md:-translate-x-1/2 md:top-8 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10" />
              
              <div className="w-full md:w-1/2 md:px-12">
                <div className={`glass-card p-8 rounded-3xl relative group ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="text-white/50 text-sm font-mono tracking-widest mb-2">{exp.period}</div>
                  <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                  <h4 className="text-lg text-gray-400 mb-6">{exp.company}</h4>
                  
                  <ul className={`space-y-3 text-gray-300 text-sm md:text-base ${index % 2 === 0 ? 'md:pl-0' : 'md:pr-0 inline-block text-left'}`}>
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-white/40 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
