import { useEffect } from "react";
import type LenisType from "lenis";

declare global {
  interface Window {
    __lenis?: LenisType;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    let lenis: LenisType | null = null;
    let frame = 0;

    const init = async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        duration: 1.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      window.__lenis = lenis;

      function raf(time: number) {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    init();

    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
