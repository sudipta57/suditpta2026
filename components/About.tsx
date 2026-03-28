"use client";

import { motion } from "framer-motion";
import { personalInfo, skills } from "@/lib/data";
import Image from "next/image";
import MusicPlayer from "./MusicPlayer";

const groupVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }} 
    >
      <div className="h-24 w-24 mx-auto rounded-xl bg-white/5 relative overflow-visible">
     
        <Image
          src="/sudipta2.jpeg"
          alt="Sudipta banner"
          fill
          className="object-cover rounded-xl"
        />
        <MusicPlayer />
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[#888888]">
        About Me
      </p>
      <p className="mt-3 text-sm leading-relaxed text-[#888888]">
        {personalInfo.bio}
      </p>

      <p className="mt-8 text-xs uppercase tracking-[0.22em] text-[#888888]">
        Skills &amp; Technologies
      </p>
      <motion.div
        className="mt-4 space-y-5"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {Object.entries(skills).map(([category, items]) => (
          <motion.div key={category} variants={groupVariants}>
            <p className="mb-2 text-xs text-[#888888]">{category}</p>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-[#e5e5e5]"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
