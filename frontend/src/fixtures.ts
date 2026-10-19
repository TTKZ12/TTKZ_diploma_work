import type { Hall, Player, Tournament } from './types';
import { today } from './types';
let tableId = 0;
export const demoHalls: Hall[] = [
  ['Spin Arena','Almaty','Abay Avenue',2500,'Professional tables,Changing rooms,Parking',8],
  ['Topspin Club','Astana','Turan Avenue',3000,'Professional tables,Equipment rental,Parking',6],
  ['Dostyk Table Tennis','Almaty','Dostyk Avenue',2000,'Equipment rental,Changing rooms,Coaching',4],
  ['Shymkent Ping Pong','Shymkent','Tauke Khan Avenue',1800,'Equipment rental,Coaching,Parking',5],
  ['Saryarka TT Center','Astana','Saryarka Avenue',2500,'Professional tables,Changing rooms,Coaching',6],
  ['Karaganda Spin Club','Karaganda','Bukhar Zhyrau Avenue',1500,'Equipment rental,Parking,Coaching',4],
].map((row, i) => ({id:i+1,name:String(row[0]),city:String(row[1]),address:`${row[2]} · sample address`,price:Number(row[3]),facilities:String(row[4]),description:'A welcoming sample venue for practice and friendly matches. Open daily, 09:00–21:00.',tables:Array.from({length:Number(row[5])},(_,n)=>({id:++tableId,number:n+1}))}));
export const demoPlayers: Player[] = [
  {id:1,name:'Alex',city:'Almaty',level:'Intermediate',preference:'Weekday evenings',bio:'Always up for a friendly game.'},
  {id:2,name:'Aigerim S.',city:'Almaty',level:'Intermediate',preference:'Weekday evenings',bio:'Looking for a regular partner to improve our rallies together.'},
  {id:3,name:'Dias K.',city:'Astana',level:'Advanced',preference:'Weekend mornings',bio:'Competitive player who enjoys match practice.'},
  {id:4,name:'Madina A.',city:'Almaty',level:'Beginner',preference:'Weekend afternoons',bio:'New to the sport and happy to meet other beginners.'},
  {id:5,name:'Arman T.',city:'Shymkent',level:'Intermediate',preference:'Weekday evenings',bio:'Good rallies and a little friendly competition.'},
];
export const demoTournaments: Tournament[] = [
  ['Almaty Community Open','Almaty','Spin Arena','All levels'],
  ['Capital City Championship','Astana','Topspin Club','Intermediate & advanced'],
  ['First Serve: Beginners Cup','Shymkent','Shymkent Ping Pong','Beginners'],
].map((row,i)=>{const date=new Date(today()+'T12:00:00Z');date.setUTCDate(date.getUTCDate()+14+i*7);return {id:i+1,name:row[0],city:row[1],venue:row[2],level:row[3],event_date:date.toISOString().slice(0,10),description:'A fictional community singles event with group stages and friendly competition. This is a sample announcement; registration is not available.'}});
