import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ArrowRight, Send } from "lucide-react";
import { CONTACT, SERVICES } from "../lib/content";
import { ClipImage, Eyebrow, MaskLines } from "./ui";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  details: string;
  origin: string;
  destination: string;
};

const EMPTY: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  details: "",
  origin: "",
  destination: "",
};

const fieldBase =
  "w-full border-0 border-b border-graphite/20 bg-transparent px-0 py-3 text-[15px] text-graphite placeholder:text-graphite/35 outline-none transition-colors duration-500 focus:border-signal";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="eyebrow mb-1 block text-[10.5px] text-graphite/55">
        {label}
      </span>
      {children}
    </label>
  );
}

export default function QuoteSection({
  id = "quote",
  background,
  heading,
  intro,
  showIntro = true,
}: {
  id?: string;
  background: string;
  heading: string[];
  intro: string;
  showIntro?: boolean;
}) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const update = (key: keyof FormState) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const scrollToForm = () => {
    document
      .getElementById("quote-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.service ||
      !form.origin.trim() ||
      !form.destination.trim()
    ) {
      setError("Please complete name, email, service, origin and destination.");
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setError(
        "Email service settings are missing from this build. Locally, restart the dev server after setting the VITE_EMAILJS variables. On the live site, add all three variables in your hosting build settings and redeploy. Please contact our team directly in the meantime.",
      );
      return;
    }

    setError("");
    setSending(true);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          service: form.service,
          origin: form.origin,
          destination: form.destination,
          details: form.details,
          reply_to: form.email,
        },
        {
          publicKey,
        },
      );

      setSent(true);
      setForm(EMPTY);
    } catch (err) {
      console.error("Email sending failed:", err);
      setError(
        "Unable to send your enquiry right now. Please try again or contact our team directly.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id={id} className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 opacity-45">
        <ClipImage
          src={background}
          alt=""
          className="h-full w-full"
          parallax={7}
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/50"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[1440px] gap-20 px-6 py-28 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-40">
        <div className="lg:col-span-5">
          <Eyebrow className="text-white/75">Request a quote</Eyebrow>

          <MaskLines
            lines={heading}
            as="h2"
            className="mt-8 font-heading text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
          />

          {showIntro && (
            <p className="mt-8 max-w-md text-[17px] leading-relaxed text-white/70">
              {intro}
            </p>
          )}

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55">
            Our team responds with a tailored quote within two hours.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={scrollToForm}
              className="group inline-flex items-center gap-3 rounded-full bg-signal px-7 py-4 text-sm font-semibold text-white transition-colors duration-500 hover:bg-white hover:text-navy"
            >
              Request a Quote
              <ArrowRight
                size={17}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </button>

            <a
              href={`mailto:${CONTACT.emails[0]}`}
              className="link-underline text-sm font-semibold text-white"
            >
              Contact Our Team
            </a>
          </div>
        </div>

        <div id="quote-form" className="lg:col-span-6 lg:col-start-7">
          <div className="bg-offwhite p-8 text-graphite sm:p-12">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[460px] flex-col justify-center"
                >
                  <p className="eyebrow text-signal">
                    Enquiry successfully sent
                  </p>

                  <h3 className="mt-5 font-heading text-3xl font-semibold tracking-tight">
                    Thank you for your enquiry.
                  </h3>

                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-graphite/70">
                    Your enquiry has been submitted successfully. Our team will
                    contact you shortly. You can also reach us directly on{" "}
                    <a
                      href={`tel:${CONTACT.phoneIndiaTel}`}
                      className="font-semibold text-navy underline underline-offset-4"
                    >
                      {CONTACT.phoneIndia}
                    </a>
                    .
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setForm(EMPTY);
                      setSent(false);
                      setError("");
                    }}
                    className="mt-10 self-start text-sm font-semibold text-navy link-underline"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-x-10 gap-y-8 sm:grid-cols-2"
                >
                  <div className="sm:col-span-2">
                    <p className="font-heading text-2xl font-semibold tracking-tight">
                      Tell us about your shipment
                    </p>

                    <p className="mt-2 text-sm text-graphite/60">
                      Fields marked * are needed to prepare an accurate quote.
                    </p>
                  </div>

                  <Field label="Full name *">
                    <input
                      required
                      className={fieldBase}
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </Field>

                  <Field label="Company name">
                    <input
                      className={fieldBase}
                      value={form.company}
                      onChange={update("company")}
                      placeholder="Company"
                      autoComplete="organization"
                    />
                  </Field>

                  <Field label="Email *">
                    <input
                      type="email"
                      required
                      className={fieldBase}
                      value={form.email}
                      onChange={update("email")}
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                  </Field>

                  <Field label="Phone">
                    <input
                      type="tel"
                      className={fieldBase}
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+91 / +971"
                      autoComplete="tel"
                    />
                  </Field>

                  <Field label="Service required *" className="sm:col-span-2">
                    <select
                      required
                      className={`${fieldBase} appearance-none bg-transparent`}
                      value={form.service}
                      onChange={update("service")}
                    >
                      <option value="">Select a service</option>

                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title}
                        </option>
                      ))}

                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </Field>

                  <Field label="Origin *">
                    <input
                      required
                      className={fieldBase}
                      value={form.origin}
                      onChange={update("origin")}
                      placeholder="Port or city"
                    />
                  </Field>

                  <Field label="Destination *">
                    <input
                      required
                      className={fieldBase}
                      value={form.destination}
                      onChange={update("destination")}
                      placeholder="Port or city"
                    />
                  </Field>

                  <Field label="Shipment details" className="sm:col-span-2">
                    <textarea
                      rows={4}
                      className={`${fieldBase} resize-none`}
                      value={form.details}
                      onChange={update("details")}
                      placeholder="Cargo type, approximate weight or volume, container size, timing, special handling"
                    />
                  </Field>

                  {error && (
                    <p
                      role="alert"
                      className="text-sm text-red-700 sm:col-span-2"
                    >
                      {error}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-6 sm:col-span-2">
                    <p className="max-w-xs text-xs leading-relaxed text-graphite/50">
                      Your details are used only to respond to this enquiry.
                    </p>

                    <button
                      type="submit"
                      disabled={sending}
                      className="group inline-flex items-center gap-3 rounded-full bg-navy px-8 py-4 text-sm font-semibold text-white transition-colors duration-500 hover:bg-signal disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {sending ? "Sending..." : "Send enquiry"}

                      <Send
                        size={15}
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
