"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

const TYPING_SPEED = 90;
const DELETING_SPEED = 55;
const HOLD_TIME = 1200;

function IconLinks() {
  return (
    <div className="mt-5 flex items-center gap-4 text-[#888888]">
      <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors duration-200 hover:text-[#00f5d4]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.52.1.72-.23.72-.5v-1.95c-2.93.64-3.55-1.25-3.55-1.25-.48-1.23-1.17-1.56-1.17-1.56-.95-.65.08-.64.08-.64 1.05.08 1.61 1.08 1.61 1.08.94 1.61 2.46 1.15 3.06.88.1-.68.36-1.15.65-1.41-2.34-.27-4.8-1.17-4.8-5.2 0-1.15.41-2.1 1.08-2.84-.11-.27-.47-1.37.1-2.85 0 0 .88-.28 2.9 1.08a9.93 9.93 0 0 1 5.28 0c2.01-1.36 2.9-1.08 2.9-1.08.56 1.48.2 2.58.1 2.85.67.74 1.08 1.69 1.08 2.84 0 4.04-2.47 4.93-4.82 5.19.37.32.71.95.71 1.92v2.85c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5Z" />
        </svg>
      </a>
      <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors duration-200 hover:text-[#00f5d4]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3Zm4.4 5.5H6.42V20h3.23v-5.7c0-1.5.28-2.95 2.13-2.95 1.82 0 1.85 1.7 1.85 3.04V20h3.23v-6.25c0-3.07-.66-5.43-4.24-5.43-1.72 0-2.88.94-3.35 1.84h-.05V8.5Z" />
        </svg>
      </a>
      <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="transition-colors duration-200 hover:text-[#00f5d4]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75Zm2 0v.19l7 5.09 7-5.09v-.19a.75.75 0 0 0-.75-.75H5.75a.75.75 0 0 0-.75.75Zm16 2.66-6.41 4.66a1 1 0 0 1-1.18 0L7 9.41v7.84c0 .41.34.75.75.75h10.5c.41 0 .75-.34.75-.75V9.41Z" />
        </svg>
      </a>
    </div>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles = personalInfo.roles;
    const currentRole = roles[roleIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const nextText = currentRole.slice(0, displayedText.length + 1);
          setDisplayedText(nextText);

          if (nextText === currentRole) {
            setTimeout(() => setIsDeleting(true), HOLD_TIME);
          }
        } else {
          const nextText = currentRole.slice(0, displayedText.length - 1);
          setDisplayedText(nextText);

          if (nextText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? DELETING_SPEED : TYPING_SPEED,
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-20"
    >
      <div className="h-[300px] w-full rounded-xl bg-white/5 relative">
        {/* <div className="flex h-full items-center justify-center text-sm uppercase tracking-[0.2em] text-[#888888]">banner image</div> */}
        <Image src="/sudipta_banner.png" alt="Sudipta banner" fill className="object-cover rounded-xl" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl"
      >
        <span className="text-[#e5e5e5]">Hey, I&apos;m </span>
        <span className="text-[#00f5d4]">SUDIPTA</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
      >
        <p className="mt-4 min-h-[1.5rem] text-sm text-[#00f5d4]">
          {displayedText}
          <span className="ml-0.5 inline-block w-[1px] animate-pulse bg-[#00f5d4] align-middle">&nbsp;</span>
        </p>
      </motion.div>

      <p className="mt-4 text-sm leading-relaxed text-[#888888]">{personalInfo.bio}</p>

      <IconLinks />

      <a href="#about" className="mt-6 inline-block text-sm text-[#888888] transition-colors duration-200 hover:text-[#00f5d4]">
        More →
      </a>
    </motion.section>
  );
}
