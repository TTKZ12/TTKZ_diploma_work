import { Link, useLocation } from "react-router-dom";
import { Eyebrow } from "../../components/common/SectionHeading";
export function AuthPage() {
  const { pathname } = useLocation();
  const register = pathname === "/register",
    forgot = pathname === "/forgot-password";
  return (
    <section className="auth-section">
      <div className="auth-background" />
      <div className="auth-intro">
        <Eyebrow>Your game. Your community.</Eyebrow>
        <h1>
          MORE THAN
          <br />
          <em>A GAME.</em>
        </h1>
        <p>
          A place to find your table.
          <br />
          And the people on the other side.
        </p>
      </div>
      <div className="glass-form auth-form">
        <Link to="/" className="back-link">
          ← Back to TTKZ
        </Link>
        <Eyebrow>
          {register
            ? "Join the community"
            : forgot
              ? "Find your way back"
              : "Welcome back"}
        </Eyebrow>
        <h2>
          {register
            ? "Create your account."
            : forgot
              ? "Reset your password."
              : "Good to see you."}
        </h2>
        <div className="integration-note">
          <strong>Authentication is not connected yet.</strong>
          <p>
            The original glass panel and floating-label design are preserved
            here. Real registration, login, and configured reset email belong to
            the FastAPI authentication phase.
          </p>
        </div>
        <form aria-label="Authentication layout preview">
          <fieldset disabled>
            {register && (
              <label className="floating-field">
                <input placeholder=" " autoComplete="nickname" />
                <span>Display name</span>
              </label>
            )}
            <label className="floating-field">
              <input type="email" placeholder=" " autoComplete="email" />
              <span>Email address</span>
            </label>
            {!forgot && (
              <label className="floating-field">
                <input
                  type="password"
                  placeholder=" "
                  autoComplete={register ? "new-password" : "current-password"}
                />
                <span>Password</span>
              </label>
            )}
            {register && (
              <label className="floating-field">
                <input
                  type="password"
                  placeholder=" "
                  autoComplete="new-password"
                />
                <span>Confirm password</span>
              </label>
            )}
          </fieldset>
        </form>
        {!register && !forgot && (
          <Link to="/forgot-password" className="auth-text-link">
            Forgot password?
          </Link>
        )}
        <p className="auth-switch">
          {register
            ? "Already part of the community?"
            : "New to the community?"}{" "}
          <Link to={register ? "/login" : "/register"}>
            {register ? "Sign in layout" : "Create account layout"}
          </Link>
        </p>
        <p className="fine-print">
          Preview only. Credentials are not collected or stored.
        </p>
      </div>
    </section>
  );
}
