import { Download } from "lucide-react";
import { SectionHeader } from "./SectionLabel";
import albumCover from "../../imports/Beele-borondo-album-cover.jpg";
import gatefold from "../../imports/GATEFOLD_01.jpg";

interface StickerProps {
  shape: "circle" | "rounded" | "diamond" | "tag";
  label: string;
  sub?: string;
  rotate?: number;
  inverted?: boolean;
}

function Sticker({ shape, label, sub, rotate = 0, inverted = false }: StickerProps) {
  const base =
    "relative flex flex-col items-center justify-center select-none cursor-default transition-transform duration-300 hover:scale-105";

  const bg = inverted ? "bg-white" : "bg-black";
  const fg = inverted ? "text-black" : "text-white";
  const border = inverted ? "border-2 border-black" : "";

  const labelStyle = {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 800,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    lineHeight: 1.1,
  };
  const subStyle = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "0.45rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
  };

  if (shape === "circle") {
    return (
      <div
        className={`${base} ${bg} ${border} rounded-full`}
        style={{ width: 108, height: 108, transform: `rotate(${rotate}deg)` }}
      >
        <span className={`${fg} text-center px-3`} style={{ ...labelStyle, fontSize: "0.9rem" }}>
          {label}
        </span>
        {sub && (
          <span className={`${fg} opacity-50 text-center mt-1`} style={subStyle}>
            {sub}
          </span>
        )}
      </div>
    );
  }

  if (shape === "rounded") {
    return (
      <div
        className={`${base} ${bg} ${border} px-5 py-4`}
        style={{ borderRadius: 10, transform: `rotate(${rotate}deg)`, minWidth: 96 }}
      >
        <span className={`${fg} text-center`} style={{ ...labelStyle, fontSize: "1rem" }}>
          {label}
        </span>
        {sub && (
          <span className={`${fg} opacity-50 text-center mt-1`} style={subStyle}>
            {sub}
          </span>
        )}
      </div>
    );
  }

  if (shape === "diamond") {
    return (
      <div className="relative flex items-center justify-center" style={{ width: 104, height: 104 }}>
        <div
          className={`absolute inset-0 ${bg} ${border}`}
          style={{ transform: `rotate(45deg) scale(0.7)`, borderRadius: 4 }}
        />
        <span className={`relative z-10 ${fg}`} style={{ ...labelStyle, fontSize: "1rem" }}>
          {label}
        </span>
      </div>
    );
  }

  // tag
  return (
    <div
      className={`${base} ${bg} ${border} px-6 py-3 relative`}
      style={{ transform: `rotate(${rotate}deg)`, minWidth: 104, borderRadius: "18px 18px 18px 0px" }}
    >
      <span className={`${fg}`} style={{ ...labelStyle, fontSize: "0.9rem" }}>
        {label}
      </span>
      {sub && (
        <span className={`${fg} opacity-50 mt-1`} style={subStyle}>
          {sub}
        </span>
      )}
    </div>
  );
}

const stickers: StickerProps[] = [
  { shape: "circle",  label: "BORONDO",   sub: "BEÉLE · 2025",    rotate: -4, inverted: false },
  { shape: "rounded", label: "ANHÉLAME",  sub: "Track 01",         rotate:  3, inverted: true  },
  { shape: "circle",  label: "B",         sub: "BEÉLE",            rotate:  0, inverted: true  },
  { shape: "tag",     label: "QUÉDATE",                            rotate: -2, inverted: false },
  { shape: "rounded", label: "BYE",       sub: "Track 21",         rotate:  5, inverted: false },
  { shape: "diamond", label: "BDO",                                rotate:  0, inverted: true  },
  { shape: "circle",  label: "SOBELOVE",  sub: "Track 18",         rotate:  2, inverted: false },
  { shape: "tag",     label: "YA Q",      sub: "Track 22",         rotate: -3, inverted: true  },
  { shape: "rounded", label: "ARENA",     sub: "ft. C. Morrison",  rotate:  1, inverted: false },
];

export function WhatsAppStickers() {
  const handleDownload = () => {
    alert("Pack de stickers próximamente disponible.");
  };

  return (
    <section
      id="stickers"
      className="bg-black py-24 lg:py-36 overflow-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader label="WhatsApp Stickers" title="Llévalos contigo" light />

        {/* Two-column layout: stickers + gatefold visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: sticker grid + CTA ── */}
          <div>
            <div className="flex flex-wrap gap-4 items-center">
              {stickers.map((s) => (
                <Sticker key={s.label} {...s} />
              ))}
            </div>

            <div className="mt-12 h-px bg-white/10 mb-10" />

            <p
              className="text-white/70 mb-7 max-w-sm"
              style={{ fontSize: "1rem", lineHeight: 1.75 }}
            >
              9 stickers del mundo Borondo para tus conversaciones.
              Descarga el pack y comparte lo que llevas adentro.
            </p>

            <button
              onClick={handleDownload}
              className="flex items-center gap-3 bg-white text-black px-8 py-4 hover:bg-white/85 transition-colors group"
            >
              <Download
                size={14}
                className="transition-transform group-hover:-translate-y-0.5"
              />
              <span
                className="text-base tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
              >
                Descargar Pack
              </span>
            </button>

            <p
              className="text-white/65 mt-3"
              style={{ fontSize: "1rem", letterSpacing: "0.12em" }}
            >
              Compatible con WhatsApp · iOS · Android
            </p>
          </div>

          {/* ── Right: Gatefold editorial image ── */}
          <div className="relative">
            {/* Gatefold photo — tall crop, grayscale */}
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src={gatefold}
                alt="Beéle — Borondo Gatefold"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center"
                style={{ filter: "contrast(1.02)" }}
              />
              {/* Subtle gradient veil — keeps dark atmosphere */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
            </div>

            {/* Album cover polaroid — floats bottom-left corner of image */}
            <div
              className="absolute bottom-5 left-5"
              style={{ transform: "rotate(-3deg)" }}
            >
              <div
                className="bg-white p-1.5"
                style={{ width: 56, boxShadow: "0 6px 24px rgba(0,0,0,0.8)" }}
              >
                <img
                  src={albumCover}
                  alt="Borondo álbum"
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>

            {/* "BORONDO" label — bottom right, restrained */}
            <div className="absolute bottom-6 right-6">
              <span
                className="text-white/30"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 800,
                  fontSize: "0.65rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                }}
              >
                Borondo
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}