// contexts/AuthContext.js
'use client'
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from '../utils/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const initAuth = async () => {
            // Verificar cache inmediatamente
            const cached = sessionStorage.getItem('user_data');
            if (cached) {
                try {
                    const { role, timestamp } = JSON.parse(cached);
                    if (Date.now() - timestamp < 10 * 60 * 1000) {
                        setUser({ role });
                        setLoading(false);
                        return;
                    }
                } catch (e) {}
            }

            try {
                const response = await axios.get('/api/auth/check-auth', { 
                    withCredentials: true,
                    timeout: 15000
                });
                const userData = { role: response.data.role };
                setUser(userData);
                sessionStorage.setItem('user_data', JSON.stringify({
                    role: userData.role,
                    timestamp: Date.now()
                }));
            } catch (error) {
                console.error('Auth error:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    // Verificar permisos por ruta
    useEffect(() => {
        if (!loading) {
            const isAdminRoute = pathname?.startsWith('/admin');
            const isClientRoute = pathname?.startsWith('/client');
            
            if (!user && (isAdminRoute || isClientRoute)) {
                router.push('/auth/login');
            } else if (user && isAdminRoute && user.role !== 'admin') {
                router.push('/client');
            } else if (user && isClientRoute && user.role !== 'user') {
                router.push('/admin');
            }
        }
    }, [user, loading, pathname, router]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}