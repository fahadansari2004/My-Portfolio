"use client";

import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate submission
    setTimeout(() => {
      setFormState("success");
      setTimeout(() => setFormState("idle"), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen py-32 flex items-center justify-center z-10">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Let's Collaborate
          </motion.h2>
          <div className="w-24 h-1 bg-white/20 mx-auto rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12 rounded-3xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2 tracking-widest uppercase">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all placeholder:text-white/20"
                  placeholder="John Doe"
                  data-hover
                />
              </div>
              <div className="flex-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2 tracking-widest uppercase">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all placeholder:text-white/20"
                  placeholder="john@example.com"
                  data-hover
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 tracking-widest uppercase">Message</label>
              <textarea 
                id="message" 
                rows={5}
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all resize-none placeholder:text-white/20"
                placeholder="Tell me about your project..."
                data-hover
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full py-5 rounded-xl font-bold tracking-widest uppercase overflow-hidden group bg-white text-black mt-4 flex justify-center items-center gap-3"
              disabled={formState !== "idle"}
              data-hover
            >
              <div className="absolute inset-0 bg-gray-300 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              <span className="relative z-10 flex items-center gap-2">
                {formState === "idle" && <><FiSend size={18} /> Send Message</>}
                {formState === "submitting" && "Sending..."}
                {formState === "success" && "Message Sent!"}
              </span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
