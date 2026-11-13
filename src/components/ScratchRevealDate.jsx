import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { Sparkles, Eye, MapPin, ExternalLink } from 'lucide-react';

const ScratchRevealDate = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const dateContentRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const isRevealedRef = useRef(false);
  const lastCheckTimeRef = useRef(0);
  const lastCanvasWidthRef = useRef(0);

  // Paint the rich 24K Gold Leaf foil on the scratch canvas
  const paintGoldFoil = useCallback((force = false) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isRevealedRef.current) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(280, Math.floor(rect.width));
    const height = Math.max(240, Math.floor(rect.height));

    if (!force && lastCanvasWidthRef.current && Math.abs(width - lastCanvasWidthRef.current) <= 2) {
      return;
    }
    lastCanvasWidthRef.current = width;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.globalCompositeOperation = 'source-over';

    // 1. Radiant 24K Italian Gold Leaf Metallic Gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0.00, '#C48F26'); // Rich antique gold edge
    grad.addColorStop(0.12, '#E8BC46'); // Radiant gold body
    grad.addColorStop(0.24, '#FFF7BA'); // Specular gold leaf highlight
    grad.addColorStop(0.38, '#D8A42F'); // Warm yellow gold
    grad.addColorStop(0.50, '#FFF9CF'); // Central sparkling sheen
    grad.addColorStop(0.64, '#E2AF3C'); // Deep royal gold
    grad.addColorStop(0.78, '#FFF1A8'); // Diagonal luster ray
    grad.addColorStop(0.90, '#D69E2E'); // Warm amber gold
    grad.addColorStop(1.00, '#A77117'); // Rich burnished gold edge
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Realistic Hand-hammered Gold Leaf Texture & Creases
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 1;
    for (let y = -height; y < height * 2; y += 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y + width * 0.4);
      ctx.stroke();
    }
    ctx.restore();

    // Subtle dark foil fracture/crease lines
    ctx.save();
    ctx.strokeStyle = 'rgba(110, 70, 10, 0.12)';
    ctx.lineWidth = 0.8;
    for (let x = 0; x < width; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + Math.sin(x) * 16, height);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Stamped Baroque Embossed Frame on the Gold Foil
    ctx.save();
    const pad = width < 420 ? 12 : 20;

    // Outer Frame Line
    ctx.strokeStyle = 'rgba(65, 45, 10, 0.45)';
    ctx.lineWidth = 1.4;
    ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

    // Inner Delicate Line
    ctx.strokeStyle = 'rgba(65, 45, 10, 0.45)';
    ctx.lineWidth = 1.0;
    ctx.strokeRect(pad + 6, pad + 6, width - (pad + 6) * 2, height - (pad + 6) * 2);

    // Corner Ornaments on Foil
    const cornerSize = width < 420 ? 16 : 24;
    const drawFoilCorner = (cx, cy, flipX, flipY) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(flipX, flipY);
      ctx.strokeStyle = 'rgba(65, 45, 10, 0.45)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(0, 0, cornerSize, 0, Math.PI / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(4, 4, cornerSize - 6, 0, Math.PI / 2);
      ctx.stroke();
      ctx.restore();
    };
    drawFoilCorner(pad + 6, pad + 6, 1, 1);
    drawFoilCorner(width - pad - 6, pad + 6, -1, 1);
    drawFoilCorner(pad + 6, height - pad - 6, 1, -1);
    drawFoilCorner(width - pad - 6, height - pad - 6, -1, -1);
    ctx.restore();

    // 4. Stamped Embossed Foil Typography
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const centerY = height / 2;
    const isMobile = width < 420;

    // Top Cursive Calligraphy
    ctx.font = isMobile
      ? '32px "Great Vibes", "Alex Brush", cursive'
      : '44px "Great Vibes", "Alex Brush", cursive';
    ctx.fillStyle = '#2A1E08';
    ctx.fillText('Swipe to Scratch', width / 2, centerY - (isMobile ? 22 : 30));

    // Center Title - Spaced to prevent tail of 'L' colliding with 'D'
    ctx.font = isMobile
      ? '700 15px "Cinzel Decorative", serif'
      : '700 20px "Cinzel Decorative", serif';
    ctx.fillStyle = '#2A1E08';
    const part1 = 'REVEAL';
    const part2 = 'DATE & VENUE';
    const gap = isMobile ? 18 : 24;
    const w1 = ctx.measureText(part1).width;
    const w2 = ctx.measureText(part2).width;
    const totalW = w1 + gap + w2;
    const startX = (width - totalW) / 2;
    ctx.textAlign = 'left';
    ctx.fillText(part1, startX, centerY + (isMobile ? 13 : 16));
    ctx.fillText(part2, startX + w1 + gap, centerY + (isMobile ? 13 : 16));

    // Bottom Badge
    ctx.textAlign = 'center';
    ctx.font = isMobile
      ? '600 10px "Montserrat", sans-serif'
      : '600 11px "Montserrat", sans-serif';
    try {
      ctx.letterSpacing = '0.22em';
    } catch (e) {
      // fallback if letterSpacing not supported on older canvas
    }
    ctx.fillStyle = '#2A1E08';
    ctx.fillText('✦ SHAHEER & NIDHA ✦', width / 2, centerY + (isMobile ? 40 : 48));
    try {
      ctx.letterSpacing = '0px';
    } catch (e) {}

    ctx.restore();
  }, []);

  useEffect(() => {
    paintGoldFoil(true);
    const handleResize = () => paintGoldFoil(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [paintGoldFoil]);

  const triggerFullReveal = useCallback(() => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsRevealed(true);
    setScratchPercent(100);

    // Golden spark burst via canvas-confetti
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 70,
        spread: 75,
        origin: {
          x: Math.min(0.9, Math.max(0.1, originX)),
          y: Math.min(0.9, Math.max(0.1, originY)),
        },
        colors: ['#D4AF37', '#E8C868', '#FAF7EE', '#F3E5AB'],
        ticks: 200,
        scalar: 0.95,
      });
    }

    // GSAP fade-out of remaining foil + illuminate revealed date
    if (canvasRef.current) {
      gsap.to(canvasRef.current, {
        opacity: 0,
        scale: 1.03,
        duration: 0.75,
        ease: 'power2.out',
      });
    }

    if (dateContentRef.current) {
      gsap.fromTo(
        dateContentRef.current,
        { scale: 0.94, filter: 'brightness(1.4)' },
        {
          scale: 1,
          filter: 'brightness(1)',
          duration: 0.9,
          ease: 'back.out(1.6)',
        }
      );
    }
  }, []);

  const checkScratchCoverage = useCallback((force = false) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;

    const now = performance.now();
    if (!force && now - lastCheckTimeRef.current < 80) return;
    lastCheckTimeRef.current = now;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const { width, height } = canvas;
    const imageData = ctx.getImageData(0, 0, width, height).data;

    let transparentPixels = 0;
    let totalSampled = 0;
    const stride = 16;

    for (let i = 3; i < imageData.length; i += stride) {
      totalSampled++;
      if (imageData[i] < 128) {
        transparentPixels++;
      }
    }

    const clearedRatio = (transparentPixels / totalSampled) * 100;
    setScratchPercent(Math.min(100, Math.round(clearedRatio)));

    if (clearedRatio >= 35) {
      triggerFullReveal();
    }
  }, [triggerFullReveal]);

  const getPointerCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const scratchAt = (point) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = canvas.width < 450 ? 46 : 56;

    ctx.beginPath();
    if (lastPointRef.current) {
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(point.x, point.y);
    } else {
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x + 0.1, point.y + 0.1);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(point.x, point.y, canvas.width < 450 ? 23 : 28, 0, Math.PI * 2);
    ctx.fill();

    lastPointRef.current = point;
  };

  const handlePointerDown = (e) => {
    if (isRevealedRef.current) return;
    if (e.currentTarget.setPointerCapture && e.pointerId !== undefined) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Ignore unsupported
      }
    }
    isDrawingRef.current = true;
    const coords = getPointerCoords(e);
    lastPointRef.current = coords;
    scratchAt(coords);
    checkScratchCoverage(false);
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current || isRevealedRef.current) return;
    if (e.cancelable) e.preventDefault();
    const coords = getPointerCoords(e);
    scratchAt(coords);
    checkScratchCoverage(false);
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    checkScratchCoverage(true);
  };

  return (
    <section className="relative py-12 sm:py-20 px-3 sm:px-4 max-w-2xl mx-auto text-center">
      {/* Section Header */}
      <div className="mb-6 sm:mb-8">
        <p className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-gold-accent mb-1.5 sm:mb-2">
          The Wedding Celebration
        </p>
        <h3 className="font-cinzel text-xl sm:text-3xl text-gold-foil">
          Scratch to Reveal Date &amp; Venue
        </h3>
      </div>

      {/* Sage/Olive Embossed Textured Card Container */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[300px] sm:min-h-[340px] rounded-2xl p-4 sm:p-8 bg-gradient-to-br from-[#384C3B] via-[#2A3B2D] to-[#1D2A20] border-2 border-gold-primary/50 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(212,175,55,0.22)] overflow-hidden flex items-center justify-center select-none"
      >
        {/* Left Side Embossed Damask Lace Watermark (Matching Reference Photo) */}
        <svg
          viewBox="0 0 160 380"
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 h-full pointer-events-none opacity-40 mix-blend-overlay"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 10 20 C 35 15, 60 40, 45 70 C 30 100, 70 120, 50 150 C 30 180, 80 210, 40 240 C 10 260, 65 300, 35 340 C 20 360, 45 375, 10 375 Z"
            fill="none"
            stroke="#D6E5D8"
            strokeWidth="2.2"
            strokeDasharray="4 3"
          />
          <path
            d="M 25 35 C 45 30, 75 55, 60 85 C 45 115, 85 135, 65 165 C 45 195, 95 225, 55 255 C 25 275, 80 315, 50 355 Z"
            fill="none"
            stroke="#152418"
            strokeWidth="1.5"
          />
          {/* Floral Damask Rosettes */}
          <circle cx="35" cy="80" r="14" fill="none" stroke="#D6E5D8" strokeWidth="1.5" />
          <circle cx="35" cy="80" r="8" fill="none" stroke="#152418" strokeWidth="1" />
          <circle cx="45" cy="190" r="16" fill="none" stroke="#D6E5D8" strokeWidth="1.5" />
          <circle cx="45" cy="190" r="9" fill="none" stroke="#152418" strokeWidth="1" />
          <circle cx="35" cy="300" r="14" fill="none" stroke="#D6E5D8" strokeWidth="1.5" />
          <circle cx="35" cy="300" r="8" fill="none" stroke="#152418" strokeWidth="1" />
        </svg>

        {/* Embossed Baroque Rectangular Filigree Frame (Matching Reference Photo) */}
        <svg
          viewBox="0 0 600 360"
          className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Shadow Pass for 3D Beveled Emboss */}
          <g transform="translate(1, 1.5)" stroke="#122015" strokeWidth="2" fill="none">
            {/* Outer and Inner Rects */}
            <rect x="34" y="24" width="532" height="312" rx="4" />
            <rect x="42" y="32" width="516" height="296" rx="3" />
            {/* Top Center Flourish */}
            <path d="M 240 24 C 270 12, 285 6, 300 6 C 315 6, 330 12, 360 24 C 340 30, 320 32, 300 32 C 280 32, 260 30, 240 24 Z" />
            {/* Bottom Center Flourish */}
            <path d="M 240 336 C 270 348, 285 354, 300 354 C 315 354, 330 348, 360 336 C 340 330, 320 328, 300 328 C 280 328, 260 330, 240 336 Z" />
            {/* Corner Scrolls */}
            <path d="M 34 54 C 34 38, 48 24, 64 24 M 566 54 C 566 38, 552 24, 536 24 M 34 306 C 34 322, 48 336, 64 336 M 566 306 C 566 322, 552 336, 536 336" />
          </g>

          {/* Highlight Pass for 3D Embossed Relief */}
          <g stroke="#6B8871" strokeWidth="1.6" fill="none">
            {/* Outer and Inner Rects */}
            <rect x="34" y="24" width="532" height="312" rx="4" />
            <rect x="42" y="32" width="516" height="296" rx="3" />
            {/* Top Center Flourish */}
            <path d="M 240 24 C 270 12, 285 6, 300 6 C 315 6, 330 12, 360 24 C 340 30, 320 32, 300 32 C 280 32, 260 30, 240 24 Z" />
            {/* Bottom Center Flourish */}
            <path d="M 240 336 C 270 348, 285 354, 300 354 C 315 354, 330 348, 360 336 C 340 330, 320 328, 300 328 C 280 328, 260 330, 240 336 Z" />
            {/* Corner Scrolls */}
            <path d="M 34 54 C 34 38, 48 24, 64 24 M 566 54 C 566 38, 552 24, 536 24 M 34 306 C 34 322, 48 336, 64 336 M 566 306 C 566 322, 552 336, 536 336" />
          </g>

          {/* Delicate Gold Trim Accent */}
          <g stroke="#D4AF37" strokeOpacity="0.45" strokeWidth="0.8" fill="none">
            <rect x="46" y="36" width="508" height="288" rx="2" strokeDasharray="6 3" />
            <circle cx="300" cy="19" r="2.5" fill="#D4AF37" />
            <circle cx="300" cy="341" r="2.5" fill="#D4AF37" />
          </g>
        </svg>

        {/* Revealed Content: Inside the Baroque Embossed Frame */}
        <div
          ref={dateContentRef}
          className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-5 w-full"
        >
          {/* Cursive Romantic Script: "Our Forever Begins In" (Matching Reference Photo) */}
          <p className="font-script text-2xl xs:text-3xl sm:text-4xl text-[#F4EDE2] drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)] font-normal tracking-wide mb-1">
            Our Forever Begins In
          </p>

          {/* Date Numerals / Prominent Header */}
          <h4 className="font-cinzel text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] my-1 sm:my-2">
            Sunday, 13 December 2026
          </h4>

          {/* Hijri Calendar Badge */}
          <p className="font-montserrat text-[10px] sm:text-xs text-[#E3D1A6] uppercase tracking-[0.25em] font-medium mb-2.5">
            [ 1448 Rajab 03 ]
          </p>

          {/* Venue & Time Plaque */}
          <div className="my-1 sm:my-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg bg-[#18261C]/85 border border-[#D4AF37]/35 shadow-inner max-w-sm sm:max-w-md mx-auto">
            <p className="font-cinzel text-sm sm:text-base font-bold text-[#F4EDE2]">
              HITECH REGENCY, Kozhikkara
            </p>
            <p className="font-montserrat text-[11px] sm:text-xs text-[#E5C368] mt-0.5 font-semibold">
              Time: 12:00am to 2:30pm
            </p>
            <p className="font-montserrat text-[9px] sm:text-[10px] text-[#C9D6CA]/75 italic mt-0.5">
              (Printed as 12:00am in the card)
            </p>
          </div>

          {/* Open in Google Maps Button */}
          <a
            href="https://maps.google.com/?q=Hitech+Regency+Convention+Centre+Kozhikkara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#344837] hover:bg-[#435B47] border border-[#D4AF37]/50 text-[#F4ECE1] hover:text-white font-montserrat text-[9px] sm:text-[10px] uppercase tracking-[0.18em] shadow-md transition-all duration-300"
          >
            <MapPin className="w-3 h-3 text-[#E5C368]" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </a>
        </div>

        {/* Interactive 24K Gold Leaf Foil Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: 'none' }}
          aria-label="Interactive 24K gold foil scratch card covering the wedding date and venue"
          className={`absolute inset-0 z-20 w-full h-full touch-none select-none ${isRevealed ? 'pointer-events-none' : 'cursor-crosshair'
            }`}
        />
      </div>

      {/* Secondary Subtle Button: "Instant Reveal" + Status */}
      <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-6">
        {!isRevealed ? (
          <>
            <span className="font-montserrat text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-gold-accent/90 flex items-center gap-1.5 bg-gradient-to-r from-[#B8821F]/20 via-[#E8BC46]/20 to-[#B8821F]/20 px-3.5 py-1 rounded-full border border-gold-primary/30">
              <Sparkles className="w-3 h-3 text-[#E8BC46]" />
              <span>{scratchPercent > 0 ? `${scratchPercent}% Foil Cleared` : 'Swipe to scratch gold leaf to reveal'}</span>
            </span>
            <button
              type="button"
              onClick={triggerFullReveal}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gold-primary/50 bg-gradient-to-r from-[#C99326] via-[#E8BC46] to-[#C99326] text-[#241702] font-montserrat font-semibold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] shadow-gold-glow hover:brightness-110 transition-all duration-300"
            >
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Instant Reveal</span>
            </button>
          </>
        ) : (
          <span className="font-montserrat text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-gold-accent flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-gold-primary" />
            <span>The Sacred Date Has Been Illuminated</span>
          </span>
        )}
      </div>
    </section>
  );
};

export default ScratchRevealDate;
