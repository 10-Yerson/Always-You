"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {

  const frases = [
    "Siempre eres tú 💖",
    "Aunque no lo veas, estoy aquí contigo 💌",
    "Nuestra historia apenas comienza ✨",
    "Cada mes me acerca más a ti 🌙",
    "Esto es solo nuestro capítulo 1 💕"
  ];

  const [frase, setFrase] = useState(frases[0]);

  const [timeLeft, setTimeLeft] = useState({
    months: 12,
    days: 0,
    hours: 0,
    minutes: 0
  });

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setFrase(frases[Math.floor(Math.random() * frases.length)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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
      }
    };

    fetchData();
  }, []);

  const isNotStarted = status === "not_started";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-pink-900 to-purple-900">

      <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl w-[360px] text-white">

        {/* 💖 TITULO */}
        <h1 className="text-2xl font-bold mb-1">
          💖 Always You
        </h1>

        {/* ⏳ MENSAJE BLOQUEADO */}
        {isNotStarted && (
          <div className="text-center py-10">

            <p className="text-yellow-300 text-sm animate-pulse mb-2">
              ⏳ Aún no comienza nuestra historia...
            </p>

            <p className="text-gray-400 text-xs">
              Este contenido se desbloqueará pronto 💌
            </p>

          </div>
        )}

        {/* 💖 CONTENIDO NORMAL */}
        {!isNotStarted && (
          <>
            {/* 💌 MENSAJE BACKEND */}
            <p className="text-sm text-pink-300 italic mb-3">
              {message}
            </p>

            {/* 💌 FRASE */}
            <p className="text-sm text-gray-200 mb-4 italic">
              {frase}
            </p>

            {/* ⏳ CONTADOR (SOLO SI YA INICIÓ) */}
            <div className="grid grid-cols-2 gap-2 mb-4">

              <div className="bg-white/10 p-2 rounded-lg text-center">
                <p className="text-lg font-bold">{timeLeft.months}</p>
                <span className="text-xs text-gray-300">Meses</span>
              </div>

              <div className="bg-white/10 p-2 rounded-lg text-center">
                <p className="text-lg font-bold">{timeLeft.days}</p>
                <span className="text-xs text-gray-300">Días</span>
              </div>

              <div className="bg-white/10 p-2 rounded-lg text-center">
                <p className="text-lg font-bold">{timeLeft.hours}</p>
                <span className="text-xs text-gray-300">Horas</span>
              </div>

              <div className="bg-white/10 p-2 rounded-lg text-center">
                <p className="text-lg font-bold">{timeLeft.minutes}</p>
                <span className="text-xs text-gray-300">Min</span>
              </div>

            </div>

            {/* 💎 PROGRESS BAR */}
            <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs text-gray-400 mb-4">
              Historia completada: {progress}%
            </p>
          </>
        )}

        {/* 🔒 FOOTER */}
        <div className="text-center text-xs text-gray-400 border-t border-white/10 pt-3">
          {isNotStarted
            ? "Próximamente... 💖"
            : "Capítulo en progreso ⏳"}
        </div>

      </div>
    </div>
  );
}