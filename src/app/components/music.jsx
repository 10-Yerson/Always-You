'use client'

import React, { useState, useRef, useEffect } from 'react'
import axios from '@/utils/axios'
import { toast } from 'react-toastify'
import {
  Heart,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Music as MusicIcon,
  Headphones,
  Radio,
  Sparkles,
  Star,
  Clock,
  Disc,
  Loader2
} from 'lucide-react'

export default function MusicPage() {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const audioRef = useRef(null)

  // Obtener canciones de la API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get('/api/music')
        setSongs(data)
      } catch (error) {
        console.error(error)
        toast.error('No se pudieron cargar las canciones 🎵')
      } finally {
        setLoading(false)
      }
    }
    fetchSongs()
  }, [])

  const currentSong = songs[currentSongIndex]

  // Actualizar audio cuando cambia la canción
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play()
      }
      setProgress(0)
      setCurrentTime('0:00')
    }
  }, [currentSongIndex, currentSong])

  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return

    if (!isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
    setIsPlaying(!isPlaying)
  }

  const nextSong = () => {
    if (songs.length === 0) return
    const nextIndex = (currentSongIndex + 1) % songs.length
    setCurrentSongIndex(nextIndex)
  }

  const prevSong = () => {
    if (songs.length === 0) return
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length
    setCurrentSongIndex(prevIndex)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
    if (newVolume > 0 && isMuted) setIsMuted(false)
  }

  const handleProgressClick = (e) => {
    const bar = e.currentTarget
    const rect = bar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    setProgress(percent * 100)
    if (audioRef.current) {
      audioRef.current.currentTime = percent * audioRef.current.duration
    }
  }

  const handleTimeUpdate = (e) => {
    const percent = (e.target.currentTime / e.target.duration) * 100
    setProgress(percent)

    const mins = Math.floor(e.target.currentTime / 60)
    const secs = Math.floor(e.target.currentTime % 60)
    setCurrentTime(`${mins}:${secs.toString().padStart(2, '0')}`)
  }

  const handleSongEnd = () => {
    nextSong()
  }

  const formatDuration = (duration) => {
    if (!duration) return '0:00'
    return duration
  }

  // Playlists calculadas desde las canciones reales
  const playlists = [
    { id: 1, name: "Todas las canciones", icon: <MusicIcon className="w-5 h-5" />, color: "from-blue-500 to-indigo-600", count: songs.length },
    { id: 2, name: "Favoritas", icon: <Heart className="w-5 h-5" />, color: "from-pink-500 to-rose-500", count: songs.filter(s => s.isFavorite).length },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">

      {/* Hero Section */}
      <div className="min-h-[0vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 px-4 relative">

        <div className="absolute top-10 left-5 opacity-20">
          <Heart className="w-6 h-6 text-blue-400" />
        </div>
        <div className="absolute bottom-10 right-5 opacity-20">
          <MusicIcon className="w-5 h-5 text-blue-400" />
        </div>
        <div className="absolute top-1/3 right-10 opacity-10">
          <Headphones className="w-4 h-4 text-blue-500" />
        </div>
        <div className="absolute bottom-1/3 left-10 opacity-10">
          <Radio className="w-4 h-4 text-blue-500" />
        </div>

        <div className="max-w-4xl mx-auto text-center">

          <div className="flex justify-center items-end gap-1 mb-8 h-16">
            <div className="w-1.5 bg-blue-400 rounded-full animate-equalize" style={{ height: '30px', animationDelay: '0s' }}></div>
            <div className="w-1.5 bg-blue-500 rounded-full animate-equalize" style={{ height: '50px', animationDelay: '0.2s' }}></div>
            <div className="w-1.5 bg-indigo-500 rounded-full animate-equalize" style={{ height: '40px', animationDelay: '0.4s' }}></div>
            <div className="w-1.5 bg-blue-600 rounded-full animate-equalize" style={{ height: '60px', animationDelay: '0.1s' }}></div>
            <div className="w-1.5 bg-indigo-400 rounded-full animate-equalize" style={{ height: '35px', animationDelay: '0.3s' }}></div>
            <div className="w-1.5 bg-blue-400 rounded-full animate-equalize" style={{ height: '45px', animationDelay: '0.5s' }}></div>
            <div className="w-1.5 bg-blue-500 rounded-full animate-equalize" style={{ height: '25px', animationDelay: '0.15s' }}></div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Nuestra{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Música
            </span>
          </h1>

          <div className="flex justify-center mb-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          </div>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Cada canción cuenta una parte de nuestra historia,
            porque la música es el lenguaje del corazón.
          </p>

          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center gap-1.5 text-xs text-gray-400">
              <Headphones className="w-3 h-3" />
              <span>{songs.length} canciones disponibles</span>
            </div>
          </div>

        </div>
      </div>

      {/* Reproductor Principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Mostrar loader mientras carga las canciones */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-500">Cargando tu música...</p>
            </div>
          </div>
        ) : songs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MusicIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No hay canciones aún</h3>
              <p className="text-gray-500">Pronto habrá música especial para ti 🎵</p>
            </div>
          </div>
        ) : (
          <>
            {/* Player Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

              <div className="grid md:grid-cols-2 gap-6 p-6">

                {/* Cover art */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur-xl opacity-40 animate-pulse"></div>
                    <div className="relative w-48 h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                      <div className="text-center">
                        {currentSong?.coverImage ? (
                          <img
                            src={currentSong.coverImage}
                            alt={currentSong.title}
                            className="w-48 h-48 object-cover rounded-2xl"
                          />
                        ) : (
                          <Disc className="w-16 h-16 text-white mx-auto mb-2 animate-spin-slow" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
                        )}
                        <p className="text-white text-xs opacity-80 mt-2">Now Playing</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información y controles */}
                <div className="flex flex-col justify-center">
                  <div className="text-center md:text-left">
                    <p className="text-sm text-blue-500 font-medium mb-1">Reproduciendo ahora</p>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">{currentSong?.title}</h2>
                    <p className="text-gray-500 mb-4">{currentSong?.artist}</p>
                    {currentSong?.album && (
                      <p className="text-xs text-gray-400 mb-2">Álbum: {currentSong.album}</p>
                    )}
                  </div>

                  {/* Barra de progreso */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{currentTime}</span>
                      <span>{formatDuration(currentSong?.duration)}</span>
                    </div>
                    <div
                      className="w-full bg-gray-200 rounded-full h-1.5 cursor-pointer relative"
                      onClick={handleProgressClick}
                    >
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full relative"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-md"></div>
                      </div>
                    </div>
                  </div>

                  {/* Botones de control */}
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <button onClick={prevSong} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <SkipBack className="w-6 h-6 text-gray-600" />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 hover:scale-105 transition-transform"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-1" />
                      )}
                    </button>
                    <button onClick={nextSong} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <SkipForward className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>

                  {/* Control de volumen */}
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={toggleMute}>
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Playlists */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-blue-500" />
                Mis Playlists
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                {playlists.map((playlist) => (
                  <div key={playlist.id} className="bg-white rounded-xl p-3 shadow-md hover:shadow-lg transition-all cursor-pointer group">
                    <div className={`bg-gradient-to-br ${playlist.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform`}>
                      {playlist.icon}
                    </div>
                    <p className="font-medium text-gray-800 text-sm">{playlist.name}</p>
                    <p className="text-xs text-gray-400">{playlist.count} canciones</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lista de canciones */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MusicIcon className="w-5 h-5 text-blue-500" />
                Lista de Reproducción
              </h3>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {songs.map((song, index) => (
                  <div
                    key={song._id}
                    className={`flex items-center justify-between p-3 hover:bg-gray-50 transition-colors cursor-pointer ${index !== songs.length - 1 ? 'border-b border-gray-100' : ''} ${currentSongIndex === index ? 'bg-blue-50' : ''}`}
                    onClick={() => {
                      setCurrentSongIndex(index)
                      if (isPlaying && audioRef.current) {
                        setTimeout(() => {
                          audioRef.current?.play()
                        }, 100)
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentSongIndex === index ? 'bg-blue-500' : 'bg-gradient-to-br from-blue-100 to-indigo-100'}`}>
                        {song.coverImage ? (
                          <img src={song.coverImage} alt="" className="w-8 h-8 rounded-lg object-cover" />
                        ) : (
                          <MusicIcon className={`w-4 h-4 ${currentSongIndex === index ? 'text-white' : 'text-blue-600'}`} />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium text-sm ${currentSongIndex === index ? 'text-blue-600' : 'text-gray-800'}`}>{song.title}</p>
                        <p className="text-xs text-gray-400">{song.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{song.duration}</span>
                      {currentSongIndex === index && isPlaying && (
                        <div className="flex gap-0.5">
                          <div className="w-0.5 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-0.5 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                          <div className="w-0.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      {/* Audio element */}
      {!loading && currentSong && (
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleSongEnd}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}
    </div>
  )
}