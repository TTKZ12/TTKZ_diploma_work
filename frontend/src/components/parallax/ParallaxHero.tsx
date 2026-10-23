import { Link } from "react-router-dom";
import { useParallax } from "../../hooks/useParallax";
import { Icon } from "../common/Icon";
import { Eyebrow } from "../common/SectionHeading";
import "./parallax.css";
export function ParallaxHero() {
  const ref = useParallax();
  return (
    <section className="hero-section" aria-label="Welcome to TTKZ">
      <div ref={ref} className="parallax-scene" data-parallax-scene>
        <div className="scene-depth" aria-hidden="true">
          <div
            className="scene-architecture scene-layer"
            data-depth="background"
          />
          <div className="scene-photo scene-layer" data-depth="arena" />
          <div className="scene-shade" />
          <div className="scene-court-line scene-layer" data-depth="middle" />
          <div className="scene-paddle scene-layer" data-depth="foreground">
            <svg viewBox="0 0 200 280">
              <defs>
                <linearGradient id="paddle-face" x2="1" y2="1">
                  <stop stopColor="#c4d879" />
                  <stop offset="1" stopColor="#6b793a" />
                </linearGradient>
              </defs>
              <path d="m90 188-36 78" stroke="#b69d7b" strokeWidth="25" />
              <path d="m90 188-36 78" stroke="#dbc6a5" strokeWidth="8" />
              <ellipse
                cx="108"
                cy="107"
                rx="76"
                ry="98"
                transform="rotate(24 108 107)"
                fill="#d7bc94"
              />
              <ellipse
                cx="109"
                cy="103"
                rx="72"
                ry="94"
                transform="rotate(24 109 103)"
                fill="url(#paddle-face)"
              />
              <ellipse
                cx="109"
                cy="103"
                rx="64"
                ry="86"
                transform="rotate(24 109 103)"
                fill="none"
                stroke="#d1df9d"
                strokeOpacity=".25"
              />
            </svg>
          </div>
          <div className="scene-ball scene-layer" data-depth="ball" />
        </div>
      </div>
      <div className="container hero-content">
        <Eyebrow>Table tennis. All together.</Eyebrow>
        <h1>
          PLAY MORE.
          <br />
          COMPETE BETTER.
          <br />
          <em>CONNECT.</em>
        </h1>
        <p>
          Your table. Your people. Your next great game.
          <br className="desktop-break" /> A new home for Kazakhstan’s table
          tennis community.
        </p>
        <div className="hero-actions">
          <Link to="/halls" className="button button-lime">
            Book a Hall <Icon name="arrow" size={18} />
          </Link>
          <Link to="/players" className="button button-ghost">
            Find Players <Icon name="users" size={17} />
          </Link>
        </div>
        <div className="hero-location">
          <span className="pulse-dot" />
          <span>From Astana. For every player in Kazakhstan.</span>
        </div>
      </div>
      <div className="container hero-bottom">
        <a href="#discover" className="scroll-cue">
          <span className="scroll-track">
            <i />
          </span>
          EXPLORE THE PLATFORM
        </a>
        <span className="hero-note">ONE TABLE. ENDLESS POSSIBILITIES.</span>
        <span className="hero-number">
          01 <span>/ 04</span>
        </span>
      </div>
    </section>
  );
}
