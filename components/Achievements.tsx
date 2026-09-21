import { achievements } from "@/lib/data";
import SectionHead from "./SectionHead";

export default function Achievements() {
  const podiums = achievements.filter((a) => a.result).length;

  return (
    <section id="achievements" className="py-10">
      <SectionHead
        title="Achievements"
        meta={podiums ? `${podiums} podium finishes` : undefined}
      />
      <ul className="mt-2">
        {achievements.map((item) => (
          <li key={item.title} className="border-b border-rule py-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-base font-semibold">{item.title}</h3>
              {item.result ? (
                <p className="font-mono text-sm font-medium text-signal-text">
                  {item.result}
                </p>
              ) : null}
            </div>
            <p className="mt-2 text-[15px] leading-[1.7] text-ink-2">
              {item.detail}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
