"use client";

import { useState } from "react";
import { NexBadge, NexChipIcon } from "@/components/ui/NexIcons";

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    {
      num: "01",
      title: "Connect Apps",
      desc: "Integrate your essential workspace software with secure one-click authorization.",
      feature1: "Instant OAuth Sync",
      feature1Desc: "Authenticate your tools in seconds with bank-grade security protocols.",
      feature2: "Automatic Schema Detection",
      feature2Desc: "Smart discovery scans your fields, tables, and endpoints automatically.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
      profit: "78.2%",
    },
    {
      num: "02",
      title: "Build flows",
      desc: "Combine your connected apps into clear, repeatable automation in a few simple steps.",
      feature1: "Drag And Drop Builder",
      feature1Desc: "Arrange triggers and actions visually with zero coding effort.",
      feature2: "Reusable Templates",
      feature2Desc: "Start from prebuilt flows and customize them in minutes.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
      profit: "85.4%",
    },
    {
      num: "03",
      title: "Test & Monitor",
      desc: "Run live simulations and review execution logs before publishing to production.",
      feature1: "Real-time Sandbox",
      feature1Desc: "Verify sample payloads and catch potential exceptions before launch.",
      feature2: "Smart Alerting",
      feature2Desc: "Receive immediate notifications on Slack or email when thresholds break.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
      profit: "91.8%",
    },
    {
      num: "04",
      title: "Scale Autopilot",
      desc: "Allow your operations to run continuously without manual bottlenecks or maintenance.",
      feature1: "High Volume Throughput",
      feature1Desc: "Process millions of events with zero latency and high availability.",
      feature2: "Team Collaboration",
      feature2Desc: "Share workflows and invite teammates with custom role permissions.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
      profit: "96.5%",
    },
  ];

  const current = steps.find((s) => parseInt(s.num) === activeStep) || steps[1];

  return (
    <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd]" id="process">
      <div className="w-full max-w-[100rem] mx-auto">
        
        {/* Section Header (Split Layout matching s6.png) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-16">
          <div className="md:col-span-7">
            <NexBadge label="Process" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0d0f11] tracking-tight leading-[1.15] mt-5">
              From setup to scale — in 4 simple steps
            </h2>
          </div>
          <div className="md:col-span-5 flex flex-col justify-between">
            <p className="text-base text-gray-600 leading-relaxed">
              Follow a guided, step-by-step flow that keeps everything clear and organized from the beginning.
            </p>
            <div className="mt-6">
              <a
                href="#pricing"
                className="nex-button-swap inline-flex items-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 text-[#111315] pl-2 pr-6 py-2 rounded-full font-medium text-sm transition-all shadow-xs"
              >
                <NexChipIcon />
                <span>View all process</span>
              </a>
            </div>
          </div>
        </div>

        {/* Step Container + Vertical Stepper (matching s7.png) */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          {/* Main Step Card */}
          <div className="flex-1 w-full bg-white border border-gray-200/90 rounded-[32px] p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Photo with Frosted Profit Overlay */}
              <div className="md:col-span-6 relative">
                <div className="relative rounded-[24px] overflow-hidden h-[340px] sm:h-[400px]">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Frosted Glass Overlay Card */}
                  <div className="absolute inset-x-4 bottom-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl p-4 text-white shadow-lg">
                    <div className="text-[11px] font-medium text-white/80">Profit</div>
                    <div className="text-2xl font-bold tracking-tight mb-2">{current.profit}</div>
                    
                    {/* Wavy Graph Line */}
                    <div className="h-10 w-full mb-3">
                      <svg className="w-full h-full" viewBox="0 0 200 40" fill="none">
                        <path
                          d="M0 30 Q 30 30, 45 10 T 90 28 T 130 5 T 170 18 T 200 12"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    {/* Stacked Avatars */}
                    <div className="flex -space-x-2">
                      <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=80" alt="" />
                      <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=80" alt="" />
                      <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&q=80" alt="" />
                      <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&q=80" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="md:col-span-6 space-y-6">
                <div>
                  <h3 className="text-3xl font-semibold text-[#0d0f11] tracking-tight mb-2">
                    {current.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {current.desc}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">
                      {current.feature1}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mt-0.5">
                      {current.feature1Desc}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-gray-900">
                      {current.feature2}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mt-0.5">
                      {current.feature2Desc}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Vertical Step Markers (01, 02, 03, 04) */}
          <div className="flex lg:flex-col items-center justify-center gap-6 lg:gap-8 shrink-0 py-4">
            {steps.map((step) => {
              const isSelected = parseInt(step.num) === activeStep;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(parseInt(step.num))}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-[#7c3aed] text-white shadow-md scale-110"
                      : "bg-white border border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {step.num}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
