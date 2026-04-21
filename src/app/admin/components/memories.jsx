'use client'

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import {
  Heart, Plus, Edit, Trash2, Eye, Calendar,
  Image as ImageIcon, Video, Music, Loader2,
  Search, X, Sparkles, Camera
} from "lucide-react";

export default function AdminMemories() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memoryToDelete, setMemoryToDelete] = useState(null);
  const [formData, setFormData] = useState({
    text: "",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [musicFile, setMusicFile] = useState(null);

  // Obtener recuerdos
  const fetchMemories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/memories/admin");
      setMemories(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los recuerdos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  // Filtrar recuerdos
  const filteredMemories = memories.filter(memory =>
    memory.text?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Abrir modal para crear/editar
  const openModal = (memory = null) => {
    if (memory) {
      setEditingId(memory._id);
      setFormData({
        text: memory.text || "",
        date: memory.date ? new Date(memory.date).toISOString().split('T')[0] : "",
      });
    } else {
      setEditingId(null);
      setFormData({
        text: "",
        date: new Date().toISOString().split('T')[0],
      });
    }
    setImageFile(null);
    setVideoFile(null);
    setMusicFile(null);
    setShowModal(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedMemory(null);
    setFormData({
      text: "",
      date: "",
    });
    setEditingId(null);
    setImageFile(null);
    setVideoFile(null);
    setMusicFile(null);
  };

  // Guardar recuerdo
  const handleSave = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("text", formData.text);
      formDataToSend.append("date", formData.date);
      
      if (imageFile) formDataToSend.append("image", imageFile);
      if (videoFile) formDataToSend.append("video", videoFile);
      if (musicFile) formDataToSend.append("music", musicFile);

      if (editingId) {
        await axios.put(`/api/memories/${editingId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Recuerdo actualizado exitosamente");
      } else {
        await axios.post("/api/memories", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Recuerdo creado exitosamente");
      }
      fetchMemories();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error al guardar el recuerdo");
    } finally {
      setFormLoading(false);
    }
  };

  // Eliminar recuerdo
  const handleDelete = async () => {
    if (!memoryToDelete) return;
    
    try {
      await axios.delete(`/api/memories/${memoryToDelete}`);
      toast.success("Recuerdo eliminado exitosamente");
      fetchMemories();
      setShowDeleteModal(false);
      setMemoryToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el recuerdo");
    }
  };

  // Ver recuerdo
  const viewMemory = (memory) => {
    setSelectedMemory(memory);
  };

  const getFileType = (memory) => {
    if (memory.image) return { type: "image", icon: <ImageIcon className="w-4 h-4" />, color: "text-green-500" };
    if (memory.video) return { type: "video", icon: <Video className="w-4 h-4" />, color: "text-blue-500" };
    if (memory.music) return { type: "audio", icon: <Music className="w-4 h-4" />, color: "text-purple-500" };
    return { type: "texto", icon: <Heart className="w-4 h-4" />, color: "text-pink-500" };
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Camera className="w-4 h-4 text-emerald-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Administrar Recuerdos</h1>
            </div>
            <p className="text-gray-500 ml-10">Gestiona todos los recuerdos de la plataforma</p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl transition-all shadow-md shadow-emerald-200"
          >
            <Plus className="w-4 h-4" />
            Nuevo Recuerdo
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
              placeholder="Buscar recuerdos por texto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-gray-50"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 bg-emerald-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-emerald-600">{memories.length}</p>
            <p className="text-xs text-gray-500">Total Recuerdos</p>
          </div>
          <div className="flex-1 bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {memories.filter(m => m.image).length}
            </p>
            <p className="text-xs text-gray-500">Con Imagen</p>
          </div>
        </div>
      </div>

      {/* Tabla de recuerdos */}
      {loading ? (
        <div className="flex flex-col justify-center items-center py-20 bg-white rounded-2xl border border-gray-100">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-3" />
          <p className="text-gray-500">Cargando recuerdos...</p>
        </div>
      ) : filteredMemories.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-2">No hay recuerdos registrados</p>
          <button
            onClick={() => openModal()}
            className="text-emerald-500 hover:text-emerald-600 text-sm font-medium inline-flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Crear primer recuerdo
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Texto</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMemories.map((memory, index) => {
                  const fileInfo = getFileType(memory);
                  return (
                    <tr key={memory._id} className="hover:bg-emerald-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800 line-clamp-2 max-w-xs">
                          {memory.text}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          <Calendar className="w-3 h-3" />
                          {new Date(memory.date).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${fileInfo.color} bg-gray-100`}>
                          {fileInfo.icon}
                          {fileInfo.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => viewMemory(memory)}
                            className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-all"
                            title="Ver"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openModal(memory)}
                            className="p-2 text-amber-500 hover:bg-amber-100 rounded-lg transition-all"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setMemoryToDelete(memory._id);
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal para crear/editar recuerdo */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-xl font-bold text-white">
                {editingId ? "Editar Recuerdo" : "Nuevo Recuerdo"}
              </h2>
              <button onClick={closeModal} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Texto *</label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  placeholder="Escribe el recuerdo..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-emerald-50 file:text-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-emerald-50 file:text-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Audio</label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setMusicFile(e.target.files[0])}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-emerald-50 file:text-emerald-700"
                  />
                </div>
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
                  className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl transition-all shadow-md shadow-emerald-200 disabled:opacity-50 flex items-center gap-2"
                >
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? "Actualizar" : "Crear")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para ver recuerdo */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedMemory(null)}>
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-white" />
                <h2 className="text-xl font-bold text-white">Recuerdo Especial</h2>
              </div>
              <button onClick={() => setSelectedMemory(null)} className="p-1 hover:bg-white/20 rounded-lg">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-gray-600">
                  {new Date(selectedMemory.date).toLocaleDateString()}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedMemory.text}</p>
              </div>
              {selectedMemory.image && (
                <div className="mt-4">
                  <img src={selectedMemory.image} alt="Recuerdo" className="rounded-xl max-h-96 w-full object-cover shadow-md" />
                </div>
              )}
              {selectedMemory.video && (
                <div className="mt-4">
                  <video controls className="rounded-xl w-full shadow-md">
                    <source src={selectedMemory.video} />
                  </video>
                </div>
              )}
              {selectedMemory.music && (
                <div className="mt-4">
                  <audio controls className="w-full">
                    <source src={selectedMemory.music} />
                  </audio>
                </div>
              )}
              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <Sparkles className="w-4 h-4 text-emerald-400 inline-block mr-1" />
                <span className="text-xs text-gray-400">Recuerdo guardado con amor</span>
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
              <h3 className="text-lg font-bold text-gray-800 mb-2">¿Eliminar recuerdo?</h3>
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