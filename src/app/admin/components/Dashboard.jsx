'use client'

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import { 
  Heart, Mail, Image, Target, Music, Users, 
  TrendingUp, Calendar, Clock, Sparkles, 
  Eye, Lock, Unlock, CheckCircle, Loader2
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalLetters: 0,
    totalMemories: 0,
    totalGoals: 0,
    totalSongs: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Usar rutas que no requieren admin específicamente
        // o manejar el 403 correctamente
        const endpoints = [
          { url: '/api/letter/admin', key: 'totalLetters' },
          { url: '/api/memories/admin', key: 'totalMemories' },
          { url: '/api/goals/admin', key: 'totalGoals' },
          { url: '/api/music/all', key: 'totalSongs' },
          { url: '/api/user', key: 'totalUsers' }, // Cambiar a /api/users
        ];

        const results = await Promise.allSettled(
          endpoints.map(endpoint => axios.get(endpoint.url))
        );

        const newStats = { ...stats };
        
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            const key = endpoints[index].key;
            newStats[key] = result.value.data?.length || 0;
          } else {
            console.error(`Error al cargar ${endpoints[index].key}:`, result.reason);
            // Si es 403, intentar con ruta alternativa
            if (result.reason?.response?.status === 403) {
              // Intentar con ruta de usuario
              const alternativeUrl = endpoints[index].url.replace('/admin', '');
              axios.get(alternativeUrl).then(res => {
                if (res.data) {
                  newStats[endpoints[index].key] = res.data?.length || 0;
                  setStats({ ...newStats });
                }
              }).catch(e => console.error(e));
            }
          }
        });

        setStats(newStats);
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
        toast.error("Error al cargar algunas estadísticas");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Cartas", value: stats.totalLetters, icon: Mail, color: "from-blue-500 to-indigo-600", bgColor: "bg-blue-50", textColor: "text-blue-600" },
    { title: "Recuerdos", value: stats.totalMemories, icon: Image, color: "from-emerald-500 to-teal-600", bgColor: "bg-emerald-50", textColor: "text-emerald-600" },
    { title: "Metas", value: stats.totalGoals, icon: Target, color: "from-amber-500 to-orange-600", bgColor: "bg-amber-50", textColor: "text-amber-600" },
    { title: "Canciones", value: stats.totalSongs, icon: Music, color: "from-purple-500 to-pink-600", bgColor: "bg-purple-50", textColor: "text-purple-600" },
    { title: "Usuarios", value: stats.totalUsers, icon: Users, color: "from-cyan-500 to-blue-600", bgColor: "bg-cyan-50", textColor: "text-cyan-600" },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
        <p className="text-gray-500">Cargando estadísticas...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <p className="text-gray-500 ml-10">Bienvenido al panel de administración de Always You</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`${stat.bgColor} p-3 rounded-xl`}>
                <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
              </div>
              <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000`}
                style={{ width: `${Math.min(100, stat.value * 10)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de Bienvenida */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-medium text-blue-200">Always You</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">¡Bienvenido, Administrador!</h2>
              <p className="text-blue-100 mb-4 max-w-md">
                Gestiona todo el contenido de la plataforma desde un solo lugar.
                Cartas, recuerdos, metas y música.
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs">
                  {stats.totalLetters} Cartas
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs">
                  {stats.totalMemories} Recuerdos
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs">
                  {stats.totalGoals} Metas
                </div>
              </div>
            </div>
            <Heart className="w-16 h-16 text-white/20 fill-white/10" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            Resumen Rápido
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Contenido total</span>
              <span className="font-semibold text-gray-800">
                {stats.totalLetters + stats.totalMemories + stats.totalGoals + stats.totalSongs}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Usuarios activos</span>
              <span className="font-semibold text-gray-800">{stats.totalUsers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Última actualización</span>
              <span className="font-semibold text-gray-800">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Progreso</span>
              <span className="text-blue-600 font-medium">
                {Math.round((stats.totalLetters + stats.totalMemories + stats.totalGoals + stats.totalSongs) / 4)}%
              </span>
            </div>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000"
                style={{ width: `${(stats.totalLetters + stats.totalMemories + stats.totalGoals + stats.totalSongs) / 4}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          Accesos Rápidos
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/admin/letters" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 text-center group">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Administrar Cartas</span>
          </a>
          <a href="/admin/memories" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 text-center group">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Image className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Administrar Recuerdos</span>
          </a>
          <a href="/admin/goals" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 text-center group">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Target className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Administrar Metas</span>
          </a>
          <a href="/admin/music" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 text-center group">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Music className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Administrar Música</span>
          </a>
        </div>
      </div>
    </div>
  );
}