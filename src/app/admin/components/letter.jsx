'use client'

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import {
  Mail, Plus, Edit, Trash2, Eye, Calendar,
  Image as ImageIcon, Video, Music,
  Loader2, Search, X, Heart, Sparkles,
  ChevronLeft, ChevronRight, Trash
} from "lucide-react";

export default function AdminLetters() {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState(null);

  // Estados para modales separados
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [letterToDelete, setLetterToDelete] = useState(null);

  // Formulario para CREAR
  const [createForm, setCreateForm] = useState({
    title: "",
    message: "",
    month: "",
  });
  const [createFiles, setCreateFiles] = useState({
    image: null,
    video: null,
    audio: null
  });
  const [createPreviews, setCreatePreviews] = useState({
    image: null,
    video: null,
    audio: null
  });

  // Formulario para EDITAR
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    message: "",
    month: "",
    imageUrl: "",
    videoUrl: "",
    audioUrl: ""
  });
  const [editFiles, setEditFiles] = useState({
    image: null,
    video: null,
    audio: null
  });
  const [editPreviews, setEditPreviews] = useState({
    image: null,
    video: null,
    audio: null
  });
  const [removeImage, setRemoveImage] = useState(false);
  const [removeVideo, setRemoveVideo] = useState(false);
  const [removeAudio, setRemoveAudio] = useState(false);

  const [formLoading, setFormLoading] = useState(false);

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

  // ========== MODAL DE CREAR ==========
  const openCreateModal = () => {
    setCreateForm({
      title: "",
      message: "",
      month: "",
    });
    setCreateFiles({ image: null, video: null, audio: null });
    setCreatePreviews({ image: null, video: null, audio: null });
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCreateImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCreateFiles({ ...createFiles, image: file });
      setCreatePreviews({ ...createPreviews, image: URL.createObjectURL(file) });
    }
  };

  const handleCreateVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCreateFiles({ ...createFiles, video: file });
      setCreatePreviews({ ...createPreviews, video: URL.createObjectURL(file) });
    }
  };

  const handleCreateAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCreateFiles({ ...createFiles, audio: file });
      setCreatePreviews({ ...createPreviews, audio: URL.createObjectURL(file) });
    }
  };

  const handleCreateRemoveImage = () => {
    setCreateFiles({ ...createFiles, image: null });
    setCreatePreviews({ ...createPreviews, image: null });
  };

  const handleCreateRemoveVideo = () => {
    setCreateFiles({ ...createFiles, video: null });
    setCreatePreviews({ ...createPreviews, video: null });
  };

  const handleCreateRemoveAudio = () => {
    setCreateFiles({ ...createFiles, audio: null });
    setCreatePreviews({ ...createPreviews, audio: null });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", createForm.title);
      formDataToSend.append("message", createForm.message);
      formDataToSend.append("month", createForm.month);

      if (createFiles.image) formDataToSend.append("image", createFiles.image);
      if (createFiles.video) formDataToSend.append("video", createFiles.video);
      if (createFiles.audio) formDataToSend.append("audio", createFiles.audio);

      await axios.post("/api/letter", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Carta creada exitosamente");
      fetchLetters();
      closeCreateModal();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Error al crear");
    } finally {
      setFormLoading(false);
    }
  };

  // ========== MODAL DE EDITAR ==========
  const openEditModal = (letter) => {
    setEditingId(letter._id);
    setEditForm({
      title: letter.title || "",
      message: letter.message || "",
      month: letter.month || "",
      imageUrl: letter.imageUrl || "",
      videoUrl: letter.videoUrl || "",
      audioUrl: letter.audioUrl || ""
    });
    setEditFiles({ image: null, video: null, audio: null });
    setEditPreviews({ image: null, video: null, audio: null });
    setRemoveImage(false);
    setRemoveVideo(false);
    setRemoveAudio(false);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingId(null);
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFiles({ ...editFiles, image: file });
      setEditPreviews({ ...editPreviews, image: URL.createObjectURL(file) });
      setRemoveImage(false);
    }
  };

  const handleEditVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFiles({ ...editFiles, video: file });
      setEditPreviews({ ...editPreviews, video: URL.createObjectURL(file) });
      setRemoveVideo(false);
    }
  };

  const handleEditAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFiles({ ...editFiles, audio: file });
      setEditPreviews({ ...editPreviews, audio: URL.createObjectURL(file) });
      setRemoveAudio(false);
    }
  };

  const handleEditRemoveImage = () => {
    setRemoveImage(true);
    setEditForm({ ...editForm, imageUrl: "" });
    setEditPreviews({ ...editPreviews, image: null });
    setEditFiles({ ...editFiles, image: null });
  };

  const handleEditRemoveVideo = () => {
    setRemoveVideo(true);
    setEditForm({ ...editForm, videoUrl: "" });
    setEditPreviews({ ...editPreviews, video: null });
    setEditFiles({ ...editFiles, video: null });
  };

  const handleEditRemoveAudio = () => {
    setRemoveAudio(true);
    setEditForm({ ...editForm, audioUrl: "" });
    setEditPreviews({ ...editPreviews, audio: null });
    setEditFiles({ ...editFiles, audio: null });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", editForm.title);
      formDataToSend.append("message", editForm.message);
      formDataToSend.append("month", editForm.month);

      formDataToSend.append("removeImage", removeImage);
      formDataToSend.append("removeVideo", removeVideo);
      formDataToSend.append("removeAudio", removeAudio);

      if (editFiles.image) formDataToSend.append("image", editFiles.image);
      if (editFiles.video) formDataToSend.append("video", editFiles.video);
      if (editFiles.audio) formDataToSend.append("audio", editFiles.audio);

      await axios.put(`/api/letter/${editingId}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Carta actualizada exitosamente");
      fetchLetters();
      closeEditModal();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Error al actualizar");
    } finally {
      setFormLoading(false);
    }
  };

  // ========== ELIMINAR ==========
  const handleDelete = async () => {
    if (!letterToDelete) return;
    try {
      await axios.delete(`/api/letter/${letterToDelete}`);
      toast.success("Carta eliminada exitosamente");
      fetchLetters();
      setShowDeleteModal(false);
      setLetterToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Error al eliminar");
    }
  };

  // ========== VER CARTA ==========
  const viewLetter = (letter) => {
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
          onClick={openCreateModal}
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

      {/* Estadísticas */}
      <div className="flex mb-6">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm p-1">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50">
            <Mail className="w-4 h-4 text-blue-500" />
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-gray-800">{letters.length}</span>
              <span className="text-[10px] text-gray-500">Total</span>
            </div>
          </div>
          <div className="w-px h-6 bg-gray-200"></div>
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
          <button onClick={openCreateModal} className="text-blue-500 text-sm mt-2">Crear primera carta</button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLetters.map((letter, index) => (
            <div key={letter._id} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <div className={`h-1 w-full ${letter.status === 'disponible' ? 'bg-green-500' : 'bg-gray-300'}`} />
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{letter.title}</h3>
                      {letter.status === 'disponible' && (
                        <span className="ml-auto text-[9px] px-1.5 py-0.5 bg-green-100 text-green-600 rounded-full">Activa</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>Mes {letter.month} - {getMonthName(letter.month)}</span>
                    </div>
                    <p className="text-gray-500 text-xs line-clamp-1 mb-2">{letter.message.substring(0, 80)}...</p>
                    <div className="flex flex-wrap gap-1.5">
                      {letter.imageUrl && <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[10px] font-medium"><ImageIcon className="w-3 h-3" />Imagen</span>}
                      {letter.videoUrl && <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-medium"><Video className="w-3 h-3" />Video</span>}
                      {letter.audioUrl && <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full text-[10px] font-medium"><Music className="w-3 h-3" />Audio</span>}
                      {!letter.imageUrl && !letter.videoUrl && !letter.audioUrl && <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-gray-400 rounded-full text-[10px]"><Mail className="w-3 h-3" />Solo texto</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 ml-2">
                    <button onClick={() => viewLetter(letter)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => openEditModal(letter)} className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => { setLetterToDelete(letter._id); setShowDeleteModal(true); }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-[9px] text-gray-300">Creada el {new Date(letter.createdAt).toLocaleDateString()}</span>
                  <span className="text-[9px] text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">Click para ver detalles →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========== MODAL DE VER ========== */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn" onClick={() => setSelectedLetter(null)}>
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>

            {/* Header con diseño mejorado */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white rounded-t-2xl shadow-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {/* Título con icono */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold leading-tight">{selectedLetter.title}</h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-200" />
                        <p className="text-xs text-blue-200">Mes {selectedLetter.month} - {getMonthName(selectedLetter.month)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Contenido con mejor espaciado */}
            <div className="p-6 space-y-6">

              {/* Mensaje - Diseño de tarjeta mejorado */}
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-2xl"></div>
                <div className="relative p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                      <Heart className="w-4 h-4 text-white fill-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm">Mensaje de la carta</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed pl-10">
                    {selectedLetter.message}
                  </p>
                </div>
              </div>

              {/* Multimedia con carrusel mejorado */}
              {mediaItems.length > 0 && (
                <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-sm">
                      <ImageIcon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm">Contenido multimedia</h3>
                  </div>

                  <div className="relative group">
                    {/* Contenedor multimedia */}
                    <div className="bg-black/90 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px] shadow-inner">
                      {mediaItems[currentMediaIndex]?.type === 'image' && (
                        <img
                          src={mediaItems[currentMediaIndex].url}
                          alt="Imagen"
                          className="w-full object-contain max-h-72 transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      {mediaItems[currentMediaIndex]?.type === 'video' && (
                        <video controls className="w-full max-h-72" controlsList="nodownload">
                          <source src={mediaItems[currentMediaIndex].url} />
                        </video>
                      )}
                      {mediaItems[currentMediaIndex]?.type === 'audio' && (
                        <div className="w-full p-6">
                          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5 text-center">
                            {/* Círculo blanco animado */}
                            <div className="relative inline-block mb-4">
                              <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-40 animate-pulse"></div>
                              <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                                <Music className="w-10 h-10 text-blue-600" />
                                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse shadow-md"></div>
                              </div>
                            </div>
                            <p className="text-gray-800 font-semibold text-base mb-1">Audio de la carta</p>
                            <p className="text-gray-500 text-xs mb-3">🎵 Momento para recordar</p>
                            <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100">
                              <audio controls className="w-full" preload="metadata">
                                <source src={mediaItems[currentMediaIndex].url} />
                              </audio>
                            </div>
                            {/* Barras de sonido animadas */}
                            <div className="flex justify-center gap-1 mt-4">
                              {[...Array(7)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-1 bg-gradient-to-t from-blue-500 to-indigo-500 rounded-full animate-sound-wave"
                                  style={{
                                    height: `${12 + Math.sin(i) * 8}px`,
                                    animationDelay: `${i * 0.1}s`
                                  }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Flechas de navegación mejoradas */}
                    {mediaItems.length > 1 && (
                      <>
                        <button
                          onClick={prevMedia}
                          disabled={currentMediaIndex === 0}
                          className={`absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center transition-all duration-300 ${currentMediaIndex === 0
                              ? 'opacity-30 cursor-not-allowed'
                              : 'hover:bg-black/70 hover:scale-110'
                            }`}
                        >
                          <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button
                          onClick={nextMedia}
                          disabled={currentMediaIndex === mediaItems.length - 1}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center transition-all duration-300 ${currentMediaIndex === mediaItems.length - 1
                              ? 'opacity-30 cursor-not-allowed'
                              : 'hover:bg-black/70 hover:scale-110'
                            }`}
                        >
                          <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Indicadores de navegación mejorados */}
                  {mediaItems.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {mediaItems.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentMediaIndex(idx)}
                          className={`transition-all duration-300 rounded-full ${idx === currentMediaIndex
                              ? 'w-8 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600'
                              : 'w-2 h-1.5 bg-gray-300 hover:bg-gray-400'
                            }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Badge de tipo multimedia mejorado */}
                  <div className="flex justify-center mt-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm text-[11px] text-gray-600 border border-gray-200">
                      {mediaItems[currentMediaIndex]?.type === 'image' && (
                        <>
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                            <ImageIcon className="w-3 h-3 text-green-600" />
                          </div>
                          <span>Imagen</span>
                        </>
                      )}
                      {mediaItems[currentMediaIndex]?.type === 'video' && (
                        <>
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                            <Video className="w-3 h-3 text-blue-600" />
                          </div>
                          <span>Video</span>
                        </>
                      )}
                      {mediaItems[currentMediaIndex]?.type === 'audio' && (
                        <>
                          <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                            <Music className="w-3 h-3 text-purple-600" />
                          </div>
                          <span>Audio</span>
                        </>
                      )}
                      <div className="w-px h-3 bg-gray-200 mx-1"></div>
                      <span className="text-gray-400">{currentMediaIndex + 1} de {mediaItems.length}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL DE CREAR ========== */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeCreateModal}>
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-blue-600 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Plus className="w-5 h-5 text-white" /></div>
                  <div><h2 className="text-xl font-bold text-white">Nueva Carta</h2><p className="text-xs text-blue-200 mt-0.5">Completa la información para crear una nueva carta</p></div>
                </div>
                <button onClick={closeCreateModal} className="p-2 hover:bg-white/20 rounded-lg"><X className="w-5 h-5 text-white" /></button>
              </div>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-5">
              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Título <span className="text-red-500">*</span></label>
                <input type="text" value={createForm.title} onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white" placeholder="Ej: Mi primera carta" /></div>

              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Mensaje <span className="text-red-500">*</span></label>
                <textarea value={createForm.message} onChange={(e) => setCreateForm({ ...createForm, message: e.target.value })} required rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm resize-none bg-white" placeholder="Escribe el mensaje de la carta..." /></div>

              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Mes <span className="text-red-500">*</span></label>
                <select value={createForm.month} onChange={(e) => setCreateForm({ ...createForm, month: e.target.value })} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white cursor-pointer">
                  <option value="">Selecciona un mes</option>{months.map((month, idx) => (<option key={idx} value={idx + 1}>Mes {idx + 1} - {month}</option>))}
                </select></div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div><p className="text-sm font-semibold text-gray-700">Multimedia (opcional)</p></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                    <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center"><ImageIcon className="w-6 h-6 text-blue-500" /></div>
                      <span className="font-medium">Subir imagen</span><span className="text-[10px] text-gray-400">JPG, PNG, GIF</span>
                      <input type="file" accept="image/*" onChange={handleCreateImageChange} className="hidden" />
                    </label>
                    {createPreviews.image && (<div className="mt-3 relative"><img src={createPreviews.image} alt="Preview" className="w-full h-24 object-cover rounded-lg" /><button type="button" onClick={handleCreateRemoveImage} className="absolute top-1 right-1 bg-red-500 rounded-full p-1"><Trash className="w-3 h-3 text-white" /></button></div>)}
                  </div>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                    <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center"><Video className="w-6 h-6 text-blue-500" /></div>
                      <span className="font-medium">Subir video</span><span className="text-[10px] text-gray-400">MP4, WebM</span>
                      <input type="file" accept="video/*" onChange={handleCreateVideoChange} className="hidden" />
                    </label>
                    {createPreviews.video && (<div className="mt-3 relative"><video src={createPreviews.video} className="w-full h-24 object-cover rounded-lg" controls /><button type="button" onClick={handleCreateRemoveVideo} className="absolute top-1 right-1 bg-red-500 rounded-full p-1"><Trash className="w-3 h-3 text-white" /></button></div>)}
                  </div>
                  <div className="sm:col-span-2 border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                    <label className="flex items-center justify-between gap-2 text-sm text-gray-600 cursor-pointer">
                      <div className="flex items-center gap-3"><div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center"><Music className="w-5 h-5 text-purple-500" /></div><div><span className="font-medium">Subir audio</span><p className="text-[10px] text-gray-400">MP3, WAV</p></div></div>
                      <span className="text-xs text-blue-500">Seleccionar archivo</span>
                      <input type="file" accept="audio/*" onChange={handleCreateAudioChange} className="hidden" />
                    </label>
                    {createPreviews.audio && (<div className="mt-3"><audio src={createPreviews.audio} controls className="w-full" /><button type="button" onClick={handleCreateRemoveAudio} className="mt-2 text-xs text-red-500">Eliminar audio</button></div>)}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={closeCreateModal} className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium">Cancelar</button>
                <button type="submit" disabled={formLoading} className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium shadow-md shadow-blue-200 disabled:opacity-50 flex items-center gap-2">
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Crear Carta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== MODAL DE EDITAR ========== */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeEditModal}>
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-blue-600 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Edit className="w-5 h-5 text-white" /></div>
                  <div><h2 className="text-xl font-bold text-white">Editar Carta</h2><p className="text-xs text-blue-200 mt-0.5">Modifica los datos de la carta existente</p></div>
                </div>
                <button onClick={closeEditModal} className="p-2 hover:bg-white/20 rounded-lg"><X className="w-5 h-5 text-white" /></button>
              </div>
            </div>
            <form onSubmit={handleUpdate} className="p-6 space-y-5">
              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Título <span className="text-red-500">*</span></label>
                <input type="text" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white" /></div>

              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Mensaje <span className="text-red-500">*</span></label>
                <textarea value={editForm.message} onChange={(e) => setEditForm({ ...editForm, message: e.target.value })} required rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm resize-none bg-white" /></div>

              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Mes <span className="text-red-500">*</span></label>
                <select value={editForm.month} onChange={(e) => setEditForm({ ...editForm, month: e.target.value })} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white cursor-pointer">
                  <option value="">Selecciona un mes</option>{months.map((month, idx) => (<option key={idx} value={idx + 1}>Mes {idx + 1} - {month}</option>))}
                </select></div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div><p className="text-sm font-semibold text-gray-700">Multimedia (opcional)</p></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                    <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center"><ImageIcon className="w-6 h-6 text-blue-500" /></div>
                      <span className="font-medium">Subir nueva imagen</span><span className="text-[10px] text-gray-400">JPG, PNG, GIF</span>
                      <input type="file" accept="image/*" onChange={handleEditImageChange} className="hidden" />
                    </label>
                    {(editPreviews.image || editForm.imageUrl) && (
                      <div className="mt-3 relative">
                        <img src={editPreviews.image || editForm.imageUrl} alt="Preview" className="w-full h-24 object-cover rounded-lg" />
                        <button type="button" onClick={handleEditRemoveImage} className="absolute top-1 right-1 bg-red-500 rounded-full p-1"><Trash className="w-3 h-3 text-white" /></button>
                      </div>
                    )}
                    {editForm.imageUrl && !editPreviews.image && !removeImage && <p className="text-xs text-green-600 mt-1 text-center">Imagen actual</p>}
                    {removeImage && <p className="text-xs text-red-500 mt-1 text-center">Esta imagen se eliminará al guardar</p>}
                  </div>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                    <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center"><Video className="w-6 h-6 text-blue-500" /></div>
                      <span className="font-medium">Subir nuevo video</span><span className="text-[10px] text-gray-400">MP4, WebM</span>
                      <input type="file" accept="video/*" onChange={handleEditVideoChange} className="hidden" />
                    </label>
                    {(editPreviews.video || editForm.videoUrl) && (
                      <div className="mt-3 relative">
                        <video src={editPreviews.video || editForm.videoUrl} className="w-full h-24 object-cover rounded-lg" controls />
                        <button type="button" onClick={handleEditRemoveVideo} className="absolute top-1 right-1 bg-red-500 rounded-full p-1"><Trash className="w-3 h-3 text-white" /></button>
                      </div>
                    )}
                    {editForm.videoUrl && !editPreviews.video && !removeVideo && <p className="text-xs text-blue-600 mt-1 text-center">Video actual</p>}
                    {removeVideo && <p className="text-xs text-red-500 mt-1 text-center">Este video se eliminará al guardar</p>}
                  </div>
                  <div className="sm:col-span-2 border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                    <label className="flex items-center justify-between gap-2 text-sm text-gray-600 cursor-pointer">
                      <div className="flex items-center gap-3"><div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center"><Music className="w-5 h-5 text-purple-500" /></div><div><span className="font-medium">Subir nuevo audio</span><p className="text-[10px] text-gray-400">MP3, WAV</p></div></div>
                      <span className="text-xs text-blue-500">Seleccionar archivo</span>
                      <input type="file" accept="audio/*" onChange={handleEditAudioChange} className="hidden" />
                    </label>
                    {(editPreviews.audio || editForm.audioUrl) && (<div className="mt-3"><audio src={editPreviews.audio || editForm.audioUrl} controls className="w-full" /><button type="button" onClick={handleEditRemoveAudio} className="mt-2 text-xs text-red-500">Eliminar audio</button></div>)}
                    {editForm.audioUrl && !editPreviews.audio && !removeAudio && <p className="text-xs text-purple-600 mt-1 text-center">Audio actual</p>}
                    {removeAudio && <p className="text-xs text-red-500 mt-1 text-center">Este audio se eliminará al guardar</p>}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={closeEditModal} className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium">Cancelar</button>
                <button type="submit" disabled={formLoading} className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium shadow-md shadow-blue-200 disabled:opacity-50 flex items-center gap-2">
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Actualizar Carta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== MODAL DE ELIMINACIÓN ========== */}
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