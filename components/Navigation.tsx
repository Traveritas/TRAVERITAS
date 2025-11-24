
import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onChangeView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (view: ViewState) => {
    onChangeView(view);
    setIsOpen(false);
  };

  return (
    <>
      {/* Artistic Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-10 right-10 z-[60] group outline-none focus:outline-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}
        `}
        aria-label="Open Menu"
      >
        {/* External Holographic Aura (Glow) */}
        <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-tr from-purple-500/10 via-transparent to-teal-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

        {/* The Glass Orb Container */}
        <div className="relative w-16 h-16 rounded-full bg-zinc-900/10 backdrop-blur-md border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-zinc-900/20 group-hover:border-white/10 group-hover:scale-110">
          
          {/* Subtle Inner Noise Texture */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          
          {/* Custom Icon: Abstract Lines Animation (Chaos -> Order) */}
          <div className="flex flex-col gap-1.5 items-end relative z-10 p-1">
            <span className="h-px bg-zinc-300 transition-all duration-500 ease-out w-6 group-hover:w-8 group-hover:bg-white" />
            <span className="h-px bg-zinc-400 transition-all duration-500 ease-out w-4 group-hover:w-8 group-hover:bg-white delay-75" />
            <span className="h-px bg-zinc-500 transition-all duration-500 ease-out w-2 group-hover:w-8 group-hover:bg-white delay-150" />
          </div>

          {/* Shimmer Effect on Hover */}
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
        </div>
        
        {/* Text Label (Optional, for access/clarity, styled minimally) */}
        <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 hidden md:block">
           <span className="font-serif italic text-lg text-zinc-500">Menu</span>
        </div>
      </button>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-zinc-950/95 backdrop-blur-3xl transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col justify-center items-center
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-10 right-10 group p-4"
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
             <span className="absolute w-full h-px bg-zinc-600 rotate-45 group-hover:bg-white group-hover:rotate-0 transition-all duration-500"></span>
             <span className="absolute w-full h-px bg-zinc-600 -rotate-45 group-hover:bg-white group-hover:rotate-0 transition-all duration-500"></span>
          </div>
        </button>

        {/* Menu Items */}
        <nav className="flex flex-col space-y-8 md:space-y-12 text-center">
          <MenuLink 
            label="Essence" 
            isActive={currentView === 'HOME'} 
            onClick={() => handleNav('HOME')} 
          />
          <MenuLink 
            label="Journal" 
            isActive={currentView === 'BLOG'} 
            onClick={() => handleNav('BLOG')} 
          />
          <MenuLink 
            label="Collection" 
            isActive={currentView === 'COLLECTION'} 
            onClick={() => handleNav('COLLECTION')} 
          />
        </nav>

        {/* Decorative footer in menu */}
        <div className="absolute bottom-12 text-zinc-600 font-sans text-[10px] tracking-[0.3em] uppercase opacity-50">
          MGM — Aetheria System
        </div>
      </div>
    </>
  );
};

interface MenuLinkProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center justify-center"
    >
      <span
        className={`font-serif text-5xl md:text-8xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isActive 
          ? 'text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500 scale-105 blur-none italic' 
          : 'text-zinc-700 hover:text-zinc-300 blur-[2px] hover:blur-none scale-100 hover:scale-105'
        }`}
      >
        {label}
      </span>
      
      {/* Floating Indicator */}
      <div 
        className={`absolute -right-12 md:-right-24 top-1/2 -translate-y-1/2 transition-all duration-700
          ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} 
      >
        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-zinc-500/50" />
      </div>
    </button>
  );
};
