import { NexBadge, NexChipIcon } from "@/components/ui/NexIcons";
import CountUp from "@/components/ui/CountUp";

export default function AboutUsSection() {
  return (
    <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd]" id="about">
      <div className="w-full max-w-[100rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Tall Portrait Image Card */}
          <div className="lg:col-span-4">
            <div className="relative rounded-[32px] overflow-hidden shadow-md h-[440px] sm:h-[500px] lg:h-[580px] w-full">
              <img
                src="/images/team.png"
                alt="eFocus Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Area: Content + Stats + Bottom Image Card */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-10">
            
            {/* Top row: Headline & Badge on left, Description & CTA on right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7">
                <NexBadge label="About Us" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0d0f11] tracking-tight leading-[1.15] mt-5">
                  The team behind smarter automation
                </h2>
              </div>
              <div className="md:col-span-5 flex flex-col justify-between">
                <p className="text-base text-gray-600 leading-relaxed">
                  We created this platform to solve one simple problem — too much time is wasted on repetitive work.
                </p>
                <div className="mt-6">
                  <a
                    href="#features"
                    className="nex-button-swap inline-flex items-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 text-[#111315] pl-2 pr-6 py-2 rounded-full font-medium text-sm transition-all shadow-xs"
                  >
                    <NexChipIcon />
                    <span>Learn more</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Row: Stats & Horizontal Image Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              {/* Stats */}
              <div className="md:col-span-5 grid grid-cols-2 gap-y-8 gap-x-4">
                <div>
                  <div className="text-3xl sm:text-4xl font-semibold text-[#0d0f11] tracking-tight">
                    <CountUp value={90} suffix="%" />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
                    Client Satisfaction
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-semibold text-[#0d0f11] tracking-tight">
                    <CountUp value={10} suffix="M+" />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
                    automated workflows
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl sm:text-4xl font-semibold text-[#0d0f11] tracking-tight">
                      <CountUp value={4.9} decimals={1} />
                    </span>
                    <span className="text-xl text-[#7c3aed]">★</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
                    user rating
                  </div>
                </div>
              </div>

              {/* Horizontal Image Card */}
              <div className="md:col-span-7">
                <div className="relative rounded-[28px] overflow-hidden shadow-sm h-64 w-full">
                  <img
                    src="/images/istockphoto-540092970-612x612.jpg"
                    alt="eFocus Facilities"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
