'use client';
import { Heart, Mail, Calendar, MapPin, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-8 relative overflow-hidden">
      {/* Glow decorativo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">Always You</h3>
                <p className="text-xs text-gray-400">Nuestros Momentos</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Una plataforma diseñada para preservar y compartir los momentos más especiales.
              Porque cada instante contigo merece ser recordado.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Heart className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>Hecho con amor para alguien especial</span>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="font-serif font-bold text-base mb-6">Navegación</h4>
            <ul className="space-y-3">
              {['inicio', 'recuerdos', 'metas', 'historial', 'sobre-nosotros'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm capitalize"
                  >
                    {link.replace('-', ' ')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Características */}
          <div>
            <h4 className="font-serif font-bold text-base mb-6">Características</h4>
            <ul className="space-y-3">
              {[
                { icon: Calendar, text: 'Cartas mensuales desbloqueables' },
                { icon: Heart, text: 'Galería de recuerdos multimedia' },
                { icon: MapPin, text: 'Metas y sueños compartidos' },
                { icon: Mail, text: 'Historial de momentos especiales' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2 text-sm text-gray-400">
                  <Icon className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-serif font-bold text-base mb-6">Conecta</h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              ¿Preguntas o sugerencias? Me encantaría escucharte.
            </p>
            <a
              href="mailto:contacto@alwaysyou.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-white text-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              Enviar Mensaje
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-800 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Always You. Todos los momentos reservados con amor.</p>
          <p className="flex items-center gap-2">
            Siempre serás tú <Heart className="w-4 h-4 text-blue-500" />
          </p>
        </div>
      </div>

      {/* Scroll to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 p-3 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-110 transition-all duration-300 z-40"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}
    </footer>
  );
}