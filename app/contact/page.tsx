"use client";

import { useRef, useState } from "react";
import {
  Mail,
  Copy,
  Check,
  ArrowRight,
  Send,
  Sparkles,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";
import {
  FiGithub as Github,
  FiLinkedin as Linkedin,
  FiInstagram as Instagram,
} from "react-icons/fi";
import { useSeo } from "@/lib/seo";

const Contact = () => {
  useSeo({
    title: "Contact",
    description:
      "Contact Subash Lama Tamang for full-stack development, React, Next.js, portfolio, and UI/UX design work.",
    path: "/contact",
  });

  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submissionIdRef = useRef<string | null>(null);

  const email = "info@subashlamatamang.com.np";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (formState.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Message must be at least 10 characters.");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("sending");
    submissionIdRef.current ??= crypto.randomUUID();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          submissionId: submissionIdRef.current,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "", website: "" });
        submissionIdRef.current = null;
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        const data = await response.json().catch(() => null);
        setStatus("error");
        setErrorMessage(data?.error || "Error sending message.");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Unable to send your message right now. Please try again.",
      );
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const SOCIALS = [
    {
      icon: Github,
      href: "https://github.com/axosis00x",
      label: "GitHub",
      handle: "@axosis00x",
      color: "group-hover:text-black dark:group-hover:text-white",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/subash-lama-tamang",
      label: "LinkedIn",
      handle: "/in/subash-lama-tamang",
      color: "group-hover:text-[#0077b5]",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/frgnc.subash",
      label: "Instagram",
      handle: "@frgnc.subash",
      color: "group-hover:text-[#E4405F]",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12 px-4 sm:px-0">
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-[#e4e4e4] mb-3 flex items-center gap-2">
          Let&apos;s Connect{" "}
          <Sparkles size={20} className="text-yellow-500 animate-pulse" />
        </h1>
        <p className="font-mono text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
          Whether you have a project in mind, a question about my work, or just
          want to say hi — I&apos;m always ready to chat.
        </p>
      </div>

      <div className="flex flex-col gap-10 px-4 sm:px-0">
        <section className="group relative overflow-hidden rounded-lg border border-gray-300 bg-white p-5 shadow-[3px_3px_0_0_rgba(0,0,0,0.06)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.04)] transition-colors duration-300 hover:border-gray-400 dark:border-[#3a3a3c] dark:bg-[#0a0a0a] dark:hover:border-gray-600">
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-50 text-gray-700 dark:border-[#3a3a3c] dark:bg-[#1e1e1e] dark:text-gray-200">
                <Mail size={19} />
              </div>
              <div className="min-w-0">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Mail me at
                </p>
                <a
                  href={`mailto:${email}`}
                  className="block break-all text-sm font-medium text-black transition-colors hover:text-blue-600 dark:text-[#e4e4e4] dark:hover:text-blue-400 sm:text-base"
                >
                  {email}
                </a>
              </div>
            </div>
            <button
              onClick={handleCopy}
              aria-label="Copy email address"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-50 text-gray-600 transition-all hover:border-black hover:bg-black hover:text-white dark:border-[#3a3a3c] dark:bg-[#1e1e1e] dark:text-gray-300 dark:hover:border-[#e4e4e4] dark:hover:bg-[#e4e4e4] dark:hover:text-black"
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
            </button>
          </div>
          <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-4 text-xs dark:border-[#3a3a3c]">
            <span className="text-gray-500 dark:text-gray-400">
              {copied
                ? "Email copied to clipboard"
                : "Might take at least 1–2 business days"}
            </span>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1 font-medium text-gray-700 transition-colors hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Open mail client <ArrowUpRight size={13} />
            </a>
          </div>
        </section>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 pl-1">
            Social Platforms
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {SOCIALS.map(({ icon: Icon, href, label, handle, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-lg border border-gray-300 dark:border-[#3a3a3c] bg-white dark:bg-[#0a0a0a] shadow-[3px_3px_0_0_rgba(0,0,0,0.06)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.04)] hover:border-gray-400 dark:hover:border-gray-600 transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-md bg-gray-50 dark:bg-[#1e1e1e] border border-gray-300 dark:border-[#3a3a3c]">
                    <Icon
                      size={20}
                      className={`text-gray-500 dark:text-gray-400 transition-colors duration-300 ${color}`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-black dark:text-[#e4e4e4]">
                      {label}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {handle}
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-gray-300 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 pl-1">
            Send a message
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={formState.name}
                onChange={(e) => {
                  setErrorMessage("");
                  setFormState({ ...formState, name: e.target.value });
                }}
                className="w-full px-4 py-3 rounded-md bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#3a3a3c] focus:border-black dark:focus:border-[#e4e4e4] outline-none transition-all text-sm"
              />
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={formState.email}
                onChange={(e) => {
                  setErrorMessage("");
                  setFormState({ ...formState, email: e.target.value });
                }}
                className="w-full px-4 py-3 rounded-md bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#3a3a3c] focus:border-black dark:focus:border-[#e4e4e4] outline-none transition-all text-sm"
              />
            </div>
            <textarea
              required
              rows={5}
              placeholder="How can I help you?"
              value={formState.message}
              onChange={(e) => {
                setErrorMessage("");
                setFormState({ ...formState, message: e.target.value });
              }}
              className="w-full px-4 py-3 rounded-md bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#3a3a3c] focus:border-black dark:focus:border-[#e4e4e4] outline-none transition-all resize-none text-sm"
            />
            <input
              type="text"
              name="website"
              value={formState.website}
              onChange={(e) =>
                setFormState({ ...formState, website: e.target.value })
              }
              tabIndex={-1}
              autoComplete="off"
              className="sr-only"
              aria-hidden="true"
            />

            <div className="flex flex-col items-end gap-2">
              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="px-8 py-3 rounded-md bg-black dark:bg-[#e4e4e4] text-white dark:text-black text-sm font-semibold hover:opacity-80 transition-opacity disabled:opacity-70 flex items-center gap-2"
              >
                {status === "idle" && (
                  <>
                    <p>Send Message</p> <ArrowRight size={16} />
                  </>
                )}
                {status === "sending" && (
                  <>
                    <p>Sending...</p>{" "}
                    <Send size={16} className="animate-pulse" />
                  </>
                )}
                {status === "success" && (
                  <>
                    <p>Sent!</p> <Check size={16} />
                  </>
                )}
                {status === "error" && (
                  <>
                    <p>Try Again</p> <ArrowRight size={16} />
                  </>
                )}
              </button>

              {status === "sending" && (
                <span className="text-[10px] text-gray-400">
                  Sending your message...
                </span>
              )}
              {status === "error" && (
                <span className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} />{" "}
                  {errorMessage || "Error sending message."}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
