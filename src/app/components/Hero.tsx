import { useEffect, useRef, useState } from "react";
import artistPhoto from "../../imports/download-1.jpg";
import albumCover from "../../imports/Beele-borondo-5020Sessions-album-cover.jpg";
import beeleLogo from "../../imports/beele-B.png";

// Build a CSS transition string for one or more comma-separated properties.
// Returns "none" when the user prefers reduced motion.
function tr(prefersReduced: boolean, props: string, ms: number, delayMs = 0): string {
  if (prefersReduced) return "none";
  const ease = "cubic-bezier(0.22, 0.61, 0.36, 1)";
  return props
    .split(",")
    .map((p) => `${p.trim()} ${ms}ms ${ease} ${delayMs}ms`)
    .join(", ");
}

export function Hero() {
  // Entry animation state: false = hidden, true = visible
  const [loaded, setLoaded] = useState(false);

  // Layer refs for multi-speed parallax
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null); // artist photo — speed 0.12
  const logoRef    = useRef<HTMLDivElement>(null); // Beéle "B" logo — speed 0.07
  const graphicRef = useRef<HTMLDivElement>(null); // ghost "BORONDO" — speed 0.05
  const rafRef     = useRef<number>(0);

  // Read once at mount — stable for session lifecycle
  const prefersReduced = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  ).current;

  // Trigger the entry animation on first paint
  useEffect(() => {
    if (prefersReduced) {
      setLoaded(true);
      return;
    }
    const t = setTimeout(() => setLoaded(true), 40);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Multi-layer parallax via requestAnimationFrame
  useEffect(() => {
    if (prefersReduced) return;

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        // Stop parallax once the section is past the viewport
        const h = sectionRef.current?.offsetHeight ?? window.innerHeight;
        if (y > h) return;

        if (photoRef.current) {
          // artist photo moves faster → feels closer to camera
          photoRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
        }
        if (logoRef.current) {
          // decorative "B" at medium depth
          logoRef.current.style.transform = `translate3d(0, ${y * 0.07}px, 0)`;
        }
        if (graphicRef.current) {
          // ghost outline text at farthest depth
          graphicRef.current.style.transform = `translate3d(0, ${y * 0.05}px, 0)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const p = prefersReduced; // shorthand for JSX

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen bg-black overflow-hidden pt-4"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Mobile: scale headline to viewport width so "Borondo" never clips */}
      <style>{`
        @media (max-width: 639px) {
          .hero-title { font-size: clamp(2.75rem, 13.5vw, 4.5rem) !important; }
        }
      `}</style>

      {/* ──────────────────────────────────────────────────────────────────────
          LAYER 1 — Artist photo (right half)
          Parallax on the outer div (JS sets transform).
          Entry: opacity fade on outer + scale on the img (no conflict).
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        ref={photoRef}
        className="absolute right-0 top-0 h-[110%] -mt-[5%] w-full md:w-[58%] pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: loaded ? 1 : 0,
          transition: tr(p, "opacity", 1400),
          willChange: "transform, opacity",
        }}
      >
        {/* Scale from 1.06 → 1 on load (img only, no conflict with parallax on outer) */}
        <img
          src={artistPhoto}
          alt=""
          fetchPriority="high"
          decoding="sync"
          className="w-full h-full object-cover object-center"
          style={{
            filter: "grayscale(100%) contrast(1.06)",
            opacity: 0.65,
            transform: loaded ? "scale(1)" : "scale(1.06)",
            transition: tr(p, "transform", 1600),
            transformOrigin: "50% 20%",
          }}
        />
        {/* Gradient: fade into black on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
        {/* Gradient: fade top & bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          LAYER 2 — Beéle "B" decorative watermark
          Parallax on the outer div; opacity animation on the img.
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-start pointer-events-none select-none p-5"
        aria-hidden="true"
        style={{ willChange: "transform" }}
      >
        <img
          src={beeleLogo}
          alt=""
          decoding="async"
          style={{
            width: "min(62vw, 540px)",
            filter: "invert(0)",
            opacity: loaded ? 0.4 : 0,
            transition: tr(p, "opacity", 1600, 200),
          }}
        />
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          LAYER 3 — Ghost outline "BORONDO" (decorative bottom text)
          Parallax on the outer div; entry animation on the inner span.
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        ref={graphicRef}
        className="absolute inset-0 flex items-end pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
        style={{ willChange: "transform" }}
      >
        <span
          className="leading-none -mb-6 -ml-3 lg:-ml-5 whitespace-nowrap"
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(11rem, 26vw, 32rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.045)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            // Entry: fade up from below
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0px)" : "translateY(28px)",
            transition: tr(p, "opacity, transform", 1200, 350),
          }}
        >
          BORONDO
        </span>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          LAYER 4 — Main content (no parallax — stays readable during scroll)
      ─────────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col min-h-screen">

        {/* ── Vertical centre: eyebrow + headline + subtitle ── */}
        <div className="flex-1 flex flex-col justify-center pt-20">

          {/* Artist eyebrow label — slides in from left */}
          <span
            className="text-white/70 mb-5 block"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              fontWeight: 500,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateX(0px)" : "translateX(-24px)",
              transition: tr(p, "opacity, transform", 900, 380),
            }}
          >
            Beéle
          </span>

          {/* H1 — powerful fade-up entrance */}
          <h1
            className="hero-title text-white whitespace-nowrap"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(4.5rem, 11vw, 13rem)",
              lineHeight: 0.92,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0px)" : "translateY(44px)",
              transition: tr(p, "opacity, transform", 900, 500),
            }}
          >
            Borondo
          </h1>

          {/* Subtitle — follows title */}
          <span
            className="text-white mt-4 block"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1rem, 2.5vw, 2rem)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontWeight: 500,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0px)" : "translateY(24px)",
              transition: tr(p, "opacity, transform", 800, 660),
            }}
          >
            1er Aniversario
          </span>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pb-10">

          {/* Divider line — grow from left to right */}
          <div
            className="mb-8"
            style={{
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.1)",
              transformOrigin: "left center",
              transform: loaded ? "scaleX(1)" : "scaleX(0)",
              opacity: loaded ? 1 : 0,
              transition: tr(p, "transform, opacity", 700, 720),
            }}
          />

          <div className="flex items-end justify-between gap-6">

            {/* Left: album polaroid + meta text */}
            <div className="flex items-end gap-5">

              {/* Album cover polaroid — scale in, keep the tilt */}
              <div
                className="flex-shrink-0 hidden sm:block"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded
                    ? "rotate(-2.5deg) scale(1)"
                    : "rotate(-2.5deg) scale(0.76)",
                  transition: tr(p, "opacity, transform", 700, 800),
                }}
              >
                <div
                  className="bg-white p-1.5"
                  style={{ width: 80, boxShadow: "0 6px 28px rgba(0,0,0,0.75)" }}
                >
                  <img
                    src={albumCover}
                    alt="Borondo — Álbum"
                    decoding="async"
                    className="w-full aspect-square object-cover"
                  />
                </div>
              </div>

              {/* Text meta — fade up last */}
              <div
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0px)" : "translateY(16px)",
                  transition: tr(p, "opacity, transform", 600, 900),
                }}
              >
                <p
                  className="text-white/65"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Álbum · 2025
                </p>
                <p
                  className="text-white/65 mt-0.5"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    fontWeight: 400,
                  }}
                >
                  26 canciones
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
