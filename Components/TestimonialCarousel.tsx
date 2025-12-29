"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import TestimonialItem from "./TestimonialItem";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Testimonial {
  image?: string;
  name: string;
  profession: string;
  content: string;
  rating?: number;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="w-full bg-[#F8F9FA] py-12 md:py-20">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <SectionHeader subtitle="Testimonial" />
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No testimonials available yet. Be the first to share your
              experience!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-4">
      <SectionHeader subtitle="Testimonial" title="What Our Clients Say" />

      <div className="relative px-4 md:px-16 wow fadeIn" data-wow-delay="0.1s">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          navigation={{
            prevEl: ".testimonial-button-prev",
            nextEl: ".testimonial-button-next",
          }}
          pagination={{
            clickable: true,
            el: ".testimonial-pagination",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="testimonial-swiper pb-12!"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="h-auto">
              <TestimonialItem
                image={testimonial.image}
                name={testimonial.name}
                profession={testimonial.profession}
                content={testimonial.content}
                rating={testimonial.rating}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          className="testimonial-button-prev flex items-center justify-center absolute w-12 h-12 md:w-15 md:h-12 top-1/2 left-0 md:-left-4 -translate-y-1/2 transition-all duration-500 bg-[#F1C152] text-[#0C1214] hover:bg-[#0C1214] hover:text-[#F1C152] z-10 rounded"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="testimonial-button-next flex items-center justify-center absolute w-12 h-12 md:w-15 md:h-12 top-1/2 right-0 md:-right-4 -translate-y-1/2 transition-all duration-500 bg-[#F1C152] text-[#0C1214] hover:bg-[#0C1214] hover:text-[#F1C152] z-10 rounded"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Pagination */}
        <div className="testimonial-pagination relative! bottom-0! mt-8 flex justify-center gap-2"></div>
      </div>
    </div>
  );
}
