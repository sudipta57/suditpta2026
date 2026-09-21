import { skills } from "@/lib/data";
import SectionHead from "./SectionHead";

export default function About() {
  const groups = Object.entries(skills);

  return (
    <section id="skills" className="py-10">
      <SectionHead title="Skills" meta={`${groups.length} areas`} />
      <dl className="mt-4">
        {groups.map(([category, items]) => (
          <div
            key={category}
            className="grid gap-1 border-b border-rule py-3 sm:grid-cols-[9.5rem_1fr] sm:gap-4"
          >
            <dt className="text-sm font-medium">{category}</dt>
            <dd className="text-sm leading-relaxed text-ink-2">
              {items.join(", ")}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
