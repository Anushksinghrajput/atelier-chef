
import React, { useState, useMemo } from 'react';
import { CookingPlan, Meal, CalendarEvent } from '../types';
import { generateICSFile, downloadICS } from '../services/calendarService';

interface PlanDisplayProps {
  plan: CookingPlan;
  onReset: () => void;
  onlyGrocery?: boolean;
}

const MacroPill: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className="flex items-center gap-2">
    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></div>
    <span className="text-[9px] font-bold text-nature-moss uppercase tracking-widest">{label}: {value}g</span>
  </div>
);

const MealAccordion: React.FC<{ meal: Meal }> = ({ meal }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border-b border-nature-border last:border-0 transition-all ${isOpen ? 'bg-nature-sage/10' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full p-8 flex items-center justify-between text-left group focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-8">
          <div className="w-12 h-12 rounded-full bg-nature-sage flex items-center justify-center text-nature-forest text-sm italic font-serif shadow-inner">
            {meal.type.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h4 className="font-serif text-2xl text-nature-forest">{meal.name}</h4>
              <span className="px-2 py-0.5 bg-nature-forest/5 text-nature-moss text-[8px] font-black uppercase rounded-full border border-nature-moss/10">
                {meal.freshFactor}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-nature-moss uppercase tracking-widest">
                <i className="fa-solid fa-heart-pulse text-nature-terracotta"></i>
                {meal.healthBenefit}
              </div>
              <div className="flex items-center gap-4 border-l border-nature-border pl-4">
                 <MacroPill label="P" value={meal.macros.p} color="#C46E52" />
                 <MacroPill label="C" value={meal.macros.c} color="#D4AF37" />
                 <MacroPill label="F" value={meal.macros.f} color="#8A9A5B" />
              </div>
            </div>
          </div>
        </div>
        <i className={`fa-solid fa-chevron-right text-[12px] transition-transform duration-500 ${isOpen ? 'rotate-90 text-nature-terracotta' : 'text-nature-moss opacity-30'}`}></i>
      </button>
      {isOpen && (
        <div className="px-16 pb-12 animate-fade-up space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h5 className="text-[10px] font-black uppercase text-nature-moss tracking-[0.3em] flex items-center gap-3">
                <i className="fa-solid fa-seedling"></i> Nature's Assets
              </h5>
              <ul className="space-y-4">
                {meal.ingredients.map((ing, i) => (
                  <li key={i} className="flex justify-between items-center text-sm pb-4 border-b border-nature-border last:border-0">
                    <div>
                       <span className="text-nature-forest font-serif italic">{ing.name}</span>
                       <span className="text-[10px] text-nature-moss ml-3 opacity-60">[{ing.quantity}]</span>
                    </div>
                    <span className="font-mono text-[10px] text-nature-moss">₹{ing.cost}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h5 className="text-[10px] font-black uppercase text-nature-moss tracking-[0.3em] flex items-center gap-3">
                <i className="fa-solid fa-mortar-pestle"></i> Preparation Sequence
              </h5>
              <div className="space-y-6">
                {meal.instructions.map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <span className="font-serif italic text-nature-terracotta text-2xl opacity-40">0{i+1}</span>
                    <p className="text-sm leading-relaxed text-nature-forest font-medium pt-1 transition-all">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, onReset, onlyGrocery }) => {
  const [activeDay, setActiveDay] = useState(1);
  const currentDay = useMemo(() => plan.days.find(d => d.day === activeDay), [plan, activeDay]);

  const handleExportSchedule = () => {
    const allEvents = plan.days.flatMap(d => d.schedule);
    const icsContent = generateICSFile(allEvents);
    downloadICS(icsContent, `atelier-plan-${plan.id}.ics`);
  };

  if (onlyGrocery) {
    return (
      <div className="space-y-12 animate-fade-up">
        <header className="space-y-3">
          <h2 className="font-serif text-5xl italic text-nature-forest">Nature's Bounty</h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-nature-moss">Ethical Sourcing & Procurement Manifest</p>
        </header>
        <div className="bg-white p-16 rounded-[3.5rem] border border-nature-border organic-shadow space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {['Farmer\'s Market', 'Artisan Grocer', 'Organic Dairy'].map(cat => {
                const items = plan.groceryList.filter(i => i.category.includes(cat) || (i.category === 'Mandi' && cat === 'Farmer\'s Market'));
                if (items.length === 0) return null;
                return (
                  <div key={cat} className="space-y-8">
                    <div className="flex items-center gap-3 text-[11px] font-black uppercase text-nature-terracotta tracking-[0.2em]">
                       <div className="w-1.5 h-1.5 rounded-full bg-nature-terracotta"></div>
                       {cat}
                    </div>
                    <ul className="space-y-4">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-center justify-between group cursor-pointer border-b border-nature-border/50 pb-4 last:border-0">
                          <span className="text-xs font-semibold text-nature-forest/70 group-hover:text-nature-forest transition-colors">{item.item}</span>
                          <span className="font-mono text-[10px] text-nature-moss opacity-50">₹{item.estimatedCost}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 animate-fade-up space-y-20">
      {/* Precision Overview */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Vitality Score', val: `${plan.summary.efficiencyScore}%`, icon: 'fa-chart-pie' },
          { label: 'Total Invest', val: `₹${plan.summary.totalCost}`, icon: 'fa-coins' },
          { label: 'Eco-Rating', val: plan.summary.sustainabilityRating, icon: 'fa-earth-asia' },
          { label: 'Avg Protein', val: `${plan.summary.avgProtein}g`, icon: 'fa-dna' }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-nature-border p-10 rounded-[2.5rem] organic-shadow space-y-4">
            <div className="text-[9px] font-bold text-nature-moss uppercase tracking-widest opacity-60">{stat.label}</div>
            <div className="font-serif text-3xl text-nature-forest flex items-center justify-between">
              {stat.val}
              <i className={`fa-solid ${stat.icon} text-xs opacity-20`}></i>
            </div>
          </div>
        ))}
      </section>

      {/* Main Synthesis View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-nature-border pb-10">
             <div className="space-y-2">
                <h3 className="font-serif text-4xl italic text-nature-forest">Daily Harvest</h3>
                <p className="text-[10px] font-bold text-nature-moss uppercase tracking-[0.3em]">Day {activeDay} of current synthesize</p>
             </div>
             <div className="flex gap-3 bg-nature-sage/30 p-2 rounded-full">
               {plan.days.map(d => (
                 <button 
                  key={d.day} 
                  onClick={() => setActiveDay(d.day)} 
                  className={`w-10 h-10 rounded-full text-[10px] font-bold transition-all ${activeDay === d.day ? 'bg-nature-forest text-white shadow-lg' : 'text-nature-moss hover:bg-nature-sage'}`}
                 >D{d.day}</button>
               ))}
             </div>
          </div>

          <div className="bg-white border border-nature-border rounded-[3.5rem] overflow-hidden organic-shadow">
            {currentDay?.meals.map(meal => <MealAccordion key={meal.id} meal={meal} />)}
          </div>
        </div>

        {/* Temporal Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
          <div className="space-y-10">
            <h4 className="font-serif text-4xl italic text-nature-forest">Daily Rituals</h4>
            <div className="space-y-8">
               {currentDay?.schedule.map((event, i) => (
                 <div key={i} className="flex gap-8 group animate-fade-up">
                   <div className="text-center pt-1 shrink-0">
                      <p className="font-mono text-[10px] font-bold text-nature-moss">{event.startTime}</p>
                      <div className="w-[1px] h-10 bg-nature-border mx-auto mt-2 opacity-50"></div>
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${event.type === 'MEAL' ? 'bg-nature-terracotta' : 'bg-nature-moss'}`}></div>
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-nature-forest">{event.title}</h5>
                      </div>
                      <p className="text-[11px] text-nature-moss opacity-70 italic leading-relaxed">{event.description}</p>
                   </div>
                 </div>
               ))}
            </div>
            <button 
              onClick={handleExportSchedule}
              className="w-full py-6 bg-nature-forest text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:brightness-110 shadow-xl transition-all"
            >
              Sync to Calendar (.ics)
            </button>
          </div>
        </aside>
      </div>

      <footer className="pt-24 border-t border-nature-border text-center">
        <button onClick={onReset} className="font-serif italic text-nature-moss hover:text-nature-forest transition-colors">Return to Atelier silence</button>
      </footer>
    </div>
  );
};

export default PlanDisplay;
