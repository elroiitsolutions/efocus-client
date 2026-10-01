"use client";

import { bentoItems } from "@/lib/constants";

export default function BentoGrid() {
  return (
    <section className="py-24 px-4 relative" id="bento">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
            <span className="text-sm font-medium text-secondary">Capabilities</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Built for{" "}
            <span className="gradient-text">Modern Teams</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Explore the powerful capabilities that make eFocus the preferred choice for forward-thinking teams.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]">
          {bentoItems.map((item, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border border-border bg-card-bg p-6 overflow-hidden group cursor-default transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary-glow/5 ${
                item.size === "large" ? "lg:col-span-2" : ""
              }`}
              id={`bento-item-${i}`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {item.description}
                  </p>
                </div>

                {/* Visual Element */}
                {i === 0 && (
                  <div className="mt-4 flex items-end gap-1.5 h-28">
                    {[35, 55, 40, 70, 50, 85, 65, 90, 55, 75, 60, 80].map((h, j) => (
                      <div
                        key={j}
                        className="flex-1 rounded-t bg-gradient-to-t from-violet-500/50 to-cyan-400/50 transition-all duration-700 group-hover:from-violet-500/80 group-hover:to-cyan-400/80"
                        style={{ height: `${h}%`, transitionDelay: `${j * 50}ms` }}
                      />
                    ))}
                  </div>
                )}

                {i === 1 && (
                  <div className="mt-4 relative h-28 flex items-center justify-center">
                    <div className="relative">
                      {[0, 1, 2].map((ring) => (
                        <div
                          key={ring}
                          className="absolute rounded-full border border-primary/20 group-hover:border-primary/40 transition-all duration-1000"
                          style={{
                            width: `${(ring + 1) * 60}px`,
                            height: `${(ring + 1) * 60}px`,
                            top: `${-((ring + 1) * 30 - 15)}px`,
                            left: `${-((ring + 1) * 30 - 15)}px`,
                            animationDuration: `${(ring + 1) * 5}s`,
                          }}
                        />
                      ))}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {i === 2 && (
                  <div className="mt-auto flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[0, 1, 2].map((j) => (
                        <div key={j} className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-card-bg flex items-center justify-center text-[10px] text-white font-bold">
                          {["SC", "MJ", "ER"][j]}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-text-muted">3 online</span>
                    </div>
                  </div>
                )}

                {i === 3 && (
                  <div className="mt-auto">
                    <div className="text-4xl font-bold gradient-text">99.99%</div>
                    <div className="w-full h-2 bg-surface rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" style={{ width: "99.99%" }} />
                    </div>
                  </div>
                )}

                {i === 4 && (
                  <div className="mt-auto flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-amber-500/20">
                      <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-text-secondary">SOC 2 Type II Certified</span>
                  </div>
                )}

                {i === 5 && (
                  <div className="mt-auto flex gap-2">
                    <div className="w-16 h-28 rounded-xl border border-border bg-surface/50 p-1.5 flex flex-col gap-1">
                      <div className="h-2 w-full rounded bg-primary/30" />
                      <div className="h-2 w-3/4 rounded bg-secondary/30" />
                      <div className="flex-1 rounded bg-gradient-to-b from-primary/10 to-secondary/10" />
                    </div>
                    <div className="w-16 h-28 rounded-xl border border-border bg-surface/50 p-1.5 flex flex-col gap-1">
                      <div className="h-2 w-full rounded bg-accent-pink/30" />
                      <div className="h-2 w-2/3 rounded bg-primary/30" />
                      <div className="flex-1 rounded bg-gradient-to-b from-accent-pink/10 to-primary/10" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
