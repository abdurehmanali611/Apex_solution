import AboutComponent from "@/Components/AboutComponent";
import BlogGrid from "@/Components/BlogGrid";
import Hero from "@/Components/Hero";
import PartnerGrid from "@/Components/PartnerGrid";
import PortfolioGrid from "@/Components/PortfolioGrid";
import SectionHeader from "@/Components/SectionHeader";
import ServiceGrid from "@/Components/ServiceGrid";
import TestimonialsCarousel from "@/Components/TestimonialCarousel";
import {
  defaultBlogs, defaultPartners, defaultPortfolios,
  defaultServices, defaultTestimonials, defaultHeroFooter,
} from "@/constants";
import {
  GetService, GetPortFolio, GetBlog, GetTestimonial, GetPartner, HeroFooterFetch,
} from "@/lib/actions";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, Zap, BarChart3, MessageSquare, Eye, Cpu, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Apex Solution — AI-Powered Software & Tech",
  description:
    "Apex Solution is Ethiopia's AI-first technology company — delivering intelligent software, hotel tech, networking, and AI consulting services.",
};

const AI_FEATURES = [
  { icon: Brain,        title: "AI-Augmented Development",   desc: "Every system we build includes AI layers — smart recommendations, predictive analytics, and automated decision-making." },
  { icon: Zap,          title: "Intelligent Automation",      desc: "We eliminate repetitive work through AI-driven workflows, automated reporting, and smart process orchestration." },
  { icon: BarChart3,    title: "Predictive Analytics",        desc: "Real-time dashboards powered by machine learning that surface insights before problems occur." },
  { icon: MessageSquare,title: "AI Communication Tools",      desc: "Automated guest messaging, smart chatbots, and AI-powered customer engagement built into every hospitality solution." },
  { icon: Eye,          title: "Computer Vision & CCTV AI",   desc: "Beyond recording — our surveillance systems use AI for motion detection, behavioral analysis, and real-time alerts." },
  { icon: Cpu,          title: "AI as a Service (AIaaS)",     desc: "We offer AI capabilities as a standalone service — integrate intelligence into your existing systems without rebuilding from scratch." },
];

export default async function UserHome() {
  const [fs, fp, fb, ft, fpa, fh] = await Promise.allSettled([
    GetService(), GetPortFolio(), GetBlog(), GetTestimonial(), GetPartner(), HeroFooterFetch(),
  ]);

  const services     = fs.status  === "fulfilled" && fs.value  ? defaultServices.concat(fs.value)     : defaultServices;
  const portfolios   = fp.status  === "fulfilled" && fp.value  ? defaultPortfolios.concat(fp.value)   : defaultPortfolios;
  const blogs        = fb.status  === "fulfilled" && fb.value  ? fb.value.concat(defaultBlogs)        : defaultBlogs;
  const testimonials = ft.status  === "fulfilled" && ft.value  ? defaultTestimonials.concat(ft.value) : defaultTestimonials;
  const partners     = fpa.status === "fulfilled" && fpa.value ? defaultPartners.concat(fpa.value)    : defaultPartners;
  const heroFooter   = fh.status  === "fulfilled" && fh.value  ? fh.value                             : defaultHeroFooter;

  const featuredPortfolios = portfolios.filter((p) => p.special).slice(0, 1);

  return (
    <div className="flex flex-col">

      {/* Hero */}
      <Hero heroFooter={heroFooter} />

      {/* About snippet */}
      <AboutComponent show={true} />

      {/* ── AI Showcase Section ─────────────────────────────── */}
      <section className="section-padding px-6 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,99,235,0.07),transparent)]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col gap-3 mb-12 text-center items-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-300 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-blue-400" />
              AI as a Service
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.02em" }}
            >
              Intelligence Built Into
              <br />
              <span className="gradient-text">Every Solution We Deliver</span>
            </h2>
            <p className="text-[#A1A1AA] text-base leading-relaxed max-w-2xl">
              We don&apos;t bolt AI on after the fact. From day one, every system, network, and application we build is engineered with artificial intelligence at its core.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_FEATURES.map((f, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-[#111111] border border-white/8 hover:border-blue-500/25 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/5 flex flex-col gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:scale-110 transition-all duration-300">
                  <f.icon className="w-5 h-5 text-blue-400" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-xs text-[#71717A] leading-relaxed group-hover:text-[#A1A1AA] transition-colors">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link
              href="/Services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 btn-shimmer hover:scale-105"
            >
              <Brain className="w-4 h-4" />
              Explore All AI Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <ServiceGrid services={services.slice(0, 6)} />
      {services.length > 6 && (
        <div className="flex justify-center -mt-16 pb-20">
          <Link href="/Services" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#1A1A1A] border border-white/8 hover:border-blue-500/30 text-white font-semibold text-sm transition-all duration-200 hover:bg-white/5">
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Portfolio preview */}
      <div className="bg-[#0D0D0D]">
        <PortfolioGrid portfolios={portfolios.slice(0, 6)} />
        {portfolios.length > 6 && (
          <div className="flex justify-center -mt-16 pb-20">
            <Link href="/Portfolio" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 btn-shimmer hover:scale-105">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Featured project */}
      {featuredPortfolios.length > 0 && (
        <section className="section-padding px-6">
          <div className="max-w-7xl mx-auto">
            <SectionHeader subtitle="Featured Project" title="Our Flagship Innovation" />
            {featuredPortfolios.map((portfolio, idx) => (
              <div key={idx} className="relative group rounded-3xl overflow-hidden border border-white/8 bg-[#111111]">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto min-h-80">
                    <Image src={portfolio.image || "/assets/webapp.jpg"} alt={portfolio.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111]/50 lg:block hidden" />
                    <div className="absolute top-5 left-5 flex gap-2">
                      <span className="px-3 py-1.5 rounded-lg bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold">Special Edition</span>
                      <span className="px-3 py-1.5 rounded-lg bg-[#111111]/80 backdrop-blur-sm text-blue-300 text-xs font-semibold border border-blue-500/30 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> AI-Powered
                      </span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center gap-5">
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.02em" }}>
                      {portfolio.title}
                    </h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">{portfolio.description}</p>
                    <div className="flex flex-col gap-2 pl-4 border-l-2 border-blue-500/40">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-[#71717A]">Duration:</span>
                        <span className="text-white font-medium">{portfolio.duration} Days</span>
                      </div>
                      {portfolio.version && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-[#71717A]">Release:</span>
                          <span className="text-white font-medium">v{portfolio.version}</span>
                        </div>
                      )}
                    </div>
                    <Link href={portfolio.link || "/Portfolio"} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 btn-shimmer w-fit hover:scale-105">
                      Explore Project <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* AI-first CTA */}
      <section className="section-padding px-6 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(37,99,235,0.12),transparent)]" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-300">
            <Brain className="w-3.5 h-3.5 text-blue-400" />
            AI-Powered Solutions Available Now
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.02em" }}>
            Ready to Bring AI Into
            <br />
            <span className="gradient-text">Your Business?</span>
          </h2>
          <p className="text-[#A1A1AA] text-base leading-relaxed max-w-xl">
            Whether you need an AI-powered hotel system, an intelligent web platform, or a full digital transformation strategy — we&apos;re ready to engineer it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/Contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all duration-200 btn-shimmer hover:scale-105 active:scale-95">
              Start Your AI Journey <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/Portfolio" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass border border-white/10 hover:border-blue-500/40 text-white font-semibold transition-all duration-200 hover:bg-white/5">
              See Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <BlogGrid blogs={blogs.slice(0, 3)} />
      {blogs.length > 3 && (
        <div className="flex justify-center -mt-16 pb-20">
          <Link href="/Blog" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#1A1A1A] border border-white/8 hover:border-blue-500/30 text-white font-semibold text-sm transition-all duration-200">
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Testimonials */}
      <TestimonialsCarousel testimonials={testimonials.slice(0, 6)} />

      {/* Partners */}
      <PartnerGrid partners={partners} screen="Home" />
    </div>
  );
}
