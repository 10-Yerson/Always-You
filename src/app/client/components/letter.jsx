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
  MessageCircle
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

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-r-4 border-r-transparent"></div>
          <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-500 animate-pulse" />
        </div>
        <p className="mt-4 text-gray-500 animate-pulse">Cargando tus cartas 📖...</p>
      </div>
    );
  }

  const stats = {
    total: letters.length,
    unlocked: letters.filter(l => l.status !== "bloqueada").length,
    locked: letters.filter(l => l.status === "bloqueada").length,
    viewed: letters.filter(l => l.status === "vista").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-4 h-4 text-blue-200" />
            <span className="text-sm text-white font-medium">Nuestra historia</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3 text-white">
            <Heart className="w-10 h-10 text-blue-200 fill-blue-200" />
            Cartas para ti
            <Sparkles className="w-8 h-8 text-blue-200" />
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Cada carta es un pedacito de mí que llega hasta ti mes a mes
          </p>
        </div>
        
        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={<BookOpen className="w-5 h-5" />} label="Total Cartas" value={stats.total} color="from-blue-500 to-blue-600" />
          <StatCard icon={<Unlock className="w-5 h-5" />} label="Desbloqueadas" value={stats.unlocked} color="from-emerald-500 to-teal-600" />
          <StatCard icon={<Lock className="w-5 h-5" />} label="Por venir" value={stats.locked} color="from-amber-500 to-orange-600" />
          <StatCard icon={<Eye className="w-5 h-5" />} label="Vistas" value={stats.viewed} color="from-blue-500 to-indigo-600" />
        </div>
      </div>

      {/* Letters Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {letters.length === 0 ? (
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

// Stat Card Component
function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`bg-gradient-to-br ${color} p-2 rounded-xl text-white`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
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
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        isLocked ? 'bg-gray-400' : isViewed ? 'bg-emerald-500' : 'bg-blue-500'
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
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
              📅 {getMonthName(letter.month)} - Mes {letter.month}
            </span>
            <Heart className="w-6 h-6 text-blue-200" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">{letter.title}</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Message */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-500" />
              Mensaje
            </h3>
            <p className={`text-gray-600 leading-relaxed ${!showFullMessage && 'line-clamp-6'}`}>
              {letter.message}
            </p>
            {letter.message && letter.message.length > 300 && (
              <button
                onClick={() => setShowFullMessage(!showFullMessage)}
                className="text-blue-500 text-sm mt-2 hover:underline"
              >
                {showFullMessage ? 'Ver menos' : 'Ver más'}
              </button>
            )}
          </div>

          {/* Image */}
          {letter.imageUrl && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-500" />
                Imagen
              </h3>
              <img
                src={letter.imageUrl}
                alt="Carta"
                className="rounded-xl w-full object-cover max-h-80"
              />
            </div>
          )}

          {/* Video */}
          {letter.videoUrl && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Video className="w-4 h-4 text-blue-500" />
                Video
              </h3>
              <video controls className="rounded-xl w-full">
                <source src={letter.videoUrl} />
              </video>
            </div>
          )}

          {/* Audio */}
          {letter.audioUrl && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Music className="w-4 h-4 text-blue-500" />
                Audio
              </h3>
              <audio controls className="w-full">
                <source src={letter.audioUrl} />
              </audio>
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-blue-500 text-sm italic">
              "Cada palabra escrita es un latido de mi corazón para ti 💙"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}