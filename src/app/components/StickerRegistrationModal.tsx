import { useEffect, useRef } from "react";
import { X, Check, Loader2, ArrowRight } from "lucide-react";
import { useSMFRegistration } from "@/app/hooks/useSMFRegistration";
import { COUNTRIES } from "./registrationCountries";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccessComplete: () => void;
}

export function StickerRegistrationModal({ isOpen, onClose, onSuccessComplete }: Props) {
  const successCallbackRef = useRef(onSuccessComplete);
  successCallbackRef.current = onSuccessComplete;

  const { form, submitted, submitting, errors, submitError, showSuccess, handleSubmit, update } =
    useSMFRegistration();

  // After success: wait 3 s then trigger download and close
  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => {
      onClose();
      successCallbackRef.current();
    }, 3000);
    return () => clearTimeout(t);
  }, [submitted, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitted) onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, submitted, onClose]);

  // Prevent background scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sticker-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={!submitted ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal box */}
      <div
        className="relative z-10 bg-white w-full max-w-md max-h-[90vh] overflow-y-auto"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-0">
          <div>
            <p
              className="text-black/40 text-xs tracking-[0.25em] uppercase mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Newsletter Beéle
            </p>
            <h2
              id="sticker-modal-title"
              className="text-black"
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 800,
                fontSize: "1.4rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Regístrate para descargar
            </h2>
          </div>
          {!submitted && (
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="ml-4 mt-0.5 text-black/40 hover:text-black transition-colors flex-shrink-0"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="p-6">
          {submitted ? (
            /* ── Success state ── */
            <div
              className="py-6 flex flex-col items-start gap-4"
              style={{
                opacity: showSuccess ? 1 : 0,
                transform: showSuccess ? "translateY(0)" : "translateY(1rem)",
                transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
              }}
            >
              <div
                className="w-10 h-10 border border-black flex items-center justify-center"
                style={{
                  opacity: showSuccess ? 1 : 0,
                  transform: showSuccess ? "scale(1)" : "scale(0.5)",
                  transition:
                    "opacity 0.4s ease-out 0.1s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
                }}
              >
                <Check size={16} className="text-black" />
              </div>
              <div
                style={{
                  opacity: showSuccess ? 1 : 0,
                  transform: showSuccess ? "translateY(0)" : "translateY(0.75rem)",
                  transition: "opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s",
                }}
              >
                <h3
                  className="text-black mb-1"
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Listo, {form.nombre.split(" ")[0]}.
                </h3>
                <p className="text-black/60" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                  Ya eres parte. Tu descarga comenzará en un momento.
                </p>
              </div>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate className="space-y-4 mt-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="modal-email"
                  className="block text-black/60 text-xs tracking-[0.2em] uppercase mb-1.5 font-medium"
                >
                  Email
                </label>
                <input
                  id="modal-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full bg-transparent border-b border-black/20 text-black placeholder-black/30 py-2.5 outline-none focus:border-black transition-colors text-sm"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs tracking-wider mt-1">{errors.email}</p>
                )}
              </div>

              {/* Nombre + Apellido — side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="modal-nombre"
                    className="block text-black/60 text-xs tracking-[0.2em] uppercase mb-1.5 font-medium"
                  >
                    Nombre
                  </label>
                  <input
                    id="modal-nombre"
                    type="text"
                    value={form.nombre}
                    onChange={(e) => update("nombre", e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full bg-transparent border-b border-black/20 text-black placeholder-black/30 py-2.5 outline-none focus:border-black transition-colors text-sm"
                    aria-invalid={Boolean(errors.nombre)}
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-xs tracking-wider mt-1">{errors.nombre}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="modal-apellido"
                    className="block text-black/60 text-xs tracking-[0.2em] uppercase mb-1.5 font-medium"
                  >
                    Apellido
                  </label>
                  <input
                    id="modal-apellido"
                    type="text"
                    value={form.apellido}
                    onChange={(e) => update("apellido", e.target.value)}
                    placeholder="Tu apellido"
                    className="w-full bg-transparent border-b border-black/20 text-black placeholder-black/30 py-2.5 outline-none focus:border-black transition-colors text-sm"
                    aria-invalid={Boolean(errors.apellido)}
                  />
                  {errors.apellido && (
                    <p className="text-red-500 text-xs tracking-wider mt-1">{errors.apellido}</p>
                  )}
                </div>
              </div>

              {/* País */}
              <div>
                <label
                  htmlFor="modal-pais"
                  className="block text-black/60 text-xs tracking-[0.2em] uppercase mb-1.5 font-medium"
                >
                  País
                </label>
                <div className="relative">
                  <select
                    id="modal-pais"
                    value={form.pais}
                    onChange={(e) => update("pais", e.target.value)}
                    className={`w-full bg-transparent border-b border-black/20 py-2.5 outline-none focus:border-black transition-colors text-sm appearance-none cursor-pointer ${
                      form.pais ? "text-black" : "text-black/30"
                    }`}
                    aria-invalid={Boolean(errors.pais)}
                  >
                    <option value="" className="bg-white text-black/40">
                      Selecciona tu país
                    </option>
                    {COUNTRIES.map((c) => (
                      <option key={c.value} value={c.value} className="bg-white text-black">
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-black/30 text-sm">
                    ↓
                  </div>
                </div>
                {errors.pais && (
                  <p className="text-red-500 text-xs tracking-wider mt-1">{errors.pais}</p>
                )}
              </div>

              {/* Consent */}
              <div className="pt-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    onClick={() => update("consent", !form.consent)}
                    className={`w-4 h-4 mt-0.5 border flex-shrink-0 flex items-center justify-center transition-colors ${
                      form.consent ? "bg-black border-black" : "border-black/30 hover:border-black/60"
                    }`}
                  >
                    {form.consent && <Check size={9} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-black/60 text-xs leading-relaxed">
                    Acepto recibir comunicaciones de Beéle / Borondo. Puedo cancelar en cualquier
                    momento.{" "}
                    <a
                      href="https://www.sonymusic.com/privacy-policy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-black transition-colors"
                    >
                      Ver política de privacidad.
                    </a>
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-red-500 text-xs tracking-wider mt-1 ml-7">{errors.consent}</p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 bg-black text-white px-6 py-3 hover:bg-black/85 transition-colors group w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span className="text-sm tracking-widest uppercase" style={{ fontWeight: 600 }}>
                        Enviando...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm tracking-widest uppercase" style={{ fontWeight: 600 }}>
                        Registrarme y descargar
                      </span>
                      <ArrowRight
                        size={13}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>

                {submitError && (
                  <p className="text-red-500 text-xs tracking-wider mt-2">{submitError}</p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
