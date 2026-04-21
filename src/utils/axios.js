import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
});

// Variable para evitar múltiples redirecciones
let isRedirecting = false;

// Lista de rutas que no deben ser interceptadas
const publicRoutes = ['/api/auth/login', '/api/auth/register', '/api/auth/check-auth'];

// Interceptor para manejar errores de autenticación
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        const isPublicRoute = publicRoutes.some(route => originalRequest.url?.includes(route));
        
        // Si el error es 401 y NO es una ruta pública
        if (error.response?.status === 401 && !isPublicRoute && !isRedirecting) {
            isRedirecting = true;
            
            // Limpiar caché de autenticación
            if (typeof window !== 'undefined') {
                sessionStorage.removeItem('auth_checked');
                sessionStorage.removeItem('user_role');
                sessionStorage.removeItem('auth_timestamp');
                sessionStorage.removeItem('user_data');
                
                // Redirigir al login
                window.location.href = '/auth/login';
            }
        }
        
        return Promise.reject(error);
    }
);

export default instance;