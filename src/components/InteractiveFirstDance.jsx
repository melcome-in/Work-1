import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

import coupleImg from '../assets/images/couple-dance.png';
import groomImg from '../assets/images/groom-figure.png';
import brideFrontImg from '../assets/images/bride-front.png';
import brideBackImg from '../assets/images/bride-back.png';

const InteractiveFirstDance = () => {
  const containerRef = useRef(null);
  const archRef = useRef(null);
  const groomRef = useRef(null);
  const brideWrapperRef = useRef(null);
  const brideGownRef = useRef(null);
  const handsSparkleRef = useRef(null);
  const particlesCanvasRef = useRef(null);

  const [twirlCount, setTwirlCount] = useState(0);
  const [isTwirling, setIsTwirling] = useState(false);
  const [swipeHintVisible, setSwipeHintVisible] = useState(true);

  // Gesture drag tracking
  const dragStartRef = useRef(null);
  const dragCurrentRef = useRef(0);
  const isDraggingRef = useRef(false);

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
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Dynamic swirling particles during twirl
    const swirlParticles = [];

    const spawnTwirlSwirl = (direction = 1) => {
      const centerX = width * 0.67;
      const centerY = height * 0.55;
      for (let i = 0; i < 45; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 50 + 15;
        swirlParticles.push({
          angle: angle,
          radius: radius,
          radialSpeed: Math.random() * 2.4 + 1.2,
          angularSpeed: (Math.random() * 0.09 + 0.05) * direction,
          size: Math.random() * 2.6 + 1.2,
          alpha: 1,
          decay: Math.random() * 0.016 + 0.01,
          color: Math.random() > 0.3 ? '#D4AF37' : '#FFF9D2',
        });
      }
    };

    window.__spawnTwirlSwirl = spawnTwirlSwirl;

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

      // Twirl swirl vortex particles
      for (let i = swirlParticles.length - 1; i >= 0; i--) {
        const sp = swirlParticles[i];
        sp.angle += sp.angularSpeed;
        sp.radius += sp.radialSpeed;
        const px = width * 0.67 + Math.cos(sp.angle) * sp.radius;
        const py = height * 0.55 + Math.sin(sp.angle) * (sp.radius * 0.38);
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0) {
          swirlParticles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.beginPath();
        ctx.arc(px, py, sp.size, 0, Math.PI * 2);
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

  // Main twirl animation: Groom rotates Bride
  const triggerTwirl = useCallback(
    (direction = 1) => {
      if (isTwirling) return;
      setIsTwirling(true);
      setSwipeHintVisible(false);
      setTwirlCount((prev) => prev + 1);

      // Trigger ambient canvas vortex
      if (window.__spawnTwirlSwirl) {
        window.__spawnTwirlSwirl(direction);
      }

      // Sparkle burst at the joined hands anchor
      if (handsSparkleRef.current) {
        gsap.fromTo(
          handsSparkleRef.current,
          { scale: 0.5, opacity: 1 },
          { scale: 2.2, opacity: 0, duration: 0.8, ease: 'power2.out' }
        );
      }

      // Confetti burst from archway
      if (archRef.current) {
        const rect = archRef.current.getBoundingClientRect();
        const originX = (rect.left + rect.width * 0.62) / window.innerWidth;
        const originY = (rect.top + rect.height * 0.45) / window.innerHeight;

        confetti({
          particleCount: 26,
          spread: 75,
          origin: { x: originX, y: originY },
          colors: ['#D4AF37', '#FCF6BA', '#F3D98B', '#FFFFFF', '#E8C868'],
          shapes: ['circle'],
          scalar: 0.68,
          ticks: 110,
          gravity: 0.65,
          disableForReducedMotion: true,
        });
      }

      const groom = groomRef.current;
      const brideWrapper = brideWrapperRef.current;
      const brideGown = brideGownRef.current;

      const spinAngle = 360 * direction;

      const tl = gsap.timeline({
        onComplete: () => {
          setIsTwirling(false);
          gsap.set(brideWrapper, { rotationY: 0 });
        },
      });

      // 1. Groom's guiding stance & arm flex:
      // Groom guides the twirl with natural shoulder and arm movement
      if (groom) {
        tl.to(
          groom,
          {
            rotation: direction * -3,
            y: -3,
            transformOrigin: '28% 35%',
            duration: 0.65,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1,
          },
          0
        );
      }

      // 2. Bride 3D Rotation (Smooth 360 spin under Groom's hand)
      tl.to(
        brideWrapper,
        {
          rotationY: `+=${spinAngle}`,
          duration: 1.5,
          ease: 'power2.inOut',
        },
        0
      );

      // 3. Dynamic skirt centrifugal flare & vertical dip
      if (brideGown) {
        tl.to(
          brideGown,
          {
            scaleX: 1.16,
            scaleY: 0.97,
            transformOrigin: '66.8% 30%',
            duration: 0.7,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
          },
          0.1
        );
      }
    },
    [isTwirling]
  );

  // Horizontal Drag & Touch Swipe Handlers
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
    if (brideWrapperRef.current && Math.abs(diff) < 85) {
      gsap.to(brideWrapperRef.current, {
        rotationY: diff * 0.75,
        duration: 0.1,
        ease: 'none',
      });
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const diff = dragCurrentRef.current - (dragStartRef.current || 0);

    if (Math.abs(diff) > 25) {
      triggerTwirl(diff > 0 ? 1 : -1);
    } else {
      if (brideWrapperRef.current && !isTwirling) {
        gsap.to(brideWrapperRef.current, {
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
          className="relative w-full h-[470px] sm:h-[550px] rounded-t-[140px] sm:rounded-t-[200px] rounded-b-2xl sm:rounded-b-3xl bg-gradient-to-b from-[#061812] via-[#09241B] to-[#040C08] border border-gold-primary/60 sm:border-2 shadow-gold-glow flex flex-col items-center justify-end overflow-hidden cursor-pointer group"
          style={{ perspective: 1200 }}
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
            className="absolute bottom-0 w-full h-44 pointer-events-none z-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 40% at 50% 90%, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0.1) 50%, transparent 75%)',
            }}
          />

          {/* ==================================================== */}
          {/* The Couple Illustration with Groom Twirling Bride     */}
          {/* ==================================================== */}
          <div className="relative z-10 w-full h-full flex items-end justify-center pb-3 sm:pb-5">
            <div
              className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[597/800] drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)]"
              style={{ perspective: 1200 }}
            >
              {/* Floor Shadow beneath couple */}
              <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[85%] h-6 rounded-[100%] bg-black/50 blur-[5px] pointer-events-none"
              />

              {/* GROOM LAYER (Standing gracefully on left, arm raised holding bride) */}
              <div
                ref={groomRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                style={{ transformOrigin: '28% 35%' }}
              >
                <img
                  src={groomImg}
                  alt="Groom in tailored black tuxedo"
                  className="w-full h-full object-contain pointer-events-none"
                  draggable={false}
                />
              </div>

              {/* BRIDE 3D ROTATION LAYER (Twirls 360° beneath Groom's hand) */}
              <div
                ref={brideWrapperRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                style={{
                  transformOrigin: '66.8% 50%',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  ref={brideGownRef}
                  className="relative w-full h-full"
                  style={{
                    transformOrigin: '66.8% 30%',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front view of Bride */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <img
                      src={brideFrontImg}
                      alt="Bride in flowing bridal gown and hijab"
                      className="w-full h-full object-contain pointer-events-none"
                      draggable={false}
                    />
                  </div>

                  {/* Back view of Bride (shown when rotated past 90 degrees) */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <img
                      src={brideBackImg}
                      alt="Bride cascading veil back view"
                      className="w-full h-full object-contain pointer-events-none"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>

              {/* Hand Clasp Golden Sparkle Anchor Point */}
              <div
                ref={handsSparkleRef}
                className="absolute pointer-events-none z-30 opacity-0"
                style={{
                  left: '59%',
                  top: '8.9%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="w-8 h-8 rounded-full bg-gold-primary/30 blur-[4px] animate-pulse" />
                <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-white shadow-[0_0_10px_#FFF]" />
              </div>
            </div>
          </div>

          {/* Swipe / Drag Interactive Hint */}
          {swipeHintVisible && (
            <div className="absolute top-14 sm:top-18 left-1/2 -translate-x-1/2 pointer-events-none z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-gold-primary/30 text-[10px] sm:text-xs text-gold-accent font-montserrat tracking-wider animate-pulse">
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
