"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import {
  Target,
  CheckCircle,
  Clock,
  Calendar,
  Trophy,
  Sparkles,
  Heart,
  Star,
  TrendingUp,
  Flag,
  Compass,
  Loader2, ImageIcon, Video, ChevronRight, Maximize2, ChevronLeft
} from "lucide-react";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedGoal, setSelectedGoal] = useState(null);

  const getGoals = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/goals");
      setGoals(data);
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar las metas 🎯");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGoals();
  }, []);

  const filteredGoals = goals.filter(goal => {
    if (filter === "completed") return goal.status === "completado";
    if (filter === "pending") return goal.status !== "completado";
    return true;
  });

  const stats = {
    total: goals.length,
    completed: goals.filter(g => g.status === "completado").length,
    pending: goals.filter(g => g.status !== "completado").length,
    percentage: goals.length > 0
      ? Math.round((goals.filter(g => g.status === "completado").length / goals.length) * 100)
      : 0
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
          <Target className="w-4 h-4 text-blue-500" />
        </div>
        <div className="absolute bottom-1/3 left-10 opacity-10">
          <Flag className="w-4 h-4 text-blue-500" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-2xl blur-md opacity-30"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 transform rotate-6 hover:rotate-12 transition-transform duration-300">
                <Target className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Metas y{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Sueños
            </span>
          </h1>

          <div className="flex justify-center mb-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </div>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed relative before:content-[''] before:absolute before:-left-4 before:top-1/2 before:w-3 before:h-px before:bg-blue-300 after:content-[''] after:absolute after:-right-4 after:top-1/2 after:w-3 after:h-px after:bg-blue-300">
            Cada meta es un paso más hacia nuestro futuro juntos,
            porque juntos podemos alcanzar cualquier sueño.
          </p>

        </div>
      </div>

      <div className="pt-3 sm:pt-4 md:pt-5"></div>

      {/* Filter Tabs - Combinación responsive con estadísticas integradas */}
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
              <Target className="w-6 h-6" />
            </div>
            <span className={`text-xs font-medium ${filter === "all" ? "text-blue-600" : "text-gray-500"}`}>
              Todas
            </span>
            {stats.total > 0 && (
              <span className="text-[10px] font-semibold text-gray-400">{stats.total}</span>
            )}
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-300 ${filter === "completed" ? "text-emerald-600" : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${filter === "completed"
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
              : "bg-gray-100 text-gray-500"
              }`}>
              <CheckCircle className="w-6 h-6" />
            </div>
            <span className={`text-xs font-medium ${filter === "completed" ? "text-emerald-600" : "text-gray-500"}`}>
              Completadas
            </span>
            {stats.completed > 0 && (
              <span className="text-[10px] font-semibold text-gray-400">{stats.completed}</span>
            )}
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-300 ${filter === "pending" ? "text-amber-600" : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${filter === "pending"
              ? "bg-amber-500 text-white shadow-md shadow-amber-200"
              : "bg-gray-100 text-gray-500"
              }`}>
              <Clock className="w-6 h-6" />
            </div>
            <span className={`text-xs font-medium ${filter === "pending" ? "text-amber-600" : "text-gray-500"}`}>
              Pendientes
            </span>
            {stats.pending > 0 && (
              <span className="text-[10px] font-semibold text-gray-400">{stats.pending}</span>
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
            <Target className="w-4 h-4" />
            <span>Todas</span>
            {stats.total > 0 && (
              <span className={`text-xs font-semibold ${filter === "all" ? "text-blue-400" : "text-gray-400"}`}>
                ({stats.total})
              </span>
            )}
            {filter === "all" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />}
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`relative px-4 md:px-6 py-2.5 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${filter === "completed" ? "text-emerald-600" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Completadas</span>
            {stats.completed > 0 && (
              <span className={`text-xs font-semibold ${filter === "completed" ? "text-emerald-400" : "text-gray-400"}`}>
                ({stats.completed})
              </span>
            )}
            {filter === "completed" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />}
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`relative px-4 md:px-6 py-2.5 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${filter === "pending" ? "text-amber-600" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <Clock className="w-4 h-4" />
            <span>Pendientes</span>
            {stats.pending > 0 && (
              <span className={`text-xs font-semibold ${filter === "pending" ? "text-amber-400" : "text-gray-400"}`}>
                ({stats.pending})
              </span>
            )}
            {filter === "pending" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />}
          </button>
        </div>
      </div>

      {/* Goals Grid con LOADER */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-r-4 border-r-transparent"></div>
              <Target className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-500 animate-pulse" />
            </div>
            <p className="mt-4 text-gray-500 animate-pulse">Cargando nuestras metas 🎯...</p>
          </div>
        ) : filteredGoals.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-4">
              <Target className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay metas {filter === "completed" ? "completadas" : filter === "pending" ? "pendientes" : ""}</h3>
            <p className="text-gray-500">Sigue trabajando en tus metas 🎯</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGoals.map((goal, index) => {
              const isCompleted = goal.status === "completado";
              const delay = index * 100;

              return (
                <GoalCard
                  key={goal._id}
                  goal={goal}
                  isCompleted={isCompleted}
                  delay={delay}
                  onClick={() => setSelectedGoal(goal)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Goal Modal */}
      {selectedGoal && (
        <GoalModal goal={selectedGoal} onClose={() => setSelectedGoal(null)} />
      )}
    </div>
  );
}

// Goal Card Component
function GoalCard({ goal, isCompleted, delay, onClick }) {
  const image = goal.media?.image;
  const video = goal.media?.video;

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer
        ${!isCompleted ? 'hover:scale-105 hover:shadow-2xl' : 'hover:shadow-xl'}
        shadow-lg border border-gray-100
      `}
      style={{
        animation: `fadeInUp 0.5s ease-out ${delay}ms both`
      }}
    >
      {/* Top border line según estado */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isCompleted ? 'bg-emerald-500' : 'bg-blue-500'}`} />

      {/* Content */}
      <div className="relative p-6 min-h-[300px] flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(goal.createdAt).toLocaleDateString()}
          </span>
          {isCompleted ? (
            <div className="bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">Cumplido</span>
            </div>
          ) : (
            <div className="bg-blue-100 px-3 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Pendiente</span>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="text-center my-4">
          <div className="inline-block p-3 bg-blue-50 rounded-full mb-3">
            {isCompleted ? (
              <Trophy className="w-8 h-8 text-emerald-500" />
            ) : (
              <Target className="w-8 h-8 text-blue-500" />
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{goal.title}</h3>
          <div className={`w-12 h-0.5 mx-auto ${isCompleted ? 'bg-emerald-400' : 'bg-blue-400'}`} />
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {goal.description}
          </p>
        </div>

        {/* Media Preview */}
        {(image || video) && (
          <div className="mt-2">
            {image && (
              <div className="relative overflow-hidden rounded-xl h-40">
                <img
                  src={image}
                  alt={goal.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
            )}
            {video && !image && (
              <div className="relative overflow-hidden rounded-xl h-40 bg-gray-900 flex items-center justify-center">
                <video className="w-full h-full object-cover" src={video} />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-blue-400" />
            <span className="text-xs text-gray-500">Meta importante</span>
          </div>
          <div className="text-xs text-blue-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Ver detalles
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      {!isCompleted && (
        <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/60 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-blue-500 rounded-full p-3 animate-bounce shadow-lg shadow-blue-200">
            <Target className="w-6 h-6 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}

// Goal Modal Component - Estilo igual al de cartas (con carrusel)
function GoalModal({ goal, onClose }) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isCompleted = goal.status === "completado";

  // Recopilar todos los archivos multimedia (solo imagen y video)
  const mediaItems = [
    ...(goal.media?.image ? [{ type: 'image', url: goal.media.image, icon: <ImageIcon className="w-5 h-5" /> }] : []),
    ...(goal.media?.video ? [{ type: 'video', url: goal.media.video, icon: <Video className="w-5 h-5" /> }] : []),
  ];

  const currentMedia = mediaItems[currentMediaIndex];
  const hasMultipleMedia = mediaItems.length > 1;
  const isFirst = currentMediaIndex === 0;
  const isLast = currentMediaIndex === mediaItems.length - 1;

  const nextMedia = () => {
    if (!isLast) {
      setCurrentMediaIndex((prev) => prev + 1);
    }
  };

  const prevMedia = () => {
    if (!isFirst) {
      setCurrentMediaIndex((prev) => prev - 1);
    }
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

        {/* Header */}
        <div className={`p-4 text-white rounded-t-2xl ${isCompleted
          ? 'bg-gradient-to-r from-emerald-700 to-teal-800'
          : 'bg-gradient-to-r from-blue-700 to-blue-600'
          }`}>
          <div className="flex justify-between items-center mb-2">
            <span className="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(goal.createdAt).toLocaleDateString()}
            </span>
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-emerald-300" />
            ) : (
              <Target className="w-5 h-5 text-blue-200" />
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-full">
              {isCompleted ? (
                <Trophy className="w-5 h-5" />
              ) : (
                <Flag className="w-5 h-5" />
              )}
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold pr-6 line-clamp-1">{goal.title}</h2>
              <div className="w-12 h-0.5 bg-white/40 rounded-full mt-1.5"></div>
            </div>
          </div>
        </div>

        <div className={`flex flex-col ${isFullscreen ? 'h-[calc(95vh-110px)]' : 'max-h-[calc(90vh-110px)]'} overflow-y-auto`}>
          <div className="p-4 space-y-4 flex-1">

            {/* Status Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
              }`}>
              {isCompleted ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Meta cumplida</span>
                </>
              ) : (
                <>
                  <Clock className="w-3.5 h-3.5" />
                  <span>Meta pendiente</span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Target className="w-3.5 h-3.5 text-blue-500" />
                <h3 className="font-medium text-gray-700 text-xs uppercase tracking-wide">Descripción</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                {goal.description}
              </p>
            </div>

            {/* Carrusel Multimedia (igual al de cartas) */}
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
                      <div className="relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center" style={{ height: '280px' }}>
                        <img
                          src={currentMedia.url}
                          alt={goal.title}
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
                    <div className="flex gap-1.5">
                      {mediaItems.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentMediaIndex(idx)}
                          className={`group relative px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${currentMediaIndex === idx
                            ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600'
                            }`}
                        >
                          <span className="flex items-center gap-1">
                            {item.type === 'image' && '📸'}
                            {item.type === 'video' && '🎥'}
                            <span className="text-[10px]">{idx + 1}</span>
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="w-px h-4 bg-gray-200"></div>

                    <span className="text-xs font-medium text-gray-500">
                      <span className="text-blue-600">{currentMediaIndex + 1}</span> / {mediaItems.length}
                    </span>
                  </div>

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