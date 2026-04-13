"use client"
import AboutComponent from "@/Components/AboutComponent";
import TeamGrid from "@/Components/TeamGrid";
import TestimonialsCarousel from "@/Components/TestimonialCarousel";
import { teamMembers, Testimonial } from "@/constants";

export default function About() {
    return (
        <div className="flex flex-col gap-10">
            <AboutComponent show={false}/>
            <TeamGrid teams={teamMembers}/>
            <TestimonialsCarousel testimonials={Testimonial}/>
        </div>
    )
}