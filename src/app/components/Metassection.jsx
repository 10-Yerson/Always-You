'use client';
import { Sparkles, Target, CheckCircle2, Lock } from 'lucide-react';

export default function MetasSection() {
  // Datos de ejemplo - en producción vendría del backend
  const metas = [
    {
      id: 1,
      title: 'Viajar a París',
      description: 'Juntos en la ciudad del amor, bajo la Torre Eiffel, de la mano.',
      icon: '✈️',
      progress: 75,
      completed: false,
      unlocked: true,
      target: 'Mes 6'
    },
    {
      id: 2,
      title: 'Decirte "Te Amo" de mil formas',
      description: 'En cada idioma, en cada momento, en cada acción. Que lo sientas siempre.',
      icon: '💕',
      progress: 100,
      completed: true,
      unlocked: true,
      target: 'Mes 1'
    },
    {
      id: 3,
      title: 'Crear recuerdos en cada estación',
      description: 'Primavera, verano, otoño e invierno. Contigo en cada una.',
      icon: '🌸',
      progress: 50,
      completed: false,
      unlocked: true,
      target: 'Mes 9'
    },
    {
      id: 4,
      title: 'Nuestro primer hogar juntos',
      description: 'Un espacio que sea nuestro, donde quepan todos nuestros sueños.',
      icon: '🏡',
      progress: 0,
      completed: false,
      unlocked: false,
      target: 'Mes 10'
    },
    {
      id: 5,
      title: 'Cumplir tus sueños',
      description: 'Ser tu apoyo en cada paso hacia lo que deseas alcanzar.',
      icon: '⭐',
      progress: 60,
      completed: false,
      unlocked: true,
      target: 'Mes 5'
    },
    {
      id: 6,
      title: 'Renovar promesas',
      description: 'Un viaje especial para reafirmar que siempre serás tú.',
      icon: '💍',
      progress: 15,
      completed: false,
      unlocked: true,
      target: 'Mes 12'
    }
  ];

  return (
    <section id="metas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-purple-500" />
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900">
              Nuestras Metas
            </h2>
            <Target className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Los sueños que compartimos y los objetivos que construiremos juntos.
            <br/><span className="text-purple-500 font-medium">Contigo, todo es posible.</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 text-center">
            <p className="text-4xl font-serif font-bold text-purple-600 mb-2">
              {metas.filter(m => m.completed).length}
            </p>
            <p className="text-gray-600 font-medium">Metas Completadas</p>
          </div>
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl border border-rose-100 text-center">
            <p className="text-4xl font-serif font-bold text-rose-600 mb-2">
              {metas.filter(m => !m.completed && m.unlocked).length}
            </p>
            <p className="text-gray-600 font-medium">En Progreso</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 text-center">
            <p className="text-4xl font-serif font-bold text-indigo-600 mb-2">
              {metas.filter(m => !m.unlocked).length}
            </p>
            <p className="text-gray-600 font-medium">Por Desbloquear</p>
          </div>
        </div>

        {/* Grid de Metas */}
        <div className="space-y-6">
          {metas.map((meta) => (
            <div
              key={meta.id}
              className={`group rounded-2xl border-2 p-8 transition-all duration-300 ${
                meta.completed
                  ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
                  : meta.unlocked
                  ? 'bg-white border-gray-200 hover:border-rose-300 hover:shadow-lg'
                  : 'bg-gray-50 border-gray-200 opacity-75'
              }`}
            >
              <div className="flex items-start gap-6">
                {/* Ícono */}
                <div className="text-5xl flex-shrink-0 pt-1">{meta.icon}</div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-3">
                        {meta.title}
                        {meta.completed && (
                          <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0" />
                        )}
                        {!meta.unlocked && (
                          <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {meta.description}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">
                        {meta.target}
                      </p>
                      <p className="text-2xl font-serif font-bold text-rose-500">
                        {meta.progress}%
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {!meta.unlocked ? (
                    <div className="mt-4 text-sm text-gray-500 italic flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Se desbloqueará en {meta.target}
                    </div>
                  ) : (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-600">Progreso</span>
                        <span className="text-xs font-bold text-rose-500">{meta.progress}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-700 ease-out ${
                            meta.completed
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                              : 'bg-gradient-to-r from-rose-400 to-pink-500'
                          }`}
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

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 p-12 rounded-2xl border border-purple-200">
            <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Cada Meta es un Nuevo Capítulo
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Contigo quiero alcanzar cada sueño. Porque nuestro amor no es solo un sentimiento, 
              es una construcción de momentos hermosos, metas cumplidas y un futuro brillante juntos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}