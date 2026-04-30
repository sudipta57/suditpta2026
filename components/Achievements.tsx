"use client";

import { motion } from "framer-motion";
import { achievements } from "@/lib/data";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Achievements() {
  return (
    <motion.section
      id="achievements"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-20"
    >
      <h2 className="text-2xl font-semibold">Achievements &amp; Community</h2>

      <motion.div
        className="mt-8 space-y-3"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {achievements.map((achievement) => (
          <motion.article
            key={achievement}
            variants={itemVariants}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-xl border border-white/5 bg-white/5 p-4 text-sm leading-relaxed text-[#888888]"
          >
            {achievement}
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
