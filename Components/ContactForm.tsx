"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ContactForm as ContactFormSchema } from "@/lib/validation";
import { CreateContact } from "@/lib/actions";
import { CheckCircle, Mail, Phone, MapPin, Send } from "lucide-react";
import { Icon } from "@iconify/react";

const services = [
  "Website Development",
  "Mobile App Development",
  "Hotel Management System",
  "CCTV Surveillance",
  "Digital Door Locks",
  "Network Design & Installation",
  "IT Consulting",
  "Custom Software",
  "Other",
];

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { Full_Name: "", Email: "", Subject: "", Message: "" },
  });

  const onSubmit = async (values: z.infer<typeof ContactFormSchema>) => {
    const result = await CreateContact(values, setLoading);
    if (result) {
      setSuccess(true);
      form.reset();
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-white/8 text-white placeholder:text-[#71717A] text-sm focus:outline-none focus:border-blue-500/50 transition-colors";

  return (
    <section className="section-padding px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-12 text-center items-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            <span className="w-6 h-px bg-blue-500" />
            Get In Touch
            <span className="w-6 h-px bg-blue-500" />
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.02em" }}
          >
            Let&apos;s Build Something
            <br />
            <span className="gradient-text">Together</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="p-6 rounded-2xl bg-[#111111] border border-white/8 flex flex-col gap-6">
              <h3 className="text-base font-semibold text-white" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
                Contact Information
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Phone, label: "Phone", values: ["+251 930 272 975", "+251 935 000 642"], href: "tel:+251930272975" },
                  { icon: Mail, label: "Email", values: ["apexsolution@gmail.com"], href: "mailto:apexsolution@gmail.com" },
                  { icon: MapPin, label: "Locations", values: ["Hossana, Addis Ababa", "& 6 more cities"], href: null },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-[#71717A] mb-1">{item.label}</p>
                      {item.values.map((v, j) => (
                        item.href ? (
                          <a key={j} href={item.href} className="block text-sm text-white hover:text-blue-300 transition-colors">{v}</a>
                        ) : (
                          <p key={j} className="text-sm text-white">{v}</p>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="p-6 rounded-2xl bg-[#111111] border border-white/8">
              <p className="text-xs text-[#71717A] mb-4 uppercase tracking-widest font-semibold">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: "skill-icons:linkedin", href: "https://www.linkedin.com/company/apex-solution-et" },
                  { icon: "logos:telegram", href: "https://t.me/ApexSolutionET" },
                  { icon: "skill-icons:github-dark", href: "https://github.com/apex-solution" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center hover:bg-blue-600/20 hover:border-blue-500/30 transition-all duration-200"
                  >
                    <Icon icon={s.icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-2xl bg-[#111111] border border-white/8">
              {success ? (
                <div className="flex flex-col items-center justify-center gap-5 py-16 text-center animate-fade-up">
                  <div className="w-16 h-16 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
                      Message Sent!
                    </h3>
                    <p className="text-sm text-[#A1A1AA]">We&apos;ll be in touch within 24 hours.</p>
                  </div>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-[#A1A1AA]">Full Name</label>
                      <input {...form.register("Full_Name")} placeholder="Your full name" className={inputClass} />
                      {form.formState.errors.Full_Name && (
                        <p className="text-xs text-red-400">{form.formState.errors.Full_Name.message}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-[#A1A1AA]">Email</label>
                      <input {...form.register("Email")} type="email" placeholder="your@email.com" className={inputClass} />
                      {form.formState.errors.Email && (
                        <p className="text-xs text-red-400">{form.formState.errors.Email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#A1A1AA]">Service Interested In</label>
                    <select {...form.register("Subject")} className={inputClass + " cursor-pointer"}>
                      <option value="" className="bg-[#1A1A1A]">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-[#1A1A1A]">{s}</option>
                      ))}
                    </select>
                    {form.formState.errors.Subject && (
                      <p className="text-xs text-red-400">{form.formState.errors.Subject.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#A1A1AA]">Message</label>
                    <textarea
                      {...form.register("Message")}
                      placeholder="Tell us about your project..."
                      rows={5}
                      className={inputClass + " resize-none"}
                    />
                    {form.formState.errors.Message && (
                      <p className="text-xs text-red-400">{form.formState.errors.Message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 btn-shimmer hover:scale-[1.02] active:scale-95 w-full sm:w-auto"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
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
