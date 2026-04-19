'use client';
import { useState } from 'react';
import { Play, X, Image as ImageIcon, Video } from 'lucide-react';

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
    <section id="recuerdos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5">

        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8 mb-8">

          {/* Izquierda — título + subtítulo */}
          <div className="text-left">
            <h2 className="text-5xl lg:text-6xl font-serif font-bold leading-[1.05] mb-3">
              <span className="text-gray-900">Nuestros</span>
              <br />
              <em className="text-blue-600 not-italic font-serif">recuerdos</em>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Cada momento contigo es un tesoro. Las pruebas de que nuestro amor es real.
            </p>
          </div>

          {/* Derecha — eyebrow + pill */}
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-end gap-3 sm:pb-1">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">
                Momentos guardados
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-4 py-1.5 text-xs text-gray-500">
              <span className="font-semibold text-gray-900">{recuerdos.length}</span>
              momentos
            </span>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-8" />

        {/* ── GALERÍA ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recuerdos.map((r) => (
            <div key={r.id} onClick={() => setSelectedMedia(r)} className="group cursor-pointer">
              <div className="relative h-72 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300">
                <img
                  src={r.thumbnail}
                  alt={r.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {r.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-blue-500 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                )}

                {/* Badge tipo */}
                <div className="absolute top-3 right-3 bg-white/90 border border-gray-200 rounded-full px-2.5 py-1 flex items-center gap-1">
                  {r.type === 'video'
                    ? <Video className="w-3 h-3 text-blue-500" />
                    : <ImageIcon className="w-3 h-3 text-blue-500" />
                  }
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
                    {r.type === 'video' ? 'video' : 'foto'}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[10px] uppercase tracking-widest text-blue-300 font-medium mb-1">{r.date}</p>
                  <h3 className="text-base font-serif font-bold mb-1">{r.title}</h3>
                  <p className="text-xs text-white/75 line-clamp-2">{r.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── MODAL ── */}
        {selectedMedia && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <div
              className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-3 right-3 z-10 bg-white border border-gray-100 rounded-full p-1.5 hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              <div className="aspect-video bg-black overflow-hidden rounded-t-2xl">
                {selectedMedia.type === 'video' ? (
                  <iframe
                    width="100%" height="100%"
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

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">
                    {selectedMedia.date}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                  {selectedMedia.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {selectedMedia.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}