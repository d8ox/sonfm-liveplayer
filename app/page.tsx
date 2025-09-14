import { AppleMusicWidget } from "@/components/apple-music-widget"
import { TimeWeatherWidget } from "@/components/time-weather-widget"
import { F1RaceWidget } from "@/components/f1-race-widget"

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-8"
      style={{
        backgroundImage: "url('/images/bgg1.jpg')",
      }}
    >
      {/* Widgets Container */}
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        <AppleMusicWidget />
        <TimeWeatherWidget />
        <F1RaceWidget />
      </div>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl px-6 py-4">
        <p className="text-white/90 text-sm">
          Desarrollo web por{" "}
          <a
            href="https://08crew.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 transition-colors underline"
          >
            08 Crew
          </a>
        </p>
      </footer>
    </div>
  )
}
