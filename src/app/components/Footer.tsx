import { ArrowUpRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import logo5020 from "../../imports/5020rcrds_LOGOS_PNG-05_(2).png";
import { RevealOnScroll } from "./RevealOnScroll";

const SHOPIFY_URL = "https://shopify.com";

const socialLinks = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/intl-es/artist/7a0XAaPaK2aDSqa8p3QnC7",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com/mx/artist/be%C3%A9le/1470139605",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.029 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/beele/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12c0 3.259.014 3.668.072 4.948.132 1.278.333 2.148.63 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.132 2.148-.333 2.913-.63.788-.306 1.459-.717 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.635.558-2.913.06-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.132-1.277-.332-2.149-.63-2.914-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@beele",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/channel/UCYAQgXVSRzUeNo34-RJOWUw",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/beelemusica",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

const legalLinks = [
  { label: "Send Us Feedback", href: "https://www.sonymusic.com/feedback/" },
  { label: "Privacy Policy", href: "https://www.sonymusic.com/privacy-policy/" },
  { label: "How We Use Your Data", href: "https://www.sonymusic.com/how-we-use-your-data/" },
  { label: "Do Not Sell My Personal Information", href: "https://www.sonymusic.com/ccpa-contact-form/" },
  { label: "Your California Privacy Rights", href: "https://www.sonymusic.com/privacy-policy/#your-california-privacy-rights" },
  { label: "Terms and Conditions", href: "https://www.sonymusic.com/terms-and-conditions/" },
];

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-white border-t border-black/10 pt-12 pb-10"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Social media icons row */}
      <RevealOnScroll animation="fade-up" className="mb-12 flex items-center justify-center gap-7 flex-wrap">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="text-[#3d3d3d] hover:text-black transition-colors"
          >
            {link.icon}
          </a>
        ))}
      </RevealOnScroll>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <RevealOnScroll animation="fade-up" delay={100} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start items-center">

          {/* Column 1 — Brand */}
          <div>
            <button
              onClick={scrollToTop}
              className="hover:opacity-50 transition-opacity text-left group"
            >
              <div className="flex items-center gap-2 mb-1">
                {/* <div className="w-[22px] h-[22px] flex items-center justify-center border border-black flex-shrink-0">
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
                </div> */}
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
            <div className="mt-2">
              <img
                src={logo5020}
                alt="5020 RCRDS"
                loading="lazy"
                decoding="async"
                className="opacity-40 hover:opacity-70 transition-opacity"
                style={{ height: 28, width: "auto" }}
              />
            </div>
          </div>

          {/* Column 2 — Navigation links */}
          <div className="flex flex-row flex-wrap justify-between">
            {[
              { label: "Merch", id: "merch" },
              { label: "Tracks", id: "tracks" },
              { label: "Videos", id: "videos" },
              { label: "Stickers", id: "stickers" },
              // { label: "Comunidad", id: "registro" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className="text-left text-[#3d3d3d] hover:text-black transition-colors text-base tracking-widest uppercase cursor-pointer"
                style={{ fontWeight: 500 }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Sony Music legal */}
        <RevealOnScroll animation="fade-in" delay={200} className="mt-6 pt-6 border-t border-black/10">
          <p className="text-black text-xs leading-relaxed text-center mb-4">
            © {year}{" "}
            <a
              href="https://www.sonymusic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-black transition-colors underline-offset-2 hover:underline"
            >
              Sony Music Entertainment
            </a>
            . All Rights Reserved.{" "}
            {legalLinks.map((link, i) => (
              <span key={link.href}>
                {i > 0 && <span className="mx-1 text-black/20">|</span>}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black transition-colors underline-offset-2 hover:underline"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </p>
        </RevealOnScroll>
        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[#3d3d3d] text-sm tracking-wider">
          </p>

          {/* Beyonder credit */}
          <p className="text-[#3d3d3d] text-xs tracking-wider">
            Desarrollado por{" "}
            <a
              href="https://beyonderagency.com/en-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Beyonder
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
