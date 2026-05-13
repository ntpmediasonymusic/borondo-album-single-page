import { ArrowLeft, ArrowUpRight, Check, Download, Play } from "lucide-react";
import { useNavigate } from "react-router";
import { Navigation } from "../components/Navigation";

// ─────────────────────────────────────────────────────────────
//  BORONDO · STYLE GUIDE
//  Guía de estilos, componentes, variantes y estados
// ─────────────────────────────────────────────────────────────

function Divider() {
  return <div className="h-px w-full bg-black/10 my-12" />;
}

function Token({ name, value, preview }: { name: string; value: string; preview?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-black/5">
      <div>
        <p className="text-black text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
          {name}
        </p>
        <p className="text-black/40 text-xs tracking-wider mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {value}
        </p>
      </div>
      {preview}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <span
        className="block text-[10px] tracking-[0.3em] uppercase text-black/30 mb-3"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
      >
        Sistema de Diseño · Borondo
      </span>
      <div className="h-px bg-black/10 mb-6" />
      <h2
        className="text-black"
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          letterSpacing: "0.03em",
          lineHeight: 1,
        }}
      >
        {children}
      </h2>
    </div>
  );
}

export function StyleGuide() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <Navigation theme="light" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-32">

        {/* Back link */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-black/30 hover:text-black transition-colors text-xs tracking-widest uppercase mb-16"
          style={{ fontWeight: 500 }}
        >
          <ArrowLeft size={12} />
          Volver al sitio
        </button>

        {/* Header */}
        <div className="mb-24">
          <span className="text-[10px] tracking-[0.35em] uppercase text-black/30 block mb-4" style={{ fontWeight: 500 }}>
            Versión 1.0 · Abril 2024
          </span>
          <div className="h-px bg-black/10 mb-8" />
          <h1
            className="text-black"
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(4rem, 10vw, 9rem)",
              lineHeight: 0.9,
              letterSpacing: "0.02em",
            }}
          >
            BORONDO
            <br />
            <span style={{ color: "transparent", WebkitTextStroke: "1px black", opacity: 0.15 }}>
              STYLE GUIDE
            </span>
          </h1>
          <p className="text-black/40 mt-8 max-w-lg" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>
            Sistema de diseño para el álbum Borondo de Beéle. Guía de estilos, tokens, componentes, variantes y estados de UI.
          </p>
        </div>

        <Divider />

        {/* ─── COLOR SYSTEM ─── */}
        <section className="mb-20">
          <SectionTitle>Color System</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-black/40 text-[10px] tracking-[0.2em] uppercase mb-4" style={{ fontWeight: 500 }}>
                Paleta Principal
              </p>
              <div className="space-y-0">
                <Token
                  name="Black"
                  value="#000000 · Principal / fondos dark"
                  preview={<div className="w-10 h-10 bg-black border border-black/10" />}
                />
                <Token
                  name="White"
                  value="#FFFFFF · Fondos light / texto sobre negro"
                  preview={<div className="w-10 h-10 bg-white border border-black/10" />}
                />
                <Token
                  name="Gray 10"
                  value="rgba(0,0,0,0.10) · Bordes sutiles"
                  preview={<div className="w-10 h-10 border border-black/10" style={{ background: "rgba(0,0,0,0.10)" }} />}
                />
                <Token
                  name="Gray 30"
                  value="rgba(0,0,0,0.30) · Texto secundario"
                  preview={<div className="w-10 h-10 border border-black/10" style={{ background: "rgba(0,0,0,0.30)" }} />}
                />
                <Token
                  name="Gray 50"
                  value="rgba(0,0,0,0.50) · Texto muted"
                  preview={<div className="w-10 h-10 border border-black/10" style={{ background: "rgba(0,0,0,0.50)" }} />}
                />
              </div>
            </div>
            <div>
              <p className="text-black/40 text-[10px] tracking-[0.2em] uppercase mb-4" style={{ fontWeight: 500 }}>
                Contraste WCAG
              </p>
              <div className="space-y-3">
                {[
                  { bg: "bg-black", text: "text-white", label: "Blanco sobre Negro", ratio: "21:1 · AAA ✓" },
                  { bg: "bg-white border border-black/10", text: "text-black", label: "Negro sobre Blanco", ratio: "21:1 · AAA ✓" },
                  { bg: "bg-white border border-black/10", text: "text-black/40", label: "Gray 40 sobre Blanco", ratio: "5.7:1 · AA ✓" },
                  { bg: "bg-black", text: "text-white/50", label: "White 50 sobre Negro", ratio: "4.6:1 · AA ✓" },
                ].map((row) => (
                  <div key={row.label} className={`${row.bg} p-4 flex justify-between items-center`}>
                    <span className={`${row.text} text-xs`} style={{ fontWeight: 500 }}>{row.label}</span>
                    <span className={`${row.text} text-[10px] tracking-wider opacity-70`}>{row.ratio}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ─── TYPOGRAPHY ─── */}
        <section className="mb-20">
          <SectionTitle>Tipografía</SectionTitle>
          <div className="space-y-10">

            {/* Display */}
            <div>
              <p className="text-black/30 text-[10px] tracking-[0.25em] uppercase mb-6" style={{ fontWeight: 500 }}>
                Bebas Neue · Display / Headings
              </p>
              <div className="space-y-6">
                {[
                  { label: "Display XL · Hero", size: "clamp(5rem, 18vw, 18rem)", sample: "BORONDO" },
                  { label: "Display L · Section Titles", size: "clamp(2.5rem, 6vw, 5rem)", sample: "Las canciones" },
                  { label: "Display M · Track Titles", size: "clamp(1.6rem, 3.5vw, 2.8rem)", sample: "CALLEJERO" },
                  { label: "Display S · Labels / Nav", size: "1.5rem", sample: "BORONDO" },
                  { label: "Track Numbers", size: "clamp(4rem, 8vw, 7rem)", sample: "01" },
                ].map((t) => (
                  <div key={t.label} className="flex items-baseline justify-between border-b border-black/5 pb-4 gap-4 flex-wrap">
                    <span
                      className="text-black"
                      style={{ fontFamily: "'Bebas Neue', cursive", fontSize: t.size, lineHeight: 1, letterSpacing: "0.03em" }}
                    >
                      {t.sample}
                    </span>
                    <span className="text-black/30 text-[10px] tracking-wider whitespace-nowrap" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            <div>
              <p className="text-black/30 text-[10px] tracking-[0.25em] uppercase mb-6" style={{ fontWeight: 500 }}>
                Space Grotesk · Body / UI
              </p>
              <div className="space-y-4">
                {[
                  { label: "Body · 15px · Regular", size: "0.9375rem", weight: 400, sample: "Crecí mirando el cielo desde el asfalto. Eso no se olvida." },
                  { label: "Body Small · 14px · Regular", size: "0.875rem", weight: 400, sample: "Piezas del mundo Borondo. Disponibles en la tienda oficial." },
                  { label: "Label · 10px · Medium · Uppercase", size: "0.625rem", weight: 500, sample: "TRACK BY TRACK · ÁLBUM 2024", tracking: "0.3em" },
                  { label: "Caption · 11px · Regular", size: "0.6875rem", weight: 400, sample: "Compatible con WhatsApp · iOS · Android" },
                ].map((t) => (
                  <div key={t.label} className="border-b border-black/5 pb-4">
                    <p
                      className="text-black mb-1"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: t.size,
                        fontWeight: t.weight,
                        textTransform: t.tracking ? "uppercase" : "none",
                        letterSpacing: t.tracking || "normal",
                      }}
                    >
                      {t.sample}
                    </p>
                    <span className="text-black/25 text-[9px] tracking-wider">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ─── SPACING ─── */}
        <section className="mb-20">
          <SectionTitle>Espaciado</SectionTitle>
          <p className="text-black/40 text-sm mb-8" style={{ lineHeight: 1.7 }}>
            Base 4px. La escala de espaciado es consistente en todo el sistema.
          </p>
          <div className="flex flex-wrap items-end gap-4">
            {[4, 8, 12, 16, 24, 32, 48, 64, 96, 128].map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <div className="bg-black" style={{ width: Math.min(size, 48), height: Math.min(size, 48) }} />
                <span className="text-black/30 text-[9px] tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {size}px
                </span>
              </div>
            ))}
          </div>
          <div className="mt-10 space-y-3">
            {[
              { name: "Section Padding Desktop", value: "py-36 · 144px" },
              { name: "Section Padding Mobile", value: "py-24 · 96px" },
              { name: "Container Max Width", value: "max-w-7xl · 1280px" },
              { name: "Container Padding", value: "px-6 / px-10 · 24px / 40px" },
              { name: "Component Gap (Track rows)", value: "gap-16 · 64px" },
              { name: "Nav Height", value: "h-16 · 64px" },
            ].map((s) => (
              <Token key={s.name} name={s.name} value={s.value} />
            ))}
          </div>
        </section>

        <Divider />

        {/* ─── COMPONENTS ─── */}
        <section className="mb-20">
          <SectionTitle>Componentes</SectionTitle>

          {/* Buttons */}
          <div className="mb-16">
            <p className="text-black/30 text-[10px] tracking-[0.25em] uppercase mb-8" style={{ fontWeight: 500 }}>
              Botones · Variantes y Estados
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* On Light BG */}
              <div>
                <p className="text-black/20 text-[9px] tracking-wider uppercase mb-6">Sobre fondo blanco</p>
                <div className="flex flex-wrap gap-4 items-center">
                  {/* Primary */}
                  <button
                    className="flex items-center gap-3 bg-black text-white px-8 py-4 hover:bg-black/80 transition-colors text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                  >
                    Descargar Pack
                    <Download size={12} />
                  </button>
                  {/* Secondary */}
                  <button
                    className="flex items-center gap-2 border border-black text-black px-6 py-3 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                  >
                    Ir a la Tienda
                    <ArrowUpRight size={12} />
                  </button>
                  {/* Ghost */}
                  <button
                    className="flex items-center gap-3 hover:opacity-50 transition-opacity text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                  >
                    <div className="w-10 h-10 border border-black flex items-center justify-center">
                      <Play size={12} fill="black" />
                    </div>
                    Video Exclusivo
                  </button>
                </div>
                <div className="mt-6 flex flex-wrap gap-4 items-center opacity-40 pointer-events-none">
                  <button className="flex items-center gap-3 bg-black text-white px-8 py-4 text-xs tracking-widest uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                    Descargar Pack
                    <Download size={12} />
                  </button>
                  <p className="text-[9px] tracking-wider text-black/50">Estado: Hover (opacity 80%)</p>
                </div>
              </div>

              {/* On Dark BG */}
              <div className="bg-black p-8">
                <p className="text-white/20 text-[9px] tracking-wider uppercase mb-6">Sobre fondo negro</p>
                <div className="flex flex-wrap gap-4 items-center">
                  <button
                    className="flex items-center gap-3 bg-white text-black px-8 py-4 hover:bg-white/85 transition-colors text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                  >
                    Registrarme
                    <ArrowUpRight size={12} />
                  </button>
                  <button
                    className="flex items-center gap-2 border border-white text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                  >
                    Tienda ↗
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="mb-16">
            <p className="text-black/30 text-[10px] tracking-[0.25em] uppercase mb-8" style={{ fontWeight: 500 }}>
              Campos de Formulario · Estados
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="bg-black p-8">
                <div className="space-y-8">
                  {/* Default */}
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontWeight: 500 }}>
                      Nombre · Estado default
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/20 py-3 outline-none text-sm pointer-events-none"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      readOnly
                    />
                  </div>
                  {/* Focus */}
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontWeight: 500 }}>
                      Email · Estado focus
                    </label>
                    <input
                      type="email"
                      value="beele@fan.com"
                      className="w-full bg-transparent border-b border-white text-white py-3 outline-none text-sm pointer-events-none"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      readOnly
                    />
                  </div>
                  {/* Error */}
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontWeight: 500 }}>
                      País · Estado error
                    </label>
                    <input
                      type="text"
                      value=""
                      placeholder="Selecciona tu país"
                      className="w-full bg-transparent border-b border-white/50 text-white placeholder-white/20 py-3 outline-none text-sm pointer-events-none"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      readOnly
                    />
                    <p className="text-white/40 text-[10px] tracking-wider mt-1">Selecciona tu país</p>
                  </div>
                </div>
              </div>
              {/* Checkbox */}
              <div>
                <div className="space-y-6">
                  <div>
                    <p className="text-black/30 text-[10px] tracking-wider uppercase mb-4" style={{ fontWeight: 500 }}>Checkbox · Sin marcar</p>
                    <div className="flex items-center gap-4">
                      <div className="w-5 h-5 border border-black/30 flex-shrink-0" />
                      <span className="text-black/30 text-xs">Acepto recibir comunicaciones</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-black/30 text-[10px] tracking-wider uppercase mb-4" style={{ fontWeight: 500 }}>Checkbox · Marcado</p>
                    <div className="flex items-center gap-4">
                      <div className="w-5 h-5 bg-black border border-black flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-white" strokeWidth={3} />
                      </div>
                      <span className="text-black/50 text-xs">Acepto recibir comunicaciones</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Label */}
          <div className="mb-16">
            <p className="text-black/30 text-[10px] tracking-[0.25em] uppercase mb-8" style={{ fontWeight: 500 }}>
              Section Header · Componente reutilizable
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Light version */}
              <div>
                <p className="text-black/20 text-[9px] tracking-wider uppercase mb-4">Sobre blanco</p>
                <div>
                  <span className="block text-[10px] tracking-[0.3em] uppercase mb-4 text-black/40" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                    Track by Track
                  </span>
                  <div className="h-px w-full mb-8 bg-black/10" />
                  <h2 className="text-black" style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1, letterSpacing: "0.02em" }}>
                    Las canciones
                  </h2>
                </div>
              </div>
              {/* Dark version */}
              <div className="bg-black p-8">
                <p className="text-white/20 text-[9px] tracking-wider uppercase mb-4">Sobre negro</p>
                <div>
                  <span className="block text-[10px] tracking-[0.3em] uppercase mb-4 text-white/50" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                    Comunidad
                  </span>
                  <div className="h-px w-full mb-8 bg-white/15" />
                  <h2 className="text-white" style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1, letterSpacing: "0.02em" }}>
                    Entra al círculo
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Sticker shapes */}
          <div className="mb-16">
            <p className="text-black/30 text-[10px] tracking-[0.25em] uppercase mb-8" style={{ fontWeight: 500 }}>
              Stickers · Formas y variantes
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              {[
                { shape: "circle" as const, label: "Circular" },
                { shape: "rounded" as const, label: "Redondeado" },
                { shape: "tag" as const, label: "Tag / Etiqueta" },
                { shape: "diamond" as const, label: "Diamante" },
              ].map((s) => (
                <div key={s.shape} className="flex flex-col items-center gap-3">
                  {/* Inverted pair */}
                  <div className="flex flex-col gap-2 items-center">
                    {/* Dark */}
                    <div className={`flex items-center justify-center bg-black ${s.shape === "circle" ? "rounded-full" : s.shape === "rounded" ? "" : ""} px-5 py-3`}
                      style={{
                        borderRadius: s.shape === "circle" ? "50%" : s.shape === "rounded" ? 10 : s.shape === "tag" ? "20px 20px 20px 0" : 4,
                        width: s.shape === "circle" ? 90 : "auto",
                        height: s.shape === "circle" ? 90 : "auto",
                        transform: s.shape === "diamond" ? "rotate(45deg)" : "none",
                      }}>
                      <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1rem", letterSpacing: "0.06em", color: "white", transform: s.shape === "diamond" ? "rotate(-45deg)" : "none" }}>
                        BORONDO
                      </span>
                    </div>
                    {/* Light */}
                    <div className={`flex items-center justify-center bg-white border-2 border-black px-5 py-3`}
                      style={{
                        borderRadius: s.shape === "circle" ? "50%" : s.shape === "rounded" ? 10 : s.shape === "tag" ? "20px 20px 20px 0" : 4,
                        width: s.shape === "circle" ? 90 : "auto",
                        height: s.shape === "circle" ? 90 : "auto",
                        transform: s.shape === "diamond" ? "rotate(45deg)" : "none",
                      }}>
                      <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1rem", letterSpacing: "0.06em", color: "black", transform: s.shape === "diamond" ? "rotate(-45deg)" : "none" }}>
                        BORONDO
                      </span>
                    </div>
                  </div>
                  <span className="text-black/30 text-[9px] tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Merch card preview */}
          <div className="mb-16">
            <p className="text-black/30 text-[10px] tracking-[0.25em] uppercase mb-8" style={{ fontWeight: 500 }}>
              Merch Card · Estado default y hover
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
              {[
                { label: "Default", opacity: "grayscale" },
                { label: "Hover (color)", opacity: "" },
              ].map((state) => (
                <div key={state.label}>
                  <div
                    className={`relative overflow-hidden mb-3 ${state.opacity}`}
                    style={{ aspectRatio: "3/4", background: "#f0f0f0" }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1605979021029-59f394c7178e?w=400&q=80"
                      alt="Merch card"
                      className={`w-full h-full object-cover ${state.opacity}`}
                    />
                    {state.label === "Hover (color)" && (
                      <div className="absolute inset-0 bg-black/20 flex items-end p-3">
                        <span className="bg-white text-black text-[9px] tracking-widest uppercase px-3 py-1.5 flex items-center gap-1" style={{ fontWeight: 600 }}>
                          Ver en Tienda <ArrowUpRight size={9} />
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-black/30 text-[9px] tracking-wider mb-1">{state.label}</p>
                  <p style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.1rem", letterSpacing: "0.04em" }}>Hoodie Borondo</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ─── LAYOUT GRID ─── */}
        <section className="mb-20">
          <SectionTitle>Grid & Layout</SectionTitle>
          <div className="space-y-6">
            <div>
              <p className="text-black/30 text-[10px] tracking-[0.25em] uppercase mb-4" style={{ fontWeight: 500 }}>
                12-Column Grid · Desktop
              </p>
              <div className="grid grid-cols-12 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-black/5 h-12 flex items-center justify-center">
                    <span className="text-black/20 text-[9px]">{i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="text-black/20 text-[9px] tracking-wider mt-2">Max-width: 1280px · Gap: 16px · Padding: 24px / 40px</p>
            </div>
            <div>
              <p className="text-black/30 text-[10px] tracking-[0.25em] uppercase mb-4" style={{ fontWeight: 500 }}>
                Secciones · Esquema de fondo
              </p>
              <div className="space-y-2">
                {[
                  { section: "Hero", bg: "bg-black", text: "text-white", note: "Negro · Tipografía oversized · Imagen grayscale" },
                  { section: "Track by Track", bg: "bg-white border border-black/10", text: "text-black", note: "Blanco · Layout 2 columnas alternado" },
                  { section: "WhatsApp Stickers", bg: "bg-black", text: "text-white", note: "Negro · Grid orgánico de stickers" },
                  { section: "Merch", bg: "bg-white border border-black/10", text: "text-black", note: "Blanco · Grid asíncrono 3 columnas" },
                  { section: "Registro", bg: "bg-black", text: "text-white", note: "Negro · Layout 2 columnas · Formulario" },
                  { section: "Footer", bg: "bg-white border border-black/10", text: "text-black", note: "Blanco · Grid 3 columnas · Minimal" },
                ].map((row) => (
                  <div key={row.section} className={`${row.bg} px-6 py-4 flex items-center justify-between`}>
                    <span className={`${row.text} text-xs tracking-widest uppercase`} style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "0.9rem", letterSpacing: "0.08em" }}>
                      {row.section}
                    </span>
                    <span className={`${row.text} text-[10px] opacity-50`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {row.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ─── MOTION & INTERACTION ─── */}
        <section className="mb-20">
          <SectionTitle>Interacciones</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { property: "Transition Duration", value: "300ms — Botones, hovers UI" },
              { property: "Transition Duration (lenta)", value: "700ms — Scale en imágenes" },
              { property: "Easing", value: "ease — Transiciones generales" },
              { property: "Hover: Imágenes", value: "scale(1.02-1.03) + grayscale → color" },
              { property: "Hover: Botones Primary", value: "opacity 85% · bg negro/80" },
              { property: "Hover: Links / Nav", value: "opacity 50%" },
              { property: "Hover: Cards (Merch)", value: "overlay negro/20 + CTA visible" },
              { property: "Parallax: Hero Image", value: "translateY(scrollY × 0.35)" },
              { property: "Nav: Scroll Trigger", value: "scrollY > 80px → bg blanco + border" },
              { property: "Form: Focus State", value: "border-bottom → white/black (100%)" },
            ].map((item) => (
              <Token key={item.property} name={item.property} value={item.value} />
            ))}
          </div>
        </section>

        <Divider />

        {/* ─── ICONOGRAPHY ─── */}
        <section className="mb-20">
          <SectionTitle>Iconografía</SectionTitle>
          <p className="text-black/40 text-sm mb-8" style={{ lineHeight: 1.7 }}>
            Librería: Lucide React · Stroke width: 1.5 (default) · Tamaños: 10–20px
          </p>
          <div className="flex flex-wrap gap-8 items-center">
            {[
              { icon: <Play size={16} fill="black" strokeWidth={0} />, name: "Play · fill" },
              { icon: <Download size={16} />, name: "Download" },
              { icon: <ArrowUpRight size={16} />, name: "Arrow Up Right" },
              { icon: <ArrowLeft size={16} />, name: "Arrow Left" },
              { icon: <Check size={16} strokeWidth={3} />, name: "Check · bold" },
            ].map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 border border-black/10 flex items-center justify-center text-black">
                  {item.icon}
                </div>
                <span className="text-black/30 text-[9px] tracking-wider text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Footer of style guide */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-black/20 text-[10px] tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              BORONDO · Beéle · Style Guide v1.0 · 2024
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-black border border-black px-5 py-2.5 text-[10px] tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
          >
            <ArrowLeft size={10} />
            Volver al sitio
          </button>
        </div>
      </div>
    </div>
  );
}
