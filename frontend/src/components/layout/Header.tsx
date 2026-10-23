import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Icon, PaddleMark } from "../common/Icon";
const links = [
  ["/", "Home"],
  ["/halls", "Sports halls"],
  ["/tournaments", "News & tournaments"],
  ["/players", "Find players"],
  ["/about", "About"],
  ["/contact", "Contact"],
] as const;
export function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const closeOutside = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <header ref={ref} className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="TTKZ home">
          <PaddleMark />
          <strong>
            TT<span>KZ</span>
          </strong>
        </Link>
        <nav
          id="primary-navigation"
          aria-label="Main navigation"
          className={open ? "primary-nav is-open" : "primary-nav"}
        >
          {links.map(([path, label]) => (
            <NavLink to={path} end={path === "/"} key={path}>
              {label}
            </NavLink>
          ))}
          <Link to="/login" className="mobile-login">
            Sign in <Icon name="arrow" size={16} />
          </Link>
        </nav>
        <Link to="/login" className="header-login">
          Sign in <Icon name="arrow" size={16} />
        </Link>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
