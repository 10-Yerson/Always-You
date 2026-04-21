"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import {
  Heart,
  Calendar,
  Image as ImageIcon,
  Video,
  Music,
  Clock,
  Sparkles,
  Camera,
  Film,
  Headphones,
  ChevronRight,
  Star,
  BookOpen,
  Loader2
} from "lucide-react";

export default function MemoriesPage() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedMemory, setSelectedMemory] = useState(null);

  const getMemories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/memories");
      setMemories(data);
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar los recuerdos 💙");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMemories();
  }, []);

  const getMemoryType = (memory) => {
    const file = memory.image || memory.video || memory.music || memory.audio;
    if (!file) return "text";
    if (file?.match(/\.(jpeg|jpg|png|webp|gif)$/i)) return "image";
    if (file?.match(/\.(mp4|webm|ogg|mov)$/i)) return "video";
    if (file?.match(/\.(mp3|wav|mpeg|ogg)$/i)) return "audio";
    return "text";
  };

  const filteredMemories = memories.filter(memory => {
    if (filter === "all") return true;
    return getMemoryType(memory) === filter;
  });

  const stats = {
    total: memories.length,
    images: memories.filter(m => getMemoryType(m) === "image").length,
    videos: memories.filter(m => getMemoryType(m) === "video").length,
    audios: memories.filter(m => getMemoryType(m) === "audio").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">

      {/* Hero Section */}
      <div className="min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 px-4 relative">

        <div className="absolute top-10 left-5 opacity-20">
          <Heart className="w-6 h-6 text-blue-400" />
        </div>
        <div className="absolute bottom-10 right-5 opacity-20">
          <Sparkles className="w-5 h-5 text-blue-400" />
        </div>
        <div className="absolute top-1/3 right-10 opacity-10">
          <Camera className="w-4 h-4 text-blue-500" />
        </div>
        <div className="absolute bottom-1/3 left-10 opacity-10">
          <Sparkles className="w-4 h-4 text-blue-500" />
        </div>

        <div className="max-w-4xl mx-auto text-center">

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-2xl blur-md opacity-30"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 transform rotate-6 hover:rotate-12 transition-transform duration-300">
                <Camera className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Nuestros{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Recuerdos
            </span>
          </h1>

          <div className="flex justify-center mb-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </div>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed relative before:content-[''] before:absolute before:-left-4 before:top-1/2 before:w-3 before:h-px before:bg-blue-300 after:content-[''] after:absolute after:-right-4 after:top-1/2 after:w-3 after:h-px after:bg-blue-300">
            Cada momento vivido es un tesoro que guardamos en el corazón,
            porque juntos construimos recuerdos inolvidables.
          </p>

        </div>
      </div>

      <div className="pt-3 sm:pt-4 md:pt-5"></div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">

          {/* Total Recuerdos */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-sm sm:text-2xl font-bold text-gray-800">{stats.total}</p>
                <p className="text-[9px] sm:text-xs text-gray-500">
                  <span className="sm:hidden">Total</span>
                  <span className="hidden sm:inline">Total Recuerdos</span>
                </p>
              </div>
            </div>
          </div>

          {/* Fotos */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white">
                <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-sm sm:text-2xl font-bold text-gray-800">{stats.images}</p>
                <p className="text-[9px] sm:text-xs text-gray-500">
                  <span className="sm:hidden">Fotos</span>
                  <span className="hidden sm:inline">Fotos</span>
                </p>
              </div>
            </div>
          </div>

          {/* Videos */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white">
                <Video className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-sm sm:text-2xl font-bold text-gray-800">{stats.videos}</p>
                <p className="text-[9px] sm:text-xs text-gray-500">
                  <span className="sm:hidden">Videos</span>
                  <span className="hidden sm:inline">Videos</span>
                </p>
              </div>
            </div>
          </div>

          {/* Audios */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white">
                <Music className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-sm sm:text-2xl font-bold text-gray-800">{stats.audios}</p>
                <p className="text-[9px] sm:text-xs text-gray-500">
                  <span className="sm:hidden">Audios</span>
                  <span className="hidden sm:inline">Audios</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="flex justify-center gap-3 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${filter === "all"
              ? "bg-blue-500 text-white shadow-md shadow-blue-200"
              : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500 border border-gray-200"
              }`}
          >
            <Heart className="w-3 h-3" />
            Todos
          </button>
          <button
            onClick={() => setFilter("image")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${filter === "image"
              ? "bg-emerald-600 text-white shadow-md"
              : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500 border border-gray-200"
              }`}
          >
            <ImageIcon className="w-3 h-3" />
            Fotos
          </button>
          <button
            onClick={() => setFilter("video")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${filter === "video"
              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
              : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500 border border-gray-200"
              }`}
          >
            <Video className="w-3 h-3" />
            Videos
          </button>
          <button
            onClick={() => setFilter("audio")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${filter === "audio"
              ? "bg-purple-600 text-white shadow-md"
              : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500 border border-gray-200"
              }`}
          >
            <Music className="w-3 h-3" />
            Audios
          </button>
        </div>
      </div>

      {/* Memories Grid con LOADER */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-r-4 border-r-transparent"></div>
              <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-500 animate-pulse" />
            </div>
            <p className="mt-4 text-gray-500 animate-pulse">Cargando nuestros recuerdos 💙...</p>
          </div>
        ) : filteredMemories.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-4">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay recuerdos aún</h3>
            <p className="text-gray-500">Cada momento especial quedará guardado aquí 💙</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMemories.map((memory, index) => {
              const type = getMemoryType(memory);
              const delay = index * 100;

              return (
                <MemoryCard
                  key={memory._id}
                  memory={memory}
                  type={type}
                  delay={delay}
                  onClick={() => setSelectedMemory(memory)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Memory Modal */}
      {selectedMemory && (
        <MemoryModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} />
      )}
    </div>
  );
}


// Memory Card Component
function MemoryCard({ memory, type, delay, onClick }) {
  const file = memory.image || memory.video || memory.music || memory.audio;

  const getTypeIcon = () => {
    switch (type) {
      case "image": return <ImageIcon className="w-4 h-4" />;
      case "video": return <Video className="w-4 h-4" />;
      case "audio": return <Music className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "image": return "from-emerald-500 to-teal-600";
      case "video": return "from-blue-500 to-indigo-600";
      case "audio": return "from-purple-500 to-pink-600";
      default: return "from-blue-500 to-blue-600";
    }
  };

  const getTypeBg = () => {
    switch (type) {
      case "image": return "bg-emerald-100 text-emerald-700";
      case "video": return "bg-blue-100 text-blue-700";
      case "audio": return "bg-purple-100 text-purple-700";
      default: return "bg-blue-100 text-blue-700";
    }
  };

  const isImage = type === "image";
  const isVideo = type === "video";
  const isAudio = type === "audio";

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl shadow-lg border border-gray-100"
      style={{
        animation: `fadeInUp 0.5s ease-out ${delay}ms both`
      }}
    >
      {/* Top border */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getTypeColor()}`} />

      {/* Content */}
      <div className="relative p-5 flex flex-col">

        {/* Header - Fecha y tipo */}
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(memory.date).toLocaleDateString()}
          </span>
          <div className={`px-2 py-1 rounded-full flex items-center gap-1 ${getTypeBg()}`}>
            {getTypeIcon()}
            <span className="text-xs font-medium capitalize">{type}</span>
          </div>
        </div>

        {/* Texto del recuerdo */}
        <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
          {memory.text}
        </p>

        {/* Media Preview */}
        {file && (
          <div className="relative overflow-hidden rounded-xl mb-3">
            {isImage && (
              <div className="relative h-48">
                <img
                  src={file}
                  alt="Recuerdo"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
            )}
            {isVideo && (
              <div className="relative h-48 bg-gray-900 flex items-center justify-center">
                <video className="w-full h-full object-cover" src={file} />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <div className="w-0 h-0 border-t-10 border-t-transparent border-l-16 border-l-white border-b-10 border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
            )}
            {isAudio && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl flex items-center gap-3">
                <div className="bg-blue-500 p-3 rounded-full shadow-md shadow-blue-200">
                  <Headphones className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-blue-500 rounded-full animate-pulse" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Audio del recuerdo</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center mt-2 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-blue-400" />
            <span className="text-xs text-gray-500">Momento especial</span>
          </div>
          <div className="text-xs text-blue-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Ver recuerdo
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Memory Modal Component
function MemoryModal({ memory, onClose }) {
  const file = memory.image || memory.video || memory.music || memory.audio;

  const isImage = file?.match(/\.(jpeg|jpg|png|webp|gif)$/i);
  const isVideo = file?.match(/\.(mp4|webm|ogg|mov)$/i);
  const isAudio = file?.match(/\.(mp3|wav|mpeg|ogg)$/i);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6 text-white rounded-t-3xl">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(memory.date).toLocaleDateString()}
            </span>
            <Heart className="w-6 h-6 text-blue-200" />
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-full">
              <Camera className="w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Recuerdo Especial</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Memory Text */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-blue-500" />
              Recuerdo
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {memory.text}
            </p>
          </div>

          {/* Image */}
          {isImage && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-500" />
                Imagen
              </h3>
              <img
                src={file}
                alt="Recuerdo"
                className="rounded-xl w-full object-cover max-h-96"
              />
            </div>
          )}

          {/* Video */}
          {isVideo && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Video className="w-4 h-4 text-blue-500" />
                Video
              </h3>
              <video controls className="rounded-xl w-full">
                <source src={file} />
              </video>
            </div>
          )}

          {/* Audio */}
          {isAudio && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Music className="w-4 h-4 text-blue-500" />
                Audio
              </h3>
              <audio controls className="w-full">
                <source src={file} />
              </audio>
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-blue-500 text-sm italic">
              "Cada recuerdo es un pedacito de nuestra historia que nunca se borrará 💙"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}