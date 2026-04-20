'use client'
import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from '../utils/axios'; 
import { Heart } from 'lucide-react'; 

const ProtectedRoute = ({ children, allowedRoles }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);
    // Cambiar loading a false inicialmente para evitar el flash
    const [loading, setLoading] = useState(false);
    const hasInitialized = useRef(false);
    const [isClient, setIsClient] = useState(false);

    // Marcar cuando estamos en cliente
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        // Solo ejecutar una vez
        if (hasInitialized.current) {
            console.log('⏭️ Ya inicializado, saltando');
            return;
        }
        
        console.log(`🔍 Verificación # - Path: ${pathname}`);
        
        // Verificar cache inmediatamente (síncrono)
        const cachedAuth = sessionStorage.getItem('auth_cache');
        if (cachedAuth) {
            const { role, expiresAt } = JSON.parse(cachedAuth);
            const now = Date.now();
            
            if (now < expiresAt) {
                console.log('✅ Usando cache - rol:', role);
                if (allowedRoles && !allowedRoles.includes(role)) {
                    router.push('/auth/login');
                } else {
                    setAuthorized(true);
                    setLoading(false);
                    hasInitialized.current = true;
                    return;
                }
            }
        }
        
        // Si no hay cache, mostrar loader y consultar
        setLoading(true);
        
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/auth/check-auth', { 
                    withCredentials: true,
                    timeout: 10000
                });
                
                const { role } = response.data;
                
                sessionStorage.setItem('auth_cache', JSON.stringify({
                    role,
                    expiresAt: Date.now() + 5 * 60 * 1000
                }));
                
                if (allowedRoles && !allowedRoles.includes(role)) {
                    router.push('/auth/login');
                } else {
                    setAuthorized(true);
                }
            } catch (error) {
                console.error('Auth error:', error);
                router.push('/auth/login');
            } finally {
                setLoading(false);
                hasInitialized.current = true;
            }
        };

        checkAuth();
    }, []); // Array vacío - solo ejecutar una vez

    // No mostrar nada hasta que estemos en cliente (evita hydration mismatch)
    if (!isClient) {
        return null;
    }

    // Solo mostrar loader si está cargando Y no hay cache
    if (loading && !sessionStorage.getItem('auth_cache')) {
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
                        "Preparando tu espacio especial..."
                    </p>
                    <p className="text-gray-400 text-sm mb-4">
                        Puede tardar unos segundos
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full animate-shimmer" style={{ width: '70%' }}></div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-4">
                        Always You 💙
                    </p>
                </div>
            </div>
        );
    }

    if (!authorized && !sessionStorage.getItem('auth_cache')) return null;

    return <>{children}</>;
};

export default ProtectedRoute;