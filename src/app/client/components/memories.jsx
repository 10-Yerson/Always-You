"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";

export default function MemoriesPage() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMemories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/memories");
      setMemories(data);
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar los recuerdos 💖");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMemories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg">
        Cargando recuerdos 💖...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-rose-50 to-purple-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        ✨ Nuestros Recuerdos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {memories.map((memory) => {
          
          // 🔥 detectar tipo automáticamente
          const file =
            memory.image || memory.video || memory.music || memory.audio;

          const isImage = file?.match(/\.(jpeg|jpg|png|webp)$/i);
          const isVideo = file?.match(/\.(mp4|webm|ogg)$/i);
          const isAudio = file?.match(/\.(mp3|wav|mpeg)$/i);

          return (
            <div
              key={memory._id}
              className="bg-white/70 backdrop-blur p-5 rounded-3xl shadow-lg hover:scale-105 transition-all"
            >
              {/* 📅 fecha */}
              <p className="text-xs text-gray-500 mb-2">
                {new Date(memory.date).toLocaleDateString()}
              </p>

              {/* 💖 texto */}
              <p className="text-gray-700 mb-3 font-medium">
                {memory.text}
              </p>

              {/* 🖼️ IMAGEN */}
              {isImage && (
                <img
                  src={file}
                  className="rounded-xl w-full h-48 object-cover"
                />
              )}

              {/* 🎥 VIDEO */}
              {isVideo && (
                <video controls className="w-full rounded-xl">
                  <source src={file} />
                </video>
              )}

              {/* 🎧 AUDIO */}
              {isAudio && (
                <audio controls className="w-full">
                  <source src={file} />
                </audio>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}