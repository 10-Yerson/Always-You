'use client'

import React, { useState, useEffect } from 'react';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';

export default function AdminPanel() {
    // Estados para tabs
    const [activeTab, setActiveTab] = useState('profile'); // profile, users, admins, register

    // Estados para perfil de admin
    const [myProfile, setMyProfile] = useState({
        name: '',
        apellido: '',
        email: '',
        genero: ''
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [uploading, setUploading] = useState(false);
    // Estado para mostrar/ocultar contraseña
    const [showPassword, setShowPassword] = useState(false);

    // Estados para usuarios
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [userForm, setUserForm] = useState({
        name: '',
        apellido: '',
        email: '',
        genero: '',
        telefono: '',
        isActive: true
    });

    // Estados para admins
    const [admins, setAdmins] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [adminModalOpen, setAdminModalOpen] = useState(false);
    const [adminForm, setAdminForm] = useState({
        name: '',
        apellido: '',
        email: '',
        genero: ''
    });

    // Estados para registro
    const [registerForm, setRegisterForm] = useState({
        name: '',
        apellido: '',
        email: '',
        password: '',
        genero: '',
        telefono: '',
        role: 'user' // user o admin
    });

    // Estados comunes
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // ========== PERFIL DE ADMIN ==========
    const loadMyProfile = async () => {
        try {
            const { data } = await axios.get('/api/admin/me');
            setMyProfile(data.admin);
        } catch (error) {
            toast.error('Error al cargar perfil');
        }
    };

    const updateMyProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.put('/api/admin/me', myProfile);
            toast.success(data.msg || 'Perfil actualizado');
            loadMyProfile();
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error al actualizar');
        } finally {
            setLoading(false);
        }
    };

    const uploadProfilePicture = async (file) => {
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const { data } = await axios.put('/api/admin/profile-picture', formData);
            toast.success('Foto actualizada');
            loadMyProfile();
            setSelectedFile(null);
        } catch (error) {
            toast.error('Error al subir foto');
        } finally {
            setUploading(false);
        }
    };

    const deleteMyAccount = async () => {
        if (confirm('¿Estás seguro de eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            try {
                await axios.delete('/api/admin/me');
                toast.success('Cuenta eliminada');
                setTimeout(() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }, 2000);
            } catch (error) {
                toast.error('Error al eliminar cuenta');
            }
        }
    };

    // ========== GESTIÓN DE USUARIOS ==========
    const loadUsers = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/user');
            setUsers(data.users || data);
        } catch (error) {
            toast.error('Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (id, userData) => {
        try {
            const { data } = await axios.put(`/api/user/${id}`, userData);
            toast.success('Usuario actualizado');
            loadUsers();
            setUserModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error al actualizar');
        }
    };

    const deleteUser = async (id, name) => {
        if (confirm(`¿Eliminar a ${name}?`)) {
            try {
                await axios.delete(`/api/user/${id}`);
                toast.success('Usuario eliminado');
                loadUsers();
            } catch (error) {
                toast.error('Error al eliminar');
            }
        }
    };

    const uploadUserPicture = async (id, file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const { data } = await axios.put(`/api/user/${id}/picture`, formData);
            toast.success('Foto actualizada');
            loadUsers();
        } catch (error) {
            toast.error('Error al subir foto');
        }
    };

    const deleteUserPicture = async (id) => {
        if (confirm('¿Eliminar foto de perfil?')) {
            try {
                await axios.delete(`/api/user/${id}/picture`);
                toast.success('Foto eliminada');
                loadUsers();
            } catch (error) {
                toast.error('Error al eliminar foto');
            }
        }
    };

    // ========== GESTIÓN DE ADMINS ==========
    const loadAdmins = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/admin');
            setAdmins(data.admins || data);
        } catch (error) {
            toast.error('Error al cargar admins');
        } finally {
            setLoading(false);
        }
    };

    const updateAdmin = async (id, adminData) => {
        try {
            const { data } = await axios.put(`/api/admin/${id}`, adminData);
            toast.success('Admin actualizado');
            loadAdmins();
            setAdminModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error al actualizar');
        }
    };

    const deleteAdmin = async (id, name) => {
        if (confirm(`¿Eliminar al admin ${name}?`)) {
            try {
                await axios.delete(`/api/admin/${id}`);
                toast.success('Admin eliminado');
                loadAdmins();
            } catch (error) {
                toast.error('Error al eliminar');
            }
        }
    };

    const uploadAdminPicture = async (id, file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const { data } = await axios.put(`/api/admin/${id}/profile-picture`, formData);
            toast.success('Foto actualizada');
            loadAdmins();
        } catch (error) {
            toast.error('Error al subir foto');
        }
    };

    // ========== REGISTRO ==========
    const registerUserOrAdmin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const endpoint = registerForm.role === 'admin' ? '/api/auth/register/admin' : '/api/auth/register';
            const { data } = await axios.post(endpoint, registerForm);
            toast.success(data.msg || 'Registro exitoso');
            setRegisterForm({
                name: '',
                apellido: '',
                email: '',
                password: '',
                genero: '',
                telefono: '',
                role: 'user'
            });
            if (registerForm.role === 'user') loadUsers();
            else loadAdmins();
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error al registrar');
        } finally {
            setLoading(false);
        }
    };

    // ========== EFECTOS ==========
    useEffect(() => {
        loadMyProfile();
        loadUsers();
        loadAdmins();
    }, []);

    // ========== RENDER ==========
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

            {/* Tabs estilo neón - Versión responsive */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8 p-2 bg-white rounded-2xl shadow-lg">

                {/* Mi Perfil */}
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`relative flex-1 min-w-[calc(50%-0.5rem)] sm:min-w-0 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'profile'
                        ? 'text-slate-700 bg-slate-100 shadow-md border border-slate-200'
                        : 'text-gray-400 hover:text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <span className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 sm:w-12 h-1 rounded-full transition-all duration-300 ${activeTab === 'profile' ? 'bg-slate-400 shadow-lg shadow-slate-200' : 'opacity-0'
                        }`}></span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <span className="text-xs sm:text-base">Mi Perfil</span>
                </button>

                {/* Usuarios */}
                <button
                    onClick={() => setActiveTab('users')}
                    className={`relative flex-1 min-w-[calc(50%-0.5rem)] sm:min-w-0 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'users'
                        ? 'text-teal-700 bg-teal-50 shadow-md border border-teal-200'
                        : 'text-gray-400 hover:text-teal-600 hover:bg-teal-50'
                        }`}
                >
                    <span className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 sm:w-12 h-1 rounded-full transition-all duration-300 ${activeTab === 'users' ? 'bg-teal-400 shadow-lg shadow-teal-200' : 'opacity-0'
                        }`}></span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V17h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-1 .05 1.16.84 2 1.87 2 3.45V17h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                    <span className="text-xs sm:text-base">Usuarios</span>
                </button>

                {/* Administradores */}
                <button
                    onClick={() => setActiveTab('admins')}
                    className={`relative flex-1 min-w-[calc(50%-0.5rem)] sm:min-w-0 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'admins'
                        ? 'text-indigo-700 bg-indigo-50 shadow-md border border-indigo-200'
                        : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                        }`}
                >
                    <span className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 sm:w-12 h-1 rounded-full transition-all duration-300 ${activeTab === 'admins' ? 'bg-indigo-400 shadow-lg shadow-indigo-200' : 'opacity-0'
                        }`}></span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                    </svg>
                    <span className="text-xs sm:text-base">Administradores</span>
                </button>

                {/* Registrar */}
                <button
                    onClick={() => setActiveTab('register')}
                    className={`relative flex-1 min-w-[calc(50%-0.5rem)] sm:min-w-0 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'register'
                        ? 'text-cyan-700 bg-cyan-50 shadow-md border border-cyan-200'
                        : 'text-gray-400 hover:text-cyan-600 hover:bg-cyan-50'
                        }`}
                >
                    <span className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 sm:w-12 h-1 rounded-full transition-all duration-300 ${activeTab === 'register' ? 'bg-cyan-400 shadow-lg shadow-cyan-200' : 'opacity-0'
                        }`}></span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    <span className="text-xs sm:text-base">Registrar</span>
                </button>
            </div>

            {/* ========== MI PERFIL - Diseño Moderno ========== */}
            {activeTab === 'profile' && (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header con gradiente apagado */}
                    <div className="relative bg-gradient-to-r from-white to-slate-50 border-b border-slate-100 px-6 py-5 overflow-hidden">
                        <div className="relative flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-800">Mi Perfil</h2>
                                <p className="text-slate-400 text-xs mt-0.5">Administra tu información personal</p>
                            </div>
                            <div className="hidden md:block">
                                <svg className="w-10 h-10 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                        </div>
                    </div>


                    <div className="p-6">
                        {/* Foto de perfil - Sin glow */}
                        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                            <div className="relative group">
                                <img
                                    src={myProfile.profileUrl}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-2 border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-300"
                                />
                                <label className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center cursor-pointer">
                                    <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && uploadProfilePicture(e.target.files[0])} />
                                </label>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && uploadProfilePicture(e.target.files[0])} />
                                        Subir foto
                                    </label>
                                    {uploading && (
                                        <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg">
                                            <svg className="w-3.5 h-3.5 animate-spin text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span className="text-xs text-slate-500">Subiendo...</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Formatos: JPG, PNG, GIF (Max 5MB)</p>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 my-5"></div>

                        {/* Formulario */}
                        <form onSubmit={updateMyProfile} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="group">
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5 group-focus-within:text-slate-700 transition-colors">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Tu nombre"
                                        value={myProfile.name || ''}
                                        onChange={(e) => setMyProfile({ ...myProfile, name: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-transparent transition-all duration-300 bg-slate-50 hover:bg-white"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5 group-focus-within:text-slate-700 transition-colors">
                                        Apellido
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Tu apellido"
                                        value={myProfile.apellido || ''}
                                        onChange={(e) => setMyProfile({ ...myProfile, apellido: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-transparent transition-all duration-300 bg-slate-50 hover:bg-white"
                                    />
                                </div>

                                <div className="group md:col-span-2">
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5 group-focus-within:text-slate-700 transition-colors">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={myProfile.email || ''}
                                        onChange={(e) => setMyProfile({ ...myProfile, email: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-transparent transition-all duration-300 bg-slate-50 hover:bg-white"
                                    />
                                </div>

                                <div className="group md:col-span-2">
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5 group-focus-within:text-slate-700 transition-colors">
                                        Género
                                    </label>
                                    <select
                                        value={myProfile.genero || ''}
                                        onChange={(e) => setMyProfile({ ...myProfile, genero: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-transparent transition-all duration-300 bg-slate-50 hover:bg-white"
                                    >
                                        <option value="">Seleccionar género</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                            </div>

                            {/* Botones más pequeños */}
                            <div className="flex flex-col sm:flex-row gap-2 pt-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Actualizar Perfil
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={deleteMyAccount}
                                    className="flex-1 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 flex items-center justify-center gap-1.5"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Eliminar Cuenta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ========== USUARIOS - Tarjetas de 3 en 3 con solo iconos ========== */}
            {activeTab === 'users' && (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                    <div className="relative bg-gradient-to-r from-white to-slate-50 border-b border-slate-100 px-6 py-5 overflow-hidden">
                        <div className="relative flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-800">Gestión de Usuarios</h2>
                                <p className="text-slate-400 text-xs mt-0.5">Administra todos los usuarios registrados</p>
                            </div>
                            <div className="hidden md:block">
                                <svg className="w-10 h-10 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Grid de cards - 3 columnas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {users.map((user) => (
                                <div key={user._id} className="group cursor-pointer">
                                    <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:shadow-xl transition-all duration-500">
                                        {/* Foto de perfil como fondo */}
                                        <div className="relative h-[420px]">
                                            <img
                                                src={user.profilePicture}
                                                alt={user.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Icono de vista en hover */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                <div className="bg-white/20 backdrop-blur-md rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* CONTENIDO INFERIOR */}
                                            <div className="absolute bottom-0 left-0 right-0 px-4 py-4 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10 bg-gradient-to-t from-white via-white/95 to-transparent rounded-t-2xl">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="w-1 h-3 rounded-full bg-teal-500" />
                                                    <p className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold">Usuario</p>
                                                </div>
                                                <h3 className="text-base font-serif font-bold text-gray-900 leading-tight mb-0.5">
                                                    {user.name} {user.apellido}
                                                </h3>
                                                <p className="text-[11px] text-gray-500 line-clamp-1 leading-relaxed mb-1">{user.email}</p>
                                                {user.telefono && (
                                                    <p className="text-[10px] text-gray-400 line-clamp-1 mb-2">{user.telefono}</p>
                                                )}

                                                {/* Botones - SOLO ICONOS */}
                                                <div className="flex justify-center gap-3 mt-3">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setUserForm(user);
                                                            setUserModalOpen(true);
                                                        }}
                                                        className="p-2 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-600 transition-all duration-200"
                                                        title="Editar usuario"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>

                                                    <label className="p-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white transition-all duration-200 cursor-pointer" title="Subir foto">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                        </svg>
                                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && uploadUserPicture(user._id, e.target.files[0])} />
                                                    </label>

                                                    <button
                                                        onClick={() => deleteUserPicture(user._id)}
                                                        className="p-2 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-600 transition-all duration-200"
                                                        title="Restaurar foto por defecto"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                        </svg>
                                                    </button>

                                                    <button
                                                        onClick={() => deleteUser(user._id, user.name)}
                                                        className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-200"
                                                        title="Eliminar usuario"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mensaje cuando no hay usuarios */}
                        {users.length === 0 && (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <p className="text-gray-400 text-sm">No hay usuarios registrados</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ========== ADMINISTRADORES - Tarjetas de 3 en 3 con solo iconos ========== */}
            {activeTab === 'admins' && (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                    <div className="relative bg-gradient-to-r from-white to-slate-50 border-b border-slate-100 px-6 py-5 overflow-hidden">
                        <div className="relative flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-800">Gestión de Administradores</h2>
                                <p className="text-slate-400 text-xs mt-0.5">Administra todos los administradores registrados</p>
                            </div>
                            <div className="hidden md:block">
                                <svg className="w-10 h-10 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Grid de cards - 3 columnas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {admins.map((admin) => (
                                <div key={admin._id} className="group cursor-pointer">
                                    <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:shadow-xl transition-all duration-500">
                                        {/* Foto de perfil como fondo */}
                                        <div className="relative h-[420px]">
                                            <img
                                                src={admin.profileUrl}
                                                alt={admin.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Badge de rol */}
                                            <div className="absolute top-3 right-3 bg-white backdrop-blur-sm border border-gray-200 rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                                <span className="text-[9px] font-medium text-gray-600 uppercase tracking-wide">{admin.role}</span>
                                            </div>

                                            {/* Icono de vista en hover */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                <div className="bg-white/20 backdrop-blur-md rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* CONTENIDO INFERIOR */}
                                            <div className="absolute bottom-0 left-0 right-0 px-4 py-4 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10 bg-gradient-to-t from-white via-white/95 to-transparent rounded-t-2xl">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="w-1 h-3 rounded-full bg-blue-500" />
                                                    <p className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold">Administrador</p>
                                                </div>
                                                <h3 className="text-base font-serif font-bold text-gray-900 leading-tight mb-0.5">
                                                    {admin.name} {admin.apellido}
                                                </h3>
                                                <p className="text-[11px] text-gray-500 line-clamp-1 leading-relaxed mb-2">{admin.email}</p>

                                                {/* Botones - SOLO ICONOS */}
                                                <div className="flex justify-center gap-3 mt-3">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedAdmin(admin);
                                                            setAdminForm(admin);
                                                            setAdminModalOpen(true);
                                                        }}
                                                        className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all duration-200"
                                                        title="Editar administrador"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>

                                                    <label className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 cursor-pointer" title="Subir foto">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                        </svg>
                                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && uploadAdminPicture(admin._id, e.target.files[0])} />
                                                    </label>

                                                    <button
                                                        onClick={() => deleteAdmin(admin._id, admin.name)}
                                                        className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all duration-200"
                                                        title="Eliminar administrador"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mensaje cuando no hay administradores */}
                        {admins.length === 0 && (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                                </svg>
                                <p className="text-gray-400 text-sm">No hay administradores registrados</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ========== REGISTRO - Versión Mediana con Slate ========== */}
            {activeTab === 'register' && (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                    <div className="relative bg-gradient-to-r from-white to-slate-50 border-b border-slate-100 px-6 py-5 overflow-hidden">
                        <div className="relative flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-800">Registro de Usuarios</h2>
                                <p className="text-slate-400 text-xs mt-0.5">Registra nuevos usuarios o administradores</p>
                            </div>
                            <div className="hidden md:block">
                                <svg className="w-9 h-9 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Selector de rol con Slate */}
                        <div className="bg-slate-100 rounded-lg p-1 flex gap-1 mb-6">
                            <button
                                type="button"
                                onClick={() => setRegisterForm({ ...registerForm, role: 'user', telefono: '' })}
                                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${registerForm.role === 'user'
                                    ? 'bg-slate-600 text-white shadow-sm'
                                    : 'text-slate-600 hover:text-slate-800'
                                    }`}
                            >
                                👤 Usuario Normal
                            </button>
                            <button
                                type="button"
                                onClick={() => setRegisterForm({ ...registerForm, role: 'admin', telefono: '' })}
                                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${registerForm.role === 'admin'
                                    ? 'bg-slate-600 text-white shadow-sm'
                                    : 'text-slate-600 hover:text-slate-800'
                                    }`}
                            >
                                🛡️ Administrador
                            </button>
                        </div>

                        <form onSubmit={registerUserOrAdmin} className="space-y-4">
                            {/* Nombre y Apellido */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">Nombre</label>
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        value={registerForm.name}
                                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">Apellido</label>
                                    <input
                                        type="text"
                                        placeholder="Apellido"
                                        value={registerForm.apellido}
                                        onChange={(e) => setRegisterForm({ ...registerForm, apellido: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Correo electrónico</label>
                                <input
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    value={registerForm.email}
                                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50"
                                    required
                                />
                            </div>

                            {/* Contraseña CON VISIBILIDAD */}
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Contraseña</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="********"
                                        value={registerForm.password}
                                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.977 9.977 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1">Mínimo 6 caracteres</p>
                            </div>

                            {/* Género y Teléfono */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">Género</label>
                                    <select
                                        value={registerForm.genero}
                                        onChange={(e) => setRegisterForm({ ...registerForm, genero: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50"
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>

                                {registerForm.role === 'user' && (
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Teléfono</label>
                                        <input
                                            type="text"
                                            placeholder="+123456789"
                                            value={registerForm.telefono}
                                            onChange={(e) => setRegisterForm({ ...registerForm, telefono: e.target.value })}
                                            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Botón Registrar con Slate */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-slate-600 hover:bg-slate-700 text-white py-2.5 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                            >
                                {loading ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Registrando...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                        Registrar {registerForm.role === 'admin' ? 'Administrador' : 'Usuario'}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Editar Usuario - Diseño Moderno */}
            {userModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-slideUp">
                        {/* Header del modal */}
                        <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-5 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Editar Usuario</h3>
                                    <p className="text-slate-300 text-xs mt-0.5">Modifica la información del usuario</p>
                                </div>
                                <button
                                    onClick={() => setUserModalOpen(false)}
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Cuerpo del modal */}
                        <div className="p-5">
                            <div className="space-y-4">
                                {/* Nombre y Apellido */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Nombre</label>
                                        <input
                                            type="text"
                                            placeholder="Nombre"
                                            value={userForm.name}
                                            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Apellido</label>
                                        <input
                                            type="text"
                                            placeholder="Apellido"
                                            value={userForm.apellido}
                                            onChange={(e) => setUserForm({ ...userForm, apellido: e.target.value })}
                                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">Correo electrónico</label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={userForm.email}
                                        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50"
                                    />
                                </div>

                                {/* Teléfono */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">Teléfono</label>
                                    <input
                                        type="text"
                                        placeholder="Teléfono"
                                        value={userForm.telefono}
                                        onChange={(e) => setUserForm({ ...userForm, telefono: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50"
                                    />
                                </div>

                                {/* Género */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">Género</label>
                                    <select
                                        value={userForm.genero}
                                        onChange={(e) => setUserForm({ ...userForm, genero: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50"
                                    >
                                        <option value="">Seleccionar género</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>

                                {/* Estado Activo */}
                                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={userForm.isActive}
                                            onChange={(e) => setUserForm({ ...userForm, isActive: e.target.checked })}
                                            className="w-4 h-4 text-slate-600 border-slate-300 rounded focus:ring-slate-400"
                                        />
                                        <span className="text-sm font-medium text-slate-700">Usuario activo</span>
                                    </label>
                                    <p className="text-[10px] text-slate-400 ml-6 mt-1">Si está desactivado, el usuario no podrá acceder al sistema</p>
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => updateUser(selectedUser._id, userForm)}
                                    className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Guardar cambios
                                </button>
                                <button
                                    onClick={() => setUserModalOpen(false)}
                                    className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal Editar Administrador - Diseño Moderno */}
            {adminModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-slideUp">
                        {/* Header del modal */}
                        <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-5 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Editar Administrador</h3>
                                    <p className="text-slate-300 text-xs mt-0.5">Modifica la información del administrador</p>
                                </div>
                                <button
                                    onClick={() => setAdminModalOpen(false)}
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Cuerpo del modal */}
                        <div className="p-5">
                            <div className="space-y-4">
                                {/* Nombre y Apellido */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Nombre</label>
                                        <input
                                            type="text"
                                            placeholder="Nombre"
                                            value={adminForm.name}
                                            onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Apellido</label>
                                        <input
                                            type="text"
                                            placeholder="Apellido"
                                            value={adminForm.apellido}
                                            onChange={(e) => setAdminForm({ ...adminForm, apellido: e.target.value })}
                                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">Correo electrónico</label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={adminForm.email}
                                        onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50"
                                    />
                                </div>

                                {/* Género */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">Género</label>
                                    <select
                                        value={adminForm.genero}
                                        onChange={(e) => setAdminForm({ ...adminForm, genero: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50"
                                    >
                                        <option value="">Seleccionar género</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>

                                {/* Información de rol (no editable, solo informativo) */}
                                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                                        </svg>
                                        <span className="text-xs font-medium text-slate-600">Rol actual:</span>
                                        <span className="text-xs text-slate-700 bg-white px-2 py-0.5 rounded-full border border-slate-200">{selectedAdmin?.role || 'admin'}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 ml-6 mt-1">El rol no se puede modificar desde este panel</p>
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => updateAdmin(selectedAdmin._id, adminForm)}
                                    className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Guardar cambios
                                </button>
                                <button
                                    onClick={() => setAdminModalOpen(false)}
                                    className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}