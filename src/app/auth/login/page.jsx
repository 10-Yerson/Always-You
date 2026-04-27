'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from '../../../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, Loader2, Eye, EyeOff, Heart, Sparkles, CheckCircle, Star, AlertCircle } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });
    const router = useRouter();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('/api/auth/check-auth', { withCredentials: true });
                const { role } = response.data;
                router.push(role === 'admin' ? '/admin' : '/client');
            } catch (error) {
                // No autenticado, permanece en login
                console.log('Usuario no autenticado');
            }
        };

        checkAuthStatus();
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email && !password) {
            toast.error('Por favor, ingresa tu correo y contraseña');
            setErrors({ email: 'El correo es obligatorio', password: 'La contraseña es obligatoria' });
            return;
        }
        if (!email) {
            toast.error('Por favor, ingresa tu correo electrónico');
            setErrors({ email: 'El correo es obligatorio', password: '' });
            return;
        }
        if (!password) {
            toast.error('Por favor, ingresa tu contraseña');
            setErrors({ email: '', password: 'La contraseña es obligatoria' });
            return;
        }

        setLoading(true);
        setErrors({ email: '', password: '' });

        try {
            const response = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
            const { role } = response.data;

            toast.success('¡Bienvenido de vuelta!');

            setTimeout(() => {
                router.push(role === 'admin' ? '/admin' : '/client');
            }, 500);
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'Error al iniciar sesión';

            if (errorMsg === 'Todos los campos son obligatorios') {
                toast.info('Todos los campos son obligatorios');
                setErrors({ email: 'Campo requerido', password: 'Campo requerido' });
            }
            else if (errorMsg === 'Correo no registrado') {
                toast.info('Correo no registrado');
                setErrors({ email: 'Correo no registrado', password: '' });
            }
            else if (errorMsg === 'Contraseña incorrecta') {
                toast.info('Contraseña incorrecta');
                setErrors({ email: '', password: 'Contraseña incorrecta' });
            }
            else {
                toast.error(errorMsg);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Contenedor principal centrado */}
            <div className="min-h-screen flex items-center justify-center px-4 py-12">

                {/* Tarjeta principal */}
                <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">

                    <div className="grid lg:grid-cols-2">

                        {/* Panel Izquierdo - FORMULARIO */}
                        <div className="px-8 py-6 lg:p-12 bg-white relative overflow-hidden">

                            <div className="mb-3 relative z-10 flex justify-end">
                                <Link
                                    href="/"
                                    className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group"
                                >
                                    <svg className="w-3 h-3 text-gray-700 group-hover:text-blue-500 group-hover:-translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </Link>
                            </div>
                            {/* Elementos decorativos de fondo */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-30"></div>

                            {/* Corazones decorativos flotantes */}
                            {/* <div className="absolute top-20 right-10 opacity-10 animate-float">
                                <Heart className="w-8 h-8 text-blue-400" />
                            </div>
                            <div className="absolute bottom-20 left-10 opacity-10 animate-float-delay">
                                <Heart className="w-6 h-6 text-blue-400" />
                            </div> */}

                            {/* Logo móvil */}
                            <div className="lg:hidden flex items-center justify-center mb-8 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                        <Heart className="w-5 h-5 text-white fill-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">Always You</h1>
                                        <p className="text-xs text-gray-500">Siempre tú 💙</p>
                                    </div>
                                </div>
                            </div>

                            {/* Header */}
                            <div className="mb-8 text-center lg:text-left relative z-10">

                                <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-4 lg:hidden">
                                    <Heart className="w-3 h-3 text-blue-500 fill-blue-500" />
                                    <span className="text-xs font-medium text-blue-600">Bienvenido</span>
                                </div>

                                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                    Iniciar Sesión
                                </h2>
                                <p className="text-gray-500">
                                    Ingresa tus credenciales para acceder a tu espacio
                                </p>

                                <div className="flex justify-center lg:justify-start mt-3">
                                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                                </div>
                            </div>

                            {/* Formulario */}
                            <form onSubmit={handleLogin} className="space-y-6 relative z-10">

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Correo electrónico
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setErrors({ ...errors, email: '' });
                                            }}
                                            required
                                            className={`block w-full pl-11 pr-4 py-3.5 border rounded-xl
                                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                                     transition-all duration-300 text-gray-900 placeholder-gray-400
                                                     hover:border-blue-300 hover:shadow-sm
                                                     bg-gray-50 hover:bg-white
                                                     ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                                            placeholder="tu@email.com"
                                        />
                                        {errors.email && (
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                                <AlertCircle className="w-5 h-5 text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                    {errors.email && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Contraseña
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setErrors({ ...errors, password: '' });
                                            }}
                                            required
                                            className={`block w-full pl-11 pr-12 py-3.5 border rounded-xl
                                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                                     transition-all duration-300 text-gray-900 placeholder-gray-400
                                                     hover:border-blue-300 hover:shadow-sm
                                                     bg-gray-50 hover:bg-white
                                                     ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" />
                                            )}
                                        </button>
                                        {errors.password && (
                                            <div className="absolute inset-y-0 right-12 pr-4 flex items-center">
                                                <AlertCircle className="w-5 h-5 text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                    {errors.password && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Botón */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 
                                             bg-blue-500 
                                             hover:bg-blue-600
                                             text-white font-semibold rounded-xl
                                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                             disabled:opacity-50 disabled:cursor-not-allowed
                                             transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                                             shadow-lg shadow-blue-200 hover:shadow-xl
                                             relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Ingresando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="w-5 h-5" />
                                            <span>Iniciar Sesión</span>
                                        </>
                                    )}
                                </button>

                                {/* Registro */}
                                <div className="text-center pt-2">
                                    <p className="text-gray-500 text-sm">
                                        ¿No tienes una cuenta?{' '}
                                        <Link
                                            href="/"
                                            className="font-semibold text-blue-500 hover:text-blue-600 transition-colors hover:underline inline-flex items-center gap-1"
                                        >
                                            Contáctanos
                                            <Sparkles className="w-3 h-3" />
                                        </Link>
                                    </p>
                                </div>

                            </form>

                            {/* Footer */}
                            <div className="mt-8 pt-6 border-t border-gray-100 relative z-10">
                                <div className="flex justify-center gap-1 mb-2">
                                    <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
                                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                                    <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                                    <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
                                </div>
                                <p className="text-xs text-center text-gray-400">
                                    Al iniciar sesión, aceptas nuestros términos de servicio
                                </p>
                                <div className="flex justify-center gap-2 mt-3">
                                    <Heart className="w-2 h-2 text-pink-300 fill-pink-300" />
                                    <Heart className="w-2 h-2 text-pink-400 fill-pink-400" />
                                    <Heart className="w-2 h-2 text-pink-500 fill-pink-500" />
                                </div>
                            </div>
                        </div>

                        {/* Panel Derecho - IMAGEN */}
                        <div className="relative min-h-[500px] lg:min-h-full overflow-hidden">
                            {/* Imagen de fondo */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md scale-110"
                                style={{
                                    backgroundImage: `url('https://res.cloudinary.com/dbgj8dqup/image/upload/v1776465505/Picsart_26-04-17_17-30-35-869_qgmlhu.jpg')`
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            </div>

                            {/* Líneas decorativas */}
                            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-white/20 rounded-tl-3xl"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-white/20 rounded-br-3xl"></div>

                            {/* Círculos decorativos */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/5 rounded-full"></div>

                            {/* Contenido */}
                            <div className="relative z-10 text-white p-8 lg:p-12 flex flex-col justify-between min-h-[500px] lg:min-h-full">

                                {/* Logo */}
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                            <Heart className="w-5 h-5 text-blue-600 fill-blue-600" />
                                        </div>
                                        <div>
                                            <h1 className="text-xl font-bold">Always You</h1>
                                            <p className="text-white/60 text-xs">Siempre, siempre tú 💙</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Mensaje centrado */}
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold mb-3">Bienvenida</h2>
                                    <div className="w-12 h-0.5 bg-white/40 mx-auto mb-4"></div>
                                    <p className="text-white/70">
                                        Un espacio creado con amor<br />
                                        para nuestra historia
                                    </p>
                                </div>

                                {/* Indicador inferior */}
                                <div className="flex justify-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                                    <div className="w-1.5 h-1.5 bg-white/80 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}