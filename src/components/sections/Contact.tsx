"use client";

import { motion } from "framer-motion";
import { FiSend, FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiGlobe, FiCheckCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Format professional WhatsApp message
    const formattedMessage = [
      `*New Inquiry from Portfolio Website*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Name:* ${formData.name}`,
      `📧 *Email:* ${formData.email}`,
      formData.subject ? `📌 *Subject:* ${formData.subject}` : null,
      `💬 *Message:*`,
      `${formData.message}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `🌐 _Sent via fahadansari.online_`
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/917591920678?text=${encodeURIComponent(formattedMessage)}`;

    setTimeout(() => {
      // Redirect to WhatsApp in a new tab
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setFormState("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormState("idle"), 4000);
    }, 600);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen py-32 flex items-center justify-center z-10">
      <div className="container mx-auto px-6 max-w-5xl">
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          {/* Direct Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 flex flex-col justify-between gap-4"
          >
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Have an opportunity, project idea, or question? Feel free to reach out directly through WhatsApp, email, or phone.
                </p>

                <div className="space-y-3.5">
                  <a
                    href="https://wa.me/917591920678?text=Hello%20Fahad,%20I%20am%20reaching%20out%20from%20your%20portfolio!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all group"
                    data-hover
                  >
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-black transition-colors">
                      <FaWhatsapp size={19} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs uppercase font-mono tracking-wider text-emerald-400">WhatsApp</div>
                      <div className="text-sm font-medium text-white truncate">+91 75919 20678</div>
                    </div>
                  </a>

                  <a
                    href="mailto:ansaryfahad950@gmail.com"
                    className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                    data-hover
                  >
                    <div className="p-2.5 rounded-xl bg-white/10 text-emerald-400 group-hover:bg-white group-hover:text-black transition-colors">
                      <FiMail size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs uppercase font-mono tracking-wider text-gray-400">Email</div>
                      <div className="text-sm font-medium text-white truncate">ansaryfahad950@gmail.com</div>
                    </div>
                  </a>

                  <a
                    href="tel:+917591920678"
                    className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                    data-hover
                  >
                    <div className="p-2.5 rounded-xl bg-white/10 text-emerald-400 group-hover:bg-white group-hover:text-black transition-colors">
                      <FiPhone size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs uppercase font-mono tracking-wider text-gray-400">Phone</div>
                      <div className="text-sm font-medium text-white truncate">+91 75919 20678</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="p-2.5 rounded-xl bg-white/10 text-emerald-400">
                      <FiMapPin size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs uppercase font-mono tracking-wider text-gray-400">Location</div>
                      <div className="text-sm font-medium text-white">Kangazha, Kottayam, Kerala, India</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-around gap-2">
                <a
                  href="https://linkedin.com/in/fahad-bin-ansari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-all border border-white/10"
                  data-hover
                  title="LinkedIn"
                >
                  <FiLinkedin size={20} />
                </a>
                <a
                  href="https://github.com/fahadansari2004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-all border border-white/10"
                  data-hover
                  title="GitHub"
                >
                  <FiGithub size={20} />
                </a>
                <a
                  href="https://fahadansari.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-all border border-white/10"
                  data-hover
                  title="Portfolio Website"
                >
                  <FiGlobe size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 glass-card p-8 md:p-10 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Send a Direct Message</h3>
                  <p className="text-xs text-gray-400 mt-1">Form inputs are instantly formatted and forwarded to WhatsApp</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                  <FaWhatsapp size={14} />
                  <span>Direct Connect</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex-1">
                    <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-2 tracking-widest uppercase">Your Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500/60 focus:bg-black/60 transition-all placeholder:text-white/20 text-sm"
                      placeholder="e.g. Rahul Sharma"
                      data-hover
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-2 tracking-widest uppercase">Your Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500/60 focus:bg-black/60 transition-all placeholder:text-white/20 text-sm"
                      placeholder="e.g. rahul@example.com"
                      data-hover
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-gray-400 mb-2 tracking-widest uppercase">Subject (Optional)</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500/60 focus:bg-black/60 transition-all placeholder:text-white/20 text-sm"
                    placeholder="Project Inquiry / Job Opportunity"
                    data-hover
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-400 mb-2 tracking-widest uppercase">Your Message *</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500/60 focus:bg-black/60 transition-all resize-none placeholder:text-white/20 text-sm"
                    placeholder="Describe your project, role, or questions in detail..."
                    data-hover
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="relative w-full py-4 rounded-xl font-bold tracking-widest uppercase overflow-hidden group bg-gradient-to-r from-emerald-500 to-green-600 text-white mt-1 flex justify-center items-center gap-2.5 shadow-[0_4px_25px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_35px_rgba(16,185,129,0.5)] transition-all cursor-pointer"
                  disabled={formState !== "idle"}
                  data-hover
                >
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  <span className="relative z-10 flex items-center gap-2 text-sm">
                    {formState === "idle" && (
                      <>
                        <FaWhatsapp size={18} />
                        <span>Send via WhatsApp</span>
                      </>
                    )}
                    {formState === "submitting" && (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Opening WhatsApp...</span>
                      </>
                    )}
                    {formState === "success" && (
                      <>
                        <FiCheckCircle size={18} />
                        <span>Redirected to WhatsApp!</span>
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>

            <p className="text-[11px] text-gray-500 text-center mt-4">
              🔒 Submitting automatically opens WhatsApp Web / Mobile with your formatted message ready to send.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
