"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Globe, Layers, Calendar, Clock } from "lucide-react";

interface Blog {
  id?: number;
  image: string;
  title: string;
  description: string;
  source: string;
  date: string;
  link: string;
  category?: string;
}

const CATEGORIES = [
  { key: "All",      icon: Layers,  label: "All Articles" },
  { key: "Ethiopia", icon: MapPin,  label: "Ethiopia" },
  { key: "Global",   icon: Globe,   label: "Global" },
];

function readTime(text: string) {
  const words = text.split(" ").length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function FeaturedCard({ blog }: { blog: Blog }) {
  return (
    <Link href={blog.link} target="_blank" rel="noopener noreferrer" className="group block">
      <div className="relative rounded-3xl overflow-hidden bg-[#111111] border border-white/8 hover:border-blue-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5">
        {/* Image */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#111111] via-[#111111]/50 to-transparent" />

          {/* Category + source badges */}
          <div className="absolute top-5 left-5 flex flex-wrap gap-2 max-w-[calc(100%-2.5rem)]">
            {blog.category && (
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm ${
                blog.category === "Ethiopia"
                  ? "bg-green-600/80 text-white"
                  : "bg-blue-600/80 text-white"
              }`}>
                {blog.category === "Ethiopia" ? "🇪🇹 Ethiopia" : "🌍 Global"}
              </span>
            )}
            <span className="px-3 py-1.5 rounded-full bg-[#111111]/80 backdrop-blur-sm text-white text-xs font-semibold border border-white/10">
              {blog.source}
            </span>
          </div>

          {/* Featured label */}
          <div className="absolute top-5 right-5">
            <span className="px-3 py-1.5 rounded-full bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest">
              Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 md:p-10 flex flex-col gap-4">
          <div className="flex items-center gap-4 text-xs text-[#71717A]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {new Date(blog.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {readTime(blog.description)}
            </span>
          </div>
          <h2
            className="text-xl md:text-3xl font-bold text-white group-hover:text-blue-300 transition-colors leading-tight"
            style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.02em" }}
          >
            {blog.title}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-3xl line-clamp-3">
            {blog.description}
          </p>
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors pt-2 border-t border-white/5 w-fit">
            Read Full Article
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={blog.link} target="_blank" rel="noopener noreferrer" className="group block h-full">
      <div className="h-full rounded-2xl overflow-hidden bg-[#111111] border border-white/8 hover:border-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden shrink-0">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#111111]/90 via-transparent to-transparent" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            {blog.category ? (
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm ${
                blog.category === "Ethiopia"
                  ? "bg-green-600/85 text-white"
                  : "bg-blue-600/85 text-white"
              }`}>
                {blog.category === "Ethiopia" ? "🇪🇹 Ethiopia" : "🌍 Global"}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-blue-600/85 backdrop-blur-sm text-white text-[10px] font-bold">
                {blog.source}
              </span>
            )}
          </div>

          {/* Source bottom */}
          <div className="absolute bottom-3 right-3">
            <span className="px-2.5 py-1 rounded-lg bg-[#111111]/80 backdrop-blur-sm text-[#A1A1AA] text-[10px] font-semibold border border-white/8">
              {blog.source}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-3 text-[10px] text-[#71717A]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
            <span className="w-px h-2.5 bg-white/10" />
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime(blog.description)}
            </span>
          </div>

          <h3
            className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-snug line-clamp-2 flex-1"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            {blog.title}
          </h3>

          <p className="text-xs text-[#71717A] leading-relaxed line-clamp-2">
            {blog.description}
          </p>

          <div className="flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors pt-2 border-t border-white/5">
            Read Article
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPageClient({ blogs }: { blogs: Blog[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return blogs;
    return blogs.filter((b) => (b.category ?? "Global") === activeCategory);
  }, [blogs, activeCategory]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Page header */}
      <section className="relative pt-24 pb-12 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.10),transparent)]" />
        <div className="relative max-w-7xl mx-auto flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            <span className="w-6 h-px bg-blue-500" />
            Insights & News
            <span className="w-6 h-px bg-blue-500" />
          </span>
          <h1
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "-0.02em" }}
          >
            Tech News That
            <br />
            <span className="gradient-text">Actually Matters</span>
          </h1>
          <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed max-w-xl">
            Ethiopian digital transformation stories alongside global AI and tech breakthroughs — curated to keep you ahead.
          </p>

          {/* Category filter */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-blue-600 text-white border border-blue-500 shadow-lg shadow-blue-500/20"
                    : "bg-[#111111] text-[#71717A] border border-white/8 hover:text-white hover:border-white/20"
                }`}
              >
                <cat.icon className="w-3.5 h-3.5" />
                {cat.label}
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                  activeCategory === cat.key ? "bg-white/20 text-white" : "bg-white/5 text-[#71717A]"
                }`}>
                  {cat.key === "All" ? blogs.length : blogs.filter(b => (b.category ?? "Global") === cat.key).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#71717A]">
              <p className="text-lg">No articles in this category yet.</p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && <FeaturedCard blog={featured} />}

              {/* Rest grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((blog, idx) => (
                    <BlogCard key={idx} blog={blog} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
