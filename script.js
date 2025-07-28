// Global variables
let photos = [
  {
    id: 1,
    url: "https://via.placeholder.com/400x300/f9a8d4/be185d?text=Primeiro+Encontro",
    date: "28/07/2023",
    description: "Nosso primeiro encontro ❤️",
    title: "Primeiro Encontro",
  },
  {
    id: 2,
    url: "https://via.placeholder.com/400x300/fce7f3/be185d?text=Por+do+Sol",
    date: "15/08/2023",
    description: "Caminhada no pôr do sol",
    title: "Pôr do Sol Juntos",
  },
  {
    id: 3,
    url: "https://via.placeholder.com/400x300/f9a8d4/be185d?text=Jantar+Romantico",
    date: "10/09/2023",
    description: "Nosso primeiro jantar romântico",
    title: "Jantar Especial",
  },
  {
    id: 4,
    url: "https://via.placeholder.com/400x300/fce7f3/be185d?text=Momentos+Alegria",
    date: "25/10/2023",
    description: "Sempre rindo juntos 😄",
    title: "Momentos de Alegria",
  },
  {
    id: 5,
    url: "https://via.placeholder.com/400x300/f9a8d4/be185d?text=Natal+Especial",
    date: "25/12/2023",
    description: "Nosso primeiro Natal juntos",
    title: "Natal Especial",
  },
  {
    id: 6,
    url: "https://via.placeholder.com/400x300/fce7f3/be185d?text=Ano+Novo",
    date: "31/12/2023",
    description: "Começando o ano novo ao seu lado",
    title: "Ano Novo",
  },
]

let events = [
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
]

let stream = null

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  updateCounter()
  setInterval(updateCounter, 1000)
  renderPhotos()
  renderEvents()
  setupEventListeners()
}

// Navigation
function showSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll(".section")
  sections.forEach((section) => section.classList.remove("active"))

  // Show selected section
  document.getElementById(sectionName).classList.add("active")

  // Update navigation buttons
  const navButtons = document.querySelectorAll(".nav-btn")
  navButtons.forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")
}

// Counter functionality
function updateCounter() {
  const startDate = new Date("2023-07-28T00:00:00")
  const now = new Date()
  const diff = now.getTime() - startDate.getTime()

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
  const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  document.getElementById("years").textContent = years
  document.getElementById("months").textContent = months
  document.getElementById("days").textContent = days
  document.getElementById("hours").textContent = hours
  document.getElementById("minutes").textContent = minutes
  document.getElementById("seconds").textContent = seconds
}

// Photo Gallery
function renderPhotos() {
  const galleryGrid = document.getElementById("galleryGrid")
  galleryGrid.innerHTML = ""

  photos.forEach((photo) => {
    const photoCard = createPhotoCard(photo)
    galleryGrid.appendChild(photoCard)
  })
}

function createPhotoCard(photo) {
  const card = document.createElement("div")
  card.className = "photo-card fade-in"

  card.innerHTML = `
        <div class="photo-container">
            <img src="${photo.url}" alt="${photo.title}" loading="lazy">
            <div class="photo-actions">
                <button class="btn-outline btn-small" onclick="editPhoto(${photo.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-outline btn-small" onclick="deletePhoto(${photo.id})" style="color: #dc2626; border-color: #dc2626;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="photo-heart">
                <i class="fas fa-heart"></i>
            </div>
        </div>
        <div class="photo-info">
            <div class="photo-header">
                <h3 class="photo-title">${photo.title}</h3>
                <span class="photo-date">${photo.date}</span>
            </div>
            <p class="photo-description">${photo.description}</p>
        </div>
    `

  return card
}

function deletePhoto(photoId) {
  if (confirm("Tem certeza que deseja excluir esta foto?")) {
    photos = photos.filter((photo) => photo.id !== photoId)
    renderPhotos()
  }
}

function editPhoto(photoId) {
  const photo = photos.find((p) => p.id === photoId)
  if (photo) {
    document.getElementById("photoTitle").value = photo.title
    document.getElementById("photoDate").value = formatDateForInput(photo.date)
    document.getElementById("photoDescription").value = photo.description

    // Set preview image
    const previewContainer = document.getElementById("previewContainer")
    const previewImage = document.getElementById("previewImage")
    const uploadContent = document.querySelector(".upload-content")

    previewImage.src = photo.url
    previewContainer.style.display = "flex"
    uploadContent.style.display = "none"

    // Store the photo ID for editing
    document.getElementById("addPhotoModal").dataset.editingId = photoId

    openAddPhotoModal()
  }
}

// Timeline
function renderEvents() {
  const timelineEvents = document.getElementById("timelineEvents")
  timelineEvents.innerHTML = ""

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date))

  sortedEvents.forEach((event) => {
    const eventElement = createEventElement(event)
    timelineEvents.appendChild(eventElement)
  })
}

function createEventElement(event) {
  const eventDiv = document.createElement("div")
  eventDiv.className = "timeline-event fade-in"

  eventDiv.innerHTML = `
        <div class="timeline-dot">
            <i class="fas fa-calendar"></i>
        </div>
        <div class="event-card ${event.type}">
            <div class="event-header">
                <h3 class="event-title">${event.title}</h3>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <span class="event-date">${formatDate(event.date)}</span>
                    <button class="btn-outline btn-small" onclick="editEvent(${event.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-outline btn-small" onclick="deleteEvent(${event.id})" style="color: #dc2626; border-color: #dc2626;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            ${
              event.location
                ? `
                <div class="event-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${event.location}
                </div>
            `
                : ""
            }
            <p class="event-description">${event.description}</p>
        </div>
    `

  return eventDiv
}

function deleteEvent(eventId) {
  if (confirm("Tem certeza que deseja excluir este evento?")) {
    events = events.filter((event) => event.id !== eventId)
    renderEvents()
  }
}

function editEvent(eventId) {
  const event = events.find((e) => e.id === eventId)
  if (event) {
    document.getElementById("eventTitle").value = event.title
    document.getElementById("eventDate").value = event.date
    document.getElementById("eventLocation").value = event.location || ""
    document.getElementById("eventType").value = event.type
    document.getElementById("eventDescription").value = event.description

    // Store the event ID for editing
    document.getElementById("addEventModal").dataset.editingId = eventId

    openAddEventModal()
  }
}

// Modal functions
function openAddPhotoModal() {
  document.getElementById("addPhotoModal").classList.add("active")
}

function closeAddPhotoModal() {
  document.getElementById("addPhotoModal").classList.remove("active")
  resetPhotoForm()
}

function openAddEventModal() {
  document.getElementById("addEventModal").classList.add("active")
}

function closeAddEventModal() {
  document.getElementById("addEventModal").classList.remove("active")
  resetEventForm()
}

function resetPhotoForm() {
  document.getElementById("photoTitle").value = ""
  document.getElementById("photoDate").value = ""
  document.getElementById("photoDescription").value = ""
  document.getElementById("fileInput").value = ""

  const previewContainer = document.getElementById("previewContainer")
  const uploadContent = document.querySelector(".upload-content")

  previewContainer.style.display = "none"
  uploadContent.style.display = "flex"

  delete document.getElementById("addPhotoModal").dataset.editingId
}

function resetEventForm() {
  document.getElementById("eventTitle").value = ""
  document.getElementById("eventDate").value = ""
  document.getElementById("eventLocation").value = ""
  document.getElementById("eventType").value = "memory"
  document.getElementById("eventDescription").value = ""

  delete document.getElementById("addEventModal").dataset.editingId
}

// Add photo functionality
function addPhoto() {
  const title = document.getElementById("photoTitle").value
  const date = document.getElementById("photoDate").value
  const description = document.getElementById("photoDescription").value
  const previewImage = document.getElementById("previewImage")

  if (!title || !date || !description) {
    alert("Por favor, preencha todos os campos obrigatórios.")
    return
  }

  const editingId = document.getElementById("addPhotoModal").dataset.editingId

  if (editingId) {
    // Edit existing photo
    const photoIndex = photos.findIndex((p) => p.id === Number.parseInt(editingId))
    if (photoIndex !== -1) {
      photos[photoIndex] = {
        ...photos[photoIndex],
        title,
        date: formatDateForDisplay(date),
        description,
        url: previewImage.src || photos[photoIndex].url,
      }
    }
  } else {
    // Add new photo
    const newPhoto = {
      id: photos.length + 1,
      url: previewImage.src || `https://via.placeholder.com/400x300/f9a8d4/be185d?text=${encodeURIComponent(title)}`,
      date: formatDateForDisplay(date),
      description,
      title,
    }
    photos.push(newPhoto)
  }

  renderPhotos()
  closeAddPhotoModal()
}

// Add event functionality
function addEvent() {
  const title = document.getElementById("eventTitle").value
  const date = document.getElementById("eventDate").value
  const location = document.getElementById("eventLocation").value
  const type = document.getElementById("eventType").value
  const description = document.getElementById("eventDescription").value

  if (!title || !date || !description) {
    alert("Por favor, preencha todos os campos obrigatórios.")
    return
  }

  const editingId = document.getElementById("addEventModal").dataset.editingId

  if (editingId) {
    // Edit existing event
    const eventIndex = events.findIndex((e) => e.id === Number.parseInt(editingId))
    if (eventIndex !== -1) {
      events[eventIndex] = {
        ...events[eventIndex],
        title,
        date,
        location,
        type,
        description,
      }
    }
  } else {
    // Add new event
    const newEvent = {
      id: events.length + 1,
      date,
      title,
      description,
      location,
      type,
    }
    events.push(newEvent)
  }

  renderEvents()
  closeAddEventModal()
}

// File upload functionality
function setupEventListeners() {
  const fileInput = document.getElementById("fileInput")
  const uploadArea = document.getElementById("uploadArea")

  fileInput.addEventListener("change", handleFileSelect)

  uploadArea.addEventListener("dragover", handleDragOver)
  uploadArea.addEventListener("dragleave", handleDragLeave)
  uploadArea.addEventListener("drop", handleDrop)

  // Close modals when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      if (e.target.id === "addPhotoModal") closeAddPhotoModal()
      if (e.target.id === "addEventModal") closeAddEventModal()
      if (e.target.id === "cameraModal") closeCameraModal()
    }
  })
}

function handleFileSelect(e) {
  const file = e.target.files[0]
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader()
    reader.onload = (e) => {
      showPreview(e.target.result)
    }
    reader.readAsDataURL(file)
  }
}

function handleDragOver(e) {
  e.preventDefault()
  e.stopPropagation()
  document.getElementById("uploadArea").classList.add("dragover")
}

function handleDragLeave(e) {
  e.preventDefault()
  e.stopPropagation()
  document.getElementById("uploadArea").classList.remove("dragover")
}

function handleDrop(e) {
  e.preventDefault()
  e.stopPropagation()
  document.getElementById("uploadArea").classList.remove("dragover")

  const files = e.dataTransfer.files
  if (files.length > 0 && files[0].type.startsWith("image/")) {
    const reader = new FileReader()
    reader.onload = (e) => {
      showPreview(e.target.result)
    }
    reader.readAsDataURL(files[0])
  }
}

function showPreview(src) {
  const previewContainer = document.getElementById("previewContainer")
  const previewImage = document.getElementById("previewImage")
  const uploadContent = document.querySelector(".upload-content")

  previewImage.src = src
  previewContainer.style.display = "flex"
  uploadContent.style.display = "none"
}

function removePreview() {
  const previewContainer = document.getElementById("previewContainer")
  const uploadContent = document.querySelector(".upload-content")

  previewContainer.style.display = "none"
  uploadContent.style.display = "flex"

  document.getElementById("fileInput").value = ""
}

// Camera functionality
function openCamera() {
  document.getElementById("cameraModal").classList.add("active")
  startCamera()
}

function closeCameraModal() {
  document.getElementById("cameraModal").classList.remove("active")
  stopCamera()
}

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    })
    document.getElementById("cameraVideo").srcObject = stream
  } catch (err) {
    console.error("Erro ao acessar a câmera:", err)
    alert("Não foi possível acessar a câmera. Verifique as permissões.")
  }
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop())
    stream = null
  }
}

function capturePhoto() {
  const video = document.getElementById("cameraVideo")
  const canvas = document.getElementById("cameraCanvas")
  const context = canvas.getContext("2d")

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  context.drawImage(video, 0, 0)
  const imageDataUrl = canvas.toDataURL("image/jpeg")

  showPreview(imageDataUrl)
  closeCameraModal()
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function formatDateForInput(dateString) {
  const [day, month, year] = dateString.split("/")
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
}

function formatDateForDisplay(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR")
}

// Service Worker for offline functionality (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful")
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed")
      })
  })
}
