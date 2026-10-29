"use client";

import { NexBadge, NexChipIcon } from "@/components/ui/NexIcons";
import Globe from "@/components/ui/Globe";

export default function CTASection() {
  return (
    <section
      className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#f4f6fa]"
      id="cta"
    >
      <div className="w-full max-w-[100rem] mx-auto">

        {/* CTA CARD */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[36px]
            border
            border-gray-100
            bg-white
            shadow-[0_4px_30px_rgba(0,0,0,0.03)]
            py-24
            sm:py-32
            px-6
            sm:px-12
            text-center
          "
        >

          {/* =========================================
              GLOBE BACKGROUND
              z-0 = behind everything
              ========================================= */}
          <div
            className="
              absolute
              inset-0
              z-0
              pointer-events-none
              overflow-hidden
            "
          >
            <div
              className="
                absolute
                left-1/2
                top-[-100px]
                -translate-x-1/2
                w-[750px]
                sm:w-[850px]
                md:w-[950px]
                lg:w-[1050px]
                max-w-none
              "
            >
              <Globe />
            </div>

            {/* Bottom white fade */}
            <div
              className="
                absolute
                left-0
                right-0
                bottom-0
                h-[300px]
                bg-gradient-to-t
                from-white
                via-white/90
                to-transparent
              "
            />
          </div>


          {/* =========================================
              CENTRAL CONTENT
              z-10 = above globe
              ========================================= */}
          <div
            className="
              relative
              z-10
              max-w-3xl
              mx-auto
              space-y-6
            "
          >

            {/* Badge */}
            <NexBadge label="CTA" />


            {/* Heading */}
            <h2
              className="
                text-4xl
                sm:text-5xl
                md:text-6xl
                font-semibold
                text-[#0d0f11]
                tracking-tight
                leading-[1.12]
              "
            >
              Stop doing manual work.
              <br />
              Start automating everything.
            </h2>


            {/* Description */}
            <p
              className="
                text-base
                sm:text-lg
                text-gray-600
                max-w-xl
                mx-auto
                leading-relaxed
                font-normal
              "
            >
              Replace repetitive tasks with smart automation that
              runs in the background, saving time, reducing errors,
              and letting you focus on real growth.
            </p>


            {/* Button */}
            <div className="pt-4 flex justify-center">
              <a
                href="#pricing"
                className="
                  group
                  nex-button-swap
                  inline-flex
                  items-center
                  gap-3
                  bg-[#111315]
                  hover:bg-black
                  text-white
                  pl-2
                  pr-8
                  py-3
                  rounded-full
                  font-medium
                  text-base
                  transition-all
                  shadow-md
                "
              >
                <NexChipIcon />

                <span>
                  Create automation
                </span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}