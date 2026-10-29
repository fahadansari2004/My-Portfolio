"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiExternalLink, FiGithub, FiShield, FiDatabase, FiCpu, FiCheckCircle, FiMail, FiCalendar, FiCheckSquare, FiMessageSquare } from "react-icons/fi";
import { SiTelegram } from "react-icons/si";

interface WorkerInfo {
  icon: "mail" | "calendar" | "notion" | "slack";
  name: string;
  tech: string;
  desc: string;
}

interface HighlightInfo {
  title: string;
  desc: string;
}

interface Project {
  title: string;
  badge?: string;
  featured?: boolean;
  description: string;
  tech: string[];
  link: string;
  github: string;
  workers?: WorkerInfo[];
  highlights?: HighlightInfo[];
}

const projects: Project[] = [
  {
    title: "Synapse — Multi-Agent Personal Assistant",
    badge: "Autonomous Multi-Agent AI — 2026",
    featured: true,
    description: "An autonomous multi-agent personal assistant on Telegram built with Python 3.12, LangGraph, and FastAPI based on a hierarchical supervisor-worker architecture. A central Manager agent interprets complex natural language directives, decomposes tasks, and coordinates 4 domain workers to execute real-world workflows seamlessly.",
    tech: ["Python 3.12", "LangGraph", "FastAPI", "LangChain", "SQLite", "Docker", "Telegram Bot API"],
    link: "https://github.com/fahadansari2004",
    github: "https://github.com/fahadansari2004",
    workers: [
      {
        icon: "mail",
        name: "Gmail / SMTP Worker",
        tech: "Google People API",
        desc: "Reads threads, resolves contact details, drafts and dispatches emails."
      },
      {
        icon: "calendar",
        name: "Calendar Worker",
        tech: "Google Calendar API v3",
        desc: "Manages schedule availability, tracks conflicts, and creates events."
      },
      {
        icon: "notion",
        name: "Notion Worker",
        tech: "Notion Async API",
        desc: "Manages databases, updates task boards, and monitors deadlines."
      },
      {
        icon: "slack",
        name: "Slack Worker",
        tech: "Slack Web API",
        desc: "Interacts with public/private channels and direct messages."
      }
    ],
    highlights: [
      {
        title: "Human-in-the-Loop (HITL) Safety",
        desc: "Gated destructive actions (sending emails/messages) behind Telegram confirmation prompts."
      },
      {
        title: "State Persistence",
        desc: "Keyed conversation checkpoints to Telegram chat IDs using LangGraph's AsyncSqliteSaver."
      },
      {
        title: "FastAPI Async Webhook",
        desc: "Engineered with secret token authentication, idempotency deduplication, and rate limiting."
      },
      {
        title: "140+ Tests & Dockerized",
        desc: "Backed by 140+ unit/integration tests with 81% test coverage and Docker containerization."
      }
    ]
  },
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

function WorkerIcon({ icon }: { icon: WorkerInfo["icon"] }) {
  switch (icon) {
    case "mail":
      return <FiMail className="text-blue-400" size={16} />;
    case "calendar":
      return <FiCalendar className="text-amber-400" size={16} />;
    case "notion":
      return <FiCheckSquare className="text-purple-400" size={16} />;
    case "slack":
      return <FiMessageSquare className="text-emerald-400" size={16} />;
  }
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Softer tilt for large featured card to prevent disorienting perspective
  const tiltDeg = project.featured ? 6 : 15;
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${tiltDeg}deg`, `-${tiltDeg}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${tiltDeg}deg`, `${tiltDeg}deg`]);

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
      className={`glass-card p-6 md:p-8 rounded-3xl relative flex flex-col h-full group ${
        project.featured 
          ? "md:col-span-2 border-emerald-500/30 hover:border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.08)]" 
          : "border-white/10"
      }`}
    >
      <div
        className={`absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          project.featured 
            ? "bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent" 
            : "bg-gradient-to-br from-white/10 to-transparent"
        }`}
        style={{ transform: "translateZ(1px)" }}
      />

      <div className="flex-1 relative z-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {project.badge && (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${
              project.featured 
                ? "text-emerald-300 bg-emerald-500/15 border border-emerald-500/30" 
                : "text-emerald-300 bg-emerald-500/10 border border-emerald-500/20"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {project.badge}
            </span>
          )}
          {project.featured && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
              <SiTelegram size={12} className="text-cyan-400" />
              Telegram Multi-Agent
            </span>
          )}
        </div>

        <h3 className={`font-bold text-white mb-4 ${project.featured ? "text-2xl md:text-3xl lg:text-4xl" : "text-2xl"}`}>
          {project.title}
        </h3>

        <p className={`text-gray-300 leading-relaxed mb-6 ${project.featured ? "text-base md:text-lg" : "text-gray-400 line-clamp-3 group-hover:line-clamp-none transition-all duration-300"}`}>
          {project.description}
        </p>

        {/* 4 Domain Workers breakdown for featured multi-agent project */}
        {project.workers && project.workers.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FiCpu className="text-emerald-400" size={16} />
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                Hierarchical Supervisor & Domain Workers
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {project.workers.map((worker) => (
                <div
                  key={worker.name}
                  className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-emerald-500/30 rounded-2xl p-3.5 transition-colors duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <WorkerIcon icon={worker.icon} />
                      <span className="text-sm font-semibold text-white truncate">{worker.name}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{worker.desc}</p>
                  </div>
                  <span className="mt-2.5 text-[10px] font-mono tracking-wider uppercase text-white/50 block">
                    {worker.tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Highlights for featured project */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FiShield className="text-cyan-400" size={16} />
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                Architecture & Engineering Highlights
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-3.5"
                >
                  <FiCheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5" size={16} />
                  <div>
                    <h4 className="text-sm font-medium text-white mb-0.5">{h.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t: string) => (
            <span
              key={t}
              className={`px-3 py-1 text-xs uppercase tracking-widest rounded-full transition-colors ${
                project.featured
                  ? "border border-emerald-500/20 bg-emerald-500/5 text-emerald-200"
                  : "border border-white/20 text-gray-300"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-6 relative z-20">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white flex-shrink-0 relative"
          data-hover
          title="GitHub Repository"
        >
          <FiGithub size={20} />
        </a>
        <a
          href={project.link}
          target={project.link !== "#" ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-3 px-4 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white"
          data-hover
        >
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

