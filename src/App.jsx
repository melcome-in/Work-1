import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MailOpen, Phone } from 'lucide-react';

import AmbientDust from './components/AmbientDust.jsx';
import RoyalEnvelope from './components/RoyalEnvelope.jsx';
import AudioPlayer from './components/AudioPlayer.jsx';
import ScratchRevealDate from './components/ScratchRevealDate.jsx';
import CountdownTimer from './components/CountdownTimer.jsx';
import weddingSong from './assets/audio/wedding-song.mp3';

const App = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const audioPlayerRef = useRef(null);
  const mainContentRef = useRef(null);
  const heroSectionRef = useRef(null);

  // Lock page scroll while the 3D envelope is still sealed
  useEffect(() => {
    if (!isEnvelopeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      if (heroSectionRef.current) {
        gsap.fromTo(
          heroSectionRef.current.querySelectorAll('.hero-reveal'),
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.14,
            ease: 'power3.out',
          }
        );
      }
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isEnvelopeOpen]);

  const handleTriggerAudio = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.playSealClick();
      audioPlayerRef.current.startMusic();
    }
  };

  const handleEnvelopeOpenComplete = () => {
    setIsEnvelopeOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-obsidian text-parchment bg-arabesque-pattern selection:bg-gold-primary/30 selection:text-gold-accent">
      {/* Component A: Fullscreen Ambient Golden Dust & Bokeh Canvas */}
      <AmbientDust />

      {/* Component C: Audio Player with uploaded wedding song */}
      <AudioPlayer ref={audioPlayerRef} externalAudioSrc={weddingSong} />

      {/* Component B: 3D Royal Wax Seal Envelope Modal */}
      {!isEnvelopeOpen && (
        <RoyalEnvelope
          onTriggerAudio={handleTriggerAudio}
          onOpenComplete={handleEnvelopeOpenComplete}
        />
      )}

      {/* Full-Page Royal Invitation Layout */}
      <main
        ref={mainContentRef}
        className={`relative z-10 transition-opacity duration-700 ${
          isEnvelopeOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top Ornamental Filigree Banner */}
        <div className="w-full h-2 bg-gradient-to-r from-obsidian via-gold-primary to-obsidian opacity-80" />

        {/* Hero Section: Royal Proclamation & Couple Monogram */}
        <header
          ref={heroSectionRef}
          className="relative pt-10 sm:pt-20 pb-12 sm:pb-16 px-4 max-w-4xl mx-auto text-center"
        >
          {/* Moorish Grand Archway Frame */}
          <div className="relative rounded-t-[140px] sm:rounded-t-[220px] rounded-b-3xl bg-gradient-to-b from-emerald-royal/95 via-[#071C15]/95 to-obsidian/95 border-2 border-gold-primary/60 shadow-gold-glow px-5 sm:px-14 pt-14 sm:pt-20 pb-10 sm:pb-14 overflow-hidden">
            {/* Inner Arch Filigree Line */}
            <div className="pointer-events-none absolute inset-2.5 sm:inset-3 rounded-t-[132px] sm:rounded-t-[210px] rounded-b-2xl border border-gold-primary/25" />

            {/* Bismillah Calligraphy */}
            <p className="hero-reveal font-amiri text-2xl sm:text-4xl text-gold-foil mb-2 tracking-wide">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <p className="hero-reveal font-cormorant italic text-base sm:text-lg text-parchment/85 mb-8">
              In the name of Allah,
              <br />
              The most beneficent and the most merciful
            </p>

            {/* Groom's Parents / Inviting Family */}
            <div className="hero-reveal max-w-lg mx-auto mb-8 px-6 py-5 rounded-2xl bg-obsidian/60 border border-gold-primary/30 shadow-inner text-center">
              <p className="font-cinzel text-lg sm:text-xl font-bold text-gold-foil tracking-wide">
                Mr. Mohammed &amp; Mrs. Shamla Mohammed
              </p>
              <p className="font-montserrat text-xs sm:text-sm text-parchment/80 mt-1.5">
                Pathil House, Kollannoor, Eravakkad P.O.
              </p>
              <a
                href="tel:9745770675"
                className="inline-flex items-center gap-2 font-montserrat text-xs text-gold-accent hover:text-gold-foil transition-colors mt-2.5 px-3.5 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/25"
              >
                <Phone className="w-3.5 h-3.5 text-gold-primary" />
                <span>Ph: 97457 70675</span>
              </a>
            </div>

            {/* Formal Invitation Text */}
            <p className="hero-reveal font-cormorant text-lg sm:text-2xl text-parchment/95 max-w-xl mx-auto leading-relaxed mb-6 font-medium">
              We cordially invite your esteemed presence with family on the auspicious occasion of the marriage of our son
            </p>

            {/* Bride & Groom Names */}
            <div className="hero-reveal my-6 sm:my-8">
              {/* Groom */}
              <div className="py-2">
                <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold text-gold-foil tracking-wider leading-tight">
                  Mohammed Shaheer
                </h1>
              </div>

              {/* With */}
              <div className="flex items-center justify-center gap-4 my-3 sm:my-4">
                <span className="w-14 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-gold-primary" />
                <span className="font-cormorant italic text-2xl sm:text-4xl text-gold-accent font-normal px-2">
                  With
                </span>
                <span className="w-14 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-gold-primary" />
              </div>

              {/* Bride */}
              <div className="py-2">
                <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold text-gold-foil tracking-wider leading-tight">
                  Fathima Nidha
                </h2>
                <p className="font-cormorant italic text-base sm:text-xl text-gold-accent mt-2 font-medium">
                  D/o Mr. C K Sulaiman &amp; Mrs. Safeena Sulaiman
                </p>
                <p className="font-montserrat text-xs sm:text-sm text-parchment/75 mt-1">
                  Changarath Kuttikattil House, Thalakkassery, Kajanagar
                </p>
              </div>
            </div>

            {/* Ornamental Divider */}
            <div className="hero-reveal flex items-center justify-center gap-4 my-8">
              <span className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent to-gold-primary" />
              <span className="text-gold-primary text-lg">❖</span>
              <span className="w-16 sm:w-28 h-[1px] bg-gradient-to-l from-transparent to-gold-primary" />
            </div>

            {/* Heartfelt Note */}
            <p className="hero-reveal font-cormorant italic text-xl sm:text-2xl text-gold-accent max-w-xl mx-auto leading-relaxed my-8 font-medium">
              &ldquo;Your presence will make our joy more complete.&rdquo;
            </p>

            {/* Best Wishes & Family Signature */}
            <div className="hero-reveal mt-8 pt-6 border-t border-gold-primary/35 max-w-md mx-auto">
              <p className="font-cormorant italic text-base sm:text-lg text-parchment/80 mb-2">
                With love and best wishes from
              </p>
              <p className="font-cinzel text-lg sm:text-xl font-bold text-gold-foil tracking-wider">
                Zidan, Haiza, Sheikha &amp; Pathil Family
              </p>
            </div>
          </div>
        </header>

        {/* Component: The Single Interactive Gold Foil Scratch Card for Date & Venue */}
        <ScratchRevealDate />

        {/* Component: Palace Archway Countdown Timer */}
        <CountdownTimer />

        {/* Ceremonial Footer */}
        <footer className="py-14 px-4 border-t border-gold-primary/25 text-center">
          <p className="font-amiri text-2xl text-gold-foil mb-2">
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="font-cinzel text-lg text-parchment/90 tracking-widest mb-4">
            SHAHEER &amp; NIDHA &bull; 13 | DECEMBER | 2026
          </p>

          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsEnvelopeOpen(false);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-primary/35 hover:border-gold-primary text-gold-accent font-montserrat text-[10px] uppercase tracking-[0.22em] transition-all"
          >
            <MailOpen className="w-3.5 h-3.5" />
            <span>Replay Wax Seal Ceremony</span>
          </button>
        </footer>
      </main>
    </div>
  );
};

export default App;
