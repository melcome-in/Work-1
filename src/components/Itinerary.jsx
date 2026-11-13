import React, { useState } from 'react';
import { CalendarPlus, MapPin, Clock, Check, Sparkles } from 'lucide-react';

const ITINERARY_EVENTS = [
  {
    id: 'marriage-ceremony',
    arabicTitle: 'حَفْلُ عَقْدِ القِرَانِ وَالزِّفَاف',
    title: 'Marriage Ceremony & Reception',
    timeLabel: '12:00am to 2:30pm (Printed as 12:00am in the card)',
    dtStart: '20261213T063000Z',
    dtEnd: '20261213T090000Z',
    venueName: 'HITECH REGENCY',
    venueAddress: 'Kozhikkara, Eravakkad P.O., Kerala',
    mapsUrl: 'https://maps.google.com/?q=Hitech+Regency+Convention+Centre+Kozhikkara',
    description:
      'On the auspicious occasion of the marriage of Mohammed Shaheer with Fathima Nidha (D/o Mr. C K Sulaiman & Mrs. Safeena Sulaiman). Your presence will make our joy more complete.',
  },
  {
    id: 'family-blessings',
    arabicTitle: 'تَهَانِي العَائِلَةِ وَدَعَوَاتُ الخَيْر',
    title: 'Family Cordial Welcome & Feast',
    timeLabel: 'Sunday, 13 December 2026 [1448 Rajab 03]',
    dtStart: '20261213T063000Z',
    dtEnd: '20261213T090000Z',
    venueName: 'Hosted by Mr. Mohammed & Mrs. Shamla Mohammed',
    venueAddress: 'Pathil House, Kollannoor, Eravakkad P.O. • Ph: 97457 70675',
    mapsUrl: 'https://maps.google.com/?q=Hitech+Regency+Convention+Centre+Kozhikkara',
    description:
      'With love and best wishes from Zidan, Haiza, Sheikha & Pathil Family. We cordially invite your esteemed presence with family.',
  },
];

const downloadICSFile = (event) => {
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Shaheer & Nidha Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}-20261213@shaheerandnidha.wedding`,
    'DTSTAMP:20261113T093000Z',
    `DTSTART:${event.dtStart}`,
    `DTEND:${event.dtEnd}`,
    `SUMMARY:Shaheer & Nidha Wedding — ${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.venueName}, ${event.venueAddress}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([icsLines.join('\r\n')], {
    type: 'text/calendar;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `shaheer-nidha-${event.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const Itinerary = () => {
  const [downloadedId, setDownloadedId] = useState(null);

  const handleAddCalendar = (event) => {
    downloadICSFile(event);
    setDownloadedId(event.id);
    setTimeout(() => {
      setDownloadedId((prev) => (prev === event.id ? null : prev));
    }, 3000);
  };

  return (
    <section className="relative py-20 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <p className="font-montserrat text-[11px] uppercase tracking-[0.35em] text-gold-accent mb-2">
          Ceremony &amp; Reception
        </p>
        <h3 className="font-cinzel text-2xl sm:text-4xl text-gold-foil mb-3">
          Wedding Itinerary &amp; Venue
        </h3>
        <p className="font-cormorant italic text-lg text-parchment/75 max-w-xl mx-auto">
          Gathering in love and gratitude on Sunday, 13 December 2026 [1448 Rajab 03]
        </p>
      </div>

      {/* Illuminated Vertical Timeline Container */}
      <div className="relative">
        {/* Glowing Vertical Gold Filigree Spine */}
        <div
          aria-hidden="true"
          className="absolute left-5 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-gold-primary to-transparent shadow-[0_0_15px_rgba(212,175,55,0.65)]"
        />

        <div className="space-y-12 sm:space-y-16">
          {ITINERARY_EVENTS.map((event, index) => {
            const isEven = index % 2 === 0;
            const isDownloaded = downloadedId === event.id;

            return (
              <div
                key={event.id}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Illuminated Timeline Node Medallion */}
                <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 top-6 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-obsidian border-2 border-gold-primary shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                  <span className="font-cinzel text-xs font-bold text-gold-accent">
                    0{index + 1}
                  </span>
                </div>

                {/* Half-width Spacer on Desktop */}
                <div className="hidden sm:block sm:w-1/2" />

                {/* Event Card */}
                <div
                  className={`w-full pl-14 sm:pl-0 sm:w-1/2 ${
                    isEven ? 'sm:pr-10' : 'sm:pl-10'
                  }`}
                >
                  <div className="group relative rounded-2xl bg-gradient-to-b from-[#082018]/95 via-emerald-royal/95 to-obsidian/95 p-6 sm:p-8 border border-gold-primary/50 hover:border-gold-primary shadow-gold-glow transition-all duration-500">
                    {/* Inner Gold Filigree Frame */}
                    <div className="pointer-events-none absolute inset-2.5 rounded-xl border border-gold-primary/20" />

                    {/* Corner Filigree Accents */}
                    <span className="absolute top-3.5 left-4 text-gold-primary/60 text-xs">
                      ✦
                    </span>
                    <span className="absolute top-3.5 right-4 text-gold-primary/60 text-xs">
                      ✦
                    </span>

                    {/* Arabic Calligraphic Subtitle */}
                    <p className="font-amiri text-xl text-gold-accent mb-1">
                      {event.arabicTitle}
                    </p>

                    {/* English Majestic Event Title */}
                    <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-parchment mb-3">
                      {event.title}
                    </h4>

                    {/* Time Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-primary/15 border border-gold-primary/35 text-gold-accent font-montserrat text-[10px] uppercase tracking-[0.2em] mb-4">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{event.timeLabel}</span>
                    </div>

                    {/* Editorial Description */}
                    <p className="font-cormorant text-base sm:text-lg text-parchment/85 leading-relaxed mb-5">
                      {event.description}
                    </p>

                    {/* Venue Name & Address */}
                    <div className="pt-4 border-t border-gold-primary/25 mb-5">
                      <p className="font-cinzel text-sm text-gold-accent">
                        {event.venueName}
                      </p>
                      <p className="font-montserrat text-[11px] text-parchment/65 mt-0.5">
                        {event.venueAddress}
                      </p>
                    </div>

                    {/* Action Buttons: Venue Maps Link & Add to Calendar (.ics) */}
                    <div className="relative z-10 flex flex-wrap items-center gap-3">
                      <a
                        href={event.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-primary/45 hover:border-gold-primary bg-obsidian/60 hover:bg-gold-primary/15 text-parchment font-montserrat text-[10px] uppercase tracking-[0.2em] transition-all duration-300"
                      >
                        <MapPin className="w-3.5 h-3.5 text-gold-primary" />
                        <span>Venue Map</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleAddCalendar(event)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#AA771C] via-gold-primary to-[#D4AF37] text-obsidian font-montserrat font-semibold text-[10px] uppercase tracking-[0.2em] shadow-md hover:brightness-110 transition-all duration-300"
                      >
                        {isDownloaded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Saved (.ICS)</span>
                          </>
                        ) : (
                          <>
                            <CalendarPlus className="w-3.5 h-3.5" />
                            <span>Add to Calendar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Itinerary;

