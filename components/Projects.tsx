"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M14 3h7v7h-2V6.41l-8.3 8.3-1.4-1.42 8.29-8.3H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z" />
    </svg>
  );
}

export default function Projects() {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-20"
    >
      <h2 className="text-2xl font-semibold">Projects</h2>

      <motion.div
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {projects.map((project) => {
          const projectUrl = project.live || project.github;

          return (
            <motion.article
              key={project.name}
              variants={cardVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-xl border border-white/5 bg-white/5 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00f5d4]/30 hover:shadow-[0_0_20px_rgba(0,245,212,0.08)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-[#e5e5e5]">{project.name}</h3>
                {projectUrl ? (
                  <a
                    href={projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.name}`}
                    className="text-[#888888] transition-colors duration-200 hover:text-[#00f5d4]"
                  >
                    <ExternalIcon />
                  </a>
                ) : (
                  <span className="text-[#888888]">
                    <ExternalIcon />
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[#888888]">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((techItem) => (
                  <span key={techItem} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-[#e5e5e5]">
                    {techItem}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <a href="#" className="mt-5 inline-block text-sm text-[#888888] transition-colors duration-200 hover:text-[#00f5d4]">
        View All →
      </a>
    </motion.section>
  );
}
