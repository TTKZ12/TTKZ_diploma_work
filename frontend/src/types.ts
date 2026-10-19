export type Level = 'Beginner' | 'Intermediate' | 'Advanced';
export type Page = 'halls' | 'players' | 'tournaments' | 'bookings' | 'profile';
export interface PlayingTable { id: number; number: number }
export interface Hall { id: number; name: string; city: string; address: string; description: string; price: number; facilities: string; tables: PlayingTable[] }
export interface Player { id: number; name: string; city: string; level: Level; preference: string; bio: string }
export type ProfileInput = Omit<Player, 'id'>;
export interface Tournament { id: number; name: string; city: string; venue: string; event_date: string; level: string; description: string }
export interface Booking { id: number; table_id: number; hall_id: number; hall_name: string; city: string; table_number: number; play_date: string; hour: number; price: number; status: 'confirmed' | 'cancelled' }
export interface BookingInput { table_id: number; play_date: string; hour: number }
export interface Availability { table_id: number; number: number; slots: { hour: number; available: boolean }[] }
export interface Snapshot { halls: Hall[]; players: Player[]; profile: Player; bookings: Booking[]; tournaments: Tournament[]; invitations: number[] }
export const cities = ['Almaty', 'Astana', 'Shymkent', 'Karaganda'];
export const levels: Level[] = ['Beginner', 'Intermediate', 'Advanced'];
export const preferences = ['Weekday evenings', 'Weekday mornings', 'Weekend mornings', 'Weekend afternoons', 'Flexible'];
export const money = (price: number) => new Intl.NumberFormat('en-KZ').format(price) + ' ₸';
export function today(): string { return new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Almaty',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()); }
export const dateLabel = (date: string) => new Date(date+'T12:00:00+05:00').toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Almaty'});
export const futureSlot = (date: string, hour: number) => new Date(`${date}T${String(hour).padStart(2,'0')}:00:00+05:00`).getTime() > Date.now();
