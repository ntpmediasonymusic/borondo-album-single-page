import { useEffect, useRef } from "react";
import artistPhoto from "../../imports/download-1.jpg";
import albumCover from "../../imports/image.png";
import beeleLogo from "../../imports/beele-B.png";

export function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (photoRef.current) {
        const y = window.scrollY * 0.18;
        photoRef.current.style.transform = `translateY(${y}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black overflow-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Mobile-only: scale headline font size to viewport width so "Borondo"
          never clips on narrow screens. Desktop clamp in inline style is untouched. */}
      <style>{`
        @media (max-width: 639px) {
          .hero-title { font-size: clamp(2.75rem, 13.5vw, 4.5rem) !important; }
        }
      `}</style>

      {/* ── Artist photo — right half, parallax ── */}
      <div
        ref={photoRef}
        className="absolute right-0 top-0 h-[110%] -mt-[5%] w-full md:w-[58%] pointer-events-none"
        aria-hidden="true"
      >
        <img
          src={artistPhoto}
          alt=""
          className="w-full h-full object-cover object-center"
          style={{
            filter: "grayscale(100%) contrast(1.06)",
            opacity: 0.65,
          }}
        />
        {/* Fade left — blends photo into black bg */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
        {/* Fade top & bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      </div>

      {/* ── Beéle "B" — large decorative background watermark ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src={beeleLogo}
          alt=""
          style={{
            width: "min(62vw, 720px)",
            opacity: 0.055,
            filter: "invert(1)",
          }}
        />
      </div>

      {/* ── Ghost outline "BORONDO" — decorative bg layer ── */}
      <div
        className="absolute inset-0 flex items-end pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
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
          }}
        >
          BORONDO
        </span>
      </div>

      {/* ── Main content — left column ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col min-h-screen">

        {/* Vertical centre: artist label + headline */}
        <div className="flex-1 flex flex-col justify-center pt-20">

          {/* Artist eyebrow label */}
          <span
            className="text-white/70 mb-5 block"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Beéle
          </span>

          {/* ── BORONDO — single line, Raleway 900 ── */}
          <h1
            className="hero-title text-white whitespace-nowrap"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(4.5rem, 11vw, 13rem)",
              lineHeight: 0.92,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            Borondo
          </h1>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pb-10">
          <div className="h-px bg-white/10 mb-8" />

          <div className="flex items-end justify-between gap-6">

            {/* Left: polaroid + meta */}
            <div className="flex items-end gap-5">
              {/* Album cover polaroid */}
              <div
                className="flex-shrink-0 hidden sm:block"
                style={{ transform: "rotate(-2.5deg)" }}
              >
                <div
                  className="bg-white p-1.5"
                  style={{ width: 56, boxShadow: "0 6px 28px rgba(0,0,0,0.75)" }}
                >
                  <img
                    src={albumCover}
                    alt="Borondo — Álbum"
                    className="w-full aspect-square object-cover"
                  />
                </div>
              </div>

              {/* Text meta */}
              <div>
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

            {/* Right: scroll indicator */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="h-px w-8 bg-white/15" />
              <span
                className="text-white/65"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Scroll
              </span>
              <div className="w-px h-7 bg-white/15 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}