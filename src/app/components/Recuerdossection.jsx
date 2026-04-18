'use client';
import { useState } from 'react';
import { Heart, Play, X, Image as ImageIcon, Video } from 'lucide-react';

export default function RecuerdosSection() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const recuerdos = [
    {
      id: 1, type: 'image', title: 'Nuestro Primer Viaje',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      fullMedia: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      date: '15 de Marzo', description: 'El día que decidimos explorar el mundo juntos.'
    },
    {
      id: 2, type: 'video', title: 'Nuestro Primer Beso',
      thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03bf1ca47d?w=400&h=300&fit=crop',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      date: '22 de Febrero', description: 'El momento que cambió todo.'
    },
    {
      id: 3, type: 'image', title: 'Atardecer Especial',
      thumbnail: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop',
      fullMedia: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop',
      date: '10 de Enero', description: 'Viéndote con la luz del atardecer.'
    },
    {
      id: 4, type: 'image', title: 'En la Lluvia',
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=300&fit=crop',
      fullMedia: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&h=600&fit=crop',
      date: '3 de Diciembre', description: 'Los mejores momentos son contigo.'
    },
    {
      id: 5, type: 'video', title: 'Nuestras Risas',
      thumbnail: 'https://images.unsplash.com/photo-1516567867245-ad8a36ae3d91?w=400&h=300&fit=crop',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      date: '25 de Noviembre', description: 'Capturando el sonido de tu risa.'
    },
    {
      id: 6, type: 'image', title: 'Momento Cálido',
      thumbnail: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&h=300&fit=crop',
      fullMedia: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&h=600&fit=crop',
      date: '18 de Octubre', description: 'Tus manos en las mías.'
    },
  ];

  return (
    <section id="recuerdos" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-blue-500" />
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900">
              Nuestros Recuerdos
            </h2>
            <Heart className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-4 leading-relaxed">
            Cada momento contigo es un tesoro. Aquí guardamos nuestras fotos, videos y los instantes que nos definen.
            <br /><span className="text-blue-500 font-medium">Son las pruebas de que nuestro amor es real.</span>
          </p>
        </div>

        {/* Galería */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recuerdos.map((r) => (
            <div key={r.id} onClick={() => setSelectedMedia(r)} className="group cursor-pointer">
              <div className="relative h-72 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300">
                <img
                  src={r.thumbnail} alt={r.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {r.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-blue-500 rounded-full p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-200">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-md">
                  {r.type === 'video'
                    ? <Video className="w-4 h-4 text-blue-500" />
                    : <ImageIcon className="w-4 h-4 text-blue-500" />
                  }
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs uppercase tracking-widest text-blue-200 font-semibold mb-1">{r.date}</p>
                  <h3 className="text-lg font-serif font-bold mb-1">{r.title}</h3>
                  <p className="text-sm text-white/80 line-clamp-2">{r.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedMedia && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-blue-50 transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              <div className="aspect-video bg-black overflow-hidden rounded-t-2xl">
                {selectedMedia.type === 'video' ? (
                  <iframe
                    width="100%" height="100%" src={selectedMedia.video}
                    title={selectedMedia.title} frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen className="w-full h-full"
                  />
                ) : (
                  <img src={selectedMedia.fullMedia} alt={selectedMedia.title} className="w-full h-full object-cover" />
                )}
              </div>

              <div className="p-8">
                <p className="text-sm uppercase tracking-widest text-blue-500 font-semibold mb-2">{selectedMedia.date}</p>
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">{selectedMedia.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{selectedMedia.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}