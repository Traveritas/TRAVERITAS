import React, { useState, useEffect, useRef } from 'react';

export const Home: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Track mouse for the "Searchlight" / "Observer" effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle System (Cosmic Dust)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; size: number; speedY: number; opacity: number }[] = [];
    const particleCount = 60;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5, // Tiny dust
        speedY: Math.random() * 0.2 + 0.05, // Slow drift up
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p) => {
        p.y -= p.speedY;
        // Reset if off screen
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 220, ${p.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex-grow flex items-center justify-center relative overflow-hidden min-h-screen w-full cursor-none md:cursor-default bg-black"
    >
      
      {/* 
         The Void: Background Color Layers
         Increased opacity and saturation for visible "Holographic" tints
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep Purple/Magenta Nebula */}
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-purple-900/20 rounded-full blur-[120px] blob-deep mix-blend-screen" />
        
        {/* Deep Teal/Cyan Nebula - Moving opposite */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-teal-900/20 rounded-full blur-[100px] blob-deep animation-delay-2000 mix-blend-screen" />
        
        {/* Center Warmth (Subtle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-zinc-800/10 rounded-full blur-[150px]" />
      </div>

      {/* Cosmic Dust Particles Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-60 mix-blend-screen"
      />

      {/* 
        The Searchlight Effect 
        Reveals the particles and adds a subtle glow.
      */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle 500px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.04), transparent 50%)`
        }}
      />

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6">
        
        {/* The Title: Translucent, blending with the void */}
        <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl tracking-[0.2em] leading-tight animate-blur-focus select-none font-light">
          {/* 
            Design Logic:
            - text-zinc-300/80: Soft grey, semi-transparent to let background bleed through.
            - mix-blend-screen: Allows the background blobs (purple/teal) to tint the text slightly.
            - drop-shadow: Creates a very subtle 'haze' or glow around the letters.
          */}
          <span className="inline-block text-zinc-300/80 mix-blend-screen drop-shadow-[0_0_15px_rgba(200,200,255,0.15)]">
            TRAVERITAS
          </span>
        </h1>
        
        {/* The Latin Subtitle - Even more subtle */}
        <p className="mt-8 font-serif italic text-xl md:text-2xl text-zinc-600 mix-blend-plus-lighter animate-enter" style={{ animationDelay: '1.5s' }}>
          In transitu ad veritatem.
        </p>
        
        {/* The Divider line */}
        <div className="mt-12 h-px w-0 bg-zinc-800 mx-auto animate-[width_1.5s_ease-out_forwards_2s] max-w-[120px]" style={{ width: '120px' }} />
        
        {/* The Philosophy */}
        <div className="mt-12 animate-enter" style={{ animationDelay: '2.5s' }}>
          <p className="font-sans text-xs md:text-sm text-zinc-500 tracking-[0.25em] uppercase max-w-lg mx-auto leading-loose opacity-80">
            Charting the drift between the digital void and tangible reality.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-[10px] md:text-xs text-zinc-700 tracking-[0.3em] uppercase opacity-60">
             <span>Observer</span>
             <span className="w-0.5 h-0.5 rounded-full bg-zinc-700"></span>
             <span>Seeker</span>
             <span className="w-0.5 h-0.5 rounded-full bg-zinc-700"></span>
             <span>Archive</span>
          </div>
        </div>
      </div>

      {/* Subtle coordinate decorations (Technical/Observatory feel) */}
      <div className="absolute bottom-12 left-12 font-mono text-[9px] text-zinc-700 tracking-widest hidden md:block opacity-40">
        POS: {mousePos.x.toFixed(2)}N, {mousePos.y.toFixed(2)}E
      </div>
      <div className="absolute bottom-12 right-12 font-mono text-[9px] text-zinc-700 tracking-widest hidden md:block opacity-40">
        SYS: ONLINE // OBS_MODE
      </div>
    </div>
  );
};