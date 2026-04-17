'use client'

import { useEffect, useState } from 'react'
import axios from 'axios' // o desde '@/utils/axios' si tienes configurado
import {
  Heart,
  Sparkles,
  Mail,
  Image,
  Target,
  Music,
  ChevronRight,
  Star,
  Camera,
  Headphones,
  Clock
} from 'lucide-react'

export default function HomePage() {
  const [greeting, setGreeting] = useState('')
  const [userName, setUserName] = useState('')
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0
  })
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Buenos días')
    else if (hour < 18) setGreeting('Buenas tardes')
    else setGreeting('Buenas noches')

    setUserName('Yuyu')
  }, [])

  // Obtener el tiempo restante desde la API pública
  useEffect(() => {
    const fetchTimeLeft = async () => {
      try {
        // Usar la ruta pública (no requiere autenticación)
        const { data } = await axios.get('http://localhost:5000/api/letter/public-status')

        setTimeLeft(data.timeLeft)
        setMessage(data.message)
      } catch (error) {
        console.error('Error al obtener el tiempo:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTimeLeft()
  }, [])

  const features = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Cartas Mensuales",
      description: "Cada mes recibirás una carta especial que se desbloquea automáticamente.",
      color: "bg-blue-500",
      href: "/client/letter",
      stats: "∞ cartas"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Recuerdos",
      description: "Guarda y revive los momentos más importantes. Fotos, videos y audios.",
      color: "bg-teal-500",
      href: "/client/memories",
      stats: "∞ recuerdos"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Metas y Sueños",
      description: "Registra nuestras metas juntos y celebra cada logro alcanzado.",
      color: "bg-amber-500",
      href: "/client/goals",
      stats: "Progreso"
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "Música",
      description: "Nuestra banda sonora. Canciones que marcaron momentos especiales.",
      color: "bg-purple-500",
      href: "/client/music",
      stats: "Playlist"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">

      {/* Hero Section - Bienvenida */}
      <div className="min-h-[50vh] flex items-center justify-center px-4 relative">

        <div className="absolute top-10 left-5 opacity-20">
          <Heart className="w-6 h-6 text-blue-400" />
        </div>
        <div className="absolute bottom-10 right-5 opacity-20">
          <Sparkles className="w-5 h-5 text-blue-400" />
        </div>
        <div className="absolute top-1/3 right-10 opacity-10">
          <Star className="w-4 h-4 text-blue-500" />
        </div>
        <div className="absolute bottom-1/3 left-10 opacity-10">
          <Heart className="w-4 h-4 text-blue-500" />
        </div>

        <div className="max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-gray-100 shadow-sm">
            <Heart className="w-4 h-4 text-blue-500 fill-blue-500" />
            <span className="text-sm text-gray-600 font-medium">Always You</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {greeting},{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {userName}
            </span>
          </h1>

          <div className="flex justify-center mb-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          </div>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Bienvenido a tu espacio especial. Aquí encontrarás todas las cartas,
            recuerdos, metas y música que hemos creado para ti.
          </p>

        </div>
      </div>

      {/* Sección: Foto + Contador de tiempo */}
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">

          {/* Contador de tiempo - Mejorado */}
          <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              {/* Badge decorativo */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-1.5 rounded-full mb-5 shadow-md">
                <Clock className="w-3.5 h-3.5 text-white" />
                <span className="text-xs text-white font-medium tracking-wide">TIEMPO PARA VOLVER</span>
              </div>

              {/* Mensaje emotivo */}
              <div className="mb-5">
                <p className="text-base sm:text-lg font-medium text-gray-700 italic">
                  {loading ? 'Cargando...' : message}
                </p>
                <div className="flex justify-center gap-1 mt-2">
                  <div className="w-6 h-px bg-blue-300"></div>
                  <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                  <div className="w-6 h-px bg-blue-300"></div>
                </div>
              </div>

              {/* Contador */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-5">
                <div className="bg-white rounded-xl p-2 sm:p-3 shadow-md border border-gray-100">
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {timeLeft.months}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium uppercase tracking-wide">Meses</p>
                </div>
                <div className="bg-white rounded-xl p-2 sm:p-3 shadow-md border border-gray-100">
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {timeLeft.days}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium uppercase tracking-wide">Días</p>
                </div>
                <div className="bg-white rounded-xl p-2 sm:p-3 shadow-md border border-gray-100">
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {timeLeft.hours}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium uppercase tracking-wide">Horas</p>
                </div>
                <div className="bg-white rounded-xl p-2 sm:p-3 shadow-md border border-gray-100">
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {timeLeft.minutes}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium uppercase tracking-wide">Min</p>
                </div>
              </div>

              {/* Animación de latido */}
              <div className="flex justify-center items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse delay-300"></div>
                <span className="text-xs text-gray-400 mx-1">—</span>
                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-500"></div>
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse delay-700"></div>
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse delay-900"></div>
              </div>

              {/* Frase final */}
              <p className="text-[11px] text-gray-400 mt-2 flex items-center justify-center gap-1">
                <span>💙</span>
                <span>Cada día que pasa me acerca más a ti</span>
                <span>💙</span>
              </p>
            </div>
          </div>

          {/* Foto con frase superpuesta - Hover mejorado */}
          <div className="relative group rounded-2xl overflow-hidden shadow-lg bg-white/50 backdrop-blur-sm border border-gray-100">

            {/* Etiqueta flotante */}
            <div className="absolute top-3 left-3 z-10 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-xs text-white font-medium">💖 Momento especial</span>
            </div>

            {/* Imagen */}
            <img
              src="https://res.cloudinary.com/dbgj8dqup/image/upload/v1776465505/Picsart_26-04-17_17-30-35-869_qgmlhu.jpg"
              alt="Recuerdo especial"
              className="w-full h-auto max-h-96 object-contain object-center bg-gradient-to-br from-gray-100 to-blue-50/30 transition-all duration-500 group-hover:scale-105"
              style={{ maxHeight: '480px' }}
            />

            {/* Frase "Volveré" superpuesta - Mejorada */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {/* Líneas decorativas */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-10 h-px bg-gradient-to-r from-transparent to-pink-400"></div>
                  <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse" />
                  <div className="w-10 h-px bg-gradient-to-l from-transparent to-pink-400"></div>
                </div>

                {/* Texto principal */}
                <p className="text-white text-2xl md:text-3xl font-bold tracking-wider drop-shadow-lg">
                  Volveré
                </p>

                {/* Texto secundario */}
                <p className="text-white/90 text-sm mt-2 tracking-wide">
                  💙 Siempre, siempre tú 💙
                </p>

                {/* Línea inferior */}
                <div className="flex justify-center mt-3">
                  <div className="w-12 h-px bg-white/50"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sección: Características principales */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Título de sección */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-sm border border-gray-100">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span className="text-sm text-gray-600 font-medium">Para ti</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Un mundo de{" "}
            <span className="relative inline-block">
              emociones
              <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 100 4">
                <path d="M0,2 Q25,0 50,2 T100,2" stroke="#3B82F6" fill="none" strokeWidth="2" />
              </svg>
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <a
              key={index}
              href={feature.href}
              className="group relative block"
            >
              <div className="relative bg-white rounded-2xl p-6 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border border-gray-100 overflow-hidden cursor-pointer">
                <div className="absolute -bottom-4 -right-2 text-7xl font-black text-gray-100 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="relative mb-5">
                  <div className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white ${feature.color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <span className="text-[10px] font-semibold text-white bg-gray-400 px-2 py-0.5 rounded-full">
                      {feature.stats}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-blue-500 transition-all duration-300">
                    <span className="text-xs font-medium">Descubrir</span>
                    <div className="w-0 h-px bg-blue-500 group-hover:w-5 transition-all duration-300"></div>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-100 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full mb-4">
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
            <span className="text-xs text-gray-500">Always You</span>
          </div>
          <p className="text-sm text-gray-400 italic max-w-md mx-auto">
            "Porque aunque la distancia nos separe, siempre estaré contigo"
          </p>
          <p className="text-[10px] text-gray-300 mt-4">
            © {new Date().getFullYear()} · Hecho con amor para ti
          </p>
        </div>
      </footer>
    </div>
  )
}