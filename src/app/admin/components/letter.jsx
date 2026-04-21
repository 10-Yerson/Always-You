'use client'

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import {
  Mail, Plus, Edit, Trash2, Eye, Calendar, 
  Lock, Unlock, Image as ImageIcon, Video, Music,
  Loader2, Search, Filter, X, CheckCircle, AlertCircle,
  Heart, Sparkles
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

  // Meses comenzando desde Mayo
  const months = [
    "Mayo", "Junio", "Julio", "Agosto", "Septiembre", 
    "Octubre", "Noviembre", "Diciembre", "Enero", 
    "Febrero", "Marzo", "Abril"
  ];

  // Obtener cartas
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

  // Filtrar cartas
  const filteredLetters = letters.filter(letter =>
    letter.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.month?.toString().includes(searchTerm) ||
    months[(letter.month - 1) % 12]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Abrir modal para crear/editar
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
    setShowModal(true);
  };

  // Cerrar modal
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
  };

  // Guardar carta
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
        await axios.put(`/api/letter/${editingId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Carta actualizada exitosamente");
      } else {
        await axios.post("/api/letter", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Carta creada exitosamente");
      }
      fetchLetters();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Error al guardar la carta");
    } finally {
      setFormLoading(false);
    }
  };

  // Eliminar carta
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
      toast.error("Error al eliminar la carta");
    }
  };

  // Ver carta
  const viewLetter = (letter) => {
    setSelectedLetter(letter);
  };

  const getMonthName = (monthNumber) => {
    return months[(monthNumber - 1) % 12];
  };

  return (
    <div className="p-6">
      {/* Header con gradiente */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Administrar Cartas</h1>
            </div>
            <p className="text-gray-500 ml-10">Gestiona todas las cartas de la plataforma</p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl transition-all shadow-md shadow-blue-200"
          >
            <Plus className="w-4 h-4" />
            Nueva Carta
          </button>
        </div>
      </div>

      {/* Buscador y estadísticas */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título, mes o nombre del mes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">{letters.length}</p>
            <p className="text-xs text-gray-500">Total Cartas</p>
          </div>
          <div className="flex-1 bg-emerald-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {letters.filter(l => l.status === 'disponible').length}
            </p>
            <p className="text-xs text-gray-500">Disponibles</p>
          </div>
        </div>
      </div>

      {/* Tabla de cartas */}
      {loading ? (
        <div className="flex flex-col justify-center items-center py-20 bg-white rounded-2xl border border-gray-100">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
          <p className="text-gray-500">Cargando cartas...</p>
        </div>
      ) : filteredLetters.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-2">No hay cartas registradas</p>
          <button
            onClick={() => openModal()}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium inline-flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Crear primera carta
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Título</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mes</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Multimedia</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLetters.map((letter, index) => (
                  <tr key={letter._id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="font-medium text-gray-800">{letter.title}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        <Calendar className="w-3 h-3" />
                        Mes {letter.month} - {getMonthName(letter.month)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5">
                        {letter.imageUrl && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 rounded-lg text-xs">
                            <ImageIcon className="w-3 h-3" />
                            Imagen
                          </span>
                        )}
                        {letter.videoUrl && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs">
                            <Video className="w-3 h-3" />
                            Video
                          </span>
                        )}
                        {letter.audioUrl && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-600 rounded-lg text-xs">
                            <Music className="w-3 h-3" />
                            Audio
                          </span>
                        )}
                        {!letter.imageUrl && !letter.videoUrl && !letter.audioUrl && (
                          <span className="text-xs text-gray-400">Sin archivos</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => viewLetter(letter)}
                          className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-all"
                          title="Ver"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal(letter)}
                          className="p-2 text-amber-500 hover:bg-amber-100 rounded-lg transition-all"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setLetterToDelete(letter._id);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-all"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal para crear/editar carta */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-xl font-bold text-white">
                {editingId ? "Editar Carta" : "Nueva Carta"}
              </h2>
              <button onClick={closeModal} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Título de la carta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Escribe el mensaje de la carta..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mes *</label>
                <select
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona un mes</option>
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>Mes {index + 1} - {month}</option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700"
                  />
                  {formData.imageUrl && !imageFile && (
                    <p className="text-xs text-gray-400 mt-1">Imagen actual subida</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700"
                  />
                  {formData.videoUrl && !videoFile && (
                    <p className="text-xs text-gray-400 mt-1">Video actual subido</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audio</label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700"
                />
                {formData.audioUrl && !audioFile && (
                  <p className="text-xs text-gray-400 mt-1">Audio actual subido</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl transition-all shadow-md shadow-blue-200 disabled:opacity-50 flex items-center gap-2"
                >
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? "Actualizar" : "Crear")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para ver carta */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedLetter(null)}>
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-white" />
                <h2 className="text-xl font-bold text-white">{selectedLetter.title}</h2>
              </div>
              <button onClick={() => setSelectedLetter(null)} className="p-1 hover:bg-white/20 rounded-lg">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-600">
                  Mes {selectedLetter.month} - {getMonthName(selectedLetter.month)}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedLetter.message}</p>
              </div>
              {selectedLetter.imageUrl && (
                <div className="mt-4">
                  <img src={selectedLetter.imageUrl} alt="Imagen" className="rounded-xl max-h-64 w-full object-cover shadow-md" />
                </div>
              )}
              {selectedLetter.videoUrl && (
                <div className="mt-4">
                  <video controls className="rounded-xl w-full shadow-md">
                    <source src={selectedLetter.videoUrl} />
                  </video>
                </div>
              )}
              {selectedLetter.audioUrl && (
                <div className="mt-4">
                  <audio controls className="w-full">
                    <source src={selectedLetter.audioUrl} />
                  </audio>
                </div>
              )}
              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <Sparkles className="w-4 h-4 text-blue-400 inline-block mr-1" />
                <span className="text-xs text-gray-400">Carta creada con amor</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}>
          <div className="relative max-w-md w-full bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">¿Eliminar carta?</h3>
              <p className="text-gray-500 text-sm mb-6">Esta acción no se puede deshacer.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all shadow-md"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}