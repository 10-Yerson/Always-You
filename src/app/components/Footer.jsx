'use client';
import { Heart, Mail, MapPin, Calendar, ArrowUp } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [scrollToTop, setScrollToTop] = useState(false);

  const handleScroll = () => {
    setScrollToTop(window.scrollY > 300);
  };

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">Always You</h3>
                <p className="text-xs text-gray-400">Nuestros Momentos</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Una plataforma diseñada para preservar y compartir los momentos más especiales de tu vida. 
              Porque cada instante contigo es un tesoro que merece ser recordado.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Hecho con amor</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-white">Navegación</h4>
            <ul className="space-y-3">
              <li>
                <a href="#inicio" className="text-gray-400 hover:text-rose-400 transition-colors duration-200 text-sm">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#recuerdos" className="text-gray-400 hover:text-rose-400 transition-colors duration-200 text-sm">
                  Recuerdos
                </a>
              </li>
              <li>
                <a href="#metas" className="text-gray-400 hover:text-rose-400 transition-colors duration-200 text-sm">
                  Metas
                </a>
              </li>
              <li>
                <a href="#historial" className="text-gray-400 hover:text-rose-400 transition-colors duration-200 text-sm">
                  Historial
                </a>
              </li>
              <li>
                <a href="#sobre-nosotros" className="text-gray-400 hover:text-rose-400 transition-colors duration-200 text-sm">
                  Sobre Nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-white">Características</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4 text-rose-400 flex-shrink-0 mt-1" />
                <span>Cartas mensuales desbloqueables</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Heart className="w-4 h-4 text-rose-400 flex-shrink-0 mt-1" />
                <span>Galería de recuerdos multimedia</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-1" />
                <span>Metas y objetivos compartidos</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-rose-400 flex-shrink-0 mt-1" />
                <span>Historial de momentos especiales</span>
              </li>
            </ul>
          </div>

          {/* Contact & CTA */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-white">Conecta Conmigo</h4>
            <p className="text-gray-400 text-sm mb-6">
              ¿Preguntas o sugerencias? Me encantaría escucharte.
            </p>
            <a
              href="mailto:contacto@alwaysyou.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-400 to-pink-500 rounded-lg font-medium text-white hover:shadow-lg transition-all duration-200 hover:scale-105 text-sm"
            >
              <Mail className="w-4 h-4" />
              Enviar Mensaje
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {currentYear} Always You. Todos los momentos reservados con amor.
          </p>
          
          <div className="flex items-center gap-6">
            <p className="text-gray-500 text-sm">
              Hecho con <Heart className="w-4 h-4 text-rose-500 inline" /> para alguien especial
            </p>
          </div>

          {/* Scroll to Top Button */}
          {scrollToTop && (
            <button
              onClick={scrollUp}
              className="fixed bottom-8 right-8 bg-gradient-to-r from-rose-400 to-pink-500 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40 animate-fade-in"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
}