import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

import coupleImage from '../assets/images/couple-dance.png';

const InteractiveFirstDance = () => {
  const containerRef = useRef(null);
  const archRef = useRef(null);
  const imageRef = useRef(null);
  const particlesCanvasRef = useRef(null);

  const [celebrateCount, setCelebrateCount] = useState(0);

  // Sparkle particle system inside the arch
  useEffect(() => {
    const canvas = particlesCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Ambient rising golden specks
    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Ambient rising particles
      for (let p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += 0.03;

        if (p.y < 0) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.fillStyle = `rgba(225, 195, 105, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Trigger celebration confetti and gold glow
  const handleCelebrate = () => {
    setCelebrateCount((prev) => prev + 1);

    if (archRef.current) {
      const rect = archRef.current.getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height * 0.5) / window.innerHeight;

      confetti({
        particleCount: 30,
        spread: 80,
        origin: { x: originX, y: originY },
        colors: ['#D4AF37', '#FCF6BA', '#F3D98B', '#FFFFFF', '#E8C868'],
        shapes: ['circle'],
        scalar: 0.7,
        ticks: 110,
        gravity: 0.65,
        disableForReducedMotion: true,
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative py-12 sm:py-20 px-3 sm:px-4 max-w-4xl mx-auto text-center select-none"
    >
      {/* Section Header */}
      <div className="mb-8 sm:mb-12">
        <p className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-gold-accent mb-1.5 sm:mb-2">
          A MOMENT OF FOREVER
        </p>
        <h3 className="font-cinzel text-2xl sm:text-4xl text-gold-foil mb-2 sm:mb-3">
          &ldquo;Two Souls, One Rhythm&rdquo;
        </h3>
        <p className="font-cormorant italic text-sm sm:text-lg text-parchment/75 max-w-lg mx-auto">
          In every turn of life, hand in hand under the divine light of love
        </p>
      </div>

      {/* Grand Moorish Islamic Archway Card */}
      <div className="relative max-w-md sm:max-w-lg mx-auto">
        <div
          ref={archRef}
          onClick={handleCelebrate}
          className="relative w-full h-[480px] sm:h-[560px] rounded-t-[140px] sm:rounded-t-[200px] rounded-b-2xl sm:rounded-b-3xl bg-gradient-to-b from-[#061812] via-[#09241B] to-[#040C08] border border-gold-primary/60 sm:border-2 shadow-gold-glow flex flex-col items-center justify-end overflow-hidden cursor-pointer group"
        >
          {/* Inner Moorish Arch Filigree Line */}
          <div className="pointer-events-none absolute inset-2 sm:inset-3 rounded-t-[132px] sm:rounded-t-[188px] rounded-b-xl sm:rounded-b-2xl border border-gold-primary/25" />

          {/* Golden Arabesque Floral Top Arch Crest */}
          <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-85 z-10">
            <svg width="70" height="28" viewBox="0 0 70 28" fill="none">
              <path
                d="M35 2 C28 10 20 14 6 15 C20 16 28 20 35 26 C42 20 50 16 64 15 C50 14 42 10 35 2 Z"
                stroke="#D4AF37"
                strokeWidth="1.2"
                fill="rgba(212, 175, 55, 0.12)"
              />
              <circle cx="35" cy="14" r="3" fill="#D4AF37" />
              <circle cx="20" cy="14" r="1.5" fill="#D4AF37" opacity="0.7" />
              <circle cx="50" cy="14" r="1.5" fill="#D4AF37" opacity="0.7" />
            </svg>
          </div>

          {/* Interactive Sparkle Canvas */}
          <canvas
            ref={particlesCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />

          {/* Floor Golden Spotlight Glow */}
          <div
            className="absolute bottom-0 w-full h-48 pointer-events-none z-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 45% at 50% 90%, rgba(212, 175, 55, 0.38) 0%, rgba(212, 175, 55, 0.12) 50%, transparent 75%)',
            }}
          />

          {/* Pristine Couple Image Container */}
          <div className="relative z-10 w-full h-full flex items-end justify-center pb-3 sm:pb-5">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[597/800] drop-shadow-[0_18px_35px_rgba(0,0,0,0.75)] flex items-center justify-center">
              {/* Floor Shadow beneath couple */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[85%] h-6 rounded-[100%] bg-black/60 blur-[6px] pointer-events-none" />

              {/* High-Resolution Couple Image */}
              <img
                ref={imageRef}
                src={coupleImage}
                alt="Mohammed Shaheer and Fathima Nidha"
                className="w-full h-full object-contain pointer-events-none transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Interactive Control Pill Button & Counter */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleCelebrate}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FDF7C3] to-[#AA771C] text-[#0B0F0D] font-cinzel font-bold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.55)] active:scale-95 transition-all duration-300 overflow-hidden"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <Sparkles className="w-4 h-4 text-[#0B0F0D] transition-transform group-hover:rotate-45" />
            <span>✦ Celebrate the Moment ✦</span>
          </button>

          {/* Romantic Counter Badge */}
          {celebrateCount > 0 && (
            <div className="inline-flex items-center gap-1.5 font-cormorant italic text-sm sm:text-base text-gold-accent animate-fade-in">
              <Heart className="w-3.5 h-3.5 fill-gold-accent text-gold-accent inline" />
              <span>
                Celebrated {celebrateCount} {celebrateCount === 1 ? 'time' : 'times'} with eternal blessings
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveFirstDance;
