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
  Loader2,
  ChevronLefty,
  ChevronLeft,
  Maximize2
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-10">

        {/* Versión móvil: íconos grandes con números (se muestra en móvil) */}
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
            {stats.total > 0 && (
              <span className="text-[10px] font-semibold text-gray-400">{stats.total}</span>
            )}
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
            {stats.images > 0 && (
              <span className="text-[10px] font-semibold text-gray-400">{stats.images}</span>
            )}
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
            {stats.videos > 0 && (
              <span className="text-[10px] font-semibold text-gray-400">{stats.videos}</span>
            )}
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
            {stats.audios > 0 && (
              <span className="text-[10px] font-semibold text-gray-400">{stats.audios}</span>
            )}
          </button>
        </div>

        {/* Versión desktop: botones con números (se muestra en tablet/desktop) */}
        <div className="hidden sm:flex justify-center gap-2 md:gap-4 lg:gap-6 border-b border-gray-100">
          <button
            onClick={() => setFilter("all")}
            className={`relative px-4 md:px-6 py-2.5 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${filter === "all" ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <Heart className="w-4 h-4" />
            <span>Todos</span>
            {stats.total > 0 && (
              <span className={`text-xs font-semibold ${filter === "all" ? "text-blue-400" : "text-gray-400"}`}>
                ({stats.total})
              </span>
            )}
            {filter === "all" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />}
          </button>

          <button
            onClick={() => setFilter("image")}
            className={`relative px-4 md:px-6 py-2.5 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${filter === "image" ? "text-emerald-600" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Fotos</span>
            {stats.images > 0 && (
              <span className={`text-xs font-semibold ${filter === "image" ? "text-emerald-400" : "text-gray-400"}`}>
                ({stats.images})
              </span>
            )}
            {filter === "image" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />}
          </button>

          <button
            onClick={() => setFilter("video")}
            className={`relative px-4 md:px-6 py-2.5 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${filter === "video" ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <Video className="w-4 h-4" />
            <span>Videos</span>
            {stats.videos > 0 && (
              <span className={`text-xs font-semibold ${filter === "video" ? "text-blue-400" : "text-gray-400"}`}>
                ({stats.videos})
              </span>
            )}
            {filter === "video" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />}
          </button>

          <button
            onClick={() => setFilter("audio")}
            className={`relative px-4 md:px-6 py-2.5 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${filter === "audio" ? "text-purple-600" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <Music className="w-4 h-4" />
            <span>Audios</span>
            {stats.audios > 0 && (
              <span className={`text-xs font-semibold ${filter === "audio" ? "text-purple-400" : "text-gray-400"}`}>
                ({stats.audios})
              </span>
            )}
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

// Memory Modal Component - Mismo estilo que el modal de cartas
function MemoryModal({ memory, onClose }) {
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Recopilar todos los archivos multimedia
  const mediaItems = [
    ...(memory.image ? [{ type: 'image', url: memory.image, icon: <ImageIcon className="w-5 h-5" /> }] : []),
    ...(memory.video ? [{ type: 'video', url: memory.video, icon: <Video className="w-5 h-5" /> }] : []),
    ...(memory.music ? [{ type: 'audio', url: memory.music, icon: <Music className="w-5 h-5" /> }] : []),
  ];

  const currentMedia = mediaItems[currentMediaIndex];
  const hasMultipleMedia = mediaItems.length > 1;
  const isFirst = currentMediaIndex === 0;
  const isLast = currentMediaIndex === mediaItems.length - 1;

  const nextMedia = () => {
    if (!isLast) setCurrentMediaIndex(prev => prev + 1);
  };

  const prevMedia = () => {
    if (!isFirst) setCurrentMediaIndex(prev => prev - 1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn" onClick={onClose}>
      <div className={`relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-scaleIn transition-all duration-300 ${isFullscreen ? 'h-[95vh]' : 'max-h-[90vh]'}`} onClick={(e) => e.stopPropagation()}>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header - Mismo estilo que cartas */}
        <div className="bg-blue-600 p-4 text-white rounded-t-2xl">
          <div className="flex justify-between items-center mb-2">
            <span className="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs">
              📅 {new Date(memory.date).toLocaleDateString()}
            </span>
            <Heart className="w-5 h-5 text-blue-200" />
          </div>
          <h2 className="text-lg md:text-xl font-bold pr-6 line-clamp-1">Recuerdo Especial</h2>
        </div>

        <div className={`flex flex-col ${isFullscreen ? 'h-[calc(95vh-110px)]' : 'max-h-[calc(90vh-110px)]'} overflow-y-auto`}>
          <div className="p-4 space-y-4 flex-1">

            {/* Mensaje - Mismo estilo que cartas */}
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
                <h3 className="font-medium text-gray-700 text-xs uppercase tracking-wide">Recuerdo</h3>
              </div>
              <p className={`text-gray-600 leading-relaxed text-sm ${!showFullMessage && 'line-clamp-3'}`}>
                {memory.text}
              </p>
              {memory.text && memory.text.length > 300 && (
                <button
                  onClick={() => setShowFullMessage(!showFullMessage)}
                  className="text-blue-500 text-xs mt-1.5 hover:underline"
                >
                  {showFullMessage ? 'Ver menos' : 'Ver más'}
                </button>
              )}
            </div>

            {/* Carrusel Multimedia - Mismo estilo que cartas */}
            {mediaItems.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">

                <div className="relative">
                  {/* Botón anterior */}
                  {hasMultipleMedia && !isFirst && (
                    <button
                      onClick={prevMedia}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-all backdrop-blur-sm group"
                    >
                      <ChevronLeft className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    </button>
                  )}

                  <div className="p-4">
                    {currentMedia?.type === 'image' && (
                      <div className="relative overflow-hidden rounded-lg bg-white flex items-center justify-center" style={{ height: '280px' }}>
                        <img
                          src={currentMedia.url}
                          alt="Recuerdo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    {currentMedia?.type === 'video' && (
                      <div className="relative overflow-hidden rounded-lg bg-black flex items-center justify-center" style={{ height: '280px' }}>
                        <video
                          controls
                          className="w-full h-full object-contain"
                          preload="metadata"
                        >
                          <source src={currentMedia.url} />
                        </video>
                      </div>
                    )}

                    {currentMedia?.type === 'audio' && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4" style={{ height: '280px' }}>
                        <div className="flex flex-col items-center justify-center h-full gap-3">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                            <Music className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-700">Audio del recuerdo</p>
                            <p className="text-xs text-gray-400 mt-1">🎵 Disfruta de este momento especial</p>
                          </div>
                          <audio controls className="w-full mt-2">
                            <source src={currentMedia.url} />
                          </audio>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Botón siguiente */}
                  {hasMultipleMedia && !isLast && (
                    <button
                      onClick={nextMedia}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-all backdrop-blur-sm group"
                    >
                      <ChevronRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    </button>
                  )}
                </div>

                {/* Barra de controles */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    {/* Miniaturas de navegación */}
                    <div className="flex gap-1.5">
                      {mediaItems.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentMediaIndex(idx)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${currentMediaIndex === idx
                            ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600'
                            }`}
                        >
                          <span className="flex items-center gap-1">
                            {item.type === 'image' && '📸'}
                            {item.type === 'video' && '🎥'}
                            {item.type === 'audio' && '🎵'}
                            <span className="text-[10px]">{idx + 1}</span>
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Separador */}
                    <div className="w-px h-4 bg-gray-200"></div>

                    {/* Contador */}
                    <span className="text-xs font-medium text-gray-500">
                      <span className="text-blue-600">{currentMediaIndex + 1}</span> / {mediaItems.length}
                    </span>
                  </div>

                  {/* Botón de pantalla completa */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                    title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                  >
                    <Maximize2 className="w-4 h-4 text-gray-500 group-hover:text-blue-500 group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                {/* Indicadores de progreso */}
                {hasMultipleMedia && (
                  <div className="flex justify-center gap-2 py-2 bg-gray-50/50">
                    {mediaItems.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentMediaIndex(idx)}
                        className={`transition-all duration-300 rounded-full ${currentMediaIndex === idx
                          ? 'w-5 h-1.5 bg-blue-500'
                          : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
                          }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}