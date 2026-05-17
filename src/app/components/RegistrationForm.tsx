import { ArrowRight, Check, Loader2 } from "lucide-react";
import { SectionHeader } from "./SectionLabel";
import { RevealOnScroll } from "./RevealOnScroll";
import { useSMFRegistration } from "@/app/hooks/useSMFRegistration";
import { COUNTRIES } from "./registrationCountries";
import artistPortrait from "../../imports/image-1.png";

export function RegistrationForm() {
  const { form, submitted, submitting, errors, submitError, showSuccess, handleSubmit, update } =
    useSMFRegistration();

  return (
    <section
      id="registro"
      className="bg-black py-24 lg:py-36 relative overflow-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Artist portrait — faded background element, right side */}
      <div
        className="absolute right-0 top-0 bottom-0 w-full md:w-[45%] pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src={artistPortrait}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top"
          style={{
            filter: "grayscale(100%) contrast(1.1)",
            opacity: 0.07,
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 90%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 90%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <RevealOnScroll animation="fade-right">
            <SectionHeader
              label="Comunidad"
              title="Únete a la comunidad"
              light
            />
            <p
              className="text-white/70 max-w-sm"
              style={{ fontSize: "1rem", lineHeight: 1.8 }}
            >
              Primero en saber. Primero en estar. Registra tu correo y forma
              parte de lo que viene después de Borondo.
            </p>

            {/* Visual detail */}
            <div className="mt-12 hidden lg:block">
              <div
                className="text-white/[0.04] select-none"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 900,
                  fontSize: "10rem",
                  lineHeight: 1,
                  letterSpacing: "0.05em",
                }}
                aria-hidden="true"
              >
                B
              </div>
            </div>
          </RevealOnScroll>

          {/* Right: form */}
          <RevealOnScroll animation="fade-left" delay={200}>
            {submitted ? (
              /* Success state — animated */
              <div
                className="py-16 flex flex-col items-start gap-6"
                style={{
                  opacity: showSuccess ? 1 : 0,
                  transform: showSuccess ? "translateY(0)" : "translateY(2rem)",
                  transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
                }}
              >
                <div
                  className="w-12 h-12 border border-white flex items-center justify-center"
                  style={{
                    opacity: showSuccess ? 1 : 0,
                    transform: showSuccess ? "scale(1)" : "scale(0.5)",
                    transition:
                      "opacity 0.5s ease-out 0.15s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.15s",
                  }}
                >
                  <Check size={18} className="text-white" />
                </div>
                <div
                  style={{
                    opacity: showSuccess ? 1 : 0,
                    transform: showSuccess ? "translateY(0)" : "translateY(1rem)",
                    transition: "opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s",
                  }}
                >
                  <h3
                    className="text-white mb-2"
                    style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "2rem",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Listo, {form.nombre.split(" ")[0]}.
                  </h3>
                  <p className="text-white/65" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
                    Ya eres parte. Te avisamos cuando haya algo nuevo.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white/75 text-base tracking-[0.2em] uppercase mb-2 font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 py-3 outline-none focus:border-white transition-colors text-base"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm tracking-wider mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Nombre */}
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-white/75 text-base tracking-[0.2em] uppercase mb-2 font-medium"
                  >
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    value={form.nombre}
                    onChange={(e) => update("nombre", e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 py-3 outline-none focus:border-white transition-colors text-base"
                    aria-invalid={Boolean(errors.nombre)}
                  />
                  {errors.nombre && (
                    <p className="text-red-400 text-sm tracking-wider mt-1">{errors.nombre}</p>
                  )}
                </div>

                {/* Apellido */}
                <div>
                  <label
                    htmlFor="apellido"
                    className="block text-white/75 text-base tracking-[0.2em] uppercase mb-2 font-medium"
                  >
                    Apellido
                  </label>
                  <input
                    id="apellido"
                    type="text"
                    value={form.apellido}
                    onChange={(e) => update("apellido", e.target.value)}
                    placeholder="Tu apellido"
                    className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 py-3 outline-none focus:border-white transition-colors text-base"
                    aria-invalid={Boolean(errors.apellido)}
                  />
                  {errors.apellido && (
                    <p className="text-red-400 text-sm tracking-wider mt-1">{errors.apellido}</p>
                  )}
                </div>

                {/* País */}
                <div>
                  <label
                    htmlFor="pais"
                    className="block text-white/75 text-base tracking-[0.2em] uppercase mb-2 font-medium"
                  >
                    País
                  </label>
                  <div className="relative">
                    <select
                      id="pais"
                      value={form.pais}
                      onChange={(e) => update("pais", e.target.value)}
                      className={`w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition-colors text-base appearance-none cursor-pointer ${
                        form.pais ? "text-white" : "text-[rgba(255,255,255,0.2)]"
                      }`}
                      aria-invalid={Boolean(errors.pais)}
                    >
                      <option value="" className="bg-black text-[rgba(255,255,255,0.4)]">
                        Selecciona tu país
                      </option>
                      {COUNTRIES.map((c) => (
                        <option key={c.value} value={c.value} className="bg-black text-white">
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                      ↓
                    </div>
                  </div>
                  {errors.pais && (
                    <p className="text-red-400 text-sm tracking-wider mt-1">{errors.pais}</p>
                  )}
                </div>

                {/* Consent */}
                <div className="pt-2">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div
                      onClick={() => update("consent", !form.consent)}
                      className={`w-5 h-5 mt-0.5 border flex-shrink-0 flex items-center justify-center transition-colors ${
                        form.consent ? "bg-white border-white" : "border-white/30 hover:border-white/60"
                      }`}
                    >
                      {form.consent && <Check size={11} className="text-black" strokeWidth={3} />}
                    </div>
                    <span className="text-white/65 text-base leading-relaxed">
                      Acepto recibir comunicaciones de Beéle / Borondo. Puedo cancelar
                      en cualquier momento.{" "}
                      <a
                        href="https://www.sonymusic.com/privacy-policy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white transition-colors"
                      >
                        Ver política de privacidad.
                      </a>
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-red-400 text-sm tracking-wider mt-1 ml-9">{errors.consent}</p>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-3 bg-white text-black px-8 py-4 hover:bg-white/85 transition-colors group w-full sm:w-auto justify-center sm:justify-start disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span className="text-base tracking-widest uppercase" style={{ fontWeight: 600 }}>
                          Enviando...
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-base tracking-widest uppercase" style={{ fontWeight: 600 }}>
                          Registrarme
                        </span>
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>

                  {submitError && (
                    <p className="text-red-400 text-sm tracking-wider mt-3">{submitError}</p>
                  )}
                </div>
              </form>
            )}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
