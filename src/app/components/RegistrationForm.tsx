import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeader } from "./SectionLabel";
import artistPortrait from "../../imports/image-1.png";

/*
  SALESFORCE INTEGRATION NOTE:
  ─────────────────────────────
  Este formulario está listo para conectarse a Salesforce Marketing Cloud.
  Cuando el equipo de Salesforce entregue el form HTML/endpoint:
  1. Reemplaza el handleSubmit con el action URL del form de SFMC.
  2. Ajusta los field names al mapping de SFMC.
  3. Agrega el tracking pixel / web-to-lead / SFMC form embed si aplica.
*/

interface FormState {
  email: string;
  nombre: string;
  fechaNacimiento: string;
  pais: string;
  consent: boolean;
}

const COUNTRIES = [
  "México",
  "Colombia",
  "Venezuela",
  "Argentina",
  "Chile",
  "Perú",
  "Ecuador",
  "Bolivia",
  "Uruguay",
  "Paraguay",
  "España",
  "Estados Unidos",
  "Otro",
];

export function RegistrationForm() {
  const [form, setForm] = useState<FormState>({
    email: "",
    nombre: "",
    fechaNacimiento: "",
    pais: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = () => {
    const newErrors: Partial<FormState> = {};
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Email inválido";
    if (!form.nombre.trim()) newErrors.nombre = "Ingresa tu nombre completo";
    if (!form.fechaNacimiento) newErrors.fechaNacimiento = "Ingresa tu fecha de nacimiento";
    if (!form.pais) newErrors.pais = "Selecciona tu país";
    if (!form.consent) newErrors.consent = "Acepta los términos" as any;
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    // TODO: Replace with Salesforce Marketing Cloud form action / API call
    console.log("Form data:", form);
    setSubmitted(true);
  };

  const update = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

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
          <div>
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
          </div>

          {/* Right: form */}
          <div>
            {submitted ? (
              /* Success state */
              <div className="py-16 flex flex-col items-start gap-6">
                <div className="w-12 h-12 border border-white flex items-center justify-center">
                  <Check size={18} className="text-white" />
                </div>
                <div>
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
                    className="block text-white/75 text-base tracking-[0.2em] uppercase mb-2"
                    style={{ fontWeight: 500 }}
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
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-white/65 text-base tracking-wider mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Nombre completo */}
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-white/75 text-base tracking-[0.2em] uppercase mb-2"
                    style={{ fontWeight: 500 }}
                  >
                    Nombre completo
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    value={form.nombre}
                    onChange={(e) => update("nombre", e.target.value)}
                    placeholder="Tu nombre completo"
                    className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 py-3 outline-none focus:border-white transition-colors text-base"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    aria-invalid={!!errors.nombre}
                  />
                  {errors.nombre && (
                    <p className="text-white/65 text-base tracking-wider mt-1">{errors.nombre}</p>
                  )}
                </div>

                {/* Fecha de nacimiento */}
                <div>
                  <label
                    htmlFor="fechaNacimiento"
                    className="block text-white/75 text-base tracking-[0.2em] uppercase mb-2"
                    style={{ fontWeight: 500 }}
                  >
                    Fecha de nacimiento
                  </label>
                  <input
                    id="fechaNacimiento"
                    type="date"
                    value={form.fechaNacimiento}
                    onChange={(e) => update("fechaNacimiento", e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full bg-transparent border-b border-white/20 text-white py-3 outline-none focus:border-white transition-colors text-base appearance-none cursor-pointer"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      colorScheme: "dark",
                      color: form.fechaNacimiento ? "white" : "rgba(255,255,255,0.2)",
                    }}
                    aria-invalid={!!errors.fechaNacimiento}
                  />
                  {errors.fechaNacimiento && (
                    <p className="text-white/65 text-base tracking-wider mt-1">{errors.fechaNacimiento}</p>
                  )}
                </div>

                {/* País */}
                <div>
                  <label
                    htmlFor="pais"
                    className="block text-white/75 text-base tracking-[0.2em] uppercase mb-2"
                    style={{ fontWeight: 500 }}
                  >
                    País
                  </label>
                  <div className="relative">
                    <select
                      id="pais"
                      value={form.pais}
                      onChange={(e) => update("pais", e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 text-white py-3 outline-none focus:border-white transition-colors text-base appearance-none cursor-pointer"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: form.pais ? "white" : "rgba(255,255,255,0.2)" }}
                      aria-invalid={!!errors.pais}
                    >
                      <option value="" style={{ background: "#000", color: "rgba(255,255,255,0.4)" }}>
                        Selecciona tu país
                      </option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c} style={{ background: "#000", color: "white" }}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                      ↓
                    </div>
                  </div>
                  {errors.pais && (
                    <p className="text-white/65 text-base tracking-wider mt-1">{errors.pais}</p>
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
                      en cualquier momento. Ver política de privacidad.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-white/65 text-base tracking-wider mt-1 ml-9">
                      {String(errors.consent)}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-3 bg-white text-black px-8 py-4 hover:bg-white/85 transition-colors group w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <span
                      className="text-base tracking-widest uppercase"
                      style={{ fontWeight: 600 }}
                    >
                      Registrarme
                    </span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}