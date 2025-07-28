"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function Counter() {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const startDate = new Date("2023-07-28T00:00:00")

    const updateCounter = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeElapsed({ years, months, days, hours, minutes, seconds })
    }

    updateCounter()
    const interval = setInterval(updateCounter, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-gradient-to-r from-rose-100 to-pink-100 border-rose-200 shadow-2xl">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold text-rose-700 mb-6 text-center">⏰ Tempo Juntos</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="text-center bg-white/50 rounded-lg p-4">
            <div className="text-3xl font-bold text-rose-600">{timeElapsed.years}</div>
            <div className="text-sm text-rose-500">Anos</div>
          </div>
          <div className="text-center bg-white/50 rounded-lg p-4">
            <div className="text-3xl font-bold text-rose-600">{timeElapsed.months}</div>
            <div className="text-sm text-rose-500">Meses</div>
          </div>
          <div className="text-center bg-white/50 rounded-lg p-4">
            <div className="text-3xl font-bold text-rose-600">{timeElapsed.days}</div>
            <div className="text-sm text-rose-500">Dias</div>
          </div>
          <div className="text-center bg-white/50 rounded-lg p-4">
            <div className="text-3xl font-bold text-rose-600">{timeElapsed.hours}</div>
            <div className="text-sm text-rose-500">Horas</div>
          </div>
          <div className="text-center bg-white/50 rounded-lg p-4">
            <div className="text-3xl font-bold text-rose-600">{timeElapsed.minutes}</div>
            <div className="text-sm text-rose-500">Minutos</div>
          </div>
          <div className="text-center bg-white/50 rounded-lg p-4">
            <div className="text-3xl font-bold text-rose-600">{timeElapsed.seconds}</div>
            <div className="text-sm text-rose-500">Segundos</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
