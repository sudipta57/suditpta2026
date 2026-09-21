"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Achievements", id: "achievements" },
  { label: "Gallery", id: "gallery" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    // A section is "active" while it crosses the middle of the viewport,
    // which works for sections taller than the screen too.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Keep the active link visible in the horizontally scrolling list on phones.
    // Scrolls ONLY the list. scrollIntoView() would also scroll the page and
    // fight the user's own scrolling (and kill iOS momentum scrolling).
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !link) return;
    const listBox = list.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    const delta = linkBox.left - listBox.left - (listBox.width - linkBox.width) / 2;
    if (Math.abs(delta) > 4) list.scrollBy({ left: delta, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Sections"
      className="sticky top-0 z-40 border-b border-rule bg-paper"
    >
      <div className="mx-auto flex max-w-[680px] items-center gap-2 px-6">
        <ul
          ref={listRef}
          className="-mx-2 flex flex-1 overflow-x-auto [mask-image:linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none] sm:[mask-image:none] [&::-webkit-scrollbar]:hidden"
        >
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  data-id={item.id}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative block whitespace-nowrap px-2 py-4 text-sm ${
                    isActive ? "text-ink" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {item.label}
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-2 bottom-0 h-[2px] bg-signal"
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
}
