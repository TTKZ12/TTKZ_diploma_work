import { Link } from "react-router-dom";
import { ParallaxHero } from "../../components/parallax/ParallaxHero";
import {
  Eyebrow,
  PreviewNote,
  SectionHeading,
} from "../../components/common/SectionHeading";
import {
  HallCard,
  PlayerCard,
  TournamentCard,
} from "../../components/common/Cards";
import { Icon } from "../../components/common/Icon";
import { halls, players, tournaments } from "../../services/catalog";
import { useReveal } from "../../hooks/useReveal";
import "./home.css";

function Introduction() {
  const reveal = useReveal();
  return (
    <section id="discover" className="introduction section-pad">
      <div className="container" ref={reveal}>
        <div className="intro-top">
          <Eyebrow>A place for your game</Eyebrow>
          <span className="section-index">01 — THE IDEA</span>
        </div>
        <div className="intro-grid">
          <h2>
            LESS SEARCHING.
            <br />
            <span>MORE PLAYING.</span>
          </h2>
          <div>
            <p>
              Great games begin with a connection. A table close to home. A
              partner at your level. A competition that gives you something to
              work toward.
            </p>
            <p>
              TTKZ brings those moments together for Kazakhstan’s table tennis
              community — from your very first serve to your next match point.
            </p>
            <Link to="/about" className="text-link">
              Meet the platform <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
        <div className="benefit-strip">
          <div>
            <span className="benefit-number">01</span>
            <div>
              <strong>Find your table</strong>
              <p>Discover places to play near you.</p>
            </div>
            <Icon name="table" size={25} />
          </div>
          <div>
            <span className="benefit-number">02</span>
            <div>
              <strong>Meet your people</strong>
              <p>Connect through a shared love of the game.</p>
            </div>
            <Icon name="users" size={25} />
          </div>
          <div>
            <span className="benefit-number">03</span>
            <div>
              <strong>Take your next step</strong>
              <p>Find a local event to look forward to.</p>
            </div>
            <Icon name="calendar" size={25} />
          </div>
        </div>
      </div>
    </section>
  );
}
function HallPreview() {
  const reveal = useReveal();
  return (
    <section className="home-halls section-pad">
      <div className="container" ref={reveal}>
        <SectionHeading
          eyebrow="Your next session starts here"
          title="FIND YOUR PLACE TO PLAY."
          description="Explore spaces for training, friendly rallies, and everything in between."
          link="/halls"
          linkLabel="Explore all halls"
        />
        <div className="hall-grid">
          {halls.slice(0, 3).map((h) => (
            <HallCard key={h.id} hall={h} />
          ))}
        </div>
        <PreviewNote>
          Concept venue illustrations · Sample halls and prices · Booking
          integration planned
        </PreviewNote>
      </div>
    </section>
  );
}
function EventsPreview() {
  const reveal = useReveal();
  return (
    <section className="home-events section-pad">
      <div className="container events-layout" ref={reveal}>
        <div className="events-editorial">
          <Eyebrow>A little friendly competition</Eyebrow>
          <h2>
            MAKE EVERY
            <br />
            <em>POINT COUNT.</em>
          </h2>
          <p>
            A new challenge. A familiar rival. The feeling of being part of
            something bigger than a single match.
          </p>
          <Link to="/tournaments" className="button button-outline">
            News & tournaments <Icon name="arrow" size={17} />
          </Link>
          <span className="editorial-word" aria-hidden="true">
            MATCH
            <br />
            POINT.
          </span>
        </div>
        <div className="events-list">
          <div className="list-top">
            <span>ON THE CALENDAR</span>
            <span className="sample-pill">SAMPLE EVENTS</span>
          </div>
          {tournaments.map((t) => (
            <TournamentCard key={t.id} tournament={t} />
          ))}
          <p className="fine-print">
            Illustrative announcements for the diploma project. Registration is
            not open.
          </p>
        </div>
      </div>
    </section>
  );
}
function CommunityPreview() {
  const reveal = useReveal();
  return (
    <section className="home-community section-pad">
      <div className="container" ref={reveal}>
        <SectionHeading
          eyebrow="Better on the other side of the table"
          title="YOUR KIND OF PLAYER."
          description="Beginner or competitor, there’s always someone to share a rally with."
          link="/players"
          linkLabel="Meet the community"
        />
        <div className="player-grid">
          {players.slice(0, 3).map((p) => (
            <PlayerCard player={p} key={p.id} />
          ))}
        </div>
        <PreviewNote>
          Illustrative profiles · Partner requests will be available after
          account integration
        </PreviewNote>
      </div>
    </section>
  );
}
export function HomePage() {
  return (
    <>
      <ParallaxHero />
      <Introduction />
      <HallPreview />
      <EventsPreview />
      <CommunityPreview />
      <section className="closing-section">
        <div className="container closing-inner">
          <div>
            <Eyebrow>Less scrolling. More serving.</Eyebrow>
            <h2>
              THERE’S A GAME
              <br />
              WITH YOUR NAME ON IT.
            </h2>
          </div>
          <Link to="/halls" className="button button-dark">
            Find your next table <Icon name="arrow" size={19} />
          </Link>
        </div>
      </section>
    </>
  );
}
