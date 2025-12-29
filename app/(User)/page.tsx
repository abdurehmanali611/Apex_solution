"use client";
import AboutComponent from "@/Components/AboutComponent";
import BlogGrid from "@/Components/BlogGrid";
import Hero from "@/Components/Hero";
import PortfolioGrid from "@/Components/PortfolioGrid";
import ProjectGrid from "@/Components/ProjectGrid";
import ServiceGrid from "@/Components/ServiceGrid";
import TestimonialsCarousel from "@/Components/TestimonialCarousel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Blogs, Portfolios, project, Service, Testimonial } from "@/constants";
import { useState, useEffect } from "react";

interface ServiceProp {
  icon: string;
  title: string;
  description: string;
}
interface portfolio {
  image: string;
  title: string;
  type: string;
}

interface blogs {
  image: string;
  title: string;
  description: string;
  source: string;
  date: Date;
}

interface testimonial {
  image?: string;
  name?: string;
  profession?: string;
  content?: string;
  rating?: number;
}

export default function UserHome() {
  const [services, setServices] = useState<ServiceProp[]>([]);
  const [portfolio, setPortfolio] = useState<portfolio[]>([]);
  const [blogs, setBlogs] = useState<blogs[]>([]);
  const [testimonials, setTestimonials] = useState<testimonial[]>([]);
  useEffect(() => {
    (() => {
      setServices(Service);
      setPortfolio(Portfolios);
      setBlogs(Blogs);
      setTestimonials(Testimonial);
    })();
  }, []);
  const displayedServices = services.slice(0, 3);
  const displayedPortfolio = portfolio.slice(0, 9);
  const displayedBlogs = blogs.slice(0, 3);
  const displayedTestimonials = testimonials.slice(0, 3);
  return (
    <div className="flex flex-col gap-10">
      <section>
        <Hero />
      </section>
      <section>
        <AboutComponent />
      </section>
      <section>
        <ServiceGrid services={displayedServices} />
        {Service.length > 3 && (
          <div className="flex justify-center">
            <Button className="cursor-pointer">View All Services</Button>
          </div>
        )}
      </section>
      <section>
        <PortfolioGrid portfolios={displayedPortfolio} />
        {Portfolios.length > 9 && (
          <div className="flex justify-center">
            <Button className="cursor-pointer">View All Projects</Button>
          </div>
        )}
      </section>
      <Card className="flex flex-col text-center">
        <CardHeader>
          <CardTitle>Do You have a Project Idea ?</CardTitle>
          <CardDescription>Let&apos;s discuss your project</CardDescription>
        </CardHeader>
        <CardContent className="w-[30%] self-center flex flex-col gap-7 items-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
          suscipit, nobis sed aliquid doloremque
        <CardFooter>
          <Button className="flex justify-center w-fit cursor-pointer hover:bg-amber-500">Let&apos;s Work Together</Button>
        </CardFooter>
        </CardContent>
      </Card>
      <section>
        <BlogGrid blogs={displayedBlogs} />
        {Blogs.length > 3 && (
          <div className="flex justify-center">
            <Button className="cursor-pointer">View All Blogs</Button>
          </div>
        )}
      </section>
      <section>
        <TestimonialsCarousel testimonials={displayedTestimonials} />
      </section>
      <section>
        <ProjectGrid projects={project} screen="Home" />
      </section>
    </div>
  );
}
