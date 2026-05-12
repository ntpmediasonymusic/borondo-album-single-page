import { ArrowUpRight } from "lucide-react";
import logo5020 from "../../imports/5020rcrds_LOGOS_PNG-05_(2).png";

const SHOPIFY_URL = "https://shopify.com";

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-white border-t border-black/10 pt-14 pb-10"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Column 1 — Brand */}
          <div>
            <button
              onClick={scrollToTop}
              className="hover:opacity-50 transition-opacity text-left group"
            >
              {/* B monogram + wordmark */}
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-[22px] h-[22px] flex items-center justify-center border border-black flex-shrink-0">
                  <span
                    style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontWeight: 900,
                      fontSize: "0.7rem",
                      lineHeight: 1,
                    }}
                  >
                    B
                  </span>
                </div>
                <span
                  className="text-black"
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Borondo
                </span>
              </div>
              <p
                className="text-[#3d3d3d] text-base tracking-widest uppercase mt-2"
                style={{ fontWeight: 500 }}
              >
                Beéle · Álbum 2025
              </p>
            </button>

            {/* 5020 RCRDS logo */}
            <div className="mt-6">
              <img
                src={logo5020}
                alt="5020 RCRDS"
                className="opacity-40 hover:opacity-70 transition-opacity"
                style={{ height: 28, width: "auto" }}
              />
            </div>
          </div>

          {/* Column 2 — Navigation links */}
          <div className="flex flex-col gap-3">
            {[
              { label: "Tracks", id: "tracks" },
              { label: "Videos", id: "videos" },
              { label: "Stickers", id: "stickers" },
              { label: "Merch", id: "merch" },
              { label: "Comunidad", id: "registro" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-[#3d3d3d] hover:text-black transition-colors text-base tracking-widest uppercase"
                style={{ fontWeight: 500 }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Column 3 — External + misc */}
          <div className="flex flex-col gap-3">
            <a
              href={SHOPIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#3d3d3d] hover:text-black transition-colors text-base tracking-widest uppercase"
              style={{ fontWeight: 500 }}
            >
              Tienda Oficial
              <ArrowUpRight size={12} />
            </a>
            <a
              href="https://wing.co"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#3d3d3d] hover:text-black transition-colors text-base tracking-widest uppercase"
              style={{ fontWeight: 500 }}
            >
              Wyng
              <ArrowUpRight size={12} />
            </a>
            <a
              href="https://www.youtube.com/@beele"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#3d3d3d] hover:text-black transition-colors text-base tracking-widest uppercase"
              style={{ fontWeight: 500 }}
            >
              YouTube
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-black/10 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[#3d3d3d] text-base tracking-wider">
            © {year} Beéle / Borondo. Todos los derechos reservados.
          </p>

          {/* Beyonder credit + label */}
          <div className="flex items-center gap-4">
            <p className="text-[#3d3d3d] text-base tracking-wider">
              Desarrollado por{" "}
              <span
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Beyonder
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}