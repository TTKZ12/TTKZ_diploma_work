import { Link } from "react-router-dom";
import type { Hall, Player, Tournament } from "../../types/catalog";
import { formatDate, money } from "../../services/catalog";
import { Icon } from "./Icon";
export function VenueIllustration({
  accent = "#a7b59b",
  id = "venue",
}: {
  accent?: string;
  id?: string;
}) {
  return (
    <svg
      viewBox="0 0 640 380"
      role="img"
      aria-label="Concept illustration of an indoor table tennis venue"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`floor-${id}`} x2="0.7" y2="1">
          <stop stopColor="#283c3d" />
          <stop offset="1" stopColor="#111c20" />
        </linearGradient>
      </defs>
      <rect width="640" height="380" fill="#1c2a2d" />
      <path d="M0 0h640v195H0Z" fill={accent} opacity=".2" />
      <path d="M0 195h640v185H0Z" fill={`url(#floor-${id})`} />
      <path
        d="M0 0l100 45v150L0 245ZM640 0l-100 45v150l100 50Z"
        fill="#0f1c20"
      />
      <path
        d="M100 0v195M260 0v195M420 0v195M540 0v195M100 45h440M100 105h440"
        stroke={accent}
        strokeOpacity=".15"
        strokeWidth="3"
      />
      <path
        d="M130 58h100v95H130ZM290 58h100v95H290ZM450 58h65v95h-65Z"
        fill={accent}
        opacity=".2"
      />
      <path
        d="M0 310l640-70M220 380l80-185M550 380l-110-185"
        stroke="#7b9495"
        strokeOpacity=".15"
      />
      <path
        d="M169 255l-7 68M438 255l12 68M256 171v55M474 171l12 62"
        stroke="#0b1012"
        strokeWidth="10"
      />
      <path
        d="M144 252l110-87h227l-47 87Z"
        fill="#41666b"
        stroke="#d5e3de"
        strokeWidth="3"
      />
      <path d="M144 252v11h290v-11l47-87v11l-47 87" fill="#1d343a" />
      <path d="M207 208h251M366 165l-77 87" stroke="#d5e3de" strokeWidth="2" />
      <path
        d="M204 190h264v22H204Z"
        fill="#d7e8df"
        fillOpacity=".3"
        stroke="#e4f0e9"
        strokeWidth="2"
      />
      {Array.from({ length: 33 }, (_, i) => (
        <path
          key={i}
          d={`M${209 + i * 8} 191v20`}
          stroke="#c9dad1"
          strokeOpacity=".5"
        />
      ))}
      <path d="M204 197h264M204 204h264" stroke="#c9dad1" strokeOpacity=".5" />
      <circle cx="370" cy="227" r="4.5" fill="#f9f9e7" />
      <path d="M35 25h125M480 25h125" stroke="#f4f8dd" strokeWidth="5" />
      <rect width="640" height="380" fill="#0b1518" opacity=".08" />
    </svg>
  );
}
export function HallCard({ hall }: { hall: Hall }) {
  return (
    <Link to={`/halls/${hall.id}`} className="hall-card">
      <div className="hall-card-image">
        <VenueIllustration accent={hall.accent} id={hall.id} />
        <span className="image-label">{hall.city}</span>
        <span className="image-arrow">
          <Icon name="arrow" />
        </span>
      </div>
      <div className="hall-card-content">
        <div className="card-title">
          <h3>{hall.name}</h3>
          <span>Demo venue</span>
        </div>
        <p className="metadata">
          <Icon name="pin" size={14} />
          {hall.address}
        </p>
        <div className="tag-list">
          {hall.facilities.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
        <div className="card-bottom">
          <span>
            <Icon name="table" size={15} />
            {hall.tableCount} tables
          </span>
          <strong>
            {money(hall.price)}
            <small> / hour</small>
          </strong>
        </div>
      </div>
    </Link>
  );
}
export function TournamentCard({ tournament: t }: { tournament: Tournament }) {
  return (
    <Link to={`/tournaments/${t.id}`} className="tournament-card">
      <div className="event-date">
        <span>
          {new Date(t.date + "T12:00:00")
            .toLocaleDateString("en-GB", { month: "short" })
            .toUpperCase()}
        </span>
        <strong>{t.date.slice(-2)}</strong>
      </div>
      <div className="event-info">
        <span className="status-label">{t.status} · Sample event</span>
        <h3>{t.name}</h3>
        <p>
          <Icon name="pin" size={13} />
          {t.city} <span>·</span> {t.time} UTC+5
        </p>
      </div>
      <Icon name="arrow" size={21} />
    </Link>
  );
}
export function PlayerCard({ player: p }: { player: Player }) {
  return (
    <Link to={`/players/${p.id}`} className="player-card">
      <div className="player-card-top">
        <div className="player-avatar" style={{ background: p.accent }}>
          {p.initials}
        </div>
        <span className="level-label">{p.level}</span>
      </div>
      <h3>{p.name}</h3>
      <p className="metadata">
        <Icon name="pin" size={14} />
        {p.city}
      </p>
      <p className="player-bio">{p.bio}</p>
      <div className="player-bottom">
        <span>
          <Icon name="clock" size={14} />
          {p.preference}
        </span>
        <Icon name="arrow" size={18} />
      </div>
    </Link>
  );
}
export function EventDate({ date }: { date: string }) {
  return <time dateTime={date}>{formatDate(date)}</time>;
}
