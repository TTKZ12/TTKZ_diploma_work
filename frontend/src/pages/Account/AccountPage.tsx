import { Link, useLocation } from "react-router-dom";
import { PageHeading } from "../../components/common/SectionHeading";
import { Icon } from "../../components/common/Icon";
const tabs = [
  ["/account", "Overview"],
  ["/account/edit", "Profile settings"],
  ["/account/bookings", "Reservations"],
  ["/account/requests", "Partner requests"],
] as const;
export function AccountPage() {
  const { pathname } = useLocation();
  return (
    <div className="container page-shell">
      <PageHeading
        eyebrow="Your place in the community"
        title="YOUR GAME, ALL IN ONE PLACE."
        description="The account area will bring your player profile, sessions, and partner requests together."
      />
      <div className="account-layout">
        <aside className="account-nav">
          {tabs.map(([to, label]) => (
            <Link to={to} className={pathname === to ? "active" : ""} key={to}>
              {label}
              <Icon name="chevron" size={14} />
            </Link>
          ))}
        </aside>
        <section className="account-status">
          <div className="profile-cover">
            <span>MADE FOR YOUR NEXT GAME.</span>
          </div>
          <div className="account-status-body">
            <span className="sample-pill">
              AUTHENTICATED ACCOUNT · PHASE 3 / 4
            </span>
            <h2>Your account starts with a secure sign-in.</h2>
            <p>
              This route is a layout foundation. Personal profiles, uploads,
              privacy preferences, reservation history, and partner request
              management will be available after server authentication and
              ownership checks are implemented.
            </p>
            <p>
              No demo identity is treated as a signed-in user, and no private
              account data is displayed here.
            </p>
            <Link to="/login" className="text-link">
              View the sign-in design <Icon name="arrow" size={17} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
