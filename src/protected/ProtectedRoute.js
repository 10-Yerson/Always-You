'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../utils/axios'; 

const ProtectedRoute = ({ children, allowedRoles }) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            // Añadir delay artificial de 2 segundos
            // await new Promise(resolve => setTimeout(resolve, 4000));
            
            try {
                const response = await axios.get('/api/auth/check-auth', { withCredentials: true });
                const { role } = response.data;

                if (allowedRoles && !allowedRoles.includes(role)) {
                    router.push('/auth/login');
                } else {
                    setAuthorized(true);
                }
            } catch (error) {
                router.push('/auth/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router, allowedRoles]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-sm mx-4">
                    {/* Logo animado */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30 animate-ping"></div>
                        <div className="relative w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-200 transform rotate-6">
                            <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
                        </div>
                    </div>

                    {/* Frase */}
                    <p className="text-gray-600 italic mb-2">
                        "Preparando tu espacio especial..."
                    </p>

                    {/* Puede tardar unos segundos */}
                    <p className="text-gray-400 text-sm mb-4">
                        Puede tardar unos segundos
                    </p>

                    {/* Barra de progreso animada */}
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full animate-shimmer" style={{ width: '70%' }}></div>
                    </div>

                    {/* Texto pequeño */}
                    <p className="text-[10px] text-gray-400 mt-4">
                        Always You 💙
                    </p>
                </div>
            </div>
        );
    }

    if (!authorized) return null;

    return <>{children}</>;
};

export default ProtectedRoute;