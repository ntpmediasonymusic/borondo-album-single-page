import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionLabel";

const PLAYLIST_URL =
  "https://www.youtube.com/playlist?list=PL-WV71xWJQL_qAMtlN04781454eQNuhrE";

interface DictEntry {
  id: number;
  word: string;
  phonetic: string;
  type: string;
  definition: string;
  example: string;
  url: string;
}

const DICTIONARY: DictEntry[] = [
  {
    id: 1,
    word: "Chimba",
    phonetic: "/chim · ba/",
    type: "adj · sust",
    definition:
      "Algo extraordinario, de primera calidad. Lo mejor en su forma más pura.",
    example: '"Ese track está muy chimba, parce."',
    url: `${PLAYLIST_URL}&index=1`,
  },
  {
    id: 2,
    word: "Parce",
    phonetic: "/par · ce/",
    type: "sust",
    definition:
      "Tu gente. Tu círculo. El que estuvo antes del brillo y seguirá después.",
    example: '"Ese es mi parce de toda la vida."',
    url: `${PLAYLIST_URL}&index=2`,
  },
  {
    id: 3,
    word: "Llave",
    phonetic: "/lla · ve/",
    type: "sust",
    definition:
      "Más que un amigo. Tu mano derecha. El que tiene la combinación para abrirte.",
    example: '"Él es mi llave, confío en él ciegamente."',
    url: `${PLAYLIST_URL}&index=3`,
  },
  {
    id: 4,
    word: "Gonorrea",
    phonetic: "/go · no · rre · a/",
    type: "sust · adj",
    definition:
      "En boca de un parce es el mayor elogio. El contexto lo convierte en cariño.",
    example: '"Eres una gonorrea, llave, te quiero mucho."',
    url: `${PLAYLIST_URL}&index=4`,
  },
  {
    id: 5,
    word: "Camello",
    phonetic: "/ca · me · llo/",
    type: "sust",
    definition:
      "El trabajo duro, la grind diaria. Lo que te da de comer y te sostiene.",
    example: '"Hay que meterle al camello para llegar lejos."',
    url: `${PLAYLIST_URL}&index=5`,
  },
  {
    id: 6,
    word: "Mane",
    phonetic: "/ma · ne/",
    type: "sust",
    definition:
      "Una persona. La forma más neutra y directa de nombrar al otro.",
    example: '"Ese mane no para de hablar."',
    url: `${PLAYLIST_URL}&index=6`,
  },
  {
    id: 7,
    word: "Sapear",
    phonetic: "/sa · pe · ar/",
    type: "verbo",
    definition:
      "Observar, espiar. Estar pendiente de lo que no te corresponde.",
    example: '"Deja de sapear lo que hago."',
    url: `${PLAYLIST_URL}&index=7`,
  },
  {
    id: 8,
    word: "Bacano",
    phonetic: "/ba · ca · no/",
    type: "adj",
    definition:
      "Chévere, genuino, de buen corazón. Una persona o momento que vale la pena.",
    example: '"Qué bacano que pudiste venir, hermano."',
    url: `${PLAYLIST_URL}&index=8`,
  },
  {
    id: 9,
    word: "Borondo",
    phonetic: "/bo · ron · do/",
    type: "sust · adj",
    definition:
      "El movimiento constante. Vivir en la calle, siempre en el mundo, sin parar.",
    example: '"Toda la vida en el borondo, eso somos."',
    url: `${PLAYLIST_URL}&index=9`,
  },
  {
    id: 10,
    word: "Sobelove",
    phonetic: "/so · be · lo · ve/",
    type: "sust",
    definition:
      "Del barrio para el mundo. La identidad que no cambia sin importar el tamaño.",
    example: '"Sobelove: orgullo de donde vengo."',
    url: `${PLAYLIST_URL}&index=10`,
  },
];

// ─── Entry card ─────────────────────────────────────────────────────────────
interface EntryCardProps {
  entry: DictEntry;
  isSelected: boolean;
}

function EntryCard({ entry, isSelected }: EntryCardProps) {
  const num = String(entry.id).padStart(2, "0");

  return (
    <div
      className={`flex-none w-[80vw] sm:w-[300px] lg:w-[330px] mr-3 lg:mr-5 transition-opacity duration-400 ${
        isSelected ? "opacity-100" : "opacity-35"
      }`}
    >
      <div className="border border-white/10 bg-white/[0.04] relative overflow-hidden group">
        {/* Ghost letter background */}
        <div
          className="absolute top-0 right-0 select-none pointer-events-none leading-none"
          aria-hidden="true"
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 900,
            fontSize: "9rem",
            lineHeight: 0.85,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.05)",
            letterSpacing: "-0.02em",
            transform: "translateX(10%)",
          }}
        >
          {entry.word[0].toUpperCase()}
        </div>

        <div className="p-6 relative z-10">
          {/* Entry number */}
          <div className="flex items-center justify-between mb-5">
            <span
              className="text-white/15"
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 900,
                fontSize: "1.75rem",
                lineHeight: 1,
                letterSpacing: "0.04em",
              }}
            >
              {num}
            </span>
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/65 hover:text-white/90 transition-colors"
              aria-label={`Ver "${entry.word}" en YouTube`}
            >
              <span
                className="text-base tracking-[0.15em] uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
              >
                YT
              </span>
              <ArrowUpRight size={11} />
            </a>
          </div>

          {/* Word */}
          <h3
            className="text-white leading-none mb-1"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.6rem, 3.5vw, 2rem)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {entry.word}
          </h3>

          {/* Phonetic + type */}
          <div className="flex items-center gap-3 mt-1.5 mb-5">
            <span
              className="text-white/65 text-base tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontStyle: "italic" }}
            >
              {entry.phonetic}
            </span>
            <span className="text-white/25 text-base">·</span>
            <span
              className="text-white/65 text-base tracking-[0.15em] uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
            >
              {entry.type}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/8 mb-5" />

          {/* Definition */}
          <p
            className="text-white/75 mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            {entry.definition}
          </p>

          {/* Example */}
          <blockquote
            className="text-white/65 border-l border-white/15 pl-3"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontStyle: "italic",
              fontSize: "1rem",
              lineHeight: 1.6,
            }}
          >
            {entry.example}
          </blockquote>
        </div>
      </div>
    </div>
  );
}

// ─── Section ────────────────────────────────────────────────────────────────
export function DiccionarioBeele() {
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
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section
      id="diccionario"
      className="bg-black py-12 lg:py-20 overflow-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-6">
        <SectionHeader label="Diccionario Beéle" title="El idioma de Beéle" light />
        <p
          className="text-white/65 text-base"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {DICTIONARY.length} palabras · Desliza para explorar
        </p>
      </div>

      {/* Progress bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-5">
        <div className="h-px bg-white/8 relative">
          <div
            className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
            style={{ width: `${((selectedIndex + 1) / DICTIONARY.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Embla carousel */}
      <div className="pl-6 lg:pl-10">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex items-start">
            {DICTIONARY.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                isSelected={selectedIndex === entry.id - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 mt-7 flex items-center justify-center">
        {/* Playlist link — left */}
        <a
          href={PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-6 lg:left-10 flex items-center gap-1.5 text-white/65 hover:text-white transition-colors text-base tracking-widest uppercase"
          style={{ fontWeight: 500 }}
        >
          Ver playlist
          <ArrowUpRight size={9} />
        </a>

        {/* Centered: arrows + counter */}
        <div className="flex items-center gap-5">
          <button
            onClick={scrollPrev}
            className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all text-white"
            aria-label="Entrada anterior"
          >
            <ArrowLeft size={13} />
          </button>

          <div className="flex items-center gap-1.5 min-w-[4rem] justify-center">
            <span
              className="text-white tabular-nums"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.08em" }}
            >
              {String(selectedIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-white/20 text-xs">/</span>
            <span
              className="text-white/35 tabular-nums"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.08em" }}
            >
              {String(DICTIONARY.length).padStart(2, "0")}
            </span>
          </div>

          <button
            onClick={scrollNext}
            className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all text-white"
            aria-label="Siguiente entrada"
          >
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}