import Link from "next/link";
import { ArrowRight, Target, Eye, Layers, Award, Brain, Sparkles } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    text: "Design, deliver and support AI-augmented IT solutions that solve real business problems — combining deep technical expertise with intelligent automation to deliver outcomes that scale.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To become Africa's most trusted AI-powered technology partner — empowering businesses with intelligent, reliable and scalable digital solutions that drive efficiency and long-term growth.",
  },
  {
    icon: Layers,
    title: "Our Scope",
    text: "End-to-end AI-integrated technology services: Smart Software & ERP, Intelligent Hotel Systems, IT Infrastructure, and AI Consulting. We own the full lifecycle.",
  },
  {
    icon: Award,
    title: "Our Quality",
    text: "Every solution is AI-reviewed, security-hardened, and built to scale. We follow industry best practices and deliver on time — every time.",
  },
];

export default function AboutComponent({ show }: { show: boolean }) {
  return (
    <section className="section-padding px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            <span className="w-6 h-px bg-blue-500" />
            About Apex Solution
            <span className="w-6 h-px bg-blue-500" />
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight"
            style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.02em" }}
          >
            We Don&apos;t Just Build Systems —{" "}
            <span className="gradient-text">We Engineer Intelligence Into Them.</span>
          </h2>
          <p className="text-[#A1A1AA] text-base leading-relaxed max-w-2xl mt-1">
            Apex Solution is Ethiopia&apos;s AI-first technology company. With 10+ years of real-world experience, every solution we deliver — from hotel management systems to enterprise networks — is augmented with AI to be smarter, faster, and more resilient.
          </p>

          {/* AI badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 w-fit mt-1">
            <Brain className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold text-blue-300">AI as a Service — built into every engagement</span>
            <Sparkles className="w-3 h-3 text-blue-400" />
          </div>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {values.map((v, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#111111] border border-white/8 flex flex-col gap-4 hover:border-blue-500/20 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <v.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-base font-semibold text-white" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
                  {v.title}
                </h3>
              </div>
              <p className="text-sm text-[#71717A] leading-relaxed pl-1 border-l-2 border-blue-500/30">
                {v.text}
              </p>
            </div>
          ))}
        </div>

        {show && (
          <div className="flex justify-center">
            <Link
              href="/About"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 btn-shimmer hover:scale-105 active:scale-95"
            >
              Learn More About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
