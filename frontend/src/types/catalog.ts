export interface Hall {
  id: string;
  name: string;
  city: string;
  address: string;
  description: string;
  price: number;
  tableCount: number;
  facilities: string[];
  openingHours: string;
  accent: string;
}
export type PlayingLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Competitive";
export interface Player {
  id: string;
  name: string;
  city: string;
  level: PlayingLevel;
  preference: string;
  bio: string;
  initials: string;
  accent: string;
}
export interface Tournament {
  id: string;
  name: string;
  date: string;
  time: string;
  city: string;
  venue: string;
  organizer: string;
  description: string;
  participation: string;
  status: "Upcoming" | "Ongoing" | "Completed";
}
export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string[];
  category: string;
}
