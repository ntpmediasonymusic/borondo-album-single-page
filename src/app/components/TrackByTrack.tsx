import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionLabel";

import artistPortrait from "../../imports/image-1.png";
import artistWalking from "../../imports/download-2.jpg";
import artistDark from "../../imports/download-1.jpg";
import albumCover from "../../imports/image.png";

// ─── Real Borondo track listing ────────────────────────────────────────────
const PLAYLIST_BASE =
  "https://www.youtube.com/playlist?list=PL-WV71xWJQL8YndZbY4j-JpoAg79xOvnI";

interface Track {
  id: number;
  title: string;
  ft?: string;
  bonus?: boolean;
  note: string;
  image: string;
}

const IMAGES = [artistDark, artistPortrait, artistWalking, albumCover];

function getImage(id: number, title: string): string {
  if (title === "borondo") return albumCover;
  return IMAGES[(id - 1) % 3];
}

const TRACKS: Track[] = [
  { id: 1, title: "anhélame", note: "Lo más real que le dije a alguien sin usar ninguna palabra.", image: getImage(1, "anhélame") },
  { id: 2, title: "que te vaya bien", note: "El adiós que no suena como adiós.", image: getImage(2, "que te vaya bien") },
  { id: 3, title: "mad koknut", note: "Cuando el ritmo manda y el cerebro descansa.", image: getImage(3, "mad koknut") },
  { id: 4, title: "una vez al mes", note: "Ese momento que todos vivimos y nadie nombra.", image: getImage(4, "una vez al mes") },
  { id: 5, title: "si mañana me muero", ft: "Thisizlondon", note: "¿Qué le dirías hoy si no hubiera un mañana?", image: getImage(5, "si mañana me muero") },
  { id: 6, title: "no tiene sentido", note: "A veces la respuesta también es una pregunta.", image: getImage(6, "no tiene sentido") },
  { id: 7, title: "arena", ft: "Carla Morrison", note: "Ella y yo en el mismo idioma, sin necesitar el mismo acento.", image: getImage(7, "arena") },
  { id: 8, title: "quédate", note: "Simple. Directo. Lo que siempre quise decir.", image: getImage(8, "quédate") },
  { id: 9, title: "top diesel", note: "El ritmo primero. Las palabras llegan solas.", image: getImage(9, "top diesel") },
  { id: 10, title: "mi refe", note: "Para los que me conocen de antes de todo esto.", image: getImage(10, "mi refe") },
  { id: 11, title: "Dios me oyó", ft: "Marc Anthony", note: "Cuando lo que pides llega sin avisar.", image: getImage(11, "Dios me oyó") },
  { id: 12, title: "frente al mar", note: "Ahí todo se ve diferente. Todo pesa menos.", image: getImage(12, "frente al mar") },
  { id: 13, title: "si te pillara", note: "Lo que haría si el tiempo tuviera reversa.", image: getImage(13, "si te pillara") },
  { id: 14, title: "i miss you", note: "Sin traducción. Se entiende de todas formas.", image: getImage(14, "i miss you") },
  { id: 15, title: "hotel east", note: "Entre una ciudad y la otra. Entre un yo y el otro.", image: getImage(15, "hotel east") },
  { id: 16, title: "una curita por favor", note: "Remedio pequeño. Dolor real.", image: getImage(16, "una curita por favor") },
  { id: 17, title: "borondo", note: "El nombre de donde vengo. El nombre de lo que soy.", image: albumCover },
  { id: 18, title: "sobelove", note: "Del barrio para el mundo, sin perder el acento.", image: getImage(18, "sobelove") },
  { id: 19, title: "en la mía", note: "Lo mío es lo mío y eso no cambia.", image: getImage(19, "en la mía") },
  { id: 20, title: "estrella fugaz", note: "Pides y esperas. A veces llega.", image: getImage(20, "estrella fugaz") },
  { id: 21, title: "bye", note: "Corto. Necesario. Ya.", image: getImage(21, "bye") },
  { id: 22, title: "ya q", note: "Ya que llegamos hasta acá, aquí estamos.", image: getImage(22, "ya q") },
  { id: 23, title: "time and space", note: "Las dos cosas que nunca sobran.", image: getImage(23, "time and space") },
  { id: 24, title: "algo bueno", note: "Al final, siempre hay algo bueno que quedó.", image: getImage(24, "algo bueno") },
  { id: 25, title: "morena", bonus: true, note: "Bonus. Para ella. Siempre para ella.", image: getImage(25, "morena") },
  { id: 26, title: "hasta aquí llegué", bonus: true, note: "Bonus. El punto final que abre todo lo que sigue.", image: getImage(26, "hasta aquí llegué") },
];

// ─── Platform SVG Icons ────────────────────────────────────────────────────

function SpotifyIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function AppleMusicIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208A4.86 4.86 0 00.18 4.81c-.015.306-.02.61-.024.917 0 .137-.007.274-.007.412v12.334c.003.23.01.456.02.68a9.756 9.756 0 00.269 2.084c.345 1.383 1.13 2.415 2.278 3.156a5.927 5.927 0 002.09.694c.422.058.85.085 1.28.095.114.002.23.009.343.009H18.66c.15 0 .302-.006.453-.012.503-.015 1.003-.047 1.496-.14a6.325 6.325 0 002.106-.718c1.275-.748 2.083-1.82 2.356-3.325.073-.403.106-.81.12-1.218.005-.163.013-.327.013-.492V6.83a7.09 7.09 0 00-.21-.706zm-8.453 5.73v3.894a2.278 2.278 0 01-.412 1.34 2.28 2.28 0 01-1.178.834 2.838 2.838 0 01-2.824-.64 2.24 2.24 0 01-.564-1.558 2.265 2.265 0 01.774-1.718c.38-.333.882-.556 1.444-.645a5.23 5.23 0 011.06-.04V9.193l-4.658 1.367v4.955a2.278 2.278 0 01-.412 1.34 2.28 2.28 0 01-1.178.834 2.838 2.838 0 01-2.824-.64 2.24 2.24 0 01-.564-1.558 2.265 2.265 0 01.774-1.718c.38-.333.882-.556 1.444-.645a5.23 5.23 0 011.06-.04V7.9a.554.554 0 01.392-.53l6.22-1.818a.55.55 0 01.706.527v5.755z" />
    </svg>
  );
}

function YoutubeMusicIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 2.182c5.424 0 9.818 4.394 9.818 9.818 0 5.424-4.394 9.818-9.818 9.818-5.424 0-9.818-4.394-9.818-9.818 0-5.424 4.394-9.818 9.818-9.818zm-2.182 4.91v9.816l7.636-4.908-7.636-4.908z" />
    </svg>
  );
}

function DeezerIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.878 9.47h3.063v1.31h-3.063V9.47zm-4.91 0h3.063v1.31h-3.063V9.47zm-4.91 0h3.063v1.31H8.058V9.47zm-4.91 0h3.063v1.31H3.148V9.47zm14.73 2.62h3.063v1.31h-3.063v-1.31zm-4.91 0h3.063v1.31h-3.063v-1.31zm-4.91 0h3.063v1.31H8.058v-1.31zm14.73 2.62h3.063v1.31h-3.063v-1.31zm-4.91 0h3.063v1.31h-3.063v-1.31zm-4.91 0h3.063v1.31h-3.063v-1.31zm-4.91 0h3.063v1.31H8.058v-1.31zm14.73 2.62h3.063v1.31h-3.063v-1.31zm-4.91 0h3.063v1.31h-3.063v-1.31zm-4.91 0h3.063v1.31h-3.063v-1.31zm-4.91 0h3.063v1.31H8.058v-1.31z" />
    </svg>
  );
}

// ─── Track Slide ──────────────────────────────────────────────────────────
interface TrackSlideProps {
  track: Track;
  isSelected: boolean;
}

function TrackSlide({ track, isSelected }: TrackSlideProps) {
  const num = String(track.id).padStart(2, "0");
  const trackQuery = encodeURIComponent(`beele ${track.title}`);

  const youtubeUrl = `${PLAYLIST_BASE}&index=${track.id}`;
  const spotifyUrl = `https://open.spotify.com/search/${trackQuery}`;
  const appleMusicUrl = `https://music.apple.com/search?term=${trackQuery}`;
  const youtubeMusicUrl = `https://music.youtube.com/search?q=${trackQuery}`;
  const deezerUrl = `https://www.deezer.com/search/${trackQuery}`;

  return (
    <div
      className={`flex-none w-[72vw] sm:w-[290px] lg:w-[320px] mr-3 lg:mr-5 transition-opacity duration-400 ${
        isSelected ? "opacity-100" : "opacity-40"
      }`}
    >
      <div className="border border-black/10 bg-white group">
        {/* Image — reduced to square aspect */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
          <img
            src={track.image}
            alt={track.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
          />

          {/* Track number — ghost overlay */}
          <div
            className="absolute bottom-0 right-0 pointer-events-none select-none p-1"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "4rem",
              fontWeight: 900,
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.22)",
              letterSpacing: "0.04em",
            }}
            aria-hidden="true"
          >
            {num}
          </div>

          {/* Hover overlay: ver video */}
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center"
            aria-label={`Ver video de ${track.title}`}
          >
            <span
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 border border-white text-white text-base tracking-widest uppercase px-4 py-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
            >
              Ver Video
            </span>
          </a>
        </div>

        {/* Info block — compact */}
        <div className="p-4">
          {/* Number + bonus tag */}
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-black/15"
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "2rem",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "0.04em",
              }}
            >
              {num}
            </span>
            {track.bonus && (
              <span
                className="text-[#3d3d3d] text-base tracking-[0.2em] uppercase border border-black/20 px-2 py-0.5"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
              >
                Bonus
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-black leading-none mb-1"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {track.title}
          </h3>

          {/* Feature */}
          {track.ft && (
            <p
              className="text-[#3d3d3d] text-base tracking-[0.15em] uppercase mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
            >
              ft. {track.ft}
            </p>
          )}

          {/* Divider */}
          <div className="h-px bg-black/8 my-3" />

          {/* Artist note */}
          <blockquote
            className="text-[#3d3d3d]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontStyle: "italic",
              fontSize: "1rem",
              lineHeight: 1.65,
            }}
          >
            "{track.note}"
          </blockquote>

          {/* Platform links */}
          <div className="mt-3">
            <div className="h-px bg-black/8 mb-3" />
            <div className="flex items-center justify-between">
              <span
                className="text-base tracking-[0.2em] uppercase text-[#3d3d3d]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
              >
                Escuchar
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3d3d3d] hover:text-black transition-colors"
                  aria-label="Escuchar en Spotify"
                >
                  <SpotifyIcon size={16} />
                </a>
                <a
                  href={appleMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3d3d3d] hover:text-black transition-colors"
                  aria-label="Escuchar en Apple Music"
                >
                  <AppleMusicIcon size={16} />
                </a>
                <a
                  href={youtubeMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3d3d3d] hover:text-black transition-colors"
                  aria-label="Escuchar en YouTube Music"
                >
                  <YoutubeMusicIcon size={16} />
                </a>
                <a
                  href={deezerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3d3d3d] hover:text-black transition-colors"
                  aria-label="Escuchar en Deezer"
                >
                  <DeezerIcon size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────
export function TrackByTrack() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      id="tracks"
      className="bg-white py-12 lg:py-20 overflow-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-6">
        <SectionHeader label="Track by Track" title="Explora el álbum" />
        <p
          className="text-[#3d3d3d] text-base"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {TRACKS.length} canciones · Desliza para explorar
        </p>
      </div>

      {/* Progress bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-5">
        <div className="h-px bg-black/8 relative">
          <div
            className="absolute top-0 left-0 h-full bg-black transition-all duration-300"
            style={{ width: `${((selectedIndex + 1) / TRACKS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Embla carousel — full width with padding start */}
      <div className="pl-6 lg:pl-10">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex items-start">
            {TRACKS.map((track) => (
              <TrackSlide
                key={track.id}
                track={track}
                isSelected={selectedIndex === track.id - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom navigation — pagination centered, playlist link left */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 mt-7 flex items-center justify-center">
        {/* Playlist link — absolute left */}
        <a
          href={PLAYLIST_BASE}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-6 lg:left-10 flex items-center gap-1.5 text-[#3d3d3d] hover:text-black transition-colors text-base tracking-widest uppercase"
          style={{ fontWeight: 500 }}
        >
          Ver playlist
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>

        {/* Centered: arrows + counter */}
        <div className="flex items-center gap-5">
          <button
            onClick={scrollPrev}
            className="w-9 h-9 border border-black/20 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all"
            aria-label="Canción anterior"
          >
            <ArrowLeft size={13} />
          </button>

          {/* Counter */}
          <div className="flex items-center gap-1.5 min-w-[4rem] justify-center">
            <span
              className="text-black tabular-nums"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.08em" }}
            >
              {String(selectedIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-black/20 text-xs">/</span>
            <span
              className="text-black/30 tabular-nums"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.08em" }}
            >
              {String(TRACKS.length).padStart(2, "0")}
            </span>
          </div>

          <button
            onClick={scrollNext}
            className="w-9 h-9 border border-black/20 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all"
            aria-label="Siguiente canción"
          >
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}