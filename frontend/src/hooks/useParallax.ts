import { useEffect, useRef } from "react";

/** Migrates Forest's 1000px perspective and center-based mouse rotation.
 * DOM writes are local, one frame at a time, and never trigger React renders.
 */
export function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scene = ref.current;
    if (!scene) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let visible = true;
    let frame = 0;
    let targetX = 0,
      targetY = 0,
      x = 0,
      y = 0;
    let targetScroll = 0,
      scroll = 0;
    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      targetX = targetY = x = y = targetScroll = scroll = 0;
      scene.style.setProperty("--tilt-x", "0deg");
      scene.style.setProperty("--tilt-y", "0deg");
      scene.style.setProperty("--shift-x", "0px");
      scene.style.setProperty("--shift-y", "0px");
      scene.style.setProperty("--scroll-shift", "0px");
    };
    const tick = () => {
      frame = 0;
      if (reduced.matches || !visible || document.hidden) return;
      x += (targetX - x) * 0.07;
      y += (targetY - y) * 0.07;
      scroll += (targetScroll - scroll) * 0.09;
      scene.style.setProperty("--tilt-x", `${(-y * 2).toFixed(3)}deg`);
      scene.style.setProperty("--tilt-y", `${(x * 3).toFixed(3)}deg`);
      scene.style.setProperty("--shift-x", `${(x * 15).toFixed(2)}px`);
      scene.style.setProperty("--shift-y", `${(y * 12).toFixed(2)}px`);
      scene.style.setProperty("--scroll-shift", `${scroll.toFixed(2)}px`);
      if (
        Math.abs(targetX - x) +
          Math.abs(targetY - y) +
          Math.abs(targetScroll - scroll) >
        0.015
      )
        frame = requestAnimationFrame(tick);
    };
    const requestFrame = () => {
      if (!frame && !reduced.matches && visible && !document.hidden)
        frame = requestAnimationFrame(tick);
    };
    const pointer = (event: PointerEvent) => {
      if (!finePointer.matches || reduced.matches || !visible) return;
      const box = scene.getBoundingClientRect();
      targetX = Math.max(
        -1,
        Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1),
      );
      targetY = Math.max(
        -1,
        Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1),
      );
      requestFrame();
    };
    const leave = () => {
      targetX = targetY = 0;
      requestFrame();
    };
    const onScroll = () => {
      if (reduced.matches || !visible) return;
      const box = scene.getBoundingClientRect();
      targetScroll = Math.max(-60, Math.min(90, -box.top * 0.13));
      requestFrame();
    };
    const preferenceChanged = () => {
      clear();
      onScroll();
    };
    const visibilityChanged = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else onScroll();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) onScroll();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    observer.observe(scene);
    scene.addEventListener("pointermove", pointer, { passive: true });
    scene.addEventListener("pointerleave", leave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    reduced.addEventListener("change", preferenceChanged);
    finePointer.addEventListener("change", preferenceChanged);
    document.addEventListener("visibilitychange", visibilityChanged);
    onScroll();
    return () => {
      clear();
      observer.disconnect();
      scene.removeEventListener("pointermove", pointer);
      scene.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", preferenceChanged);
      finePointer.removeEventListener("change", preferenceChanged);
      document.removeEventListener("visibilitychange", visibilityChanged);
    };
  }, []);
  return ref;
}
