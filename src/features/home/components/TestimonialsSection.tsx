"use client";

import { useState } from "react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "“Before using this platform, our team was drowning in repetitive tasks across tools and spreadsheets. After setup, most daily updates now run automatically and our team finally has time for strategic work.”",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    },
    {
      quote: "“Nexsas transformed how our entire engineering and operations team interacts. We cut onboarding friction in half and unified our release pipelines without writing custom glue code.”",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((idx) => (idx === 0 ? testimonials.length - 1 : idx - 1));
  const next = () => setCurrentIndex((idx) => (idx === testimonials.length - 1 ? 0 : idx + 1));

  const current = testimonials[currentIndex];

  return (
    <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#f4f6fa]" id="testimonials">
      <div className="w-full max-w-[100rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Proof & Stat Cards (Matching s13.png) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Top Proof Avatar Stack */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=80"
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=80"
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 text-gray-700 font-bold text-xs flex items-center justify-center">
                  +243
                </div>
              </div>

              <div>
                <div className="flex text-[#7c3aed] text-base tracking-widest">
                  ★★★★★
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Happy by 20k+ clients
                </div>
              </div>
            </div>

            {/* Metric Card 1 */}
            <div className="bg-white rounded-[24px] p-7 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/90">
              <div className="text-xs text-gray-500 font-medium mb-1">Top Customer Ratings</div>
              <div className="text-4xl font-bold text-[#0d0f11] tracking-tight">91%</div>
            </div>

            {/* Metric Row: Two Separate Cards Matching s13.png */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-[24px] p-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/90">
                <div className="text-[12px] text-gray-500 font-medium mb-1.5">On-Time Deliveries</div>
                <div className="text-2xl sm:text-3xl font-bold text-[#0d0f11]">100%</div>
              </div>
              <div className="bg-white rounded-[24px] p-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/90">
                <div className="text-[12px] text-gray-500 font-medium mb-1.5">Logistics Optimization</div>
                <div className="text-2xl sm:text-3xl font-bold text-[#0d0f11]">87%</div>
              </div>
            </div>

          </div>

          {/* Right Column: Large Testimonial Card (Matching s13.png) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100/90 flex flex-col md:flex-row items-center gap-8 min-h-[360px]">
              
              {/* Portrait Image with subtle vertical stripes effect */}
              <div className="w-full md:w-[280px] h-72 sm:h-[340px] rounded-[24px] overflow-hidden shrink-0 relative shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="Client"
                  className="w-full h-full object-cover"
                />
                {/* Thin vertical grid overlay lines matching s13 */}
                <div className="absolute inset-0 grid grid-cols-6 pointer-events-none opacity-25">
                  <div className="border-r border-white/60" />
                  <div className="border-r border-white/60" />
                  <div className="border-r border-white/60" />
                  <div className="border-r border-white/60" />
                  <div className="border-r border-white/60" />
                </div>
              </div>

              {/* Quote & Controls */}
              <div className="flex-1 flex flex-col justify-between h-full space-y-6 sm:space-y-8">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-normal">
                  {current.quote}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  {/* Slider Arrows */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={prev}
                      className="w-10 h-10 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                      aria-label="Previous testimonial"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={next}
                      className="w-10 h-10 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                      aria-label="Next testimonial"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Counter */}
                  <div className="text-sm text-gray-400 font-medium">
                    <span className="text-gray-900 font-bold">{currentIndex + 1}</span>/8
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
