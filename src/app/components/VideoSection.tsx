import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { SectionHeader } from "./SectionLabel";
import { RevealOnScroll } from "./RevealOnScroll";

const PLAYLIST_URL =
  "https://www.youtube.com/playlist?list=PL-WV71xWJQL8YndZbY4j-JpoAg79xOvnI";

interface VideoEntry {
  id: string;
  youtubeId: string | null; // null = pendiente
  title: string;
  subtitle: string;
}

const VIDEOS: VideoEntry[] = [
  {
    id: "borondo-sessions-1",
    youtubeId: "FzL9-x6K4to",
    title: "BORONDO",
    subtitle: "5020 RCRDS Sessions",
  },
  {
    id: "borondo-sessions-2",
    youtubeId: "P0h46D9bfr0",
    title: "BORONDO",
    subtitle: "5020 RCRDS Sessions Vol. 2",
  },
  {
    id: "la-patadita",
    youtubeId: "SHzq4ohh9mg",
    title: "la patadita",
    subtitle: "The Making of · ft. Elvis Crespo",
  },
  {
    id: "mi-refe",
    youtubeId: "w8l33K5D5CI",
    title: "mi refe",
    subtitle: "ft. Ovy On The Drums",
  },
  {
    id: "no-tiene-sentido",
    youtubeId: "HL9VoQ-er_U",
    title: "no tiene sentido",
    subtitle: "Video Oficial",
  },
  {
    // TODO: reemplazar con el youtubeId correcto del canal oficial de Beéle
    id: "top-diesel",
    youtubeId: "8H61_9M6IUs",
    title: "top diesel",
    subtitle: "Performance / Lyrics",
  },
];

function thumbUrl(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

// ─── Play icon ───────────────────────────────────────────────────────────────
function PlayIcon({ large = false }: { large?: boolean }) {
  const ring = large ? "w-16 h-16" : "w-12 h-12";
  const svgSize = large ? 18 : 14;
  return (
    <div
      className={`${ring} rounded-full border border-white/80 flex items-center justify-center backdrop-blur-sm bg-black/25`}
    >
      <svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 24 24"
        fill="white"
        aria-hidden="true"
        style={{ marginLeft: 2 }}
      >
        <polygon points="5,3 19,12 5,21" />
      </svg>
    </div>
  );
}

// ─── Video card ───────────────────────────────────────────────────────────────
interface CardProps {
  video: VideoEntry;
  onOpen: (v: VideoEntry) => void;
  featured?: boolean;
}

function VideoCard({ video, onOpen, featured = false }: CardProps) {
  const clickable = Boolean(video.youtubeId);

  return (
    <button
      onClick={() => clickable && onOpen(video)}
      disabled={!clickable}
      aria-label={
        clickable
          ? `Ver video: ${video.subtitle} — ${video.title}`
          : `${video.title} — próximamente`
      }
      type="button"
      className={[
        "group relative block w-full overflow-hidden bg-black text-left",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        !clickable && "cursor-default",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ aspectRatio: "16/9" }}
    >
      {/* Thumbnail or placeholder */}
      {video.youtubeId ? (
        <img
          src={thumbUrl(video.youtubeId)}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
          <span
            className="text-white/20 text-xs tracking-[0.35em] uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Próximamente
          </span>
        </div>
      )}

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Hover gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Play button
           — always visible on mobile, hover-only on md+ (except featured) */}
      {clickable && (
        <div
          className={[
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            featured
              ? "opacity-100"
              : "opacity-100 md:opacity-0 md:group-hover:opacity-100",
          ].join(" ")}
        >
          <div className="transition-transform duration-300 group-hover:scale-110">
            <PlayIcon large={featured} />
          </div>
        </div>
      )}

      {/* Text */}
      <div
        className={`absolute bottom-0 left-0 right-0 ${featured ? "p-5 lg:p-6" : "p-4"}`}
      >
        <p
          className="text-white/55 tracking-[0.2em] uppercase mb-1"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: featured ? "0.75rem" : "0.65rem",
          }}
        >
          {video.subtitle}
        </p>
        <h3
          className="text-white leading-none"
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 800,
            fontSize: featured
              ? "clamp(1.3rem, 2.5vw, 1.9rem)"
              : "clamp(0.9rem, 1.3vw, 1.1rem)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {video.title}
        </h3>
      </div>
    </button>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function VideoModal({
  video,
  onClose,
}: {
  video: VideoEntry | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  if (!video?.youtubeId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 lg:p-16"
      role="dialog"
      aria-modal="true"
      aria-label={`${video.subtitle} — ${video.title}`}
      style={{ animation: "vsFadeIn 0.2s ease both" }}
    >
      {/* Backdrop — click to close */}
      <div
        className="absolute inset-0 bg-black/88 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog content */}
      <div
        className="relative w-full max-w-4xl"
        style={{
          animation: "vsScaleIn 0.25s cubic-bezier(0.34,1.4,0.64,1) both",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar video"
          className="absolute -top-10 right-0 flex items-center gap-1.5 text-white/50 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Cerrar <X size={13} />
        </button>

        {/* 16:9 iframe — only mounted while modal is open */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={`${video.subtitle} — ${video.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>

        {/* Caption */}
        <div className="mt-3 flex items-baseline gap-3">
          <span
            className="text-white/35 text-xs tracking-[0.25em] uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {video.subtitle}
          </span>
          <span
            className="text-white/75 text-sm tracking-[0.1em] uppercase font-bold"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            {video.title}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes vsFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes vsScaleIn { from { opacity: 0; transform: scale(0.93) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<VideoEntry | null>(null);
  const handleClose = useCallback(() => setActiveVideo(null), []);
  const [mobileVisible, setMobileVisible] = useState(2);
  const sectionRef = useRef<HTMLElement>(null);

  const [featured, ...rest] = VIDEOS;
  const sideVideos = rest.slice(0, 2);
  const bottomVideos = rest.slice(2);

  const allShown = mobileVisible >= VIDEOS.length;

  return (
    <>
      <section
        ref={sectionRef}
        id="videos"
        className="bg-white py-12 lg:py-20"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <RevealOnScroll animation="fade-up" className="relative mb-6">
            <SectionHeader label="Videos" title="Más relevantes" />
            <a
              href={PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-[#3d3d3d] hover:text-black transition-colors text-xs tracking-widest uppercase absolute right-0 bottom-0"
              style={{ fontWeight: 500 }}
            >
              Ver video de Borondo
              <ArrowUpRight size={10} />
            </a>
          </RevealOnScroll>

          {/* ── Mobile layout (< lg) — flat list with progressive reveal ── */}
          <div className="lg:hidden">
            <RevealOnScroll animation="fade-up" delay={100} className="flex flex-col gap-3">
              {VIDEOS.slice(0, mobileVisible).map((v, i) => (
                <VideoCard key={v.id} video={v} onOpen={setActiveVideo} featured={i === 0} />
              ))}
            </RevealOnScroll>

            <div className="mt-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-black/8" />
              <button
                type="button"
                onClick={() => {
                  if (allShown) {
                    setMobileVisible(2);
                    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  } else {
                    setMobileVisible((v) => Math.min(v + 2, VIDEOS.length));
                  }
                }}
                className="flex-shrink-0 text-[#3d3d3d] hover:text-black transition-colors text-xs tracking-widest uppercase"
                style={{ fontWeight: 500 }}
              >
                {allShown ? "Ver menos" : "Ver más"}
              </button>
              <div className="h-px flex-1 bg-black/8" />
            </div>
          </div>

          {/* ── Desktop layout (lg+) — original grid, unchanged ── */}
          <div className="hidden lg:block">
            {/* Row 1 — featured (2/3) + side stack (1/3) */}
            <RevealOnScroll animation="fade-up" delay={80} className="grid grid-cols-3 gap-4 mb-4">
              <div className="col-span-2">
                <VideoCard video={featured} onOpen={setActiveVideo} featured />
              </div>
              <div className="flex flex-col gap-4">
                {sideVideos.map((v) => (
                  <VideoCard key={v.id} video={v} onOpen={setActiveVideo} />
                ))}
              </div>
            </RevealOnScroll>

            {/* Row 2 — three equal columns */}
            <RevealOnScroll animation="fade-up" delay={200} className="grid grid-cols-3 gap-4">
              {bottomVideos.map((v) => (
                <VideoCard key={v.id} video={v} onOpen={setActiveVideo} />
              ))}
            </RevealOnScroll>

            {/* Bottom link */}
            <RevealOnScroll animation="fade-in" delay={300} className="mt-7 flex items-center justify-between">
              <div className="h-px flex-1 bg-black/8" />
              <a
                href={PLAYLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-5 flex items-center gap-1.5 text-[#3d3d3d] hover:text-black transition-colors text-xs tracking-widest uppercase"
                style={{ fontWeight: 500 }}
              >
                Ver video de Borondo
                <ArrowUpRight size={10} />
              </a>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Modal — outside section to avoid stacking context issues */}
      <VideoModal video={activeVideo} onClose={handleClose} />
    </>
  );
}
