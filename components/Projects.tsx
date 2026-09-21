import { personalInfo, projects } from "@/lib/data";
import SectionHead from "./SectionHead";

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-10">
      <SectionHead title="Projects" meta={`${projects.length} entries`} />

      <div className="mt-5 space-y-4">
        {projects.map((project) => (
          <article
            key={project.name}
            className="rounded-[3px] border border-rule bg-sheet"
          >
            <div className="flex items-baseline justify-between gap-3 px-4 pt-4">
              <h3 className="text-base font-semibold">{project.name}</h3>
              <div className="flex shrink-0 gap-4 text-sm">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-signal-text hover:underline"
                  >
                    Live site <ExternalIcon />
                  </a>
                ) : null}
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-signal-text hover:underline"
                  >
                    Source <ExternalIcon />
                  </a>
                ) : null}
              </div>
            </div>

            <p className="px-4 pb-4 pt-2 text-[15px] leading-[1.7]">
              {project.description}
            </p>

            <div className="flex gap-3 border-t border-rule px-4 py-2.5 font-mono text-xs">
              <span className="text-ink-2">stack</span>
              <span>{project.tech.join(", ")}</span>
            </div>
          </article>
        ))}
      </div>

      <a
        href={personalInfo.github}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-block text-sm underline decoration-rule hover:decoration-signal"
      >
        All repositories on GitHub
      </a>
    </section>
  );
}
