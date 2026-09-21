import { personalInfo } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="py-10">
      <div className="border-t border-ink pt-10">
        <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
          Let&apos;s build something.
        </h2>
        <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.7] text-ink-2">
          Open to remote internships and early-stage teams building ambitious
          products.
        </p>

        <a
          href={`mailto:${personalInfo.email}`}
          className="mt-8 inline-block break-all text-lg font-medium underline decoration-signal decoration-2 underline-offset-[5px] sm:text-xl"
        >
          {personalInfo.email}
        </a>
        <p className="mt-2 font-mono text-sm text-ink-2">
          {personalInfo.phone}
        </p>

        <div className="mt-6 flex gap-5 text-sm">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-rule hover:decoration-signal"
          >
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-rule hover:decoration-signal"
          >
            LinkedIn
          </a>
          <a
            href={personalInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-rule hover:decoration-signal"
          >
            Resume
          </a>
        </div>
      </div>

      <p className="mt-16 border-t border-rule pt-4 font-mono text-xs text-ink-2">
        Built by Sudipta Ghorami, 2026
      </p>
    </section>
  );
}
