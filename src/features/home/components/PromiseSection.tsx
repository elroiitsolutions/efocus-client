import { useEffect, useRef, useState } from "react";

export default function PromiseSection({ embedded = false }: { embedded?: boolean }) {
  const fullText = 'Our Promise: "We help you source the right product—not simply the available product."';
  const [displayedCount, setDisplayedCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      {
        threshold: 0.25,
      }
    );

    const el = containerRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
        setHasStarted(true);
      }
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let currentIdx = 0;

    const typeNextChar = () => {
      if (currentIdx < fullText.length) {
        currentIdx++;
        setDisplayedCount(currentIdx);

        // Natural typing rhythm with micro-delays for punctuation
        const char = fullText[currentIdx - 1];
        let delay = 32;
        if (char === ":") delay = 220;
        else if (char === "—") delay = 180;
        else if (char === " ") delay = 45;
        else if (char === '"') delay = 120;
        else delay = 28 + Math.floor(Math.random() * 20);

        timeoutId = setTimeout(typeNextChar, delay);
      }
    };

    timeoutId = setTimeout(typeNextChar, 180);

    return () => clearTimeout(timeoutId);
  }, [hasStarted, fullText]);

  const displayedText = fullText.slice(0, displayedCount);

  const body = (
    <div
      ref={containerRef}
      className={`w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center ${
        embedded ? "mt-4 sm:mt-6" : ""
      }`}
      id={embedded ? "our-promise" : undefined}
    >
      {/* Live Typing Headline */}
      <div className="min-h-[50px] sm:min-h-[64px] flex items-center justify-center px-2 sm:px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold text-[#111315] tracking-tight leading-snug max-w-4xl">
          {displayedCount <= 12 ? (
            <span className="text-red-600">{displayedText}</span>
          ) : (
            <>
              <span className="text-red-600 mr-2 sm:mr-3">Our Promise:</span>
              <span className="text-[#111315]">{displayedText.slice(13)}</span>
            </>
          )}
        </h2>
      </div>
    </div>
  );

  if (embedded) {
    return body;
  }

  return (
    <section
      className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100/90 relative overflow-hidden"
      id="promise"
    >
      {/* Soft Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.04)_0%,_rgba(255,255,255,0)_70%)]" />
      {body}
    </section>
  );
}
