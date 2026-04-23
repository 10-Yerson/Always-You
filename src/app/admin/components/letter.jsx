'use client'

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import {
  Mail, Plus, Edit, Trash2, Eye, Calendar,
  Image as ImageIcon, Video, Music,
  Loader2, Search, X, Heart, Sparkles,
  ChevronLeft, ChevronRight
} from "lucide-react";

export default function AdminLetters() {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [letterToDelete, setLetterToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    month: "",
    imageUrl: "",
    videoUrl: "",
    audioUrl: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [previewAudio, setPreviewAudio] = useState(null);

  // Estado para el carrusel de multimedia en el modal de vista
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mediaItems, setMediaItems] = useState([]);

  const months = [
    "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
    "Octubre", "Noviembre", "Diciembre", "Enero",
    "Febrero", "Marzo", "Abril"
  ];

  const fetchLetters = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/letter/admin");
      setLetters(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar las cartas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLetters();
  }, []);

  const filteredLetters = letters.filter(letter =>
    letter.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.month?.toString().includes(searchTerm) ||
    months[(letter.month - 1) % 12]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (letter = null) => {
    if (letter) {
      setEditingId(letter._id);
      setFormData({
        title: letter.title || "",
        message: letter.message || "",
        month: letter.month || "",
        imageUrl: letter.imageUrl || "",
        videoUrl: letter.videoUrl || "",
        audioUrl: letter.audioUrl || ""
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        message: "",
        month: "",
        imageUrl: "",
        videoUrl: "",
        audioUrl: ""
      });
    }
    setImageFile(null);
    setVideoFile(null);
    setAudioFile(null);
    setPreviewImage(null);
    setPreviewVideo(null);
    setPreviewAudio(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLetter(null);
    setFormData({
      title: "",
      message: "",
      month: "",
      imageUrl: "",
      videoUrl: "",
      audioUrl: ""
    });
    setEditingId(null);
    setImageFile(null);
    setVideoFile(null);
    setAudioFile(null);
    setPreviewImage(null);
    setPreviewVideo(null);
    setPreviewAudio(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewVideo(URL.createObjectURL(file));
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setPreviewAudio(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("month", formData.month);

      if (imageFile) formDataToSend.append("image", imageFile);
      if (videoFile) formDataToSend.append("video", videoFile);
      if (audioFile) formDataToSend.append("audio", audioFile);

      if (editingId) {
        await axios.put(`/api/letter/${editingId}`, formDataToSend);
        toast.success("Carta actualizada");
      } else {
        await axios.post("/api/letter", formDataToSend);
        toast.success("Carta creada");
      }
      fetchLetters();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error al guardar");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!letterToDelete) return;
    try {
      await axios.delete(`/api/letter/${letterToDelete}`);
      toast.success("Carta eliminada");
      fetchLetters();
      setShowDeleteModal(false);
      setLetterToDelete(null);
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  const viewLetter = (letter) => {
    // Recopilar archivos multimedia
    const items = [];
    if (letter.imageUrl) items.push({ type: 'image', url: letter.imageUrl });
    if (letter.videoUrl) items.push({ type: 'video', url: letter.videoUrl });
    if (letter.audioUrl) items.push({ type: 'audio', url: letter.audioUrl });

    setMediaItems(items);
    setCurrentMediaIndex(0);
    setSelectedLetter(letter);
  };

  const nextMedia = () => {
    if (currentMediaIndex < mediaItems.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
  };

  const prevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  const getMonthName = (monthNumber) => months[(monthNumber - 1) % 12];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-5 h-5 text-blue-500" />
            <h1 className="text-xl font-bold text-gray-800">Administrar Cartas</h1>
          </div>
          <p className="text-xs text-gray-500 ml-7">Gestiona todas las cartas</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all shadow-md shadow-blue-200 text-sm font-medium w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          Nueva Carta
        </button>
      </div>

      {/* Buscador */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar cartas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
        />
      </div>

      {/* Estadísticas - Compactas */}
      <div className="flex mb-6">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm p-1">

          {/* Total Cartas */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50">
            <Mail className="w-4 h-4 text-blue-500" />
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-gray-800">{letters.length}</span>
              <span className="text-[10px] text-gray-500">Total</span>
            </div>
          </div>

          {/* Separador */}
          <div className="w-px h-6 bg-gray-200"></div>

          {/* Disponibles */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full">
            <Eye className="w-4 h-4 text-emerald-500" />
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-gray-800">
                {letters.filter(l => l.status === 'disponible').length}
              </span>
              <span className="text-[10px] text-gray-500">Activas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de cartas */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : filteredLetters.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">No hay cartas</p>
          <button onClick={() => openModal()} className="text-blue-500 text-sm mt-2">Crear primera carta</button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLetters.map((letter, index) => (
            <div
              key={letter._id}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Barra superior de color según estado */}
              <div className={`h-1 w-full ${letter.status === 'disponible' ? 'bg-green-500' : 'bg-gray-300'}`} />

              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Header con número y título */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">
                        {letter.title}
                      </h3>
                      {/* Badge de estado */}
                      {letter.status === 'disponible' && (
                        <span className="ml-auto text-[9px] px-1.5 py-0.5 bg-green-100 text-green-600 rounded-full">
                          Activa
                        </span>
                      )}
                    </div>

                    {/* Fecha */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>Mes {letter.month} - {getMonthName(letter.month)}</span>
                    </div>

                    {/* Preview del mensaje */}
                    <p className="text-gray-500 text-xs line-clamp-1 mb-2">
                      {letter.message.substring(0, 80)}...
                    </p>

                    {/* Multimedia tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {letter.imageUrl && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[10px] font-medium">
                          <ImageIcon className="w-3 h-3" />
                          Imagen
                        </span>
                      )}
                      {letter.videoUrl && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-medium">
                          <Video className="w-3 h-3" />
                          Video
                        </span>
                      )}
                      {letter.audioUrl && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full text-[10px] font-medium">
                          <Music className="w-3 h-3" />
                          Audio
                        </span>
                      )}
                      {!letter.imageUrl && !letter.videoUrl && !letter.audioUrl && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-gray-400 rounded-full text-[10px]">
                          <Mail className="w-3 h-3" />
                          Solo texto
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-0.5 ml-2">
                    <button
                      onClick={() => viewLetter(letter)}
                      className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                      title="Ver carta"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openModal(letter)}
                      className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { setLetterToDelete(letter._id); setShowDeleteModal(true); }}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Footer con fecha de creación */}
                <div className="mt-3 pt-2 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-[9px] text-gray-300">
                    Creada el {new Date(letter.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-[9px] text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click para ver detalles →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de vista con carrusel */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedLetter(null)}>
          <div className="relative w-full max-w-md max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-blue-600 px-5 py-3 text-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">{selectedLetter.title}</h2>
                <button onClick={() => setSelectedLetter(null)} className="p-1 hover:bg-white/20 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <p className="text-xs text-blue-200 mt-1">Mes {selectedLetter.month} - {getMonthName(selectedLetter.month)}</p>
            </div>

            <div className="p-5 space-y-4">
              {/* Mensaje */}
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-gray-700 text-sm leading-relaxed">{selectedLetter.message}</p>
              </div>

              {/* Carrusel de multimedia */}
              {mediaItems.length > 0 && (
                <div className="relative">
                  {/* Contenido multimedia */}
                  <div className="bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center min-h-[200px]">
                    {mediaItems[currentMediaIndex]?.type === 'image' && (
                      <img src={mediaItems[currentMediaIndex].url} alt="Imagen" className="w-full object-contain max-h-64" />
                    )}
                    {mediaItems[currentMediaIndex]?.type === 'video' && (
                      <video controls className="w-full max-h-64">
                        <source src={mediaItems[currentMediaIndex].url} />
                      </video>
                    )}
                    {mediaItems[currentMediaIndex]?.type === 'audio' && (
                      <div className="p-6 text-center">
                        <Music className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <audio controls className="w-full">
                          <source src={mediaItems[currentMediaIndex].url} />
                        </audio>
                      </div>
                    )}
                  </div>

                  {/* Flechas de navegación */}
                  {mediaItems.length > 1 && (
                    <>
                      <button
                        onClick={prevMedia}
                        disabled={currentMediaIndex === 0}
                        className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center transition-all ${currentMediaIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/70'}`}
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={nextMedia}
                        disabled={currentMediaIndex === mediaItems.length - 1}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center transition-all ${currentMediaIndex === mediaItems.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/70'}`}
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </>
                  )}

                  {/* Indicadores */}
                  {mediaItems.length > 1 && (
                    <div className="flex justify-center gap-1.5 mt-2">
                      {mediaItems.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 rounded-full transition-all ${idx === currentMediaIndex ? 'w-4 bg-blue-500' : 'w-1.5 bg-gray-300'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="text-center pt-2">
                <p className="text-blue-500 text-xs italic">"Cada palabra escrita es un latido de mi corazón"</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de creación/edición - Diseño ancho y sin degradados */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>

            {/* Header - Sin gradiente, azul sólido */}
            <div className="sticky top-0 bg-blue-600 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    {editingId ? <Edit className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{editingId ? "Editar Carta" : "Nueva Carta"}</h2>
                    <p className="text-xs text-blue-200 mt-0.5">
                      {editingId ? "Modifica los datos de la carta existente" : "Completa la información para crear una nueva carta"}
                    </p>
                  </div>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* Título */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all bg-white"
                  placeholder="Ej: Mi primera carta"
                />
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Mensaje <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none bg-white"
                  placeholder="Escribe el mensaje de la carta..."
                />
              </div>

              {/* Mes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Mes <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white cursor-pointer"
                >
                  <option value="">Selecciona un mes</option>
                  {months.map((month, idx) => (
                    <option key={idx} value={idx + 1}>Mes {idx + 1} - {month}</option>
                  ))}
                </select>
              </div>

              {/* Archivos multimedia */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-700">Multimedia (opcional)</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Imagen */}
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                    <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-blue-500" />
                      </div>
                      <span className="font-medium">Subir imagen</span>
                      <span className="text-[10px] text-gray-400">JPG, PNG, GIF</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    {(previewImage || formData.imageUrl) && (
                      <div className="mt-3 relative">
                        <img src={previewImage || formData.imageUrl} alt="Preview" className="w-full h-24 object-cover rounded-lg" />
                        <button type="button" onClick={() => { setImageFile(null); setPreviewImage(null); setFormData({ ...formData, imageUrl: "" }); }} className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-black/80 transition">
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Video */}
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                    <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                        <Video className="w-6 h-6 text-blue-500" />
                      </div>
                      <span className="font-medium">Subir video</span>
                      <span className="text-[10px] text-gray-400">MP4, WebM</span>
                      <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" />
                    </label>
                    {(previewVideo || formData.videoUrl) && (
                      <div className="mt-3 relative">
                        <video src={previewVideo || formData.videoUrl} className="w-full h-24 object-cover rounded-lg" controls />
                        <button type="button" onClick={() => { setVideoFile(null); setPreviewVideo(null); setFormData({ ...formData, videoUrl: "" }); }} className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-black/80 transition">
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Audio - ocupa ambas columnas */}
                  <div className="sm:col-span-2 border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                    <label className="flex items-center justify-between gap-2 text-sm text-gray-600 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                          <Music className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                          <span className="font-medium">Subir audio</span>
                          <p className="text-[10px] text-gray-400">MP3, WAV</p>
                        </div>
                      </div>
                      <span className="text-xs text-blue-500">Seleccionar archivo</span>
                      <input type="file" accept="audio/*" onChange={handleAudioChange} className="hidden" />
                    </label>
                    {(previewAudio || formData.audioUrl) && (
                      <div className="mt-3">
                        <audio src={previewAudio || formData.audioUrl} controls className="w-full" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium shadow-md shadow-blue-200 disabled:opacity-50 flex items-center gap-2 transition-all"
                >
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? "Actualizar Carta" : "Crear Carta")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}>
          <div className="relative max-w-sm w-full bg-white rounded-2xl shadow-xl p-5 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><Trash2 className="w-6 h-6 text-red-500" /></div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">¿Eliminar carta?</h3>
            <p className="text-gray-500 text-sm mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl text-sm">Cancelar</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm shadow-md">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}