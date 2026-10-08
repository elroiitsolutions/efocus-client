import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  const location = useLocation();

  // Initialize Lenis smooth momentum scroll engine
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handlePopState = () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    };
    window.addEventListener("popstate", handlePopState);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoResize: true,
    });

    window.__lenis = lenis;

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Synchronous reset before paint
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        if (window.__lenis) {
          window.__lenis.scrollTo(target as HTMLElement, { immediate: true, force: true });
        } else {
          target.scrollIntoView();
        }
        return;
      }
    }

    const resetToTop = () => {
      if (window.__lenis) {
        window.__lenis.stop();
        window.__lenis.scrollTo(0, { immediate: true, force: true });
        if (window.__lenis.dimensions) {
          window.__lenis.dimensions.resize();
        }
        window.__lenis.start();
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetToTop();
  }, [location.pathname, location.search, location.hash]);

  // Asynchronous verification in RAF and timeouts to counter dynamic query rendering
  useEffect(() => {
    if (location.hash) return;

    const resetToTop = () => {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true, force: true });
        if (window.__lenis.dimensions) {
          window.__lenis.dimensions.resize();
        }
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetToTop();

    const rafId = requestAnimationFrame(() => {
      resetToTop();
      requestAnimationFrame(resetToTop);
    });

    const t1 = setTimeout(resetToTop, 50);
    const t2 = setTimeout(resetToTop, 150);
    const t3 = setTimeout(resetToTop, 350);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [location.pathname, location.search, location.hash]);

  return null;
}


