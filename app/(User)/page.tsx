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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Blogs, Portfolios, Partner, Service, Testimonial } from "@/constants";
import Image from "next/image";
import Link from "next/link";
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
  const specialPortFolio = portfolio.filter((item) => item.special === true);
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
              className="cursor-pointer"
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
              className="cursor-pointer"
              onClick={() => router.push("/PortFolio")}
            >
              View All Projects
            </Button>
          </div>
        )}
      </section>
      <section>
        <SectionHeader
          subtitle="Special PortFolio"
          title="Our Special Projects"
        />
        <div className="grid grid-cols-2 items-center gap-6 px-4">
          {specialPortFolio.map((item, idx) => (
            <Card key={idx}>
              <CardHeader className="flex flex-col gap-5 items-center">
                <div className="flex items-center w-full justify-between">
                  <Badge>{item.type}</Badge>
                  {item.version && <Badge>{item.version}</Badge>}
                </div>
                <CardTitle className="font-serif text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-start justify-between gap-5">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={200}
                    loading="eager"
                    className="rounded-xl"
                  />
                )}
                <p className="text-lg font-serif text-center">{item.description}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <h2 className="font-serif">
                  <span className="font-semibold text-lg text-amber-500">
                    Duration:
                  </span>{" "}
                  {item.duration > 30
                    ? `${item.duration % 30} ${item.duration === 30 ? "month" : "months"}`
                    : `${item.duration} days`}
                </h2>
                {item.link && (
                  <Link
                    href={item.link}
                    target="blank"
                    className="text-blue-500 underline"
                  >
                    Visit Here
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      <Card className="flex flex-col text-center">
        <CardHeader>
          <CardTitle>Do You have a Project Idea ?</CardTitle>
          <CardDescription>Let&apos;s discuss your project</CardDescription>
        </CardHeader>
        <CardContent className="w-full md:w-[50%] self-center items-center text-center">
          Here is a source for <br />
          <span className="font-serif text-lg text-amber-500 italic">
            software development, Networking and IT Consultancy
          </span>
          <br /> knowledges and skills so What do you say ?
        </CardContent>
        <CardFooter className="flex w-full justify-center">
          <Button
            className="flex justify-center w-fit cursor-pointer hover:bg-amber-500"
            onClick={() => router.push("/Contact")}
          >
            Let&apos;s Work Together
          </Button>
        </CardFooter>
      </Card>
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
