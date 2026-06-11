import { useEffect } from "react";
import { Link } from "react-router";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

function fixWyngPresentationRoles(root: Element | Document = document) {
  // Wyng renders .flex-grid-item divs with role="presentation"/"none" that contain
  // focusable children. Per ARIA spec, role="none" is invalid on elements with
  // interactive descendants — WCAG 4.1.2 (AI131-AI133). Removing the role restores
  // correct AT semantics without any visual impact.
  // TODO: report to Wyng so the fix lands in their widget. Remove this once resolved.
  (root as Element | Document).querySelectorAll<HTMLElement>(
    '.flex-grid-item[role="presentation"], .flex-grid-item[role="none"]'
  ).forEach((el) => {
    if (el.querySelector("a, button, input, select, textarea, [tabindex]")) {
      el.removeAttribute("role");
    }
  });
}

export function LettersToBeele() {
  useEffect(() => {
    const FLAG = "cartas-hard-reload";
    if (!sessionStorage.getItem(FLAG)) {
      // First mount via SPA navigation — force a full browser reload so
      // the Wyng script always starts from a clean state.
      sessionStorage.setItem(FLAG, "1");
      window.location.reload();
    } else {
      // Second mount after the hard reload — clear the flag and load Wyng.
      sessionStorage.removeItem(FLAG);
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://dnsl4xr6unrmf.cloudfront.net/js/campaign.eebc54fd.js";
      script.integrity = "sha384-vjC1EXFjsSlKA3QP8KjOspJdRKdvD1JuyQhUQteL4vi6jimLXe910MiN5PzIQe1v";
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);

      // Watch for Wyng DOM mutations and strip invalid presentational roles.
      const observer = new MutationObserver(() => fixWyngPresentationRoles());
      observer.observe(document.body, { childList: true, subtree: true });
      // Run once immediately in case Wyng already rendered synchronously.
      fixWyngPresentationRoles();

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-white text-black"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <Navigation theme="light" />

      <main className="max-w-5xl mx-auto px-6 lg:px-10 pt-32 pb-20">

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-black/60 hover:text-black/80 transition-colors mb-14"
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          <span>←</span>
          <span>Volver</span>
        </Link>

        {/* Header */}
        <header className="mb-14">
          <span
            className="text-black/60 mb-4 block"
            style={{
              fontSize: "0.78rem",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Fan Experience
          </span>

          <h1
            className="text-black mb-6"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              lineHeight: 0.95,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Cartas a Beéle
          </h1>

          <div className="h-px bg-black/10 my-6" />

          <p
            className="text-black/70 max-w-xl"
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              lineHeight: 1.7,
              letterSpacing: "0.01em",
            }}
          >
            Escríbele a Beéle qué te hizo sentir BORONDO, cuál fue tu canción
            favorita o qué mensaje te gustaría dejarle.
          </p>
        </header>

        {/* Wyng embed */}
        <div className="w-full">
          <div
            className="wyng-experience"
             data-wyng-id="6a05f67b203616c5d2001e38"
             data-wyng-token="k7Ah84auA1mWamORwchdxyoDht0kvdHToO02aHOB6a05f67cb3977ca05ccd633b"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
