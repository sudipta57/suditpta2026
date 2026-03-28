"use client"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio("./sudipta.mp3")
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio
    return () => { audio.pause(); audio.src = "" }
  }, [])

  const toggle = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(prev => !prev)
  }

  return (
    <motion.div
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      style={{
        position: "absolute",
        bottom: "-20px",
        right: "-52px",
        width: "64px",
        height: "64px",
        borderRadius: "999px",
        cursor: "pointer",
        zIndex: 10,
      }}
    >
      {/* spinning avatar */}
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: "999px",
        overflow: "hidden",
        border: "2px solid rgba(255,255,255,0.15)",
        animation: isPlaying ? "spin 4s linear infinite" : "none",
        position: "relative",
      }}>
        <Image src="/sinchan_avatar.jpeg" alt="music" fill style={{ objectFit: "cover" }} />
      </div>

      {/* pulse ring */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            key="pulse"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "999px",
              border: "2px solid rgba(0,245,212,0.5)",
              animation: "pulse-ring 1.5s ease-out infinite",
            }}
          />
        )}
      </AnimatePresence>

      {/* music note badge */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            key="note"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              width: "20px",
              height: "20px",
              borderRadius: "999px",
              background: "#00f5d4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              color: "#000",
            }}
          >
            ♪
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
