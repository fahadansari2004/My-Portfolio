"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  track: string;
  skills: string[];
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "NeST Digital Pvt Ltd",
    role: "Web Developer Intern",
    period: "May 2026 – July 2026",
    track: "Full Stack Web Development & UI/UX",
    skills: ["Angular", "TypeScript", "Modern CSS", "UI/UX", "Backend Optimization", "Database Management"],
    description: [
      "Developed responsive front-end modules in Angular, replacing static components with dynamic, reusable UI elements.",
      "Collaborated with senior developers and mentors on full-stack feature delivery, translating UI/UX wireframes into functional modules.",
      "Supported backend workflow optimization and database administration for live client web applications."
    ]
  },
  {
    company: "Illford Digital",
    role: "Web Developer Intern",
    period: "June 2025 – July 2025",
    track: "UI/UX & Web Development",
    skills: ["JavaScript", "HTML5", "CSS3", "Relational Databases", "UI/UX Redesign", "Query Tuning"],
    description: [
      "Constructed responsive client-facing web pages utilizing JavaScript, HTML5, and modern CSS paradigms across client engagements.",
      "Contributed to UI/UX redesign workflows, significantly improving layout consistency, visual hierarchy, and cross-device usability.",
      "Assisted with backend workflow optimization, relational database query tuning, and administrative tasks."
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
                  <h4 className="text-lg text-emerald-400 font-medium mb-1">{exp.company}</h4>
                  <div className="text-xs uppercase tracking-wider text-gray-400 mb-6 font-mono">{exp.track}</div>
                  
                  <ul className={`space-y-3 text-gray-300 text-sm md:text-base mb-6 ${index % 2 === 0 ? 'md:pl-0' : 'md:pr-0 inline-block text-left'}`}>
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-white/40 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`flex flex-wrap gap-2 pt-4 border-t border-white/10 ${index % 2 === 0 ? 'justify-start' : 'md:justify-end justify-start'}`}>
                    {exp.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 text-xs border border-white/10 rounded-full text-gray-300 bg-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
