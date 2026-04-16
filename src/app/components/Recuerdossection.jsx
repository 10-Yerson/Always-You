'use client';
import { useState } from 'react';
import { Heart, Play, X, Image as ImageIcon, Video } from 'lucide-react';

export default function RecuerdosSection() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Datos de ejemplo - en producción vendría del backend
  const recuerdos = [
    {
      id: 1,
      type: 'image',
      title: 'Nuestro Primer Viaje',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      fullMedia: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      date: '15 de Marzo',
      description: 'El día que decidimos explorar el mundo juntos.'
    },
    {
      id: 2,
      type: 'video',
      title: 'Nuestro Primer Beso',
      thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03bf1ca47d?w=400&h=300&fit=crop',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      date: '22 de Febrero',
      description: 'El momento que cambió todo.'
    },
    {
      id: 3,
      type: 'image',
      title: 'Atardecer Especial',
      thumbnail: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop',
      fullMedia: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop',
      date: '10 de Enero',
      description: 'Viéndote con la luz del atardecer.'
    },
    {
      id: 4,
      type: 'image',
      title: 'En la Lluvia',
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=300&fit=crop',
      fullMedia: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&h=600&fit=crop',
      date: '3 de Diciembre',
      description: 'Los mejores momentos son contigo.'
    },
    {
      id: 5,
      type: 'video',
      title: 'Nuestras Risas',
      thumbnail: 'https://images.unsplash.com/photo-1516567867245-ad8a36ae3d91?w=400&h=300&fit=crop',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      date: '25 de Noviembre',
      description: 'Capturado el sonido de tu risa.'
    },
    {
      id: 6,
      type: 'image',
      title: 'Moment Cálido',
      thumbnail: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&h=300&fit=crop',
      fullMedia: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&h=600&fit=crop',
      date: '18 de Octubre',
      description: 'Tus manos en las mías.'
    },
  ];

  return (
    <section id="recuerdos" className="py-20 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-rose-500" />
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900">
              Nuestros Recuerdos
            </h2>
            <Heart className="w-6 h-6 text-rose-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Cada momento contigo es un tesoro. Aquí guardamos nuestras fotos, videos y los instantes que nos definen. 
            <br/><span className="text-rose-500 font-medium">Son las pruebas de que nuestro amor es real.</span>
          </p>
        </div>

        {/* Galería de Recuerdos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recuerdos.map((recuerdo) => (
            <div
              key={recuerdo.id}
              onClick={() => setSelectedMedia(recuerdo)}
              className="group cursor-pointer"
            >
              <div className="relative h-72 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 hover:border-rose-300 transition-all duration-300 hover:shadow-xl">
                {/* Imagen de fondo */}
                <img
                  src={recuerdo.thumbnail}
                  alt={recuerdo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Ícono de reproducción (si es video) */}
                {recuerdo.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-rose-500 rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                )}

                {/* Tipo de contenido badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  {recuerdo.type === 'video' ? (
                    <Video className="w-4 h-4 text-rose-500" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-rose-500" />
                  )}
                </div>

                {/* Contenido abajo */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs uppercase tracking-widest text-rose-200 font-semibold mb-1">{recuerdo.date}</p>
                  <h3 className="text-lg font-serif font-bold mb-2">{recuerdo.title}</h3>
                  <p className="text-sm text-white/90 line-clamp-2">{recuerdo.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal para ver recuerdo completo */}
        {selectedMedia && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedMedia(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón cerrar */}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              {/* Contenido */}
              <div className="aspect-video bg-black overflow-hidden">
                {selectedMedia.type === 'video' ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={selectedMedia.video}
                    title={selectedMedia.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <img
                    src={selectedMedia.fullMedia}
                    alt={selectedMedia.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Info */}
              <div className="p-8">
                <p className="text-sm uppercase tracking-widest text-rose-500 font-semibold mb-2">
                  {selectedMedia.date}
                </p>
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                  {selectedMedia.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {selectedMedia.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}