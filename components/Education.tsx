"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Education() {
  return (
    <motion.section
      id="education"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-20"
    >
      <h2 className="text-2xl font-semibold">Education</h2>

      <motion.div
        className="mt-8 space-y-4"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {education.map((item) => (
          <motion.article
            key={`${item.degree}-${item.period}`}
            variants={itemVariants}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-xl border border-white/5 bg-white/5 p-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#e5e5e5]">{item.degree}</h3>
                <p className="mt-1 text-sm text-[#00f5d4]">{item.note}</p>
              </div>
              <p className="text-sm text-[#888888]">{item.period}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
