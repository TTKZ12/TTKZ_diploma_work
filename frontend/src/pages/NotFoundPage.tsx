import { Link } from "react-router-dom";
import { PageHeading } from "../components/common/SectionHeading";
import { Icon } from "../components/common/Icon";
export function NotFoundPage() {
  return (
    <div className="container page-shell">
      <PageHeading
        eyebrow="404 · Out of bounds"
        title="LET’S GET BACK TO THE TABLE."
        description="That page or sample record could not be found. Your next game is still waiting."
      />
      <Link to="/" className="button button-lime">
        Back to home <Icon name="arrow" size={17} />
      </Link>
    </div>
  );
}
