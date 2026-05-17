import { useState, useEffect } from "react";
import { setNewsletterCookie } from "@/app/utils/newsletterCookie";

interface FormState {
  email: string;
  nombre: string;
  apellido: string;
  pais: string;
  consent: boolean;
}

interface FormErrors {
  email?: string;
  nombre?: string;
  apellido?: string;
  pais?: string;
  consent?: string;
}

/*
  SONY MUSIC FANS INTEGRATION
  ────────────────────────────
  Endpoint : https://subs.sonymusicfans.com/submit
  Form ID  : 747640 | Brand: 5098469 | Segment: 2661588
*/
export function useSMFRegistration(onSuccess?: () => void) {
  const [form, setForm] = useState<FormState>({
    email: "",
    nombre: "",
    apellido: "",
    pais: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (submitted) {
      const t = setTimeout(() => setShowSuccess(true), 50);
      return () => clearTimeout(t);
    }
  }, [submitted]);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email inválido";
    if (!form.nombre.trim()) e.nombre = "Ingresa tu nombre";
    if (!form.apellido.trim()) e.apellido = "Ingresa tu apellido";
    if (!form.pais) e.pais = "Selecciona tu país";
    if (!form.consent) e.consent = "Acepta los términos para continuar";
    return e;
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const params = new URLSearchParams();
      params.append("js_url", "https://subs.sonymusicfans.com/submit");
      params.append("ae_segment_id", "2661588");
      params.append("ae_brand_id", "5098469");
      params.append("form", "747640");
      params.append("field_email_address", form.email);
      params.append("field_first_name", form.nombre);
      params.append("field_last_name", form.apellido);
      params.append("field_country_region", form.pais);
      params.append("triggered_sends[]", "");
      params.append("mailing-list-id[0]", "a0S0800000W78HoEAJ");
      params.append("triggered_sends[]", "");
      params.append("mailing-list-id[1]", "a0STy000002wrqnMAA");
      params.append("triggered_sends[]", "");

      const response = await fetch("https://subs.sonymusicfans.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
        credentials: "omit",
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setNewsletterCookie();
      setSubmitted(true);
      onSuccess?.();
    } catch {
      setSubmitError("Hubo un error al enviar. Por favor intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return {
    form,
    submitted,
    submitting,
    errors,
    submitError,
    showSuccess,
    handleSubmit,
    update,
  };
}
