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
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    {/* Botón volver */}
                    <Link 
                        href="/auth/login" 
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        <span className="text-sm">Volver al login</span>
                    </Link>

                    {/* Tarjeta principal */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white">Acceso de Emergencia</h1>
                                    <p className="text-red-100 text-xs">Recuperación de administrador</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="text-center mb-4">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Key className="w-8 h-8 text-red-600" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">Contraseña de Emergencia</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Ingresa la contraseña para continuar
                                </p>
                            </div>
                            
                            <div className="relative mb-4">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Contraseña de emergencia"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && verificarPassword()}
                                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-slate-50 pr-10"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            
                            <button
                                onClick={verificarPassword}
                                disabled={loading}
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-all disabled:opacity-50"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Verificando...
                                    </span>
                                ) : (
                                    'Verificar acceso'
                                )}
                            </button>
                        </div>

                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                            <div className="flex items-center justify-center gap-2">
                                <Heart className="w-3 h-3 text-red-400" />
                                <span className="text-xs text-gray-400">Acceso restringido - Solo administrador</span>
                                <Heart className="w-3 h-3 text-red-400" />
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        );
    }

    // Formulario de registro de administrador
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <Link 
                    href="/auth/login" 
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span className="text-sm">Volver al login</span>
                </Link>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <Heart className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Registrar Administrador</h1>
                                <p className="text-green-100 text-xs">Crea tu cuenta de acceso</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <form onSubmit={registrarAdmin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-slate-50"
                                    placeholder="Tu nombre"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Apellido</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.apellido}
                                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-slate-50"
                                    placeholder="Tu apellido"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Correo electrónico</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-slate-50"
                                    placeholder="admin@ejemplo.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Contraseña</label>
                                <div className="relative">
                                    <input
                                        type={showRegisterPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-slate-50 pr-10"
                                        placeholder="********"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Confirmar contraseña</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-slate-50 pr-10"
                                        placeholder="********"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-all disabled:opacity-50 mt-4"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Registrando...
                                    </span>
                                ) : (
                                    'Registrar Administrador'
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                        <div className="flex items-center justify-center gap-2">
                            <Heart className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-gray-400">Acceso restringido - Solo administrador</span>
                            <Heart className="w-3 h-3 text-green-400" />
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}