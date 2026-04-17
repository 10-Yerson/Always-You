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
  Compass
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

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-r-4 border-r-transparent"></div>
          <Target className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-500 animate-pulse" />
        </div>
        <p className="mt-4 text-gray-500 animate-pulse">Cargando nuestras metas 🎯...</p>
      </div>
    );
  }

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
            <Compass className="w-4 h-4 text-blue-200" />
            <span className="text-sm text-white font-medium">Nuestro camino juntos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3 text-white">
            <Target className="w-10 h-10 text-blue-200" />
            Metas y Sueños
            <Sparkles className="w-8 h-8 text-blue-200" />
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Cada meta es un paso más hacia nuestro futuro juntos
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
          <StatCard 
            icon={<Flag className="w-5 h-5" />} 
            label="Total Metas" 
            value={stats.total} 
            color="from-blue-500 to-blue-600" 
          />
          <StatCard 
            icon={<CheckCircle className="w-5 h-5" />} 
            label="Completadas" 
            value={stats.completed} 
            color="from-emerald-500 to-teal-600" 
          />
          <StatCard 
            icon={<Clock className="w-5 h-5" />} 
            label="Pendientes" 
            value={stats.pending} 
            color="from-amber-500 to-orange-600" 
          />
          <StatCard 
            icon={<TrendingUp className="w-5 h-5" />} 
            label="Progreso" 
            value={`${stats.percentage}%`} 
            color="from-blue-500 to-indigo-600" 
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto px-6 mt-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">Progreso de metas cumplidas</span>
            <span className="text-sm font-bold text-blue-500">{stats.percentage}%</span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 relative"
                style={{ width: `${stats.percentage}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-30 animate-shimmer" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            {stats.completed} de {stats.total} metas cumplidas
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === "all"
                ? "bg-blue-500 text-white shadow-md shadow-blue-200"
                : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500 border border-gray-200"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === "completed"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500 border border-gray-200"
            }`}
          >
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Completadas
            </span>
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === "pending"
                ? "bg-amber-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500 border border-gray-200"
            }`}
          >
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Pendientes
            </span>
          </button>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredGoals.length === 0 ? (
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
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        isCompleted ? 'bg-emerald-500' : 'bg-blue-500'
      }`} />
      
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
              <div className="relative overflow-hidden rounded-xl h-24">
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
              <div className="relative overflow-hidden rounded-xl h-24 bg-gray-900 flex items-center justify-center">
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

// Goal Modal Component
function GoalModal({ goal, onClose }) {
  const image = goal.media?.image;
  const video = goal.media?.video;
  const isCompleted = goal.status === "completado";

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
        <div className={`p-6 text-white rounded-t-3xl ${
          isCompleted 
            ? 'bg-gradient-to-r from-emerald-700 to-teal-800'
            : 'bg-gradient-to-r from-blue-700 to-blue-600'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(goal.createdAt).toLocaleDateString()}
            </span>
            {isCompleted ? (
              <CheckCircle className="w-6 h-6 text-emerald-300" />
            ) : (
              <Target className="w-6 h-6 text-blue-200" />
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-full">
              {isCompleted ? (
                <Trophy className="w-8 h-8" />
              ) : (
                <Flag className="w-8 h-8" />
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">{goal.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Meta cumplida</span>
              </>
            ) : (
              <>
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Meta pendiente</span>
              </>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              Descripción
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {goal.description}
            </p>
          </div>

          {/* Image */}
          {image && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-blue-500" />
                Recuerdo
              </h3>
              <img
                src={image}
                alt={goal.title}
                className="rounded-xl w-full object-cover max-h-80"
              />
            </div>
          )}

          {/* Video */}
          {video && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-blue-500" />
                Video
              </h3>
              <video controls className="rounded-xl w-full">
                <source src={video} />
              </video>
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-blue-500 text-sm italic">
              "Cada meta cumplida es un paso más hacia nuestro sueño compartido 💙"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}