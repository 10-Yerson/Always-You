"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";

export default function LettersPage() {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <div className="flex justify-center items-center h-[60vh] text-lg">
        Cargando cartas 💌...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        💖 Tus Cartas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {letters.map((letter) => {
          const isLocked = letter.status === "bloqueada";

          return (
            <div
              key={letter._id}
              className={`p-5 rounded-3xl shadow-lg transition-all duration-300
              ${
                isLocked
                  ? "bg-gray-300/60 backdrop-blur opacity-60"
                  : "bg-white/70 backdrop-blur hover:scale-105 hover:shadow-2xl"
              }`}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-gray-700">
                  Mes {letter.month}
                </span>

                {isLocked ? (
                  <span className="text-xs text-gray-500">🔒</span>
                ) : letter.status === "disponible" ? (
                  <span className="text-xs text-green-500">💌 Nuevo</span>
                ) : (
                  <span className="text-xs text-blue-500">👁️ Vista</span>
                )}
              </div>

              {/* CONTENIDO */}
              {isLocked ? (
                <div className="text-center py-10 text-gray-500">
                  <p className="text-lg">🔒</p>
                  <p className="text-sm mt-2">
                    Se desbloquea pronto...
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {letter.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3">
                    {letter.message}
                  </p>

                  {/* 🖼️ IMAGEN */}
                  {letter.imageUrl && (
                    <img
                      src={letter.imageUrl}
                      alt="img"
                      className="rounded-xl w-full h-40 object-cover mb-3"
                    />
                  )}

                  {/* 🎥 VIDEO */}
                  {letter.videoUrl && (
                    <video
                      controls
                      className="w-full rounded-xl mb-3"
                    >
                      <source src={letter.videoUrl} />
                    </video>
                  )}

                  {/* 🎧 AUDIO */}
                  {letter.audioUrl && (
                    <audio controls className="w-full">
                      <source src={letter.audioUrl} />
                    </audio>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}