import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  theme?: "light" | "dark";
}

export function Navigation({ theme = "dark" }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navBg =
    theme === "light"
      ? "bg-white border-b border-black/10"
      : scrolled
      ? "bg-white border-b border-black/10"
      : "bg-transparent";

  const textColor =
    theme === "light"
      ? "text-black"
      : scrolled
      ? "text-black"
      : "text-white";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">

            {/* Logo — B monogram + Borondo wordmark */}
            <button
              onClick={() => scrollTo("hero")}
              className={`flex items-center gap-2.5 hover:opacity-60 transition-opacity ${textColor}`}
              aria-label="Ir al inicio"
            >
              {/* Beéle "B" monogram mark */}
              {/* <div
                className={`w-[26px] h-[26px] flex items-center justify-center border flex-shrink-0 ${borderColor}`}
              >
                <span
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontWeight: 900,
                    fontSize: "0.78rem",
                    lineHeight: 1,
                    letterSpacing: 0,
                  }}
                >
                  B
                </span>
              </div> */}
              {/* Wordmark */}
              <span
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Borondo
              </span>
            </button>

            {/* Desktop nav links */}
            <div className={`hidden md:flex items-center gap-8 text-base tracking-widest uppercase ${textColor}`}
              style={{ fontWeight: 500 }}>
              <button onClick={() => scrollTo("tracks")} className="hover:opacity-50 transition-opacity cursor-pointer">
                Tracks
              </button>
              <button onClick={() => scrollTo("videos")} className="hover:opacity-50 transition-opacity cursor-pointer">
                Videos
              </button>
              <button onClick={() => scrollTo("stickers")} className="hover:opacity-50 transition-opacity cursor-pointer">
                Stickers
              </button>
              {/* <button onClick={() => scrollTo("merch")} className="hover:opacity-50 transition-opacity">
                Merch
              </button> */}
              <a
                href="https://wing.co"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-50 transition-opacity cursor-pointer"
              >
                Wyng
              </a>
              {/* Newsletter CTA — always black */}
              <button
                onClick={() => scrollTo("registro")}
                className="bg-black text-white px-4 py-2 hover:bg-black/75 transition-colors cursor-pointer"
                style={{ fontWeight: 600 }}
              >
                Newsletter
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden ${textColor} p-1`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black flex flex-col items-start justify-center px-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <div className="flex flex-col gap-8 w-full">
            {[
              { label: "Tracks", id: "tracks" },
              { label: "Videos", id: "videos" },
              { label: "Stickers", id: "stickers" },
              // { label: "Merch", id: "merch" },
              { label: "Comunidad", id: "registro" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-white tracking-widest uppercase text-base border-b border-white/10 pb-6 hover:opacity-50 transition-opacity"
                style={{ fontWeight: 500 }}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://wing.co"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="text-left text-white/75 tracking-widest uppercase text-base border-b border-white/10 pb-6 hover:opacity-50 transition-opacity"
              style={{ fontWeight: 500 }}
            >
              Wyng ↗
            </a>
            {/* Newsletter CTA */}
            <button
              onClick={() => scrollTo("registro")}
              className="text-left bg-white text-black tracking-widest uppercase text-base px-5 py-3 inline-block hover:opacity-80 transition-opacity w-auto"
              style={{ fontWeight: 600 }}
            >
              Newsletter
            </button>
          </div>
        </div>
      )}
    </>
  );
}