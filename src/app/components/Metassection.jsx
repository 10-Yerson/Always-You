'use client';
import { useState } from 'react';
import { CheckCircle2, Lock, Play, X } from 'lucide-react';

export default function MetasSection() {
  const [selectedMeta, setSelectedMeta] = useState(null);

  const metas = [
    {
      id: 1, title: 'Viajar juntos por el mundo', icon: '✈️', progress: 15,
      completed: false, unlocked: true, target: 'Mes 4',
      description: 'Conocer nuevos lugares, culturas y paisajes de la mano. Este sueño ya está en camino.',
      mediaType: 'image',
      media: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
    },
    {
      id: 2, title: 'Decirte "Te Amo" de mil formas', icon: '💙', progress: 100,
      completed: true, unlocked: true, target: 'Mes 1',
      description: 'En cada idioma, en cada detalle, en cada carta. Que siempre lo sientas.',
      mediaType: 'video',
      media: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      mediaThumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03bf1ca47d?w=400&h=250&fit=crop',
    },
    {
      id: 3, title: 'Crear recuerdos en cada estación', icon: '🌸', progress: 50,
      completed: false, unlocked: true, target: 'Mes 9',
      description: 'Primavera, verano, otoño e invierno. Contigo en cada una.',
      mediaType: 'image',
      media: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=250&fit=crop',
    },
    {
      id: 4, title: 'Nuestro primer hogar juntos', icon: '🏡', progress: 0,
      completed: false, unlocked: false, target: 'Mes 10',
      description: 'Un espacio que sea nuestro, donde quepan todos nuestros sueños.',
      mediaType: null,
      media: null,
    },
    {
      id: 5, title: 'Ser tu apoyo en cada sueño', icon: '⭐', progress: 60,
      completed: false, unlocked: true, target: 'Mes 5',
      description: 'Estar ahí en cada paso hacia lo que deseas alcanzar.',
      mediaType: 'image',
      media: 'https://images.unsplash.com/photo-1516567867245-ad8a36ae3d91?w=400&h=250&fit=crop',
    },
    {
      id: 6, title: 'Escribirte 12 cartas', icon: '💌', progress: 15,
      completed: false, unlocked: true, target: 'Mes 12',
      description: 'Una carta por cada mes, para que sepas que siempre fui tuyo.',
      mediaType: 'video',
      media: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      mediaThumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=250&fit=crop',
    },
  ];

  const completadas = metas.filter(m => m.completed).length;
  const enProgreso = metas.filter(m => !m.completed && m.unlocked).length;

  return (
    <section id="metas" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5">

        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8 mb-8">

          <div className="text-left">
            <h2 className="text-5xl lg:text-6xl font-serif font-bold leading-[1.05] mb-3">
              <span className="text-gray-900">Nuestras</span>
              <br />
              <em className="text-blue-600 not-italic font-serif">metas</em>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Los sueños que soñamos y los objetivos que construiremos juntos.
            </p>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-end gap-3 sm:pb-1">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">
                Sueños compartidos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-3 py-1 text-xs text-gray-500">
                <span className="font-semibold text-gray-900">{completadas}</span> completadas
              </span>
              <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-3 py-1 text-xs text-gray-500">
                <span className="font-semibold text-gray-900">{enProgreso}</span> en progreso
              </span>
            </div>
          </div>

        </div>

        <div className="h-px bg-gray-100 mb-8" />

        {/* ── GRID DE CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {metas.map((meta) => {
            const isCompleted = meta.completed;
            const isLocked = !meta.unlocked;

            return (
              <div
                key={meta.id}
                className={
                  "group relative rounded-2xl border overflow-hidden transition-all duration-300 " +
                  (isLocked
                    ? "bg-gray-50 border-gray-100 opacity-60"
                    : isCompleted
                      ? "bg-white border-blue-100 hover:border-blue-300"
                      : "bg-white border-gray-100 hover:border-blue-200")
                }
              >
                {/* ── MEDIA (imagen o video) ── */}
                {meta.media && !isLocked ? (
                  <div
                    className="relative w-full overflow-hidden bg-gray-100 cursor-pointer"
                    style={{ height: '160px' }}
                    onClick={() => meta.mediaType === 'video' && setSelectedMeta(meta)}
                  >
                    <img
                      src={meta.mediaType === 'video' ? meta.mediaThumbnail : meta.media}
                      alt={meta.title}
                      className={
                        "w-full h-full object-cover transition-transform duration-500 " +
                        (meta.mediaType === 'video' ? "group-hover:scale-105" : "group-hover:scale-105")
                      }
                    />

                    {/* Overlay oscuro en hover para video */}
                    {meta.mediaType === 'video' && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-11 h-11 bg-blue-500 rounded-full flex items-center justify-center">
                          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Badge tipo media */}
                    <div className="absolute top-2.5 left-2.5 bg-white/90 border border-gray-200 rounded-full px-2.5 py-1 flex items-center gap-1">
                      <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
                        {meta.mediaType === 'video' ? 'video' : 'foto'}
                      </span>
                    </div>

                    {/* Barra de progreso sobre la imagen — solo si tiene media */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-100">
                      <div
                        className={"h-full transition-all duration-700 " + (isCompleted ? "bg-blue-400" : "bg-blue-500")}
                        style={{ width: meta.progress + "%" }}
                      />
                    </div>
                  </div>
                ) : !meta.media && !isLocked ? (
                  /* Sin media: barra de acento superior */
                  <div
                    className="h-1 w-full"
                    style={{
                      background: `linear-gradient(to right, #378ADD ${meta.progress}%, #E6F1FB ${meta.progress}%)`
                    }}
                  />
                ) : (
                  /* Bloqueada: barra gris */
                  <div className="h-1 w-full bg-gray-200" />
                )}

                {/* ── BODY ── */}
                <div className="p-5">

                  {/* Fila top: icono + target + estado */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-2xl leading-none">{meta.icon}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1">
                        {meta.target}
                      </span>
                      {isCompleted && (
                        <div className="w-6 h-6 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                        </div>
                      )}
                      {isLocked && (
                        <div className="w-6 h-6 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center">
                          <Lock className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="text-base font-serif font-bold text-gray-900 leading-snug mb-2">
                    {meta.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    {meta.description}
                  </p>

                  {/* Footer */}
                  {isLocked ? (
                    <div className="flex items-center gap-1.5 pt-3 border-t border-gray-100">
                      <Lock className="w-3 h-3 text-gray-300" />
                      <span className="text-xs text-gray-400 italic">
                        Se desbloqueará en {meta.target}
                      </span>
                    </div>
                  ) : (
                    <div className="pt-3 border-t border-gray-50">
                      <div className="flex justify-between items-baseline mb-1.5">
                        <span className="text-[11px] text-gray-400">
                          {isCompleted ? "Completada" : "Progreso"}
                        </span>
                        <span className={"text-xs font-bold " + (isCompleted ? "text-blue-500" : "text-gray-700")}>
                          {meta.progress}%
                        </span>
                      </div>
                      {/* Solo mostrar barra si no hay media (ya se muestra arriba) */}
                      {!meta.media && (
                        <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                          <div
                            className={"h-full rounded-full transition-all duration-700 " +
                              (isCompleted ? "bg-blue-400" : "bg-blue-500")}
                            style={{ width: meta.progress + "%" }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MODAL VIDEO ── */}
      {selectedMeta && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMeta(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMeta(null)}
              className="absolute top-3 right-3 z-10 bg-white border border-gray-100 rounded-full p-1.5 hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <div className="aspect-video bg-black overflow-hidden rounded-t-2xl">
              <iframe
                width="100%" height="100%"
                src={selectedMeta.media}
                title={selectedMeta.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">
                  {selectedMeta.target}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                {selectedMeta.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {selectedMeta.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}