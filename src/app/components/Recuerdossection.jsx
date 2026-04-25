'use client';
import { useState, useRef } from 'react';
import { Play, X, Image as ImageIcon, Video, Music, Pause, Maximize2, Heart, ChevronRight } from 'lucide-react';

export default function RecuerdosSection() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Datos únicos: un video, una imagen, un audio
  const recuerdoVideo = {
    id: 1,
    type: 'video',
    title: 'El Día del Bus',
    thumbnail: 'https://res.cloudinary.com/dbgj8dqup/image/upload/v1777127948/IMG_20260425_093402.jpg_vgo5nl.png',
    video: 'https://res.cloudinary.com/dbgj8dqup/video/upload/v1777072702/ssstik.io__babys_lryrics07_1777072656115_nd5dte.mp4',
    date: 'Aquella mañana',
    description: '¿No sé si te acuerdas de la vez en el bus? Iba como siempre tranquilo a estudiar, venía de la casa así. Cuando el bus paró, te vi. Y de repente te subiste. Me dio tanta pena que no supe ni cómo respirar. Te sentaste detrás de mí, y durante todo el viaje no fui capaz de mirar atrás. Sentía que el corazón me iba a explotar. Era la primera vez que te veía, y aunque quería hacer algo, el miedo me ganó. Al final, solo me bajé. No fui capaz de hablarte. Pero ese día entendí que verte una sola vez ya era suficiente para querer verte todas las demás. Fue el viaje más largo y más corto de mi vida.'
  };

  const recuerdoImagen = {
    id: 2,
    type: 'image',
    title: 'Las Noches que Nos Conocimos Más',
    thumbnail: 'https://res.cloudinary.com/dbgj8dqup/image/upload/v1777129217/1745210661976.jpg_kym5nk.png',
    fullMedia: 'https://res.cloudinary.com/dbgj8dqup/image/upload/v1777129217/1745210661976.jpg_kym5nk.png',
    date: 'Cuando la distancia nos acercó',
    description: '¿Te acuerdas cuando estaba estudiando en Popayán? Nos gustaba hablar de cosas bonitas del día a día, así bien sencillo pero bonito. Y empezamos a hacer llamadas casi todos los días por las noches. Nos contábamos todo, hablábamos de tantas cosas bonitas. Tú me cantabas y yo también te cantaba. Nos dedicábamos muchas cosas. Fue algo lindo que no voy a olvidar.'
  };

  const recuerdoAudio = {
    id: 3,
    type: 'audio',
    title: 'La Boda - Cosculluela',
    audio: 'https://res.cloudinary.com/dbgj8dqup/video/upload/v1777071027/music/audios/juupkaaurohrsxvf5m4z.m4a',
    coverArt: 'https://res.cloudinary.com/dbgj8dqup/image/upload/v1777073290/descarga_o3qhdc.jpg',
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
    setSelectedMedia(media);
  };

  const closeModal = () => {
    if (selectedMedia?.type === 'audio' && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setSelectedMedia(null);
  };

  return (
    <section id="recuerdos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-4 py-1.5 mb-4">
            <Heart className="w-4 h-4" />
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

        {/* GRID DE 3 TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* TARJETA DE VIDEO */}
          <div onClick={() => handleMediaClick(recuerdoVideo)} className="group cursor-pointer">
            <div className="relative h-[420px] rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100 transition-all duration-500">
              <video
                src={recuerdoVideo.video}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                muted
                loop
                playsInline
                poster={recuerdoVideo.thumbnail}
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                <Video className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[10px] font-medium text-gray-600 uppercase tracking-wide">Video</span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-blue-500 rounded-full p-5 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Play className="w-8 h-8 text-white fill-white ml-0.5" />
                </div>
              </div>

              {/* CONTENIDO INFERIOR - VIDEO con VER MÁS */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-6 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10 bg-gradient-to-t from-white via-white/95 to-transparent rounded-t-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-3 rounded-full bg-blue-500" />
                  <p className="text-[10px] uppercase tracking-widest text-blue-600 font-semibold">{recuerdoVideo.date}</p>
                </div>
                <h3 className="text-lg font-serif font-bold text-gray-900 leading-tight mb-1">{recuerdoVideo.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2">{recuerdoVideo.description.substring(0, 100)}...</p>
                <div className="inline-flex items-center gap-1 text-blue-500 text-xs font-medium group-hover:text-blue-600 transition-colors">
                  <span>Ver más</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* TARJETA DE IMAGEN */}
          <div onClick={() => handleMediaClick(recuerdoImagen)} className="group cursor-pointer">
            <div className="relative h-[420px] rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100 transition-all duration-500">
              <img
                src={recuerdoImagen.fullMedia}
                alt={recuerdoImagen.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[10px] font-medium text-gray-600 uppercase tracking-wide">Foto</span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/20 backdrop-blur-md rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                  <Maximize2 className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* CONTENIDO INFERIOR - IMAGEN con VER MÁS */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-6 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10 bg-gradient-to-t from-white via-white/95 to-transparent rounded-t-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-3 rounded-full bg-blue-500" />
                  <p className="text-[10px] uppercase tracking-widest text-blue-600 font-semibold">{recuerdoImagen.date}</p>
                </div>
                <h3 className="text-lg font-serif font-bold text-gray-900 leading-tight mb-1">{recuerdoImagen.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2">{recuerdoImagen.description.substring(0, 100)}...</p>
                <div className="inline-flex items-center gap-1 text-blue-500 text-xs font-medium group-hover:text-blue-600 transition-colors">
                  <span>Ver más</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* TARJETA DE AUDIO */}
          <div onClick={() => handleMediaClick(recuerdoAudio)} className="group cursor-pointer">
            <div className="relative h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border border-gray-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100 transition-all duration-500">

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

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm z-10">
                <Music className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[10px] font-medium text-gray-600 uppercase tracking-wide">Canción</span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                <div className="bg-blue-500 rounded-full p-5 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Play className="w-8 h-8 text-white fill-white ml-0.5" />
                </div>
              </div>

              {/* CONTENIDO INFERIOR - AUDIO con VER MÁS */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-6 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10 bg-gradient-to-t from-white via-white/95 to-transparent rounded-t-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-3 rounded-full bg-blue-500" />
                  <p className="text-[10px] uppercase tracking-widest text-blue-600 font-semibold">{recuerdoAudio.date}</p>
                </div>
                <h3 className="text-lg font-serif font-bold text-gray-900 leading-tight mb-1">{recuerdoAudio.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2">{recuerdoAudio.description.substring(0, 80)}...</p>
                <div className="inline-flex items-center gap-1 text-blue-500 text-xs font-medium group-hover:text-blue-600 transition-colors">
                  <span>Ver más</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
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

        {/* MODAL PARA VIDEO, IMAGEN Y AUDIO */}
        {selectedMedia && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div
              className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 z-10 bg-white border border-gray-100 rounded-full p-2 hover:bg-gray-50 transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="bg-black overflow-hidden rounded-t-2xl">
                {selectedMedia.type === 'video' && (
                  <video
                    controls
                    autoPlay
                    className="w-full h-auto max-h-[50vh] object-contain"
                    src={selectedMedia.video}
                    poster={selectedMedia.thumbnail}
                  >
                    Tu navegador no soporta el elemento de video.
                  </video>
                )}
                {selectedMedia.type === 'image' && (
                  <img
                    src={selectedMedia.fullMedia}
                    alt={selectedMedia.title}
                    className="w-full h-auto max-h-[50vh] object-contain bg-black"
                  />
                )}
                {selectedMedia.type === 'audio' && (
                  <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
                    <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl mb-6">
                      {selectedMedia.coverArt ? (
                        <img
                          src={selectedMedia.coverArt}
                          alt="Portada"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                          <Music className="w-24 h-24 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={toggleAudioPlay}
                        className="bg-blue-500 rounded-full p-4 hover:bg-blue-600 transition-colors shadow-lg"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white fill-white ml-0.5" />
                        )}
                      </button>
                    </div>
                  </div>
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
                <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                  {selectedMedia.description}
                </p>
              </div>
            </div>
          </div>
        )}

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