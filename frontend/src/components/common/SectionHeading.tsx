import { Link } from "react-router-dom";
import { Icon } from "./Icon";
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  link?: string;
  linkLabel?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {link && (
        <Link to={link} className="text-link">
          {linkLabel}
          <Icon name="arrow" size={17} />
        </Link>
      )}
    </div>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
export function PreviewNote({ children }: { children?: React.ReactNode }) {
  return (
    <p className="preview-note">
      <span className="preview-dot" />
      {children ||
        "Design preview · All venues, people and events are fictional demonstration content."}
    </p>
  );
}
