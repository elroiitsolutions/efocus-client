"use client";

import { NexBadge, NexChipIcon } from "@/components/ui/NexIcons";

export default function FeaturesSection() {
  return (
    <section className="w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#f4f6fa]" id="features">
      <div className="w-full max-w-[100rem] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <NexBadge label="Features" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0d0f11] tracking-tight mt-5 mb-4">
            Real results teams experience
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            From faster workflows to improved collaboration, every feature is designed to deliver real, trackable results that teams can rely on every day.
          </p>
          <a
            href="#pricing"
            className="nex-button-swap inline-flex items-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 text-[#111315] pl-2 pr-6 py-2 rounded-full font-medium text-sm transition-all shadow-xs"
          >
            <NexChipIcon />
            <span>View all features</span>
          </a>
        </div>

        {/* 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1: App Integrations (matching s4.png & s5.png) */}
          <div className="nex-card p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0d0f11] tracking-tight mb-2">
                App integrations
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                Connect all your favorite tools in one place and automate workflows.
              </p>
            </div>

            {/* Tree Diagram Visual */}
            <div className="relative pt-4 pb-2 flex flex-col items-center w-full max-w-[320px] mx-auto">
              {/* Top Central Hub Node */}
              <div className="w-14 h-14 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center relative z-10">
                <div className="w-9 h-9 rounded-full bg-[#7c3aed] flex items-center justify-center text-white">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                    <circle cx="5" cy="5" r="1.3" />
                    <circle cx="9" cy="8" r="1.3" />
                    <circle cx="5" cy="11" r="1.3" />
                  </svg>
                </div>
              </div>

              {/* Connecting Tree Lines SVG */}
              <svg className="w-full h-16 text-gray-200 my-1" viewBox="0 0 320 60" fill="none">
                <path d="M160 0 v16 C160 36, 40 24, 40 60" stroke="#cbd5e1" strokeWidth="1.5" />
                <path d="M160 0 v16 C160 36, 120 24, 120 60" stroke="#cbd5e1" strokeWidth="1.5" />
                <path d="M160 0 v16 C160 36, 200 24, 200 60" stroke="#cbd5e1" strokeWidth="1.5" />
                <path d="M160 0 v16 C160 36, 280 24, 280 60" stroke="#cbd5e1" strokeWidth="1.5" />
              </svg>

              {/* Connected Apps Row (Precisely centered under each line branch) */}
              <div className="grid grid-cols-4 w-full">
                {/* Figma */}
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:scale-105 transition-transform">
                    <svg className="w-6 h-6" viewBox="0 0 38 57" fill="none">
                      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
                      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
                      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
                      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
                      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
                    </svg>
                  </div>
                </div>

                {/* Google */}
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:scale-105 transition-transform">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </div>
                </div>

                {/* Edge/Browser */}
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" fill="#0284c7" />
                      <path d="M12 6a6 6 0 100 12 6 6 0 000-12z" fill="#38bdf8" />
                    </svg>
                  </div>
                </div>

                {/* Slack */}
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:scale-105 transition-transform">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"/>
                      <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"/>
                      <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"/>
                      <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Smart Conditions (matching s5.png) */}
          <div className="nex-card p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0d0f11] tracking-tight mb-2">
                Smart conditions
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Automatically control when and how workflows run.
              </p>
            </div>

            {/* Vertical Bar Chart */}
            <div className="bg-[#fafbfd] border border-gray-100 rounded-2xl p-4 sm:p-6 overflow-x-auto">
              <div className="text-[10px] text-gray-400 font-mono mb-1">
                - - - 500
              </div>
              <div className="flex items-end justify-between min-w-[280px] h-44 pt-2 px-1 border-b border-gray-200">
                {/* Y Axis Guide numbers */}
                <div className="text-[10px] text-gray-400 flex flex-col justify-between h-full -ml-1 pb-1">
                  <span>400</span>
                  <span>300</span>
                  <span>200</span>
                  <span>100</span>
                </div>

                {/* July */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1 sm:gap-1.5 h-36">
                    <div className="w-1.5 rounded-full bg-[#8b5cf6]/40 h-16" />
                    <div className="w-1.5 rounded-full bg-[#7c3aed] h-28" />
                    <div className="w-1.5 rounded-full bg-[#8b5cf6]/60 h-24" />
                    <div className="w-1.5 rounded-full bg-[#a78bfa] h-20" />
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">July</span>
                </div>

                {/* August */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1 sm:gap-1.5 h-36">
                    <div className="w-1.5 rounded-full bg-[#8b5cf6]/40 h-20" />
                    <div className="w-1.5 rounded-full bg-[#7c3aed] h-36" />
                    <div className="w-1.5 rounded-full bg-[#8b5cf6]/60 h-28" />
                    <div className="w-1.5 rounded-full bg-[#a78bfa] h-32" />
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">August</span>
                </div>

                {/* September */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1 sm:gap-1.5 h-36">
                    <div className="w-1.5 rounded-full bg-[#8b5cf6]/40 h-14" />
                    <div className="w-1.5 rounded-full bg-[#7c3aed] h-24" />
                    <div className="w-1.5 rounded-full bg-[#8b5cf6]/60 h-30" />
                    <div className="w-1.5 rounded-full bg-[#a78bfa] h-26" />
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">September</span>
                </div>

                {/* October */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1 sm:gap-1.5 h-36">
                    <div className="w-1.5 rounded-full bg-[#8b5cf6]/40 h-22" />
                    <div className="w-1.5 rounded-full bg-[#7c3aed] h-34" />
                    <div className="w-1.5 rounded-full bg-[#8b5cf6]/60 h-20" />
                    <div className="w-1.5 rounded-full bg-[#a78bfa] h-26" />
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">October</span>
                </div>

                {/* November */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1 sm:gap-1.5 h-36">
                    <div className="w-1.5 rounded-full bg-[#8b5cf6]/40 h-18" />
                    <div className="w-1.5 rounded-full bg-[#7c3aed] h-32" />
                    <div className="w-1.5 rounded-full bg-[#8b5cf6]/60 h-28" />
                    <div className="w-1.5 rounded-full bg-[#a78bfa] h-24" />
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">November</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Real-Time Triggers (matching s5.png & s6.png) */}
          <div className="nex-card p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0d0f11] tracking-tight mb-2">
                Real-time triggers
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Real-time triggers enable your workflows to respond instantly.
              </p>
            </div>

            {/* Donut Chart Visual */}
            <div className="bg-[#fafbfd] border border-gray-100 rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-gray-800">Visitors Analytics</span>
                <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer">
                  Monthly ▾
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
                {/* Donut */}
                <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" stroke="#f1f3f7" strokeWidth="12" fill="none" />
                    <circle cx="50" cy="50" r="38" stroke="#7c3aed" strokeWidth="12" strokeDasharray="160 240" fill="none" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-lg font-bold text-gray-900 leading-none">2548</span>
                    <span className="text-[11px] text-gray-400 mt-0.5">Visitors</span>
                  </div>
                  {/* Purple badge on arc */}
                  <div className="absolute left-1 bottom-1 bg-[#7c3aed] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                    65%
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-2 text-xs w-full sm:w-auto">
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#7c3aed]" />
                      <span className="text-gray-500">Desktop</span>
                    </div>
                    <span className="font-semibold text-gray-900">65%</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#a78bfa]" />
                      <span className="text-gray-500">Tablet</span>
                    </div>
                    <span className="font-semibold text-gray-900">34%</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#c4b5fd]" />
                      <span className="text-gray-500">Mobile</span>
                    </div>
                    <span className="font-semibold text-gray-900">45%</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#e9d5ff]" />
                      <span className="text-gray-500">Unknow</span>
                    </div>
                    <span className="font-semibold text-gray-900">12%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Multi-step Automation (matching s5.png & s6.png) */}
          <div className="nex-card p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0d0f11] tracking-tight mb-2">
                Multi-step automation
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Lets you chain multiple actions into a single seamless workflow.
              </p>
            </div>

            {/* Credit limit & target card */}
            <div className="bg-[#fafbfd] border border-gray-100 rounded-2xl p-4 sm:p-6 space-y-4">
              
              {/* Credit Limit Card + Zero Fees cursor */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs flex-1">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Credit limit</span>
                    <span className="text-base font-bold text-gray-900">$ 80,224</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#bbf451] rounded-full w-[48%]" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700">48%</span>
                  </div>
                </div>

                {/* Zero fees pill with pointing cursor */}
                <div className="flex items-center gap-1.5 self-center sm:self-auto shrink-0">
                  <svg className="w-4 h-4 text-black drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                  </svg>
                  <div className="bg-[#7c3aed] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm">
                    Zero fees
                  </div>
                </div>
              </div>

              {/* Instant transfers badge & Investment target */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {/* Instant transfers badge */}
                <div className="bg-[#fde047] text-black text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                  <span>Instant transfers</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                  </svg>
                </div>

                {/* Investment target card */}
                <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-xs text-right ml-auto">
                  <div className="text-[10px] text-gray-400">Investment target</div>
                  <div className="text-base font-bold text-gray-900">76%</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
