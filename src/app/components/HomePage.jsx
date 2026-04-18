'use client';
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { Heart, Sparkles, Clock, Calendar, CheckCircle2, MessageCircle } from 'lucide-react';

const FRASES = [
  { text: "Cada mes es una parte de mí llegando a ti",         sub: "Historia en curso"        },
  { text: "Cuando te encuentre, sabrás que siempre fuiste tú", sub: "Capítulo en progreso"     },
  { text: "Este viaje lo haremos juntos",                      sub: "Nuestra historia"         },
  { text: "Aún no nos conocemos, pero ya te pienso",           sub: "Preparando algo especial" },
  { text: "Hay promesas que hice sin conocerte",               sub: "Solo para ti"             },
];

const PHOTO_URL =
  "https://res.cloudinary.com/dbgj8dqup/image/upload/v1776542616/Picsart_26-04-17_17-30-35-869.jpg_yxt9bf.png";

function Spinner() {
  return (
    <span className="inline-block w-4 h-4 border-2 border-blue-100 border-t-blue-400 rounded-full animate-spin" />
  );
}

function SkeletonLine({ className = "" }) {
  return (
    <span className={"inline-block animate-pulse bg-gray-100 rounded h-2.5 align-middle " + className} />
  );
}

function CountdownCard({ value, label, loading }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-2xl py-4 px-2 text-center">
      <div className="h-8 flex items-center justify-center mb-1">
        {loading
          ? <Spinner />
          : <span className="text-3xl font-serif font-bold text-gray-900 leading-none">
              {String(value).padStart(2, '0')}
            </span>
        }
      </div>
      <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

function PhoneFrame({ imageUrl }) {
  return (
    <div className="w-[180px] flex-shrink-0 bg-white border border-gray-200 rounded-[28px] overflow-hidden">
      <div className="h-2 bg-gray-50 flex items-center justify-center pt-2 pb-1.5">
        <div className="w-11 h-1 bg-gray-200 rounded-full" />
      </div>
      <div className="w-full overflow-hidden bg-gray-100" style={{ aspectRatio: '9/16' }}>
        <img
          src={imageUrl}
          alt="Foto del mes"
          className="w-full h-full object-cover block"
        />
      </div>
      <div className="px-3 py-2 bg-white border-t border-gray-100">
        <p className="text-[10px] text-gray-400 text-center tracking-widest uppercase">
          foto del mes
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [data, setData]             = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [fraseIdx, setFraseIdx]     = useState(0);
  const [visible, setVisible]       = useState(true);

  useEffect(() => {
    axios.get("/api/letter/public-status")
      .then((res) => setData(res.data))
      .catch(() => setData({
        status: "in_progress",
        progress: 0,
        currentMonth: 1,
        timeLeft: { months: 11, days: 0, hours: 0, minutes: 0 },
        message: "Cada mes es una parte de mí llegando a ti",
        nextUnlockDate: null,
      }))
      .finally(() => setLoadingData(false));
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setFraseIdx((i) => (i + 1) % FRASES.length); setVisible(true); }, 340);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const status         = data?.status       || "in_progress";
  const progress       = data?.progress     || 0;
  const currentMonth   = data?.currentMonth || 1;
  const timeLeft       = data?.timeLeft     || { months: 0, days: 0, hours: 0, minutes: 0 };
  const message        = data?.message      || "";
  const nextUnlockDate = data?.nextUnlockDate || null;
  const viewedCount    = data?.viewedCount  || 0;

  const isNotStarted = status === "not_started";
  const isFinished   = status === "finished";
  const frase        = FRASES[fraseIdx];

  const nextUnlockStr = nextUnlockDate
    ? new Date(nextUnlockDate).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })
    : "Pronto";

  const daysToNext = nextUnlockDate
    ? Math.max(0, Math.ceil((new Date(nextUnlockDate) - new Date()) / (1000 * 60 * 60 * 24)))
    : null;

  const eyebrowText = isNotStarted
    ? "Esperando el inicio"
    : isFinished
    ? "Historia completa · 12 meses"
    : "Historia en curso · Mes " + currentMonth;

  const heroTitle = isNotStarted
    ? <><span className="text-gray-900">Algo</span><br /><em className="text-blue-600 not-italic font-serif">especial</em></>
    : isFinished
    ? <><span className="text-gray-900">Siempre</span><br /><em className="text-blue-600 not-italic font-serif">tú</em></>
    : <><span className="text-gray-900">Always</span><br /><em className="text-blue-600 not-italic font-serif">You</em></>;

  return (
    <div className="min-h-screen bg-white pt-24 pb-5 px-5">
      <div className="max-w-7xl mx-auto">

        {/* ── HERO ROW ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start mb-10">

          {/* Texto izquierda */}
          <div className="flex-1 min-w-0 pt-2">

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">
                {eyebrowText}
              </span>
            </div>

            {/* Título grande */}
            <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-[1.0] mb-5">
              {heroTitle}
            </h1>

            {/* Subtítulo */}
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-6">
              {isNotStarted
                ? "Dentro de poco comenzará nuestra historia. Cada momento contigo será un capítulo."
                : isFinished
                ? "Viviste todos los 12 capítulos. Pero nunca termina lo que sentimos."
                : "Nuestros 12 meses de momentos especiales, cartas y recuerdos juntos."
              }
            </p>

            {/* Progress compacto — solo cuando no es "not_started" */}
            {!isNotStarted && (
              <div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-xs text-gray-400">Progreso</span>
                  {loadingData
                    ? <SkeletonLine className="w-8" />
                    : <span className={"text-xs font-semibold " + (isFinished ? "text-green-600" : "text-blue-600")}>
                        {progress}%
                      </span>
                  }
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                  <div
                    className={"h-full rounded-full transition-all duration-1000 ease-out " + (isFinished ? "bg-green-500" : "bg-blue-500")}
                    style={{ width: loadingData ? "0%" : progress + "%" }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  {loadingData
                    ? <SkeletonLine className="w-32" />
                    : <span className="text-[11px] text-gray-400">
                        {isFinished ? "12 de 12 desbloqueadas" : currentMonth + " de 12 desbloqueadas"}
                      </span>
                  }
                  {!isFinished && (
                    loadingData
                      ? <SkeletonLine className="w-16" />
                      : <span className="text-[11px] text-gray-400">Mes {currentMonth} activo</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Foto teléfono */}
          <PhoneFrame imageUrl={PHOTO_URL} />
        </div>

        {/* ── COUNTDOWN ── */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {isFinished ? (
            <>
              <CountdownCard value={12}  label="Cartas"     loading={false} />
              <CountdownCard value={365} label="Días"       loading={false} />
              <CountdownCard value={12}  label="Meses"      loading={false} />
              <CountdownCard value={100} label="% historia" loading={false} />
            </>
          ) : (
            <>
              <CountdownCard value={timeLeft.months}  label="Meses"   loading={loadingData} />
              <CountdownCard value={timeLeft.days}    label="Días"    loading={loadingData} />
              <CountdownCard value={timeLeft.hours}   label="Horas"   loading={loadingData} />
              <CountdownCard value={timeLeft.minutes} label="Minutos" loading={loadingData} />
            </>
          )}
        </div>

        {/* ── BOTTOM ROW: frase + detalles ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Frase */}
          <div className="border border-gray-100 rounded-2xl p-6 flex flex-col justify-between min-h-[180px]">
            <div
              className="font-serif text-lg italic text-gray-800 leading-relaxed flex-1"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(5px)", transition: "opacity 0.34s ease, transform 0.34s ease" }}
            >
              <span className="text-4xl text-blue-200 font-serif leading-none select-none">&ldquo;</span>
              <p className="mt-1">{frase.text}</p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs font-medium text-blue-600">{message || frase.sub}</span>
              <div className="flex gap-1">
                {FRASES.map((_, i) => (
                  <div
                    key={i}
                    className={"h-1 rounded-full transition-all duration-300 " +
                      (i === fraseIdx ? "bg-blue-500 w-4" : "bg-gray-200 w-1")}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Detalles */}
          <div className="border border-gray-100 rounded-2xl p-5 flex flex-col gap-3">

            {/* Fila detalle */}
            {[
              {
                icon: <Calendar className="w-3.5 h-3.5" />,
                label: "Próximo desbloqueo",
                value: nextUnlockStr,
                show: !isFinished,
              },
              {
                icon: <Clock className="w-3.5 h-3.5" />,
                label: "Mes activo",
                value: "Carta " + currentMonth + " disponible",
                show: !isNotStarted && !isFinished,
              },
              {
                icon: <MessageCircle className="w-3.5 h-3.5" />,
                label: "Cartas vistas",
                value: viewedCount + " de " + (isFinished ? 12 : currentMonth),
                show: !isNotStarted,
              },
            ]
              .filter((r) => r.show)
              .map((row, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-500">
                    {row.icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700">{row.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {loadingData ? <SkeletonLine className="w-24" /> : row.value}
                    </p>
                  </div>
                </div>
              ))
            }

            {/* Pill días restantes */}
            {!isNotStarted && !isFinished && daysToNext !== null && daysToNext > 0 && (
              <div className="mt-auto flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5">
                <span className="text-xs font-medium text-blue-800">
                  Carta {currentMonth + 1} disponible en
                </span>
                {loadingData
                  ? <SkeletonLine className="w-14" />
                  : <span className="text-xs font-bold text-blue-600">{daysToNext} días</span>
                }
              </div>
            )}

            {/* Estado especial */}
            {(isNotStarted || isFinished) && (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 py-4">
                {isNotStarted
                  ? <Sparkles className="w-6 h-6 text-blue-300" />
                  : <CheckCircle2 className="w-6 h-6 text-green-400" />
                }
                <p className="text-xs text-gray-400 italic font-serif leading-relaxed max-w-[220px]">
                  {isNotStarted
                    ? "Aún no empieza… pero ya estoy preparando algo solo para ti"
                    : "Ya viviste toda la historia… pero nunca termina lo que sentimos"
                  }
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}