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

  const paintGoldFoil = useCallback((force = false) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isRevealedRef.current) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(280, Math.floor(rect.width));
    const height = Math.max(220, Math.floor(rect.height));

    // Avoid wiping user's scratch progress on mobile address-bar resize when width hasn't changed
    if (!force && lastCanvasWidthRef.current && Math.abs(width - lastCanvasWidthRef.current) <= 2) {
      return;
    }
    lastCanvasWidthRef.current = width;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.globalCompositeOperation = 'source-over';

    // 1. Metallic Gold Brushed Gradient Base
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#9E7423');
    grad.addColorStop(0.2, '#D4AF37');
    grad.addColorStop(0.4, '#FCF6BA');
    grad.addColorStop(0.6, '#D4AF37');
    grad.addColorStop(0.8, '#E8C868');
    grad.addColorStop(1, '#8E6418');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Brushed Gold Foil Texture Lines
    ctx.strokeStyle = 'rgba(255, 250, 220, 0.16)';
    ctx.lineWidth = 1;
    for (let y = 0; y < height; y += 3) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y + (Math.sin(y) * 2));
      ctx.stroke();
    }

    // 3. Subtle Arabesque Geometric Watermark Rings
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.strokeStyle = 'rgba(6, 24, 18, 0.16)';
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 8; i++) {
      ctx.rotate(Math.PI / 4);
      ctx.strokeRect(-65, -65, 130, 130);
    }
    ctx.beginPath();
    ctx.arc(0, 0, 88, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 52, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 4. Inner Ornamental Border on Foil
    ctx.strokeStyle = 'rgba(6, 24, 18, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    // 5. Calligraphic Foil Text Overlay
    ctx.fillStyle = '#061812';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = width < 400 ? '600 14px "Cinzel Decorative", serif' : '600 17px "Cinzel Decorative", serif';
    ctx.fillText('Scratch to Reveal Date & Venue', width / 2, height / 2);
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
        particleCount: 65,
        spread: 70,
        origin: {
          x: Math.min(0.9, Math.max(0.1, originX)),
          y: Math.min(0.9, Math.max(0.1, originY)),
        },
        colors: ['#D4AF37', '#E8C868', '#FAF7EE', '#F3E5AB'],
        ticks: 190,
        scalar: 0.9,
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
        { scale: 0.94, filter: 'brightness(1.5)' },
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
    const stride = 16; // Sample every 4th pixel for smooth 60fps performance

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
    ctx.lineWidth = 52;

    ctx.beginPath();
    if (lastPointRef.current) {
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(point.x, point.y);
    } else {
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x + 0.1, point.y + 0.1);
    }
    ctx.stroke();

    // Soft feathered brush circle
    ctx.beginPath();
    ctx.arc(point.x, point.y, 26, 0, Math.PI * 2);
    ctx.fill();

    lastPointRef.current = point;
  };

  const handlePointerDown = (e) => {
    if (isRevealedRef.current) return;
    if (e.currentTarget.setPointerCapture && e.pointerId !== undefined) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture is unsupported
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

      {/* Scratch Card Frame */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[275px] sm:min-h-[300px] rounded-2xl p-3.5 sm:p-10 bg-gradient-to-b from-emerald-royal via-[#05140F] to-obsidian border-2 border-gold-primary/70 shadow-gold-glow overflow-hidden flex items-center justify-center select-none"
      >
        {/* Corner Filigree Ornaments */}
        <span className="absolute top-2.5 left-3 sm:top-3 sm:left-4 text-gold-primary/70 text-xs sm:text-sm pointer-events-none">
          ❖
        </span>
        <span className="absolute top-2.5 right-3 sm:top-3 sm:right-4 text-gold-primary/70 text-xs sm:text-sm pointer-events-none">
          ❖
        </span>
        <span className="absolute bottom-2.5 left-3 sm:bottom-3 sm:left-4 text-gold-primary/70 text-xs sm:text-sm pointer-events-none">
          ❖
        </span>
        <span className="absolute bottom-2.5 right-3 sm:bottom-3 sm:right-4 text-gold-primary/70 text-xs sm:text-sm pointer-events-none">
          ❖
        </span>

        {/* Underneath Illuminated Revealed Date Content */}
        <div
          ref={dateContentRef}
          className="relative z-10 flex flex-col items-center justify-center text-center px-1 py-2 w-full"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gold-primary/15 border border-gold-primary/40 text-gold-accent font-montserrat text-[9px] sm:text-[10px] uppercase tracking-[0.25em] mb-2 sm:mb-3">
            <Sparkles className="w-3 h-3" />
            <span>1448 Rajab 03</span>
            <Sparkles className="w-3 h-3" />
          </div>

          <h4 className="font-cinzel text-xl sm:text-3xl md:text-4xl font-bold text-gold-foil tracking-wide drop-shadow-[0_0_25px_rgba(212,175,55,0.45)] mb-1 sm:mb-2">
            Sunday, 13 December 2026
          </h4>

          <div className="my-1.5 sm:my-2 p-2.5 sm:p-4 rounded-xl bg-obsidian/80 border border-gold-primary/40 max-w-sm sm:max-w-md mx-auto w-full">
            <p className="font-cinzel text-sm sm:text-lg font-bold text-gold-accent leading-snug">
              HITECH REGENCY, Kozhikkara
            </p>
            <p className="font-montserrat text-[11px] sm:text-sm text-parchment/95 mt-0.5 sm:mt-1 font-semibold">
              Time: 12:00am to 2:30pm
            </p>
            <p className="font-montserrat text-[9px] sm:text-[10px] text-parchment/65 italic mt-0.5">
              (Note: Printed as 12:00am in the card)
            </p>
          </div>

          <a
            href="https://maps.google.com/?q=Hitech+Regency+Convention+Centre+Kozhikkara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-1 sm:mt-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gold-primary/20 hover:bg-gold-primary/35 border border-gold-primary/50 text-gold-accent hover:text-gold-foil font-montserrat text-[9px] sm:text-[10px] uppercase tracking-[0.18em] transition-all"
          >
            <MapPin className="w-3 h-3" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </a>
        </div>

        {/* Interactive Gold Foil Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: 'none' }}
          aria-label="Interactive gold foil scratch card covering the wedding date and venue"
          className={`absolute inset-0 z-20 w-full h-full touch-none select-none ${
            isRevealed ? 'pointer-events-none' : 'cursor-crosshair'
          }`}
        />
      </div>

      {/* Secondary Subtle Button: "Instant Reveal" + Status */}
      <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-6">
        {!isRevealed ? (
          <>
            <span className="font-montserrat text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-parchment/60">
              {scratchPercent > 0
                ? `${scratchPercent}% Foil Cleared`
                : 'Touch & scratch gold leaf to reveal'}
            </span>
            <button
              type="button"
              onClick={triggerFullReveal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full border border-gold-primary/40 hover:border-gold-primary bg-emerald-royal/60 hover:bg-gold-primary/15 text-gold-accent font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.2em] transition-all duration-300"
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

