import { useEffect } from "react";
import gsap from "gsap";

export default function ScrollAnimations() {
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const listenerCleanups: Array<() => void> = [];

      const context = gsap.context(() => {
        const header = document.querySelector("header");
        const hero = document.querySelector<HTMLElement>("#hero");

        if (reduceMotion) {
          gsap.set("section, header", { clearProps: "all" });
          return;
        }

        if (header) {
          gsap.fromTo(header, { y: -28, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
        }

        if (hero) {
          const heroIntro = hero.children[1]?.firstElementChild;
          const dashboard = hero.children[2];
          const introItems = heroIntro?.querySelectorAll("h1, p, .inline-flex, a");
          const heroTimeline = gsap.timeline({ delay: 0.25 });

          if (heroIntro) heroTimeline.fromTo(heroIntro, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" });
          if (introItems?.length) heroTimeline.fromTo(introItems, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.95, stagger: 0.16, ease: "power3.out" }, "-=0.55");
          if (dashboard) heroTimeline.fromTo(dashboard, { opacity: 0, y: 80, rotateX: 5 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.6, ease: "power3.out" }, "-=0.3");

          if (dashboard) gsap.to(dashboard, { yPercent: -4, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
          if (hero.firstElementChild) gsap.to(hero.firstElementChild, { yPercent: 12, scale: 1.06, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
        }

        gsap.utils.toArray<HTMLElement>("section:not(#hero):not(#faq)").forEach((section) => {
          const content = section.firstElementChild;
          if (!content) return;
          const badge = content.querySelector<HTMLElement>(".nex-badge, .inline-flex");
          const heading = content.querySelector<HTMLElement>("h2");
          const lead = content.querySelector<HTMLElement>("h2 ~ p");
          const cards = content.querySelectorAll<HTMLElement>(".nex-card, [class*='rounded-[32px]'], [class*='rounded-[36px]']");
          const images = content.querySelectorAll<HTMLElement>("img");
          const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 78%", toggleActions: "play none none none" } });

          if (badge) timeline.fromTo(badge, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
          if (heading) timeline.fromTo(heading, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.35");
          if (lead) timeline.fromTo(lead, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }, "-=0.55");
          if (cards.length) timeline.fromTo(cards, { opacity: 0, y: 38, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.95, stagger: 0.16, ease: "power3.out" }, "-=0.35");
          if (images.length) gsap.fromTo(images, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 72%", toggleActions: "play none none none" } });
        });

        gsap.utils.toArray<HTMLElement>(".nex-card").forEach((card) => {
          const onEnter = () => gsap.to(card, { y: -6, duration: 0.55, ease: "power2.out", overwrite: true });
          const onLeave = () => gsap.to(card, { y: 0, duration: 0.7, ease: "power2.out", overwrite: true });
          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);
          listenerCleanups.push(() => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
          });
        });
      });

      cleanup = () => {
        listenerCleanups.forEach((remove) => remove());
        context.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    };

    void init();
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return null;
}
