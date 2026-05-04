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
  image: string;
  name: string;
  profession: string;
  content: string;
  rating?: number;
}

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="section-padding px-4 sm:px-6 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          subtitle="Testimonials"
          title="What Our Clients Say"
          description="Real feedback from real clients across Ethiopia."
        />
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{ prevEl: ".t-prev", nextEl: ".t-next" }}
            pagination={{ clickable: true, el: ".t-pagination" }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            className="pb-12!"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i} className="h-auto">
                <TestimonialItem {...t} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="t-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-xl bg-[#1A1A1A] border border-white/8 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-200 cursor-pointer hidden sm:flex">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="t-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-xl bg-[#1A1A1A] border border-white/8 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-200 cursor-pointer hidden sm:flex">
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="t-pagination flex justify-center gap-2 mt-6" />
        </div>
      </div>
    </section>
  );
}
