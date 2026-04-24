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
    title: 'El Día que Nos Vimos por Primera Vez en el Bus',
    thumbnail: 'https://res.cloudinary.com/dbgj8dqup/video/upload/v1777072702/ssstik.io__babys_lryrics07_1777072656115_nd5dte.mp4',
    video: 'https://res.cloudinary.com/dbgj8dqup/video/upload/v1777072702/ssstik.io__babys_lryrics07_1777072656115_nd5dte.mp4',
    date: 'Aquella tarde que nunca olvidaré',
    description: '¿No sé si te acuerdas de la vez en el bus? Iba como siempre tranquilo a estudiar, venía de la casa así. Cuando el bus paró, te vi. Y de repente te subiste. Me dio tanta pena que no supe ni cómo respirar. Te sentaste detrás de mí, y durante todo el viaje no fui capaz de mirar atrás. Sentía que el corazón me iba a explotar. Era la primera vez que te veía, y aunque quería hacer algo, el miedo me ganó. Al final, solo me bajé. No fui capaz de hablarte. Pero ese día entendí que verte una sola vez ya era suficiente para querer verte todas las demás. Fue el viaje más largo y más corto de mi vida.'
  };

  const recuerdoImagen = {
    id: 2,
    type: 'image',
    title: 'Las Noches que Nos Conocimos Más',
    thumbnail: 'https://res.cloudinary.com/dbgj8dqup/image/upload/v1777072323/1745210661976_hgcrjq.jpg',
    fullMedia: 'https://res.cloudinary.com/dbgj8dqup/image/upload/v1777072323/1745210661976_hgcrjq.jpg',
    date: 'Cuando la distancia nos acercó',
    description: '¿Te acuerdas cuando estaba estudiando en Popayán? Nos gustaba hablar de cosas bonitas del día a día, así bien sencillo pero bonito. Y empezamos a hacer llamadas casi todos los días por las noches. Nos contábamos todo, hablábamos de tantas cosas bonitas. Tú me cantabas y yo también te cantaba. Nos dedicábamos muchas cosas. Fue algo lindo que no voy a olvidar.'
  };

  const recuerdoAudio = {
    id: 3,
    type: 'audio',
    title: 'La Boda - Cosculluela',
    audio: 'https://res.cloudinary.com/dbgj8dqup/video/upload/v1777071027/music/audios/juupkaaurohrsxvf5m4z.m4a',
    coverArt: 'data:image/jpeg;base64,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',
    date: 'Siempre en nuestros corazones',
    description: 'Esta canción siempre nos va a recordar lo que sentimos el uno por el otro. Cada vez que la escucho, pienso en ti y en todo lo que hemos construido juntos. Es nuestra, como lo es este amor.'
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

              {/* Cover art - IMAGEN DE PORTADA */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                  {recuerdoAudio.coverArt ? (
                    <img
                      src={recuerdoAudio.coverArt}
                      alt="Portada de canción"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Music className="w-16 h-16 text-blue-500" />
                  )}
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