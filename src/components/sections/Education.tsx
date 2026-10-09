"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiBookOpen, FiPhone, FiCheckCircle } from "react-icons/fi";

interface EducationItem {
  degree: string;
  institution: string;
  university: string;
  year: string;
  score: string;
  status?: string;
  details?: string;
}

const educationList: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Saintgits College of Engineering, Kottayam",
    university: "APJ Abdul Kalam Technological University, Kerala",
    year: "2025 – Present",
    score: "7.64 CGPA",
    status: "Pursuing",
    details: "Advanced software engineering, distributed systems, modern web architectures, and algorithms."
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "MES College, Erumely",
    university: "Mahatma Gandhi University, Kerala",
    year: "2022 – 2025",
    score: "5.15 CGPA",
    details: "Foundational computer science, database systems, object-oriented programming, and web development."
  },
  {
    degree: "Higher Secondary Certificate (+2 Science)",
    institution: "Muslim Higher Secondary School, Kangazha",
    university: "Board of Higher Secondary Examinations, Kerala",
    year: "2020 – 2022",
    score: "74.75% (897/1200)",
    details: "Science stream curriculum with Mathematics, Physics, and Chemistry."
  },
  {
    degree: "Secondary School Leaving Certificate (SSLC - 10th)",
    institution: "Muslim Higher Secondary School, Kangazha",
    university: "General Education Department, Kerala",
    year: "2020",
    score: "84%",
    details: "High school completion with distinguished academic standing."
  }
];

const achievements = [
  {
    title: "IDE Bootcamp (AICTE) — Top 75 Finalist",
    year: "2024",
    issuer: "AICTE / Ministry of Education",
    description: "Ranked among the Top 75 teams out of 1,500+ innovative ventures across South India Idea Pitching Competition."
  },
  {
    title: "Brototype Intensive Python Django Bootcamp",
    year: "2026",
    issuer: "Brototype",
    description: "Completed intensive industrial training in Python Django backend engineering, relational schema design, and production architecture."
  },
  {
    title: "National & Global Hackathons",
    year: "2025 – 2026",
    issuer: "NASA / SIH / YIP",
    description: "Active contender in NASA International Space Apps Challenge, Smart India Hackathon (SIH), and Youth Innovation Program (YIP)."
  }
];

const certifications = [
  {
    name: "Master Docker & Kubernetes",
    issuer: "Udemy",
    year: "2026",
    category: "DevOps & Containers"
  },
  {
    name: "AI in Digital Marketing",
    issuer: "NPTEL",
    year: "2026",
    category: "Artificial Intelligence"
  },
  {
    name: "Managing Human Resource",
    issuer: "NPTEL",
    year: "2026",
    category: "Management & Leadership"
  },
  {
    name: "Low-Code & No-Code Mastery",
    issuer: "Udemy",
    year: "2026",
    category: "Rapid Prototyping"
  }
];

export default function Education() {
  const [activeTab, setActiveTab] = useState<"education" | "certifications">("education");

  return (
    <section id="education" className="relative w-full min-h-screen py-32 z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Education & Honors
          </motion.h2>
          <div className="w-24 h-1 bg-white/20 mx-auto rounded-full mb-8" />

          {/* Tab buttons */}
          <div className="inline-flex p-1.5 rounded-full glass border border-white/10">
            <button
              onClick={() => setActiveTab("education")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === "education"
                  ? "bg-white text-black shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
              data-hover
            >
              <FiBookOpen size={16} />
              <span>Academic Qualifications</span>
            </button>
            <button
              onClick={() => setActiveTab("certifications")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === "certifications"
                  ? "bg-white text-black shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
              data-hover
            >
              <FiAward size={16} />
              <span>Achievements & Certs</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "education" ? (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {educationList.map((edu, idx) => (
                <div
                  key={idx}
                  className="glass-card p-8 rounded-3xl relative overflow-hidden group border border-white/10 flex flex-col justify-between"
                  data-hover
                >
                  <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity">
                    <FiBookOpen size={80} />
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-white/50">
                        {edu.year}
                      </span>
                      {edu.status && (
                        <span className="px-2.5 py-0.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                          {edu.status}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {edu.degree}
                    </h3>

                    <h4 className="text-base text-gray-300 font-medium mb-1">
                      {edu.institution}
                    </h4>

                    <p className="text-xs text-gray-400 font-mono mb-4">
                      {edu.university}
                    </p>

                    {edu.details && (
                      <p className="text-sm text-gray-400 leading-relaxed mb-6">
                        {edu.details}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-gray-400">Score / CGPA</span>
                    <span className="text-base font-bold text-white font-mono bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                      {edu.score}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {/* Achievements Grid */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FiAward className="text-emerald-400" /> Key Honors & Hackathons
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {achievements.map((item, i) => (
                    <div
                      key={i}
                      className="glass-card p-6 rounded-3xl border border-white/10 relative group"
                      data-hover
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                        <span>{item.issuer}</span>
                        <span>{item.year}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications Grid */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-400" /> Professional Certifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {certifications.map((cert, i) => (
                    <div
                      key={i}
                      className="glass p-5 rounded-2xl border border-white/10 hover:border-white/30 transition-all group"
                      data-hover
                    >
                      <div className="text-[11px] font-mono uppercase tracking-wider text-white/50 mb-1">
                        {cert.issuer} • {cert.year}
                      </div>
                      <h4 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors mb-2">
                        {cert.name}
                      </h4>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                        {cert.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Reference Card */}
              <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 max-w-2xl mx-auto">
                <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2">
                  Academic Reference
                </div>
                <h4 className="text-xl font-bold text-white mb-1">Dr. Rani Saritha R</h4>
                <p className="text-sm text-gray-300 mb-1">
                  Head of Department (Computer Applications)
                </p>
                <p className="text-xs text-gray-400 font-mono mb-4">
                  Saintgits College of Engineering, Kottayam
                </p>
                <a
                  href="tel:+919946353850"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm transition-colors"
                  data-hover
                >
                  <FiPhone size={14} />
                  <span>+91 9946353850</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
