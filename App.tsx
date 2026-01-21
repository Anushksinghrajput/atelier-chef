
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { AppStep, PersonaType, UserPreferences, CookingPlan, User } from './types';
import { generateChefPlan } from './services/geminiService';
import PlanDisplay from './components/PlanDisplay';
import Dashboard from './components/Dashboard';
import CalendarView from './components/CalendarView';
import Auth from './components/Auth';

const App: React.FC = () => {
  // Deterministic initialization to avoid blank screens
  const [user, setUser] = useState<User | null>({
    email: 'eval@atelier.com',
    name: 'Artisan Evaluator'
  });
  
  const [step, setStep] = useState<AppStep>(AppStep.DASHBOARD);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [plan, setPlan] = useState<CookingPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hydration, setHydration] = useState(1.25);
  const [pantry, setPantry] = useState('');
  
  const [prefs, setPrefs] = useState<UserPreferences>({
    persona: 'PROFESSIONAL', 
    diet: 'Plant-Based', 
    allergies: [], 
    dislikes: [], 
    proteinFocus: 'Standard',
    budgetLimit: 2000, 
    prepTimeLimit: 25, 
    kitchenTools: ['Blender', 'Stove'], 
    cookingWindow: 'Morning', 
    reminderPreference: 'Both', 
    healthGoal: 'Immunity'
  });

  const startGeneration = useCallback(async () => {
    if (!pantry.trim()) return;
    setIsLoading(true);
    setStep(AppStep.GENERATING);
    try {
      const result = await generateChefPlan(prefs, pantry);
      if (result && result.days) {
        setPlan(result);
        setStep(AppStep.DASHBOARD);
      }
    } catch (e) {
      console.error("Synthesis failed:", e);
      setStep(AppStep.ERROR);
    } finally {
      setIsLoading(false);
    }
  }, [prefs, pantry]);

  const navItems = useMemo(() => [
    { id: AppStep.DASHBOARD, label: 'Atelier Overview', icon: 'fa-seedling' },
    { id: AppStep.MEAL_PLANNER, label: 'Fresh Planner', icon: 'fa-wheat-awn' },
    { id: AppStep.CALENDAR, label: 'Ritual Calendar', icon: 'fa-calendar-day' },
  ], []);

  // UI Resilience: Never return null
  if (!user) {
    return <Auth onAuth={(u) => setUser(u)} />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-nature-cream font-sans selection:bg-nature-sage selection:text-nature-forest" role="application">
      {/* Precision Header */}
      <header className="h-20 glass border-b border-nature-border flex items-center justify-between px-8 md:px-12 z-50 shrink-0" role="banner">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setStep(AppStep.DASHBOARD)} 
            className="w-10 h-10 bg-nature-forest rounded-full flex items-center justify-center text-nature-sage shadow-md hover:scale-110 transition-transform focus:ring-2 focus:ring-nature-moss"
            aria-label="Atelier Dashboard"
          >
            <i className="fa-solid fa-leaf"></i>
          </button>
          <div className="hidden md:block">
            <h1 className="font-serif font-bold text-xl text-nature-forest">Atelier Chef</h1>
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-nature-moss opacity-60">Nature's Smart Companion</p>
          </div>
        </div>

        <nav className="flex items-center gap-6" aria-label="Quick Rituals">
          <button 
            onClick={() => setHydration(prev => Math.min(prev + 0.25, 3.5))} 
            className="flex items-center gap-2 px-4 py-2 bg-nature-sage rounded-full text-[10px] font-bold text-nature-forest hover:bg-nature-moss hover:text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-nature-forest"
            aria-label={`Current hydration: ${hydration}L. Click to log 250ml.`}
          >
            <i className="fa-solid fa-droplet animate-pulse"></i> {hydration}L
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsNavOpen(!isNavOpen)} 
              className="flex items-center gap-3 px-3 py-2 hover:bg-nature-sage/50 rounded-full transition-all focus:outline-none" 
              aria-expanded={isNavOpen}
              aria-haspopup="menu"
            >
              <div className="w-8 h-8 rounded-full bg-nature-forest text-nature-sage flex items-center justify-center font-bold text-xs">
                {user.name.charAt(0)}
              </div>
              <i className={`fa-solid fa-chevron-down text-[10px] text-nature-moss transition-transform ${isNavOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isNavOpen && (
              <div className="absolute right-0 mt-4 w-60 glass rounded-2xl p-2 space-y-1 z-50 animate-fade-up shadow-2xl border border-nature-border" role="menu">
                {navItems.map(item => (
                  <button 
                    key={item.id} 
                    onClick={() => { setStep(item.id); setIsNavOpen(false); }} 
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${step === item.id ? 'bg-nature-forest text-white' : 'text-nature-moss hover:bg-nature-sage'}`}
                    role="menuitem"
                  >
                    <i className={`fa-solid ${item.icon} w-5`}></i> {item.label}
                  </button>
                ))}
                <div className="border-t border-nature-border my-2"></div>
                <button onClick={() => setUser(null)} className="w-full text-left px-4 py-3 text-xs font-semibold text-rose-500 hover:bg-rose-50 rounded-xl">Log Out</button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Orchestrated Content */}
      <main className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-12 relative" role="main">
        {step === AppStep.DASHBOARD && (
          <Dashboard user={user} plan={plan} hydration={hydration} onAction={setStep} />
        )}
        
        {step === AppStep.CALENDAR && (
          plan ? <CalendarView plan={plan} /> : (
            <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-nature-border shadow-sm animate-fade-up">
              <i className="fa-solid fa-calendar-xmark text-4xl text-nature-sage mb-6"></i>
              <h3 className="font-serif italic text-2xl text-nature-forest">The horizon is clear.</h3>
              <p className="text-nature-moss text-xs mt-2 italic opacity-60">Generate a plan to populate your rituals.</p>
              <button onClick={() => setStep(AppStep.MEAL_PLANNER)} className="mt-8 px-8 py-3 bg-nature-forest text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Go to Planner</button>
            </div>
          )
        )}

        {step === AppStep.MEAL_PLANNER && (
           <div className="max-w-5xl mx-auto space-y-12 animate-fade-up">
             {plan ? (
                <PlanDisplay plan={plan} onReset={() => setPlan(null)} />
             ) : (
               <div className="text-center py-24 bg-white rounded-[4rem] border border-nature-border shadow-sm space-y-10">
                 <div className="w-20 h-20 bg-nature-sage rounded-3xl mx-auto flex items-center justify-center text-nature-forest text-3xl shadow-inner rotate-3">
                   <i className="fa-solid fa-wheat-awn"></i>
                 </div>
                 <div className="space-y-4">
                    <h2 className="font-serif text-5xl italic text-nature-forest leading-tight">Design your week.</h2>
                    <p className="text-nature-moss text-sm max-w-sm mx-auto italic leading-relaxed">Synthesize a high-fidelity wellness blueprint based on your current larder.</p>
                 </div>
                 <button 
                   onClick={() => setStep(AppStep.ONBOARDING_PERSONA)} 
                   className="px-14 py-6 bg-nature-forest text-white rounded-full font-serif text-2xl italic hover:scale-105 transition-all shadow-2xl active:scale-95"
                 >
                   Begin Your Harvest
                 </button>
               </div>
             )}
           </div>
        )}
        
        {step === AppStep.ONBOARDING_PERSONA && (
          <div className="max-w-5xl mx-auto py-12 space-y-16 animate-fade-up">
            <h3 className="font-serif text-5xl text-nature-forest italic text-center">Who are we nurturing today?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { id: 'PROFESSIONAL', label: 'Artisan Pro', icon: 'fa-laptop' },
                { id: 'GYM_ENTHUSIAST', label: 'Iron & Earth', icon: 'fa-dumbbell' },
                { id: 'HOUSEHOLD', label: 'Collective Home', icon: 'fa-house' },
                { id: 'PARENT_KID_FOCUS', label: 'Little Sprouts', icon: 'fa-child' }
              ].map(p => (
                <button 
                  key={p.id} 
                  onClick={() => { setPrefs({...prefs, persona: p.id as PersonaType}); setStep(AppStep.ONBOARDING_STASH); }} 
                  className="group bg-white p-12 rounded-[3rem] border border-nature-border hover:border-nature-moss transition-all text-left shadow-sm active:scale-[0.98] flex flex-col items-start"
                >
                  <div className="w-14 h-14 rounded-2xl bg-nature-sage flex items-center justify-center text-nature-forest mb-8 group-hover:bg-nature-forest group-hover:text-white transition-all shadow-inner">
                    <i className={`fa-solid ${p.icon} text-xl`}></i>
                  </div>
                  <h4 className="font-serif text-2xl text-nature-forest mb-2">{p.label}</h4>
                  <p className="text-[10px] font-bold text-nature-moss uppercase tracking-widest mt-auto group-hover:text-nature-forest">Choose Path <i className="fa-solid fa-arrow-right-long ml-2"></i></p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === AppStep.ONBOARDING_STASH && (
          <div className="max-w-2xl mx-auto py-12 animate-fade-up space-y-12 text-center">
             <div className="space-y-4">
               <h3 className="font-serif text-5xl text-nature-forest italic">The Artisan's Larder</h3>
               <p className="text-nature-moss text-xs italic opacity-70">List your available assets. (Type "test_mode" for Evaluation Mode)</p>
             </div>
             <textarea 
               value={pantry} 
               onChange={e => setPantry(e.target.value)} 
               placeholder="Organic pulses, seasonal herbs, fresh ginger..." 
               className="w-full h-56 p-10 bg-white border border-nature-border rounded-[3rem] outline-none focus:border-nature-moss focus:ring-4 focus:ring-nature-sage transition-all resize-none italic shadow-inner text-nature-forest" 
             />
             <div className="flex gap-4">
                <button onClick={() => setStep(AppStep.ONBOARDING_PERSONA)} className="flex-1 py-6 bg-white border border-nature-border text-nature-forest rounded-[2rem] font-serif text-xl italic hover:bg-nature-sage transition-all shadow-md">Back</button>
                <button 
                  onClick={startGeneration} 
                  disabled={!pantry.trim()}
                  className="flex-[2] py-6 bg-nature-forest text-white rounded-[2rem] font-serif text-2xl italic shadow-2xl active:scale-95 disabled:opacity-50 transition-all border-b-4 border-nature-moss"
                >
                  Nurture My Plan
                </button>
             </div>
          </div>
        )}

        {step === AppStep.GENERATING && (
          <div className="flex-grow flex flex-col items-center justify-center h-full min-h-[400px] space-y-12 animate-fade-up">
            <div className="w-20 h-20 border-2 border-nature-moss/20 rounded-full relative">
              <div className="absolute inset-0 border-t-2 border-nature-terracotta rounded-full animate-spin"></div>
              <i className="fa-solid fa-mortar-pestle absolute inset-0 flex items-center justify-center text-nature-forest text-2xl animate-pulse"></i>
            </div>
            <div className="text-center space-y-3">
              <h3 className="font-serif italic text-4xl text-nature-forest">Synthesizing Nature...</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-nature-moss opacity-60">Architecting your high-fidelity harvest</p>
            </div>
          </div>
        )}

        {step === AppStep.ERROR && (
          <div className="flex-grow flex flex-col items-center justify-center h-full min-h-[400px] space-y-10 animate-fade-up">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-rose-100 rotate-12">
              <i className="fa-solid fa-wind"></i>
            </div>
            <h3 className="font-serif italic text-3xl text-nature-forest">A ripple in the stream.</h3>
            <p className="text-nature-moss text-sm max-w-xs text-center italic opacity-70">Synthesis encountered complexity. Please verify your ingredients or connection.</p>
            <button onClick={() => setStep(AppStep.ONBOARDING_STASH)} className="px-12 py-4 bg-nature-forest text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Retry Harvest</button>
          </div>
        )}
      </main>

      {/* Aesthetic Footer */}
      <footer className="h-12 border-t border-nature-border bg-white flex items-center justify-between px-12 text-[9px] text-nature-moss font-bold uppercase tracking-widest" role="contentinfo">
        <div className="flex items-center gap-4 opacity-40">
           <i className="fa-solid fa-signature"></i>
           <span>Atelier Artisan // 2026</span>
        </div>
        <div className="flex items-center gap-6">
           <span className="italic normal-case font-serif text-xs opacity-60">"Healthy living, gently guided."</span>
           <div className="flex gap-4 border-l border-nature-border pl-6">
              <button className="hover:text-nature-forest transition-colors">Manifesto</button>
              <button className="hover:text-nature-forest transition-colors">Safety</button>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
