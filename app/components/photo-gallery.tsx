"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Plus, X, Edit, Trash2, Camera, Upload, ImageIcon } from "lucide-react"

interface Photo {
  id: number
  url: string
  date: string
  description: string
  title: string
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: 1,
      url: "/placeholder.svg?height=300&width=400",
      date: "28/07/2023",
      description: "Nosso primeiro encontro ❤️",
      title: "Primeiro Encontro",
    },
    {
      id: 2,
      url: "/placeholder.svg?height=300&width=400",
      date: "15/08/2023",
      description: "Caminhada no pôr do sol",
      title: "Pôr do Sol Juntos",
    },
    {
      id: 3,
      url: "/placeholder.svg?height=300&width=400",
      date: "10/09/2023",
      description: "Nosso primeiro jantar romântico",
      title: "Jantar Especial",
    },
    {
      id: 4,
      url: "/placeholder.svg?height=300&width=400",
      date: "25/10/2023",
      description: "Sempre rindo juntos 😄",
      title: "Momentos de Alegria",
    },
    {
      id: 5,
      url: "/placeholder.svg?height=300&width=400",
      date: "25/12/2023",
      description: "Nosso primeiro Natal juntos",
      title: "Natal Especial",
    },
    {
      id: 6,
      url: "/placeholder.svg?height=300&width=400",
      date: "31/12/2023",
      description: "Começando o ano novo ao seu lado",
      title: "Ano Novo",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newPhoto, setNewPhoto] = useState({
    title: "",
    date: "",
    description: "",
    url: "",
  })

  const [editingPhoto, setEditingPhoto] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    title: "",
    date: "",
    description: "",
    url: "",
  })

  const [dragActive, setDragActive] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const handleFiles = useCallback((files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setNewPhoto((prev) => ({
            ...prev,
            url: e.target?.result as string,
          }))
        }
        reader.readAsDataURL(file)
      }
    })
  }, [])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles],
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setShowCamera(true)
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err)
      alert("Não foi possível acessar a câmera. Verifique as permissões.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setShowCamera(false)
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        context.drawImage(video, 0, 0)
        const imageDataUrl = canvas.toDataURL("image/jpeg")
        setNewPhoto((prev) => ({
          ...prev,
          url: imageDataUrl,
        }))
        stopCamera()
      }
    }
  }

  const handleAddPhoto = () => {
    if (newPhoto.title && newPhoto.date && newPhoto.description) {
      const photo: Photo = {
        id: photos.length + 1,
        url: newPhoto.url || `/placeholder.svg?height=300&width=400&query=${newPhoto.title}`,
        date: newPhoto.date,
        description: newPhoto.description,
        title: newPhoto.title,
      }
      setPhotos([...photos, photo])
      setNewPhoto({ title: "", date: "", description: "", url: "" })
      setShowAddForm(false)
    }
  }

  const handleEditPhoto = (photo: Photo) => {
    setEditingPhoto(photo.id)
    setEditForm({
      title: photo.title,
      date: photo.date,
      description: photo.description,
      url: photo.url,
    })
  }

  const handleSaveEdit = () => {
    if (editForm.title && editForm.date && editForm.description && editingPhoto) {
      setPhotos(photos.map((photo) => (photo.id === editingPhoto ? { ...photo, ...editForm } : photo)))
      setEditingPhoto(null)
      setEditForm({ title: "", date: "", description: "", url: "" })
    }
  }

  const handleCancelEdit = () => {
    setEditingPhoto(null)
    setEditForm({ title: "", date: "", description: "", url: "" })
  }

  const handleDeletePhoto = (photoId: number) => {
    setPhotos(photos.filter((photo) => photo.id !== photoId))
  }

  const formatDateForInput = (dateString: string) => {
    const [day, month, year] = dateString.split("/")
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  }

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-rose-700 flex items-center justify-center gap-2">
          📸 Nossa Galeria de Momentos
          <Heart className="text-red-500" />
        </h2>
        <p className="text-rose-600 text-lg">Cada foto conta uma parte da nossa história de amor</p>
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

            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-rose-400 bg-rose-50" : "border-gray-300 hover:border-rose-300"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {newPhoto.url ? (
                <div className="space-y-4">
                  <img
                    src={newPhoto.url || "/placeholder.svg"}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded-lg shadow-md"
                  />
                  <Button variant="outline" onClick={() => setNewPhoto((prev) => ({ ...prev, url: "" }))}>
                    Remover Foto
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                  <div className="space-y-2">
                    <p className="text-gray-600">Arraste uma foto aqui ou</p>
                    <div className="flex gap-2 justify-center flex-wrap">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-rose-600 border-rose-300 hover:bg-rose-50"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Escolher Arquivo
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={startCamera}
                        className="text-rose-600 border-rose-300 hover:bg-rose-50 bg-transparent"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Tirar Foto
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Título do momento"
                value={newPhoto.title}
                onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
              />
              <Input
                type="date"
                value={newPhoto.date}
                onChange={(e) => setNewPhoto({ ...newPhoto, date: e.target.value })}
              />
            </div>

            <Textarea
              placeholder="Descrição do momento..."
              value={newPhoto.description}
              onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddPhoto} className="bg-rose-500 hover:bg-rose-600">
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

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-white max-w-md w-full">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-rose-700">Tirar Foto</h3>
                <Button variant="ghost" onClick={stopCamera}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="relative">
                <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="flex gap-2 justify-center">
                <Button onClick={capturePhoto} className="bg-rose-500 hover:bg-rose-600">
                  <Camera className="w-4 h-4 mr-2" />
                  Capturar
                </Button>
                <Button variant="outline" onClick={stopCamera}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div key={photo.id}>
            {editingPhoto === photo.id ? (
              <Card className="bg-white/90 backdrop-blur-sm border-pink-200 border-2 shadow-lg">
                <CardContent className="p-4 space-y-4">
                  <h3 className="text-lg font-semibold text-rose-700">Editar Momento</h3>

                  {/* Edit Photo Upload */}
                  <div className="space-y-2">
                    <img
                      src={editForm.url || "/placeholder.svg"}
                      alt={editForm.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full text-rose-600 border-rose-300 hover:bg-rose-50"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Alterar Foto
                    </Button>
                  </div>

                  <Input
                    placeholder="Título do momento"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  />
                  <Input
                    type="date"
                    value={formatDateForInput(editForm.date)}
                    onChange={(e) => setEditForm({ ...editForm, date: formatDateForDisplay(e.target.value) })}
                  />
                  <Textarea
                    placeholder="Descrição do momento..."
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveEdit} className="bg-rose-500 hover:bg-rose-600 flex-1">
                      Salvar
                    </Button>
                    <Button variant="outline" onClick={handleCancelEdit} className="flex-1 bg-transparent">
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img src={photo.url || "/placeholder.svg"} alt={photo.title} className="w-full h-64 object-cover" />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditPhoto(photo)}
                        className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                      >
                        <Edit className="w-4 h-4 text-rose-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="h-8 w-8 p-0 bg-white/90 hover:bg-red-100 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Heart className="w-4 h-4 text-red-500" />
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-rose-700">{photo.title}</h3>
                      <span className="text-sm text-rose-500 bg-rose-50 px-2 py-1 rounded">{photo.date}</span>
                    </div>
                    <p className="text-rose-600 text-sm">{photo.description}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
