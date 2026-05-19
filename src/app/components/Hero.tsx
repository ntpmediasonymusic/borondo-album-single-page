import { useEffect, useRef, useState } from "react";
import heroBg from "../../imports/beele-borondo-landing-aniversario-v2.png";
import albumCover from "../../imports/Beele-borondo-album-cover.jpg";
import beeleLogo from "../../imports/beele-B.png";

function tr(prefersReduced: boolean, props: string, ms: number, delayMs = 0): string {
  if (prefersReduced) return "none";
  const ease = "cubic-bezier(0.22, 0.61, 0.36, 1)";
  return props
    .split(",")
    .map((p) => `${p.trim()} ${ms}ms ${ease} ${delayMs}ms`)
    .join(", ");
}

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);  // background — speed 0.12
  const logoRef    = useRef<HTMLDivElement>(null);  // B logo — speed 0.07
  const rafRef     = useRef<number>(0);

  const prefersReduced = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  ).current;

  useEffect(() => {
    if (prefersReduced) { setLoaded(true); return; }
    const t = setTimeout(() => setLoaded(true), 40);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (prefersReduced) return;
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = sectionRef.current?.offsetHeight ?? window.innerHeight;
        if (y > h) return;
        if (bgRef.current)   bgRef.current.style.transform   = `translate3d(0, ${y * 0.12}px, 0)`;
        if (logoRef.current) logoRef.current.style.transform = `translate3d(0, ${y * 0.07}px, 0)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(rafRef.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const p = prefersReduced;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen bg-black overflow-hidden pt-4"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* ── LAYER 1 — Hero background image ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 h-[110%] -mt-[5%] w-full pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: loaded ? 1 : 0,
          transition: tr(p, "opacity", 1400),
          willChange: "transform, opacity",
        }}
      >
        <img
          src={heroBg}
          alt=""
          fetchPriority="high"
          decoding="sync"
          className="w-full h-full object-cover object-center"
          style={{
            transform: loaded ? "scale(1)" : "scale(1.06)",
            transition: tr(p, "transform", 1600),
            transformOrigin: "50% 20%",
          }}
        />
        {/* Darken left for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
        {/* Darken top & bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* ── LAYER 2 — Beéle "B" decorative watermark ── */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-start pointer-events-none select-none p-0 top-100 md:top-0 md:p-10"
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

      {/* ── LAYER 3 — "1ER ANIVERSARIO" floating label ── */}
      <div
        className="absolute z-10 pointer-events-none select-none
          left-6 bottom-[20%]
          sm:left-auto sm:right-[8vw] sm:bottom-[10vh] sm:text-right"
        aria-hidden="true"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0px)" : "translateY(18px)",
          transition: tr(p, "opacity, transform", 900, 600),
        }}
      >
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.35rem, 3.5vw, 2rem)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1,
          }}
        >
          1er Aniversario
        </p>
      </div>

      {/* ── LAYER 4 — Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col min-h-screen">

        {/* Spacer — pushes bottom bar to the bottom */}
        <div className="flex-1" />

        {/* ── Bottom bar ── */}
        <div className="pb-10">

          {/* Divider line */}
          <div
            className="mb-6"
            style={{
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.1)",
              transformOrigin: "left center",
              transform: loaded ? "scaleX(1)" : "scaleX(0)",
              opacity: loaded ? 1 : 0,
              transition: tr(p, "transform, opacity", 700, 720),
            }}
          />

          <div
            className="flex items-end gap-5 sm:gap-7"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0px)" : "translateY(16px)",
              transition: tr(p, "opacity, transform", 700, 800),
            }}
          >
            {/* Album cover polaroid */}
            <div
              className="flex-shrink-0 hidden sm:block"
              style={{
                transform: "rotate(-2.5deg)",
              }}
            >
              <div
                className="bg-white p-1.5"
                style={{ width: 76, boxShadow: "0 6px 28px rgba(0,0,0,0.75)" }}
              >
                <img
                  src={albumCover}
                  alt="Borondo — Álbum"
                  decoding="async"
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>

            {/* Editorial text block */}
            <div className="flex flex-col gap-0.5">
              <p
                className="text-white/50"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}
              >
                Beéle
              </p>
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "clamp(1.35rem, 3.5vw, 2rem)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 900,
                  color: "white",
                  lineHeight: 1,
                }}
              >
                Borondo
              </p>
              {/* Thin separator */}
              <div
                className="my-2"
                style={{ height: "1px", width: "100%", backgroundColor: "rgba(255,255,255,0.12)" }}
              />
              <p
                className="text-white/45"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}
              >
                Álbum · 2025
              </p>
              {/* <p
                className="text-white/40"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                26 canciones
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
