
import React from 'react';
import { CookingPlan } from '../types';

interface CalendarViewProps {
  plan: CookingPlan;
}

const CalendarView: React.FC<CalendarViewProps> = ({ plan }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const baseDate = new Date("2026-01-17");

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-up">
      <header className="flex justify-between items-end">
         <div className="space-y-2">
           <h2 className="font-serif text-5xl italic text-nature-forest">Harvest Horizon</h2>
           <p className="text-nature-moss uppercase tracking-[0.3em] text-[10px] font-bold">Week of January 17, 2026</p>
         </div>
         <div className="flex gap-3">
            <button className="px-6 py-3 bg-white border border-nature-border rounded-xl text-[10px] font-bold uppercase hover:bg-nature-sage transition-all">Past Seasons</button>
            <button className="px-6 py-3 bg-nature-forest text-white border border-nature-forest rounded-xl text-[10px] font-bold uppercase hover:brightness-110 transition-all shadow-lg">Current Bloom</button>
         </div>
      </header>

      <div className="bg-white border border-nature-border rounded-[3rem] overflow-hidden organic-shadow">
        <div className="grid grid-cols-7 border-b border-nature-border bg-nature-sage/30">
          {days.map((day, i) => {
            const current = new Date(baseDate);
            current.setDate(baseDate.getDate() + i);
            return (
              <div key={day} className="p-8 text-center border-r border-nature-border last:border-r-0">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-nature-moss block mb-2">{day.slice(0, 3)}</span>
                <span className="font-serif italic text-2xl text-nature-forest">{current.getDate()}</span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-7 h-[700px]">
          {days.map((day, idx) => {
            const dayPlan = plan.days[idx % plan.days.length];
            return (
              <div key={day} className="border-r border-nature-border last:border-r-0 p-6 space-y-4 bg-nature-cream/10 custom-scrollbar overflow-y-auto">
                 {dayPlan?.schedule.map((event, i) => (
                    <div key={i} className={`p-4 rounded-2xl border text-left organic-shadow hover:-translate-y-1 transition-all ${
                      event.type === 'MEAL' ? 'bg-white border-nature-moss/20' :
                      event.type === 'PREP' ? 'bg-nature-sage border-nature-moss/10' :
                      'bg-nature-forest text-white border-nature-forest'
                    }`}>
                       <div className="flex justify-between items-center mb-2">
                          <span className="font-mono text-[9px] font-bold opacity-60">{event.startTime}</span>
                          <i className={`fa-solid ${event.type === 'MEAL' ? 'fa-utensils' : event.type === 'PREP' ? 'fa-mortar-pestle' : 'fa-droplet'} text-[10px] opacity-20`}></i>
                       </div>
                       <h6 className="text-[10px] font-bold uppercase tracking-tight line-clamp-2 leading-relaxed">{event.title}</h6>
                    </div>
                 ))}
                 
                 {dayPlan?.meals.map((meal, i) => (
                   <div key={i} className="p-5 rounded-[1.5rem] bg-white border border-nature-border shadow-sm border-l-4 border-l-nature-terracotta hover:border-nature-moss transition-all cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[8px] font-black uppercase text-nature-moss">{meal.type}</span>
                        <span className="text-[8px] font-bold text-nature-terracotta">{meal.calories}kcal</span>
                      </div>
                      <h6 className="text-[11px] font-bold text-nature-forest leading-tight mb-2">{meal.name}</h6>
                      <p className="text-[9px] text-nature-moss italic line-clamp-1">{meal.healthBenefit}</p>
                   </div>
                 ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
