"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const dragX = useMotionValue(0);
  const dragScale = useTransform(dragX, [-120, 0, 120], [0.985, 1, 0.985]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.04, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" as const },
    },
  };

  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);

    setTimeout(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const navigateNext = () => {
    const currentIndex = navItems.findIndex(
      (item) => item.id === activeSection,
    );
    const fallbackIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex = (fallbackIndex + 1) % navItems.length;

    navigateToSection(navItems[nextIndex].id);
  };

  const navigatePrev = () => {
    const currentIndex = navItems.findIndex(
      (item) => item.id === activeSection,
    );
    const fallbackIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex = (fallbackIndex - 1 + navItems.length) % navItems.length;

    navigateToSection(navItems[nextIndex].id);
  };

  useEffect(() => {
    const observers = navItems.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.5 },
      );

      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  useEffect(() => {
    const handler = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  const activeLabel =
    navItems.find((item) => item.id === activeSection)?.label ?? "Home";
  const layoutTransition = isOpen
    ? { type: "spring" as const, stiffness: 420, damping: 36, mass: 0.6 }
    : { type: "spring" as const, stiffness: 500, damping: 42, mass: 0.5 };

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.45, ease: "easeOut" }}
      style={{
        position: "fixed",
        bottom: "24px",
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      <motion.div
        layout
        layoutId="navbar-pill"
        transition={layoutTransition}
        style={{
          borderRadius: "999px",
          pointerEvents: "auto",
          overflow: "visible",
          cursor: "pointer",
          maxWidth: isOpen ? "min(92vw, 760px)" : "none",
          willChange: "transform",
          isolation: "isolate",
          scale: isOpen ? dragScale : 1,
        }}
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
          }
        }}
        drag={isOpen ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDrag={(_, info) => {
          dragX.set(info.offset.x);
        }}
        onDragEnd={(_, info) => {
          dragX.set(0);
          if (info.offset.x < -50) {
            navigateNext();
          }
          if (info.offset.x > 50) {
            navigatePrev();
          }
        }}
        transformTemplate={({ x = 0, y = 0, scale = 1 }) =>
          `translate3d(${typeof x === "number" ? `${x}px` : x}, ${typeof y === "number" ? `${y}px` : y}, 0) scale(${scale})`
        }
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "999px",
            background: "rgba(10,10,10,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            zIndex: -1,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            padding: isOpen ? "8px 10px" : "10px 20px",
            overflow: "hidden", // ← add this here
            borderRadius: "999px",
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {isOpen && (
              <motion.div
                key="nav-items"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.08, duration: 0.15 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.08 } }}
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <button
                          type="button"
                          onClick={() => navigateToSection(item.id)}
                          style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            minHeight: "44px",
                            borderRadius: "999px",
                            border: "none",
                            background: "transparent",
                            color: isActive ? "#00f5d4" : "#666666",
                            padding: "0 12px",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            lineHeight: 1,
                            cursor: "pointer",
                          }}
                        >
                          {item.label}
                          {isActive ? (
                            <motion.div
                              layoutId="active-indicator"
                              style={{
                                position: "absolute",
                                left: "12px",
                                right: "12px",
                                bottom: "7px",
                                height: "2px",
                                background: "#00f5d4",
                                borderRadius: "999px",
                              }}
                            />
                          ) : null}
                        </button>
                        {index < navItems.length - 1 ? (
                          <span
                            aria-hidden="true"
                            style={{
                              color: "rgba(102,102,102,0.6)",
                              fontSize: "0.9rem",
                            }}
                          >
                            |
                          </span>
                        ) : null}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isOpen ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                minHeight: "24px",
                color: "#bbbbbb",
                fontSize: "0.95rem",
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: "rgba(0,245,212,0.8)",
                }}
              />

              <span>{activeLabel}</span>
            </div>
          ) : null}
        </div>
      </motion.div>
    </motion.nav>
  );
}
