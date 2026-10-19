import type { Availability, Booking, BookingInput, Hall, Player, ProfileInput, Snapshot, Tournament } from './types';
import { futureSlot } from './types';
import { demoHalls, demoPlayers, demoTournaments } from './fixtures';
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'false';
const PREFIX = 'ttkz-react-v1-';
function read<T>(key:string, fallback:T):T { const raw=localStorage.getItem(PREFIX+key); if(!raw)return fallback;try{return JSON.parse(raw) as T}catch{return fallback} }
function write<T>(key:string,value:T) { localStorage.setItem(PREFIX+key,JSON.stringify(value)); }
async function request<T>(path:string, method='GET', data?:unknown):Promise<T> {
  let response:Response;
  try { response=await fetch('/api'+path,{method,headers:{'Content-Type':'application/json'},body:data===undefined?undefined:JSON.stringify(data)}); }
  catch {throw new Error('Cannot reach FastAPI. Start the Docker services and try again.');}
  if (!response.ok) {
    const body = await response.json().catch(()=>({detail:'The API request failed.'}));
    const detail = typeof body.detail==='string'?body.detail:'Please check the form values and try again.';
    throw new Error(`${detail}${response.status===409?' Availability has been refreshed.':''}`);
  }
  return response.status===204?undefined as T:response.json() as Promise<T>;
}
function demoBookings():Booking[] {return read<Booking[]>('bookings',[]).filter(b=>b.status==='confirmed')}
async function demoLock<T>(run:()=>T):Promise<T> { return navigator.locks ? navigator.locks.request('ttkz-demo-bookings',run) : run(); }
export const api = {
  async load():Promise<Snapshot> {
    if(DEMO_MODE) return {halls:demoHalls,players:demoPlayers.slice(1),profile:read('profile',demoPlayers[0]),bookings:demoBookings(),tournaments:demoTournaments,invitations:read('invitations',[])};
    const [halls,players,profile,bookings,tournaments,invitations]=await Promise.all([request<Hall[]>('/halls'),request<Player[]>('/players'),request<Player>('/profile'),request<Booking[]>('/bookings'),request<Tournament[]>('/tournaments'),request<number[]>('/invitations')]);
    return {halls,players,profile,bookings,tournaments,invitations};
  },
  async availability(hall:Hall,date:string):Promise<Availability[]> {
    if(!DEMO_MODE) return request(`/halls/${hall.id}/availability?play_date=${encodeURIComponent(date)}`);
    const bookings=demoBookings();
    return hall.tables.map(t=>({table_id:t.id,number:t.number,slots:Array.from({length:12},(_,i)=>({hour:i+9,available:futureSlot(date,i+9)&&!bookings.some(b=>b.table_id===t.id&&b.play_date===date&&b.hour===i+9)}))}));
  },
  async book(hall:Hall,input:BookingInput):Promise<void> {
    if(!DEMO_MODE){await request('/bookings','POST',input);return;}
    await demoLock(()=>{
      if(!futureSlot(input.play_date,input.hour))throw new Error('Choose a future session (Kazakhstan time).');
      const bookings=demoBookings();
      if(bookings.some(b=>b.table_id===input.table_id&&b.play_date===input.play_date&&b.hour===input.hour))throw new Error('This slot has already been booked. Choose another session.');
      const table=hall.tables.find(t=>t.id===input.table_id);
      if(!table)throw new Error('Choose a valid table.');
      const booking:Booking={...input,id:Date.now(),hall_id:hall.id,hall_name:hall.name,city:hall.city,table_number:table.number,price:hall.price,status:'confirmed'};
      write('bookings',[...bookings,booking]);
    });
  },
  async cancel(id:number):Promise<void> {
    if(!DEMO_MODE){await request(`/bookings/${id}`,'DELETE');return;}
    await demoLock(()=>write('bookings',demoBookings().filter(b=>b.id!==id)));
  },
  async profile(input:ProfileInput):Promise<void> {if(!DEMO_MODE){await request('/profile','PUT',input);return;}write('profile',{...input,id:1})},
  async invite(id:number):Promise<void> {if(!DEMO_MODE){await request(`/players/${id}/invite`,'POST');return;}write('invitations',Array.from(new Set([...read<number[]>('invitations',[]),id])))},
};
