
import React, { useMemo } from 'react';
import { CookingPlan, AppStep, User } from '../types';
import DonutChart from './DonutChart';
import ChartBars from './ChartBars';

interface DashboardProps {
  user: User;
  plan: CookingPlan | null;
  hydration: number;
  onAction: (step: AppStep) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, plan, hydration, onAction }) => {
  const chartLabels = useMemo(() => ['M', 'T', 'W', 'T', 'F', 'S', 'S'], []);
  const chartData = useMemo(() => plan?.analytics?.weeklyConsistency || [0, 0, 0, 0, 0, 0, 0], [plan]);

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-fade-up">
      <header className="flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="space-y-4">
          <h2 className="font-serif text-5xl italic text-nature-forest leading-tight">
            Nurture your essence,<br/> Atelier {user.name.split(' ')[0]}.
          </h2>
          <p className="text-[10px] font-bold text-nature-moss uppercase tracking-[0.4em] opacity-70">
            Vitality Overview // Jan 17, 2026
          </p>
        </div>
        {!plan && (
          <button 
            onClick={() => onAction(AppStep.MEAL_PLANNER)} 
            className="px-10 py-5 bg-nature-forest text-white rounded-2xl font-serif text-xl italic shadow-xl hover:-translate-y-1 transition-all active:scale-95"
          >
            Design Your Harvest
          </button>
        )}
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Hydration Card */}
        <div className="bg-white p-10 rounded-[3rem] border border-nature-border shadow-sm space-y-8 group hover:border-nature-moss transition-all">
          <div className="flex justify-between items-start">
            <p className="text-[10px] font-black uppercase tracking-widest text-nature-moss opacity-60">Daily Hydration</p>
            <div className="w-10 h-10 bg-nature-sage rounded-full flex items-center justify-center text-nature-forest shadow-inner">
               <i className="fa-solid fa-droplet"></i>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-serif text-5xl text-nature-forest">{hydration}L</h4>
            <div className="h-2 w-full bg-nature-sage/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-nature-moss transition-all duration-1000 ease-out" 
                style={{ width: `${Math.min((hydration/3.5)*100, 100)}%` }}
              ></div>
            </div>
            <p className="text-[9px] font-bold text-nature-moss uppercase tracking-widest opacity-60">Goal: 3.5 Liters</p>
          </div>
        </div>

        {/* Metrics Card */}
        <div className="bg-white p-10 rounded-[3rem] border border-nature-border shadow-sm flex justify-around items-center gap-4 hover:border-nature-moss transition-all">
          <DonutChart percentage={plan ? (plan.summary.efficiencyScore || 85) : 0} color="#8A9A5B" label="Vitality" icon="fa-leaf" size={90} />
          <DonutChart percentage={plan ? (plan.summary.avgProtein || 70) : 0} color="#C46E52" label="Protein" icon="fa-dna" size={90} />
        </div>

        {/* Coaching Insight Card */}
        <div className="bg-nature-forest p-10 rounded-[3rem] text-white shadow-xl space-y-6 relative overflow-hidden group">
           <i className="fa-solid fa-quote-right absolute -top-4 -right-4 text-8xl text-white/5 opacity-10 group-hover:scale-110 transition-transform duration-1000"></i>
           <p className="text-[10px] font-black uppercase text-nature-sage/40 tracking-widest">Atelier Insight</p>
           <p className="italic text-lg leading-relaxed font-serif relative z-10">
             {plan 
               ? plan.summary.nutritionPhilosophy 
               : "Nourishment is the ultimate ritual. Start your harvest to synchronize your body with nature's wisdom."}
           </p>
           {!plan && (
             <button 
               onClick={() => onAction(AppStep.MEAL_PLANNER)}
               className="text-xs font-bold uppercase tracking-widest text-nature-gold hover:underline"
             >
               Synthesize Plan Now <i className="fa-solid fa-arrow-right ml-2"></i>
             </button>
           )}
        </div>
      </section>

      {/* Analytics Section */}
      <section className="bg-white p-12 rounded-[3.5rem] border border-nature-border shadow-sm space-y-12">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-3xl text-nature-forest italic">Consistency Bloom</h3>
          <span className="px-4 py-2 bg-nature-sage rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-nature-forest">7-Day Trends</span>
        </div>
        {plan ? (
          <ChartBars data={chartData} labels={chartLabels} height={140} />
        ) : (
          <div className="h-32 flex items-center justify-center border border-dashed border-nature-border rounded-[2rem] bg-nature-cream/30">
             <p className="text-nature-moss text-xs italic opacity-50 uppercase tracking-widest">No analytic data synthesized yet.</p>
          </div>
        )}
      </section>

      {!plan && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
           <div className="p-10 bg-white rounded-[2.5rem] border border-nature-border space-y-4">
              <i className="fa-solid fa-calendar-day text-nature-terracotta text-2xl"></i>
              <h5 className="font-serif text-xl italic text-nature-forest">Synchronized Schedule</h5>
              <p className="text-xs text-nature-moss leading-relaxed">Map your daily rituals from hydration to high-protein harvests in one seamless horizon.</p>
           </div>
           <div className="p-10 bg-white rounded-[2.5rem] border border-nature-border space-y-4">
              <i className="fa-solid fa-basket-shopping text-nature-gold text-2xl"></i>
              <h5 className="font-serif text-xl italic text-nature-forest">Intelligent Procurement</h5>
              <p className="text-xs text-nature-moss leading-relaxed">Generate optimized grocery manifests that reduce waste and respect your budget limit.</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
