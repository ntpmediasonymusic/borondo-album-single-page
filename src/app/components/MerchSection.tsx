import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionLabel";
import artistWalking from "../../imports/download-2.jpg";

const SHOPIFY_URL = "https://shopify.com"; // Replace with actual Shopify store URL

interface MerchProduct {
  id: number;
  name: string;
  category: string;
  image: string;
  size: "large" | "medium" | "small";
}

const PRODUCTS: MerchProduct[] = [
  {
    id: 1,
    name: "Hoodie Borondo",
    category: "Sudaderas",
    image:
      "https://images.unsplash.com/photo-1605979021029-59f394c7178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    size: "large",
  },
  {
    id: 2,
    name: "Camiseta Callejero",
    category: "Camisetas",
    image:
      "https://images.unsplash.com/photo-1650024691730-927f83674032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    size: "medium",
  },
  {
    id: 3,
    name: "Cap Borondo",
    category: "Accesorios",
    image:
      "https://images.unsplash.com/photo-1625988359400-52abbc745748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    size: "medium",
  },
];

interface MerchCardProps {
  product: MerchProduct;
}

function MerchCard({ product }: MerchCardProps) {
  return (
    <a
      href={SHOPIFY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label={`Ver ${product.name} en la tienda`}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden bg-black/5 mb-4"
        style={{ aspectRatio: product.size === "large" ? "3/4" : "4/5" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
        />
        {/* Hover CTA overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end p-5">
          <span
            className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 bg-white text-black px-4 py-2 text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
          >
            Ver en Tienda
            <ArrowUpRight size={12} />
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start justify-between">
        <div>
          <p
            className="text-[#3d3d3d] text-base tracking-[0.2em] uppercase mb-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
          >
            {product.category}
          </p>
          <h3
            className="text-black group-hover:opacity-50 transition-opacity"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {product.name}
          </h3>
        </div>
        <ArrowUpRight
          size={16}
          className="text-black/20 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1"
        />
      </div>
    </a>
  );
}

export function MerchSection() {
  return (
    <section
      id="merch"
      className="bg-white py-24 lg:py-36"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header with asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <SectionHeader label="Merch" title="La colección" />
          </div>
          <div className="flex items-end pb-4">
            <div>
              <p
                className="text-[#3d3d3d] mb-6 max-w-xs"
                style={{ fontSize: "1rem", lineHeight: 1.7 }}
              >
                Piezas del mundo Borondo. Cada producto, disponible en la tienda oficial.
              </p>
              <a
                href={SHOPIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-black px-6 py-3 text-base tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                style={{ fontWeight: 600 }}
              >
                Ir a la Tienda
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Editorial artist banner + product grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-end mb-12">

          {/* Large editorial image — artist walking — 2 cols */}
          <div className="lg:col-span-2">
            <a
              href={SHOPIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative overflow-hidden"
              style={{ aspectRatio: "3/4" }}
              aria-label="Ver colección en la tienda"
            >
              <img
                src={artistWalking}
                alt="Beéle — Borondo Merch"
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-[1.02]"
              />
              {/* Editorial text overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="bg-black/0 group-hover:bg-black/30 transition-colors duration-300 absolute inset-0" />
                <div className="relative z-10">
                  <p
                    className="text-white/0 group-hover:text-white/80 transition-all duration-300 text-base tracking-widest uppercase mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                  >
                    Beéle · Borondo
                  </p>
                  <p
                    className="text-white/0 group-hover:text-white transition-all duration-300 flex items-center gap-2 text-base tracking-widest uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                  >
                    Ver Colección
                    <ArrowUpRight size={10} />
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* Product cards — 3 cols */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:items-end">
            {PRODUCTS.map((product, i) => (
              <div
                key={product.id}
                className={i === 1 ? "sm:mt-10" : i === 2 ? "sm:-mt-4" : ""}
              >
                <MerchCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="h-px bg-black/10 mb-6" />
        <p
          className="text-black/30 text-base tracking-wider"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          La tienda oficial de Borondo es operada por una plataforma externa. Serás redirigido al momento de hacer clic.
        </p>
      </div>
    </section>
  );
}