import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowUpRight, X, ZoomIn } from "lucide-react";
import { SectionHeader } from "./SectionLabel";
import { RevealOnScroll } from "./RevealOnScroll";
import vinyl1 from "../../imports/merch/borondo-vinyl/borondo-vinyl-1.jpg";
import vinyl2 from "../../imports/merch/borondo-vinyl/borondo-vinyl-2.jpg";
import vinyl3 from "../../imports/merch/borondo-vinyl/borondo-vinyl-3.jpg";
import vinyl4 from "../../imports/merch/borondo-vinyl/borondo-vinyl-4.jpg";

interface MerchProduct {
  id: string;
  category: string;
  title: string;
  description: string;
  descriptionExtra: string;
  images: string[];
  imageAlts: string[];
  productUrl: string;
}

const merchProducts: MerchProduct[] = [
  {
    id: "borondo-vinyl",
    category: "Vinyl",
    title: "Beéle — BORONDO 2LP Vinyl",
    description:
      "Edición en vinilo 2LP de BORONDO, el universo musical de Beéle reunido en formato físico. Incluye canciones como 'Anhélame', 'Nadie', 'Miss You', 'Hotel', 'Sobelove', 'Borondo', 'Morenita', 'Hasta Aquí Llegué' y más tracks del álbum.",
    descriptionExtra:
      "Tracklist: Anhélame · Qué Te Va Bien · Nadie · Eno x Cora · Miss You · Hotel · Un Celu Por Favor · Borondo · Sobelove · En Lo Mío · Estrella Fugaz · Bye · Ya Que · Fine and Space · Algo Bueno · Morenita · Hasta Aquí Llegué + Bonus Track",
    images: [vinyl1, vinyl2, vinyl3, vinyl4],
    imageAlts: [
      "Portada del vinilo Beéle BORONDO",
      "Contraportada del vinilo Beéle BORONDO",
      "Detalle del disco vinilo Beéle BORONDO",
      "Contenido interior del vinilo Beéle BORONDO",
    ],
    productUrl:
      "https://vinyl.sonymusic.com/?srsltid=AfmBOooUVVN6zNU4UGCwW3aZygTbuYaX38Vc48kCB1yUQevFN-pLZiUN",
  },
];

// ─── Feature layout (single product) ────────────────────────────────────────

function FeatureProduct({ product }: { product: MerchProduct }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const userInteracted = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const selectImage = useCallback((index: number, manual = false) => {
    setActiveIndex(index);
    if (manual) {
      userInteracted.current = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, []);

  // Auto-rotate every 4 s, stops on manual interaction
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!userInteracted.current) {
        setActiveIndex((prev) => (prev + 1) % product.images.length);
      }
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [product.images.length]);

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

        {/* ── Gallery (3/5 cols) ── */}
        <RevealOnScroll animation="fade-right" className="lg:col-span-3 flex flex-col gap-4 justify-center align-middle items-center">

          {/* Main image */}
          <button
            type="button"
            className="relative w-full max-w-md aspect-square bg-black overflow-hidden group cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            onClick={() => setLightboxOpen(true)}
            aria-label={`Ver imagen ampliada: ${product.imageAlts[activeIndex]}`}
          >
            <img
              src={product.images[activeIndex]}
              alt={product.imageAlts[activeIndex]}
              className="w-full h-full object-contain transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn
                size={28}
                className="text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 drop-shadow-lg"
              />
            </div>
          </button>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((src, i) => (
              <button
                type="button"
                key={i}
                onClick={() => selectImage(i, true)}
                aria-pressed={activeIndex === i ? "true" : "false"}
                aria-label={product.imageAlts[i]}
                className={`relative aspect-square overflow-hidden bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black transition-opacity duration-200 ${
                  activeIndex === i
                    ? "ring-2 ring-black opacity-100"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <img
                  src={src}
                  alt={product.imageAlts[i]}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* ── Product info (2/5 cols) ── */}
        <RevealOnScroll animation="fade-left" delay={200} className="lg:col-span-2 flex flex-col gap-6 lg:pt-2">

          {/* Category */}
          <span
            className="text-[#3d3d3d] tracking-[0.25em] uppercase text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
          >
            {product.category}
          </span>

          {/* Title */}
          <h2
            className="text-black leading-none"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {product.title}
          </h2>

          {/* Divider */}
          <div className="h-px bg-black/10 w-full" />

          {/* Description */}
          <div>
            <p
              className="text-[#3d3d3d] leading-relaxed"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem" }}
            >
              {product.description}
            </p>

            {/* Expandable tracklist */}
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: expanded ? "200px" : "0px" }}
            >
              <p
                className="text-[#3d3d3d]/70 leading-relaxed mt-4 text-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {product.descriptionExtra}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 text-sm tracking-widest uppercase underline underline-offset-4 text-black/50 hover:text-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
            >
              {expanded ? "Ver menos" : "Ver más"}
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-black/10 w-full" />

          {/* CTA */}
          <a
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ir a la tienda oficial para comprar ${product.title}`}
            className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-black/80 active:bg-black/90 transition-colors w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
          >
            IR A LA TIENDA
            <ArrowUpRight size={16} />
          </a>

          {/* Disclaimer */}
          <p
            className="text-black/35 text-xs leading-relaxed"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            La tienda oficial de Beéle es operada por una plataforma externa. Serás redirigido al hacer clic.
          </p>
        </RevealOnScroll>
      </div>

      {/* ── Lightbox modal ── */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={product.imageAlts[activeIndex]}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Cerrar imagen"
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={24} />
          </button>

          <img
            src={product.images[activeIndex]}
            alt={product.imageAlts[activeIndex]}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

// ─── Grid layout (multiple products) ────────────────────────────────────────

function ProductGrid({ products }: { products: MerchProduct[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <a
          key={product.id}
          href={product.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ir a la tienda para comprar ${product.title}`}
          className="group flex flex-col gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          <div
            className="w-full bg-black overflow-hidden"
            style={{ aspectRatio: "1 / 1" }}
          >
            <img
              src={product.images[0]}
              alt={product.imageAlts[0]}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex items-start justify-between">
            <div>
              <p
                className="text-[#3d3d3d] text-xs tracking-[0.25em] uppercase mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
              >
                {product.category}
              </p>
              <p
                className="text-black text-sm tracking-[0.1em] uppercase"
                style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 700 }}
              >
                {product.title}
              </p>
            </div>
            <ArrowUpRight
              size={16}
              className="text-black/20 group-hover:text-black transition-colors mt-0.5"
            />
          </div>
        </a>
      ))}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function MerchSection() {
  const isSingle = merchProducts.length === 1;

  return (
    <section
      id="merch"
      className="bg-white py-24 lg:py-36"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <RevealOnScroll animation="fade-up">
          <SectionHeader label="Merch" title="La colección" />
        </RevealOnScroll>

        {isSingle ? (
          <FeatureProduct product={merchProducts[0]} />
        ) : (
          <>
            <ProductGrid products={merchProducts} />
            <div className="mt-12 h-px bg-black/10" />
            <p
              className="mt-6 text-black/30 text-xs tracking-wider"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              La tienda oficial de Beéle es operada por una plataforma externa. Serás redirigido al hacer clic.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
