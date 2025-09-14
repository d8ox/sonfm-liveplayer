"use client"

import { useState, useEffect } from "react"
import { RefreshCw, Sun, Cloud, CloudRain, Snowflake, Wind, Youtube } from "lucide-react"

const weatherConditions = [
  { name: "Hard Dance", icon: Sun, temp: 24, feels: 26, humidity: 45, color: "bg-yellow-500" },
  { name: "La Trifulka", icon: Cloud, temp: 18, feels: 20, humidity: 65, color: "bg-gray-500" },
  { name: "Musica con Diego", icon: CloudRain, temp: 15, feels: 13, humidity: 85, color: "bg-blue-500" },
  { name: "Mezclas con Nacho", icon: Snowflake, temp: -2, feels: -5, humidity: 75, color: "bg-blue-200" },
  { name: "Mañanero", icon: Wind, temp: 20, feels: 18, humidity: 55, color: "bg-teal-500" },
]

export function TimeWeatherWidget() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [weatherIndex, setWeatherIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const currentWeather = weatherConditions[weatherIndex]
  const WeatherIcon = currentWeather.icon

  const refreshWeather = () => {
    setWeatherIndex((prev) => (prev + 1) % weatherConditions.length)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-CR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleSubscribe = () => {
    window.open("https://youtube.com/@diecastbydollar", "_blank")
  }

  return (
    <div className="w-80 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-6">
      {/* Time Display */}
      <div className="mb-6">
        <div className="text-4xl font-mono tabular-nums text-white font-bold mb-2">{formatTime(currentTime)}</div>
        <div className="text-white/70 text-sm">{formatDate(currentTime)}</div>
      </div>

      {/* Weather Section */}
      <div className="border-t border-white/20 pt-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Programación</h3>
          <button
            onClick={refreshWeather}
            className="p-1 rounded-full text-white/70 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-full ${currentWeather.color}`}>
            <WeatherIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-white font-semibold">{currentWeather.name}</div>
            <div className="text-2xl font-bold text-white tabular-nums">{currentWeather.temp}°C</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Repetición</span>
            <span className="text-white tabular-nums">{currentWeather.feels}°C</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Host</span>
            <span className="text-white tabular-nums">{currentWeather.humidity}%</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-white font-semibold text-sm">Mira la webcam de la cabina</h3>
            <p className="text-white/70 text-xs">Video en vivo patrocinado por:</p>
          </div>
          <div className="flex items-center gap-2">
            <Youtube className="w-4 h-4 text-red-500" />
          </div>
        </div>

        <button
          onClick={handleSubscribe}
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          <Youtube className="w-4 h-4" />
          Ver webcam
        </button>
        <p className="text-white/60 text-xs text-center mt-2">Programación sujeta a los programas en vivo</p>
      </div>
    </div>
  )
}
