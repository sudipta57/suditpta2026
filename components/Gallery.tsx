"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { galleryPhotos as photos } from "@/lib/gallery";
import SectionHead from "./SectionHead";

const PREVIEW_COUNT = 9;

export default function Gallery() {
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const visible = expanded ? photos : photos.slice(0, PREVIEW_COUNT);
  const isOpen = openIndex !== null;

  const open = (index: number, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    setDirection(0);
    setOpenIndex(index);
  };

  const close = useCallback(() => {
    setOpenIndex(null);
    lastTrigger.current?.focus();
  }, []);

  const step = useCallback((delta: number) => {
    setDirection(delta);
    setOpenIndex((i) =>
      i === null ? i : (i + delta + photos.length) % photos.length,
    );
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    closeBtn.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, step]);

  if (photos.length === 0) return null;

  const current = openIndex !== null ? photos[openIndex] : null;
  const slide = reduceMotion ? 0 : 60;

  return (
    <section id="gallery" className="py-10">
      <SectionHead title="Gallery" meta={`${photos.length} photos`} />
      <p className="mt-3 text-sm text-ink-2">
        Hackathons, meetups and the people I build with.
      </p>

      <div className="mt-5 columns-2 gap-3 sm:columns-3">
        {visible.map((photo, index) => (
          <button
            key={photo.key}
            type="button"
            onClick={(e) => open(index, e.currentTarget)}
            aria-label={`Open photo: ${photo.alt}`}
            className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-[3px] border border-rule bg-sheet"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              placeholder="blur"
              blurDataURL={photo.blur}
              sizes="(min-width: 640px) 220px, 50vw"
              className="h-auto w-full transition-opacity duration-200 group-hover:opacity-90 motion-reduce:transition-none"
            />
          </button>
        ))}
      </div>

      {photos.length > PREVIEW_COUNT ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-4 rounded-[3px] border border-rule px-4 py-2 text-sm hover:border-ink"
        >
          {expanded ? "Show fewer photos" : `Show all ${photos.length} photos`}
        </button>
      ) : null}

      {mounted
        ? createPortal(
            <AnimatePresence>
              {current ? (
                <motion.div
                  key="lightbox"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Photo viewer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="fixed inset-0 z-[60] flex flex-col bg-black/90 backdrop-blur-sm"
                  onClick={close}
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 text-sm text-[#bbbbbb]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span aria-live="polite">
                      {(openIndex ?? 0) + 1} / {photos.length}
                    </span>
                    <button
                      ref={closeBtn}
                      type="button"
                      onClick={close}
                      className="grid h-11 w-11 place-items-center rounded-full text-xl hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                      aria-label="Close photo viewer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
                    <AnimatePresence
                      initial={false}
                      custom={direction}
                      mode="popLayout"
                    >
                      <motion.div
                        key={current.key}
                        custom={direction}
                        initial={{ opacity: 0, x: direction * slide }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -slide }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.25}
                        onDragEnd={(_, info) => {
                          if (info.offset.x < -60) step(1);
                          else if (info.offset.x > 60) step(-1);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative h-full w-full touch-pan-y"
                      >
                        <Image
                          src={current.src}
                          alt={current.alt}
                          fill
                          placeholder="blur"
                          blurDataURL={current.blur}
                          sizes="100vw"
                          className="pointer-events-none select-none object-contain"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        step(-1);
                      }}
                      aria-label="Previous photo"
                      className="absolute left-2 hidden h-11 w-11 place-items-center rounded-full bg-white/5 text-lg text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal sm:grid"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        step(1);
                      }}
                      aria-label="Next photo"
                      className="absolute right-2 hidden h-11 w-11 place-items-center rounded-full bg-white/5 text-lg text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal sm:grid"
                    >
                      ›
                    </button>
                  </div>

                  <p
                    className="min-h-[3rem] px-6 py-3 text-center text-sm text-[#bbbbbb]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {current.caption ?? current.alt}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </section>
  );
}
