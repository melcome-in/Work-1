import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Send,
  CheckCircle2,
  MailOpen,
  Phone,
  MapPin,
  Calendar,
  Clock,
  QrCode,
  ExternalLink,
  Heart,
} from 'lucide-react';

import AmbientDust from './components/AmbientDust.jsx';
import RoyalEnvelope from './components/RoyalEnvelope.jsx';
import AudioPlayer from './components/AudioPlayer.jsx';
import ScratchRevealDate from './components/ScratchRevealDate.jsx';
import CountdownTimer from './components/CountdownTimer.jsx';
import Itinerary from './components/Itinerary.jsx';
import weddingSong from './assets/audio/wedding-song.mp3';

const App = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [rsvpState, setRsvpState] = useState({
    guestName: '',
    attendance: 'attending',
    guestsCount: '2',
    blessing: '',
    submitted: false,
  });

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

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpState.guestName.trim()) return;
    setRsvpState((prev) => ({ ...prev, submitted: true }));
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.75 },
      colors: ['#D4AF37', '#E8C868', '#FAF7EE'],
    });
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

            {/* Page 2 (Inner) Pill */}
            <div className="hero-reveal inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/35 text-gold-accent font-montserrat text-[10px] uppercase tracking-[0.3em] mb-5">
              <span>Page 2 (Inner)</span>
            </div>

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
                className="inline-flex items-center gap-2 font-montserrat text-xs text-gold-accent hover:text-gold-foil transition-colors mt-2.5 px-3 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/25"
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

            {/* Date, Venue & Time Card */}
            <div className="hero-reveal max-w-2xl mx-auto my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#061e16] to-obsidian/95 border-2 border-gold-primary/50 shadow-gold-glow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-center">
                {/* Date */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 text-gold-accent mb-2">
                    <Calendar className="w-4 h-4 text-gold-primary" />
                    <span className="font-montserrat text-[10px] uppercase tracking-[0.25em]">Date</span>
                  </div>
                  <p className="font-cinzel text-lg sm:text-xl font-bold text-gold-foil">
                    SUNDAY, 13 DECEMBER 2026
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-gold-primary/15 border border-gold-primary/35 text-gold-accent font-montserrat text-[11px] tracking-wider">
                    [1448 Rajab 03]
                  </span>
                </div>

                {/* Venue & Time */}
                <div className="flex flex-col items-center md:border-l md:border-gold-primary/30 md:pl-6">
                  <div className="flex items-center gap-2 text-gold-accent mb-2">
                    <MapPin className="w-4 h-4 text-gold-primary" />
                    <span className="font-montserrat text-[10px] uppercase tracking-[0.25em]">Venue &amp; Time</span>
                  </div>
                  <p className="font-cinzel text-lg sm:text-xl font-bold text-gold-foil">
                    HITECH REGENCY, Kozhikkara
                  </p>
                  <p className="font-montserrat text-sm text-parchment/95 mt-1 font-semibold">
                    [12:00am to 2:30pm]
                  </p>
                  <p className="font-montserrat text-[11px] text-parchment/65 italic mt-1">
                    (Note: Printed as 12:00am in the card)
                  </p>
                </div>
              </div>
            </div>

            {/* QR Code Section: Location QR */}
            <div className="hero-reveal max-w-sm mx-auto my-8 p-6 rounded-2xl bg-obsidian/85 border border-gold-primary/45 text-center flex flex-col items-center shadow-gold-glow">
              <div className="flex items-center gap-2 text-gold-accent mb-3">
                <QrCode className="w-4 h-4 text-gold-primary" />
                <span className="font-montserrat text-xs uppercase tracking-[0.28em] font-semibold">
                  QR Code: Location Qr
                </span>
              </div>
              <div className="p-3.5 bg-white rounded-xl shadow-lg border-2 border-gold-primary/70 inline-block mb-3">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://maps.google.com/?q=Hitech+Regency+Convention+Centre+Kozhikkara&color=09241b&bgcolor=ffffff"
                  alt="Location QR Code - HITECH REGENCY, Kozhikkara"
                  width={160}
                  height={160}
                  className="w-36 h-36 sm:w-40 sm:h-40 object-contain mx-auto"
                  loading="lazy"
                />
              </div>
              <p className="font-cormorant italic text-sm text-parchment/80 mb-3">
                Scan with your smartphone camera for exact venue navigation
              </p>
              <a
                href="https://maps.google.com/?q=Hitech+Regency+Convention+Centre+Kozhikkara"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#AA771C] via-gold-primary to-[#D4AF37] text-obsidian font-montserrat font-semibold text-[11px] uppercase tracking-[0.2em] shadow-md hover:brightness-110 transition-all duration-300"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
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

        {/* Component D: Interactive Gold Foil Scratch Card */}
        <ScratchRevealDate />

        {/* Component E: Palace Archway Countdown Timer */}
        <CountdownTimer />

        {/* Component F: Royal Celebration Itinerary */}
        <Itinerary />

        {/* Royal RSVP & Blessing Registry Section */}
        <section className="relative py-14 sm:py-20 px-4 max-w-2xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-b from-emerald-royal/95 via-[#071C15] to-obsidian p-5 sm:p-12 border-2 border-gold-primary/60 shadow-gold-glow relative overflow-hidden">
            <div className="pointer-events-none absolute inset-3 rounded-2xl border border-gold-primary/20" />

            <div className="text-center mb-8">
              <p className="font-amiri text-2xl text-gold-accent mb-1">
                تَشْرِيفُكُمْ يَزِيدُنَا فَرَحًا
              </p>
              <p className="font-montserrat text-[11px] uppercase tracking-[0.35em] text-gold-primary mb-2">
                Répondez S&apos;il Vous Plaît
              </p>
              <h3 className="font-cinzel text-2xl sm:text-3xl text-gold-foil">
                Registry &amp; Blessings
              </h3>
            </div>

            {rsvpState.submitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-gold-primary mx-auto" />
                <h4 className="font-cinzel text-xl text-gold-foil">
                  BarakAllahu Lakuma &bull; Response Recorded
                </h4>
                <p className="font-cormorant text-lg text-parchment/85 max-w-md mx-auto">
                  Thank you, <span className="text-gold-accent font-semibold">{rsvpState.guestName}</span>.
                  Your warm presence and blessings are deeply cherished by Mohammed Shaheer, Fathima Nidha &amp; the Pathil Family.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-5 relative z-10">
                <div>
                  <label
                    htmlFor="guestName"
                    className="block font-montserrat text-[10px] uppercase tracking-[0.25em] text-gold-accent mb-2"
                  >
                    Honored Guest Name &amp; Title
                  </label>
                  <input
                    id="guestName"
                    type="text"
                    required
                    placeholder="e.g., His Excellency Tariq Al-Sulaiman"
                    value={rsvpState.guestName}
                    onChange={(e) =>
                      setRsvpState({ ...rsvpState, guestName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-obsidian/80 border border-gold-primary/40 focus:border-gold-primary text-parchment placeholder-parchment/35 font-cormorant text-lg focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="attendance"
                      className="block font-montserrat text-[10px] uppercase tracking-[0.25em] text-gold-accent mb-2"
                    >
                      Royal Attendance
                    </label>
                    <select
                      id="attendance"
                      value={rsvpState.attendance}
                      onChange={(e) =>
                        setRsvpState({ ...rsvpState, attendance: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-obsidian/80 border border-gold-primary/40 focus:border-gold-primary text-parchment font-cormorant text-lg focus:outline-none"
                    >
                      <option value="attending">Joyfully Attending</option>
                      <option value="regretfully-declining">Sending Warm Blessings Only</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="guestsCount"
                      className="block font-montserrat text-[10px] uppercase tracking-[0.25em] text-gold-accent mb-2"
                    >
                      Number of Guests
                    </label>
                    <select
                      id="guestsCount"
                      value={rsvpState.guestsCount}
                      onChange={(e) =>
                        setRsvpState({ ...rsvpState, guestsCount: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-obsidian/80 border border-gold-primary/40 focus:border-gold-primary text-parchment font-cormorant text-lg focus:outline-none"
                    >
                      <option value="1">1 Honored Guest</option>
                      <option value="2">2 Honored Guests</option>
                      <option value="3">3 Honored Guests</option>
                      <option value="4">Royal Family Suite (4)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="blessing"
                    className="block font-montserrat text-[10px] uppercase tracking-[0.25em] text-gold-accent mb-2"
                  >
                    Inscribe a Dua or Blessing for the Couple
                  </label>
                  <textarea
                    id="blessing"
                    rows={3}
                    placeholder="May Allah bless your union and join you in goodness..."
                    value={rsvpState.blessing}
                    onChange={(e) =>
                      setRsvpState({ ...rsvpState, blessing: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-obsidian/80 border border-gold-primary/40 focus:border-gold-primary text-parchment placeholder-parchment/35 font-cormorant text-lg focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#9E7423] via-gold-primary to-[#E8C868] text-obsidian font-montserrat font-semibold text-xs uppercase tracking-[0.28em] shadow-gold-glow hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Seal &amp; Dispatch Royal RSVP</span>
                </button>
              </form>
            )}
          </div>
        </section>

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

