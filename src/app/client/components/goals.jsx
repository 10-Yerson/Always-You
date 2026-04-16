"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg">
        Cargando metas 🎯...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        🎯 Nuestras Metas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const image = goal.media?.image;
          const video = goal.media?.video;

          return (
            <div
              key={goal._id}
              className="bg-white/70 backdrop-blur p-5 rounded-3xl shadow-lg hover:scale-105 transition-all duration-300"
            >
              {/* 🔥 STATUS */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-gray-500">
                  {new Date(goal.createdAt).toLocaleDateString()}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full
                  ${
                    goal.status === "completado"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {goal.status === "completado"
                    ? "✔ Cumplido"
                    : "⏳ Pendiente"}
                </span>
              </div>

              {/* 💖 TITULO */}
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {goal.title}
              </h2>

              {/* 📝 DESCRIPCIÓN */}
              <p className="text-sm text-gray-600 mb-3">
                {goal.description}
              </p>

              {/* 🖼️ IMAGEN */}
              {image && (
                <img
                  src={image}
                  className="rounded-xl w-full h-40 object-cover mb-3"
                />
              )}

              {/* 🎥 VIDEO */}
              {video && (
                <video controls className="w-full rounded-xl">
                  <source src={video} />
                </video>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}





