import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

const InteractiveFirstDance = () => {
  const containerRef = useRef(null);
  const archRef = useRef(null);
  const brideRef = useRef(null);
  const skirtRef = useRef(null);
  const veilRef = useRef(null);
  const bouquetRef = useRef(null);
  const groomArmRef = useRef(null);
  const particlesCanvasRef = useRef(null);

  const [twirlCount, setTwirlCount] = useState(0);
  const [isTwirling, setIsTwirling] = useState(false);
  const [swipeHintVisible, setSwipeHintVisible] = useState(true);

  // Gesture drag tracking
  const dragStartRef = useRef(null);
  const dragCurrentRef = useRef(0);
  const isDraggingRef = useRef(false);
  const twirlTimelineRef = useRef(null);

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

    // Particle pool
    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Swirl particles spawned on twirl
    const swirlParticles = [];

    const spawnTwirlSwirl = () => {
      const centerX = width * 0.62;
      const centerY = height * 0.65;
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 40 + 10;
        swirlParticles.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius * 0.5,
          angle: angle,
          radius: radius,
          radialSpeed: Math.random() * 2.2 + 1.2,
          angularSpeed: (Math.random() * 0.08 + 0.04) * (Math.random() > 0.5 ? 1 : -1),
          size: Math.random() * 2.5 + 1.2,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.01,
          color: Math.random() > 0.3 ? '#D4AF37' : '#FFF9D2',
        });
      }
    };

    window.__spawnTwirlSwirl = spawnTwirlSwirl;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Ambient rising golden specks
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

      // Dynamic twirl swirl particles
      for (let i = swirlParticles.length - 1; i >= 0; i--) {
        const sp = swirlParticles[i];
        sp.angle += sp.angularSpeed;
        sp.radius += sp.radialSpeed;
        sp.x = width * 0.62 + Math.cos(sp.angle) * sp.radius;
        sp.y = height * 0.62 + Math.sin(sp.angle) * (sp.radius * 0.35);
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0) {
          swirlParticles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      delete window.__spawnTwirlSwirl;
    };
  }, []);

  // Main twirl animation execution
  const triggerTwirl = useCallback(
    (direction = 1) => {
      if (isTwirling) return;
      setIsTwirling(true);
      setSwipeHintVisible(false);
      setTwirlCount((prev) => prev + 1);

      // Trigger ambient canvas vortex
      if (window.__spawnTwirlSwirl) {
        window.__spawnTwirlSwirl();
      }

      // Gentle gold confetti burst
      if (archRef.current) {
        const rect = archRef.current.getBoundingClientRect();
        const originX = (rect.left + rect.width * 0.6) / window.innerWidth;
        const originY = (rect.top + rect.height * 0.55) / window.innerHeight;

        confetti({
          particleCount: 24,
          spread: 70,
          origin: { x: originX, y: originY },
          colors: ['#D4AF37', '#FCF6BA', '#F3D98B', '#FFFFFF', '#E8C868'],
          shapes: ['circle'],
          scalar: 0.65,
          ticks: 100,
          gravity: 0.7,
          disableForReducedMotion: true,
        });
      }

      const bride = brideRef.current;
      const skirt = skirtRef.current;
      const veil = veilRef.current;
      const bouquet = bouquetRef.current;
      const groomArm = groomArmRef.current;

      const spinAngle = 360 * direction;

      const tl = gsap.timeline({
        onComplete: () => {
          setIsTwirling(false);
          // Reset bride transform cleanly
          gsap.set(bride, { rotationY: 0 });
        },
      });

      twirlTimelineRef.current = tl;

      // 1. 3D Bride rotation beneath groom's hand
      tl.to(
        bride,
        {
          rotationY: `+=${spinAngle}`,
          duration: 1.45,
          ease: 'power2.inOut',
        },
        0
      );

      // 2. Skirt dynamic centrifugal flare (expands horizontally during mid-spin)
      if (skirt) {
        tl.to(
          skirt,
          {
            scaleX: 1.28,
            scaleY: 0.94,
            transformOrigin: '50% 10%',
            duration: 0.65,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
          },
          0.1
        );
      }

      // 3. Ethereal hijab veil trailing gracefully
      if (veil) {
        tl.to(
          veil,
          {
            scaleX: 1.35,
            rotation: direction * 14,
            transformOrigin: '20% 15%',
            duration: 0.7,
            ease: 'sine.out',
            yoyo: true,
            repeat: 1,
          },
          0.15
        );
      }

      // 4. Bouquet gentle sway
      if (bouquet) {
        tl.to(
          bouquet,
          {
            rotation: direction * -12,
            transformOrigin: 'center center',
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut',
          },
          0.2
        );
      }

      // 5. Groom's left arm natural pivot & guiding lift
      if (groomArm) {
        tl.to(
          groomArm,
          {
            rotation: -5 * direction,
            y: -2,
            transformOrigin: '150px 190px',
            duration: 0.7,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1,
          },
          0
        );
      }
    },
    [isTwirling]
  );

  // Mouse & Touch Drag Handlers
  const handleTouchStart = (e) => {
    if (isTwirling) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
    dragCurrentRef.current = clientX;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || isTwirling) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragCurrentRef.current = clientX;

    const diff = dragCurrentRef.current - dragStartRef.current;
    // Interactive drag preview on bride
    if (brideRef.current && Math.abs(diff) < 90) {
      gsap.to(brideRef.current, {
        rotationY: diff * 0.8,
        duration: 0.1,
        ease: 'none',
      });
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const diff = dragCurrentRef.current - (dragStartRef.current || 0);

    if (Math.abs(diff) > 28) {
      // Complete the spin in swipe direction
      triggerTwirl(diff > 0 ? 1 : -1);
    } else {
      // Revert small nudge back to 0
      if (brideRef.current && !isTwirling) {
        gsap.to(brideRef.current, {
          rotationY: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    }
    dragStartRef.current = null;
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
          onClick={() => triggerTwirl(1)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
          className="relative w-full h-[460px] sm:h-[530px] rounded-t-[140px] sm:rounded-t-[200px] rounded-b-2xl sm:rounded-b-3xl bg-gradient-to-b from-[#061812] via-[#09241B] to-[#040C08] border border-gold-primary/60 sm:border-2 shadow-gold-glow flex flex-col items-center justify-end overflow-hidden cursor-pointer group"
          style={{ perspective: 1200 }}
        >
          {/* Inner Moorish Arch Filigree Line */}
          <div className="pointer-events-none absolute inset-2 sm:inset-3 rounded-t-[132px] sm:rounded-t-[188px] rounded-b-xl sm:rounded-b-2xl border border-gold-primary/25" />

          {/* Golden Arabesque Floral Top Arch Crest */}
          <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-85">
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
            className="absolute bottom-0 w-full h-44 pointer-events-none z-0"
            style={{
              background:
                'radial-gradient(ellipse 65% 35% at 50% 90%, rgba(212, 175, 55, 0.32) 0%, rgba(212, 175, 55, 0.1) 45%, transparent 75%)',
            }}
          />

          {/* Faceless Minimalist Painterly Couple SVG Illustration */}
          <div className="relative z-10 w-full h-full flex items-end justify-center pb-4 sm:pb-6">
            <svg
              viewBox="0 0 360 460"
              className="w-full h-[400px] sm:h-[470px] max-w-[340px] sm:max-w-[400px] drop-shadow-[0_12px_28px_rgba(0,0,0,0.65)]"
              preserveAspectRatio="xMidYMax meet"
            >
              <defs>
                {/* Groom Tuxedo Fabric Gradients */}
                <linearGradient id="tuxedoFabric" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1E2328" />
                  <stop offset="50%" stopColor="#12161A" />
                  <stop offset="100%" stopColor="#0B0D0F" />
                </linearGradient>

                <linearGradient id="tuxedoLapel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2A3038" />
                  <stop offset="60%" stopColor="#161A1F" />
                  <stop offset="100%" stopColor="#0D0F12" />
                </linearGradient>

                <linearGradient id="goldButton" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFF9D2" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8A6B1A" />
                </linearGradient>

                {/* Bride Bridal Gown Gradients */}
                <linearGradient id="gownIvory" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#FAF7F0" />
                  <stop offset="100%" stopColor="#EDE8DE" />
                </linearGradient>

                <linearGradient id="gownShade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EDE6D8" />
                  <stop offset="100%" stopColor="#DFD6C3" />
                </linearGradient>

                <linearGradient id="veilGauze" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.65)" />
                  <stop offset="60%" stopColor="rgba(250, 245, 235, 0.45)" />
                  <stop offset="100%" stopColor="rgba(212, 175, 55, 0.25)" />
                </linearGradient>

                <linearGradient id="skirtHemGold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>

              {/* Floor Shadow beneath couple */}
              <ellipse cx="180" cy="425" rx="100" ry="12" fill="rgba(0, 0, 0, 0.45)" />
              <ellipse cx="140" cy="425" rx="35" ry="9" fill="rgba(0, 0, 0, 0.5)" />
              <ellipse cx="230" cy="425" rx="55" ry="10" fill="rgba(0, 0, 0, 0.4)" />

              {/* ==================================================== */}
              {/* GROOM GROUP (Standing gracefully on left)             */}
              {/* ==================================================== */}
              <g id="groom-figure">
                {/* Shoes */}
                <ellipse cx="125" cy="422" rx="13" ry="5.5" fill="#0A0C0E" />
                <ellipse cx="152" cy="421" rx="12" ry="5" fill="#080A0B" />
                <path d="M114 420 Q125 418 138 421 Q138 424 114 423 Z" fill="#181B1F" />

                {/* Tuxedo Trousers */}
                <path
                  d="M116 295 L112 418 Q125 422 138 418 L138 318 L142 417 Q152 421 162 417 L160 295 Z"
                  fill="#0E1114"
                />
                {/* Trouser Crease Shadows */}
                <line x1="125" y1="305" x2="125" y2="416" stroke="#050608" strokeWidth="1" opacity="0.6" />
                <line x1="152" y1="305" x2="152" y2="415" stroke="#050608" strokeWidth="1" opacity="0.6" />

                {/* Double-Breasted Tuxedo Jacket Torso */}
                <path
                  d="M106 200 L110 305 Q138 312 165 305 L168 200 Q137 192 106 200 Z"
                  fill="url(#tuxedoFabric)"
                />

                {/* Crisp White Shirt Collar & V-Shape */}
                <path d="M130 195 L145 195 L142 225 L133 225 Z" fill="#F8F9FA" />
                {/* Black Silk Bow Tie */}
                <polygon points="132,197 143,197 141,204 134,204" fill="#0A0C0E" />
                <circle cx="137.5" cy="200.5" r="2" fill="#1C2025" />

                {/* Satin Peak Lapels */}
                <path
                  d="M118 198 L132 245 L138 245 L132 196 Z"
                  fill="url(#tuxedoLapel)"
                />
                <path
                  d="M157 198 L142 245 L138 245 L143 196 Z"
                  fill="url(#tuxedoLapel)"
                />

                {/* Folded Silk Pocket Square */}
                <polygon points="119,224 123,217 127,224" fill="#FFFFFF" />
                <line x1="117" y1="225" x2="129" y2="225" stroke="#1F242A" strokeWidth="1.5" />

                {/* Double-Breasted Gold Buttons */}
                <circle cx="133" cy="254" r="2.2" fill="url(#goldButton)" />
                <circle cx="143" cy="254" r="2.2" fill="url(#goldButton)" />
                <circle cx="133" cy="272" r="2.2" fill="url(#goldButton)" />
                <circle cx="143" cy="272" r="2.2" fill="url(#goldButton)" />

                {/* Right Arm (Resting gracefully by side) */}
                <path
                  d="M106 200 Q96 235 98 275 Q104 276 109 272 Q107 235 116 204 Z"
                  fill="url(#tuxedoFabric)"
                />
                {/* Right Hand */}
                <ellipse cx="98" cy="280" rx="4.5" ry="6.5" fill="#E2C1A8" />

                {/* Groom Head Silhouette (Faceless Minimalist Art) */}
                {/* Neck */}
                <rect x="133" y="180" width="9" height="18" fill="#DFBC9F" rx="2" />
                {/* Head */}
                <ellipse cx="137.5" cy="168" rx="11" ry="14" fill="#E8CBB8" />
                {/* Styled Dark Hair */}
                <path
                  d="M126 166 C126 153 133 151 140 151 C147 151 149 155 149 162 C149 166 147 167 146 168 C144 163 141 161 135 162 C129 163 127 166 126 166 Z"
                  fill="#1C1815"
                />

                {/* Left Arm (Raised holding bride's hand - Pivoting joint) */}
                <g ref={groomArmRef} id="groom-raised-arm">
                  <path
                    d="M165 202 Q174 185 182 152 Q188 154 189 160 Q181 189 168 214 Z"
                    fill="url(#tuxedoFabric)"
                  />
                  {/* Groom Hand clasping bride's hand at (184, 146) */}
                  <ellipse cx="184" cy="147" rx="5" ry="6.5" fill="#E2C1A8" />
                </g>
              </g>

              {/* ==================================================== */}
              {/* BRIDE GROUP (Interactive 3D Twirl on Center-Right)   */}
              {/* ==================================================== */}
              <g
                ref={brideRef}
                id="bride-figure"
                style={{
                  transformOrigin: '228px 290px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Cascading Ethereal Hijab Veil (Trails behind) */}
                <g ref={veilRef} id="bride-veil">
                  <path
                    d="M228 152 Q265 175 272 260 Q278 350 258 410 Q242 414 235 400 Q248 340 246 250 Q244 185 228 152 Z"
                    fill="url(#veilGauze)"
                  />
                  {/* Veil Delicate Gold Hem Trim */}
                  <path
                    d="M228 152 Q265 175 272 260 Q278 350 258 410"
                    stroke="#D4AF37"
                    strokeWidth="0.8"
                    strokeDasharray="2,3"
                    fill="none"
                    opacity="0.8"
                  />
                </g>

                {/* Flowing Pleated A-Line Gown Skirt */}
                <g ref={skirtRef} id="bride-skirt">
                  {/* Skirt Base Fill */}
                  <path
                    d="M210 262 Q228 260 246 262 L285 418 Q228 426 172 418 Z"
                    fill="url(#gownIvory)"
                  />

                  {/* Pleated Vertical Architectural Folds & Shading */}
                  {/* Deep Pleat 1 */}
                  <path
                    d="M214 263 Q200 340 186 418 Q193 421 202 419 Q214 340 219 263 Z"
                    fill="url(#gownShade)"
                    opacity="0.45"
                  />
                  {/* Deep Pleat 2 */}
                  <path
                    d="M228 262 Q227 340 226 422 Q233 423 241 421 Q237 340 234 262 Z"
                    fill="#FFFFFF"
                    opacity="0.75"
                  />
                  {/* Deep Pleat 3 */}
                  <path
                    d="M241 263 Q252 340 265 419 Q273 421 281 418 Q264 340 245 263 Z"
                    fill="url(#gownShade)"
                    opacity="0.4"
                  />

                  {/* Subtle Pleat Crease Linework */}
                  <path
                    d="M211 263 L176 418 M222 263 L212 420 M234 262 L248 420 M245 263 L282 418"
                    stroke="rgba(212, 175, 55, 0.35)"
                    strokeWidth="0.75"
                    fill="none"
                  />

                  {/* Gown Hem Gold Ribbon Embroidery */}
                  <path
                    d="M172 418 Q228 426 285 418"
                    stroke="url(#skirtHemGold)"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <path
                    d="M174 415 Q228 423 283 415"
                    stroke="#D4AF37"
                    strokeWidth="0.8"
                    strokeDasharray="1.5,2.5"
                    fill="none"
                    opacity="0.9"
                  />
                </g>

                {/* Modest Bridal Gown Bodice & Waistband */}
                <path
                  d="M211 202 Q228 198 245 202 L246 264 Q228 266 210 264 Z"
                  fill="url(#gownIvory)"
                />
                {/* Embroidered Gold Waist Belt */}
                <path
                  d="M210 258 Q228 261 246 258 L246 264 Q228 267 210 264 Z"
                  fill="#D4AF37"
                  opacity="0.85"
                />

                {/* Modest Long Sleeves */}
                {/* Left Arm holding bouquet */}
                <path
                  d="M243 203 Q256 226 248 252 Q242 254 237 248 Q244 228 238 206 Z"
                  fill="url(#gownIvory)"
                />

                {/* Right Arm raised to meet Groom's hand */}
                <path
                  d="M213 203 Q198 178 186 150 Q192 147 196 154 Q206 180 220 206 Z"
                  fill="url(#gownIvory)"
                />
                {/* Bride's Hand clasping Groom at (184, 146) */}
                <ellipse cx="184" cy="146" rx="4.5" ry="6" fill="#F4D8C4" />

                {/* Bridal Bouquet in Left Hand */}
                <g ref={bouquetRef} id="bridal-bouquet" transform="translate(244, 250)">
                  {/* Eucalyptus Green Leaves */}
                  <ellipse cx="-2" cy="0" rx="4.5" ry="2.5" fill="#4B6350" transform="rotate(-30)" />
                  <ellipse cx="6" cy="1" rx="4" ry="2" fill="#3D5341" transform="rotate(25)" />
                  <ellipse cx="2" cy="7" rx="3.5" ry="2" fill="#526E58" transform="rotate(60)" />

                  {/* White & Ivory Roses */}
                  <circle cx="0" cy="2" r="4.2" fill="#FFFFFF" />
                  <circle cx="0" cy="2" r="2.2" fill="#F7EEDD" />
                  <circle cx="5" cy="4" r="3.6" fill="#FFFDF8" />
                  <circle cx="-4" cy="5" r="3.4" fill="#FAF6ED" />
                  <circle cx="1" cy="7" r="3.8" fill="#FFFFFF" />

                  {/* Gold Sparkle Flower Accent */}
                  <circle cx="1" cy="4.5" r="1.2" fill="#D4AF37" />
                  {/* Silk Ribbon Tails */}
                  <path d="M1 8 Q-1 16 -3 21" stroke="#FAF7F0" strokeWidth="1.2" fill="none" />
                  <path d="M2 8 Q5 17 4 23" stroke="#FAF7F0" strokeWidth="1.2" fill="none" />
                </g>

                {/* Modest White Bridal Hijab Head (Faceless Minimalist Art) */}
                <g id="bride-head">
                  {/* Hijab Drapes framing face */}
                  <path
                    d="M228 152 C216 152 214 163 214 174 C214 186 218 198 228 200 C238 198 242 186 242 174 C242 163 240 152 228 152 Z"
                    fill="#FAF8F4"
                  />
                  {/* Faceless Oval Opening */}
                  <ellipse cx="227.5" cy="176" rx="7.5" ry="10" fill="#F4D8C4" />
                  {/* Hijab Inner Wrap Over Forehead */}
                  <path
                    d="M220 168 Q228 165 235 168 Q235 164 228 164 Q221 164 220 168 Z"
                    fill="#EDE6D8"
                  />
                  {/* Hijab Drape to Neck */}
                  <path
                    d="M217 186 Q228 196 238 186 Q239 202 228 203 Q216 202 217 186 Z"
                    fill="#FAF8F4"
                  />
                </g>
              </g>

              {/* Sparkling Union Point where Hands Meet */}
              <g id="hands-sparkle" transform="translate(184, 146)">
                <circle cx="0" cy="0" r="8" fill="rgba(212, 175, 55, 0.25)" />
                <circle cx="0" cy="0" r="3.5" fill="rgba(255, 255, 255, 0.9)" />
                <path
                  d="M0 -6 L0 6 M-6 0 L6 0"
                  stroke="#D4AF37"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>

          {/* Swipe / Drag Interactive Hint */}
          {swipeHintVisible && (
            <div className="absolute top-14 sm:top-18 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-sm border border-gold-primary/30 text-[10px] sm:text-xs text-gold-accent font-montserrat tracking-wider animate-pulse">
              <span>✦</span>
              <span>Tap or Swipe to Twirl</span>
              <span>✦</span>
            </div>
          )}
        </div>

        {/* Interactive Control Pill Button & Counter */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => triggerTwirl(1)}
            disabled={isTwirling}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FDF7C3] to-[#AA771C] text-[#0B0F0D] font-cinzel font-bold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.55)] active:scale-95 transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed overflow-hidden"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <Sparkles className="w-4 h-4 text-[#0B0F0D] transition-transform group-hover:rotate-45" />
            <span>✦ Tap to Twirl ✦</span>
          </button>

          {/* Romantic Twirl Counter Badge */}
          {twirlCount > 0 && (
            <div className="inline-flex items-center gap-1.5 font-cormorant italic text-sm sm:text-base text-gold-accent animate-fade-in">
              <Heart className="w-3.5 h-3.5 fill-gold-accent text-gold-accent inline" />
              <span>
                Shared {twirlCount} {twirlCount === 1 ? 'twirl' : 'twirls'} of eternal love
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveFirstDance;
