'use client';
import { useState, useRef } from 'react';
import { Play, X, Image as ImageIcon, Video, Music, Pause, Maximize2, Heart } from 'lucide-react';

export default function RecuerdosSection() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Datos únicos: un video, una imagen, un audio
  const recuerdoVideo = {
    id: 1,
    type: 'video',
    title: 'Nuestro Momento Favorito',
    thumbnail: 'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v123/memories/videos/momento-favorito-thumb.jpg',
    video: 'https://player.cloudinary.com/embed/?cloud_name=dbgj8dqup&public_id=2026-04-24-150214556_r9ndmt.mp4',
    date: '15 de Marzo',
    description: 'Ese día que el tiempo se detuvo y solo existíamos tú y yo.'
  };

  const recuerdoImagen = {
    id: 2,
    type: 'image',
    title: 'El Atardecer Perfecto',
    thumbnail: 'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v123/memories/images/atardecer-perfecto-thumb.jpg',
    fullMedia: 'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v123/memories/images/atardecer-perfecto.jpg',
    date: '22 de Febrero',
    description: 'El cielo se pintó de tus colores favoritos mientras te miraba.'
  };

  const recuerdoAudio = {
    id: 3,
    type: 'audio',
    title: 'Nuestra Canción',
    audio: 'https://res.cloudinary.com/TU_CLOUD_NAME/video/upload/v123/memories/audio/nuestra-cancion.mp3',
    coverArt: 'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v123/memories/images/cancion-art.jpg',
    date: '10 de Enero',
    description: 'La melodía que siempre nos recuerda por qué estamos juntos.'
  };

  const toggleAudioPlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMediaClick = (media) => {
    // Si es audio, no abrimos modal, solo lo reproducimos
    if (media.type === 'audio') {
      toggleAudioPlay();
      return;
    }
    setSelectedMedia(media);
  };

  return (
    <section id="recuerdos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-4 py-1.5 mb-6">
            <Heart className="w-4 h-4 fill-blue-500" />
            <span className="text-xs font-medium uppercase tracking-wider">Tesoros del corazón</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
            <span className="text-gray-900">Nuestros</span>
            <span className="text-blue-500"> recuerdos</span>
          </h2>
          <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto px-4 sm:px-0">
            Tres momentos, tres recuerdos, un solo amor infinito
          </p>
        </div>

        <div className="h-px bg-gray-100 mb-8" />

        {/* ── DISEÑO: 3 TARJETAS CON VIDEO/IMAGEN DIRECTOS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* TARJETA DE VIDEO - Se muestra el video directamente */}
          <div
            onClick={() => handleMediaClick(recuerdoVideo)}
            className="group cursor-pointer"
          >
            <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100 transition-all duration-500">
              {/* Video en lugar de thumbnail */}
              <video
                src={recuerdoVideo.video}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                <Video className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[10px] font-medium text-gray-600 uppercase tracking-wide">Video</span>
              </div>

              {/* Botón play flotante */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-blue-500 rounded-full p-5 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Play className="w-8 h-8 text-white fill-white ml-0.5" />
                </div>
              </div>

              {/* Contenido inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[10px] uppercase tracking-widest text-blue-300 font-semibold mb-1.5">{recuerdoVideo.date}</p>
                <h3 className="text-lg font-serif font-bold mb-1.5">{recuerdoVideo.title}</h3>
                <p className="text-xs text-white/80 line-clamp-2">{recuerdoVideo.description}</p>
              </div>
            </div>
          </div>

          {/* TARJETA DE IMAGEN - Se muestra la imagen directamente */}
          <div
            onClick={() => handleMediaClick(recuerdoImagen)}
            className="group cursor-pointer"
          >
            <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100 transition-all duration-500">
              {/* Imagen en lugar de thumbnail */}
              <img
                src={recuerdoImagen.fullMedia}
                alt={recuerdoImagen.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[10px] font-medium text-gray-600 uppercase tracking-wide">Foto</span>
              </div>

              {/* Efecto lupa */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/20 backdrop-blur-md rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                  <Maximize2 className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Contenido inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[10px] uppercase tracking-widest text-blue-300 font-semibold mb-1.5">{recuerdoImagen.date}</p>
                <h3 className="text-lg font-serif font-bold mb-1.5">{recuerdoImagen.title}</h3>
                <p className="text-xs text-white/80 line-clamp-2">{recuerdoImagen.description}</p>
              </div>
            </div>
          </div>

          {/* TARJETA DE AUDIO (igual que antes) */}
          <div
            onClick={() => handleMediaClick(recuerdoAudio)}
            className="group cursor-pointer"
          >
            <div className="relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border border-gray-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100 transition-all duration-500">
              {/* Cover art o fondo elegante */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Music className="w-16 h-16 text-blue-500" />
                </div>
              </div>

              {/* Efecto ondas al reproducir */}
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center gap-3">
                  <div className="w-1 h-12 bg-blue-400 rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
                  <div className="w-1 h-20 bg-blue-500 rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1 h-16 bg-blue-400 rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }} />
                  <div className="w-1 h-24 bg-blue-500 rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '0.6s' }} />
                  <div className="w-1 h-12 bg-blue-400 rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '0.8s' }} />
                </div>
              )}

              {/* Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm z-10">
                <Music className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[10px] font-medium text-gray-600 uppercase tracking-wide">Canción</span>
              </div>

              {/* Botón play/pausa */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                <div className="bg-blue-500 rounded-full p-5 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white fill-white ml-0.5" />
                  )}
                </div>
              </div>

              {/* Contenido inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-gray-900 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-10 bg-gradient-to-t from-white via-white/90 to-transparent">
                <p className="text-[10px] uppercase tracking-widest text-blue-600 font-semibold mb-1.5">{recuerdoAudio.date}</p>
                <h3 className="text-lg font-serif font-bold mb-1.5">{recuerdoAudio.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{recuerdoAudio.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reproductor de audio oculto */}
        <audio
          ref={audioRef}
          src={recuerdoAudio.audio}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          className="hidden"
        />

        {/* ── MODAL PARA VIDEO E IMAGEN ── */}
        {selectedMedia && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <div
              className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-3 right-3 z-10 bg-white border border-gray-100 rounded-full p-2 hover:bg-gray-50 transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="bg-black overflow-hidden rounded-t-2xl">
                {selectedMedia.type === 'video' ? (
                  <video
                    controls
                    autoPlay
                    className="w-full h-auto max-h-[70vh] object-contain"
                    src={selectedMedia.video}
                    poster={selectedMedia.thumbnail}
                  >
                    Tu navegador no soporta el elemento de video.
                  </video>
                ) : (
                  <img
                    src={selectedMedia.fullMedia}
                    alt={selectedMedia.title}
                    className="w-full h-auto max-h-[70vh] object-contain bg-black"
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

        {/* Estilos adicionales para la animación de pulsación */}
        <style jsx>{`
          @keyframes pulse {
            0%, 100% {
              transform: scaleY(1);
            }
            50% {
              transform: scaleY(0.5);
            }
          }
        `}</style>
      </div>
    </section>
  );
}