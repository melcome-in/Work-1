import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import goldWaxSealImg from '../assets/images/royal-gold-wax-seal.png';

/**
 * Photorealistic Botanical Peony / Dahlia Blossom with Serrated Leaves & Wild Floral Sprigs
 * Matches the vintage embossed copperplate wedding stationery relief from reference photo (envelop.JPG).
 * Replaces the geometric concentric circle rings with authentic multi-petal botanical artwork.
 */
const BotanicalBlossom = ({ x, y, scale = 1, rotate = 0, mirror = false }) => {
  const transform = `translate(${x}, ${y}) scale(${mirror ? -scale : scale}, ${scale}) rotate(${rotate})`;
  return (
    <g transform={transform} className="select-none pointer-events-none">
      {/* 1. Delicate Wild Floral Sprigs (Baby's breath sprays like in envelop.JPG) */}
      <g className="wild-sprigs">
        {/* Shadow Layer */}
        <g stroke="#030E07" fill="none" opacity="0.8" transform="translate(-1, -1)">
          <path d="M 12,-18 C 30,-32 54,-38 78,-50 C 90,-56 102,-68 114,-78" strokeWidth="1.6" />
          <path d="M 38,-28 C 50,-20 66,-18 78,-10" strokeWidth="1.2" />
          <path d="M 58,-40 C 66,-52 78,-60 90,-68" strokeWidth="1.2" />
          <path d="M 76,-48 C 84,-40 98,-38 108,-32" strokeWidth="1.2" />
        </g>
        {/* Highlight Layer */}
        <g stroke="#1F5C40" fill="none" opacity="0.45" transform="translate(1, 1)">
          <path d="M 12,-18 C 30,-32 54,-38 78,-50 C 90,-56 102,-68 114,-78" strokeWidth="1.2" />
          <path d="M 38,-28 C 50,-20 66,-18 78,-10" strokeWidth="1.0" />
          <path d="M 58,-40 C 66,-52 78,-60 90,-68" strokeWidth="1.0" />
        </g>
        {/* Sprig Florets Relief */}
        <g stroke="#14422D" fill="#0C2D1F" strokeWidth="0.8" opacity="0.85">
          <circle cx="114" cy="-78" r="3.2" />
          <circle cx="122" cy="-74" r="2.2" />
          <circle cx="78" cy="-10" r="3.0" />
          <circle cx="86" cy="-14" r="2.2" />
          <circle cx="90" cy="-68" r="3.2" />
          <circle cx="98" cy="-64" r="2.2" />
          <circle cx="108" cy="-32" r="3.0" />
          <circle cx="116" cy="-35" r="2.0" />
        </g>
      </g>

      {/* 2. Serrated Pinnate Botanical Leaves (Feathered foliage like in envelop.JPG) */}
      <g className="foliage-leaves">
        {/* Leaf Shadows */}
        <g stroke="#030E07" fill="none" opacity="0.85" transform="translate(-1, -1)">
          <path d="M -16,-20 C -32,-35 -52,-45 -74,-50 C -64,-32 -46,-18 -16,-20 Z" strokeWidth="2.0" />
          <path d="M -16,-20 L -74,-50" strokeWidth="1.4" />
          <path d="M -20,16 C -40,30 -62,42 -84,45 C -75,28 -52,14 -20,16 Z" strokeWidth="2.0" />
          <path d="M -20,16 L -84,45" strokeWidth="1.4" />
          <path d="M 16,22 C 32,42 48,64 58,84 C 44,72 26,50 16,22 Z" strokeWidth="2.0" />
          <path d="M 16,22 L 58,84" strokeWidth="1.4" />
        </g>
        {/* Leaf Highlights */}
        <g stroke="#1F5C40" fill="none" opacity="0.5" transform="translate(1, 1)">
          <path d="M -16,-20 C -32,-35 -52,-45 -74,-50 C -64,-32 -46,-18 -16,-20 Z" strokeWidth="1.4" />
          <path d="M -20,16 C -40,30 -62,42 -84,45 C -75,28 -52,14 -20,16 Z" strokeWidth="1.4" />
          <path d="M 16,22 C 32,42 48,64 58,84 C 44,72 26,50 16,22 Z" strokeWidth="1.4" />
        </g>
        {/* Leaf Fills with Pinnate Veins */}
        <g fill="#0B261A" stroke="#164A33" strokeWidth="1.0" opacity="0.9">
          <path d="M -16,-20 C -32,-35 -52,-45 -74,-50 C -64,-32 -46,-18 -16,-20 Z" />
          <path d="M -20,16 C -40,30 -62,42 -84,45 C -75,28 -52,14 -20,16 Z" />
          <path d="M 16,22 C 32,42 48,64 58,84 C 44,72 26,50 16,22 Z" />
          {/* Vein lines */}
          <path d="M -16,-20 L -74,-50" fill="none" strokeWidth="1.0" stroke="#1E5C40" />
          <path d="M -32,-28 L -38,-38 M -46,-36 L -54,-44 M -28,-22 L -22,-30" fill="none" strokeWidth="0.8" stroke="#1E5C40" />
          <path d="M -20,16 L -84,45" fill="none" strokeWidth="1.0" stroke="#1E5C40" />
          <path d="M -38,24 L -44,34 M -54,32 L -64,40 M -30,18 L -26,26" fill="none" strokeWidth="0.8" stroke="#1E5C40" />
          <path d="M 16,22 L 58,84" fill="none" strokeWidth="1.0" stroke="#1E5C40" />
          <path d="M 28,38 L 38,44 M 40,54 L 50,60 M 24,28 L 32,32" fill="none" strokeWidth="0.8" stroke="#1E5C40" />
        </g>
      </g>

      {/* 3. Layered Organic Botanical Peony Petals (Authentic Multi-Petal Blossom) */}
      <g className="botanical-peony-petals">
        {/* Debossed Shadow Layer (offset -1px, -1px) */}
        <g stroke="#030E07" fill="none" opacity="0.85" transform="translate(-1, -1)">
          {/* Outer Petals */}
          <path d="M 16,-8 C 30,-16 48,-14 56,-2 C 60,10 50,22 34,18 C 24,15 16,8 16,-8 Z" strokeWidth="1.8" />
          <path d="M 14,8 C 28,18 42,32 44,46 C 36,56 22,50 12,34 C 8,24 8,14 14,8 Z" strokeWidth="1.8" />
          <path d="M -4,16 C 6,32 10,50 -2,60 C -14,64 -26,52 -22,34 C -18,22 -10,14 -4,16 Z" strokeWidth="1.8" />
          <path d="M -14,10 C -26,24 -42,36 -54,28 C -62,18 -52,6 -36,-2 C -24,-6 -14,2 -14,10 Z" strokeWidth="1.8" />
          <path d="M -16,-2 C -32,4 -52,4 -58,-8 C -60,-20 -46,-28 -30,-22 C -20,-16 -12,-6 -16,-2 Z" strokeWidth="1.8" />
          <path d="M -14,-10 C -28,-18 -44,-32 -40,-46 C -32,-56 -18,-48 -10,-32 C -6,-20 -8,-12 -14,-10 Z" strokeWidth="1.8" />
          <path d="M 0,-16 C -6,-32 -10,-50 2,-60 C 14,-64 26,-52 22,-34 C 18,-22 10,-14 0,-16 Z" strokeWidth="1.8" />
          <path d="M 12,-12 C 24,-26 40,-36 52,-28 C 60,-18 50,-6 34,2 C 22,6 12,-2 12,-12 Z" strokeWidth="1.8" />
        </g>

        {/* Embossed Highlight Layer (offset +1px, +1px) */}
        <g stroke="#1F5C40" fill="none" opacity="0.5" transform="translate(1, 1)">
          <path d="M 16,-8 C 30,-16 48,-14 56,-2 C 60,10 50,22 34,18 C 24,15 16,8 16,-8 Z" strokeWidth="1.3" />
          <path d="M 14,8 C 28,18 42,32 44,46 C 36,56 22,50 12,34 C 8,24 8,14 14,8 Z" strokeWidth="1.3" />
          <path d="M -4,16 C 6,32 10,50 -2,60 C -14,64 -26,52 -22,34 C -18,22 -10,14 -4,16 Z" strokeWidth="1.3" />
          <path d="M -14,10 C -26,24 -42,36 -54,28 C -62,18 -52,6 -36,-2 C -24,-6 -14,2 -14,10 Z" strokeWidth="1.3" />
          <path d="M -16,-2 C -32,4 -52,4 -58,-8 C -60,-20 -46,-28 -30,-22 C -20,-16 -12,-6 -16,-2 Z" strokeWidth="1.3" />
          <path d="M -14,-10 C -28,-18 -44,-32 -40,-46 C -32,-56 -18,-48 -10,-32 C -6,-20 -8,-12 -14,-10 Z" strokeWidth="1.3" />
          <path d="M 0,-16 C -6,-32 -10,-50 2,-60 C 14,-64 26,-52 22,-34 C 18,-22 10,-14 0,-16 Z" strokeWidth="1.3" />
          <path d="M 12,-12 C 24,-26 40,-36 52,-28 C 60,-18 50,-6 34,2 C 22,6 12,-2 12,-12 Z" strokeWidth="1.3" />
        </g>

        {/* Outer Petal Fills (Deep Emerald Stationery Relief) */}
        <g fill="#0A2418" stroke="#164A33" strokeWidth="1.1" opacity="0.95">
          <path d="M 16,-8 C 30,-16 48,-14 56,-2 C 60,10 50,22 34,18 C 24,15 16,8 16,-8 Z" />
          <path d="M 14,8 C 28,18 42,32 44,46 C 36,56 22,50 12,34 C 8,24 8,14 14,8 Z" />
          <path d="M -4,16 C 6,32 10,50 -2,60 C -14,64 -26,52 -22,34 C -18,22 -10,14 -4,16 Z" />
          <path d="M -14,10 C -26,24 -42,36 -54,28 C -62,18 -52,6 -36,-2 C -24,-6 -14,2 -14,10 Z" />
          <path d="M -16,-2 C -32,4 -52,4 -58,-8 C -60,-20 -46,-28 -30,-22 C -20,-16 -12,-6 -16,-2 Z" />
          <path d="M -14,-10 C -28,-18 -44,-32 -40,-46 C -32,-56 -18,-48 -10,-32 C -6,-20 -8,-12 -14,-10 Z" />
          <path d="M 0,-16 C -6,-32 -10,-50 2,-60 C 14,-64 26,-52 22,-34 C 18,-22 10,-14 0,-16 Z" />
          <path d="M 12,-12 C 24,-26 40,-36 52,-28 C 60,-18 50,-6 34,2 C 22,6 12,-2 12,-12 Z" />
        </g>

        {/* Middle Cupped Petals */}
        <g fill="#0D2E1F" stroke="#19543A" strokeWidth="1.0" opacity="0.95">
          <path d="M 8,-6 C 22,-10 32,-4 32,8 C 28,18 16,16 8,6 Z" />
          <path d="M 6,8 C 14,22 8,30 -4,32 C -16,30 -16,18 -6,8 Z" />
          <path d="M -8,6 C -22,10 -32,4 -32,-8 C -28,-18 -16,-16 -8,-6 Z" />
          <path d="M -6,-8 C -14,-22 -8,-30 4,-32 C 16,-30 16,-18 6,-8 Z" />
          <path d="M 10,2 C 18,12 16,22 6,24 C -4,24 -4,14 4,6 Z" />
          <path d="M -10,-2 C -18,-12 -16,-22 -6,-24 C 4,-24 4,-14 -4,-6 Z" />
        </g>

        {/* Inner Blossom Heart */}
        <g fill="#103625" stroke="#1F6244" strokeWidth="0.9">
          <path d="M -8,-6 C -6,-12 6,-12 8,-6 C 10,0 2,4 -4,2 Z" />
          <path d="M -4,2 C -2,8 6,8 6,2 C 6,-4 -2,-4 -4,2 Z" />
          <path d="M -6,-2 C -10,0 -8,6 -2,6 C 2,6 0,-2 -6,-2 Z" />
        </g>
        {/* Stamen Nodes */}
        <circle cx="-3" cy="-3" r="1.5" fill="#15422F" stroke="#257A54" strokeWidth="0.6" />
        <circle cx="3" cy="-3" r="1.5" fill="#15422F" stroke="#257A54" strokeWidth="0.6" />
        <circle cx="-3" cy="3" r="1.5" fill="#15422F" stroke="#257A54" strokeWidth="0.6" />
        <circle cx="3" cy="3" r="1.5" fill="#15422F" stroke="#257A54" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="1.8" fill="#1E5C40" stroke="#329668" strokeWidth="0.6" />
      </g>
    </g>
  );
};

/**
 * Shimmering Golden Flower Contour & Radiant Petal Core
 * Replaces the old concentric circle glow with authentic floral petal line art.
 */
const GoldenBotanicalBloom = ({ x, y, scale = 1, rotate = 0, mirror = false }) => {
  const transform = `translate(${x}, ${y}) scale(${mirror ? -scale : scale}, ${scale}) rotate(${rotate})`;
  return (
    <g transform={transform} className="select-none pointer-events-none">
      {/* Animated Golden Lines Tracing the Petals & Veins */}
      <g stroke="url(#antiqueGoldGrad)" fill="none">
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M 16,-8 C 30,-16 48,-14 56,-2 C 60,10 50,22 34,18 C 24,15 16,8 16,-8 Z"
          strokeWidth="1.6"
          opacity="0"
        />
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M 14,8 C 28,18 42,32 44,46 C 36,56 22,50 12,34 C 8,24 8,14 14,8 Z"
          strokeWidth="1.6"
          opacity="0"
        />
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M -4,16 C 6,32 10,50 -2,60 C -14,64 -26,52 -22,34 C -18,22 -10,14 -4,16 Z"
          strokeWidth="1.6"
          opacity="0"
        />
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M -14,10 C -26,24 -42,36 -54,28 C -62,18 -52,6 -36,-2 C -24,-6 -14,2 -14,10 Z"
          strokeWidth="1.6"
          opacity="0"
        />
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M -16,-2 C -32,4 -52,4 -58,-8 C -60,-20 -46,-28 -30,-22 C -20,-16 -12,-6 -16,-2 Z"
          strokeWidth="1.6"
          opacity="0"
        />
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M -14,-10 C -28,-18 -44,-32 -40,-46 C -32,-56 -18,-48 -10,-32 C -6,-20 -8,-12 -14,-10 Z"
          strokeWidth="1.6"
          opacity="0"
        />
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M 0,-16 C -6,-32 -10,-50 2,-60 C 14,-64 26,-52 22,-34 C 18,-22 10,-14 0,-16 Z"
          strokeWidth="1.6"
          opacity="0"
        />
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M 12,-12 C 24,-26 40,-36 52,-28 C 60,-18 50,-6 34,2 C 22,6 12,-2 12,-12 Z"
          strokeWidth="1.6"
          opacity="0"
        />
        {/* Golden Leaf Midribs */}
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M -16,-20 L -74,-50"
          strokeWidth="1.4"
          opacity="0"
        />
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M -20,16 L -84,45"
          strokeWidth="1.4"
          opacity="0"
        />
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M 16,22 L 58,84"
          strokeWidth="1.4"
          opacity="0"
        />
      </g>

      {/* Golden Inner Petals & Center Stamen Line Drawings (Pure Gold Linework, No White/Red/Yellow Fills) */}
      <g stroke="url(#antiqueGoldGrad)" fill="none">
        {/* Inner Petal Line Outlines */}
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M 8,-6 C 22,-10 32,-4 32,8 C 28,18 16,16 8,6 Z"
          strokeWidth="1.5"
          opacity="0"
        />
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M 6,8 C 14,22 8,30 -4,32 C -16,30 -16,18 -6,8 Z"
          strokeWidth="1.5"
          opacity="0"
        />
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M -8,6 C -22,10 -32,4 -32,-8 C -28,-18 -16,-16 -8,-6 Z"
          strokeWidth="1.5"
          opacity="0"
        />
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M -6,-8 C -14,-22 -8,-30 4,-32 C 16,-30 16,-18 6,-8 Z"
          strokeWidth="1.5"
          opacity="0"
        />
        {/* Center Stamen Concentric Gold Line Rings */}
        <circle
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          cx="0"
          cy="0"
          r="9"
          strokeWidth="1.4"
          opacity="0"
        />
        <circle
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          cx="0"
          cy="0"
          r="4.5"
          strokeWidth="1.2"
          opacity="0"
        />
        {/* Center Stamen Radiating Gold Ray Lines */}
        <path
          className="golden-floral-line"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          d="M 0,-4.5 L 0,-9 M 0,4.5 L 0,9 M -4.5,0 L -9,0 M 4.5,0 L 9,0 M -3,-3 L -6.5,-6.5 M 3,3 L 6.5,6.5 M -3,3 L -6.5,6.5 M 3,-3 L 6.5,-6.5"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0"
        />
      </g>
    </g>
  );
};

const RoyalEnvelope = ({ onOpenComplete, onTriggerAudio }) => {
  const [isOpening, setIsOpening] = useState(false);

  const envelopeContainerRef = useRef(null);
  const topFlapRef = useRef(null);
  const bottomFlapRef = useRef(null);
  const waxSealRef = useRef(null);
  const bismillahRef = useRef(null);
  const promptTextRef = useRef(null);

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);

    // 1. Play seal audio & start background soundtrack
    if (onTriggerAudio) {
      onTriggerAudio();
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        if (onOpenComplete) onOpenComplete();
      },
    });

    // Step 1: Wax seal micro-depress on click
    tl.to(waxSealRef.current, {
      scale: 0.94,
      duration: 0.2,
      ease: 'power2.out',
    })
      // Step 2: Golden lines race outward from the center seal across flowers and leaves
      .to(
        '.golden-floral-line',
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.25,
          stagger: 0.025,
          ease: 'power2.inOut',
        },
        '-=0.08'
      )
      // Step 3: Celebratory gold particle burst as seal lifts away
      .to(
        waxSealRef.current,
        {
          scale: 1.2,
          opacity: 0,
          duration: 0.35,
          ease: 'back.out(2)',
          onStart: () => {
            confetti({
              particleCount: 100,
              spread: 100,
              origin: { y: 0.5 },
              colors: ['#D4AF37', '#FFF3C4', '#F3D98B', '#164834', '#E8C868', '#A67C1E'],
              ticks: 240,
              gravity: 0.85,
              scalar: 0.95,
            });
          },
        },
        '+=0.1'
      )
      // Fade out Bismillah and prompt text
      .to(
        [promptTextRef.current, bismillahRef.current],
        {
          opacity: 0,
          y: 10,
          duration: 0.35,
        },
        '<'
      )
      // Step 4: Top triangular flap folds open upward in 3D (-160deg)
      .to(
        topFlapRef.current,
        {
          rotateX: -160,
          duration: 0.95,
          ease: 'power2.inOut',
        },
        '-=0.1'
      )
      // Bottom triangular flap folds open downward in 3D (160deg)
      .to(
        bottomFlapRef.current,
        {
          rotateX: 160,
          duration: 0.95,
          ease: 'power2.inOut',
        },
        '<'
      )
      // Step 5: Envelope container smoothly fades out & reveals main invitation page
      .to(
        envelopeContainerRef.current,
        {
          opacity: 0,
          scale: 1.04,
          duration: 0.55,
          ease: 'power2.inOut',
        },
        '-=0.35'
      );
  };

  return (
    <div
      ref={envelopeContainerRef}
      style={{ perspective: '1400px' }}
      className="fixed inset-0 z-50 w-screen h-[100dvh] overflow-hidden select-none bg-[#07150E]"
    >
      {/* ─── BASE SVG DEFINITIONS (Gradients & Filters) ─── */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Deep Matte Royal Emerald Paper Gradients */}
          <linearGradient id="flapBaseTop" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#133827" />
            <stop offset="55%" stopColor="#0E281C" />
            <stop offset="100%" stopColor="#081A12" />
          </linearGradient>

          <linearGradient id="flapBaseBottom" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#143A29" />
            <stop offset="55%" stopColor="#0E281C" />
            <stop offset="100%" stopColor="#081A12" />
          </linearGradient>

          <linearGradient id="flapBaseLeft" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#103223" />
            <stop offset="60%" stopColor="#0A2016" />
            <stop offset="100%" stopColor="#06160F" />
          </linearGradient>

          <linearGradient id="flapBaseRight" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#103223" />
            <stop offset="60%" stopColor="#0A2016" />
            <stop offset="100%" stopColor="#06160F" />
          </linearGradient>

          {/* Antique Gold Metallic Gradients */}
          <linearGradient id="antiqueGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C59A3F" />
            <stop offset="25%" stopColor="#F9E5A8" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="75%" stopColor="#FDF2D3" />
            <stop offset="100%" stopColor="#A8812F" />
          </linearGradient>

          <linearGradient id="goldFiligreeEdge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A6621" />
            <stop offset="50%" stopColor="#E8C868" />
            <stop offset="100%" stopColor="#8A6621" />
          </linearGradient>

          {/* Flap Edge Drop Shadow Filter for Realistic Paper Crease Depth */}
          <filter id="creaseShadowTop" x="-10%" y="0%" width="120%" height="150%">
            <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#000000" floodOpacity="0.85" />
          </filter>
          <filter id="creaseShadowBottom" x="-10%" y="-40%" width="120%" height="150%">
            <feDropShadow dx="0" dy="-12" stdDeviation="16" floodColor="#000000" floodOpacity="0.75" />
          </filter>
        </defs>
      </svg>

      {/* ─── LAYER 1: BACKGROUND SIDE FLAPS (Left & Right Triangles) ─── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Left Flap */}
          <polygon
            points="0,0 500,500 0,1000"
            fill="url(#flapBaseLeft)"
          />
          {/* Right Flap */}
          <polygon
            points="1000,0 500,500 1000,1000"
            fill="url(#flapBaseRight)"
          />

          {/* Left Side Embossed Botanical Sprigs */}
          <g className="select-none opacity-85">
            {/* Shadow */}
            <g stroke="#030E07" fill="none" opacity="0.8" transform="translate(-1, -1)">
              <path d="M 400,480 C 320,440 220,420 120,450 C 70,465 40,490 10,500" strokeWidth="2.2" />
              <path d="M 280,435 C 250,390 200,380 160,395" strokeWidth="1.6" />
              <path d="M 220,430 C 200,470 160,485 130,480" strokeWidth="1.6" />
            </g>
            {/* Highlight */}
            <g stroke="#1F5C40" fill="none" opacity="0.45" transform="translate(1, 1)">
              <path d="M 400,480 C 320,440 220,420 120,450 C 70,465 40,490 10,500" strokeWidth="1.8" />
              <path d="M 280,435 C 250,390 200,380 160,395" strokeWidth="1.2" />
              <path d="M 220,430 C 200,470 160,485 130,480" strokeWidth="1.2" />
            </g>
            {/* Foliage leaves */}
            <g fill="#0B261A" stroke="#14422D" strokeWidth="0.8" opacity="0.8">
              <path d="M 280,435 C 265,410 240,412 230,428 C 250,438 270,440 280,435 Z" />
              <path d="M 220,430 C 205,450 185,455 175,445 C 190,430 210,425 220,430 Z" />
              <path d="M 160,442 C 145,420 125,425 115,440 C 130,450 150,450 160,442 Z" />
            </g>
          </g>

          {/* Right Side Embossed Botanical Sprigs */}
          <g className="select-none opacity-85">
            {/* Shadow */}
            <g stroke="#030E07" fill="none" opacity="0.8" transform="translate(-1, -1)">
              <path d="M 600,480 C 680,440 780,420 880,450 C 930,465 960,490 990,500" strokeWidth="2.2" />
              <path d="M 720,435 C 750,390 800,380 840,395" strokeWidth="1.6" />
              <path d="M 780,430 C 800,470 840,485 870,480" strokeWidth="1.6" />
            </g>
            {/* Highlight */}
            <g stroke="#1F5C40" fill="none" opacity="0.45" transform="translate(1, 1)">
              <path d="M 600,480 C 680,440 780,420 880,450 C 930,465 960,490 990,500" strokeWidth="1.8" />
              <path d="M 720,435 C 750,390 800,380 840,395" strokeWidth="1.2" />
              <path d="M 780,430 C 800,470 840,485 870,480" strokeWidth="1.2" />
            </g>
            {/* Foliage leaves */}
            <g fill="#0B261A" stroke="#14422D" strokeWidth="0.8" opacity="0.8">
              <path d="M 720,435 C 735,410 760,412 770,428 C 750,438 730,440 720,435 Z" />
              <path d="M 780,430 C 795,450 815,455 825,445 C 810,430 790,425 780,430 Z" />
              <path d="M 840,442 C 855,420 875,425 885,440 C 870,450 850,450 840,442 Z" />
            </g>
          </g>

          {/* Golden animated lines on side flaps */}
          <path
            className="golden-floral-line"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
            d="M 400,480 C 320,440 220,420 120,450 C 70,465 40,490 10,500"
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
            d="M 600,480 C 680,440 780,420 880,450 C 930,465 960,490 990,500"
            stroke="url(#antiqueGoldGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0"
          />
        </svg>
      </div>

      {/* ─── LAYER 2: 3D BOTTOM TRIANGULAR FLAP (Spans bottom 50vh, points to 50%, 0) ─── */}
      <div
        ref={bottomFlapRef}
        style={{
          transformOrigin: 'bottom center',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
        className="absolute bottom-0 left-0 right-0 h-1/2 z-20 pointer-events-none"
      >
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible drop-shadow-[0_-12px_28px_rgba(0,0,0,0.85)]"
        >
          {/* Bottom Flap Polygon: (0,500) to (500,0) to (1000,500) */}
          <polygon
            points="0,500 500,0 1000,500"
            fill="url(#flapBaseBottom)"
          />

          {/* Delicate Seam Crease Line */}
          <polyline
            points="0,500 500,0 1000,500"
            fill="none"
            stroke="url(#goldFiligreeEdge)"
            strokeWidth="1.5"
            strokeOpacity="0.45"
          />

          {/* ─── Embossed Botanical Vines & Leaves (Bottom Flap) ─── */}
          <g className="select-none opacity-90">
            {/* Paper Shadow (offset -1px, -1px) */}
            <g stroke="#030E07" fill="none" opacity="0.85" transform="translate(-1, -1)">
              {/* Lower-Left Climbing Vine System */}
              <path d="M 490,10 C 430,70 330,160 250,260 C 180,345 120,420 60,480" strokeWidth="2.8" />
              <path d="M 370,120 C 310,160 260,150 220,130" strokeWidth="2.0" />
              <path d="M 290,210 C 240,250 180,240 150,210" strokeWidth="2.0" />
              <path d="M 200,320 C 150,360 100,350 70,320" strokeWidth="1.8" />

              {/* Lower-Right Climbing Vine System */}
              <path d="M 510,10 C 570,70 670,160 750,260 C 820,345 880,420 940,480" strokeWidth="2.8" />
              <path d="M 630,120 C 690,160 740,150 780,130" strokeWidth="2.0" />
              <path d="M 710,210 C 760,250 820,240 850,210" strokeWidth="2.0" />
              <path d="M 800,320 C 850,360 900,350 930,320" strokeWidth="1.8" />

              {/* Center-Bottom Stem */}
              <path d="M 500,20 C 506,120 494,260 500,480" strokeWidth="2.4" />
              <path d="M 500,160 C 465,190 425,180 405,165" strokeWidth="1.8" />
              <path d="M 500,240 C 535,270 575,260 595,245" strokeWidth="1.8" />
              <path d="M 500,330 C 465,360 425,350 405,335" strokeWidth="1.8" />
            </g>

            {/* Paper Highlight (offset +1px, +1px) */}
            <g stroke="#1F5C40" fill="none" opacity="0.5" transform="translate(1, 1)">
              <path d="M 490,10 C 430,70 330,160 250,260 C 180,345 120,420 60,480" strokeWidth="2.0" />
              <path d="M 370,120 C 310,160 260,150 220,130" strokeWidth="1.4" />
              <path d="M 290,210 C 240,250 180,240 150,210" strokeWidth="1.4" />
              <path d="M 510,10 C 570,70 670,160 750,260 C 820,345 880,420 940,480" strokeWidth="2.0" />
              <path d="M 630,120 C 690,160 740,150 780,130" strokeWidth="1.4" />
              <path d="M 710,210 C 760,250 820,240 850,210" strokeWidth="1.4" />
              <path d="M 500,20 C 506,120 494,260 500,480" strokeWidth="1.8" />
            </g>

            {/* Embossed Botanical Leaves */}
            <g fill="#0B261A" stroke="#14422D" strokeWidth="0.9" opacity="0.85">
              {/* Lower-Left Foliage Leaves */}
              <path d="M 370,120 C 345,95 305,105 285,128 C 320,140 350,138 370,120 Z" />
              <path d="M 290,210 C 265,185 225,195 205,218 C 240,230 270,228 290,210 Z" />
              <path d="M 200,320 C 175,295 135,305 115,328 C 150,340 180,338 200,320 Z" />

              {/* Lower-Right Foliage Leaves */}
              <path d="M 630,120 C 655,95 695,105 715,128 C 680,140 650,138 630,120 Z" />
              <path d="M 710,210 C 735,185 775,195 795,218 C 760,230 730,228 710,210 Z" />
              <path d="M 800,320 C 825,295 865,305 885,328 C 850,340 820,338 800,320 Z" />

              {/* Center Foliage Leaves */}
              <path d="M 500,160 C 475,140 440,148 425,168 C 455,178 480,175 500,160 Z" />
              <path d="M 500,240 C 525,220 560,228 575,248 C 545,258 520,255 500,240 Z" />
            </g>

            {/* ─── Authentic Botanical Peony Blossoms (Lower Flap: Replaces Concentric Ripple Rings) ─── */}
            <BotanicalBlossom x={760} y={370} scale={1.15} rotate={-8} />
            <BotanicalBlossom x={240} y={370} scale={1.1} rotate={8} mirror={true} />
          </g>

          {/* ─── Animated Golden Lines (Bottom Flap: Traces outward from seal) ─── */}
          <g className="select-none pointer-events-none">
            {/* Lower-Left Golden Stem */}
            <path
              className="golden-floral-line"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
              d="M 490,10 C 430,70 330,160 250,260 C 180,345 120,420 60,480"
              stroke="url(#antiqueGoldGrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              opacity="0"
            />
            <path
              className="golden-floral-line"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
              d="M 370,120 C 310,160 260,150 220,130"
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
              d="M 290,210 C 240,250 180,240 150,210"
              stroke="url(#antiqueGoldGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0"
            />

            {/* Lower-Right Golden Stem */}
            <path
              className="golden-floral-line"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
              d="M 510,10 C 570,70 670,160 750,260 C 820,345 880,420 940,480"
              stroke="url(#antiqueGoldGrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              opacity="0"
            />
            <path
              className="golden-floral-line"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
              d="M 630,120 C 690,160 740,150 780,130"
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
              d="M 710,210 C 760,250 820,240 850,210"
              stroke="url(#antiqueGoldGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0"
            />

            {/* Center-Bottom Golden Stem */}
            <path
              className="golden-floral-line"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
              d="M 500,20 C 506,120 494,260 500,480"
              stroke="url(#antiqueGoldGrad)"
              strokeWidth="2.0"
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
              d="M 370,120 C 345,95 305,105 285,128 C 320,140 350,138 370,120 Z"
              stroke="url(#antiqueGoldGrad)"
              strokeWidth="1.4"
              fill="none"
              opacity="0"
            />
            <path
              className="golden-floral-line"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
              d="M 630,120 C 655,95 695,105 715,128 C 680,140 650,138 630,120 Z"
              stroke="url(#antiqueGoldGrad)"
              strokeWidth="1.4"
              fill="none"
              opacity="0"
            />

            {/* Radiant Golden Botanical Peony Blooms (Replaces concentric gold circles) */}
            <GoldenBotanicalBloom x={760} y={370} scale={1.15} rotate={-8} />
            <GoldenBotanicalBloom x={240} y={370} scale={1.1} rotate={8} mirror={true} />
          </g>
        </svg>
      </div>

      {/* ─── LAYER 3: 3D TOP TRIANGULAR FLAP (Spans top 50vh, points down to 50%, 500) ─── */}
      <div
        ref={topFlapRef}
        style={{
          transformOrigin: 'top center',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
        className="absolute top-0 left-0 right-0 h-1/2 z-30 pointer-events-none"
      >
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible drop-shadow-[0_18px_36px_rgba(0,0,0,0.92)]"
        >
          {/* Top Flap Polygon: (0,0) to (1000,0) down to (500,500) */}
          <polygon
            points="0,0 1000,0 500,500"
            fill="url(#flapBaseTop)"
          />

          {/* Delicate Seam Crease Line */}
          <polyline
            points="0,0 500,500 1000,0"
            fill="none"
            stroke="url(#goldFiligreeEdge)"
            strokeWidth="1.6"
            strokeOpacity="0.5"
          />

          {/* ─── Embossed Botanical Vines & Leaves (Top Flap) ─── */}
          <g className="select-none opacity-90">
            {/* Paper Shadow (offset -1px, -1px) */}
            <g stroke="#030E07" fill="none" opacity="0.85" transform="translate(-1, -1)">
              {/* Upper-Left Climbing Vine System */}
              <path d="M 490,490 C 430,420 330,320 250,220 C 180,140 120,70 60,15" strokeWidth="2.8" />
              <path d="M 370,360 C 310,320 260,330 220,350" strokeWidth="2.0" />
              <path d="M 290,270 C 240,230 180,240 150,270" strokeWidth="2.0" />
              <path d="M 200,170 C 150,130 100,140 70,170" strokeWidth="1.8" />

              {/* Upper-Right Climbing Vine System */}
              <path d="M 510,490 C 570,420 670,320 750,220 C 820,140 880,70 940,15" strokeWidth="2.8" />
              <path d="M 630,360 C 690,320 740,330 780,350" strokeWidth="2.0" />
              <path d="M 710,270 C 760,230 820,240 850,270" strokeWidth="2.0" />
              <path d="M 800,170 C 850,130 900,140 930,170" strokeWidth="1.8" />

              {/* Center-Top Climbing Stem */}
              <path d="M 500,480 C 494,370 506,230 500,15" strokeWidth="2.4" />
              <path d="M 500,320 C 465,290 425,300 405,315" strokeWidth="1.8" />
              <path d="M 500,240 C 535,210 575,220 595,235" strokeWidth="1.8" />
            </g>

            {/* Paper Highlight (offset +1px, +1px) */}
            <g stroke="#1F5C40" fill="none" opacity="0.5" transform="translate(1, 1)">
              <path d="M 490,490 C 430,420 330,320 250,220 C 180,140 120,70 60,15" strokeWidth="2.0" />
              <path d="M 370,360 C 310,320 260,330 220,350" strokeWidth="1.4" />
              <path d="M 290,270 C 240,230 180,240 150,270" strokeWidth="1.4" />
              <path d="M 510,490 C 570,420 670,320 750,220 C 820,140 880,70 940,15" strokeWidth="2.0" />
              <path d="M 630,360 C 690,320 740,330 780,350" strokeWidth="1.4" />
              <path d="M 710,270 C 760,230 820,240 850,270" strokeWidth="1.4" />
              <path d="M 500,480 C 494,370 506,230 500,15" strokeWidth="1.8" />
            </g>

            {/* Embossed Leaves */}
            <g fill="#0B261A" stroke="#14422D" strokeWidth="0.9" opacity="0.85">
              {/* Upper-Left Foliage Leaves */}
              <path d="M 370,360 C 345,385 305,375 285,352 C 320,340 350,342 370,360 Z" />
              <path d="M 290,270 C 265,295 225,285 205,262 C 240,250 270,252 290,270 Z" />
              <path d="M 200,170 C 175,195 135,185 115,162 C 150,150 180,152 200,170 Z" />

              {/* Upper-Right Foliage Leaves */}
              <path d="M 630,360 C 655,385 695,375 715,352 C 680,340 650,342 630,360 Z" />
              <path d="M 710,270 C 735,295 775,285 795,262 C 760,250 730,252 710,270 Z" />
              <path d="M 800,170 C 825,195 865,185 885,162 C 850,150 820,152 800,170 Z" />
            </g>

            {/* ─── Authentic Botanical Peony Blossoms (Top Flap: Replaces Concentric Ripple Rings) ─── */}
            <BotanicalBlossom x={240} y={120} scale={1.1} rotate={-15} />
            <BotanicalBlossom x={760} y={120} scale={1.1} rotate={15} mirror={true} />
          </g>

          {/* ─── Animated Golden Lines (Top Flap: Traces upward from seal to flowers) ─── */}
          <g className="select-none pointer-events-none">
            {/* Upper-Left Golden Stem */}
            <path
              className="golden-floral-line"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
              d="M 490,490 C 430,420 330,320 250,220 C 180,140 120,70 60,15"
              stroke="url(#antiqueGoldGrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              opacity="0"
            />
            <path
              className="golden-floral-line"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
              d="M 370,360 C 310,320 260,330 220,350"
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
              d="M 290,270 C 240,230 180,240 150,270"
              stroke="url(#antiqueGoldGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0"
            />

            {/* Upper-Right Golden Stem */}
            <path
              className="golden-floral-line"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
              d="M 510,490 C 570,420 670,320 750,220 C 820,140 880,70 940,15"
              stroke="url(#antiqueGoldGrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              opacity="0"
            />
            <path
              className="golden-floral-line"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
              d="M 630,360 C 690,320 740,330 780,350"
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
              d="M 710,270 C 760,230 820,240 850,270"
              stroke="url(#antiqueGoldGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0"
            />

            {/* Center-Top Golden Stem */}
            <path
              className="golden-floral-line"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
              d="M 500,480 C 494,370 506,230 500,15"
              stroke="url(#antiqueGoldGrad)"
              strokeWidth="2.0"
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
              d="M 370,360 C 345,385 305,375 285,352 C 320,340 350,342 370,360 Z"
              stroke="url(#antiqueGoldGrad)"
              strokeWidth="1.4"
              fill="none"
              opacity="0"
            />
            <path
              className="golden-floral-line"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
              d="M 630,360 C 655,385 695,375 715,352 C 680,340 650,342 630,360 Z"
              stroke="url(#antiqueGoldGrad)"
              strokeWidth="1.4"
              fill="none"
              opacity="0"
            />

            {/* Radiant Golden Botanical Peony Blooms (Top Flap: Replaces concentric gold circles) */}
            <GoldenBotanicalBloom x={240} y={120} scale={1.1} rotate={-15} />
            <GoldenBotanicalBloom x={760} y={120} scale={1.1} rotate={15} mirror={true} />
          </g>
        </svg>
      </div>

      {/* ─── TOP CEREMONIAL BISMILLAH CALLIGRAPHY (Overlay on Top Flap) ─── */}
      <div
        ref={bismillahRef}
        className="absolute top-6 sm:top-10 left-0 right-0 z-40 text-center pointer-events-none px-4"
      >
        <p className="font-amiri text-2xl sm:text-4xl text-gold-primary tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="mt-2 font-cinzel text-[10px] sm:text-xs text-gold-accent/80 tracking-[0.35em] uppercase">
          Royal Wedding Invitation
        </p>
      </div>

      {/* ─── CENTER METADATA (Above Wax Seal) ─── */}
      <div className="absolute top-[37%] sm:top-[38%] left-0 right-0 z-40 text-center pointer-events-none px-4">
        <p className="font-cinzel text-xs sm:text-sm font-semibold text-gold-accent/90 tracking-[0.3em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          SHAHEER & NIDHA
        </p>
      </div>

      {/* ─── LAYER 4: REGAL ANTIQUE GOLD METALLIC WAX SEAL (Matching Reference Image) ─── */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
        <button
          ref={waxSealRef}
          type="button"
          onClick={handleOpenEnvelope}
          disabled={isOpening}
          aria-label="Tap the royal antique gold wax seal to unseal the wedding invitation"
          className="group relative w-32 h-32 sm:w-44 sm:h-44 cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center justify-center p-0 bg-transparent border-0 drop-shadow-[0_18px_32px_rgba(0,0,0,0.88)] hover:drop-shadow-[0_24px_42px_rgba(0,0,0,0.95)]"
        >
          <img
            src={goldWaxSealImg}
            alt="Royal Antique Gold S|N Wax Seal"
            draggable="false"
            className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]"
          />
        </button>
      </div>

      {/* ─── BOTTOM INTERACTIVE CALL-TO-ACTION PROMPT ─── */}
      <div
        ref={promptTextRef}
        className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-40 text-center px-4"
      >
        <button
          type="button"
          onClick={handleOpenEnvelope}
          disabled={isOpening}
          className="group inline-flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer"
        >
          <span className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-gold-accent group-hover:text-parchment transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Tap the Royal Wax Seal to Unseal
          </span>
          <span className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-gold-primary to-transparent group-hover:w-36 transition-all duration-500" />
        </button>
      </div>
    </div>
  );
};

export default RoyalEnvelope;
