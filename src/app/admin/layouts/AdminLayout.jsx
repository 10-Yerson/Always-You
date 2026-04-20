// app/admin/layout.js
'use client'
import { useAuth } from '@/context/AuthContext';
import Sidebar from "../components/Sidebar";
import { Heart } from 'lucide-react';

export default function AdminLayout({ children }) {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-sm mx-4">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30 animate-ping"></div>
                        <div className="relative w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-200 transform rotate-6">
                            <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
                        </div>
                    </div>
                    <p className="text-gray-600 italic mb-2">
                        "Cargando panel de administración..."
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="w-full lg:ml-72 min-h-screen pb-20 lg:pb-0 lg:px-0">
                {children}
            </div>
        </div>
    );
}