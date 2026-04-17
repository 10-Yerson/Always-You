'use client'

import { useEffect, useState } from 'react'
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
  Headphones
} from 'lucide-react'

export default function HomePage() {
  const [greeting, setGreeting] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Buenos días')
    else if (hour < 18) setGreeting('Buenas tardes')
    else setGreeting('Buenas noches')

    setUserName('Yuyu')
  }, [])

  const features = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Cartas Mensuales",
      description: "Cada mes recibirás una carta especial que se desbloquea automáticamente.",
      color: "bg-blue-500",
      href: "/client/letter",
      stats: "12 cartas"
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

        {/* Elementos decorativos */}
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

        {/* Contenido principal */}
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-gray-100 shadow-sm">
            <Heart className="w-4 h-4 text-blue-500 fill-blue-500" />
            <span className="text-sm text-gray-600 font-medium">Always You</span>
          </div>

          {/* Título de bienvenida */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {greeting},{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {userName}
            </span>
          </h1>

          {/* Línea decorativa */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          </div>

          {/* Mensaje especial */}
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Bienvenido a tu espacio especial. Aquí encontrarás todas las cartas,
            recuerdos, metas y música que hemos creado para ti.
          </p>

        </div>
      </div>

      {/* Sección: Características principales */}
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Sección: Características principales */}
        <div className="max-w-7xl mx-auto px-4 py-12">

          {/* Título de sección */}
          <div className="mb-12">
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
                {/* Tarjeta con hover */}
                <div className="relative bg-white rounded-2xl p-6 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border border-gray-100 overflow-hidden cursor-pointer">

                  {/* Número decorativo de fondo */}
                  <div className="absolute -bottom-4 -right-2 text-7xl font-black text-gray-100 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Icono */}
                  <div className="relative mb-5">
                    <div className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white ${feature.color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                  </div>

                  {/* Contenido */}
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

                    {/* Flecha animada */}
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