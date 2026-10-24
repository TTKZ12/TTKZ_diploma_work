import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TournamentCard, EventDate } from "../../components/common/Cards";
import {
  PageHeading,
  PreviewNote,
  Eyebrow,
} from "../../components/common/SectionHeading";
import { Icon } from "../../components/common/Icon";
import { tournaments, news, formatDate } from "../../services/catalog";
import { NotFoundPage } from "../NotFoundPage";
export function TournamentsPage() {
  const [tab, setTab] = useState("Tournaments"),
    [search, setSearch] = useState(""),
    [sort, setSort] = useState("Soonest first");
  const direction = sort === "Newest first" ? -1 : 1;
  const events = tournaments
    .filter((t) =>
      `${t.name} ${t.city} ${t.venue}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
    )
    .sort((a, b) => direction * a.date.localeCompare(b.date));
  const articles = news
    .filter((a) =>
      `${a.title} ${a.excerpt}`.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => direction * a.date.localeCompare(b.date));
  return (
    <div className="container page-shell">
      <PageHeading
        eyebrow="Around the table"
        title="STAY CLOSE TO THE GAME."
        description="Local challenges, community stories, and a little inspiration for your next session."
      />
      <PreviewNote>
        Sample announcements and editorial articles · Not live news or official
        events
      </PreviewNote>
      <div className="news-controls">
        <div className="catalog-tabs" role="tablist" aria-label="Content type">
          {["Tournaments", "News"].map((t) => (
            <button
              id={`tab-${t}`}
              role="tab"
              aria-controls="content-panel"
              aria-selected={t === tab}
              tabIndex={t === tab ? 0 : -1}
              key={t}
              onClick={() => setTab(t)}
              onKeyDown={(e) => {
                if (
                  ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? "Tournaments"
                      : e.key === "End"
                        ? "News"
                        : tab === "News"
                          ? "Tournaments"
                          : "News";
                  setTab(next);
                  document.getElementById(`tab-${next}`)?.focus();
                }
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="news-search">
          <label className="search-input">
            <Icon name="search" size={17} />
            <input
              aria-label="Search news and tournaments"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stories or events"
            />
          </label>
          <select
            aria-label="Sort content"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option>Soonest first</option>
            <option>Newest first</option>
          </select>
        </div>
      </div>
      <section
        id="content-panel"
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
      >
        {tab === "Tournaments" ? (
          <div className="tournament-catalog">
            {events.map((t) => (
              <TournamentCard tournament={t} key={t.id} />
            ))}
          </div>
        ) : (
          <div className="news-grid">
            {articles.map((a) => (
              <Link to={`/news/${a.id}`} className="news-card" key={a.id}>
                <div className="news-image">
                  <img
                    src="/images/ttkz-hero.png"
                    alt="Illustrative table tennis training scene"
                    loading="lazy"
                  />
                  <span>{a.category}</span>
                </div>
                <div>
                  <EventDate date={a.date} />
                  <h2>{a.title}</h2>
                  <p>{a.excerpt}</p>
                  <span className="text-link">
                    Read sample article <Icon name="arrow" size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
        {((tab === "Tournaments" && !events.length) ||
          (tab === "News" && !articles.length)) && (
          <div className="empty-state">
            <h2>Nothing matches your search.</h2>
            <p>Try a different title, location, or keyword.</p>
          </div>
        )}
      </section>
    </div>
  );
}
export function TournamentDetailsPage() {
  const { id } = useParams();
  const t = tournaments.find((t) => t.id === id);
  if (!t) return <NotFoundPage />;
  return (
    <div className="container page-shell">
      <Link to="/tournaments" className="back-link">
        ← Back to news & tournaments
      </Link>
      <PageHeading
        eyebrow="Sample community event"
        title={t.name.toUpperCase()}
        description={t.description}
      />
      <div className="detail-layout">
        <div>
          <div className="event-banner">
            <span className="status-label">{t.status}</span>
            <Icon name="table" size={95} />
            <strong>
              EVERY POINT.
              <br />
              EVERY PLAYER.
            </strong>
          </div>
          <div className="detail-section">
            <h2>Participation information</h2>
            <p>{t.participation}</p>
            <p>
              This concept announcement demonstrates the future tournament
              detail page. It is not an official competition listing.
            </p>
          </div>
        </div>
        <aside className="integration-card">
          <Eyebrow>Event details</Eyebrow>
          <dl className="event-facts">
            <dt>When</dt>
            <dd>
              {formatDate(t.date)} · {t.time} UTC+5
            </dd>
            <dt>Where</dt>
            <dd>
              {t.venue}, {t.city}
            </dd>
            <dt>Organizer</dt>
            <dd>{t.organizer}</dd>
            <dt>Status</dt>
            <dd>{t.status}</dd>
          </dl>
          <p className="availability-notice">
            Registration is not open. This event is fictional.
          </p>
        </aside>
      </div>
    </div>
  );
}
export function NewsDetailsPage() {
  const { id } = useParams();
  const article = news.find((a) => a.id === id);
  if (!article) return <NotFoundPage />;
  return (
    <article className="container page-shell article-shell">
      <Link to="/tournaments" className="back-link">
        ← Back to news & tournaments
      </Link>
      <PageHeading
        eyebrow={article.category + " · Sample editorial"}
        title={article.title.toUpperCase()}
        description={article.excerpt}
      />
      <EventDate date={article.date} />
      <img
        className="article-cover"
        src="/images/ttkz-hero.png"
        alt="Illustrative table tennis player in a training arena"
      />
      <div className="article-content">
        {article.content.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </article>
  );
}
