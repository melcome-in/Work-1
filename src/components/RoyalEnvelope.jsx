import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

const RoyalEnvelope = ({ onOpenComplete, onTriggerAudio }) => {
  const [isOpening, setIsOpening] = useState(false);

  const overlayRef = useRef(null);
  const envelopeStageRef = useRef(null);
  const envelopeShellRef = useRef(null);
  const topFlapRef = useRef(null);
  const waxSealRef = useRef(null);
  const letterCardRef = useRef(null);
  const promptTextRef = useRef(null);

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);

    // 1. Trigger audio click + start background Maqam Hijaz synth
    if (onTriggerAudio) {
      onTriggerAudio();
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        if (onOpenComplete) onOpenComplete();
      },
    });

    // Step 1: Wax seal gentle micro-depress & activation pulse
    tl.to(waxSealRef.current, {
      scale: 0.94,
      duration: 0.22,
      ease: 'power2.out',
    })
      // Step 2: Golden lines race outward from the seal through the flowers and leaves
      .to(
        '.golden-floral-line',
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.035,
          ease: 'power2.inOut',
        },
        '-=0.08'
      )
      // Golden blooms expand into the flower petals
      .to(
        '.golden-floral-bloom',
        {
          opacity: 1,
          scale: 1,
          duration: 0.75,
          stagger: 0.04,
          ease: 'back.out(1.5)',
        },
        '-=0.75'
      )
      // Step 3: Intense celebratory burst as flowers reach full golden bloom
      .to(
        waxSealRef.current,
        {
          scale: 1.16,
          opacity: 0,
          duration: 0.35,
          ease: 'back.out(2)',
          onStart: () => {
            // Canvas confetti burst in royal gold, champagne & emerald sparkles
            confetti({
              particleCount: 95,
              spread: 95,
              origin: { y: 0.52 },
              colors: ['#D4AF37', '#FFF3C4', '#F3D98B', '#164834', '#E8C868', '#A67C1E'],
              ticks: 240,
              gravity: 0.85,
              scalar: 0.95,
            });
          },
        },
        '+=0.15'
      )
      // Fade out helper prompt text
      .to(
        promptTextRef.current,
        {
          opacity: 0,
          y: 12,
          duration: 0.3,
        },
        '<'
      )
      // Step 4: Top flap folds upward in 3D (rotateX: -180deg, transformOrigin: "top center")
      .to(
        topFlapRef.current,
        {
          rotateX: -180,
          transformOrigin: 'top center',
          duration: 0.95,
          ease: 'power2.inOut',
          onUpdate: function () {
            // Lower flap z-index once past 90 degrees so the rising letter passes cleanly in front
            if (this.progress() > 0.45 && topFlapRef.current) {
              topFlapRef.current.style.zIndex = '15';
            }
          },
        },
        '-=0.08'
      )
      // Step 4: Letter card slides vertically out of the envelope cavity
      .to(
        letterCardRef.current,
        {
          y: typeof window !== 'undefined' && window.innerWidth < 640 ? -115 : -175,
          scale: 1.04,
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), 0 0 40px rgba(212, 175, 55, 0.35)',
          duration: 1.05,
          ease: 'power3.out',
        },
        '-=0.35'
      )
      // Step 5: Envelope shell drops & fades out while the letter expands into the full-page layout
      .to(
        envelopeShellRef.current,
        {
          opacity: 0,
          y: 90,
          scale: 0.92,
          duration: 0.75,
          ease: 'power2.inOut',
        },
        '-=0.15'
      )
      .to(
        letterCardRef.current,
        {
          y: 0,
          scale: 1.25,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.inOut',
        },
        '<'
      )
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
        },
        '-=0.35'
      );
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center min-h-[100dvh] px-3 sm:px-4 pt-10 pb-6 sm:pt-16 sm:pb-10 bg-[#0A140F]/98 backdrop-blur-md select-none overflow-y-auto overflow-x-hidden"
    >
      {/* Ambient Radial Spotlight behind the Envelope */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,43,32,0.45)_0%,rgba(10,20,15,0.95)_75%)]"
      />

      {/* Top Ceremonial Bismillah with Generous Viewport Spacing */}
      <div className="relative z-10 text-center pt-2 sm:pt-6 mb-4 sm:mb-8">
        <p className="font-amiri text-xl sm:text-3xl text-gold-primary tracking-wide">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>

      {/* 3D Perspective Stage (perspective: 1200px) */}
      <div
        ref={envelopeStageRef}
        style={{ perspective: '1200px' }}
        className="relative z-20 w-full max-w-[325px] sm:max-w-[460px] aspect-[460/320] flex items-center justify-center"
      >
        <div className="relative w-full h-full preserve-3d">
          {/* Layer 1: Back Cavity of the Envelope */}
          <div
            ref={envelopeShellRef}
            className="absolute inset-0 preserve-3d pointer-events-none"
          >
            {/* Deep Forest Emerald Backboard with Realistic Soft Drop Shadow */}
            <div 
              style={{ boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75), 0 0 45px rgba(212, 175, 55, 0.18)' }}
              className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#16382B] via-[#122B20] to-[#0D1F17] border border-gold-primary/60"
            >
              <div className="absolute inset-2 rounded-lg border border-gold-primary/25" />
            </div>

            {/* Layer 3: Front Pocket Flaps (Left, Right, Bottom) with Embossed Botanical Floral & Leaf Artwork */}
            <svg
              viewBox="0 0 460 320"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full z-30 rounded-xl overflow-hidden drop-shadow-[0_-6px_16px_rgba(0,0,0,0.65)]"
            >
              <defs>
                <linearGradient id="leftRightFlap" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#153628" />
                  <stop offset="50%" stopColor="#122B20" />
                  <stop offset="100%" stopColor="#0E231A" />
                </linearGradient>
                <linearGradient id="bottomFlap" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#173B2C" />
                  <stop offset="100%" stopColor="#10261D" />
                </linearGradient>
                <linearGradient id="goldEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8A6621" />
                  <stop offset="50%" stopColor="#E8C868" />
                  <stop offset="100%" stopColor="#8A6621" />
                </linearGradient>
                <linearGradient id="antiqueGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C59A3F" />
                  <stop offset="25%" stopColor="#F9E5A8" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="75%" stopColor="#FDF2D3" />
                  <stop offset="100%" stopColor="#A8812F" />
                </linearGradient>
              </defs>

              {/* Left Folded Flap */}
              <polygon
                points="0,0 230,170 0,320"
                fill="url(#leftRightFlap)"
                stroke="url(#goldEdge)"
                strokeWidth="1.2"
              />
              {/* Right Folded Flap */}
              <polygon
                points="460,0 230,170 460,320"
                fill="url(#leftRightFlap)"
                stroke="url(#goldEdge)"
                strokeWidth="1.2"
              />
              {/* Bottom Folded Pocket Flap */}
              <polygon
                points="0,320 230,148 460,320"
                fill="url(#bottomFlap)"
                stroke="url(#goldEdge)"
                strokeWidth="1.5"
              />

              {/* ─── Embossed Botanical Leaves & Floral Vines (Bottom & Side Flaps) ─── */}
              <g className="select-none pointer-events-none opacity-85">
                {/* Embossed Paper Shadow Layer (offset -0.8px, -0.8px) */}
                <g stroke="#06160F" fill="none" opacity="0.75" transform="translate(-0.8, -0.8)">
                  {/* Lower-left main vine */}
                  <path d="M 226,165 C 195,190 160,225 125,255 C 105,270 95,278 88,288" strokeWidth="2.2" />
                  <path d="M 180,205 C 168,212 152,210 144,202" strokeWidth="1.8" />
                  <path d="M 150,235 C 138,242 122,240 114,232" strokeWidth="1.8" />
                  {/* Lower-right main vine */}
                  <path d="M 234,165 C 265,190 300,225 335,255 C 355,270 365,278 372,288" strokeWidth="2.2" />
                  <path d="M 280,205 C 292,212 308,210 316,202" strokeWidth="1.8" />
                  <path d="M 310,235 C 322,242 338,240 346,232" strokeWidth="1.8" />
                  {/* Central-bottom vine */}
                  <path d="M 230,175 C 232,210 228,255 230,302" strokeWidth="2.0" />
                  {/* Lateral side sprigs */}
                  <path d="M 220,165 C 160,160 105,162 45,160" strokeWidth="1.8" />
                  <path d="M 240,165 C 300,160 355,162 415,160" strokeWidth="1.8" />
                </g>

                {/* Embossed Paper Highlight Layer (offset +0.8px, +0.8px) */}
                <g stroke="#225D43" fill="none" opacity="0.45" transform="translate(0.8, 0.8)">
                  <path d="M 226,165 C 195,190 160,225 125,255 C 105,270 95,278 88,288" strokeWidth="1.6" />
                  <path d="M 180,205 C 168,212 152,210 144,202" strokeWidth="1.2" />
                  <path d="M 150,235 C 138,242 122,240 114,232" strokeWidth="1.2" />
                  <path d="M 234,165 C 265,190 300,225 335,255 C 355,270 365,278 372,288" strokeWidth="1.6" />
                  <path d="M 280,205 C 292,212 308,210 316,202" strokeWidth="1.2" />
                  <path d="M 310,235 C 322,242 338,240 346,232" strokeWidth="1.2" />
                  <path d="M 230,175 C 232,210 228,255 230,302" strokeWidth="1.4" />
                  <path d="M 220,165 C 160,160 105,162 45,160" strokeWidth="1.2" />
                  <path d="M 240,165 C 300,160 355,162 415,160" strokeWidth="1.2" />
                </g>

                {/* Embossed Botanical Leaves & Petals on Emerald Paper */}
                <g fill="#0D2E21" stroke="#164531" strokeWidth="0.8" opacity="0.8">
                  {/* Left foliage leaves */}
                  <path d="M 180,205 C 172,195 158,198 150,205 C 162,210 172,210 180,205 Z" />
                  <path d="M 150,235 C 142,225 128,228 120,235 C 132,240 142,240 150,235 Z" />
                  <path d="M 125,255 C 112,248 98,252 92,260 C 105,264 116,262 125,255 Z" />
                  {/* Right foliage leaves */}
                  <path d="M 280,205 C 288,195 302,198 310,205 C 298,210 288,210 280,205 Z" />
                  <path d="M 310,235 C 318,225 332,228 340,235 C 328,240 318,240 310,235 Z" />
                  <path d="M 335,255 C 348,248 362,252 368,260 C 355,264 344,262 335,255 Z" />
                  {/* Central-bottom leaves */}
                  <path d="M 230,225 C 218,218 206,224 200,232 C 212,234 222,232 230,225 Z" />
                  <path d="M 230,255 C 242,248 254,254 260,262 C 248,264 238,262 230,255 Z" />
                  {/* Lower-left flower petals */}
                  <circle cx="88" cy="288" r="8" />
                  <circle cx="82" cy="284" r="6" />
                  <circle cx="94" cy="284" r="6" />
                  {/* Lower-right flower petals */}
                  <circle cx="372" cy="288" r="8" />
                  <circle cx="366" cy="284" r="6" />
                  <circle cx="378" cy="284" r="6" />
                </g>
              </g>

              {/* ─── Animated Golden Lines (Starts from seal, traces through flowers & leaves) ─── */}
              <g className="select-none pointer-events-none">
                {/* Lower-left golden stem */}
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 226,165 C 195,190 160,225 125,255 C 105,270 95,278 88,288"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 180,205 C 168,212 152,210 144,202"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 150,235 C 138,242 122,240 114,232"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />

                {/* Lower-right golden stem */}
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 234,165 C 265,190 300,225 335,255 C 355,270 365,278 372,288"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 280,205 C 292,212 308,210 316,202"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 310,235 C 322,242 338,240 346,232"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />

                {/* Central-bottom golden stem */}
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 230,175 C 232,210 228,255 230,302"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />

                {/* Lateral side golden sprigs */}
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 220,165 C 160,160 105,162 45,160"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 240,165 C 300,160 355,162 415,160"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />

                {/* Golden Leaf Contours */}
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 180,205 C 172,195 158,198 150,205 C 162,210 172,210 180,205 Z"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.2"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 280,205 C 288,195 302,198 310,205 C 298,210 288,210 280,205 Z"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.2"
                  fill="none"
                  opacity="0"
                />

                {/* Golden Floral Blossoms (Expand & Glow) */}
                <g className="golden-floral-bloom" opacity="0">
                  <circle cx="88" cy="288" r="8" fill="url(#antiqueGoldGrad)" opacity="0.85" />
                  <circle cx="82" cy="284" r="5" fill="#FFF4D0" opacity="0.9" />
                  <circle cx="94" cy="284" r="5" fill="#FFF4D0" opacity="0.9" />
                  <circle cx="88" cy="288" r="3.5" fill="#6B4E1B" />
                </g>
                <g className="golden-floral-bloom" opacity="0">
                  <circle cx="372" cy="288" r="8" fill="url(#antiqueGoldGrad)" opacity="0.85" />
                  <circle cx="366" cy="284" r="5" fill="#FFF4D0" opacity="0.9" />
                  <circle cx="378" cy="284" r="5" fill="#FFF4D0" opacity="0.9" />
                  <circle cx="372" cy="288" r="3.5" fill="#6B4E1B" />
                </g>
              </g>

              {/* Inner Ornamental Gold Filigree Line on Bottom Flap */}
              <polyline
                points="24,316 230,164 436,316"
                fill="none"
                stroke="#D4AF37"
                strokeOpacity="0.4"
                strokeWidth="1.0"
                strokeDasharray="4 3"
              />
            </svg>

            {/* Outer Gold Frame Border */}
            <div className="absolute inset-0 z-30 rounded-xl border border-gold-primary/60 pointer-events-none" />
          </div>

          {/* Layer 2: The Royal Letter Card Seated Inside the Envelope Cavity */}
          <div
            ref={letterCardRef}
            className="absolute left-3 right-3 top-3 bottom-3 sm:left-5 sm:right-5 sm:top-4 sm:bottom-5 z-20 rounded-lg bg-gradient-to-b from-[#FAF7EE] via-[#F5EFE0] to-[#EDE3CC] text-obsidian p-3 sm:p-5 shadow-2xl border-2 border-gold-primary flex flex-col items-center justify-between text-center pointer-events-none"
          >
            {/* Inner Gold Double Filigree Border */}
            <div className="w-full h-full border border-gold-primary/60 rounded p-2.5 sm:p-4 flex flex-col items-center justify-between relative">
              {/* Corner Arabesque Accents */}
              <span className="absolute top-1 left-1.5 sm:top-1.5 sm:left-2 text-gold-primary text-[10px] sm:text-xs">✦</span>
              <span className="absolute top-1 right-1.5 sm:top-1.5 sm:right-2 text-gold-primary text-[10px] sm:text-xs">✦</span>
              <span className="absolute bottom-1 left-1.5 sm:bottom-1.5 sm:left-2 text-gold-primary text-[10px] sm:text-xs">✦</span>
              <span className="absolute bottom-1 right-1.5 sm:bottom-1.5 sm:right-2 text-gold-primary text-[10px] sm:text-xs">✦</span>

              {/* Upper Section: Elegant Romantic Quote */}
              <div className="pt-0.5 sm:pt-1">
                <p className="font-cormorant italic text-[11px] sm:text-sm text-obsidian/85 max-w-[260px] leading-tight">
                  &ldquo;love, laughter and happily ever after&rdquo;
                </p>
              </div>

              {/* Middle Clear Gap: Gives space for the wax seal resting over the flap */}
              <div className="h-6 sm:h-9" />

              {/* Visible Lower Section: Names & Date Positioned Unobstructed Below Flap Tip */}
              <div className="w-full flex flex-col items-center pb-0.5 sm:pb-1">
                <h2 className="font-cinzel text-base sm:text-2xl font-bold text-emerald-royal tracking-wider mb-1 leading-snug">
                  Shaheer &amp; Nidha
                </h2>

                <div className="w-20 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent mb-1.5 sm:mb-2" />

                <p className="font-montserrat text-[9px] sm:text-xs tracking-[0.25em] text-obsidian/80 font-medium uppercase">
                  13 | DECEMBER | 2026
                </p>
              </div>
            </div>
          </div>

          {/* Layer 4: 3D Top Triangular Flap in Rich Forest Emerald with Botanical Peonies & Foliage */}
          <div
            ref={topFlapRef}
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
            }}
            className="absolute top-0 left-0 right-0 h-[51%] z-40 pointer-events-none"
          >
            <svg
              viewBox="0 0 460 162"
              preserveAspectRatio="none"
              className="w-full h-full drop-shadow-[0_12px_22px_rgba(0,0,0,0.75)]"
            >
              <defs>
                <linearGradient id="topFlapGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#194232" />
                  <stop offset="60%" stopColor="#122B20" />
                  <stop offset="100%" stopColor="#0E231A" />
                </linearGradient>
              </defs>
              <polygon
                points="0,0 460,0 230,162"
                fill="url(#topFlapGrad)"
                stroke="#D4AF37"
                strokeWidth="1.6"
              />
              <polyline
                points="22,6 230,148 438,6"
                fill="none"
                stroke="#E8C868"
                strokeOpacity="0.45"
                strokeWidth="1"
              />

              {/* ─── Embossed Botanical Artwork (Top Flap) ─── */}
              <g className="select-none pointer-events-none opacity-85">
                {/* Embossed Paper Shadows */}
                <g stroke="#05140D" fill="none" opacity="0.7" transform="translate(-0.8, -0.8)">
                  {/* Left Climbing Vine */}
                  <path d="M 226,155 C 195,130 160,95 125,65 C 105,50 95,45 88,40" strokeWidth="2.2" />
                  <path d="M 175,115 C 160,105 145,110 135,118" strokeWidth="1.8" />
                  <path d="M 140,85 C 140,65 155,50 168,42" strokeWidth="1.8" />
                  {/* Right Climbing Vine */}
                  <path d="M 234,155 C 265,130 300,95 335,65 C 355,50 365,45 372,40" strokeWidth="2.2" />
                  <path d="M 285,115 C 300,105 315,110 325,118" strokeWidth="1.8" />
                  <path d="M 320,85 C 320,65 305,50 292,42" strokeWidth="1.8" />
                  {/* Central Ascending Sprig */}
                  <path d="M 230,145 C 228,105 232,65 230,25" strokeWidth="2.0" />
                </g>

                {/* Embossed Paper Highlights */}
                <g stroke="#225D43" fill="none" opacity="0.45" transform="translate(0.8, 0.8)">
                  <path d="M 226,155 C 195,130 160,95 125,65 C 105,50 95,45 88,40" strokeWidth="1.6" />
                  <path d="M 175,115 C 160,105 145,110 135,118" strokeWidth="1.2" />
                  <path d="M 140,85 C 140,65 155,50 168,42" strokeWidth="1.2" />
                  <path d="M 234,155 C 265,130 300,95 335,65 C 355,50 365,45 372,40" strokeWidth="1.6" />
                  <path d="M 285,115 C 300,105 315,110 325,118" strokeWidth="1.2" />
                  <path d="M 320,85 C 320,65 305,50 292,42" strokeWidth="1.2" />
                  <path d="M 230,145 C 228,105 232,65 230,25" strokeWidth="1.4" />
                </g>

                {/* Embossed Leaves & Blossoms */}
                <g fill="#0D2E21" stroke="#164531" strokeWidth="0.8" opacity="0.8">
                  {/* Left foliage leaves */}
                  <path d="M 175,115 C 168,105 155,108 148,114 C 158,118 168,118 175,115 Z" />
                  <path d="M 140,85 C 148,75 160,78 168,84 C 158,88 148,88 140,85 Z" />
                  <path d="M 115,60 C 102,52 88,56 82,64 C 95,68 106,66 115,60 Z" />
                  {/* Right foliage leaves */}
                  <path d="M 285,115 C 292,105 305,108 312,114 C 302,118 292,118 285,115 Z" />
                  <path d="M 320,85 C 312,75 300,78 292,84 C 302,88 312,88 320,85 Z" />
                  <path d="M 345,60 C 358,52 372,56 378,64 C 365,68 354,66 345,60 Z" />
                  {/* Central Leaves */}
                  <path d="M 230,105 C 218,98 206,104 200,112 C 212,114 222,112 230,105 Z" />
                  <path d="M 230,75 C 242,68 254,74 260,82 C 248,84 238,82 230,75 Z" />
                  {/* Left Peony Blossom */}
                  <circle cx="88" cy="40" r="10" />
                  <circle cx="80" cy="35" r="7" />
                  <circle cx="96" cy="35" r="7" />
                  {/* Right Peony Blossom */}
                  <circle cx="372" cy="40" r="10" />
                  <circle cx="364" cy="35" r="7" />
                  <circle cx="380" cy="35" r="7" />
                </g>
              </g>

              {/* ─── Animated Golden Lines (Top Flap - Starts from seal, branches into blossoms) ─── */}
              <g className="select-none pointer-events-none">
                {/* Left climbing golden stem */}
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 226,155 C 195,130 160,95 125,65 C 105,50 95,45 88,40"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 175,115 C 160,105 145,110 135,118"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 140,85 C 140,65 155,50 168,42"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />

                {/* Right climbing golden stem */}
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 234,155 C 265,130 300,95 335,65 C 355,50 365,45 372,40"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 285,115 C 300,105 315,110 325,118"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 320,85 C 320,65 305,50 292,42"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />

                {/* Central ascending golden stem */}
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 230,145 C 228,105 232,65 230,25"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />

                {/* Golden Leaf Contours (Top Flap) */}
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 175,115 C 168,105 155,108 148,114 C 158,118 168,118 175,115 Z"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.2"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 285,115 C 292,105 305,108 312,114 C 302,118 292,118 285,115 Z"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.2"
                  fill="none"
                  opacity="0"
                />

                {/* Golden Peony Blossoms (Bloom & Glow) */}
                <g className="golden-floral-bloom" opacity="0">
                  <circle cx="88" cy="40" r="10" fill="url(#antiqueGoldGrad)" opacity="0.85" />
                  <circle cx="80" cy="35" r="6" fill="#FFF4D0" opacity="0.9" />
                  <circle cx="96" cy="35" r="6" fill="#FFF4D0" opacity="0.9" />
                  <circle cx="88" cy="40" r="4" fill="#6B4E1B" />
                </g>
                <g className="golden-floral-bloom" opacity="0">
                  <circle cx="372" cy="40" r="10" fill="url(#antiqueGoldGrad)" opacity="0.85" />
                  <circle cx="364" cy="35" r="6" fill="#FFF4D0" opacity="0.9" />
                  <circle cx="380" cy="35" r="6" fill="#FFF4D0" opacity="0.9" />
                  <circle cx="372" cy="40" r="4" fill="#6B4E1B" />
                </g>
              </g>
            </svg>
          </div>

          {/* Layer 5: Pearl Ivory & Gold Stamped Wax Seal with Floral Bouquet & S | N Monogram */}
          <div className="absolute left-1/2 top-[50.5%] -translate-x-1/2 -translate-y-1/2 z-50">
            <button
              ref={waxSealRef}
              type="button"
              onClick={handleOpenEnvelope}
              disabled={isOpening}
              aria-label="Break the royal wax seal to open wedding invitation"
              className="group relative w-22 h-22 sm:w-28 sm:h-28 cursor-pointer focus:outline-none wax-seal-glow transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center justify-center p-0 bg-transparent border-0"
            >
              <svg
                viewBox="0 0 160 160"
                className="w-full h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Metallic Antique Gold Gradient */}
                  <linearGradient id="sealGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C59A3F" />
                    <stop offset="25%" stopColor="#F9E5A8" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="75%" stopColor="#FDF2D3" />
                    <stop offset="100%" stopColor="#A8812F" />
                  </linearGradient>

                  {/* Pearlescent Ivory Wax Body Gradient (as in reference photo) */}
                  <radialGradient id="ivoryWaxBody" cx="34%" cy="28%" r="70%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="25%" stopColor="#F7F2E8" />
                    <stop offset="55%" stopColor="#E7DCCB" />
                    <stop offset="85%" stopColor="#D5C5B1" />
                    <stop offset="100%" stopColor="#BBA690" />
                  </radialGradient>

                  {/* Recessed Stamp Dish Gradient */}
                  <radialGradient id="ivoryDishGrad" cx="38%" cy="32%" r="62%">
                    <stop offset="0%" stopColor="#EFE8DC" />
                    <stop offset="50%" stopColor="#E1D4C1" />
                    <stop offset="90%" stopColor="#CBBCA7" />
                    <stop offset="100%" stopColor="#B39F88" />
                  </radialGradient>

                  {/* Glossy Specular Rim Sheen Gradient */}
                  <linearGradient id="ivoryRimSheen" x1="15%" y1="10%" x2="70%" y2="55%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.8" />
                    <stop offset="55%" stopColor="#FFFDF9" stopOpacity="0.95" />
                    <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* 1. Organic Hand-Poured Wax Pebble Contour (matching photo) */}
                <path
                  d="M 80,6
                     C 108,5 137,20 148,46
                     C 157,68 155,98 144,121
                     C 133,144 106,155 79,154
                     C 51,153 23,143 11,119
                     C 0,95 3,66 15,41
                     C 27,16 53,7 80,6 Z"
                  fill="url(#ivoryWaxBody)"
                />

                {/* Outer Wax Rim Thickness & 3D Contour */}
                <path
                  d="M 80,8
                     C 106,7 134,22 144,47
                     C 153,68 151,96 141,118
                     C 130,140 104,151 79,150
                     C 53,149 26,139 15,116
                     C 4,93 7,66 18,43
                     C 29,19 54,9 80,8 Z"
                  fill="none"
                  stroke="#A8947D"
                  strokeWidth="2.0"
                  strokeOpacity="0.4"
                />

                {/* Wet Lacquer Specular High-Gloss Sheen along Rim */}
                <path
                  d="M 28,52 C 22,34 39,20 60,13 C 80,8 106,9 126,18 C 137,24 146,36 148,48"
                  fill="none"
                  stroke="url(#ivoryRimSheen)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 38,42 C 48,22 72,14 96,13 C 112,13 128,19 138,28"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeOpacity="0.85"
                />

                {/* Wax Rim Droplets & Organic Pits */}
                <circle cx="86" cy="11" r="1.8" fill="#8C7A65" opacity="0.6" />
                <circle cx="86.8" cy="11.8" r="1.2" fill="#FFFFFF" opacity="0.9" />
                <circle cx="96" cy="138" r="1.8" fill="#8C7A65" opacity="0.6" />
                <circle cx="96.7" cy="138.7" r="1.2" fill="#FFFFFF" opacity="0.9" />

                {/* 2. Recessed Inner Circular Stamped Dish */}
                <circle cx="80" cy="80" r="54" fill="url(#ivoryDishGrad)" />

                {/* Outer Stamped Ring: Debossed Shadow + Antique Gold Metallic Finish */}
                <circle
                  cx="79.2"
                  cy="79.2"
                  r="53"
                  fill="none"
                  stroke="#8C7761"
                  strokeWidth="2.2"
                  strokeOpacity="0.65"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="53"
                  fill="none"
                  stroke="url(#sealGoldGrad)"
                  strokeWidth="1.8"
                  strokeOpacity="0.95"
                />

                {/* Inner Stamped Ring: Delicate Gold Ridge */}
                <circle
                  cx="79.3"
                  cy="79.3"
                  r="47"
                  fill="none"
                  stroke="#8C7761"
                  strokeWidth="1.6"
                  strokeOpacity="0.5"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="47"
                  fill="none"
                  stroke="url(#sealGoldGrad)"
                  strokeWidth="1.2"
                  strokeOpacity="0.85"
                />

                {/* 3. Embossed Botanical Bouquet (Matching Photo) with Gold S | N Monogram */}
                {/* Botanical Bouquet Sprig */}
                <g transform="translate(0, -6)">
                  {/* Stem & Leaves Shadow */}
                  <g stroke="#8A7660" fill="none" strokeWidth="1.6" opacity="0.6" transform="translate(-0.8, -0.8)">
                    <path d="M 80,82 C 78,74 72,66 68,60" />
                    <path d="M 80,82 C 82,72 88,64 92,58" />
                    <path d="M 74,70 C 68,68 64,72 62,75" />
                    <path d="M 86,68 C 92,66 96,70 98,73" />
                  </g>
                  {/* Stem & Leaves Gold Metallic */}
                  <g stroke="url(#sealGoldGrad)" fill="none" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M 80,82 C 78,74 72,66 68,60" />
                    <path d="M 80,82 C 82,72 88,64 92,58" />
                    <path d="M 74,70 C 68,68 64,72 62,75" />
                    <path d="M 86,68 C 92,66 96,70 98,73" />
                  </g>

                  {/* Left Daisy/Rose Blossom */}
                  <g transform="translate(68, 59)">
                    <circle cx="0" cy="0" r="8" fill="#EDE4D5" stroke="#9E8A73" strokeWidth="0.8" />
                    <circle cx="0" cy="0" r="3" fill="url(#sealGoldGrad)" />
                    {/* Petal radial accents */}
                    <path d="M -7,0 L -3,0 M 7,0 L 3,0 M 0,-7 L 0,-3 M 0,7 L 0,3" stroke="url(#sealGoldGrad)" strokeWidth="0.9" />
                  </g>

                  {/* Right Daisy/Rose Blossom */}
                  <g transform="translate(92, 57)">
                    <circle cx="0" cy="0" r="7.5" fill="#EDE4D5" stroke="#9E8A73" strokeWidth="0.8" />
                    <circle cx="0" cy="0" r="2.8" fill="url(#sealGoldGrad)" />
                    <path d="M -6,0 L -3,0 M 6,0 L 3,0 M 0,-6 L 0,-3 M 0,6 L 0,3" stroke="url(#sealGoldGrad)" strokeWidth="0.9" />
                  </g>
                </g>

                {/* Stamped Metallic Antique Gold "S | N" Monogram */}
                <g transform="translate(0, 16)">
                  {/* Monogram Shadow */}
                  <g transform="translate(-1, -1)" fill="#8A7660" opacity="0.75">
                    <text
                      x="61"
                      y="88"
                      textAnchor="middle"
                      fontFamily='"Cinzel", serif'
                      fontWeight="700"
                      fontSize="26"
                      letterSpacing="0.04em"
                    >
                      S
                    </text>
                    <text
                      x="99"
                      y="88"
                      textAnchor="middle"
                      fontFamily='"Cinzel", serif'
                      fontWeight="700"
                      fontSize="26"
                      letterSpacing="0.04em"
                    >
                      N
                    </text>
                  </g>
                  <line
                    x1="79"
                    y1="68"
                    x2="79"
                    y2="92"
                    stroke="#8A7660"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.75"
                  />

                  {/* Monogram Gold Face */}
                  <g fill="url(#sealGoldGrad)">
                    <text
                      x="61"
                      y="88"
                      textAnchor="middle"
                      fontFamily='"Cinzel", serif'
                      fontWeight="700"
                      fontSize="26"
                      letterSpacing="0.04em"
                    >
                      S
                    </text>
                    <text
                      x="99"
                      y="88"
                      textAnchor="middle"
                      fontFamily='"Cinzel", serif'
                      fontWeight="700"
                      fontSize="26"
                      letterSpacing="0.04em"
                    >
                      N
                    </text>
                  </g>
                  <line
                    x1="80"
                    y1="69"
                    x2="80"
                    y2="93"
                    stroke="url(#sealGoldGrad)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Highlight catch */}
                  <g fill="none" stroke="#FFFFFF" strokeWidth="0.4" strokeOpacity="0.8">
                    <text
                      x="61"
                      y="88"
                      textAnchor="middle"
                      fontFamily='"Cinzel", serif'
                      fontWeight="700"
                      fontSize="26"
                      letterSpacing="0.04em"
                    >
                      S
                    </text>
                    <text
                      x="99"
                      y="88"
                      textAnchor="middle"
                      fontFamily='"Cinzel", serif'
                      fontWeight="700"
                      fontSize="26"
                      letterSpacing="0.04em"
                    >
                      N
                    </text>
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Call-to-Action Below Envelope */}
      <div ref={promptTextRef} className="relative z-20 mt-5 sm:mt-12 px-2 text-center">
        <button
          type="button"
          onClick={handleOpenEnvelope}
          disabled={isOpening}
          className="group inline-flex flex-col items-center gap-2 focus:outline-none"
        >
          <span className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.35em] text-gold-accent group-hover:text-parchment transition-colors">
            Touch the Royal Wax Seal to Unseal
          </span>
          <span className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent group-hover:w-28 transition-all duration-500" />
        </button>
      </div>
    </div>
  );
};

export default RoyalEnvelope;

