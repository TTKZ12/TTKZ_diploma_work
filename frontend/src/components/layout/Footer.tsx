import { Link } from "react-router-dom";
import { PaddleMark, Icon } from "../common/Icon";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link to="/" className="brand">
              <PaddleMark />
              <strong>
                TT<span>KZ</span>
              </strong>
            </Link>
            <p>
              A shared home for table tennis
              <br />
              in Kazakhstan.
            </p>
          </div>
          <div>
            <span className="footer-label">GET IN THE GAME</span>
            <Link to="/halls">Find a sports hall</Link>
            <Link to="/players">Find a playing partner</Link>
            <Link to="/tournaments">News & tournaments</Link>
          </div>
          <div>
            <span className="footer-label">THE PLATFORM</span>
            <Link to="/about">About TTKZ</Link>
            <Link to="/contact">Get in touch</Link>
            <Link to="/login">Your account</Link>
          </div>
          <div className="footer-invitation">
            <span className="footer-label">ONE SPORT. MORE CONNECTIONS.</span>
            <p>
              Your next great game
              <br />
              starts with showing up.
            </p>
            <Link to="/halls" className="text-link">
              Find your table <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>TTKZ · University diploma project</span>
          <span>Frontend design preview · Sample content</span>
          <span>
            Made for Kazakhstan <span className="flag-dot" />
          </span>
        </div>
      </div>
    </footer>
  );
}
