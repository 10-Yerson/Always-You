'use client'

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import {
  Target, Plus, Edit, Trash2, Eye, Calendar,
  Image as ImageIcon, Video, Loader2,
  Search, X, Sparkles, CheckCircle, Clock,
  Trophy, Trash 
} from "lucide-react";

export default function AdminGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  
  // Formulario para crear
  const [createForm, setCreateForm] = useState({ title: "", description: "" });
  const [createImage, setCreateImage] = useState(null);
  const [createVideo, setCreateVideo] = useState(null);
  const [createPreviewImage, setCreatePreviewImage] = useState(null);
  const [createPreviewVideo, setCreatePreviewVideo] = useState(null);
  
  // Formulario para editar
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", status: "pendiente", imageUrl: "", videoUrl: "" });
  const [editImage, setEditImage] = useState(null);
  const [editVideo, setEditVideo] = useState(null);
  const [editPreviewImage, setEditPreviewImage] = useState(null);
  const [editPreviewVideo, setEditPreviewVideo] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [removeVideo, setRemoveVideo] = useState(false);
  
  const [formLoading, setFormLoading] = useState(false);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/goals/admin");
      setGoals(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar las metas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const filteredGoals = goals.filter(goal =>
    goal.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    goal.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ========== CREAR ==========
  const openCreateModal = () => {
    setCreateForm({ title: "", description: "" });
    setCreateImage(null); setCreateVideo(null);
    setCreatePreviewImage(null); setCreatePreviewVideo(null);
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

  const handleCreateRemoveImage = () => { setCreateImage(null); setCreatePreviewImage(null); };
  const handleCreateRemoveVideo = () => { setCreateVideo(null); setCreatePreviewVideo(null); };

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", createForm.title);
      formData.append("description", createForm.description);
      if (createImage) formData.append("image", createImage);
      if (createVideo) formData.append("video", createVideo);
      await axios.post("/api/goals", formData);
      toast.success("Meta creada exitosamente");
      fetchGoals();
      closeCreateModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear");
    } finally { setFormLoading(false); }
  };

  // ========== EDITAR ==========
  const openEditModal = (goal) => {
    setEditingId(goal._id);
    setEditForm({
      title: goal.title || "",
      description: goal.description || "",
      status: goal.status || "pendiente",
      imageUrl: goal.media?.image || "",
      videoUrl: goal.media?.video || ""
    });
    setEditImage(null); setEditVideo(null);
    setEditPreviewImage(null); setEditPreviewVideo(null);
    setRemoveImage(false); setRemoveVideo(false);
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

  const handleEditRemoveImage = () => { setRemoveImage(true); setEditForm({ ...editForm, imageUrl: "" }); setEditPreviewImage(null); setEditImage(null); };
  const handleEditRemoveVideo = () => { setRemoveVideo(true); setEditForm({ ...editForm, videoUrl: "" }); setEditPreviewVideo(null); setEditVideo(null); };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("description", editForm.description);
      formData.append("removeImage", removeImage);
      formData.append("removeVideo", removeVideo);
      if (editImage) formData.append("image", editImage);
      if (editVideo) formData.append("video", editVideo);
      await axios.put(`/api/goals/${editingId}`, formData);
      toast.success("Meta actualizada exitosamente");
      fetchGoals();
      closeEditModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al actualizar");
    } finally { setFormLoading(false); }
  };

  // ========== ELIMINAR ==========
  const handleDelete = async () => {
    if (!goalToDelete) return;
    try {
      await axios.delete(`/api/goals/${goalToDelete}`);
      toast.success("Meta eliminada exitosamente");
      fetchGoals();
      setShowDeleteModal(false);
      setGoalToDelete(null);
    } catch (error) {
      toast.error("Error al eliminar la meta");
    }
  };

  // ========== CAMBIAR ESTADO ==========
  const toggleStatus = async (goal) => {
    const newStatus = goal.status === "completado" ? "pendiente" : "completado";
    try {
      await axios.patch(`/api/goals/${goal._id}/status`, { status: newStatus });
      toast.success(`Meta marcada como ${newStatus === "completado" ? "completada" : "pendiente"}`);
      fetchGoals();
    } catch (error) {
      toast.error("Error al cambiar el estado");
    }
  };

  // ========== VER ==========
  const viewGoal = (goal) => setSelectedGoal(goal);

  const getStatusBadge = (status) => {
    if (status === "completado") {
      return { text: "Completada", icon: <CheckCircle className="w-3 h-3" />, color: "bg-emerald-100 text-emerald-700" };
    }
    return { text: "Pendiente", icon: <Clock className="w-3 h-3" />, color: "bg-amber-100 text-amber-700" };
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Administrar Metas</h1>
          </div>
          <p className="text-xs text-gray-500 ml-7">Gestiona todas las metas de la plataforma</p>
        </div>
        <button onClick={openCreateModal} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-200 text-sm font-medium w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" /> Nueva Meta
        </button>
      </div>

      {/* Buscador */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Buscar metas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white" />
      </div>

      {/* Estadísticas */}
      <div className="flex mb-6">
        <div className="inline-flex items-center gap-3 bg-white rounded-full border border-gray-200 shadow-sm p-1">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-lg font-bold text-gray-800">{goals.length}</span>
            <span className="text-[10px] text-gray-500">Total</span>
          </div>
          <div className="w-px h-6 bg-gray-200"></div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span className="text-lg font-bold text-gray-800">{goals.filter(g => g.status === "completado").length}</span>
            <span className="text-[10px] text-gray-500">Completadas</span>
          </div>
        </div>
      </div>

      {/* Grid de metas - Tarjetas con preview multimedia */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>
      ) : filteredGoals.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Target className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">No hay metas</p>
          <button onClick={openCreateModal} className="text-blue-500 text-sm mt-2">Crear primera meta</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGoals.map((goal, index) => {
            const statusBadge = getStatusBadge(goal.status);
            const hasImage = !!goal.media?.image;
            const hasVideo = !!goal.media?.video;
            const firstMedia = hasImage ? goal.media.image : hasVideo ? goal.media.video : null;
            const firstMediaType = hasImage ? "image" : hasVideo ? "video" : null;
            
            return (
              <div key={goal._id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Barra superior */}
                <div className={`h-1 ${goal.status === "completado" ? "bg-emerald-500" : "bg-blue-500"}`}></div>
                
                {/* Preview multimedia - primer archivo */}
                {firstMedia && (
                  <div className="relative h-32 overflow-hidden bg-gray-100">
                    {firstMediaType === "image" && (
                      <img src={firstMedia} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                    {firstMediaType === "video" && (
                      <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
                        <video className="w-full h-full object-cover" src={firstMedia} />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                            <div className="w-0 h-0 border-t-6 border-t-transparent border-l-10 border-l-white border-b-6 border-b-transparent ml-1" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <button onClick={() => toggleStatus(goal)} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium ${statusBadge.color}`}>
                        {statusBadge.icon}{statusBadge.text}
                      </button>
                    </div>
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => viewGoal(goal)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>
                      <button onClick={() => openEditModal(goal)} className="p-1.5 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { setGoalToDelete(goal._id); setShowDeleteModal(true); }} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  
                  {/* Título */}
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">{goal.title}</h3>
                  
                  {/* Descripción */}
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{goal.description}</p>
                  
                  {/* Indicadores multimedia */}
                  {(hasImage || hasVideo) && (
                    <div className="flex gap-1 mt-2">
                      {hasImage && <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-green-50 text-green-600 rounded text-[9px]"><ImageIcon className="w-2.5 h-2.5" />Img</span>}
                      {hasVideo && <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px]"><Video className="w-2.5 h-2.5" />Vid</span>}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL DE CREAR - Azul */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeCreateModal}>
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-blue-600 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Plus className="w-5 h-5 text-white" /></div><div><h2 className="text-xl font-bold text-white">Nueva Meta</h2><p className="text-xs text-blue-200 mt-0.5">Completa la información</p></div></div>
                <button onClick={closeCreateModal} className="p-2 hover:bg-white/20 rounded-lg"><X className="w-5 h-5 text-white" /></button>
              </div>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-5">
              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Título *</label><input type="text" value={createForm.title} onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })} required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white" /></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Descripción *</label><textarea value={createForm.description} onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })} required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm resize-none bg-white" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                  <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <ImageIcon className="w-8 h-8 text-blue-500" /><span className="font-medium">Imagen</span>
                    <input type="file" accept="image/*" onChange={handleCreateImageChange} className="hidden" />
                  </label>
                  {createPreviewImage && (<div className="mt-2 relative"><img src={createPreviewImage} alt="Preview" className="w-full h-20 object-cover rounded-lg" /><button type="button" onClick={handleCreateRemoveImage} className="absolute top-1 right-1 bg-red-500 rounded-full p-1"><Trash className="w-3 h-3 text-white" /></button></div>)}
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                  <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <Video className="w-8 h-8 text-blue-500" /><span className="font-medium">Video</span>
                    <input type="file" accept="video/*" onChange={handleCreateVideoChange} className="hidden" />
                  </label>
                  {createPreviewVideo && (<div className="mt-2 relative"><video src={createPreviewVideo} className="w-full h-20 object-cover rounded-lg" controls /><button type="button" onClick={handleCreateRemoveVideo} className="absolute top-1 right-1 bg-red-500 rounded-full p-1"><Trash className="w-3 h-3 text-white" /></button></div>)}
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={closeCreateModal} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-xl text-sm">Cancelar</button>
                <button type="submit" disabled={formLoading} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm shadow-md shadow-blue-200 disabled:opacity-50 flex items-center gap-2">
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Crear Meta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE EDITAR - Azul */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeEditModal}>
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-blue-600 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Edit className="w-5 h-5 text-white" /></div><div><h2 className="text-xl font-bold text-white">Editar Meta</h2><p className="text-xs text-blue-200 mt-0.5">Modifica los datos</p></div></div>
                <button onClick={closeEditModal} className="p-2 hover:bg-white/20 rounded-lg"><X className="w-5 h-5 text-white" /></button>
              </div>
            </div>
            <form onSubmit={handleUpdate} className="p-6 space-y-5">
              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Título *</label><input type="text" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white" /></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Descripción *</label><textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm resize-none bg-white" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                  <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <ImageIcon className="w-8 h-8 text-emerald-500" /><span className="font-medium">Nueva imagen</span>
                    <input type="file" accept="image/*" onChange={handleEditImageChange} className="hidden" />
                  </label>
                  {(editPreviewImage || editForm.imageUrl) && (<div className="mt-2 relative"><img src={editPreviewImage || editForm.imageUrl} alt="Preview" className="w-full h-20 object-cover rounded-lg" /><button type="button" onClick={handleEditRemoveImage} className="absolute top-1 right-1 bg-red-500 rounded-full p-1"><Trash className="w-3 h-3 text-white" /></button></div>)}
                  {editForm.imageUrl && !editPreviewImage && !removeImage && <p className="text-xs text-emerald-600 mt-1">Imagen actual</p>}
                  {removeImage && <p className="text-xs text-red-500 mt-1">Se eliminará al guardar</p>}
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                  <label className="flex flex-col items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <Video className="w-8 h-8 text-blue-500" /><span className="font-medium">Nuevo video</span>
                    <input type="file" accept="video/*" onChange={handleEditVideoChange} className="hidden" />
                  </label>
                  {(editPreviewVideo || editForm.videoUrl) && (<div className="mt-2 relative"><video src={editPreviewVideo || editForm.videoUrl} className="w-full h-20 object-cover rounded-lg" controls /><button type="button" onClick={handleEditRemoveVideo} className="absolute top-1 right-1 bg-red-500 rounded-full p-1"><Trash className="w-3 h-3 text-white" /></button></div>)}
                  {editForm.videoUrl && !editPreviewVideo && !removeVideo && <p className="text-xs text-blue-600 mt-1">Video actual</p>}
                  {removeVideo && <p className="text-xs text-red-500 mt-1">Se eliminará al guardar</p>}
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={closeEditModal} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-xl text-sm">Cancelar</button>
                <button type="submit" disabled={formLoading} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm shadow-md shadow-blue-200 disabled:opacity-50 flex items-center gap-2">
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Actualizar Meta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE VER - Azul */}
      {selectedGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedGoal(null)}>
          <div className="relative w-full max-w-md max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-blue-600 px-5 py-3 text-white rounded-t-2xl">
              <div className="flex justify-between items-center"><h2 className="text-lg font-bold">{selectedGoal.title}</h2><button onClick={() => setSelectedGoal(null)} className="p-1 hover:bg-white/20 rounded-lg"><X className="w-5 h-5" /></button></div>
              <p className="text-xs text-blue-200 mt-1">Meta</p>
            </div>
            <div className="p-5 space-y-4">
              <div className="mb-2"><span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedGoal.status).color}`}>{getStatusBadge(selectedGoal.status).icon}{getStatusBadge(selectedGoal.status).text}</span></div>
              <div className="bg-gray-50 rounded-xl p-4"><p className="text-gray-700 text-sm leading-relaxed">{selectedGoal.description}</p></div>
              {selectedGoal.media?.image && <img src={selectedGoal.media.image} alt="Meta" className="rounded-xl w-full max-h-64 object-cover" />}
              {selectedGoal.media?.video && <video controls className="rounded-xl w-full max-h-64"><source src={selectedGoal.media.video} /></video>}
              <div className="text-center pt-2"><p className="text-blue-500 text-xs italic">"Cada meta cumplida es un paso hacia nuestros sueños"</p></div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ELIMINACIÓN */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}>
          <div className="relative max-w-sm w-full bg-white rounded-2xl shadow-xl p-5 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><Trash2 className="w-6 h-6 text-red-500" /></div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">¿Eliminar meta?</h3>
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