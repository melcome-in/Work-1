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

    // 1. Trigger audio click + start background synth/song
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
      // Step 3: Celebratory particle burst as floral artwork reaches full golden bloom
      .to(
        waxSealRef.current,
        {
          scale: 1.16,
          opacity: 0,
          duration: 0.35,
          ease: 'back.out(2)',
          onStart: () => {
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
      // Step 4: Top triangular flap folds upward in 3D (rotateX: -180deg, transformOrigin: "top center")
      .to(
        topFlapRef.current,
        {
          rotateX: -180,
          transformOrigin: 'top center',
          duration: 0.95,
          ease: 'power2.inOut',
          onUpdate: function () {
            // Lower flap z-index once past 90 degrees so rising letter passes in front
            if (this.progress() > 0.45 && topFlapRef.current) {
              topFlapRef.current.style.zIndex = '15';
            }
          },
        },
        '-=0.08'
      )
      // Step 5: Letter card slides vertically out of the envelope cavity
      .to(
        letterCardRef.current,
        {
          y: typeof window !== 'undefined' && window.innerWidth < 640 ? -140 : -210,
          scale: 1.04,
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.85), 0 0 45px rgba(212, 175, 55, 0.35)',
          duration: 1.05,
          ease: 'power3.out',
        },
        '-=0.35'
      )
      // Step 6: Envelope shell drops & letter expands into full page
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
      className="fixed inset-0 z-40 flex flex-col items-center justify-center min-h-[100dvh] px-3 sm:px-6 py-4 sm:py-8 bg-[#07130E]/98 backdrop-blur-md select-none overflow-y-auto overflow-x-hidden"
    >
      {/* Ambient Radial Spotlight behind the Envelope */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,48,34,0.45)_0%,rgba(7,19,14,0.98)_75%)]"
      />

      {/* Top Ceremonial Bismillah with Generous Viewport Spacing */}
      <div className="relative z-10 text-center pt-2 sm:pt-4 mb-3 sm:mb-6">
        <p className="font-amiri text-xl sm:text-3xl text-gold-primary tracking-wide">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>

      {/* 3D Perspective Stage: Stately Vertical Envelope Format (400 x 600 Ratio matching photo) */}
      <div
        ref={envelopeStageRef}
        style={{ perspective: '1200px' }}
        className="relative z-20 w-full max-w-[340px] xs:max-w-[370px] sm:max-w-[420px] aspect-[400/600] flex items-center justify-center"
      >
        <div className="relative w-full h-full preserve-3d">
          {/* Layer 1: Back Cavity of the Envelope */}
          <div
            ref={envelopeShellRef}
            className="absolute inset-0 preserve-3d pointer-events-none"
          >
            {/* Deep Royal Emerald Backboard with Realistic Soft Drop Shadow */}
            <div
              style={{
                boxShadow:
                  '0 28px 75px rgba(0, 0, 0, 0.85), 0 0 50px rgba(18, 55, 38, 0.25)',
              }}
              className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#143A2B] via-[#0E2A1E] to-[#071810] border border-gold-primary/60"
            >
              <div className="absolute inset-2.5 rounded-xl border border-gold-primary/25" />
            </div>

            {/* Layer 3: Front Pocket Flaps (Left, Right, Bottom) with Full Embossed Botanical Floral Pattern */}
            <svg
              viewBox="0 0 400 600"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full z-30 rounded-2xl overflow-hidden drop-shadow-[0_-8px_20px_rgba(0,0,0,0.65)]"
            >
              <defs>
                <linearGradient id="leftRightFlap" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#153B2B" />
                  <stop offset="50%" stopColor="#0E281C" />
                  <stop offset="100%" stopColor="#081A12" />
                </linearGradient>
                <linearGradient id="bottomFlap" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#163F2E" />
                  <stop offset="60%" stopColor="#0E281D" />
                  <stop offset="100%" stopColor="#071810" />
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

              {/* Left Folded Triangular Flap */}
              <polygon
                points="0,0 200,300 0,600"
                fill="url(#leftRightFlap)"
                stroke="url(#goldEdge)"
                strokeWidth="1.2"
              />
              {/* Right Folded Triangular Flap */}
              <polygon
                points="400,0 200,300 400,600"
                fill="url(#leftRightFlap)"
                stroke="url(#goldEdge)"
                strokeWidth="1.2"
              />
              {/* Bottom Folded Triangular Flap meeting in the center */}
              <polygon
                points="0,600 200,300 400,600"
                fill="url(#bottomFlap)"
                stroke="url(#goldEdge)"
                strokeWidth="1.5"
              />

              {/* ─── Embossed Botanical Peonies, Leaves & Branches (Bottom Flap & Sides) ─── */}
              <g className="select-none pointer-events-none opacity-90">
                {/* Embossed Paper Shadow Layer (offset -1px, -1px) */}
                <g stroke="#04120A" fill="none" opacity="0.8" transform="translate(-1, -1)">
                  {/* Lower-left main vine stem */}
                  <path d="M 196,306 C 160,345 120,400 85,465 C 65,505 50,535 40,560" strokeWidth="2.4" />
                  <path d="M 150,370 C 130,385 105,380 90,365" strokeWidth="2.0" />
                  <path d="M 115,425 C 95,440 70,435 60,420" strokeWidth="1.8" />
                  {/* Lower-right main vine stem */}
                  <path d="M 204,306 C 240,345 280,400 315,465 C 335,505 350,535 360,560" strokeWidth="2.4" />
                  <path d="M 250,370 C 270,385 295,380 310,365" strokeWidth="2.0" />
                  <path d="M 285,425 C 305,440 330,435 340,420" strokeWidth="1.8" />
                  {/* Center-bottom vertical vine */}
                  <path d="M 200,318 C 204,380 196,470 200,575" strokeWidth="2.2" />
                  <path d="M 200,410 C 185,425 170,420 162,410" strokeWidth="1.6" />
                  <path d="M 200,450 C 215,465 230,460 238,450" strokeWidth="1.6" />
                  <path d="M 200,505 C 185,520 170,515 162,505" strokeWidth="1.6" />
                </g>

                {/* Embossed Paper Highlight Layer (offset +1px, +1px) */}
                <g stroke="#1F5C40" fill="none" opacity="0.5" transform="translate(1, 1)">
                  <path d="M 196,306 C 160,345 120,400 85,465 C 65,505 50,535 40,560" strokeWidth="1.8" />
                  <path d="M 150,370 C 130,385 105,380 90,365" strokeWidth="1.4" />
                  <path d="M 115,425 C 95,440 70,435 60,420" strokeWidth="1.4" />
                  <path d="M 204,306 C 240,345 280,400 315,465 C 335,505 350,535 360,560" strokeWidth="1.8" />
                  <path d="M 250,370 C 270,385 295,380 310,365" strokeWidth="1.4" />
                  <path d="M 285,425 C 305,440 330,435 340,420" strokeWidth="1.4" />
                  <path d="M 200,318 C 204,380 196,470 200,575" strokeWidth="1.6" />
                  <path d="M 200,410 C 185,425 170,420 162,410" strokeWidth="1.2" />
                  <path d="M 200,450 C 215,465 230,460 238,450" strokeWidth="1.2" />
                  <path d="M 200,505 C 185,520 170,515 162,505" strokeWidth="1.2" />
                </g>

                {/* Embossed Botanical Leaves & Peony Petals (Dark Emerald Paper Relief) */}
                <g fill="#0C2D1F" stroke="#14422D" strokeWidth="0.9" opacity="0.85">
                  {/* Lower-left foliage leaves */}
                  <path d="M 150,370 C 140,358 122,362 112,372 C 128,378 140,378 150,370 Z" />
                  <path d="M 115,425 C 105,412 88,416 78,426 C 94,432 106,432 115,425 Z" />
                  <path d="M 85,465 C 70,455 52,460 45,472 C 60,476 74,474 85,465 Z" />
                  {/* Lower-right foliage leaves */}
                  <path d="M 250,370 C 260,358 278,362 288,372 C 272,378 260,378 250,370 Z" />
                  <path d="M 285,425 C 295,412 312,416 322,426 C 306,432 294,432 285,425 Z" />
                  <path d="M 315,465 C 330,455 348,460 355,472 C 340,476 326,474 315,465 Z" />
                  {/* Large Lower-Right Blooming Peony / Dahlia Blossom (like photo) */}
                  <g transform="translate(305, 500)">
                    <circle cx="0" cy="0" r="24" fill="#0A2419" stroke="#164A33" strokeWidth="1.2" />
                    <circle cx="0" cy="0" r="16" fill="#0D2E20" stroke="#164A33" strokeWidth="1" />
                    <circle cx="0" cy="0" r="9" fill="#103626" stroke="#1D5C40" strokeWidth="0.8" />
                    <circle cx="0" cy="0" r="4" fill="#15422F" />
                    {/* Layered petal scallops */}
                    <path d="M -22,0 C -22,-12 -12,-22 0,-22 C 12,-22 22,-12 22,0 C 22,12 12,22 0,22 C -12,22 -22,12 -22,0 Z" fill="none" stroke="#1D5A3E" strokeWidth="0.8" />
                  </g>
                  {/* Large Lower-Left Blooming Peony / Dahlia Blossom */}
                  <g transform="translate(95, 500)">
                    <circle cx="0" cy="0" r="24" fill="#0A2419" stroke="#164A33" strokeWidth="1.2" />
                    <circle cx="0" cy="0" r="16" fill="#0D2E20" stroke="#164A33" strokeWidth="1" />
                    <circle cx="0" cy="0" r="9" fill="#103626" stroke="#1D5C40" strokeWidth="0.8" />
                    <circle cx="0" cy="0" r="4" fill="#15422F" />
                    <path d="M -22,0 C -22,-12 -12,-22 0,-22 C 12,-22 22,-12 22,0 C 22,12 12,22 0,22 C -12,22 -22,12 -22,0 Z" fill="none" stroke="#1D5A3E" strokeWidth="0.8" />
                  </g>
                </g>
              </g>

              {/* ─── Animated Golden Lines (Starts from center seal, surges through flowers & leaves) ─── */}
              <g className="select-none pointer-events-none">
                {/* Lower-left golden stem */}
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 196,306 C 160,345 120,400 85,465 C 65,505 50,535 40,560"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="2.0"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 150,370 C 130,385 105,380 90,365"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 115,425 C 95,440 70,435 60,420"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.6"
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
                  d="M 204,306 C 240,345 280,400 315,465 C 335,505 350,535 360,560"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="2.0"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 250,370 C 270,385 295,380 310,365"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 285,425 C 305,440 330,435 340,420"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />

                {/* Center-bottom vertical golden stem */}
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 200,318 C 204,380 196,470 200,575"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.8"
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
                  d="M 150,370 C 140,358 122,362 112,372 C 128,378 140,378 150,370 Z"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.3"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 250,370 C 260,358 278,362 288,372 C 272,378 260,378 250,370 Z"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.3"
                  fill="none"
                  opacity="0"
                />

                {/* Golden Floral Blooms: Lower Peony Blossoms (Expand & Glow) */}
                <g className="golden-floral-bloom" opacity="0" transform="translate(305, 500)">
                  <circle cx="0" cy="0" r="22" fill="url(#antiqueGoldGrad)" opacity="0.85" />
                  <circle cx="0" cy="0" r="14" fill="#FFF5D6" opacity="0.9" />
                  <circle cx="0" cy="0" r="7" fill="#6B4E1B" />
                  <circle cx="0" cy="0" r="3" fill="#FFE59E" />
                </g>
                <g className="golden-floral-bloom" opacity="0" transform="translate(95, 500)">
                  <circle cx="0" cy="0" r="22" fill="url(#antiqueGoldGrad)" opacity="0.85" />
                  <circle cx="0" cy="0" r="14" fill="#FFF5D6" opacity="0.9" />
                  <circle cx="0" cy="0" r="7" fill="#6B4E1B" />
                  <circle cx="0" cy="0" r="3" fill="#FFE59E" />
                </g>
              </g>

              {/* Bottom Gold Filigree Line along flap edge */}
              <polyline
                points="18,594 200,306 382,594"
                fill="none"
                stroke="#D4AF37"
                strokeOpacity="0.45"
                strokeWidth="1.0"
              />
            </svg>

            {/* Outer Gold Frame Border */}
            <div className="absolute inset-0 z-30 rounded-2xl border border-gold-primary/60 pointer-events-none" />
          </div>

          {/* Layer 2: The Stately Royal Letter Card Seated Inside the Envelope Cavity */}
          <div
            ref={letterCardRef}
            className="absolute left-3 right-3 top-3 bottom-3 sm:left-5 sm:right-5 sm:top-4 sm:bottom-5 z-20 rounded-xl bg-gradient-to-b from-[#FAF7EE] via-[#F5EFE0] to-[#ECE2CC] text-obsidian p-4 sm:p-6 shadow-2xl border-2 border-gold-primary flex flex-col items-center justify-between text-center pointer-events-none"
          >
            {/* Inner Gold Double Filigree Border */}
            <div className="w-full h-full border border-gold-primary/60 rounded-lg p-3 sm:p-5 flex flex-col items-center justify-between relative">
              {/* Corner Arabesque Accents */}
              <span className="absolute top-1.5 left-2 text-gold-primary text-xs sm:text-sm">✦</span>
              <span className="absolute top-1.5 right-2 text-gold-primary text-xs sm:text-sm">✦</span>
              <span className="absolute bottom-1.5 left-2 text-gold-primary text-xs sm:text-sm">✦</span>
              <span className="absolute bottom-1.5 right-2 text-gold-primary text-xs sm:text-sm">✦</span>

              {/* Top Quote */}
              <div className="pt-2 sm:pt-4">
                <p className="font-cormorant italic text-xs sm:text-base text-obsidian/85 max-w-[280px] leading-relaxed">
                  &ldquo;love, laughter and happily ever after&rdquo;
                </p>
              </div>

              {/* Center Royal Monogram & Couple Proclamation */}
              <div className="my-auto py-2 flex flex-col items-center">
                <div className="inline-block px-3.5 py-0.5 rounded-full border border-gold-primary/60 text-[10px] sm:text-xs font-cinzel font-bold text-[#8A6621] tracking-[0.25em] mb-2 bg-gold-primary/10">
                  S | N
                </div>
                <h2 className="font-cinzel text-xl sm:text-3xl font-bold text-emerald-royal tracking-wider leading-snug">
                  Mohammed Shaheer
                </h2>
                <p className="font-cormorant italic text-sm sm:text-lg text-[#8A6621] my-1">
                  with
                </p>
                <h2 className="font-cinzel text-xl sm:text-3xl font-bold text-emerald-royal tracking-wider leading-snug">
                  Fathima Nidha
                </h2>
              </div>

              {/* Bottom Sacred Date */}
              <div className="w-full flex flex-col items-center pb-2 sm:pb-3">
                <div className="w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent mb-2" />
                <p className="font-montserrat text-[10px] sm:text-xs tracking-[0.25em] text-obsidian/80 font-semibold uppercase">
                  13 | DECEMBER | 2026
                </p>
              </div>
            </div>
          </div>

          {/* Layer 4: 3D Top Triangular Flap with Full Embossed Botanical Peonies & Foliage (h: 50%) */}
          <div
            ref={topFlapRef}
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
            }}
            className="absolute top-0 left-0 right-0 h-[50%] z-40 pointer-events-none"
          >
            <svg
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
              className="w-full h-full drop-shadow-[0_14px_24px_rgba(0,0,0,0.8)]"
            >
              <defs>
                <linearGradient id="topFlapGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#184232" />
                  <stop offset="60%" stopColor="#102D20" />
                  <stop offset="100%" stopColor="#081A12" />
                </linearGradient>
              </defs>
              {/* Steep Triangular Flap Polygon pointing down to (200, 300) */}
              <polygon
                points="0,0 400,0 200,300"
                fill="url(#topFlapGrad)"
                stroke="#D4AF37"
                strokeWidth="1.6"
              />
              <polyline
                points="18,6 200,288 382,6"
                fill="none"
                stroke="#E8C868"
                strokeOpacity="0.45"
                strokeWidth="1"
              />

              {/* ─── Embossed Botanical Peonies & Leaves (Top Flap) ─── */}
              <g className="select-none pointer-events-none opacity-90">
                {/* Embossed Paper Shadows */}
                <g stroke="#04120A" fill="none" opacity="0.8" transform="translate(-1, -1)">
                  {/* Left climbing vine */}
                  <path d="M 196,294 C 160,250 120,195 85,130 C 65,90 50,60 40,35" strokeWidth="2.4" />
                  <path d="M 150,225 C 130,210 105,215 90,230" strokeWidth="2.0" />
                  <path d="M 115,170 C 95,155 70,160 60,175" strokeWidth="1.8" />
                  {/* Right climbing vine */}
                  <path d="M 204,294 C 240,250 280,195 315,130 C 335,90 350,60 360,35" strokeWidth="2.4" />
                  <path d="M 250,225 C 270,210 295,215 310,230" strokeWidth="2.0" />
                  <path d="M 285,170 C 305,155 330,160 340,175" strokeWidth="1.8" />
                  {/* Center-top climbing vine */}
                  <path d="M 200,282 C 196,220 204,130 200,25" strokeWidth="2.2" />
                  <path d="M 200,190 C 185,175 170,180 162,190" strokeWidth="1.6" />
                  <path d="M 200,150 C 215,135 230,140 238,150" strokeWidth="1.6" />
                </g>

                {/* Embossed Paper Highlights */}
                <g stroke="#1F5C40" fill="none" opacity="0.5" transform="translate(1, 1)">
                  <path d="M 196,294 C 160,250 120,195 85,130 C 65,90 50,60 40,35" strokeWidth="1.8" />
                  <path d="M 150,225 C 130,210 105,215 90,230" strokeWidth="1.4" />
                  <path d="M 115,170 C 95,155 70,160 60,175" strokeWidth="1.4" />
                  <path d="M 204,294 C 240,250 280,195 315,130 C 335,90 350,60 360,35" strokeWidth="1.8" />
                  <path d="M 250,225 C 270,210 295,215 310,230" strokeWidth="1.4" />
                  <path d="M 285,170 C 305,155 330,160 340,175" strokeWidth="1.4" />
                  <path d="M 200,282 C 196,220 204,130 200,25" strokeWidth="1.6" />
                </g>

                {/* Embossed Leaves & Upper Peony Blossoms */}
                <g fill="#0C2D1F" stroke="#14422D" strokeWidth="0.9" opacity="0.85">
                  <path d="M 150,225 C 140,238 122,234 112,224 C 128,218 140,218 150,225 Z" />
                  <path d="M 115,170 C 105,182 88,178 78,168 C 94,162 106,162 115,170 Z" />
                  <path d="M 250,225 C 260,238 278,234 288,224 C 272,218 260,218 250,225 Z" />
                  <path d="M 285,170 C 295,182 312,178 322,168 C 306,162 294,162 285,170 Z" />
                  {/* Large Upper-Left Blooming Peony / Dahlia Blossom */}
                  <g transform="translate(95, 100)">
                    <circle cx="0" cy="0" r="24" fill="#0A2419" stroke="#164A33" strokeWidth="1.2" />
                    <circle cx="0" cy="0" r="16" fill="#0D2E20" stroke="#164A33" strokeWidth="1" />
                    <circle cx="0" cy="0" r="9" fill="#103626" stroke="#1D5C40" strokeWidth="0.8" />
                    <circle cx="0" cy="0" r="4" fill="#15422F" />
                    <path d="M -22,0 C -22,-12 -12,-22 0,-22 C 12,-22 22,-12 22,0 C 22,12 12,22 0,22 C -12,22 -22,12 -22,0 Z" fill="none" stroke="#1D5A3E" strokeWidth="0.8" />
                  </g>
                  {/* Large Upper-Right Blooming Peony / Dahlia Blossom */}
                  <g transform="translate(305, 100)">
                    <circle cx="0" cy="0" r="24" fill="#0A2419" stroke="#164A33" strokeWidth="1.2" />
                    <circle cx="0" cy="0" r="16" fill="#0D2E20" stroke="#164A33" strokeWidth="1" />
                    <circle cx="0" cy="0" r="9" fill="#103626" stroke="#1D5C40" strokeWidth="0.8" />
                    <circle cx="0" cy="0" r="4" fill="#15422F" />
                    <path d="M -22,0 C -22,-12 -12,-22 0,-22 C 12,-22 22,-12 22,0 C 22,12 12,22 0,22 C -12,22 -22,12 -22,0 Z" fill="none" stroke="#1D5A3E" strokeWidth="0.8" />
                  </g>
                </g>
              </g>

              {/* ─── Animated Golden Lines (Top Flap - Races upward from seal to flowers) ─── */}
              <g className="select-none pointer-events-none">
                {/* Upper-left golden stem */}
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 196,294 C 160,250 120,195 85,130 C 65,90 50,60 40,35"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="2.0"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 150,225 C 130,210 105,215 90,230"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 115,170 C 95,155 70,160 60,175"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />

                {/* Upper-right golden stem */}
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 204,294 C 240,250 280,195 315,130 C 335,90 350,60 360,35"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="2.0"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 250,225 C 270,210 295,215 310,230"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 285,170 C 305,155 330,160 340,175"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                />

                {/* Center-top vertical golden stem */}
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 200,282 C 196,220 204,130 200,25"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.8"
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
                  d="M 150,225 C 140,238 122,234 112,224 C 128,218 140,218 150,225 Z"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.3"
                  fill="none"
                  opacity="0"
                />
                <path
                  className="golden-floral-line"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  d="M 250,225 C 260,238 278,234 288,224 C 272,218 260,218 250,225 Z"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.3"
                  fill="none"
                  opacity="0"
                />

                {/* Golden Peony Blossoms (Bloom & Glow on Top Flap) */}
                <g className="golden-floral-bloom" opacity="0" transform="translate(95, 100)">
                  <circle cx="0" cy="0" r="22" fill="url(#antiqueGoldGrad)" opacity="0.85" />
                  <circle cx="0" cy="0" r="14" fill="#FFF5D6" opacity="0.9" />
                  <circle cx="0" cy="0" r="7" fill="#6B4E1B" />
                  <circle cx="0" cy="0" r="3" fill="#FFE59E" />
                </g>
                <g className="golden-floral-bloom" opacity="0" transform="translate(305, 100)">
                  <circle cx="0" cy="0" r="22" fill="url(#antiqueGoldGrad)" opacity="0.85" />
                  <circle cx="0" cy="0" r="14" fill="#FFF5D6" opacity="0.9" />
                  <circle cx="0" cy="0" r="7" fill="#6B4E1B" />
                  <circle cx="0" cy="0" r="3" fill="#FFE59E" />
                </g>
              </g>
            </svg>
          </div>

          {/* Layer 5: Pearl Ivory & Gold Stamped Wax Seal Centered Exactly where Flaps Meet (50% / 50%) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <button
              ref={waxSealRef}
              type="button"
              onClick={handleOpenEnvelope}
              disabled={isOpening}
              aria-label="Break the royal wax seal to open wedding invitation"
              className="group relative w-24 h-24 sm:w-32 sm:h-32 cursor-pointer focus:outline-none wax-seal-glow transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center justify-center p-0 bg-transparent border-0"
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
                    <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.85" />
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

                {/* 3. Embossed Botanical Bouquet (Matching Reference Photo) */}
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

                  {/* Left Daisy/Wild Rose Blossom */}
                  <g transform="translate(68, 59)">
                    <circle cx="0" cy="0" r="8" fill="#EDE4D5" stroke="#9E8A73" strokeWidth="0.8" />
                    <circle cx="0" cy="0" r="3" fill="url(#sealGoldGrad)" />
                    <path d="M -7,0 L -3,0 M 7,0 L 3,0 M 0,-7 L 0,-3 M 0,7 L 0,3" stroke="url(#sealGoldGrad)" strokeWidth="0.9" />
                  </g>

                  {/* Right Daisy/Wild Rose Blossom */}
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
      <div ref={promptTextRef} className="relative z-20 mt-4 sm:mt-8 px-2 text-center">
        <button
          type="button"
          onClick={handleOpenEnvelope}
          disabled={isOpening}
          className="group inline-flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer"
        >
          <span className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-gold-accent group-hover:text-parchment transition-colors">
            Tap the Royal Wax Seal to Unseal
          </span>
          <span className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent group-hover:w-28 transition-all duration-500" />
        </button>
      </div>
    </div>
  );
};

export default RoyalEnvelope;
