import { useState, useEffect, useCallback, useRef } from "react";
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
    word: "Bomboclat",
    phonetic: "/bom · bo · clat/",
    type: "intj",
    definition:
      "Interjección de origen caribeño/jamaicano usada para expresar sorpresa, incredulidad, dolor, rabia o una emoción muy intensa. Según el contexto puede sentirse como un grito de impacto, una reacción visceral o una forma explosiva de decir que algo pegó fuerte. En el lenguaje del álbum, funciona bien para momentos donde el amor sorprende, hiere o desordena todo de golpe.",
    example:
      '"Bomboclat, yo pensé que ya te había olvidado y bastó una canción para volver a caer."',
    url: "https://www.youtube.com/watch?v=5fvrGm2r48M&list=PL-WV71xWJQL_qAMtlN04781454eQNuhrE&index=4",
  },
  {
    id: 2,
    word: "Borondo",
    phonetic: "/bo · ron · do/",
    type: "sust · expr",
    definition:
      "Una vuelta, paseo o caminata sin un rumbo demasiado definido. Es salir a moverse, perderse un rato, dejar que el camino lleve y que algo pase. En el universo del álbum, también puede leerse como un recorrido emocional: ir de una canción a otra atravesando deseo, nostalgia, fiesta, arrepentimiento y recuerdos frente al mar.",
    example:
      '"Nos dimos un borondo por la orilla y terminamos hablando de todo lo que nunca cerramos."',
    url: "https://www.youtube.com/watch?v=XUmNBGDX2q4&list=PL-WV71xWJQL_qAMtlN04781454eQNuhrE&index=1",
  },
  {
    id: 3,
    word: "Coleto",
    phonetic: "/co · le · to/",
    type: "adj · sust",
    definition:
      "Persona descomplicada, callejera o fuera del molde; alguien que se mueve con actitud propia y no se preocupa demasiado por verse correcto. En el Caribe colombiano también puede conectar con una estética popular, rumbera y de barrio: picó, champeta, calle, calor y mucha personalidad. En clave Beéle, es ese estado de andar despeinado por la vida, por la fiesta o por un amor que dejó marca.",
    example:
      '"Ando coleto desde que te vi bailando, con el corazón en la mano y la mente en otra parte."',
    url: "https://www.youtube.com/watch?v=ijj0soBCYxA&list=PL-WV71xWJQL_qAMtlN04781454eQNuhrE&index=3",
  },
  {
    id: 4,
    word: "La Plena",
    phonetic: "/la · ple · na/",
    type: "sust · loc",
    definition:
      "La verdad dicha de frente, sin rodeos ni adornos. Decir \"la plena\" es hablar claro, aceptar lo que realmente se siente y no esconder la emoción detrás del orgullo. En contexto romántico, funciona como una confesión: admitir que alguien todavía duele, que todavía importa o que una historia no se olvida tan fácil.",
    example:
      '"La plena es que desde que te fuiste, ninguna noche me sabe igual."',
    url: "https://www.youtube.com/watch?v=0xoFaiQLB1U&list=PL-WV71xWJQL_qAMtlN04781454eQNuhrE&index=2",
  },
  {
    id: 5,
    word: "Visaje",
    phonetic: "/vi · sa · je/",
    type: "sust · adj",
    definition:
      "Algo o alguien que se hace notar demasiado; una actitud llamativa, intensa o evidente. También puede usarse para hablar de una situación que genera exposición, ruido o atención innecesaria. En contexto amoroso, \"visaje\" puede ser ese gesto que delata lo que uno siente: mirar de más, escribir de madrugada, ponerse raro o no poder disimular que todavía hay algo.",
    example:
      '"No hagas visaje, que se te nota en la cara que todavía me extrañas."',
    url: "https://www.youtube.com/watch?v=IVbadHpdNnY&list=PL-WV71xWJQL_qAMtlN04781454eQNuhrE&index=5",
  },
];

function YoutubeMusicIcon({ size = 13 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
    </svg>
  );
}

// ─── Entry card ─────────────────────────────────────────────────────────────
interface EntryCardProps {
  entry: DictEntry;
  isSelected: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onSelect: () => void;
}

function EntryCard({ entry, isSelected, isExpanded, onToggleExpand, onSelect }: EntryCardProps) {
  const num = String(entry.id).padStart(2, "0");
  const definitionRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    if (isExpanded) return;
    const el = definitionRef.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight);
  }, [isExpanded]);

  const handleClick = (e: React.MouseEvent) => {
    if (isSelected) return;
    if ((e.target as HTMLElement).closest("a, button")) return;
    onSelect();
  };

  return (
    <div
      onClick={handleClick}
      className={`flex-none w-[80vw] sm:w-[300px] lg:w-[330px] mr-3 lg:mr-5 transition-opacity duration-[400ms] select-none ${
        isSelected ? "opacity-100" : "opacity-35 cursor-pointer"
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
          {/* Entry number + YT link */}
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
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-white/65 hover:text-white/90 transition-colors"
              aria-label={`Ver "${entry.word}" en YouTube`}
            >
              <span
                className="text-base tracking-[0.15em] uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
              >
                <YoutubeMusicIcon size={24} />
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
            ref={definitionRef}
            className={`text-white/75 mb-4${!isExpanded ? " line-clamp-4" : ""}`}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            {entry.definition}
          </p>

          {isClamped && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onToggleExpand(); }}
              className="mb-4 text-sm text-white/40 hover:text-white/70 transition-colors tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
            >
              {isExpanded ? "Ver menos" : "Ver más"}
            </button>
          )}

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
    loop: false,
    align: "start",
    dragFree: false,
    containScroll: "keepSnaps",
    watchResize: false,
    watchDrag: (_, evt) => {
      const target = (evt as Event).target as HTMLElement | null;
      return !target?.closest("button, a");
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedEntryId, setExpandedEntryId] = useState<number | null>(null);
  const selectedIndexRef = useRef(0);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    const current = emblaApi.selectedScrollSnap();
    emblaApi.scrollTo(current === 0 ? DICTIONARY.length - 1 : current - 1);
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    const current = emblaApi.selectedScrollSnap();
    emblaApi.scrollTo(current === DICTIONARY.length - 1 ? 0 : current + 1);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const snap = emblaApi.selectedScrollSnap();
      setSelectedIndex(snap);
      selectedIndexRef.current = snap;
      setExpandedEntryId(null);
    };

    const onReInit = () => {
      emblaApi.scrollTo(selectedIndexRef.current, true);
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReInit);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    let timer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => emblaApi.reInit(), 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
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
                isExpanded={expandedEntryId === entry.id}
                onToggleExpand={() =>
                  setExpandedEntryId((prev) => (prev === entry.id ? null : entry.id))
                }
                onSelect={() => emblaApi?.scrollTo(entry.id - 1)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-7 flex flex-col items-center gap-4 md:relative md:flex-row md:justify-center">
        {/* Centered: arrows + counter */}
        <div className="flex items-center gap-5">
          <button
            type="button"
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
            type="button"
            onClick={scrollNext}
            className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all text-white"
            aria-label="Siguiente entrada"
          >
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Playlist link */}
        <a
          href={PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="md:absolute md:left-6 lg:left-10 flex items-center gap-1.5 text-white/65 hover:text-white transition-colors text-base tracking-widest uppercase"
          style={{ fontWeight: 500 }}
        >
          Ver playlist
          <ArrowUpRight size={9} />
        </a>
      </div>
    </section>
  );
}
