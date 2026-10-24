import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HallCard, VenueIllustration } from "../../components/common/Cards";
import {
  PageHeading,
  PreviewNote,
} from "../../components/common/SectionHeading";
import { Icon } from "../../components/common/Icon";
import { halls, cityOptions, money } from "../../services/catalog";
import { NotFoundPage } from "../NotFoundPage";
export function HallsPage() {
  const [city, setCity] = useState("Astana");
  const [facility, setFacility] = useState("Any facility");
  const [price, setPrice] = useState(4000);
  const [search, setSearch] = useState("");
  const filtered = halls.filter(
    (h) =>
      (city === "All cities" || h.city === city) &&
      (facility === "Any facility" || h.facilities.includes(facility)) &&
      h.price <= price &&
      `${h.name} ${h.city} ${h.address}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  return (
    <div className="container page-shell">
      <PageHeading
        eyebrow="A table for every game"
        title="FIND YOUR PLACE TO PLAY."
        description="Explore spaces to train, rally, and meet the community. Starting with Astana, built with Kazakhstan in mind."
      />
      <PreviewNote>
        Design catalog · Fictional halls and prices · Live availability is not
        yet connected
      </PreviewNote>
      <div className="catalog-filters">
        <label>
          <span>Search halls</span>
          <div className="search-input">
            <Icon name="search" size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Hall name or location"
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
          <span>Facilities</span>
          <select
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
          >
            {[
              "Any facility",
              "Equipment rental",
              "Coaching",
              "Changing rooms",
              "Parking",
            ].map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Up to {money(price)} / hour</span>
          <input
            type="range"
            min="1000"
            max="4000"
            step="250"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </label>
      </div>
      <div className="catalog-caption">
        <span>{filtered.length} concept halls</span>
        <span>Availability filter arrives with the booking API</span>
      </div>
      <div className="hall-grid">
        {filtered.map((h) => (
          <HallCard hall={h} key={h.id} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h2>No halls match those filters.</h2>
          <p>Try a different location, facility, or price range.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setCity("All cities");
              setFacility("Any facility");
              setPrice(4000);
              setSearch("");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
export function HallDetailsPage() {
  const { id } = useParams();
  const hall = halls.find((h) => h.id === id);
  if (!hall) return <NotFoundPage />;
  return (
    <div className="container page-shell">
      <Link to="/halls" className="back-link">
        ← Back to sports halls
      </Link>
      <PageHeading
        eyebrow={`${hall.city} · Sample venue`}
        title={hall.name.toUpperCase()}
        description={hall.description}
      />
      <div className="detail-layout">
        <div>
          <div className="detail-image">
            <VenueIllustration accent={hall.accent} id={hall.id + "detail"} />
            <span>Concept venue illustration</span>
          </div>
          <section className="detail-section">
            <h2>Make room for a good game.</h2>
            <p>{hall.description}</p>
            <div className="tag-list">
              {hall.facilities.map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>
          </section>
          <div className="detail-facts">
            <div>
              <Icon name="pin" />
              <h3>Location</h3>
              <p>
                {hall.city}
                <br />
                {hall.address}
              </p>
            </div>
            <div>
              <Icon name="clock" />
              <h3>Operating hours</h3>
              <p>
                {hall.openingHours}
                <br />
                Asia/Almaty · UTC+5
              </p>
            </div>
            <div>
              <Icon name="table" />
              <h3>Tables</h3>
              <p>
                {hall.tableCount} concept tables
                <br />
                Indoor table tennis
              </p>
            </div>
          </div>
        </div>
        <aside className="integration-card">
          <span className="sample-pill">BOOKING · NEXT PHASE</span>
          <h2>
            {money(hall.price)} <small>/ hour</small>
          </h2>
          <p>
            The reservation interface will let you choose a table, date, and
            available session.
          </p>
          <div className="numbered-steps">
            <span>
              <b>01</b>Select your table
            </span>
            <span>
              <b>02</b>Pick an available session
            </span>
            <span>
              <b>03</b>Confirm in your account
            </span>
          </div>
          <p className="availability-notice">
            Reservations are not open in this frontend preview. No real table
            can be booked here.
          </p>
          <Link to="/contact" className="text-link">
            About this prototype <Icon name="arrow" size={16} />
          </Link>
        </aside>
      </div>
    </div>
  );
}
