import { Routes, Route, Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ScrollManager } from "../components/layout/ScrollManager";
import { HomePage } from "../pages/Home/HomePage";
import { HallsPage, HallDetailsPage } from "../pages/Halls/HallsPage";
import { PlayersPage, PlayerDetailsPage } from "../pages/Players/PlayersPage";
import {
  TournamentsPage,
  TournamentDetailsPage,
  NewsDetailsPage,
} from "../pages/Tournaments/TournamentsPage";
import { AboutPage } from "../pages/About/AboutPage";
import { ContactPage } from "../pages/Contact/ContactPage";
import { AuthPage } from "../pages/Auth/AuthPage";
import { AccountPage } from "../pages/Account/AccountPage";
import { NotFoundPage } from "../pages/NotFoundPage";
function Layout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="halls" element={<HallsPage />} />
        <Route path="halls/:id" element={<HallDetailsPage />} />
        <Route path="players" element={<PlayersPage />} />
        <Route path="players/:id" element={<PlayerDetailsPage />} />
        <Route path="tournaments" element={<TournamentsPage />} />
        <Route path="tournaments/:id" element={<TournamentDetailsPage />} />
        <Route path="news/:id" element={<NewsDetailsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        {["login", "register", "forgot-password"].map((path) => (
          <Route key={path} path={path} element={<AuthPage />} />
        ))}
        {[
          "account",
          "account/edit",
          "account/bookings",
          "account/requests",
        ].map((path) => (
          <Route key={path} path={path} element={<AccountPage />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
