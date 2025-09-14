"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Heart, Volume2, VolumeX, Shuffle, SkipBack, Play, Pause, SkipForward, Repeat } from "lucide-react"
import Image from "next/image"

export function AppleMusicWidget() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off")
  const [volume, setVolume] = useState(75)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Play / pause control
  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  // Update current time & progress
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setCurrentTime(audio.currentTime)
      setProgress((audio.currentTime / audio.duration) * 100 || 0)
    }

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration))

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
    }
  }, [])

  // Volume & mute
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = isMuted ? 0 : volume / 100
  }, [volume, isMuted])

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="w-80 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
      {/* AUDIO ELEMENT */}
      <audio
        ref={audioRef}
        src="https://stream-177.zeno.fm/is5vsx5ezpmvv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJpczV2c3g1ZXpwbXZ2IiwiaG9zdCI6InN0cmVhbS0xNzcuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6ImpNQmlfSnhIU2lTNmpsNVlDY1BYcnciLCJpYXQiOjE3NTc4MjgwMzAsImV4cCI6MTc1NzgyODA5MH0.Pc6dRXjkMc7b1K0wgqQuFGppKd_mNBl2j66Uw1XWzpY"
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Cover Art */}
      <div className="relative mb-4 group">
        <Image
          src="/images/making-memories-album.jpg"
          alt="Karan Aujla - Making Memories"
          width={256}
          height={256}
          className="w-full aspect-square rounded-xl object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Song Info + Like + Volume */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-white text-lg font-[590] mb-1">SONFM Radio</h3>
          <p className="text-white/70 text-sm font-normal">Señal En Vivo</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setIsMuted(!isMuted)}
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
              className="p-2 rounded-full text-white/70 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-white/10"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            {showVolumeSlider && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/80 backdrop-blur-sm rounded-lg p-2 w-24"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div
          className="relative h-1 bg-white/20 rounded-full mb-2 cursor-pointer hover:h-1.5 transition-all duration-200"
          onClick={handleProgressClick}
        >
          <div
            className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsShuffled(!isShuffled)}
          className={`p-2 rounded-full ${isShuffled ? "text-white" : "text-white/70 hover:text-white"} hover:bg-white/10`}
        >
          <Shuffle className="w-5 h-5" />
        </button>

        <button className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10">
          <SkipBack className="w-5 h-5" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`p-3 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-200 hover:scale-110 active:scale-95 ${
            isPlaying ? "animate-pulse" : ""
          }`}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
        </button>

        <button className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10">
          <SkipForward className="w-5 h-5" />
        </button>

        <button
          onClick={() =>
            setRepeatMode(repeatMode === "off" ? "all" : repeatMode === "all" ? "one" : "off")
          }
          className={`p-2 rounded-full relative ${
            repeatMode !== "off" ? "text-white" : "text-white/70 hover:text-white"
          } hover:bg-white/10`}
        >
          <Repeat className="w-5 h-5" />
          {repeatMode === "one" && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-xs rounded-full flex items-center justify-center font-bold">
              1
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
