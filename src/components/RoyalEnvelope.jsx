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

    // Step 1: Quick micro-scale depress on the ruby wax seal
    tl.to(waxSealRef.current, {
      scale: 0.86,
      duration: 0.14,
      ease: 'power2.in',
    })
      .to(waxSealRef.current, {
        scale: 1.08,
        opacity: 0,
        duration: 0.28,
        ease: 'back.out(2)',
        onStart: () => {
          // Step 2: Canvas confetti burst in gold & burgundy wax flecks
          confetti({
            particleCount: 85,
            spread: 85,
            origin: { y: 0.54 },
            colors: ['#D4AF37', '#F3E5AB', '#6E1A26', '#8C2C3B', '#E8C868', '#4C101A'],
            ticks: 220,
            gravity: 0.85,
            scalar: 0.95,
          });
        },
      })
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
      // Step 3: Top flap folds upward in 3D (rotateX: -180deg, transformOrigin: "top center")
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

            {/* Layer 3: Front Pocket Flaps (Left, Right, Bottom) rendered in SVG so Letter slides out cleanly */}
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
              {/* Inner Ornamental Gold Filigree Line on Bottom Flap */}
              <polyline
                points="24,316 230,164 436,316"
                fill="none"
                stroke="#D4AF37"
                strokeOpacity="0.35"
                strokeWidth="0.9"
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

          {/* Layer 4: 3D Top Triangular Flap in Rich Forest Emerald */}
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
            </svg>
          </div>

          {/* Layer 5: Bespoke Burgundy Wax Seal with Metallic Antique Gold "S | N" Monogram */}
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
                  {/* Metallic Antique Gold Gradient for S | N & Inner Rim */}
                  <linearGradient id="antiqueGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C59A3F" />
                    <stop offset="25%" stopColor="#F9E5A8" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="75%" stopColor="#FDF2D3" />
                    <stop offset="100%" stopColor="#A8812F" />
                  </linearGradient>

                  {/* Wax Body Radial Gradient (Key light at 32%, 26%) */}
                  <radialGradient id="waxBodyGrad" cx="32%" cy="26%" r="72%">
                    <stop offset="0%" stopColor="#6E1A26" />
                    <stop offset="22%" stopColor="#52131D" />
                    <stop offset="50%" stopColor="#3B0B13" />
                    <stop offset="80%" stopColor="#25050A" />
                    <stop offset="100%" stopColor="#130104" />
                  </radialGradient>

                  {/* Recessed Stamp Dish Gradient */}
                  <radialGradient id="waxDishGrad" cx="36%" cy="32%" r="62%">
                    <stop offset="0%" stopColor="#460F18" />
                    <stop offset="45%" stopColor="#350911" />
                    <stop offset="85%" stopColor="#220409" />
                    <stop offset="100%" stopColor="#150205" />
                  </radialGradient>

                  {/* Glossy Specular Rim Sheen Gradient */}
                  <linearGradient id="rimSheenGrad" x1="15%" y1="10%" x2="70%" y2="55%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="25%" stopColor="#FFB3C0" stopOpacity="0.45" />
                    <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.88" />
                    <stop offset="65%" stopColor="#FFCCD5" stopOpacity="0.75" />
                    <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* 1. Organic Hand-Poured Outer Wax Puddle */}
                <path
                  d="M 80,6
                     C 108,5 137,20 148,46
                     C 157,68 155,98 144,121
                     C 133,144 106,155 79,154
                     C 51,153 23,143 11,119
                     C 0,95 3,66 15,41
                     C 27,16 53,7 80,6 Z"
                  fill="url(#waxBodyGrad)"
                />

                {/* Outer Wax Rim Thickness & 3D Contour Bevel */}
                <path
                  d="M 80,8
                     C 106,7 134,22 144,47
                     C 153,68 151,96 141,118
                     C 130,140 104,151 79,150
                     C 53,149 26,139 15,116
                     C 4,93 7,66 18,43
                     C 29,19 54,9 80,8 Z"
                  fill="none"
                  stroke="#7A222F"
                  strokeWidth="2.2"
                  strokeOpacity="0.45"
                />

                {/* Specular High-Gloss Sheen on Upper Curved Wax Rim (Wet Lacquer) */}
                <path
                  d="M 28,52 C 22,34 39,20 60,13 C 80,8 106,9 126,18 C 137,24 146,36 148,48"
                  fill="none"
                  stroke="url(#rimSheenGrad)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 38,42 C 48,22 72,14 96,13 C 112,13 128,19 138,28"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeOpacity="0.75"
                />

                {/* Molten Wax Droplets & Pits matching bespoke hand-stamped seal */}
                <circle cx="86" cy="11" r="1.8" fill="#180206" />
                <circle cx="86.8" cy="11.8" r="1.2" fill="#8C2C3B" opacity="0.8" />
                <circle cx="96" cy="138" r="1.8" fill="#180206" />
                <circle cx="96.7" cy="138.7" r="1.2" fill="#8C2C3B" opacity="0.8" />
                <circle cx="103" cy="139" r="1.5" fill="#180206" />
                <circle cx="103.6" cy="139.6" r="1.0" fill="#8C2C3B" opacity="0.8" />

                {/* 2. Recessed Inner Circular Stamped Dish */}
                <circle cx="80" cy="80" r="54" fill="url(#waxDishGrad)" />

                {/* Outer Stamped Ring: Debossed Shadow + Antique Gold Metallic Finish */}
                <circle
                  cx="79.2"
                  cy="79.2"
                  r="53"
                  fill="none"
                  stroke="#120104"
                  strokeWidth="2.4"
                  strokeOpacity="0.9"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="53"
                  fill="none"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.8"
                  strokeOpacity="0.95"
                />

                {/* Inner Stamped Ring: Debossed Shadow + Antique Gold Metallic Finish */}
                <circle
                  cx="79.3"
                  cy="79.3"
                  r="47"
                  fill="none"
                  stroke="#150205"
                  strokeWidth="1.8"
                  strokeOpacity="0.8"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="47"
                  fill="none"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.2"
                  strokeOpacity="0.85"
                />

                {/* 3. Stamped Debossed "S | N" Monogram in Metallic Antique Gold */}
                {/* Upper-Left Inset Cavity Shadow (Debossed Depth) */}
                <g transform="translate(-1.2, -1.2)" fill="#100103" opacity="0.95">
                  <text
                    x="57"
                    y="89"
                    textAnchor="middle"
                    fontFamily='"Cinzel", serif'
                    fontWeight="700"
                    fontSize="33"
                    letterSpacing="0.04em"
                  >
                    S
                  </text>
                  <text
                    x="103"
                    y="89"
                    textAnchor="middle"
                    fontFamily='"Cinzel", serif'
                    fontWeight="700"
                    fontSize="33"
                    letterSpacing="0.04em"
                  >
                    N
                  </text>
                </g>
                <line
                  x1="78.8"
                  y1="64.8"
                  x2="78.8"
                  y2="94.8"
                  stroke="#100103"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.95"
                />

                {/* Lower-Right Warm Wax Light Reflection */}
                <g transform="translate(1.0, 1.2)" fill="#781E2C" opacity="0.55">
                  <text
                    x="57"
                    y="89"
                    textAnchor="middle"
                    fontFamily='"Cinzel", serif'
                    fontWeight="700"
                    fontSize="33"
                    letterSpacing="0.04em"
                  >
                    S
                  </text>
                  <text
                    x="103"
                    y="89"
                    textAnchor="middle"
                    fontFamily='"Cinzel", serif'
                    fontWeight="700"
                    fontSize="33"
                    letterSpacing="0.04em"
                  >
                    N
                  </text>
                </g>

                {/* Primary Metallic Antique Gold Stamped Initials */}
                <g fill="url(#antiqueGoldGrad)">
                  <text
                    x="57"
                    y="89"
                    textAnchor="middle"
                    fontFamily='"Cinzel", serif'
                    fontWeight="700"
                    fontSize="33"
                    letterSpacing="0.04em"
                  >
                    S
                  </text>
                  <text
                    x="103"
                    y="89"
                    textAnchor="middle"
                    fontFamily='"Cinzel", serif'
                    fontWeight="700"
                    fontSize="33"
                    letterSpacing="0.04em"
                  >
                    N
                  </text>
                </g>
                <line
                  x1="80"
                  y1="66"
                  x2="80"
                  y2="96"
                  stroke="url(#antiqueGoldGrad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                {/* Fine Highlight Bevel Catch on Letter Faces */}
                <g fill="none" stroke="#FFF7E0" strokeWidth="0.5" strokeOpacity="0.75">
                  <text
                    x="57"
                    y="89"
                    textAnchor="middle"
                    fontFamily='"Cinzel", serif'
                    fontWeight="700"
                    fontSize="33"
                    letterSpacing="0.04em"
                  >
                    S
                  </text>
                  <text
                    x="103"
                    y="89"
                    textAnchor="middle"
                    fontFamily='"Cinzel", serif'
                    fontWeight="700"
                    fontSize="33"
                    letterSpacing="0.04em"
                  >
                    N
                  </text>
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

