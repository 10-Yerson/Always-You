'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from '@/utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Heart, Shield, ArrowLeft, Loader2, Eye, EyeOff, Key } from 'lucide-react';

export default function EmergencyAccess() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [verified, setVerified] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Verificar contraseña de emergencia
    const verificarPassword = async () => {
        if (!password.trim()) {
            toast.error('Ingresa la contraseña de emergencia');
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post('/api/auth/emergencia', { password });
            if (data.success) {
                setVerified(true);
                toast.success('Contraseña correcta');
                setPassword('');
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Contraseña incorrecta');
        } finally {
            setLoading(false);
        }
    };

    // Registrar administrador
    const registrarAdmin = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (!formData.name || !formData.apellido || !formData.email) {
            toast.error('Todos los campos son obligatorios');
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post('/api/auth/register/admin', {
                name: formData.name,
                apellido: formData.apellido,
                email: formData.email,
                password: formData.password
            });
            toast.success('Administrador registrado con éxito');
            setTimeout(() => {
                router.push('/auth/login');
            }, 2000);
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error al registrar');
        } finally {
            setLoading(false);
        }
    };

    if (!verified) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-100 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Fondo decorativo sutil */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-400/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-400/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-300/5 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-md w-full relative z-10">
                    {/* Botón volver */}
                    <Link
                        href="/auth/login"
                        className="group inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 transition-all duration-300 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/80 shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="text-sm font-medium">Volver al login</span>
                    </Link>

                    {/* Tarjeta principal */}
                    <div className="relative">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-semibold text-white tracking-tight">Acceso de Emergencia</h1>
                                        <p className="text-slate-300 text-sm">Recuperación de administrador</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-7">
                                {/* Ícono */}
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                                        <Key className="w-7 h-7 text-slate-500" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-slate-800 mt-4">Contraseña de Emergencia</h2>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Solo el administrador tiene acceso
                                    </p>
                                </div>

                                {/* Campo de contraseña */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Contraseña
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Key className="w-4 h-4 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Ingresa la contraseña"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && verificarPassword()}
                                            className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-300 bg-slate-50"
                                            autoFocus
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Botón verificar */}
                                <button
                                    onClick={verificarPassword}
                                    disabled={loading}
                                    className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Verificando...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <Shield className="w-4 h-4" />
                                            Verificar acceso
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Footer */}
                            <div className="px-7 py-4 bg-slate-50 border-t border-slate-100">
                                <div className="flex items-center justify-center gap-2">
                                    <Heart className="w-3 h-3 text-slate-400" />
                                    <span className="text-xs text-slate-500">Acceso restringido</span>
                                    <Heart className="w-3 h-3 text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer position="top-right" />
            </div>
        );

    }

    return (
        <div className="h-[100vh] bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-100 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-md w-full relative z-10">
                <Link
                    href="/auth/login"
                    className="group inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-4 transition-all duration-300 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/80 shadow-sm text-sm"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="text-sm font-medium">Volver al login</span>
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                <Heart className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-white">Registrar Administrador</h1>
                                <p className="text-slate-300 text-xs">Crea tu cuenta de acceso</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5">
                        <form onSubmit={registrarAdmin} className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Nombre</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-300 bg-slate-50"
                                        placeholder="Nombre"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Apellido</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.apellido}
                                        onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-300 bg-slate-50"
                                        placeholder="Apellido"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Correo electrónico</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-300 bg-slate-50"
                                    placeholder="admin@ejemplo.com"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Contraseña</label>
                                    <div className="relative">
                                        <input
                                            type={showRegisterPassword ? "text" : "password"}
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-300 bg-slate-50 pr-9"
                                            placeholder="********"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            {showRegisterPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Confirmar</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            required
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-300 bg-slate-50 pr-9"
                                            placeholder="********"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-slate-600 hover:bg-slate-700 text-white py-2.5 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed mt-3 text-sm"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Registrando...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <Heart className="w-4 h-4" />
                                        Registrar Administrador
                                    </span>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
                        <div className="flex items-center justify-center gap-2">
                            <Heart className="w-2.5 h-2.5 text-slate-400" />
                            <span className="text-[11px] text-slate-500">Acceso restringido</span>
                            <Heart className="w-2.5 h-2.5 text-slate-400" />
                        </div>
                    </div>
                </div>
                <ToastContainer position="top-right" />
            </div>
        </div>
    );
}