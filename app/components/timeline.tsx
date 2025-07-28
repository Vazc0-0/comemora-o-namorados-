"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Calendar, Plus, X, MapPin, Edit, Trash2 } from "lucide-react"

interface TimelineEvent {
  id: number
  date: string
  title: string
  description: string
  location?: string
  type: "milestone" | "date" | "memory" | "future"
}

export default function Timeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([
    {
      id: 1,
      date: "2023-07-28",
      title: "Nos Conhecemos ❤️",
      description: "O dia em que nossas vidas se cruzaram e tudo mudou para melhor",
      location: "Onde tudo começou",
      type: "milestone",
    },
    {
      id: 2,
      date: "2023-07-28",
      title: "Primeiro Beijo 💋",
      description: "Um momento mágico que aconteceu no mesmo dia em que nos conhecemos",
      type: "milestone",
    },
    {
      id: 3,
      date: "2023-10-31",
      title: "Halloween Juntos 🎃",
      description: "Nossa primeira fantasia de casal - foi hilário!",
      type: "memory",
    },
    {
      id: 4,
      date: "2023-12-25",
      title: "Primeiro Natal 🎄",
      description: "Celebrando as festas juntos pela primeira vez",
      type: "milestone",
    },
    {
      id: 5,
      date: "2024-02-14",
      title: "Dia dos Namorados 🌹",
      description: "Um dia especial cheio de surpresas e carinho",
      type: "date",
    },
    {
      id: 6,
      date: "2024-07-28",
      title: "Pedido de Namoro 💍",
      description: "O dia mais especial - quando oficializamos nosso amor!",
      type: "milestone",
    },
    {
      id: 7,
      date: "2025-07-28",
      title: "1 Ano de Namoro Oficial! 🎉",
      description: "Celebrando nosso primeiro aniversário de relacionamento oficial",
      type: "milestone",
    },
    {
      id: 8,
      date: "2025-12-31",
      title: "Planos para 2026 ✨",
      description: "Sonhando com todas as aventuras que ainda vamos viver juntos",
      type: "future",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
    location: "",
    type: "memory" as TimelineEvent["type"],
  })

  const [editingEvent, setEditingEvent] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    title: "",
    date: "",
    description: "",
    location: "",
    type: "memory" as TimelineEvent["type"],
  })

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.description) {
      const event: TimelineEvent = {
        id: events.length + 1,
        ...newEvent,
      }
      setEvents([...events, event].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
      setNewEvent({ title: "", date: "", description: "", location: "", type: "memory" })
      setShowAddForm(false)
    }
  }

  const getEventColor = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "milestone":
        return "bg-red-100 border-red-300 text-red-700"
      case "date":
        return "bg-pink-100 border-pink-300 text-pink-700"
      case "memory":
        return "bg-purple-100 border-purple-300 text-purple-700"
      case "future":
        return "bg-blue-100 border-blue-300 text-blue-700"
      default:
        return "bg-gray-100 border-gray-300 text-gray-700"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const handleEditEvent = (event: TimelineEvent) => {
    setEditingEvent(event.id)
    setEditForm({
      title: event.title,
      date: event.date,
      description: event.description,
      location: event.location || "",
      type: event.type,
    })
  }

  const handleSaveEdit = () => {
    if (editForm.title && editForm.date && editForm.description && editingEvent) {
      setEvents(events.map((event) => (event.id === editingEvent ? { ...event, ...editForm } : event)))
      setEditingEvent(null)
      setEditForm({ title: "", date: "", description: "", location: "", type: "memory" })
    }
  }

  const handleCancelEdit = () => {
    setEditingEvent(null)
    setEditForm({ title: "", date: "", description: "", location: "", type: "memory" })
  }

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-rose-700 flex items-center justify-center gap-2">
          📅 Nossa Timeline do Amor
          <Heart className="text-red-500" />
        </h2>
        <p className="text-rose-600 text-lg">Cada momento especial da nossa jornada juntos</p>
      </div>

      <div className="flex justify-center">
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-rose-500 hover:bg-rose-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Momento
        </Button>
      </div>

      {showAddForm && (
        <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-rose-700">Adicionar Novo Momento</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Título do momento"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <Input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </div>
            <Input
              placeholder="Local (opcional)"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newEvent.type}
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as TimelineEvent["type"] })}
            >
              <option value="memory">Memória</option>
              <option value="milestone">Marco Importante</option>
              <option value="date">Data Especial</option>
              <option value="future">Plano Futuro</option>
            </select>
            <Textarea
              placeholder="Descrição do momento..."
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddEvent} className="bg-rose-500 hover:bg-rose-600">
                Adicionar
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-300 via-rose-400 to-red-400"></div>

        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={event.id} className="relative flex items-start gap-6">
              {/* Timeline Dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-16 h-16 bg-white border-4 border-rose-400 rounded-full flex items-center justify-center shadow-lg">
                  <Calendar className="w-6 h-6 text-rose-600" />
                </div>
              </div>

              {/* Event Card */}
              {editingEvent === event.id ? (
                <Card className="flex-1 bg-white/90 backdrop-blur-sm border-pink-200 border-2 shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-rose-700">Editar Momento</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Título do momento"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      />
                      <Input
                        type="date"
                        value={editForm.date}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      />
                    </div>
                    <Input
                      placeholder="Local (opcional)"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    />
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={editForm.type}
                      onChange={(e) => setEditForm({ ...editForm, type: e.target.value as TimelineEvent["type"] })}
                    >
                      <option value="memory">Memória</option>
                      <option value="milestone">Marco Importante</option>
                      <option value="date">Data Especial</option>
                      <option value="future">Plano Futuro</option>
                    </select>
                    <Textarea
                      placeholder="Descrição do momento..."
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSaveEdit} className="bg-rose-500 hover:bg-rose-600">
                        Salvar
                      </Button>
                      <Button variant="outline" onClick={handleCancelEdit}>
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  className={`flex-1 ${getEventColor(event.type)} border-2 shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium bg-white/50 px-3 py-1 rounded-full">
                          {formatDate(event.date)}
                        </span>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditEvent(event)}
                            className="h-8 w-8 p-0 hover:bg-white/50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteEvent(event.id)}
                            className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {event.location && (
                      <div className="flex items-center gap-1 mb-2 text-sm opacity-75">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    )}

                    <p className="leading-relaxed">{event.description}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
