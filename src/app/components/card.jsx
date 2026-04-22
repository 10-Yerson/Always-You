'use client'

import { useState, useEffect } from 'react';
import { Heart, Sparkles, RefreshCw, Star, Gift, Send } from 'lucide-react';

const mensajes = [
  { text: "Eres la persona más especial que he conocido 💙", emoji: "💙", color: "from-blue-500 to-indigo-600" },
  { text: "Cada día me haces más feliz ✨", emoji: "✨", color: "from-amber-500 to-orange-600" },
  { text: "Tu sonrisa ilumina mis días ☀️", emoji: "☀️", color: "from-yellow-500 to-amber-600" },
  { text: "Gracias por existir en mi vida 💖", emoji: "💖", color: "from-pink-500 to-rose-600" },
  { text: "Eres mi razón para sonreír 😊", emoji: "😊", color: "from-emerald-500 to-teal-600" },
  { text: "Te llevo conmigo a donde vaya 💫", emoji: "💫", color: "from-purple-500 to-indigo-600" },
  { text: "No hay distancia que pueda separarnos 🌍", emoji: "🌍", color: "from-cyan-500 to-blue-600" },
  { text: "Siempre, siempre serás tú 💙", emoji: "💙", color: "from-blue-600 to-indigo-600" },
];

export default function SurpriseWheel() {
  const [mensaje, setMensaje] = useState(mensajes[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [contador, setContador] = useState(0);

  const cambiarMensaje = () => {
    setIsSpinning(true);
    setContador(contador + 1);
    
    setTimeout(() => {
      const nuevoMensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
      setMensaje(nuevoMensaje);
      setIsSpinning(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }, 400);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-20 left-10 opacity-20">
        <Heart className="w-16 h-16 text-blue-400" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <Star className="w-12 h-12 text-blue-400" />
      </div>
      <div className="absolute top-1/2 left-1/4 opacity-10">
        <Sparkles className="w-8 h-8 text-blue-500" />
      </div>
      
      {/* Confeti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                width: '6px',
                height: '6px',
                top: '-10px'
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        
        {/* Título mejorado */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-5 py-2 rounded-full mb-4 shadow-sm">
            <Gift className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Mensaje del día</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
            Una palabra para{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ti
            </span>
          </h2>
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-400"></div>
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-blue-400"></div>
          </div>
          <p className="text-gray-500 mt-3">Un mensaje especial que cambia cada vez que lo necesites</p>
        </div>

        {/* Ruleta de mensajes mejorada */}
        <div className="max-w-xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 text-center relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            
            {/* Efecto de brillo */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            
            {/* Contador de mensajes */}
            <div className="absolute top-4 right-4 bg-gray-100 rounded-full px-2 py-0.5">
              <span className="text-[9px] text-gray-500 font-medium">#{contador + 1}</span>
            </div>

            {/* Icono decorativo animado */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className={`relative w-20 h-20 bg-gradient-to-br ${mensaje.color} rounded-full flex items-center justify-center shadow-lg shadow-blue-200 transition-all duration-500 ${isSpinning ? 'animate-spin-slow' : ''}`}>
                  <span className="text-3xl">{mensaje.emoji}</span>
                </div>
              </div>
            </div>

            {/* Mensaje */}
            <div className={`transition-all duration-400 ${isSpinning ? 'opacity-0 scale-95 rotate-6' : 'opacity-100 scale-100 rotate-0'}`}>
              <p className="text-xl sm:text-2xl font-serif text-gray-800 italic leading-relaxed">
                "{mensaje.text}"
              </p>
            </div>

            {/* Línea decorativa */}
            <div className="flex justify-center gap-1.5 my-6">
              <div className="w-1 h-1 bg-blue-300 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-150"></div>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse delay-300"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-450"></div>
              <div className="w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-600"></div>
            </div>

            {/* Botón mejorado */}
            <button
              onClick={cambiarMensaje}
              disabled={isSpinning}
              className={`group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full transition-all shadow-md shadow-blue-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${isSpinning ? 'animate-pulse' : ''}`}
            >
              {isSpinning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Buscando mensaje...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Nuevo mensaje</span>
                  <Sparkles className="w-3 h-3 opacity-70" />
                </>
              )}
            </button>

            {/* Contador de mensajes vistos */}
            <div className="mt-4 flex justify-center gap-1">
              {mensajes.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === contador % mensajes.length
                      ? 'w-4 bg-blue-500'
                      : 'w-1.5 bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Frase final */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <Heart className="w-3 h-3 text-pink-500 fill-pink-500 animate-pulse" />
              <span className="text-xs text-gray-500">Cada mensaje es único, como tú</span>
              <Heart className="w-3 h-3 text-pink-500 fill-pink-500 animate-pulse delay-300" />
            </div>
          </div>
        </div>
      </div>

      {/* CSS adicional */}
      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 2s linear forwards;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 0.6s ease-in-out;
        }
      `}</style>
    </section>
  );
}