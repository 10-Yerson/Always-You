"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import {
  Heart,
  Lock,
  Unlock,
  Eye,
  Calendar,
  Music,
  Image as ImageIcon,
  Video,
  ChevronRight,
  Sparkles,
  BookOpen,
  MessageCircle,
  Loader2, ChevronLeft, Maximize2
} from "lucide-react";

export default function LettersPage() {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [hoveredLetter, setHoveredLetter] = useState(null);

  const getLetters = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/letter/user");
      setLetters(data);
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar las cartas 💌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLetters();
  }, []);

  const stats = {
    total: letters.length,
    unlocked: letters.filter(l => l.status !== "bloqueada").length,
    locked: letters.filter(l => l.status === "bloqueada").length,
    viewed: letters.filter(l => l.status === "vista").length,
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
          <Heart className="w-4 h-4 text-blue-500" />
        </div>
        <div className="absolute bottom-1/3 left-10 opacity-10">
          <Sparkles className="w-4 h-4 text-blue-500" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-2xl blur-md opacity-30"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 transform rotate-6 hover:rotate-12 transition-transform duration-300">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Cartas para{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ti
            </span>
          </h1>

          <div className="flex justify-center mb-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed relative before:content-[''] before:absolute before:-left-4 before:top-1/2 before:w-3 before:h-px before:bg-blue-300 after:content-[''] after:absolute after:-right-4 after:top-1/2 after:w-3 after:h-px after:bg-blue-300">
            Cada carta es un pedacito de mí que llega hasta ti,
            mes a mes, para recordarte lo especial que eres.
          </p>
        </div>
      </div>

      {/* Espacio reducido */}
      <div className="pt-3 sm:pt-4 md:pt-5"></div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-row flex-wrap justify-center gap-2 sm:gap-3">

          {/* Tarjeta 1 - Total Cartas */}
          <div className="flex-1 min-w-[80px] sm:min-w-[100px]">
            <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="flex flex-row items-center gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-sm sm:text-2xl font-bold text-gray-800">{stats.total}</p>
                  <p className="text-[9px] sm:text-xs text-gray-500">
                    <span className="sm:hidden">Total</span>
                    <span className="hidden sm:inline">Total Cartas</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 2 - Desbloqueadas */}
          <div className="flex-1 min-w-[80px] sm:min-w-[100px]">
            <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="flex flex-row items-center gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white">
                  <Unlock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-sm sm:text-2xl font-bold text-gray-800">{stats.unlocked}</p>
                  <p className="text-[9px] sm:text-xs text-gray-500">
                    <span className="sm:hidden">Desbloq</span>
                    <span className="hidden sm:inline">Desbloqueadas</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 3 - Por venir */}
          <div className="flex-1 min-w-[80px] sm:min-w-[100px]">
            <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="flex flex-row items-center gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-sm sm:text-2xl font-bold text-gray-800">{stats.locked}</p>
                  <p className="text-[9px] sm:text-xs text-gray-500">
                    <span className="sm:hidden">Pend</span>
                    <span className="hidden sm:inline">Por venir</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Letters Grid con LOADER */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-r-4 border-r-transparent"></div>
              <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-500 animate-pulse" />
            </div>
            <p className="mt-4 text-gray-500 animate-pulse">Cargando tus cartas 📖...</p>
          </div>
        ) : letters.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-4">
              <MessageCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay cartas aún</h3>
            <p className="text-gray-500">Pronto llegarán las primeras cartas 📮</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {letters.map((letter, index) => {
              const isLocked = letter.status === "bloqueada";
              const isNew = letter.status === "disponible";
              const isViewed = letter.status === "vista";
              const delay = index * 100;

              return (
                <LetterCard
                  key={letter._id}
                  letter={letter}
                  isLocked={isLocked}
                  isNew={isNew}
                  isViewed={isViewed}
                  delay={delay}
                  onSelect={() => !isLocked && setSelectedLetter(letter)}
                  onHover={() => setHoveredLetter(letter._id)}
                  onLeave={() => setHoveredLetter(null)}
                  isHovered={hoveredLetter === letter._id}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Letter Modal */}
      {selectedLetter && (
        <LetterModal letter={selectedLetter} onClose={() => setSelectedLetter(null)} />
      )}
    </div>
  );
}

// Letter Card Component
function LetterCard({ letter, isLocked, isNew, isViewed, delay, onSelect, onHover, onLeave, isHovered }) {
  const getMonthName = (monthNumber) => {
    const months = [
      "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
      "Octubre", "Noviembre", "Diciembre", "Enero",
      "Febrero", "Marzo", "Abril"
    ];
    return months[(monthNumber - 1) % 12];
  };

  return (
    <div
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer
        ${isLocked ? 'opacity-75' : 'hover:scale-105 hover:shadow-2xl'}
        ${isHovered ? 'shadow-2xl' : 'shadow-lg'}
      `}
      style={{
        animation: `fadeInUp 0.5s ease-out ${delay}ms both`
      }}
    >
      {/* Card Background - BLANCO */}
      <div className="absolute inset-0 bg-white" />

      {/* Card Border accent según estado */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isLocked ? 'bg-gray-400' : isViewed ? 'bg-emerald-500' : 'bg-blue-500'
        }`} />

      {/* Card Content */}
      <div className="relative p-6 min-h-[320px] flex flex-col justify-between">
        {/* Badges */}
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            <span className="bg-blue-50 px-3 py-1 rounded-full text-xs text-blue-600 font-medium">
              📅 {getMonthName(letter.month)}
            </span>
            {isNew && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                ✨ Nuevo
              </span>
            )}
            {isViewed && !isLocked && (
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                👁️ Vista
              </span>
            )}
          </div>
          {isLocked ? (
            <div className="bg-gray-100 p-2 rounded-full">
              <Lock className="w-5 h-5 text-gray-500" />
            </div>
          ) : (
            <div className="bg-blue-100 p-2 rounded-full">
              <Heart className="w-5 h-5 text-blue-500" />
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="text-center my-6">
          {isLocked ? (
            <>
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                <Lock className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-gray-700 text-xl font-bold mb-2">Carta Bloqueada</h3>
              <p className="text-gray-500 text-sm">
                Se desbloqueará pronto
              </p>
              <div className="mt-4 flex justify-center gap-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-150" />
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-300" />
              </div>
            </>
          ) : (
            <>
              <h3 className="text-gray-800 text-2xl font-bold mb-3">{letter.title}</h3>
              <div className="w-12 h-0.5 bg-blue-400 mx-auto mb-3" />
              <p className="text-gray-600 text-sm line-clamp-3">
                {letter.message}
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-gray-500 text-xs">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Mes {letter.month}</span>
          </div>
          {!isLocked && (
            <div className="flex items-center gap-2">
              {letter.imageUrl && <ImageIcon className="w-3 h-3" />}
              {letter.videoUrl && <Video className="w-3 h-3" />}
              {letter.audioUrl && <Music className="w-3 h-3" />}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-500" />
            </div>
          )}
        </div>
      </div>

      {/* Hover Effect Overlay */}
      {!isLocked && isHovered && (
        <div className="absolute inset-0 bg-blue-50/80 backdrop-blur-[1px] flex items-center justify-center">
          <div className="bg-blue-500 rounded-full p-3 animate-bounce shadow-lg shadow-blue-200">
            <Heart className="w-6 h-6 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}

// Letter Modal Component
function LetterModal({ letter, onClose }) {
  const [showFullMessage, setShowFullMessage] = useState(false);

  const getMonthName = (monthNumber) => {
    const months = [
      "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
      "Octubre", "Noviembre", "Diciembre", "Enero",
      "Febrero", "Marzo", "Abril"
    ];
    return months[(monthNumber - 1) % 12];
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Dentro del componente LetterModal
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Recopilar todos los archivos multimedia
  const mediaItems = [
    ...(letter.imageUrl ? [{ type: 'image', url: letter.imageUrl, icon: <ImageIcon className="w-5 h-5" /> }] : []),
    ...(letter.videoUrl ? [{ type: 'video', url: letter.videoUrl, icon: <Video className="w-5 h-5" /> }] : []),
    ...(letter.audioUrl ? [{ type: 'audio', url: letter.audioUrl, icon: <Music className="w-5 h-5" /> }] : []),
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn" onClick={onClose}>
      <div className={`relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-scaleIn transition-all duration-300 ${isFullscreen ? 'h-[95vh]' : 'max-h-[90vh]'}`} onClick={(e) => e.stopPropagation()}>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-4 text-white rounded-t-2xl">
          <div className="flex justify-between items-center mb-2">
            <span className="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs">
              📅 {getMonthName(letter.month)} · Mes {letter.month}
            </span>
            <Heart className="w-5 h-5 text-blue-200" />
          </div>
          <h2 className="text-lg md:text-xl font-bold pr-6 line-clamp-1">{letter.title}</h2>
        </div>

        <div className={`flex flex-col ${isFullscreen ? 'h-[calc(95vh-110px)]' : 'max-h-[calc(90vh-110px)]'} overflow-y-auto`}>
          <div className="p-4 space-y-4 flex-1">

            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
                <h3 className="font-medium text-gray-700 text-xs uppercase tracking-wide">Mensaje</h3>
              </div>
              <p className={`text-gray-600 leading-relaxed text-sm ${!showFullMessage && 'line-clamp-3'}`}>
                {letter.message}
              </p>
              {letter.message && letter.message.length > 300 && (
                <button
                  onClick={() => setShowFullMessage(!showFullMessage)}
                  className="text-blue-500 text-xs mt-1.5 hover:underline"
                >
                  {showFullMessage ? 'Ver menos' : 'Ver más'}
                </button>
              )}
            </div>

            {mediaItems.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">

                <div className="relative">
                  {/* Botón anterior - solo visible si no es el primero */}
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
                          alt="Contenido multimedia"
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
                            <p className="text-sm font-medium text-gray-700">Audio de la carta</p>
                            <p className="text-xs text-gray-400 mt-1">🎵 Disfruta de este momento especial</p>
                          </div>
                          <audio controls className="w-full mt-2">
                            <source src={currentMedia.url} />
                          </audio>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Botón siguiente - solo visible si no es el último */}
                  {hasMultipleMedia && !isLast && (
                    <button
                      onClick={nextMedia}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-all backdrop-blur-sm group"
                    >
                      <ChevronRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    </button>
                  )}
                </div>

                {/* Barra de controles mejorada */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    {/* Miniaturas de navegación */}
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