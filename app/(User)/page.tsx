"use client";
import AboutComponent from "@/Components/AboutComponent";
import BlogGrid from "@/Components/BlogGrid";
import Hero from "@/Components/Hero";
import PartnerGrid from "@/Components/PartnerGrid";
import PortfolioGrid from "@/Components/PortfolioGrid";
import SectionHeader from "@/Components/SectionHeader";
import ServiceGrid from "@/Components/ServiceGrid";
import TestimonialsCarousel from "@/Components/TestimonialCarousel";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Blogs, Portfolios, Partner, Service, Testimonial } from "@/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface ServiceProp {
  icon: string;
  title: string;
  description: string;
}
interface portfolio {
  link?: string;
  title: string;
  type: string;
  description: string;
  special?: boolean;
  duration: number;
  image?: string;
  version?: number;
}

interface blogs {
  image: string;
  title: string;
  description: string;
  source: string;
  date: Date;
  link: string;
}

interface testimonial {
  image: string;
  name: string;
  profession: string;
  content: string;
  rating: number;
}

export default function UserHome() {
  const [services, setServices] = useState<ServiceProp[]>([]);
  const [portfolio, setPortfolio] = useState<portfolio[]>([]);
  const [blogs, setBlogs] = useState<blogs[]>([]);
  const [testimonials, setTestimonials] = useState<testimonial[]>([]);
  const router = useRouter();
  useEffect(() => {
    (() => {
      setServices(Service);
      setPortfolio(Portfolios);
      setBlogs(Blogs);
      setTestimonials(Testimonial);
    })();
  }, []);
  const displayedServices = services.slice(0, 3);
  const displayedPortfolio = portfolio.slice(0, 4);
  const displayedBlogs = blogs.slice(0, 3);
  const displayedTestimonials = testimonials.slice(0, 3);
  return (
    <div className="flex flex-col gap-10">
      <section>
        <Hero />
      </section>
      <section>
        <AboutComponent show={true} />
      </section>
      <section>
        <ServiceGrid services={displayedServices} />
        {Service.length > 3 && (
          <div className="flex justify-center">
            <Button
              className="mt-4 w-full md:w-max px-8 py-6 cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 self-center"
              onClick={() => router.push("/Services")}
            >
              View All Services
            </Button>
          </div>
        )}
      </section>
      <section>
        <PortfolioGrid portfolios={displayedPortfolio} />
        {Portfolios.length > 4 && (
          <div className="flex justify-center">
            <Button
              className="mt-4 w-full md:w-max px-8 py-6 cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 self-center"
              onClick={() => router.push("/PortFolio")}
            >
              View All Projects
            </Button>
          </div>
        )}
      </section>
      <section className="py-20 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="container max-w-7xl px-6">
          <SectionHeader
            subtitle="Featured Project"
            title="Our Flagship Innovation"
          />

          {Portfolios.filter((p) => p.special).map((portfolio, idx) => (
            <div key={idx} className="relative group mt-10">
              <div className="absolute -inset-1 bg-linear-to-r from-amber-500 to-yellow-400 rounded-3xl blur opacity-15 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-amber-100/50 dark:border-amber-900/20">
                <div className="relative h-50 lg:h-full min-h-75">
                  <Image
                    src={portfolio.image || "/assets/computer.jpeg"}
                    alt={portfolio.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-amber-500 text-white px-4 py-1 text-sm rounded-lg shadow-lg">
                      Special Edition
                    </Badge>
                  </div>
                </div>

                <div className="p-8 lg:p-16 flex flex-col justify-center gap-6">
                  <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
                    {portfolio.title}
                  </h3>

                  <p className="font-serif text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                    {portfolio.description}
                  </p>

                  <div className="flex flex-col gap-4 border-l-2 border-amber-500 pl-6 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-600 dark:text-amber-500 font-bold">
                        Duration:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 font-serif">
                        {portfolio.duration} Days
                      </span>
                    </div>
                    {portfolio.version && (
                      <div className="flex items-center gap-2">
                        <span className="text-amber-600 dark:text-amber-500 font-bold">
                          Release:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 font-serif">
                          v{portfolio.version}
                        </span>
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-fit px-8 py-6 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer"
                    onClick={() => router.push(portfolio.link || "/Portfolio")}
                  >
                    Explore Project details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto relative">
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-amber-100 dark:border-amber-900/30 rounded-3xl p-8 md:p-12 text-center shadow-xl relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-amber-500/5 rounded-full" />
            <CardHeader className="p-0 mb-4">
              <span className="text-amber-600 dark:text-amber-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block">
                Ready to start?
              </span>
              <CardTitle className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
                Have a Project Idea? <br />
                <span className="text-amber-500">
                  Let&apos;s Build it Together
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mb-8 max-w-xl mx-auto">
              <p className="font-serif text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                From{" "}
                <span className="text-amber-600 font-medium">
                  Software Development
                </span>{" "}
                to
                <span className="text-amber-600 font-medium">
                  {" "}
                  IT Consultancy
                </span>
                , we provide the technical foundation your business needs to
                grow.
              </p>
            </CardContent>

            <CardFooter className="p-0 flex justify-center">
              <Button
                className="px-8 py-5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                onClick={() => router.push("/Contact")}
              >
                Get in Touch
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      <section>
        <BlogGrid blogs={displayedBlogs} />
        {Blogs.length > 3 && (
          <div className="flex justify-center">
            <Button
              className="cursor-pointer"
              onClick={() => router.push("/Blog")}
            >
              View All Blogs
            </Button>
          </div>
        )}
      </section>
      <section>
        <TestimonialsCarousel testimonials={displayedTestimonials} />
      </section>
      <section>
        <PartnerGrid partners={Partner} screen="Home" />
      </section>
    </div>
  );
}
