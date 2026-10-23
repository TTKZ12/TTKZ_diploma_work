import type { Hall, NewsArticle, Player, Tournament } from "../types/catalog";

/** Phase 2 design fixtures. Replace this boundary with /api/v1 in Phase 4.
 * Names, addresses, people, organizers and events below are fictional.
 * No availability is invented: only the live booking API may provide it.
 */
export const halls: Hall[] = [
  {
    id: "astana-arena",
    name: "Capital TT Arena",
    city: "Astana",
    address: "Turan Avenue · illustrative address",
    description:
      "A bright, spacious concept venue for focused training and friendly matches. Professional tables, generous playing space, and an easy place to meet after work.",
    price: 3000,
    tableCount: 8,
    facilities: ["Equipment rental", "Changing rooms", "Parking"],
    openingHours: "Daily · 09:00–22:00",
    accent: "#a7b59b",
  },
  {
    id: "saryarka",
    name: "Saryarka Table Tennis",
    city: "Astana",
    address: "Saryarka Avenue · illustrative address",
    description:
      "A welcoming concept club for first serves and regular practice, with coaching spaces and equipment rental.",
    price: 2500,
    tableCount: 6,
    facilities: ["Coaching", "Equipment rental", "Changing rooms"],
    openingHours: "Daily · 10:00–21:00",
    accent: "#849aab",
  },
  {
    id: "almaty-spin",
    name: "Almaty Spin Club",
    city: "Almaty",
    address: "Abay Avenue · illustrative address",
    description:
      "A neighborhood club concept for people who enjoy a good rally. Explore a place to practice at your own pace.",
    price: 2200,
    tableCount: 4,
    facilities: ["Equipment rental", "Parking"],
    openingHours: "Daily · 09:00–21:00",
    accent: "#bd9e80",
  },
  {
    id: "shymkent-tt",
    name: "Shymkent TT Space",
    city: "Shymkent",
    address: "Tauke Khan Avenue · illustrative address",
    description:
      "A community sports hall concept with room to learn, practice and enjoy table tennis together.",
    price: 1800,
    tableCount: 5,
    facilities: ["Coaching", "Parking"],
    openingHours: "Daily · 10:00–21:00",
    accent: "#9e9cba",
  },
];
export const players: Player[] = [
  {
    id: "aigerim",
    name: "Aigerim S.",
    city: "Astana",
    level: "Intermediate",
    preference: "Weekday evenings",
    bio: "Working on my backhand and looking for a regular practice partner. Friendly games are always welcome.",
    initials: "AS",
    accent: "#c2b59c",
  },
  {
    id: "dias",
    name: "Dias K.",
    city: "Astana",
    level: "Competitive",
    preference: "Weekend mornings",
    bio: "I enjoy match practice, quick rallies, and meeting players who want to challenge themselves.",
    initials: "DK",
    accent: "#9cabb8",
  },
  {
    id: "madina",
    name: "Madina A.",
    city: "Almaty",
    level: "Beginner",
    preference: "Weekend afternoons",
    bio: "New to table tennis. Looking for someone to learn with, one rally at a time.",
    initials: "MA",
    accent: "#b3bb98",
  },
  {
    id: "arman",
    name: "Arman T.",
    city: "Shymkent",
    level: "Advanced",
    preference: "Weekday evenings",
    bio: "A little friendly competition is the best way to end the day. Happy to help newer players too.",
    initials: "AT",
    accent: "#ba9e9c",
  },
];
export const tournaments: Tournament[] = [
  {
    id: "capital-open",
    name: "Capital Community Open",
    date: "2026-11-14",
    time: "10:00",
    city: "Astana",
    venue: "Capital TT Arena",
    organizer: "Demo community organizer",
    status: "Upcoming",
    description:
      "A sample singles competition with group rounds and a knockout stage. Designed to show how local events will appear on TTKZ.",
    participation:
      "Open-level concept event. Registration is not available in this design preview.",
  },
  {
    id: "first-serve",
    name: "First Serve: Beginners Cup",
    date: "2026-11-21",
    time: "11:00",
    city: "Almaty",
    venue: "Almaty Spin Club",
    organizer: "Demo community organizer",
    status: "Upcoming",
    description:
      "A relaxed sample tournament for people taking their first steps in the sport. Friendly round-robin matches with time to learn.",
    participation:
      "Beginner concept event. Registration is not available in this design preview.",
  },
  {
    id: "evening-league",
    name: "Saryarka Evening League",
    date: "2026-12-05",
    time: "18:00",
    city: "Astana",
    venue: "Saryarka Table Tennis",
    organizer: "Demo community organizer",
    status: "Upcoming",
    description:
      "An illustrative after-work singles event for intermediate and advanced players.",
    participation:
      "Intermediate and advanced concept event. Registration is not available in this design preview.",
  },
];
export const news: NewsArticle[] = [
  {
    id: "first-club-session",
    title: "Your first club session: what to expect",
    date: "2026-10-18",
    category: "Getting started",
    excerpt:
      "A simple introduction to finding a table, bringing the basics, and enjoying your first game.",
    content: [
      "This is a sample editorial article for the TTKZ design preview, not live reporting.",
      "Before a session, check a hall’s opening hours, equipment policy, and booking details. Comfortable indoor shoes and clothes that let you move are a useful starting point.",
      "If you are meeting someone new, agree on a time and place, be clear about your playing level, and leave space for a relaxed warm-up. The goal is a game you both enjoy.",
    ],
  },
  {
    id: "community-platform",
    title: "A shared home for Kazakhstan’s table tennis community",
    date: "2026-10-16",
    category: "Platform journal",
    excerpt:
      "The TTKZ diploma concept brings hall discovery, playing partners, and local events into one place.",
    content: [
      "TTKZ is a university diploma project exploring a simpler way for players in Kazakhstan to connect.",
      "The planned platform will support hall discovery, time-slot reservations, public player profiles, partner requests, and tournament announcements.",
      "The current release is a frontend design milestone. Venue records, people, and event announcements are demonstration content. Real booking and account workflows will arrive with the FastAPI and PostgreSQL integration.",
    ],
  },
];
export const cityOptions = ["Astana", "Almaty", "Shymkent"];
export const levelOptions = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Competitive",
];
export const preferenceOptions = [
  "Weekday evenings",
  "Weekend mornings",
  "Weekend afternoons",
];
export const money = (amount: number) =>
  new Intl.NumberFormat("en-KZ").format(amount) + " ₸";
export const formatDate = (date: string) =>
  new Date(date + "T12:00:00+05:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Almaty",
  });
