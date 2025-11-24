
import React, { useState, useEffect, useRef } from 'react';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../constants';
import { ArrowRight, ArrowLeft, Layers, Clock, Calendar } from 'lucide-react';
import { BlogCategory, BlogPost } from '../types';

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Derived state
  const activePost = activePostId ? BLOG_POSTS.find(p => p.id === activePostId) : null;
  const filteredPosts = selectedCategory 
    ? BLOG_POSTS.filter(post => post.categoryId === selectedCategory)
    : [];
  const activeCategoryData = BLOG_CATEGORIES.find(c => c.id === selectedCategory);

  // Mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Transition Helper
  const performTransition = (stateUpdate: () => void) => {
    setIsExiting(true);
    setTimeout(() => {
      stateUpdate();
      setIsExiting(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 500); // Duration matches CSS animate-exit
  };

  // Navigation handlers
  const handleCategorySelect = (id: string) => {
    performTransition(() => setSelectedCategory(id));
  };

  const handlePostSelect = (id: string) => {
    performTransition(() => setActivePostId(id));
  };

  const handleBackToPosts = () => {
    performTransition(() => setActivePostId(null));
  };

  const handleBackToCategories = () => {
    performTransition(() => setSelectedCategory(null));
  };

  let content;
  let viewKey;

  // 1. Article View
  if (activePost && activePostId) {
    viewKey = `post-${activePostId}`;
    content = (
      <div className="w-full max-w-4xl mx-auto px-6 py-24 md:py-32 min-h-screen relative z-10">
        {/* Navigation / Header */}
        <div className="mb-12 flex items-center justify-between border-b border-zinc-800/50 pb-6">
           <button 
              onClick={handleBackToPosts}
              className="group flex items-center gap-3 text-zinc-500 hover:text-zinc-200 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-sans text-xs tracking-widest uppercase">Back</span>
            </button>
            <div className="font-sans text-xs tracking-widest uppercase text-zinc-600">
              {activeCategoryData?.title || 'Journal'}
            </div>
        </div>

        {/* Article Header */}
        <header className="mb-16 text-center">
          <div className="flex justify-center gap-6 text-zinc-500 font-sans text-xs tracking-widest uppercase mb-6">
             <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                {activePost.date}
             </div>
             <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                {activePost.readTime}
             </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-zinc-100 leading-tight italic">
            {activePost.title}
          </h1>
          <div className="mt-8 flex justify-center gap-3">
             {activePost.tags.map(tag => (
               <span key={tag} className="px-3 py-1 border border-zinc-800 rounded-full text-[10px] uppercase tracking-wider text-zinc-500">
                 {tag}
               </span>
             ))}
          </div>
        </header>

        {/* Article Body */}
        <article 
          className="prose prose-invert prose-lg mx-auto max-w-2xl font-sans text-zinc-400"
          dangerouslySetInnerHTML={{ __html: activePost.content }} 
        />
        
        {/* Article Footer */}
        <div className="mt-24 pt-12 border-t border-zinc-800/50 flex flex-col items-center">
            <p className="font-serif italic text-2xl text-zinc-600 mb-8">Thanks for reading.</p>
            <button 
              onClick={handleBackToPosts}
              className="px-8 py-3 border border-zinc-700 rounded-full hover:bg-zinc-800/50 transition-colors text-zinc-300 text-sm tracking-widest uppercase"
            >
              Return to List
            </button>
        </div>
      </div>
    );
  }
  // 2. Post List View (Waterfall)
  else if (selectedCategory) {
    viewKey = `category-${selectedCategory}`;
    content = (
      <div className="w-full max-w-5xl mx-auto px-6 py-24 md:py-32 min-h-screen relative z-10">
        {/* Navigation Header */}
        <div className="mb-16 flex items-center justify-between">
          <button 
            onClick={handleBackToCategories}
            className="group flex items-center gap-3 text-zinc-500 hover:text-zinc-200 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-sans text-xs tracking-widest uppercase">Back to Fragments</span>
          </button>
          <div className="flex items-center gap-2 text-zinc-600">
              <Layers className="w-4 h-4" />
              <span className="font-sans text-xs tracking-widest uppercase">{activeCategoryData?.title}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-20">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <PostItem 
                  key={post.id} 
                  post={post} 
                  index={index} 
                  onClick={() => handlePostSelect(post.id)}
                />
              ))
            ) : (
              <div className="text-center py-20 opacity-50">
                  <p className="font-serif text-2xl italic text-zinc-600">No fragments found in this sector.</p>
              </div>
            )}
        </div>
      </div>
    );
  }
  // 3. Category View (Scattered Floating Layout)
  else {
    viewKey = 'overview';
    content = (
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 md:py-0">
        
        {/* Scattered Cards Container */}
        <div className="relative w-full max-w-6xl mx-auto px-6 h-full md:h-[600px] flex flex-col md:block z-10">
           {BLOG_CATEGORIES.map((category, index) => (
            <ScatteredFragment 
              key={category.id} 
              category={category} 
              index={index}
              onClick={() => handleCategorySelect(category.id)}
              mousePos={mousePos}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} key={viewKey} className={isExiting ? 'animate-exit' : 'animate-enter'}>
      {content}
    </div>
  );
};

// Sub-component: Scattered Fragment (Replaces Standard Grid Card)
const ScatteredFragment: React.FC<{ 
  category: BlogCategory; 
  index: number; 
  onClick: () => void;
  mousePos: { x: number, y: number } 
}> = ({ category, index, onClick, mousePos }) => {
  
  // Custom positioning logic for that "scattered" look
  // Index 0: Top Left-ish
  // Index 1: Middle Right-ish
  // Index 2: Bottom Left-ish
  const positions = [
    "md:top-0 md:left-12 md:w-1/3",
    "md:top-32 md:right-24 md:w-1/3",
    "md:bottom-0 md:left-1/4 md:w-1/3"
  ];
  
  // Base rotation for the scattered look
  const rotations = [
    "md:-rotate-3",
    "md:rotate-2",
    "md:-rotate-1"
  ];

  return (
    <div 
      onClick={onClick}
      className={`
        relative w-full md:absolute ${positions[index]} ${rotations[index]}
        group cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
        mb-8 md:mb-0 hover:z-50 md:hover:rotate-0 md:hover:scale-105
      `}
      style={{
        // Subtle parallax movement for the cards themselves
        transform: `translate(${mousePos.x * (10 * (index + 1))}px, ${mousePos.y * (10 * (index + 1))}px)`
      }}
    >
      {/* Card Body */}
      <div className="
        relative overflow-hidden
        bg-zinc-900/40 backdrop-blur-xl border border-white/5 
        p-8 md:p-12 min-h-[280px] flex flex-col justify-between
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        group-hover:bg-zinc-900/60 group-hover:border-white/10 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
        transition-all duration-500
      ">
        
        {/* Holographic Sheen */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-screen pointer-events-none`} />
        
        {/* Animated Number */}
        <div className="font-serif text-6xl text-zinc-800 group-hover:text-zinc-700 transition-colors duration-500 absolute top-4 right-6 opacity-50 font-italic select-none">
          0{index + 1}
        </div>

        {/* Content */}
        <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
           <h3 className="font-serif text-4xl md:text-5xl text-zinc-300 group-hover:text-zinc-50 italic transition-colors duration-300 mb-6">
            {category.title}
          </h3>
           <div className="h-px w-12 bg-zinc-600 group-hover:w-full transition-all duration-700 ease-in-out mb-6 opacity-50" />
           <p className="font-sans text-sm md:text-base text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500 leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 delay-75">
             {category.description}
           </p>
        </div>

        {/* View Indicator */}
        <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-x-4 group-hover:translate-x-0">
           <ArrowRight className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

// Sub-component: Individual Post Item (Waterfall style) - Unchanged visually but kept for full file integrity
const PostItem: React.FC<{ post: BlogPost; index: number; onClick: () => void }> = ({ post, index, onClick }) => {
  return (
    <article 
      onClick={onClick}
      className="group relative border-t border-zinc-800/50 pt-12 animate-enter cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-12 items-baseline">
        
        {/* Meta Data */}
        <div className="md:col-span-3 flex flex-row md:flex-col gap-4 md:gap-2 text-xs font-sans tracking-widest uppercase text-zinc-500">
          <span>{post.date}</span>
          <span className="hidden md:block w-8 h-px bg-zinc-800 my-2"></span>
          <span>{post.readTime}</span>
        </div>

        {/* Content Preview */}
        <div className="md:col-span-9 relative">
          <h3 className="font-serif text-3xl md:text-5xl text-zinc-300 group-hover:text-zinc-100 transition-colors duration-500">
            {post.title}
          </h3>
          
          <p className="mt-6 font-sans text-zinc-500 leading-relaxed max-w-2xl group-hover:text-zinc-400 transition-colors duration-500">
            {post.excerpt}
          </p>

          <div className="mt-8 flex items-center gap-4">
            {post.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 rounded-full border border-zinc-800 text-[10px] uppercase tracking-wider text-zinc-600 group-hover:border-zinc-700 group-hover:text-zinc-400 transition-all">
                {tag}
              </span>
            ))}
          </div>

          {/* Hover Interaction Indicator */}
          <div className="absolute -left-8 top-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 hidden lg:block">
            <ArrowRight className="w-6 h-6 text-purple-400/50" />
          </div>
        </div>
      </div>
      
      {/* Holographic Gradient on Hover (Bottom line) */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
    </article>
  );
};
