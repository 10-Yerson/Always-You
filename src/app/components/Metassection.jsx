'use client';
import { Sparkles, Target, CheckCircle2, Lock } from 'lucide-react';

export default function MetasSection() {
  const metas = [
    {
      id: 1, title: 'Viajar juntos por el mundo', icon: '✈️', progress: 15,
      completed: false, unlocked: true, target: 'Mes 4',
      description: 'Conocer nuevos lugares, culturas y paisajes de la mano. Este sueño ya está en camino.'
    },
    {
      id: 2, title: 'Decirte "Te Amo" de mil formas', icon: '💙', progress: 100,
      completed: true, unlocked: true, target: 'Mes 1',
      description: 'En cada idioma, en cada detalle, en cada carta. Que siempre lo sientas.'
    },
    {
      id: 3, title: 'Crear recuerdos en cada estación', icon: '🌸', progress: 50,
      completed: false, unlocked: true, target: 'Mes 9',
      description: 'Primavera, verano, otoño e invierno. Contigo en cada una.'
    },
    {
      id: 4, title: 'Nuestro primer hogar juntos', icon: '🏡', progress: 0,
      completed: false, unlocked: false, target: 'Mes 10',
      description: 'Un espacio que sea nuestro, donde quepan todos nuestros sueños.'
    },
    {
      id: 5, title: 'Ser tu apoyo en cada sueño', icon: '⭐', progress: 60,
      completed: false, unlocked: true, target: 'Mes 5',
      description: 'Estar ahí en cada paso hacia lo que deseas alcanzar.'
    },
    {
      id: 6, title: 'Escribirte 12 cartas', icon: '💌', progress: 15,
      completed: false, unlocked: true, target: 'Mes 12',
      description: 'Una carta por cada mes, para que sepas que siempre fui tuyo.'
    }
  ];

  const completadas = metas.filter(m => m.completed).length;
  const enProgreso  = metas.filter(m => !m.completed && m.unlocked).length;
  const bloqueadas  = metas.filter(m => !m.unlocked).length;

  return (
    <section id="metas" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5">

        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8 mb-8">

          {/* Izquierda — eyebrow + stats pills */}
          <div className="flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-end gap-3 sm:pb-1">
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

          {/* Derecha — título + subtítulo */}
          <div className="text-left sm:text-right">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold leading-[1.05] mb-3">
              <span className="text-gray-900">Nuestras</span>
              <br />
              <em className="text-blue-600 not-italic font-serif">metas</em>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs sm:ml-auto">
              Los sueños que soñamos y los objetivos que construiremos juntos.
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-8" />

        {/* ── LISTA DE METAS ── */}
        <div className="space-y-3">
          {metas.map((meta) => (
            <div
              key={meta.id}
              className={
                "rounded-2xl border p-5 transition-all duration-300 " +
                (meta.completed
                  ? "bg-blue-50 border-blue-100"
                  : meta.unlocked
                  ? "bg-white border-gray-100 hover:border-blue-200"
                  : "bg-gray-50 border-gray-100 opacity-60")
              }
            >
              <div className="flex items-start gap-4">

                {/* Icono */}
                <div className="text-2xl flex-shrink-0 pt-0.5">{meta.icon}</div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">

                  {/* Fila superior */}
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-serif font-bold text-gray-900">
                        {meta.title}
                      </h3>
                      {meta.completed && (
                        <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      )}
                      {!meta.unlocked && (
                        <Lock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      )}
                    </div>

                    {/* Target + porcentaje */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                        {meta.target}
                      </p>
                      <p className="text-sm font-bold text-blue-600">{meta.progress}%</p>
                    </div>
                  </div>

                  {/* Descripción */}
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">
                    {meta.description}
                  </p>

                  {/* Barra de progreso o bloqueado */}
                  {!meta.unlocked ? (
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400 italic">
                        Se desbloqueará en {meta.target}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                        <div
                          className={
                            "h-full rounded-full transition-all duration-700 ease-out " +
                            (meta.completed ? "bg-blue-400" : "bg-blue-500")
                          }
                          style={{ width: meta.progress + "%" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}