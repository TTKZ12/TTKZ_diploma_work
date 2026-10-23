import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const titles: Record<string, string> = {
  "/": "Your next game starts here",
  "/halls": "Sports halls",
  "/players": "Find players",
  "/tournaments": "News & tournaments",
  "/about": "About",
  "/contact": "Contact",
  "/login": "Sign in",
  "/register": "Join the community",
};
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = `TTKZ — ${titles[pathname] || document.querySelector("main h1")?.textContent || "Table tennis community"}`;
    if (hash) {
      let id = hash.slice(1);
      try { id = decodeURIComponent(id); } catch { /* Treat malformed hashes as plain IDs. */ }
      document
        .getElementById(id)
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }
  }, [pathname, hash]);
  return null;
}
