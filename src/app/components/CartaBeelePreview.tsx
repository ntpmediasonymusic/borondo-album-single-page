import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { RevealOnScroll } from "./RevealOnScroll";
import carta1 from "../../imports/carta-beele/carta-beele-1.png";
import carta2 from "../../imports/carta-beele/carta-beele-2.png";
import carta3 from "../../imports/carta-beele/carta-beele-3.png";
import cartaHero from "../../imports/carta-beele/Beele-Borondo-carta-hero.png";

const CARDS = [
  { src: carta1, alt: "Ejemplo de carta a Beéle — 1" },
  { src: carta2, alt: "Ejemplo de carta a Beéle — 2" },
  { src: carta3, alt: "Ejemplo de carta a Beéle — 3" },
];

export function CartaBeelePreview() {
  return (
    <section
      id="cartas"
      className="bg-white py-12 lg:py-20 overflow-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: text + cards + CTA ── */}
          <div>
            {/* Header */}
            <RevealOnScroll animation="fade-up">
              <SectionLabel>Fan Experience</SectionLabel>
              <h2
                className="text-black"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Cartas a Beéle
              </h2>
              {/* Divider below title */}
              <div className="h-px w-full bg-black/10 mt-6 mb-6" />
            </RevealOnScroll>

            {/* Description */}
            <RevealOnScroll animation="fade-up" delay={80}>
              <p
                className="text-[#3d3d3d] mb-8 max-w-md"
                style={{ fontSize: "1rem", lineHeight: 1.75 }}
              >
                Escríbele a Beéle qué te hizo sentir BORONDO, cuál fue tu canción
                favorita o qué mensaje te gustaría dejarle.
              </p>
            </RevealOnScroll>

            {/* Example cards */}
            <RevealOnScroll animation="fade-up" delay={160}>
              <div className="grid grid-cols-3 gap-3 mb-9">
                {CARDS.map((card, i) => (
                  <div
                    key={i}
                    className="border border-black/8"
                    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
                  >
                    <img
                      src={card.src}
                      alt={card.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-contain"
                      style={{ display: "block" }}
                    />
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* CTA button */}
            <RevealOnScroll animation="fade-up" delay={240}>
              <Link
                to="/cartas-a-beele"
                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 hover:bg-black/80 transition-colors group"
                aria-label="Ir a la página de Cartas a Beéle"
              >
                <span
                  className="text-base tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                >
                  Escríbele a Beéle
                </span>
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </RevealOnScroll>
          </div>

          {/* ── Right: hero image ── */}
          <RevealOnScroll animation="fade-left" delay={120}>
            <img
              src={cartaHero}
              alt="Beéle — Cartas a Beéle, imagen principal"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-contain"
              style={{ display: "block", maxWidth: "100%" }}
            />
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
}
