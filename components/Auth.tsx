import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onAuth: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onAuth({ email, name: name || 'Artisan' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-nature-cream p-8 relative overflow-hidden">
      {/* Botanical Decors */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-nature-sage/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-nature-terracotta/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md space-y-12 relative z-10 animate-fade-up">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-nature-forest rounded-[2rem] mx-auto flex items-center justify-center text-nature-sage organic-shadow rotate-3 hover:rotate-0 transition-all duration-500">
            <i className="fa-solid fa-leaf text-3xl"></i>
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-5xl tracking-tight text-nature-forest">Atelier Chef</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-nature-moss opacity-60">Thoughtfully prepared only for you</p>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[3.5rem] border border-nature-border organic-shadow space-y-10">
          <div className="flex justify-center gap-12 border-b border-nature-border pb-8">
            <button 
              onClick={() => setIsLogin(true)} 
              className={`text-[10px] font-black uppercase tracking-widest transition-all relative ${isLogin ? 'text-nature-forest' : 'text-nature-moss'}`}
            >
              Enter Atelier
              {isLogin && <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-nature-terracotta rounded-full"></div>}
            </button>
            <button 
              onClick={() => setIsLogin(false)} 
              className={`text-[10px] font-black uppercase tracking-widest transition-all relative ${!isLogin ? 'text-nature-forest' : 'text-nature-moss'}`}
            >
              Begin Journey
              {!isLogin && <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-nature-terracotta rounded-full"></div>}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {!isLogin && (
              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase text-nature-moss opacity-60 tracking-widest">Natural Identity</label>
                <input 
                  required type="text" value={name} onChange={(e) => setName(e.target.value)} 
                  className="w-full px-4 py-5 bg-nature-cream/50 border border-nature-border rounded-2xl outline-none focus:border-nature-moss transition-all font-medium text-sm placeholder:italic" 
                  placeholder="Jean Artisan" 
                />
              </div>
            )}
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase text-nature-moss opacity-60 tracking-widest">Connect Address</label>
              <input 
                required type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-4 py-5 bg-nature-cream/50 border border-nature-border rounded-2xl outline-none focus:border-nature-moss transition-all font-medium text-sm placeholder:italic" 
                placeholder="nurture@atelier.com" 
              />
            </div>
            
            <button type="submit" className="w-full py-6 bg-nature-forest text-nature-cream rounded-2xl font-serif italic text-2xl shadow-xl hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-6">
              {isLogin ? 'Open Session' : 'Create Essence'}
              <i className="fa-solid fa-signature text-sm"></i>
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-nature-moss italic opacity-60">"Healthy living, gently guided."</p>
      </div>
    </div>
  );
};

export default Auth;
