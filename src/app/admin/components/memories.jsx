'use client'

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import {
  Heart, Plus, Edit, Trash2, Eye, Calendar,
  Image as ImageIcon, Video, Music, Loader2,
  Search, X, Sparkles, Camera, Trash
} from "lucide-react";

export default function AdminMemories() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memoryToDelete, setMemoryToDelete] = useState(null);

  // Formulario para crear
  const [createForm, setCreateForm] = useState({ text: "", date: "" });
  const [createImage, setCreateImage] = useState(null);
  const [createVideo, setCreateVideo] = useState(null);
  const [createAudio, setCreateAudio] = useState(null);
  const [createPreviewImage, setCreatePreviewImage] = useState(null);
  const [createPreviewVideo, setCreatePreviewVideo] = useState(null);
  const [createPreviewAudio, setCreatePreviewAudio] = useState(null);

  // Formulario para editar
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ text: "", date: "", imageUrl: "", videoUrl: "", audioUrl: "" });
  const [editImage, setEditImage] = useState(null);
  const [editVideo, setEditVideo] = useState(null);
  const [editAudio, setEditAudio] = useState(null);
  const [editPreviewImage, setEditPreviewImage] = useState(null);
  const [editPreviewVideo, setEditPreviewVideo] = useState(null);
  const [editPreviewAudio, setEditPreviewAudio] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [removeVideo, setRemoveVideo] = useState(false);
  const [removeAudio, setRemoveAudio] = useState(false);

  const [formLoading, setFormLoading] = useState(false);

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

  const filteredMemories = memories.filter(memory =>
    memory.text?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ========== CREAR ==========
  const openCreateModal = () => {
    setCreateForm({ text: "", date: new Date().toISOString().split('T')[0] });
    setCreateImage(null); setCreateVideo(null); setCreateAudio(null);
    setCreatePreviewImage(null); setCreatePreviewVideo(null); setCreatePreviewAudio(null);
    setShowCreateModal(true);
  };

  const closeCreateModal = () => setShowCreateModal(false);

  const handleCreateImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setCreateImage(file); setCreatePreviewImage(URL.createObjectURL(file)); }
  };
  const handleCreateVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) { setCreateVideo(file); setCreatePreviewVideo(URL.createObjectURL(file)); }
  };
  const handleCreateAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) { setCreateAudio(file); setCreatePreviewAudio(URL.createObjectURL(file)); }
  };
  const handleCreateRemoveImage = () => { setCreateImage(null); setCreatePreviewImage(null); };
  const handleCreateRemoveVideo = () => { setCreateVideo(null); setCreatePreviewVideo(null); };
  const handleCreateRemoveAudio = () => { setCreateAudio(null); setCreatePreviewAudio(null); };

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append("text", createForm.text);
      formData.append("date", createForm.date);
      if (createImage) formData.append("image", createImage);
      if (createVideo) formData.append("video", createVideo);
      if (createAudio) formData.append("music", createAudio);
      await axios.post("/api/memories", formData);
      toast.success("Recuerdo creado exitosamente");
      fetchMemories();
      closeCreateModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear");
    } finally { setFormLoading(false); }
  };

  // ========== EDITAR ==========
  const openEditModal = (memory) => {
    setEditingId(memory._id);
    setEditForm({
      text: memory.text || "",
      date: memory.date ? new Date(memory.date).toISOString().split('T')[0] : "",
      imageUrl: memory.image || "",
      videoUrl: memory.video || "",
      audioUrl: memory.music || ""
    });
    setEditImage(null); setEditVideo(null); setEditAudio(null);
    setEditPreviewImage(null); setEditPreviewVideo(null); setEditPreviewAudio(null);
    setRemoveImage(false); setRemoveVideo(false); setRemoveAudio(false);
    setShowEditModal(true);
  };

  const closeEditModal = () => setShowEditModal(false);

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setEditImage(file); setEditPreviewImage(URL.createObjectURL(file)); setRemoveImage(false); }
  };
  const handleEditVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) { setEditVideo(file); setEditPreviewVideo(URL.createObjectURL(file)); setRemoveVideo(false); }
  };
  const handleEditAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) { setEditAudio(file); setEditPreviewAudio(URL.createObjectURL(file)); setRemoveAudio(false); }
  };
  const handleEditRemoveImage = () => { setRemoveImage(true); setEditForm({ ...editForm, imageUrl: "" }); setEditPreviewImage(null); setEditImage(null); };
  const handleEditRemoveVideo = () => { setRemoveVideo(true); setEditForm({ ...editForm, videoUrl: "" }); setEditPreviewVideo(null); setEditVideo(null); };
  const handleEditRemoveAudio = () => { setRemoveAudio(true); setEditForm({ ...editForm, audioUrl: "" }); setEditPreviewAudio(null); setEditAudio(null); };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append("text", editForm.text);
      formData.append("date", editForm.date);
      formData.append("removeImage", removeImage);
      formData.append("removeVideo", removeVideo);
      formData.append("removeAudio", removeAudio);
      if (editImage) formData.append("image", editImage);
      if (editVideo) formData.append("video", editVideo);
      if (editAudio) formData.append("music", editAudio);
      await axios.put(`/api/memories/${editingId}`, formData);
      toast.success("Recuerdo actualizado exitosamente");
      fetchMemories();
      closeEditModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al actualizar");
    } finally { setFormLoading(false); }
  };

  // ========== ELIMINAR ==========
  const handleDelete = async () => {
    if (!memoryToDelete) return;
    try {
      await axios.delete(`/api/memories/${memoryToDelete}`);
      toast.success("Recuerdo eliminado exitosamente");
      fetchMemories();
      setShowDeleteModal(false);
      setMemoryToDelete(null);
    } catch (error) {
      toast.error("Error al eliminar el recuerdo");
    }
  };

  // ========== VER ==========
  const viewMemory = (memory) => setSelectedMemory(memory);

  const getFileType = (memory) => {
    if (memory.image) return { type: "Imagen", icon: <ImageIcon className="w-4 h-4" />, color: "text-blue-600 bg-blue-50" };
    if (memory.video) return { type: "Video", icon: <Video className="w-4 h-4" />, color: "text-blue-600 bg-blue-50" };
    if (memory.music) return { type: "Audio", icon: <Music className="w-4 h-4" />, color: "text-blue-600 bg-blue-50" };
    return { type: "Texto", icon: <Heart className="w-4 h-4" />, color: "text-gray-500 bg-gray-100" };
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Camera className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Administrar Recuerdos</h1>
          </div>
          <p className="text-xs text-gray-500 ml-7">Gestiona todos los recuerdos</p>
        </div>
        <button onClick={openCreateModal} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-200 text-sm font-medium w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" /> Nuevo Recuerdo
        </button>
      </div>

      {/* Buscador */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Buscar recuerdos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white" />
      </div>

      {/* Tarjetas de recuerdos - Diseño tipo revista */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>
      ) : filteredMemories.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Camera className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">No hay recuerdos</p>
          <button onClick={openCreateModal} className="text-blue-500 text-sm mt-2">Crear primer recuerdo</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMemories.map((memory, index) => {
            const fileInfo = getFileType(memory);
            return (
              <div key={memory._id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                {/* Imagen destacada */}
                <div className="relative h-48 overflow-hidden">
                  {memory.image && (
                    <img src={memory.image} alt="Recuerdo" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  )}
                  {memory.video && !memory.image && (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                      <video className="w-full h-full object-cover" src={memory.video} />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                          <div className="w-0 h-0 border-t-7 border-t-transparent border-l-12 border-l-white border-b-7 border-b-transparent ml-1" />
                        </div>
                      </div>
                    </div>
                  )}
                  {memory.music && !memory.image && !memory.video && (
                    <div className="w-full h-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                      <Music className="w-12 h-12 text-blue-500" />
                    </div>
                  )}
                  {!memory.image && !memory.video && !memory.music && (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <Heart className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-medium shadow-md ${fileInfo.color}`}>
                      {fileInfo.type}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 text-[9px] text-white">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {new Date(memory.date).toLocaleDateString()}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-4">
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-3">{memory.text}</p>
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                    <button onClick={() => viewMemory(memory)} className="px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">Ver más</button>
                    <button onClick={() => openEditModal(memory)} className="p-1.5 text-gray-400 hover:text-amber-500 rounded-lg"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => { setMemoryToDelete(memory._id); setShowDeleteModal(true); }} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL DE CREAR */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeCreateModal}>
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-blue-600 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Plus className="w-5 h-5 text-white" /></div><div><h2 className="text-xl font-bold text-white">Nuevo Recuerdo</h2><p className="text-xs text-blue-200 mt-0.5">Completa la información</p></div></div>
                <button onClick={closeCreateModal} className="p-2 hover:bg-white/20 rounded-lg"><X className="w-5 h-5 text-white" /></button>
              </div>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-5">
              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Texto *</label><textarea value={createForm.text} onChange={(e) => setCreateForm({ ...createForm, text: e.target.value })} required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white" placeholder="Escribe el recuerdo..." /></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Fecha</label><input type="date" value={createForm.date} onChange={(e) => setCreateForm({ ...createForm, date: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white" /></div>
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div><p className="text-sm font-semibold text-gray-700">Multimedia (opcional)</p></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                    <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <ImageIcon className="w-8 h-8 text-blue-500" />
                      <span className="font-medium">Imagen</span>
                      <input type="file" accept="image/*" onChange={handleCreateImageChange} className="hidden" />
                    </label>
                    {createPreviewImage && (<div className="mt-2 relative"><img src={createPreviewImage} alt="Preview" className="w-full h-20 object-cover rounded-lg" /><button type="button" onClick={handleCreateRemoveImage} className="absolute top-1 right-1 bg-red-500 rounded-full p-1"><Trash className="w-3 h-3 text-white" /></button></div>)}
                  </div>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                    <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <Video className="w-8 h-8 text-blue-500" />
                      <span className="font-medium">Video</span>
                      <input type="file" accept="video/*" onChange={handleCreateVideoChange} className="hidden" />
                    </label>
                    {createPreviewVideo && (<div className="mt-2 relative"><video src={createPreviewVideo} className="w-full h-20 object-cover rounded-lg" controls /><button type="button" onClick={handleCreateRemoveVideo} className="absolute top-1 right-1 bg-red-500 rounded-full p-1"><Trash className="w-3 h-3 text-white" /></button></div>)}
                  </div>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                    <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <Music className="w-8 h-8 text-blue-500" />
                      <span className="font-medium">Audio</span>
                      <input type="file" accept="audio/*" onChange={handleCreateAudioChange} className="hidden" />
                    </label>
                    {createPreviewAudio && (<div className="mt-2"><audio src={createPreviewAudio} controls className="w-full" /><button type="button" onClick={handleCreateRemoveAudio} className="mt-1 text-xs text-red-500">Eliminar</button></div>)}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={closeCreateModal} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-xl text-sm">Cancelar</button>
                <button type="submit" disabled={formLoading} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm shadow-md shadow-blue-200 disabled:opacity-50 flex items-center gap-2">
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Crear Recuerdo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE EDITAR */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeEditModal}>
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-blue-600 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Edit className="w-5 h-5 text-white" /></div><div><h2 className="text-xl font-bold text-white">Editar Recuerdo</h2><p className="text-xs text-blue-200 mt-0.5">Modifica los datos</p></div></div>
                <button onClick={closeEditModal} className="p-2 hover:bg-white/20 rounded-lg"><X className="w-5 h-5 text-white" /></button>
              </div>
            </div>
            <form onSubmit={handleUpdate} className="p-6 space-y-5">
              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Texto *</label><textarea value={editForm.text} onChange={(e) => setEditForm({ ...editForm, text: e.target.value })} required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white" placeholder="Escribe el recuerdo..." /></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Fecha</label><input type="date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white" /></div>
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div><p className="text-sm font-semibold text-gray-700">Multimedia</p></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                    <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <ImageIcon className="w-8 h-8 text-blue-500" />
                      <span className="font-medium">Nueva imagen</span>
                      <input type="file" accept="image/*" onChange={handleEditImageChange} className="hidden" />
                    </label>
                    {(editPreviewImage || editForm.imageUrl) && (
                      <div className="mt-2 relative"><img src={editPreviewImage || editForm.imageUrl} alt="Preview" className="w-full h-20 object-cover rounded-lg" /><button type="button" onClick={handleEditRemoveImage} className="absolute top-1 right-1 bg-red-500 rounded-full p-1"><Trash className="w-3 h-3 text-white" /></button></div>
                    )}
                    {editForm.imageUrl && !editPreviewImage && !removeImage && <p className="text-xs text-blue-600 mt-1">Imagen actual</p>}
                    {removeImage && <p className="text-xs text-red-500 mt-1">Se eliminará al guardar</p>}
                  </div>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                    <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <Video className="w-8 h-8 text-blue-500" />
                      <span className="font-medium">Nuevo video</span>
                      <input type="file" accept="video/*" onChange={handleEditVideoChange} className="hidden" />
                    </label>
                    {(editPreviewVideo || editForm.videoUrl) && (
                      <div className="mt-2 relative"><video src={editPreviewVideo || editForm.videoUrl} className="w-full h-20 object-cover rounded-lg" controls /><button type="button" onClick={handleEditRemoveVideo} className="absolute top-1 right-1 bg-red-500 rounded-full p-1"><Trash className="w-3 h-3 text-white" /></button></div>
                    )}
                    {editForm.videoUrl && !editPreviewVideo && !removeVideo && <p className="text-xs text-blue-600 mt-1">Video actual</p>}
                    {removeVideo && <p className="text-xs text-red-500 mt-1">Se eliminará al guardar</p>}
                  </div>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                    <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <Music className="w-8 h-8 text-blue-500" />
                      <span className="font-medium">Nuevo audio</span>
                      <input type="file" accept="audio/*" onChange={handleEditAudioChange} className="hidden" />
                    </label>
                    {(editPreviewAudio || editForm.audioUrl) && (<div className="mt-2"><audio src={editPreviewAudio || editForm.audioUrl} controls className="w-full" /><button type="button" onClick={handleEditRemoveAudio} className="mt-1 text-xs text-red-500">Eliminar</button></div>)}
                    {editForm.audioUrl && !editPreviewAudio && !removeAudio && <p className="text-xs text-blue-600 mt-1">Audio actual</p>}
                    {removeAudio && <p className="text-xs text-red-500 mt-1">Se eliminará al guardar</p>}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={closeEditModal} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-xl text-sm">Cancelar</button>
                <button type="submit" disabled={formLoading} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm shadow-md shadow-blue-200 disabled:opacity-50 flex items-center gap-2">
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Actualizar Recuerdo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE VER */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedMemory(null)}>
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-blue-600 px-5 py-3 text-white rounded-t-2xl">
              <div className="flex justify-between items-center"><h2 className="text-lg font-bold">Recuerdo Especial</h2><button onClick={() => setSelectedMemory(null)} className="p-1 hover:bg-white/20 rounded-lg"><X className="w-5 h-5" /></button></div>
              <p className="text-xs text-blue-200 mt-1">{new Date(selectedMemory.date).toLocaleDateString()}</p>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4"><p className="text-gray-700 text-sm leading-relaxed">{selectedMemory.text}</p></div>
              {selectedMemory.image && <img src={selectedMemory.image} alt="Recuerdo" className="rounded-xl w-full max-h-64 object-cover" />}
              {selectedMemory.video && <video controls className="rounded-xl w-full max-h-64"><source src={selectedMemory.video} /></video>}
              {selectedMemory.music && <audio controls className="w-full"><source src={selectedMemory.music} /></audio>}
              <div className="text-center pt-2"><p className="text-blue-500 text-xs italic">"Cada recuerdo es un pedacito de nuestra historia"</p></div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ELIMINACIÓN */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}>
          <div className="relative max-w-sm w-full bg-white rounded-2xl shadow-xl p-5 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><Trash2 className="w-6 h-6 text-red-500" /></div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">¿Eliminar recuerdo?</h3>
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