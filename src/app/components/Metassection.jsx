'use client';
import { useState } from 'react';
import { Play, X, Video, Image as ImageIcon, Heart, Target, Calendar, MapPin } from 'lucide-react';

export default function MetasSection() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Datos: 2 videos y 1 imagen (SIN thumbnails)
  const metasMedia = [
    {
      id: 1,
      type: 'video',
      title: 'Conocernos en Persona',
      subtitle: 'El encuentro más esperado',
      videoStatic: 'https://res.cloudinary.com/dbgj8dqup/video/upload/so_3,f_jpg/v1777136258/ssstik.io__alex_cfm_1777136195270_q5pxuu.mp4',
      video: 'https://res.cloudinary.com/dbgj8dqup/video/upload/v1777136258/ssstik.io__alex_cfm_1777136195270_q5pxuu.mp4',
      date: 'Muy pronto',
      location: '💑 Donde nuestros corazones se encuentren',
      progress: 5,
      description: 'Llevamos años hablando, compartiendo sueños y creando una conexión única. Ahora solo falta ese abrazo que tanto hemos esperado. Verte a los ojos, sentir tu voz cerca y hacer real todo lo que hemos construido. Esa primera cita será el inicio de todo lo demás.'
    },
    {
      id: 2,
      type: 'image',
      title: 'Compartir Momentos Juntos',
      subtitle: 'Viajar, pasear y disfrutar la vida',
      fullMedia: 'https://res.cloudinary.com/dbgj8dqup/image/upload/v1777141880/IMG_20260425_132327.jpg_1.png_tcpzsm.png',
      date: 'Cuando nos conozcamos',
      location: '✈️ Donde nos lleve el corazón',
      progress: 10,
      description: 'Después de tanto tiempo esperando, lo primero será disfrutar el uno del otro. Viajar juntos, caminar de la mano, descubrir lugares nuevos, compartir atardeceres, reír sin parar y crear recuerdos que ningún teléfono pueda capturar. Cada momento a tu lado será una aventura.'
    },
    {
      id: 3,
      type: 'video',
      title: 'Seguir Construyendo Nuestra Historia',
      subtitle: 'Un día a la vez, juntos',
      videoStatic: 'https://res.cloudinary.com/dbgj8dqup/video/upload/f_jpg/v1777137240/ssstik.io__fredymarin.o_1777137191909_z2phq3.mp4',
      video: 'https://res.cloudinary.com/dbgj8dqup/video/upload/v1777137240/ssstik.io__fredymarin.o_1777137191909_z2phq3.mp4',
      date: 'Siempre',
      location: '💙 Donde sea, contigo',
      progress: 15,
      description: 'No importa el destino exacto, sino que sea contigo. Seguir creciendo, amándonos y eligiéndonos cada día. Que nuestra historia siga escribiéndose, página por página, y que nunca deje de emocionarnos.'
    }
  ];

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  return (
    <section id="metas" className="py-14 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-5">

        {/* HEADER */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-4 py-1.5 mb-4">
            <Target className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Metas que cumplir</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
            <span className="text-gray-900">Nuestras</span>
            <span className="text-blue-500"> metas </span>
          </h2>
          <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 mb-6" />
          <p className="text-sm sm:text-base text-gray-500 max-w-md">
            Tres grandes sueños que estamos construyendo paso a paso, juntos.
          </p>
        </div>

        {/* LISTA VERTICAL */}
        <div className="space-y-8">
          {metasMedia.map((meta) => (
            <div
              key={meta.id}
              onClick={() => handleMediaClick(meta)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row">
                {/* MEDIA - 40% (estático, sin reproducción) */}
                <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden bg-white">
                  {meta.type === 'video' ? (
                    // Video como imagen estática (usando Cloudinary con f_jpg)
                    <img
                      src={meta.videoStatic}
                      alt={meta.title}
                      className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <img
                      src={meta.fullMedia}
                      alt={meta.title}
                      className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}

                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5">
                    {meta.type === 'video' ? (
                      <Video className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <ImageIcon className="w-3.5 h-3.5 text-white" />
                    )}
                    <span className="text-[10px] font-medium text-white uppercase tracking-wide">
                      {meta.type === 'video' ? 'Video' : 'Foto'}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-4">
                      <Play className="w-8 h-8 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* CONTENIDO - 60% */}
                <div className="flex-1 p-6 md:p-8">
                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">Progreso</span>
                      <span className="text-sm font-semibold text-blue-600">{meta.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${meta.progress}%` }}
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1">{meta.title}</h3>
                  <p className="text-sm text-blue-500 font-medium mb-2">{meta.subtitle}</p>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{meta.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{meta.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {meta.description}
                  </p>

                  <div className="inline-flex items-center gap-2 text-blue-500 text-sm font-medium group-hover:text-blue-600 transition-colors">
                    <span>Ver más</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
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
                {selectedMedia.type === 'video' ? (
                  <video
                    controls
                    autoPlay
                    className="w-full h-auto max-h-[50vh] object-contain"
                    src={selectedMedia.video}
                  >
                    Tu navegador no soporta el elemento de video.
                  </video>
                ) : (
                  <img
                    src={selectedMedia.fullMedia}
                    alt={selectedMedia.title}
                    className="w-full h-auto max-h-[50vh] object-contain bg-black"
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
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                  {selectedMedia.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{selectedMedia.subtitle}</p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {selectedMedia.location}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Target className="w-3.5 h-3.5" /> Progreso: {selectedMedia.progress}%
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
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