import React from 'react';
import { Navigation } from './Navigation';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView }) => {
  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-zinc-200 selection:bg-purple-500/30 selection:text-white">
      {/* Global Noise Overlay */}
      <div className="noise-bg" />
      
      {/* Main Content Area */}
      <main className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </main>

      {/* Navigation System */}
      <Navigation currentView={currentView} onChangeView={onChangeView} />
    </div>
  );
};