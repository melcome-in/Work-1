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

  // Paint the Matte Champagne & Antique Royal Gold metallic foil overlay matching reference image
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

    // ─── 1. MATTE CHAMPAGNE & ANTIQUE ROYAL GOLD METALLIC GRADIENT ───
    // Soft diagonal gradient from top-left to bottom-right with diagonal champagne light band
    const baseGrad = ctx.createLinearGradient(0, height * 0.15, width, height * 0.85);
    baseGrad.addColorStop(0.00, '#8A6A47'); // Antique bronze-gold shadowed edge
    baseGrad.addColorStop(0.18, '#A3835F'); // Warm satin bronze
    baseGrad.addColorStop(0.36, '#BA9C78'); // Antique champagne gold
    baseGrad.addColorStop(0.55, '#E2D0B6'); // Soft champagne transition
    baseGrad.addColorStop(0.70, '#F5ECE0'); // Luminous diagonal champagne sheen (as in photo)
    baseGrad.addColorStop(0.82, '#DFCABA'); // Soft luster reflection
    baseGrad.addColorStop(0.92, '#BC9D78'); // Warm metallic gold
    baseGrad.addColorStop(1.00, '#8E6E49'); // Antique royal gold edge
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    // Soft secondary specular sheen ray across the right-center
    const sheenGrad = ctx.createLinearGradient(width * 0.25, 0, width, height * 0.7);
    sheenGrad.addColorStop(0.00, 'rgba(255, 255, 255, 0)');
    sheenGrad.addColorStop(0.45, 'rgba(255, 250, 240, 0.18)');
    sheenGrad.addColorStop(0.60, 'rgba(255, 255, 255, 0.28)');
    sheenGrad.addColorStop(0.75, 'rgba(255, 250, 240, 0.12)');
    sheenGrad.addColorStop(1.00, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, 0, width, height);

    // ─── 2. FINE BRUSHED METALLIC GRAIN & SATIN TEXTURE ───
    // Micro brushed horizontal fibers with ultra-low opacity (NO zebra/yellow stripes!)
    ctx.save();
    ctx.lineWidth = 0.75;
    for (let y = 0; y < height; y += 2) {
      ctx.strokeStyle = (y % 4 === 0) ? 'rgba(255, 250, 240, 0.045)' : 'rgba(70, 48, 22, 0.035)';
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    // Diagonal micro-grain (45 deg) for realistic brushed sheet metal feel
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    for (let x = -height; x < width + height; x += 5) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height * 0.6, height);
      ctx.stroke();
    }
    ctx.restore();

    // Subtle edge vignette / ambient shadow
    const vignette = ctx.createRadialGradient(
      width / 2, height / 2, Math.min(width, height) * 0.35,
      width / 2, height / 2, Math.max(width, height) * 0.72
    );
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, 'rgba(40, 25, 10, 0.24)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    // ─── 3. UNIFORM DOUBLE-LINE GOLD BORDER & CORNER FLOURISHES ───
    const isMobile = width < 420;
    const pad = isMobile ? 16 : 24;
    const gap = isMobile ? 7 : 9;
    const rOuter = isMobile ? 14 : 18;
    const rInner = isMobile ? 9 : 12;

    const drawRoundedRect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    // Helper for 3D debossed line drawing (highlight + shadow + main intaglio stroke)
    const drawBeveledBorder = (x, y, w, h, r, lw) => {
      // 1. Highlight Pass (bottom-right edge catches light)
      ctx.strokeStyle = 'rgba(255, 250, 240, 0.45)';
      ctx.lineWidth = lw;
      drawRoundedRect(x + 0.8, y + 0.9, w, h, r);
      ctx.stroke();

      // 2. Debossed Shadow Pass (top-left edge casts shadow)
      ctx.strokeStyle = 'rgba(45, 28, 12, 0.55)';
      ctx.lineWidth = lw + 0.2;
      drawRoundedRect(x - 0.6, y - 0.6, w, h, r);
      ctx.stroke();

      // 3. Main Dark Bronze Intaglio Stroke
      ctx.strokeStyle = '#3E2A14';
      ctx.lineWidth = lw;
      drawRoundedRect(x, y, w, h, r);
      ctx.stroke();
    };

    // Draw Outer & Inner Uniform Frame Lines
    drawBeveledBorder(pad, pad, width - pad * 2, height - pad * 2, rOuter, 1.4);
    drawBeveledBorder(pad + gap, pad + gap, width - (pad + gap) * 2, height - (pad + gap) * 2, rInner, 1.1);

    // Classical Ornamental Corner Flourishes (Matching Reference Photo)
    const flourishSize = isMobile ? 32 : 44;
    const drawOrnamentalCorner = (cx, cy, scaleX, scaleY) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scaleX, scaleY);

      const renderPass = (color, lw, ox = 0, oy = 0) => {
        ctx.save();
        ctx.translate(ox, oy);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = lw;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const s = flourishSize;

        // Outer corner arching volute
        ctx.beginPath();
        ctx.moveTo(s * 0.92, s * 0.02);
        ctx.bezierCurveTo(s * 0.58, s * 0.04, s * 0.28, s * 0.12, s * 0.12, s * 0.28);
        ctx.bezierCurveTo(s * 0.04, s * 0.58, s * 0.02, s * 0.92, s * 0.02, s * 0.92);
        ctx.stroke();

        // Upper spiral volute curling inward
        ctx.beginPath();
        ctx.moveTo(s * 0.92, s * 0.02);
        ctx.bezierCurveTo(s * 0.78, -s * 0.05, s * 0.60, 0, s * 0.54, s * 0.14);
        ctx.bezierCurveTo(s * 0.48, s * 0.26, s * 0.62, s * 0.34, s * 0.70, s * 0.26);
        ctx.bezierCurveTo(s * 0.76, s * 0.20, s * 0.72, s * 0.12, s * 0.64, s * 0.14);
        ctx.stroke();

        // Left spiral volute curling inward (symmetric)
        ctx.beginPath();
        ctx.moveTo(s * 0.02, s * 0.92);
        ctx.bezierCurveTo(-s * 0.05, s * 0.78, 0, s * 0.60, s * 0.14, s * 0.54);
        ctx.bezierCurveTo(s * 0.26, s * 0.48, s * 0.34, s * 0.62, s * 0.26, s * 0.70);
        ctx.bezierCurveTo(s * 0.20, s * 0.76, s * 0.12, s * 0.72, s * 0.14, s * 0.64);
        ctx.stroke();

        // Inner decorative acanthus leaf loop
        ctx.beginPath();
        ctx.moveTo(s * 0.44, s * 0.22);
        ctx.bezierCurveTo(s * 0.34, s * 0.14, s * 0.22, s * 0.14, s * 0.14, s * 0.22);
        ctx.bezierCurveTo(s * 0.14, s * 0.34, s * 0.22, s * 0.44, s * 0.32, s * 0.44);
        ctx.stroke();

        // Diagonal leafy tendril pointing to card center
        ctx.beginPath();
        ctx.moveTo(s * 0.30, s * 0.30);
        ctx.bezierCurveTo(s * 0.42, s * 0.42, s * 0.54, s * 0.54, s * 0.68, s * 0.68);
        ctx.stroke();

        // Delicate ornamental finial dots
        ctx.beginPath();
        ctx.arc(s * 0.66, s * 0.18, lw * 0.9, 0, Math.PI * 2);
        ctx.arc(s * 0.18, s * 0.66, lw * 0.9, 0, Math.PI * 2);
        ctx.arc(s * 0.68, s * 0.68, lw * 1.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      };

      // Pass 1: Highlight
      renderPass('rgba(255, 250, 240, 0.45)', 1.1, 0.7, 0.8);
      // Pass 2: Shadow
      renderPass('rgba(45, 28, 12, 0.55)', 1.3, -0.6, -0.6);
      // Pass 3: Main Stroke
      renderPass('#3E2A14', 1.2, 0, 0);

      ctx.restore();
    };

    // Draw in all 4 corners
    const cPad = pad + gap;
    drawOrnamentalCorner(cPad, cPad, 1, 1);
    drawOrnamentalCorner(width - cPad, cPad, -1, 1);
    drawOrnamentalCorner(cPad, height - cPad, 1, -1);
    drawOrnamentalCorner(width - cPad, height - cPad, -1, -1);

    // ─── 4. TYPOGRAPHY (LETTERPRESS / DEBOSSED 3D DEPTH) ───
    const centerY = height / 2;

    const drawDebossedText = (text, x, y, font, letterSpacing = '0px', mainColor = '#36230E') => {
      ctx.save();
      ctx.font = font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      try {
        ctx.letterSpacing = letterSpacing;
      } catch (e) {}

      // 1. Specular metallic bevel highlight (bottom-right edge catches light)
      ctx.fillStyle = 'rgba(255, 250, 240, 0.6)';
      ctx.fillText(text, x + 0.8, y + 1.0);

      // 2. Intaglio debossed shadow (top-left edge casts stamped shadow into foil)
      ctx.fillStyle = 'rgba(30, 18, 6, 0.55)';
      ctx.fillText(text, x - 0.7, y - 0.7);

      // 3. Main dark bronze-gold stamped face
      ctx.fillStyle = mainColor;
      ctx.fillText(text, x, y);

      ctx.restore();
    };

    // Line 1: "Swipe to Scratch" in elegant flowing script
    const scriptFontSize = isMobile ? 32 : 44;
    const scriptFont = `italic 400 ${scriptFontSize}px "Alex Brush", "Great Vibes", "Cormorant Garamond", cursive`;
    drawDebossedText('Swipe to Scratch', width / 2, centerY - (isMobile ? 26 : 34), scriptFont, '0.02em', '#3D2812');

    // Line 2: "REVEAL DATE & VENUE" in classic regal serif with balanced spacing
    const serifFontSize = isMobile ? 15 : 21;
    const serifFont = `700 ${serifFontSize}px "Cinzel", "Cinzel Decorative", serif`;
    drawDebossedText('REVEAL DATE & VENUE', width / 2, centerY + (isMobile ? 10 : 14), serifFont, isMobile ? '0.14em' : '0.18em', '#34210C');

    // Line 3: "✦ SHAHEER & NIDHA ✦" in clean, understated sans-serif
    const sansFontSize = isMobile ? 10 : 12;
    const sansFont = `600 ${sansFontSize}px "Montserrat", -apple-system, sans-serif`;
    drawDebossedText('✦ SHAHEER & NIDHA ✦', width / 2, centerY + (isMobile ? 42 : 52), sansFont, '0.24em', '#46311A');
  }, []);

  useEffect(() => {
    paintGoldFoil(true);
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        paintGoldFoil(true);
      });
    }
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
