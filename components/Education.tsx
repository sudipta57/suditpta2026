import { education } from "@/lib/data";
import SectionHead from "./SectionHead";

export default function Education() {
  return (
    <section id="education" className="py-10">
      <SectionHead title="Education" />
      <ol className="mt-2">
        {education.map((item) => (
          <li
            key={`${item.degree}-${item.period}`}
            className="grid gap-x-5 gap-y-1 border-b border-rule py-5 sm:grid-cols-[8.5rem_1fr]"
          >
            <p className="pt-0.5 font-mono text-xs leading-5 text-ink-2">
              {item.period}
            </p>
            <div>
              <h3 className="text-base font-semibold">{item.degree}</h3>
              <p className="mt-1 text-sm text-ink-2">{item.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
