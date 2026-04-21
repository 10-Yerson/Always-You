'use client'

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import {
  Target, Plus, Edit, Trash2, Eye, Calendar,
  Image as ImageIcon, Video, Loader2,
  Search, X, Sparkles, CheckCircle, Clock,
  Trophy
} from "lucide-react";

export default function AdminGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pendiente"
  });
  const [editingId, setEditingId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  // Obtener metas
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

  // Filtrar metas
  const filteredGoals = goals.filter(goal =>
    goal.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    goal.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Abrir modal para crear/editar
  const openModal = (goal = null) => {
    if (goal) {
      setEditingId(goal._id);
      setFormData({
        title: goal.title || "",
        description: goal.description || "",
        status: goal.status || "pendiente"
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        status: "pendiente"
      });
    }
    setImageFile(null);
    setVideoFile(null);
    setShowModal(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedGoal(null);
    setFormData({
      title: "",
      description: "",
      status: "pendiente"
    });
    setEditingId(null);
    setImageFile(null);
    setVideoFile(null);
  };

  // Guardar meta
  const handleSave = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      
      if (imageFile) formDataToSend.append("image", imageFile);
      if (videoFile) formDataToSend.append("video", videoFile);

      if (editingId) {
        await axios.put(`/api/goals/${editingId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Meta actualizada exitosamente");
      } else {
        await axios.post("/api/goals", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Meta creada exitosamente");
      }
      fetchGoals();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error al guardar la meta");
    } finally {
      setFormLoading(false);
    }
  };

  // Cambiar estado de la meta
  const toggleStatus = async (goal) => {
    const newStatus = goal.status === "completado" ? "pendiente" : "completado";
    try {
      await axios.patch(`/api/goals/${goal._id}/status`, { status: newStatus });
      toast.success(`Meta marcada como ${newStatus === "completado" ? "completada" : "pendiente"}`);
      fetchGoals();
    } catch (error) {
      console.error(error);
      toast.error("Error al cambiar el estado");
    }
  };

  // Eliminar meta
  const handleDelete = async () => {
    if (!goalToDelete) return;
    
    try {
      await axios.delete(`/api/goals/${goalToDelete}`);
      toast.success("Meta eliminada exitosamente");
      fetchGoals();
      setShowDeleteModal(false);
      setGoalToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la meta");
    }
  };

  // Ver meta
  const viewGoal = (goal) => {
    setSelectedGoal(goal);
  };

  const getStatusBadge = (status) => {
    if (status === "completado") {
      return {
        text: "Completada",
        icon: <CheckCircle className="w-3 h-3" />,
        color: "bg-emerald-100 text-emerald-700"
      };
    }
    return {
      text: "Pendiente",
      icon: <Clock className="w-3 h-3" />,
      color: "bg-amber-100 text-amber-700"
    };
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-amber-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Administrar Metas</h1>
            </div>
            <p className="text-gray-500 ml-10">Gestiona todas las metas de la plataforma</p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl transition-all shadow-md shadow-amber-200"
          >
            <Plus className="w-4 h-4" />
            Nueva Meta
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
              placeholder="Buscar metas por título o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-gray-50"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 bg-amber-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-amber-600">{goals.length}</p>
            <p className="text-xs text-gray-500">Total Metas</p>
          </div>
          <div className="flex-1 bg-emerald-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {goals.filter(g => g.status === "completado").length}
            </p>
            <p className="text-xs text-gray-500">Completadas</p>
          </div>
        </div>
      </div>

      {/* Tabla de metas */}
      {loading ? (
        <div className="flex flex-col justify-center items-center py-20 bg-white rounded-2xl border border-gray-100">
          <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-3" />
          <p className="text-gray-500">Cargando metas...</p>
        </div>
      ) : filteredGoals.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-2">No hay metas registradas</p>
          <button
            onClick={() => openModal()}
            className="text-amber-500 hover:text-amber-600 text-sm font-medium inline-flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Crear primera meta
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Título</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Descripción</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Multimedia</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredGoals.map((goal, index) => {
                  const statusBadge = getStatusBadge(goal.status);
                  return (
                    <tr key={goal._id} className="hover:bg-amber-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">{goal.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                          {goal.description}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {goal.media?.image && <ImageIcon className="w-4 h-4 text-green-500" title="Imagen" />}
                          {goal.media?.video && <Video className="w-4 h-4 text-blue-500" title="Video" />}
                          {!goal.media?.image && !goal.media?.video && (
                            <span className="text-xs text-gray-400">Sin archivos</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleStatus(goal)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all ${statusBadge.color} hover:opacity-80`}
                        >
                          {statusBadge.icon}
                          {statusBadge.text}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => viewGoal(goal)}
                            className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-all"
                            title="Ver"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openModal(goal)}
                            className="p-2 text-amber-500 hover:bg-amber-100 rounded-lg transition-all"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setGoalToDelete(goal._id);
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

      {/* Modal para crear/editar meta */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-xl font-bold text-white">
                {editingId ? "Editar Meta" : "Nueva Meta"}
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
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Título de la meta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  placeholder="Describe la meta..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-amber-50 file:text-amber-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-amber-50 file:text-amber-700"
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
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl transition-all shadow-md shadow-amber-200 disabled:opacity-50 flex items-center gap-2"
                >
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? "Actualizar" : "Crear")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para ver meta */}
      {selectedGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedGoal(null)}>
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-white" />
                <h2 className="text-xl font-bold text-white">{selectedGoal.title}</h2>
              </div>
              <button onClick={() => setSelectedGoal(null)} className="p-1 hover:bg-white/20 rounded-lg">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedGoal.status).color}`}>
                  {getStatusBadge(selectedGoal.status).icon}
                  {getStatusBadge(selectedGoal.status).text}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedGoal.description}</p>
              </div>
              {selectedGoal.media?.image && (
                <div className="mt-4">
                  <img src={selectedGoal.media.image} alt="Meta" className="rounded-xl max-h-64 w-full object-cover shadow-md" />
                </div>
              )}
              {selectedGoal.media?.video && (
                <div className="mt-4">
                  <video controls className="rounded-xl w-full shadow-md">
                    <source src={selectedGoal.media.video} />
                  </video>
                </div>
              )}
              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <Sparkles className="w-4 h-4 text-amber-400 inline-block mr-1" />
                <span className="text-xs text-gray-400">Meta creada para cumplir juntos</span>
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
              <h3 className="text-lg font-bold text-gray-800 mb-2">¿Eliminar meta?</h3>
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