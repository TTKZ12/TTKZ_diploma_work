import { PageHeading, Eyebrow } from "../../components/common/SectionHeading";
import { Icon } from "../../components/common/Icon";
export function ContactPage() {
  const email = import.meta.env.VITE_CONTACT_EMAIL?.trim();
  return (
    <div className="container page-shell">
      <PageHeading
        eyebrow="Let’s keep the conversation going"
        title="GOOD IDEAS START TOGETHER."
        description="Questions about the concept? Ideas for a better playing experience? There’s room for both."
      />
      <div className="contact-layout">
        <div className="prose">
          <Eyebrow>Get in touch</Eyebrow>
          <h2>
            Your perspective
            <br />
            belongs at the table.
          </h2>
          <p>
            TTKZ is being developed as a university diploma project. Feedback
            from players and sports hall communities can help shape a platform
            that works in everyday life.
          </p>
          {email ? (
            <a href={`mailto:${email}`} className="text-link">
              <Icon name="mail" size={18} />
              {email}
            </a>
          ) : (
            <p className="contact-detail">
              Official contact information has not been configured for this
              prototype.
            </p>
          )}
          <div className="integration-note">
            <strong>Contact submissions arrive in Phase 4.</strong>
            <p>
              This form shows the migrated layout. It is disabled until FastAPI
              validation and persistent submission storage are connected. No
              message can be sent yet.
            </p>
          </div>
        </div>
        <form className="glass-form" aria-label="Contact form preview">
          <span className="sample-pill">LAYOUT PREVIEW · NOT CONNECTED</span>
          <fieldset disabled>
            <div className="two-fields">
              <label className="floating-field">
                <input placeholder=" " name="name" autoComplete="name" />
                <span>Your name</span>
              </label>
              <label className="floating-field">
                <input
                  placeholder=" "
                  type="email"
                  name="email"
                  autoComplete="email"
                />
                <span>Email address</span>
              </label>
            </div>
            <label className="floating-field">
              <input placeholder=" " name="subject" />
              <span>Subject</span>
            </label>
            <label className="floating-field">
              <textarea rows={5} placeholder=" " name="message" />
              <span>Your message</span>
            </label>
            <button className="button button-outline" type="button">
              Submission available after API integration
            </button>
          </fieldset>
          <p className="fine-print">
            No contact information or messages are collected by this preview.
          </p>
        </form>
      </div>
    </div>
  );
}
