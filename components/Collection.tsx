import React from 'react';
import { BENTO_ITEMS } from '../constants';
import { BentoItem, ContentType } from '../types';
import { ArrowUpRight, Quote } from 'lucide-react';

export const Collection: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-24 md:py-32">
      <header className="mb-20 px-2 animate-enter">
        <h2 className="font-serif text-4xl md:text-5xl text-zinc-200 italic">Curated Fragments</h2>
        <p className="font-sans text-zinc-500 mt-4 max-w-md leading-relaxed">
          A collection of thoughts, visions, and found objects gathered from the edge of the internet.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        {BENTO_ITEMS.map((item, index) => (
          <BentoCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

interface BentoCardProps {
  item: BentoItem;
  index: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ item, index }) => {
  // Staggered animation delay based on index
  const style = { animationDelay: `${index * 100}ms` };

  const getSpanClasses = () => {
    let classes = '';
    if (item.colSpan === 2) classes += ' md:col-span-2';
    if (item.rowSpan === 2) classes += ' row-span-2';
    return classes;
  };

  return (
    <div
      style={style}
      className={`group relative rounded-xl overflow-hidden border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm animate-enter hover:border-zinc-700/50 transition-colors duration-500 ${getSpanClasses()}`}
    >
      {/* Holographic Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-purple-500/5 via-cyan-500/5 to-transparent pointer-events-none z-0" />

      {item.type === ContentType.IMAGE && (
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={item.content} 
            alt={item.subContent} 
            className="w-full h-full object-cover filter grayscale contrast-[1.1] brightness-[0.9] group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-in-out transform group-hover:scale-105" 
          />
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-zinc-950/90 to-transparent">
             <p className="font-sans text-xs text-zinc-300 uppercase tracking-wider">{item.subContent}</p>
          </div>
        </div>
      )}

      {item.type === ContentType.TEXT && (
        <div className="relative z-10 p-8 flex flex-col justify-between h-full">
          <Quote className="w-6 h-6 text-zinc-700 mb-4" />
          <p className="font-serif text-2xl md:text-3xl leading-snug text-zinc-300 group-hover:text-zinc-100 transition-colors duration-300">
            "{item.content}"
          </p>
          <div className="mt-4 pt-4 border-t border-zinc-800/50">
            <p className="font-sans text-xs text-zinc-500 uppercase tracking-widest">{item.subContent}</p>
          </div>
        </div>
      )}

      {item.type === ContentType.LINK && (
        <a 
            href={`https://${item.subContent}`} 
            target="_blank" 
            rel="noreferrer"
            className="relative z-10 flex flex-col justify-between h-full p-6 group-hover:bg-zinc-800/20 transition-colors duration-300"
        >
          <div className="flex justify-between items-start">
             <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-white" />
             </div>
          </div>
          <div>
            <h3 className="font-serif text-xl text-zinc-200">{item.content}</h3>
            <p className="font-sans text-xs text-zinc-500 mt-2 hover:underline">{item.subContent}</p>
          </div>
        </a>
      )}
    </div>
  );
};