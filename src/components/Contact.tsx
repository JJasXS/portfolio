"use client";

import { Loader2, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { FadeIn } from "./FadeIn";
import { SectionHeading, SectionShell } from "./Section";

const enquiryTypes = [
  "Job Opportunity",
  "Internship Opportunity",
  "Project Collaboration",
  "Freelance / Development",
  "Professional Enquiry",
  "General Enquiry",
] as const;

type FormState = {
  name: string;
  email: string;
  enquiryType: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

const initialForm: FormState = {
  name: "",
  email: "",
  enquiryType: "",
  message: "",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (!form.enquiryType) next.enquiryType = "Select an enquiry type.";
    if (!form.message.trim()) next.message = "Message is required.";
    else if (form.message.trim().length < 10)
      next.message = "Please write at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          enquiryType: form.enquiryType,
          message: form.message.trim(),
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
      setServerMessage(
        data.message || "Enquiry received. I'll get back to you soon.",
      );
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setServerMessage(
        error instanceof Error
          ? error.message
          : "Unable to send enquiry right now.",
      );
    }
  };

  return (
    <SectionShell id="contact">
      <FadeIn>
        <SectionHeading
          eyebrow="Contact"
          title="Let's Connect"
          description="Have an opportunity, project, or question? Feel free to reach out."
          align="center"
        />
      </FadeIn>

      <FadeIn delay={0.08} className="mx-auto mt-10 max-w-2xl">
        <form
          onSubmit={onSubmit}
          noValidate
          className="glass rounded-3xl p-6 sm:p-8"
        >
          <div className="grid gap-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
                placeholder="Your name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name ? (
                <p id="name-error" className="mt-2 text-sm text-danger">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email ? (
                <p id="email-error" className="mt-2 text-sm text-danger">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="enquiryType"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Enquiry Type
              </label>
              <select
                id="enquiryType"
                name="enquiryType"
                value={form.enquiryType}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    enquiryType: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
                aria-invalid={Boolean(errors.enquiryType)}
                aria-describedby={
                  errors.enquiryType ? "enquiryType-error" : undefined
                }
              >
                <option value="">Select enquiry type</option>
                {enquiryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.enquiryType ? (
                <p id="enquiryType-error" className="mt-2 text-sm text-danger">
                  {errors.enquiryType}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
                placeholder="Share a short note about the opportunity or question..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message ? (
                <p id="message-error" className="mt-2 text-sm text-danger">
                  {errors.message}
                </p>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:text-background sm:w-auto"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Enquiry
              </>
            )}
          </button>

          <div className="mt-4 min-h-6" aria-live="polite">
            {status === "success" ? (
              <p className="text-sm text-success">{serverMessage}</p>
            ) : null}
            {status === "error" ? (
              <p className="text-sm text-danger">{serverMessage}</p>
            ) : null}
          </div>
        </form>
      </FadeIn>
    </SectionShell>
  );
}
