import { experiences, personalInfo } from "@/lib/data";
import SectionHead from "./SectionHead";

export default function Experience() {
  return (
    <section id="experience" className="py-10">
      <SectionHead title="Experience" meta={`${experiences.length} roles`} />

      <ol className="mt-2">
        {experiences.map((item) => (
          <li
            key={`${item.company}-${item.role}`}
            className="grid gap-x-5 gap-y-1 border-b border-rule py-5 sm:grid-cols-[8.5rem_1fr]"
          >
            <p className="pt-0.5 font-mono text-xs leading-5 text-ink-2">
              {item.period}
              <span className="block">{item.location}</span>
            </p>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold">
                  {item.role},{" "}
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-normal underline decoration-rule hover:decoration-signal"
                    >
                      {item.company}
                    </a>
                  ) : (
                    <span className="font-normal">{item.company}</span>
                  )}
                </h3>
                {item.result ? (
                  <p className="font-mono text-sm">
                    <span className="font-medium text-signal-text">
                      {item.result.value}
                    </span>{" "}
                    <span className="text-ink-2">{item.result.label}</span>
                  </p>
                ) : null}
              </div>

              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-2">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="relative pl-4">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.6em] h-px w-2 bg-rule"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <a
        href={personalInfo.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-block text-sm underline decoration-rule hover:decoration-signal"
      >
        Full history in my resume
      </a>
    </section>
  );
}
