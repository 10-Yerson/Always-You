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
  const enProgreso = metas.filter(m => !m.completed && m.unlocked).length;
  const bloqueadas = metas.filter(m => !m.unlocked).length;

  return (
    <section id="metas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-blue-500" />
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900">
              Nuestras Metas
            </h2>
            <Target className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-4 leading-relaxed">
            Los sueños que soñamos y los objetivos que construiremos juntos.
            <br /><span className="text-blue-500 font-medium">Contigo, todo es posible.</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {[
            { val: completadas, label: 'Metas Completadas' },
            { val: enProgreso, label: 'En Progreso' },
            { val: bloqueadas, label: 'Por Desbloquear' },
          ].map(({ val, label }) => (
            <div key={label} className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center hover:shadow-md hover:shadow-blue-200 transition-all">
              <p className="text-4xl font-serif font-bold text-blue-500 mb-2">{val}</p>
              <p className="text-gray-500 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Lista de Metas */}
        <div className="space-y-5">
          {metas.map((meta) => (
            <div
              key={meta.id}
              className={`rounded-2xl border-2 p-8 transition-all duration-300 ${
                meta.completed
                  ? 'bg-blue-50 border-blue-200'
                  : meta.unlocked
                  ? 'bg-white border-gray-200 hover:border-blue-200 hover:shadow-md hover:shadow-blue-200'
                  : 'bg-gray-50 border-gray-200 opacity-70'
              }`}
            >
              <div className="flex items-start gap-6">
                <div className="text-5xl flex-shrink-0 pt-1">{meta.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-3">
                      {meta.title}
                      {meta.completed && <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0" />}
                      {!meta.unlocked && <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                    </h3>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">{meta.target}</p>
                      <p className="text-2xl font-serif font-bold text-blue-500">{meta.progress}%</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed mb-5">{meta.description}</p>

                  {!meta.unlocked ? (
                    <p className="text-sm text-gray-400 italic flex items-center gap-2">
                      <Lock className="w-4 h-4" /> Se desbloqueará en {meta.target}
                    </p>
                  ) : (
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-gray-500 font-medium">Progreso</span>
                        <span className="text-xs font-bold text-blue-500">{meta.progress}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-700 ease-out rounded-full"
                          style={{ width: `${meta.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Final */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 border border-blue-100 p-12 rounded-2xl hover:shadow-md hover:shadow-blue-200 transition-all">
            <Sparkles className="w-8 h-8 text-blue-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              Cada Meta es un Nuevo Capítulo
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              No importa la distancia ni el tiempo. Hay sueños que esperan pacientes, 
              y hay personas que valen la espera. Cuando lleguemos, lo sabremos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}