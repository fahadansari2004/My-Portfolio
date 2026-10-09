"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

interface Project {
  title: string;
  badge?: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
}

const projects: Project[] = [
  {
    title: "Event Management System",
    badge: "Live Project — 2026",
    description: "Engineered a comprehensive, full-stack live portal for an international event management company covering corporate events, weddings, and catering logistics with dynamic booking and inquiry flows for customer interaction.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Supabase"],
    link: "https://storiedinternational.in",
    github: "https://github.com/fahadansari2004"
  },
  {
    title: "Travel Management System",
    badge: "Live Project — 2026",
    description: "Developed an integrated booking solution enabling customers to reserve tour packages and flights. Built administrative control panels to track real-time seat availability and streamline reservation workflows.",
    tech: ["PHP", "JavaScript", "MySQL", "Bootstrap"],
    link: "https://travelpartnerktm.in",
    github: "https://github.com/fahadansari2004"
  },
  {
    title: "Restaurant Management System",
    badge: "2026",
    description: "Built a responsive web application to organize digital menus, monitor inventory items, and process customer food orders end-to-end with seamless order management.",
    tech: ["Angular", "TypeScript", "REST APIs", "CSS3"],
    link: "https://final-task-nest.vercel.app/",
    github: "https://github.com/fahadansari2004"
  },
  {
    title: "Student Management System",
    badge: "2026",
    description: "Created a digital platform to manage student data, academic records, and administrative workflows, improving institutional data accessibility, security, and reporting.",
    tech: ["Python", "Django", "SQLite", "Bootstrap"],
    link: "https://github.com/fahadansari2004",
    github: "https://github.com/fahadansari2004"
  }
];

function ProjectCard({ project, index }: { project: Project, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card p-8 rounded-3xl relative flex flex-col h-full group"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: "translateZ(1px)" }}
      />

      <div className="flex-1 relative z-10">
        {project.badge && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {project.badge}
            </span>
          </div>
        )}
        <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
        <p className="text-gray-400 mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t: string) => (
            <span key={t} className="px-3 py-1 text-xs uppercase tracking-widest border border-white/20 rounded-full text-gray-300">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-6 relative z-20">
        <a href={project.github} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white flex-shrink-0 relative" data-hover title="GitHub Repository">
          <FiGithub size={20} />
        </a>
        <a href={project.link} target={project.link !== "#" ? "_blank" : "_self"} rel="noopener noreferrer" className="flex items-center gap-2 p-3 px-4 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white" data-hover>
          <FiExternalLink size={20} />
          {project.link !== "#" && (
            <span className="text-sm tracking-wide truncate max-w-[150px] md:max-w-[200px]">
              {project.link.replace(/^https?:\/\//, '')}
            </span>
          )}
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative w-full min-h-screen py-32 overflow-hidden z-10 perspective-[1000px]">
      <div className="container mx-auto px-6 relative z-10">

        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Featured Projects
          </motion.h2>
          <div className="w-24 h-1 bg-white/20 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
