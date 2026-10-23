import { useEffect, useRef } from "react";
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const update = () => {
      observer?.disconnect();
      if (preference.matches) {
        element.classList.remove("reveal-pending");
        element.classList.add("revealed");
        return;
      }
      element.classList.add("reveal-pending");
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            element.classList.add("revealed");
            observer?.disconnect();
          }
        },
        { threshold: 0.08 },
      );
      observer.observe(element);
    };
    update();
    preference.addEventListener("change", update);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", update);
    };
  }, []);
  return ref;
}
