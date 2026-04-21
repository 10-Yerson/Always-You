'use client'

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import {
  Music, Plus, Edit, Trash2, Eye, Upload,
  Image as ImageIcon, Loader2, Search, X,
  Sparkles, Headphones, Disc, Calendar, User
} from "lucide-react";

export default function AdminMusic() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Obtener canciones
  const fetchSongs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/music/all");
      setSongs(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar las canciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // Filtrar canciones
  const filteredSongs = songs.filter(song =>
    song.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.album?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Abrir modal para subir canción
  const openModal = () => {
    setAudioFile(null);
    setUploadProgress(0);
    setShowModal(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedSong(null);
    setAudioFile(null);
    setUploadProgress(0);
  };

  // Subir canción
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!audioFile) {
      toast.error("Selecciona un archivo de audio");
      return;
    }

    setFormLoading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("audio", audioFile);

      const { data } = await axios.post("/api/music", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });

      toast.success(data.msg || "Canción subida exitosamente");
      fetchSongs();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Error al subir la canción");
    } finally {
      setFormLoading(false);
      setUploadProgress(0);
    }
  };

  // Eliminar canción
  const handleDelete = async () => {
    if (!songToDelete) return;
    
    try {
      await axios.delete(`/api/music/${songToDelete}`);
      toast.success("Canción eliminada exitosamente");
      fetchSongs();
      setShowDeleteModal(false);
      setSongToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la canción");
    }
  };

  // Ver canción
  const viewSong = (song) => {
    setSelectedSong(song);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Music className="w-4 h-4 text-purple-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Administrar Música</h1>
            </div>
            <p className="text-gray-500 ml-10">Gestiona toda la música de la plataforma</p>
          </div>
          <button
            onClick={openModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl transition-all shadow-md shadow-purple-200"
          >
            <Upload className="w-4 h-4" />
            Subir Canción
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
              placeholder="Buscar por título, artista o álbum..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 bg-purple-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-purple-600">{songs.length}</p>
            <p className="text-xs text-gray-500">Total Canciones</p>
          </div>
          <div className="flex-1 bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {songs.filter(s => s.coverImage).length}
            </p>
            <p className="text-xs text-gray-500">Con Portada</p>
          </div>
        </div>
      </div>

      {/* Tabla de canciones */}
      {loading ? (
        <div className="flex flex-col justify-center items-center py-20 bg-white rounded-2xl border border-gray-100">
          <Loader2 className="w-10 h-10 text-purple-500 animate-spin mb-3" />
          <p className="text-gray-500">Cargando canciones...</p>
        </div>
      ) : filteredSongs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Music className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-2">No hay canciones registradas</p>
          <button
            onClick={openModal}
            className="text-purple-500 hover:text-purple-600 text-sm font-medium inline-flex items-center gap-1"
          >
            <Upload className="w-3 h-3" />
            Subir primera canción
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Portada</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Título</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Artista</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Álbum</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Duración</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSongs.map((song, index) => (
                  <tr key={song._id} className="hover:bg-purple-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {song.coverImage ? (
                        <img 
                          src={song.coverImage} 
                          alt={song.title}
                          className="w-10 h-10 rounded-lg object-cover shadow-sm"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Disc className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{song.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">{song.artist}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {song.album ? (
                        <span className="text-sm text-gray-500">{song.album}</span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Headphones className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">{song.duration}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => viewSong(song)}
                          className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-all"
                          title="Ver"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSongToDelete(song._id);
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

      {/* Modal para subir canción */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div className="relative max-w-md w-full bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-xl font-bold text-white">Subir Canción</h2>
              <button onClick={closeModal} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Music className="w-10 h-10 text-purple-600" />
                </div>
                <p className="text-gray-600 text-sm mb-2">Selecciona un archivo MP3</p>
                <p className="text-xs text-gray-400">La información se extraerá automáticamente</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Archivo de audio *</label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-purple-50 file:text-purple-700"
                />
              </div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Subiendo...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

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
                  className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl transition-all shadow-md shadow-purple-200 disabled:opacity-50 flex items-center gap-2"
                >
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {formLoading ? "Subiendo..." : "Subir Canción"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para ver canción */}
      {selectedSong && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedSong(null)}>
          <div className="relative max-w-md w-full bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-white" />
                <h2 className="text-xl font-bold text-white">{selectedSong.title}</h2>
              </div>
              <button onClick={() => setSelectedSong(null)} className="p-1 hover:bg-white/20 rounded-lg">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex gap-4 mb-4">
                {selectedSong.coverImage ? (
                  <img 
                    src={selectedSong.coverImage} 
                    alt={selectedSong.title}
                    className="w-24 h-24 rounded-xl object-cover shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Disc className="w-12 h-12 text-purple-400" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {selectedSong.artist}
                  </p>
                  {selectedSong.album && (
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Disc className="w-3 h-3" />
                      {selectedSong.album}
                    </p>
                  )}
                  {selectedSong.year && (
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {selectedSong.year}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Headphones className="w-3 h-3" />
                    Duración: {selectedSong.duration}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <audio controls className="w-full">
                  <source src={selectedSong.audioUrl} />
                </audio>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <Sparkles className="w-4 h-4 text-purple-400 inline-block mr-1" />
                <span className="text-xs text-gray-400">Canción extraída automáticamente del MP3</span>
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
              <h3 className="text-lg font-bold text-gray-800 mb-2">¿Eliminar canción?</h3>
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