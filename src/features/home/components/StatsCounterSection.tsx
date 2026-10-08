"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "@/components/ui/CountUp";

export default function StatsCounterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: 90,
      suffix: "%",
      label: "Client Satisfaction",
      delay: "80ms",
      fromSide: "-translate-x-12 sm:-translate-x-20",
    },
    {
      value: 10,
      suffix: "M+",
      label: "automated workflows",
      delay: "180ms",
      fromSide: "translate-y-8 scale-95",
    },
    {
      value: 90,
      suffix: "%",
      label: "Client Satisfaction",
      delay: "280ms",
      fromSide: "translate-x-12 sm:translate-x-20",
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      aria-label="Performance Metrics"
      className="w-full py-4 sm:py-5 bg-[#fbfcfd] border-t border-gray-200/70 relative overflow-hidden select-none"
    >
      <div className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3 Pure Text Metrics Sliding from Sides to Center */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 md:gap-14 lg:gap-16 max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                transitionDelay: stat.delay,
              }}
              className={`flex items-baseline gap-2 sm:gap-2.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default select-none group ${
                hasEntered
                  ? "opacity-100 translate-x-0 translate-y-0 scale-100 filter-none"
                  : `opacity-0 ${stat.fromSide} blur-[4px]`
              }`}
            >
              <span className="text-2xl sm:text-3xl font-extrabold text-[#AF0202] tracking-tight leading-none font-sans transition-colors">
                {hasEntered ? (
                  <CountUp value={stat.value} suffix={stat.suffix} duration={1800} />
                ) : (
                  `0${stat.suffix}`
                )}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

