import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PlayerCard } from "../../components/common/Cards";
import {
  PageHeading,
  PreviewNote,
  Eyebrow,
} from "../../components/common/SectionHeading";
import { Icon } from "../../components/common/Icon";
import {
  players,
  cityOptions,
  levelOptions,
  preferenceOptions,
} from "../../services/catalog";
import { NotFoundPage } from "../NotFoundPage";
export function PlayersPage() {
  const [city, setCity] = useState("All cities"),
    [level, setLevel] = useState("All levels"),
    [preference, setPreference] = useState("Any time"),
    [search, setSearch] = useState("");
  const hasActiveFilters =
    city !== "All cities" ||
    level !== "All levels" ||
    preference !== "Any time" ||
    search !== "";

  const resetFilters = () => {
    setCity("All cities");
    setLevel("All levels");
    setPreference("Any time");
    setSearch("");
  };
  const filtered = players.filter(
    (p) =>
      (city === "All cities" || p.city === city) &&
      (level === "All levels" || p.level === level) &&
      (preference === "Any time" || p.preference === preference) &&
      p.name.toLowerCase().includes(search.trim().toLowerCase()),
  );
  return (
    <div className="container page-shell">
      <PageHeading
        eyebrow="Better together"
        title="FIND YOUR KIND OF PLAYER."
        description="A practice partner. A friendly rival. Someone who’s just as excited about the next game as you are."
      />
      <PreviewNote>
        Illustrative player profiles · Requests require the future authenticated
        API
      </PreviewNote>
      <div className="catalog-filters">
        <label>
          <span>Player name</span>
          <div className="search-input">
            <Icon name="search" size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the community"
            />
          </div>
        </label>
        <label>
          <span>City</span>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option>All cities</option>
            {cityOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Playing level</span>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option>All levels</option>
            {levelOptions.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Preferred time</span>
          <select
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
          >
            <option>Any time</option>
            {preferenceOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="catalog-caption">
        <span>{filtered.length} sample profiles</span>

        {hasActiveFilters ? (
          <button
            type="button"
            className="button button-outline"
            onClick={resetFilters}
          >
            Reset filters
          </button>
        ) : (
          <span>Every level belongs at the table</span>
        )}
      </div>
      <div className="player-grid">
        {filtered.map((p) => (
          <PlayerCard key={p.id} player={p} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h2>No players match yet.</h2>
          <p>Try another city, level, or playing preference.</p>
        </div>
      )}
    </div>
  );
}
export function PlayerDetailsPage() {
  const { id } = useParams();
  const player = players.find((p) => p.id === id);
  if (!player) return <NotFoundPage />;
  return (
    <div className="container page-shell">
      <Link to="/players" className="back-link">
        ← Back to the community
      </Link>
      <div className="public-profile">
        <div className="profile-cover">
          <span>ONE SPORT. MORE CONNECTIONS.</span>
        </div>
        <div className="profile-identity">
          <div
            className="player-avatar large-avatar"
            style={{ background: player.accent }}
          >
            {player.initials}
          </div>
          <div>
            <Eyebrow>Sample player profile</Eyebrow>
            <h1>{player.name}</h1>
            <p>
              <Icon name="pin" size={15} />
              {player.city} <span className="level-label">{player.level}</span>
            </p>
          </div>
        </div>
        <div className="profile-body">
          <div>
            <h2>About my game</h2>
            <p>{player.bio}</p>
            <h3>When I like to play</h3>
            <p>{player.preference}</p>
          </div>
          <aside className="integration-card">
            <h3>Meet across the table.</h3>
            <p>
              Partner requests will support sending, accepting, declining, and
              cancelling invitations after authentication is connected.
            </p>
            <p className="availability-notice">
              Requests are unavailable in this design preview. No message will
              be sent.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
