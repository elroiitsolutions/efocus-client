import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
    ScrollTrigger?: {
      update: () => void;
      refresh: () => void;
    };
  }
}

// In-memory cache for ultra-fast lookup, backed by sessionStorage for refresh persistence
const scrollPositions = new Map<string, number>();

function getStorageKey(id: string) {
  return `efocus_scroll_${id}`;
}

function savePosition(key: string, pathname: string, search: string, y: number) {
  if (typeof y !== "number" || isNaN(y) || y < 0) return;
  const rounded = Math.round(y);
  const pathKey = `${pathname}${search}`;

  if (key) {
    scrollPositions.set(key, rounded);
    try {
      sessionStorage.setItem(getStorageKey(key), String(rounded));
    } catch {}
  }

  scrollPositions.set(pathKey, rounded);
  try {
    sessionStorage.setItem(getStorageKey(pathKey), String(rounded));
  } catch {}
}

function getSavedPosition(key: string, pathname: string, search: string): number {
  if (key && scrollPositions.has(key)) {
    return scrollPositions.get(key)!;
  }
  if (key) {
    const val = sessionStorage.getItem(getStorageKey(key));
    if (val !== null) {
      const parsed = parseFloat(val);
      if (!isNaN(parsed)) return parsed;
    }
  }

  const pathKey = `${pathname}${search}`;
  if (scrollPositions.has(pathKey)) {
    return scrollPositions.get(pathKey)!;
  }
  const valPath = sessionStorage.getItem(getStorageKey(pathKey));
  if (valPath !== null) {
    const parsed = parseFloat(valPath);
    if (!isNaN(parsed)) return parsed;
  }

  return 0;
}

export default function SmoothScroll() {
  const location = useLocation();
  const navigationType = useNavigationType();

  // Track the current scroll position and previous location for seamless saves
  const currentScrollYRef = useRef(0);
  const prevLocationRef = useRef<{ key: string; pathname: string; search: string }>({
    key: location.key,
    pathname: location.pathname,
    search: location.search,
  });

  // 1. Initialize Lenis smooth momentum scroll engine
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoResize: true,
    });

    window.__lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger if registered
    lenis.on("scroll", () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.update();
      }
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // 2. Continuously record scroll position for the current location
  useEffect(() => {
    const handleScroll = () => {
      const y = window.__lenis?.scroll ?? window.scrollY;
      currentScrollYRef.current = y;
      savePosition(location.key, location.pathname, location.search, y);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.key, location.pathname, location.search]);

  // 3. Route change handling: Scroll to top on PUSH/REPLACE, restore on POP (Back/Forward)
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Save previous page position before transitioning
    const prev = prevLocationRef.current;
    if (prev.key !== location.key || prev.pathname !== location.pathname || prev.search !== location.search) {
      savePosition(prev.key, prev.pathname, prev.search, currentScrollYRef.current);
      prevLocationRef.current = {
        key: location.key,
        pathname: location.pathname,
        search: location.search,
      };
    }

    // A. Hash navigation (e.g., /#faq)
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

    const scrollToPos = (y: number, immediate = true) => {
      if (window.__lenis) {
        window.__lenis.scrollTo(y, { immediate, force: true });
        if (window.__lenis.dimensions) {
          window.__lenis.dimensions.resize();
        }
      }
      window.scrollTo(0, y);
      document.documentElement.scrollTop = y;
      document.body.scrollTop = y;
      currentScrollYRef.current = y;
    };

    // B. Back / Forward button navigation (POP): Restore position
    if (navigationType === "POP") {
      const targetY = getSavedPosition(location.key, location.pathname, location.search);
      scrollToPos(targetY, true);

      // Edge case: In dynamic SPAs, DOM height can expand after paint (images/lazy components).
      // We run a short resilient verification loop until height is reached or user manually scrolls.
      let userInteracted = false;
      const onUserInteraction = () => {
        userInteracted = true;
      };

      const interactionEvents = ["wheel", "touchstart", "pointerdown", "keydown"];
      interactionEvents.forEach((evt) => {
        window.addEventListener(evt, onUserInteraction, { passive: true, once: true });
      });

      let attempts = 0;
      const maxAttempts = 12; // ~600ms total check window
      let timer: ReturnType<typeof setTimeout>;

      const checkAndReapply = () => {
        if (userInteracted) {
          cleanup();
          return;
        }

        attempts++;
        const current = window.__lenis?.scroll ?? window.scrollY;

        // If page has expanded or scroll clamped early, re-apply
        if (Math.abs(current - targetY) > 8) {
          scrollToPos(targetY, true);
        }

        if (attempts < maxAttempts) {
          const delay = attempts < 4 ? 30 : 70;
          timer = setTimeout(checkAndReapply, delay);
        } else {
          cleanup();
        }
      };

      const cleanup = () => {
        clearTimeout(timer);
        interactionEvents.forEach((evt) => {
          window.removeEventListener(evt, onUserInteraction);
        });
      };

      requestAnimationFrame(checkAndReapply);

      return () => {
        cleanup();
      };
    }

    // C. Forward / Normal link navigation (PUSH / REPLACE): Scroll to top
    scrollToPos(0, true);

    const rafId = requestAnimationFrame(() => {
      scrollToPos(0, true);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [location.pathname, location.search, location.hash, location.key, navigationType]);

  return null;
}
