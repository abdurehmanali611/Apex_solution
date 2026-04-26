import TeamGrid from "@/Components/TeamGrid";
import TestimonialsCarousel from "@/Components/TestimonialCarousel";
import { defaultTeamMembers, defaultTestimonials } from "@/constants";
import { GetTeam, GetTestimonial } from "@/lib/actions";
import { Metadata } from "next";
import {
  Target, Eye, Layers, Award, MapPin, Users, Briefcase, TrendingUp,
  CheckCircle, ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Apex Solution",
  description:
    "Learn about Apex Solution's mission, vision, team, and our commitment to delivering reliable IT and software solutions across Ethiopia.",
};

const stats = [
  { icon: Briefcase, value: "10+", label: "Years Experience" },
  { icon: TrendingUp, value: "50+", label: "Projects Delivered" },
  { icon: Users, value: "20+", label: "Happy Clients" },
  { icon: MapPin, value: "8", label: "Cities Served" },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    text: "Design, deliver and support practical IT and ERP solutions that solve real business problems — backed by real technical expertise and a commitment to long-term partnerships.",
    accent: "from-blue-600/20 to-cyan-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To become the most trusted technology partner in Africa — empowering businesses with smart, reliable and scalable digital solutions that drive efficiency, growth and long-term success.",
    accent: "from-violet-600/20 to-blue-500/10 border-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: Layers,
    title: "Our Scope",
    text: "End-to-end technology services spanning Software & ERP, Hotel Technology, IT Infrastructure & Networking, and Strategic Consultancy. We own the full lifecycle — from planning to deployment to support.",
    accent: "from-cyan-600/20 to-teal-500/10 border-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: Award,
    title: "Our Quality",
    text: "Quality is non-negotiable at Apex. We deliver reliable, secure and scalable solutions following industry best practices — tested, documented, supported, and always on time.",
    accent: "from-indigo-600/20 to-blue-500/10 border-indigo-500/20",
    iconColor: "text-indigo-400",
  },
];

const timeline = [
  { year: "2015", title: "Founded", desc: "Apex Solution was established in Hossana, Ethiopia with a vision to bridge the technology gap for local businesses." },
  { year: "2017", title: "Hotel Tech Expansion", desc: "Began delivering CCTV, digital door lock, and HMS solutions to hotels across Southern Ethiopia." },
  { year: "2019", title: "Network Division", desc: "Launched structured cabling and Wi-Fi infrastructure services, completing projects for hospitals, schools, and government offices." },
  { year: "2021", title: "Software Products", desc: "Released HotCol — our flagship Hotel Management SaaS — and expanded into custom software development." },
  { year: "2023", title: "National Reach", desc: "Expanded operations to 8 cities including Addis Ababa, Bahir Dar, Hawassa, and Jimma." },
  { year: "2025", title: "AI & Innovation", desc: "Integrated AI-driven solutions and project management capabilities, elevating our service delivery to world-class standards." },
];

const commitments = [
  "Delivering on time, every time",
  "Transparent communication throughout",
  "Post-delivery support and maintenance",
  "Security-first approach on every project",
  "Scalable solutions that grow with you",
  "Local expertise with global standards",
];

export default async function About() {
  const [fetchedTeam, fetchedTestimonials] = await Promise.allSettled([
    GetTeam(),
    GetTestimonial(),
  ]);

  const teams =
    fetchedTeam.status === "fulfilled" && fetchedTeam.value
      ? defaultTeamMembers.concat(fetchedTeam.value)
      : defaultTeamMembers;

  const testimonials =
    fetchedTestimonials.status === "fulfilled" && fetchedTestimonials.value
      ? defaultTestimonials.concat(fetchedTestimonials.value)
      : defaultTestimonials;

  return (
    <div className="flex flex-col bg-[#0A0A0A]">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-20 px-6">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(37,99,235,0.12),transparent)]" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-600/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-300 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Our Story
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05]"
            style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.03em" }}
          >
            Built on Trust.
            <br />
            <span className="gradient-text">Driven by Results.</span>
          </h1>
          <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed max-w-2xl">
            Apex Solution is an Ethiopian IT company with over a decade of real-world experience. We don&apos;t just deploy systems — we build the digital foundations that businesses rely on every day.
          </p>
          <Link
            href="/Contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 btn-shimmer hover:scale-105 active:scale-95"
          >
            Work With Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────── */}
      <section className="px-6 py-0">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-[#111111] border border-white/8 text-center group hover:border-blue-500/25 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                  <s.icon className="w-5 h-5 text-blue-400" />
                </div>
                <span
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
                >
                  {s.value}
                </span>
                <span className="text-xs text-[#71717A] uppercase tracking-widest font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section className="section-padding px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-3 mb-12 text-center items-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              <span className="w-6 h-px bg-blue-500" />
              What Drives Us
              <span className="w-6 h-px bg-blue-500" />
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.02em" }}
            >
              Mission, Vision & Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <div
                key={i}
                className={`p-7 rounded-2xl bg-gradient-to-br ${v.accent} border flex flex-col gap-4 hover:shadow-lg transition-all duration-200`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <v.icon className={`w-5 h-5 ${v.iconColor}`} />
                  </div>
                  <h3
                    className="text-base font-bold text-white"
                    style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
                  >
                    {v.title}
                  </h3>
                </div>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story + Commitments ──────────────────────────────── */}
      <section className="section-padding px-6 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — story */}
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              <span className="w-6 h-px bg-blue-500" />
              Who We Are
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.02em" }}
            >
              A Decade of Building
              <br />
              <span className="gradient-text">Ethiopia&apos;s Digital Infrastructure</span>
            </h2>
            <div className="flex flex-col gap-4 text-sm text-[#A1A1AA] leading-relaxed">
              <p>
                Founded in Hossana, Ethiopia, Apex Solution started with a simple belief: local businesses deserve world-class technology. Over 10 years, we&apos;ve grown from a small IT support team into a full-service technology company trusted by hotels, hospitals, schools, and government institutions.
              </p>
              <p>
                Our team combines deep technical expertise with an intimate understanding of the Ethiopian business landscape. We don&apos;t just implement technology — we become long-term partners in our clients&apos; growth.
              </p>
              <p>
                From a 4-channel CCTV installation to a full Hotel Management SaaS platform, every project gets the same level of precision, care, and commitment to excellence.
              </p>
            </div>
          </div>

          {/* Right — commitments */}
          <div className="flex flex-col gap-5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              <span className="w-6 h-px bg-blue-500" />
              Our Commitments
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.02em" }}
            >
              What You Can
              <br />
              <span className="gradient-text">Always Expect</span>
            </h2>
            <div className="grid grid-cols-1 gap-3 mt-2">
              {commitments.map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-[#111111] border border-white/8 hover:border-blue-500/20 transition-colors duration-200">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-sm text-[#A1A1AA]">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="section-padding px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-3 mb-12 text-center items-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              <span className="w-6 h-px bg-blue-500" />
              Our Journey
              <span className="w-6 h-px bg-blue-500" />
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.02em" }}
            >
              A Decade of Milestones
            </h2>
          </div>

          <div className="relative flex flex-col gap-0">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/60 via-blue-500/20 to-transparent" />

            {timeline.map((item, i) => (
              <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
                {/* Dot */}
                <div className="relative z-10 w-10 h-10 rounded-full bg-[#111111] border-2 border-blue-500/50 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1.5 pt-1.5 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{item.year}</span>
                    <span className="w-px h-3 bg-white/10" />
                    <h3
                      className="text-sm font-bold text-white"
                      style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#71717A] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────── */}
      <TeamGrid teams={teams} />

      {/* ── Testimonials ─────────────────────────────────────── */}
      <TestimonialsCarousel testimonials={testimonials} />

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-padding px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(37,99,235,0.10),transparent)]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.02em" }}
          >
            Ready to Build Something
            <br />
            <span className="gradient-text">Extraordinary?</span>
          </h2>
          <p className="text-[#A1A1AA] text-sm leading-relaxed">
            Whether you need a website, a hotel system, or a full IT infrastructure — we&apos;re ready to deliver.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/Contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 btn-shimmer hover:scale-105"
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/Portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass border border-white/10 hover:border-blue-500/40 text-white font-semibold text-sm transition-all duration-200 hover:bg-white/5"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
