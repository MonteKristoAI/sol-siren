"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, MapPin, Check } from "lucide-react";

const VALID_COLOR = "#5a7d5a"; // muted sage green

const validators: Record<string, { test: (v: string) => boolean; msg: string }> = {
  name: { test: (v) => v.trim().length >= 2, msg: "Nice to meet you." },
  email: { test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: "We'll contact you soon." },
};

const INQUIRY_TYPES = ["General", "Order", "Sizing", "Shipping", "Collaboration", "Similar Piece"];

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState<Record<string, string>>({ type: "General" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name || "",
          email: values.email || "",
          subject: values.subject || "",
          message: values.message || "",
          type: values.type || "General",
          company: values.company || "", // honeypot
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(j.error || "Something went wrong. Please email solsirenvintage@gmail.com.");
        setSending(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please email solsirenvintage@gmail.com.");
      setSending(false);
    }
  };

  const isValid = (name: string) => validators[name]?.test(values[name] || "") ?? false;

  return (
    <section id="contact" className="relative bg-background py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[18vw] font-light text-foreground/[0.03] uppercase tracking-wide">
          Contact
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
        {/* Left – Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <p className="font-body text-[10px] tracking-ultra-wide uppercase text-muted-foreground mb-4">
            Contact
          </p>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
            Let's Connect.
          </h2>

          <p className="mt-6 font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
            When something feels meant for you, it's worth asking about.
          </p>

          <p className="mt-4 font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
            Whether it's a collaboration, a question about an order, or simply
            to say hello we'd love to hear from you. Reach out and we'll get
            back to you as soon as we can.
          </p>

          <div className="w-12 h-[1px] bg-border my-10" />

          <div className="space-y-5">
            {[
              { icon: Mail, label: "solsirenvintage@gmail.com", href: "mailto:solsirenvintage@gmail.com" },
              { icon: Instagram, label: "@solsirenvintage", href: "https://www.instagram.com/solsirenvintage" },
              { icon: MapPin, label: "United States" },
            ].map(({ icon: Icon, label, href }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <Icon size={15} className="flex-shrink-0" />
                  <span className="font-body text-sm">{label}</span>
                </a>
              ) : (
                <div key={label} className="flex items-center gap-3 text-muted-foreground">
                  <Icon size={15} className="flex-shrink-0" />
                  <span className="font-body text-sm">{label}</span>
                </div>
              )
            )}
          </div>
        </motion.div>

        {/* Right – Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
          className="flex flex-col justify-center"
        >
          {submitted ? (
            <div className="border border-border p-10 md:p-12 text-center">
              <h3 className="font-display text-2xl font-light text-foreground">Thank you.</h3>
              <p className="mt-3 font-body text-sm text-muted-foreground">
                We'll be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-border p-8 md:p-10 space-y-6">
              {[
                { name: "name", label: "Full Name", placeholder: "Jane Doe" },
                { name: "email", label: "Email", placeholder: "jane@example.com", type: "email" },
                { name: "subject", label: "Subject", placeholder: "Collaboration, Order, Press…" },
              ].map((f) => {
                const valid = isValid(f.name);
                const hint = validators[f.name];
                return (
                  <div key={f.name}>
                    <label className="block font-body text-xs text-muted-foreground mb-1.5">
                      {f.label}
                    </label>
                    <div className="relative">
                      <input
                        required
                        type={f.type || "text"}
                        placeholder={f.placeholder}
                        value={values[f.name] || ""}
                        onChange={(e) => setValues((p) => ({ ...p, [f.name]: e.target.value }))}
                        className="w-full border bg-transparent px-4 py-3 pr-10 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors duration-200"
                        style={{ borderColor: valid ? VALID_COLOR : undefined }}
                      />
                      {valid && (
                        <Check
                          size={15}
                          className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity duration-200"
                          style={{ color: VALID_COLOR }}
                        />
                      )}
                    </div>
                    <div
                      className="overflow-hidden transition-all duration-300 ease-out"
                      style={{ maxHeight: valid && hint ? 24 : 0, opacity: valid && hint ? 1 : 0 }}
                    >
                      <p className="mt-1 font-body text-[11px]" style={{ color: VALID_COLOR }}>
                        {hint?.msg}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div>
                <label className="block font-body text-xs text-muted-foreground mb-1.5">
                  Reason
                </label>
                <select
                  value={values.type || "General"}
                  onChange={(e) => setValues((p) => ({ ...p, type: e.target.value }))}
                  className="w-full border border-border bg-transparent px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-foreground transition-colors duration-200"
                >
                  {INQUIRY_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-body text-xs text-muted-foreground mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what's on your mind…"
                  value={values.message || ""}
                  onChange={(e) => setValues((p) => ({ ...p, message: e.target.value }))}
                  className="w-full border border-border bg-transparent px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-200 resize-none"
                />
              </div>

              {/* honeypot — hidden from people, catches bots */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={values.company || ""}
                onChange={(e) => setValues((p) => ({ ...p, company: e.target.value }))}
                className="hidden"
              />

              {error && <p className="font-body text-xs text-[#9a3b3b]">{error}</p>}

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-foreground text-primary-foreground py-3 font-body text-[10px] tracking-ultra-wide uppercase hover:bg-foreground/90 transition-colors duration-300 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send Message →"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
