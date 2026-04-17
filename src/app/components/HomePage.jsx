'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { Heart, Sparkles } from 'lucide-react';

export default function HomePage() {
  const frases = [
    "Siempre eres tú 💖",
    "Aunque no lo veas, estoy aquí contigo 💌",
    "Nuestra historia apenas comienza ✨",
    "Cada mes me acerca más a ti 🌙",
    "Esto es solo nuestro capítulo 1 💕",
    "Te amo más cada día que pasa 🌹",
    "Contigo quiero todo lo hermoso de la vida 💫"
  ];

  const [frase, setFrase] = useState(frases[0]);
  const [fraseIndex, setFraseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    months: 12,
    days: 0,
    hours: 0,
    minutes: 0
  });

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("loading");

  // Cambiar frases cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (fraseIndex + 1) % frases.length;
      setFraseIndex(newIndex);
      setFrase(frases[newIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [fraseIndex, frases]);

  // Fetch data del backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/letter/public-status"
        );

        setTimeLeft(res.data.timeLeft);
        setProgress(res.data.progress || 0);
        setMessage(res.data.message);
        setStatus(res.data.status);

      } catch (error) {
        console.error(error);
        // Datos por defecto si falla la petición
        setStatus("in_progress");
        setMessage("Cada mes es una parte de mí llegando a ti 💌");
      }
    };

    fetchData();
  }, []);

  const isNotStarted = status === "not_started";
  const isFinished = status === "finished";

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Estado: NO INICIADO */}
        {isNotStarted && (
          <div className="text-center py-16 animate-fade-in">
            <div className="mb-8 flex justify-center">
              <Sparkles className="w-12 h-12 text-slate-500 animate-pulse" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
              Preparando algo especial...
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              Dentro de poco comenzará nuestra historia. <br />
              <span className="text-slate-600 font-medium">Cada momento contigo será un capítulo.</span>
            </p>

            {/* Countdown para inicio */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-xl border border-slate-300 hover:shadow-lg transition-shadow">
                <p className="text-3xl font-serif font-bold text-slate-600">{timeLeft.months}</p>
                <span className="text-xs text-gray-500 uppercase tracking-widest">Meses</span>
              </div>
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-xl border border-slate-300 hover:shadow-lg transition-shadow">
                <p className="text-3xl font-serif font-bold text-slate-600">{timeLeft.days}</p>
                <span className="text-xs text-gray-500 uppercase tracking-widest">Días</span>
              </div>
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-xl border border-slate-300 hover:shadow-lg transition-shadow">
                <p className="text-3xl font-serif font-bold text-slate-600">{timeLeft.hours}</p>
                <span className="text-xs text-gray-500 uppercase tracking-widest">Horas</span>
              </div>
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-xl border border-slate-300 hover:shadow-lg transition-shadow">
                <p className="text-3xl font-serif font-bold text-slate-600">{timeLeft.minutes}</p>
                <span className="text-xs text-gray-500 uppercase tracking-widest">Min</span>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>Estoy preparando {message}</p>
            </div>
          </div>
        )}

        {/* Estado: EN PROGRESO o TERMINADO */}
        {!isNotStarted && (
          <div className="space-y-12 animate-fade-in">

            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="mb-6 flex justify-center">
                <Heart className="w-10 h-10 text-slate-500 animate-pulse" />
              </div>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-4">
                Always You
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Nuestros 12 meses de momentos especiales, cartas de amor y recuerdos que viviremos juntos.
              </p>
            </div>

            {/* Main Grid: Countdown + Frase */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">

              {/* IZQUIERDA: Countdown */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-4">Nuestra Cuenta Regresiva</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="group">
                      <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-8 rounded-2xl border border-slate-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <p className="text-5xl font-serif font-bold text-slate-600 text-center mb-2">{timeLeft.months}</p>
                        <span className="block text-center text-sm font-medium text-gray-600 uppercase tracking-widest">Meses</span>
                      </div>
                    </div>
                    <div className="group">
                      <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-8 rounded-2xl border border-slate-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <p className="text-5xl font-serif font-bold text-slate-600 text-center mb-2">{timeLeft.days}</p>
                        <span className="block text-center text-sm font-medium text-gray-600 uppercase tracking-widest">Días</span>
                      </div>
                    </div>
                    <div className="group">
                      <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-8 rounded-2xl border border-slate-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <p className="text-5xl font-serif font-bold text-slate-600 text-center mb-2">{timeLeft.hours}</p>
                        <span className="block text-center text-sm font-medium text-gray-600 uppercase tracking-widest">Horas</span>
                      </div>
                    </div>
                    <div className="group">
                      <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-8 rounded-2xl border border-slate-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <p className="text-5xl font-serif font-bold text-slate-600 text-center mb-2">{timeLeft.minutes}</p>
                        <span className="block text-center text-sm font-medium text-gray-600 uppercase tracking-widest">Minutos</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">Progreso de nuestra historia</p>
                    <p className="text-sm font-bold text-slate-600">{progress}%</p>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-slate-500 to-slate-600 transition-all duration-1000 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {!isFinished && (
                    <p className="text-xs text-gray-500">
                      {12 - timeLeft.months} de 12 cartas desbloqueadas
                    </p>
                  )}
                </div>
              </div>

              {/* DERECHA: Frase + Mensaje */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 p-12 rounded-2xl border border-slate-300 min-h-80 flex flex-col justify-center">
                  {/* Frase animada */}
                  <div className="space-y-6 text-center">
                    <p className="text-3xl lg:text-4xl font-serif italic text-gray-800 leading-relaxed min-h-32 flex items-center justify-center">
                      <span key={fraseIndex} className="animate-fade-in">
                        {frase}
                      </span>
                    </p>

                    {/* Divider */}
                    <div className="flex items-center gap-3 justify-center">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                      <Heart className="w-5 h-5 text-slate-500" />
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>

                    {/* Mensaje del backend */}
                    <p className="text-lg text-gray-700 font-light leading-relaxed">
                      {message}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                {isFinished ? (
                  <div className="text-center p-4 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl border border-slate-300">
                    <p className="text-sm font-medium text-slate-900">✨ Historia Completada ✨</p>
                  </div>
                ) : (
                  <div className="text-center p-4 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl border border-slate-300">
                    <p className="text-sm font-medium text-slate-900">💖 Capítulo en Progreso</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}