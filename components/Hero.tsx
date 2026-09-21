import Image from "next/image";
import { personalInfo } from "@/lib/data";
import MusicPlayer from "./MusicPlayer";

// "Full Stack Developer" -> "Full stack developer"; acronyms like "AI" stay intact.
const sentenceCase = (text: string) =>
  text
    .split(" ")
    .map((word, i) =>
      i === 0 || /^[A-Z0-9]{2,}$/.test(word) ? word : word.toLowerCase(),
    )
    .join(" ");

// Lowercases the first word too, for use mid-sentence ("and AI engineer").
const midSentence = (text: string) =>
  sentenceCase(text).replace(/^\S+/, (w) =>
    /^[A-Z0-9]{2,}$/.test(w) ? w : w.toLowerCase(),
  );

const [primaryRole, secondaryRole, status] =
  personalInfo.roles.map(sentenceCase);

export default function Hero() {
  return (
    <section id="home" className="pb-4 pt-8">
      <p className="flex items-center gap-2 border-b border-rule pb-3 font-mono text-xs text-ink-2">
        <span
          aria-hidden="true"
          className="live-dot h-[7px] w-[7px] rounded-full bg-signal"
        />
        {status}
      </p>

      <div className="mt-8 flex items-start gap-5 sm:gap-6">
        <div className="relative shrink-0">
          <div className="relative h-[124px] w-[92px] overflow-hidden rounded-[3px] border border-rule sm:h-[150px] sm:w-[110px]">
            <Image
              src={personalInfo.photo}
              alt={personalInfo.name}
              fill
              sizes="110px"
              priority
              className="object-cover"
            />
          </div>
          <MusicPlayer />
        </div>

        <div className="min-w-0 pt-1">
          <h1 className="text-[2rem] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-[2.75rem]">
            {personalInfo.name}
          </h1>
          <p className="mt-3 text-base text-ink-2">
            {primaryRole} and {midSentence(secondaryRole)}
          </p>
        </div>
      </div>

      <p className="mt-8 max-w-[62ch] text-[15px] leading-[1.75]">
        {personalInfo.bio}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
        <a
          href={personalInfo.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[3px] bg-ink px-4 py-2 font-medium text-paper hover:opacity-90"
        >
          View resume
        </a>
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noreferrer"
          className="text-ink underline decoration-rule hover:decoration-signal"
        >
          GitHub
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-ink underline decoration-rule hover:decoration-signal"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="text-ink underline decoration-rule hover:decoration-signal"
        >
          Email
        </a>
      </div>
    </section>
  );
}
