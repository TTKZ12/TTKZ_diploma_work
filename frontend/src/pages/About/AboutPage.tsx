import { Link } from "react-router-dom";
import { PageHeading, Eyebrow } from "../../components/common/SectionHeading";
import { Icon } from "../../components/common/Icon";
export function AboutPage() {
  return (
    <div className="container page-shell">
      <PageHeading
        eyebrow="One sport. More connections."
        title="A SHARED HOME FOR THE GAME."
        description="TTKZ is a university diploma project exploring a more connected table tennis community in Kazakhstan."
      />
      <div className="about-grid">
        <div className="about-photo">
          <img
            src="/images/ttkz-hero.png"
            alt="Illustrative table tennis practice in an indoor arena"
          />
          <span>
            FROM YOUR FIRST SERVE
            <br />
            TO YOUR NEXT MATCH POINT.
          </span>
        </div>
        <div className="prose">
          <Eyebrow>The purpose</Eyebrow>
          <h2>
            More time at the table.
            <br />
            Fewer things in the way.
          </h2>
          <p>
            Finding a place to play, someone to train with, or a local
            competition often means searching across separate sources. TTKZ
            proposes a shared place to bring those everyday decisions together.
          </p>
          <p>
            The platform is designed for new players, regular club members,
            competitive athletes, and the halls that welcome them. Everyone
            should be able to find a starting point that suits their game.
          </p>
          <h3>What we’re building toward</h3>
          <p>
            Discover sports halls and their facilities. Reserve available
            sessions. Find players by level and playing preferences. Follow
            tournament announcements and community news.
          </p>
          <h3>A thoughtful first step</h3>
          <p>
            This release focuses on design, navigation, and the original
            project’s immersive parallax experience. The full system will use
            React, TypeScript, FastAPI, and PostgreSQL. Current venues, people,
            and events are clearly marked demonstration content.
          </p>
          <Link to="/halls" className="text-link">
            Explore the concept <Icon name="arrow" size={17} />
          </Link>
        </div>
      </div>
      <div className="about-values">
        <div>
          <span>01</span>
          <h3>Accessible by design</h3>
          <p>
            Readable content, responsive layouts, and room for every playing
            level.
          </p>
        </div>
        <div>
          <span>02</span>
          <h3>Built around community</h3>
          <p>People and their shared enjoyment of the game come first.</p>
        </div>
        <div>
          <span>03</span>
          <h3>Practical from the start</h3>
          <p>
            Useful discovery and reliable reservations are the foundation of the
            planned platform.
          </p>
        </div>
      </div>
    </div>
  );
}
