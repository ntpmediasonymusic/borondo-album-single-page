import { Download } from "lucide-react";
import { SectionHeader } from "./SectionLabel";
import albumCover from "../../imports/Beele-borondo-album-cover.jpg";
import gatefold from "../../imports/GATEFOLD_01.jpg";
import stickerBorondo from "../../imports/stickers/beeleStickerBorondo.png";
import stickerColeto from "../../imports/stickers/beeleStickerColeto.png";
import stickerBomboclat from "../../imports/stickers/beeleStickerBomboclat.png";
import stickerLaPlena from "../../imports/stickers/beeleStickerLaPlena.png";
import stickerVisaje from "../../imports/stickers/beeleStickerVisaje.png";
import stickerLogo from "../../imports/stickers/beeleStickerLogo.png";

const stickers = [
  {
    id: "borondo-01",
    label: "Bomboclat",
    src: stickerBomboclat,
    downloadUrl: "/stickers/borondo-01.webp",
    downloadName: "borondo-sticker-01-bomboclat.webp",
    alt: "Sticker Bomboclat de Borondo",
    rotate: -2,
    duration: 3.0,
    delay: 0.0,
  },
  {
    id: "borondo-02",
    label: "Borondo",
    src: stickerBorondo,
    downloadUrl: "/stickers/borondo-02.webp",
    downloadName: "borondo-sticker-02-borondo.webp",
    alt: "Sticker Borondo",
    rotate: -4,
    duration: 3.4,
    delay: 0.5,
  },
  {
    id: "borondo-03",
    label: "Coleto",
    src: stickerColeto,
    downloadUrl: "/stickers/borondo-03.webp",
    downloadName: "borondo-sticker-03-coleto.webp",
    alt: "Sticker Coleto de Borondo",
    rotate: 3,
    duration: 2.8,
    delay: 1.0,
  },
  {
    id: "borondo-04",
    label: "La Plena",
    src: stickerLaPlena,
    downloadUrl: "/stickers/borondo-04.webp",
    downloadName: "borondo-sticker-04-la-plena.webp",
    alt: "Sticker La Plena de Borondo",
    rotate: 2,
    duration: 3.2,
    delay: 0.3,
  },
  {
    id: "borondo-05",
    label: "Logo",
    src: stickerLogo,
    downloadUrl: "/stickers/borondo-05.webp",
    downloadName: "borondo-sticker-05-logo.webp",
    alt: "Sticker logo de Borondo",
    rotate: 1,
    duration: 2.6,
    delay: 0.8,
  },
  {
    id: "borondo-06",
    label: "Visaje",
    src: stickerVisaje,
    downloadUrl: "/stickers/borondo-06.webp",
    downloadName: "borondo-sticker-06-visaje.webp",
    alt: "Sticker Visaje de Borondo",
    rotate: -3,
    duration: 3.1,
    delay: 1.4,
  },
];

export function WhatsAppStickers() {
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
            <div className="grid grid-cols-3 gap-4">
              {stickers.map((s) => (
                <a
                  key={s.id}
                  href={s.downloadUrl}
                  download={s.downloadName}
                  aria-label={`Descargar ${s.alt}`}
                  className="flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 focus-visible:outline-offset-4 rounded-sm cursor-pointer"
                  style={{ transform: `rotate(${s.rotate}deg)` }}
                >
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    className="sticker-img w-full h-auto max-w-[120px] drop-shadow-lg"
                    style={{
                      "--levitate-duration": `${s.duration}s`,
                      "--levitate-delay": `${s.delay}s`,
                    } as React.CSSProperties}
                  />
                </a>
              ))}
            </div>

            <div className="mt-12 h-px bg-white/10 mb-10" />

            <p
              className="text-white/70 mb-7 max-w-sm"
              style={{ fontSize: "1rem", lineHeight: 1.75 }}
            >
              6 stickers del mundo Borondo para tus conversaciones.
              Descarga el pack y comparte lo que llevas dentro.
            </p>

            <a
              href="/downloads/borondo-whatsapp-stickers.zip"
              download="borondo-whatsapp-stickers.zip"
              aria-label="Descargar pack completo de stickers Borondo"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 hover:bg-white/85 transition-colors group"
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
            </a>

            <p
              className="text-white/65 mt-3"
              style={{ fontSize: "1rem", letterSpacing: "0.12em" }}
            >
              Compatible con WhatsApp · iOS · Android
            </p>
            <p
              className="text-white/35 mt-2 max-w-xs"
              style={{ fontSize: "0.78rem", lineHeight: 1.6 }}
            >
              Descarga los stickers desde tu celular para guardarlos y usarlos en tus conversaciones.
            </p>
          </div>

          {/* ── Right: Gatefold editorial image ── */}
          <div className="relative">
            {/* Gatefold photo — tall crop */}
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
