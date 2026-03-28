"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/lib/data";

const rowVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-20"
    >
      <h2 className="text-2xl font-semibold">Work Experience</h2>

      <motion.div
        className="mt-8 ml-1 border-l border-white/10 pl-5"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="space-y-1">
          {experiences.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={`${item.company}-${item.role}`}
                variants={rowVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="border-b border-white/5 pb-3"
              >
                <button
                  onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
                  className="flex w-full items-start gap-4 py-3 text-left"
                >
                  <div className="relative z-10 -ml-[27px] mt-2 h-3 w-3 shrink-0 rounded-full bg-white/10" />

                  <div className="flex-1">
                    <p className="text-base font-semibold text-[#e5e5e5]">{item.role}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-sm text-[#00f5d4]"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {item.company}
                    </a>
                  </div>

                  <div className="min-w-[140px] text-right text-xs text-[#888888]">
                    <p>{item.period}</p>
                    <p>{item.location}</p>
                  </div>
                </button>

                {isOpen ? (
                  <ul className="ml-6 mt-1 list-disc space-y-2 pb-2 pl-4 text-sm leading-relaxed text-[#888888]">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <a href="#" className="mt-5 inline-block text-sm text-[#888888] transition-colors duration-200 hover:text-[#00f5d4]">
        View All →
      </a>
    </motion.section>
  );
}
