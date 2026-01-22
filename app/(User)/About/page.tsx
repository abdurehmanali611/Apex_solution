import AboutComponent from "@/Components/AboutComponent";
import TestimonialsCarousel from "@/Components/TestimonialCarousel";
import { Testimonial } from "@/constants";

export default function About() {
    return (
        <div className="flex flex-col gap-10">
            <AboutComponent />
            <TestimonialsCarousel testimonials={Testimonial}/>
        </div>
    )
}