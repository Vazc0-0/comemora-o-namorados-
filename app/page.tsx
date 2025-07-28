"use client"

import { useState, useEffect } from "react"
import { Heart, Calendar, Camera, Clock, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PhotoGallery from "./components/photo-gallery"
import Timeline from "./components/timeline"
import Counter from "./components/counter"

export default function AnniversaryPage() {
  const [currentSection, setCurrentSection] = useState("home")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      {/* Floating Hearts Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300 opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6 bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-rose-600 flex items-center gap-2">
            <Heart className="text-red-500" />
            Nossa História de Amor
          </h1>
          <div className="flex gap-4">
            <Button
              variant={currentSection === "home" ? "default" : "ghost"}
              onClick={() => setCurrentSection("home")}
              className="text-rose-600 hover:text-rose-700"
            >
              <Clock className="w-4 h-4 mr-2" />
              Início
            </Button>
            <Button
              variant={currentSection === "gallery" ? "default" : "ghost"}
              onClick={() => setCurrentSection("gallery")}
              className="text-rose-600 hover:text-rose-700"
            >
              <Camera className="w-4 h-4 mr-2" />
              Galeria
            </Button>
            <Button
              variant={currentSection === "timeline" ? "default" : "ghost"}
              onClick={() => setCurrentSection("timeline")}
              className="text-rose-600 hover:text-rose-700"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Timeline
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 p-6">
        {currentSection === "home" && (
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-5xl font-bold text-rose-700 mb-4">💕 1 Ano Juntos 💕</h2>
              <p className="text-xl text-rose-600 max-w-2xl mx-auto leading-relaxed">
                Desde 28 de julho de 2023, nossa história de amor começou a ser escrita. Cada dia ao seu lado é uma nova
                página repleta de carinho, risadas e momentos únicos.
              </p>
            </div>

            <Counter />

            <Card className="bg-white/70 backdrop-blur-sm border-pink-200 shadow-xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <Sparkles className="w-8 h-8 text-yellow-500 mx-auto" />
                    <h3 className="font-semibold text-rose-700">Momentos Mágicos</h3>
                    <p className="text-rose-600 text-sm">Cada segundo ao seu lado é especial</p>
                  </div>
                  <div className="space-y-2">
                    <Heart className="w-8 h-8 text-red-500 mx-auto" />
                    <h3 className="font-semibold text-rose-700">Amor Verdadeiro</h3>
                    <p className="text-rose-600 text-sm">Um sentimento que cresce a cada dia</p>
                  </div>
                  <div className="space-y-2">
                    <Calendar className="w-8 h-8 text-purple-500 mx-auto" />
                    <h3 className="font-semibold text-rose-700">Futuro Juntos</h3>
                    <p className="text-rose-600 text-sm">Muitas aventuras ainda nos esperam</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-8 border border-pink-200">
              <h3 className="text-2xl font-bold text-rose-700 mb-4">💌 Uma Mensagem Especial</h3>
              <p className="text-rose-600 text-lg leading-relaxed italic">
                "O amor não se vê com os olhos, mas com o coração. E meu coração escolheu você para ser minha companhia
                nesta jornada chamada vida. Obrigado(a) por fazer cada dia mais colorido e cheio de significado. Te amo
                hoje, amanhã e sempre! 💕"
              </p>
            </div>
          </div>
        )}

        {currentSection === "gallery" && <PhotoGallery />}
        {currentSection === "timeline" && <Timeline />}
      </main>
    </div>
  )
}
