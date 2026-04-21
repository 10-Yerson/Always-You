'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Home, ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4">
            <div className="text-center max-w-md mx-auto">
                
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30 animate-ping"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-200 transform rotate-6">
                        <Heart className="w-12 h-12 text-white fill-white animate-pulse" />
                    </div>
                </div>

                <h1 className="text-8xl font-bold text-gray-800 mb-2">404</h1>
                
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                    ¡Ups! Página no encontrada
                </h2>
                
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                </div>
                
                <p className="text-gray-500 mb-8">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-blue-200 transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Volver atrás</span>
                    </button>
                    
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-200"
                    >
                        <Home className="w-4 h-4" />
                        <span>Ir al inicio</span>
                    </Link>
                </div>

                <div className="flex justify-center gap-2 mt-8">
                    <Sparkles className="w-4 h-4 text-blue-300" />
                    <Heart className="w-4 h-4 text-pink-300 fill-pink-300" />
                    <Sparkles className="w-4 h-4 text-blue-300" />
                </div>
            </div>
        </div>
    );
}