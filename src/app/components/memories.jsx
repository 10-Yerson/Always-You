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
  MessageCircle,
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

      {/* Filter Tabs - Combinación responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-10">

        {/* Versión móvil: íconos grandes (se muestra en móvil) */}
        <div className="flex justify-center flex-wrap gap-4 sm:hidden">
          <button
            onClick={() => setFilter("all")}
            className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-300 ${filter === "all" ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${filter === "all"
              ? "bg-blue-500 text-white shadow-md shadow-blue-200"
              : "bg-gray-100 text-gray-500"
              }`}>
              <Heart className="w-6 h-6" />
            </div>
            <span className={`text-xs font-medium ${filter === "all" ? "text-blue-600" : "text-gray-500"}`}>
              Todos
            </span>
          </button>

          <button
            onClick={() => setFilter("image")}
            className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-300 ${filter === "image" ? "text-emerald-600" : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${filter === "image"
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
              : "bg-gray-100 text-gray-500"
              }`}>
              <ImageIcon className="w-6 h-6" />
            </div>
            <span className={`text-xs font-medium ${filter === "image" ? "text-emerald-600" : "text-gray-500"}`}>
              Fotos
            </span>
          </button>

          <button
            onClick={() => setFilter("video")}
            className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-300 ${filter === "video" ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${filter === "video"
              ? "bg-blue-500 text-white shadow-md shadow-blue-200"
              : "bg-gray-100 text-gray-500"
              }`}>
              <Video className="w-6 h-6" />
            </div>
            <span className={`text-xs font-medium ${filter === "video" ? "text-blue-600" : "text-gray-500"}`}>
              Videos
            </span>
          </button>

          <button
            onClick={() => setFilter("audio")}
            className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-300 ${filter === "audio" ? "text-purple-600" : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${filter === "audio"
              ? "bg-purple-500 text-white shadow-md shadow-purple-200"
              : "bg-gray-100 text-gray-500"
              }`}>
              <Music className="w-6 h-6" />
            </div>
            <span className={`text-xs font-medium ${filter === "audio" ? "text-purple-600" : "text-gray-500"}`}>
              Audios
            </span>
          </button>
        </div>

        {/* Versión desktop: borde inferior (se muestra en tablet/desktop) */}
        <div className="hidden sm:flex justify-center gap-2 md:gap-4 lg:gap-6 border-b border-gray-100">
          <button
            onClick={() => setFilter("all")}
            className={`relative px-4 md:px-6 py-2.5 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${filter === "all" ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <Heart className="w-4 h-4" />
            Todos
            {filter === "all" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />}
          </button>

          <button
            onClick={() => setFilter("image")}
            className={`relative px-4 md:px-6 py-2.5 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${filter === "image" ? "text-emerald-600" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <ImageIcon className="w-4 h-4" />
            Fotos
            {filter === "image" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />}
          </button>

          <button
            onClick={() => setFilter("video")}
            className={`relative px-4 md:px-6 py-2.5 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${filter === "video" ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <Video className="w-4 h-4" />
            Videos
            {filter === "video" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />}
          </button>

          <button
            onClick={() => setFilter("audio")}
            className={`relative px-4 md:px-6 py-2.5 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${filter === "audio" ? "text-purple-600" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <Music className="w-4 h-4" />
            Audios
            {filter === "audio" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-full" />}
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

// Memory Card Component - Diseño alargado mejorado
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
      default: return "from-gray-500 to-gray-600";
    }
  };

  const isImage = type === "image";
  const isVideo = type === "video";
  const isAudio = type === "audio";

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer hover:shadow-xl hover:-translate-y-1 shadow-md border border-gray-100"
      style={{
        animation: `fadeInUp 0.5s ease-out ${delay}ms both`
      }}
    >
      {/* Banner multimedia superior */}
      {file && (
        <div className="relative h-56 overflow-hidden bg-gray-100">
          {isImage && (
            <>
              <img
                src={file}
                alt="Recuerdo"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </>
          )}

          {isVideo && (
            <>
              <video className="w-full h-full object-cover" src={file} />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-14 border-l-white border-b-8 border-b-transparent ml-1" />
                </div>
              </div>
            </>
          )}

          {isAudio && (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-blue-400/20 rounded-full blur-md animate-pulse"></div>
                  <div className="relative w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Headphones className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex gap-1 mt-3">
                  <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce"></div>
                  <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce delay-150"></div>
                  <div className="w-1 h-4 bg-white rounded-full animate-bounce delay-300"></div>
                  <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce delay-450"></div>
                  <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce delay-600"></div>
                </div>
                <p className="text-white text-xs font-medium mt-2">Audio especial</p>
              </div>
            </div>
          )}

          {/* Badge flotante */}
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5">
            <span className="text-[11px] font-medium text-white flex items-center gap-1.5">
              {getTypeIcon()}
              {type === 'image' && 'Foto del recuerdo'}
              {type === 'video' && 'Video especial'}
              {type === 'audio' && 'Audio emotivo'}
            </span>
          </div>
        </div>
      )}

      {/* Contenido */}
      <div className="p-5">

        {/* Fecha destacada - MEJORADA */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-sm">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Fecha del recuerdo</p>
            <p className="text-sm font-semibold text-gray-800">
              {new Date(memory.date).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Texto del recuerdo */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
            {memory.text}
          </p>
        </div>

        {/* Separador decorativo */}
        <div className="flex justify-center gap-1.5 my-4">
          <div className="w-1 h-1 bg-blue-400 rounded-full" />
          <div className="w-1 h-1 bg-blue-400 rounded-full" />
          <div className="w-1 h-1 bg-blue-400 rounded-full" />
        </div>

        {/* Footer con acciones - MEJORADO */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 pl-2 border-l-2 border-gray-900">
            <span className="text-[10px] font-medium text-gray-800">Momento especial</span>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
            <span>Ver recuerdo</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Memory Modal Component - Estilo carta con más detalles
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn" onClick={onClose}>
      <div className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors hover:scale-110 transition-transform"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header con gradiente mejorado */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <div className="absolute inset-0 bg-blue-600"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative p-5 text-white">
            <div className="flex justify-between items-center mb-3">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {new Date(memory.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-full">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold">Recuerdo Especial</h2>
                <div className="w-12 h-0.5 bg-white/40 rounded-full mt-1.5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">

          {/* Texto del recuerdo con mejor diseño */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-700 text-sm">Este recuerdo</h3>
              <div className="flex-1"></div>
              <div className="flex gap-0.5">
                <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              {memory.text}
            </p>
          </div>

          {/* Multimedia con diseño mejorado */}
          {isImage && (
            <div className="group relative overflow-hidden rounded-xl bg-gray-100 shadow-md">
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
              <img
                src={file}
                alt="Recuerdo"
                className="rounded-xl w-full object-cover max-h-80 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
                <span className="text-[10px] font-medium text-white flex items-center gap-1.5">
                  <ImageIcon className="w-3 h-3" />
                  Imagen del recuerdo
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                <span className="text-[9px] text-white">📸</span>
              </div>
            </div>
          )}

          {isVideo && (
            <div className="group relative rounded-xl overflow-hidden bg-black shadow-md">
              <video controls className="w-full max-h-80" preload="metadata">
                <source src={file} />
              </video>
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
                <span className="text-[10px] font-medium text-white flex items-center gap-1.5">
                  <Video className="w-3 h-3" />
                  Video especial
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                <span className="text-[9px] text-white">🎥</span>
              </div>
            </div>
          )}

          {isAudio && (
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
              <div className="flex items-center gap-4">
                {/* Solo círculo negro y música blanca */}
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-md">
                  <Music className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Audio del recuerdo</p>
                  <p className="text-xs text-gray-500 mt-0.5">🎵 Momento para recordar</p>
                  <div className="flex gap-0.5 mt-1">
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                    <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse delay-300"></div>
                  </div>
                  <audio controls className="w-full mt-2">
                    <source src={file} />
                  </audio>
                </div>
              </div>
            </div>
          )}

          {/* Separador decorativo */}
          <div className="relative pt-2">
            <div className="absolute inset-x-0 top-0 flex justify-center">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            </div>
            <div className="flex justify-center gap-1 mt-2">
              <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}