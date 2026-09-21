"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/sudipta.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else void audioRef.current.play();
    setIsPlaying((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      aria-pressed={isPlaying}
      className="absolute -bottom-3 -right-3 z-10 h-11 w-11 rounded-full border-2 border-paper outline-none focus-visible:ring-2 focus-visible:ring-signal"
      style={{
        boxShadow: isPlaying
          ? "0 0 0 2px var(--signal)"
          : "0 0 0 1px var(--rule)",
      }}
    >
      <span
        className="relative block h-full w-full overflow-hidden rounded-full motion-reduce:!animate-none"
        style={{ animation: isPlaying ? "spin 4s linear infinite" : "none" }}
      >
        <Image
          src="/sinchan_avatar.jpeg"
          alt=""
          fill
          sizes="44px"
          style={{ objectFit: "cover" }}
        />
      </span>
    </button>
  );
}
