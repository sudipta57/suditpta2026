import { achievements } from "@/lib/data";
import SectionHead from "./SectionHead";

export default function Achievements() {
  return (
    <section id="achievements" className="py-10">
      <SectionHead title="Achievements and community" />
      <ul className="mt-2">
        {achievements.map((achievement) => (
          <li
            key={achievement}
            className="border-b border-rule py-4 text-[15px] leading-[1.7]"
          >
            {achievement}
          </li>
        ))}
      </ul>
    </section>
  );
}
