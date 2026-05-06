"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ContactForm as ContactFormSchema } from "@/lib/validation";
import { CreateContact } from "@/lib/actions";
import { CheckCircle, Mail, Phone, MapPin, Send, MessageCircle, Clock, Linkedin, Github } from "lucide-react";

const services = [
  "AI-Powered Web Development",
  "Intelligent System Development",
  "AI Mobile App Development",
  "Smart Network Design",
  "AI Hotel Management System",
  "AI CCTV Surveillance",
  "Smart Access Control",
  "AI Automation & Custom Software",
  "IT Support & AI Monitoring",
  "AI Strategy & Tech Consulting",
  "Other",
];

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { Full_Name: "", Email: "", Subject: "", Message: "" },
    mode: "onChange", // real-time validation
  });

  const onSubmit = async (values: z.infer<typeof ContactFormSchema>) => {
    const result = await CreateContact(values, setLoading);
    if (result) { setSuccess(true); form.reset(); }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border text-white placeholder:text-[#71717A] text-sm focus:outline-none transition-colors ${
      hasError
        ? "border-red-500/50 focus:border-red-500"
        : "border-white/8 focus:border-blue-500/50"
    }`;

  return (
    <section className="section-padding px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-12 text-center items-center">
          <span className="relative inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#F5A623]">
            <span className="w-6 h-0.5 bg-[#F5A623] rounded-full" />
            Get In Touch
            <span className="w-6 h-0.5 bg-[#F5A623] rounded-full" />
          </span>
          <h2
            className="text-3xl md:text-[52px] font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.04em" }}
          >
            Let&apos;s Build Something
            <br />
            <span className="gradient-text">Together</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left info column */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* WhatsApp CTA — critical for Ethiopian market */}
            <a
              href="https://wa.me/251930272975?text=Hi%20Apex%20Solution%2C%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl border border-green-500/30 bg-green-500/8 hover:bg-green-500/15 hover:border-green-500/50 transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Chat on WhatsApp</p>
                <p className="text-xs text-[#71717A]">+251 930 272 975 · Instant reply</p>
              </div>
            </a>

            {/* Contact info */}
            <div className="p-6 rounded-2xl bg-[#111111] border border-white/8 flex flex-col gap-5">
              <h3 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
                Contact Information
              </h3>
              {[
                { icon: Phone, label: "Phone", values: ["+251 930 272 975", "+251 935 000 642"], href: "tel:+251930272975" },
                { icon: Mail, label: "Email", values: ["contact@apexsolutionhub.com"], href: "mailto:contact@apexsolutionhub.com" },
                { icon: MapPin, label: "Locations", values: ["Hossana, Addis Ababa", "& 6 more cities"], href: null },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#71717A] uppercase tracking-widest mb-1">{item.label}</p>
                    {item.values.map((v, j) => (
                      item.href
                        ? <a key={j} href={item.href} className="block text-sm text-[#D4D4D8] hover:text-white transition-colors">{v}</a>
                        : <p key={j} className="text-sm text-[#D4D4D8]">{v}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Response time */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#111111] border border-white/8">
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Typical response time</p>
                <p className="text-xs text-[#71717A]">We reply within <span className="text-blue-400 font-semibold">4 hours</span> during business hours</p>
              </div>
            </div>

            {/* Social */}
            <div className="p-5 rounded-2xl bg-[#111111] border border-white/8">
              <p className="text-[10px] text-[#71717A] mb-3 uppercase tracking-widest font-bold">Follow Us</p>
              <div className="flex gap-2">
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/company/apex-solution-et", label: "LinkedIn" },
                  { icon: Send, href: "https://t.me/apexsolutionhub", label: "Telegram" },
                  { icon: Github, href: "https://github.com/apex-solution", label: "GitHub" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-[#71717A] hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 transition-all duration-200"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="p-5 sm:p-8 rounded-2xl bg-[#111111] border border-white/8">
              {success ? (
                <div className="flex flex-col items-center justify-center gap-5 py-16 text-center animate-fade-up">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
                      Message Sent!
                    </h3>
                    <p className="text-sm text-[#A1A1AA]">We typically reply within <span className="text-blue-400 font-semibold">4 hours</span>.</p>
                  </div>
                  <button onClick={() => setSuccess(false)} className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-[#A1A1AA]">Full Name *</label>
                      <input {...form.register("Full_Name")} placeholder="Your full name" className={inputClass(!!form.formState.errors.Full_Name)} />
                      {form.formState.errors.Full_Name && (
                        <p className="text-xs text-red-400">{form.formState.errors.Full_Name.message}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-[#A1A1AA]">Email *</label>
                      <input {...form.register("Email")} type="email" placeholder="your@email.com" className={inputClass(!!form.formState.errors.Email)} />
                      {form.formState.errors.Email && (
                        <p className="text-xs text-red-400">{form.formState.errors.Email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#A1A1AA]">Service Interested In *</label>
                    <select {...form.register("Subject")} className={inputClass(!!form.formState.errors.Subject) + " cursor-pointer"}>
                      <option value="" className="bg-[#1A1A1A]">Select a service...</option>
                      {services.map((s) => <option key={s} value={s} className="bg-[#1A1A1A]">{s}</option>)}
                    </select>
                    {form.formState.errors.Subject && (
                      <p className="text-xs text-red-400">{form.formState.errors.Subject.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#A1A1AA]">Message *</label>
                    <textarea
                      {...form.register("Message")}
                      placeholder="Tell us about your project, timeline, and goals..."
                      rows={5}
                      className={inputClass(!!form.formState.errors.Message) + " resize-none"}
                    />
                    {form.formState.errors.Message && (
                      <p className="text-xs text-red-400">{form.formState.errors.Message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-[#0A0A0A] font-bold text-sm transition-all duration-200 btn-shimmer hover:scale-[1.02] active:scale-95 w-full sm:w-auto"
                    style={{ background: "linear-gradient(135deg, #F5A623 0%, #E8940F 100%)" }}
                  >
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />Sending...</>
                    ) : (
                      <><Send className="w-4 h-4" />Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
