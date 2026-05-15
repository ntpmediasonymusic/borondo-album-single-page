import { useEffect } from "react";
import { Link } from "react-router";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

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
          className="inline-flex items-center gap-2 text-black/40 hover:text-black/70 transition-colors mb-14"
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
            className="text-black/40 mb-4 block"
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
            className="text-black/60 max-w-xl"
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
