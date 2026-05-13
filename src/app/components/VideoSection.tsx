import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionLabel";
import gatefold2 from "../../imports/GATEFOLD_02.jpg";
import coverArt from "../../imports/Beele-borondo-album-cover.jpg";
import artistPortrait from "../../imports/image-1.png";

const YOUTUBE_CHANNEL = "https://www.youtube.com/@beele";
const PLAYLIST_BASE = "https://www.youtube.com/playlist?list=PL-WV71xWJQL8YndZbY4j-JpoAg79xOvnI";

interface VideoEntry {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  url: string;
  featured?: boolean;
}

const VIDEOS: VideoEntry[] = [
  {
    id: 1,
    title: "Borondo",
    subtitle: "Video Oficial",
    image: coverArt,
    url: PLAYLIST_BASE,
    featured: true,
  },
  {
    id: 2,
    title: "Anhélame",
    subtitle: "Video Oficial",
    image: gatefold2,
    url: `${PLAYLIST_BASE}&index=1`,
  },
  {
    id: 3,
    title: "Dios me oyó",
    subtitle: "ft. Marc Anthony · Video Oficial",
    image: artistPortrait,
    url: `${PLAYLIST_BASE}&index=11`,
  },
];

// ─── Play icon ─────────────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <div className="w-12 h-12 rounded-full border border-white/70 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <svg
        width="14"
        height="14"
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

// ─── Featured card ──────────────────────────────────────────────────────────
function FeaturedVideoCard({ video }: { video: VideoEntry }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative overflow-hidden bg-black"
      style={{ aspectRatio: "16/9" }}
      aria-label={`Ver ${video.title} en YouTube`}
    >
      <img
        src={video.image}
        alt={video.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {/* Play button — centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="transition-transform duration-300 group-hover:scale-110">
          <PlayIcon />
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
        <div>
          <p
            className="text-white/75 text-base tracking-[0.2em] uppercase mb-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
          >
            {video.subtitle}
          </p>
          <h3
            className="text-white"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            {video.title}
          </h3>
        </div>
        <div className="flex-shrink-0 flex items-center gap-1.5 text-white/65 group-hover:text-white transition-colors">
          <span
            className="text-base tracking-widest uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
          >
            YouTube
          </span>
          <ArrowUpRight size={12} />
        </div>
      </div>
    </a>
  );
}

// ─── Supporting card ────────────────────────────────────────────────────────
function SupportingVideoCard({ video }: { video: VideoEntry }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative overflow-hidden bg-black"
      style={{ aspectRatio: "4/3" }}
      aria-label={`Ver ${video.title} en YouTube`}
    >
      <img
        src={video.image}
        alt={video.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <PlayIcon />
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p
          className="text-white/65 text-base tracking-[0.2em] uppercase mb-0.5"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
        >
          {video.subtitle}
        </p>
        <h3
          className="text-white"
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 800,
            fontSize: "1.05rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {video.title}
        </h3>
      </div>
    </a>
  );
}

// ─── Section ────────────────────────────────────────────────────────────────
export function VideoSection() {
  const [featured, ...supporting] = VIDEOS;

  return (
    <section
      id="videos"
      className="bg-white py-12 lg:py-20"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header row */}
        <div className="relative mb-6">
          <SectionHeader label="Videos" title="El universo visual" />
          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-[#3d3d3d] hover:text-black transition-colors text-base tracking-widest uppercase absolute right-0 bottom-0"
            style={{ fontWeight: 500 }}
          >
            Ver canal
            <ArrowUpRight size={10} />
          </a>
        </div>

        {/* Layout: featured (2/3) + supporting stack (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
          {/* Featured — spans 2 columns */}
          <div className="lg:col-span-2">
            <FeaturedVideoCard video={featured} />
          </div>

          {/* Supporting — stacked right column */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {supporting.map((video) => (
              <SupportingVideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>

        {/* Bottom link — mobile */}
        <div className="mt-7 flex items-center justify-between">
          <div className="h-px flex-1 bg-black/8" />
          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-5 flex items-center gap-1.5 text-[#3d3d3d] hover:text-black transition-colors text-base tracking-widest uppercase"
            style={{ fontWeight: 500 }}
          >
            Ver canal completo
            <ArrowUpRight size={10} />
          </a>
        </div>
      </div>
    </section>
  );
}