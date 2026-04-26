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

            {/* Tabs */}
            <div className="flex gap-2 border-b mb-6">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-4 py-2 font-medium ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                >
                    Mi Perfil
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-4 py-2 font-medium ${activeTab === 'users' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                >
                    Usuarios
                </button>
                <button
                    onClick={() => setActiveTab('admins')}
                    className={`px-4 py-2 font-medium ${activeTab === 'admins' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                >
                    Administradores
                </button>
                <button
                    onClick={() => setActiveTab('register')}
                    className={`px-4 py-2 font-medium ${activeTab === 'register' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                >
                    Registrar
                </button>
            </div>

            {/* ========== MI PERFIL ========== */}
            {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-semibold mb-4">Mi Perfil</h2>

                    {/* Foto de perfil */}
                    <div className="flex items-center gap-4 mb-6">
                        <img src={myProfile.profileUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files[0]) uploadProfilePicture(e.target.files[0]);
                                }}
                                className="mb-2"
                            />
                            {uploading && <p className="text-sm text-gray-500">Subiendo...</p>}
                        </div>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={updateMyProfile} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={myProfile.name || ''}
                                onChange={(e) => setMyProfile({ ...myProfile, name: e.target.value })}
                                className="border rounded p-2"
                            />
                            <input
                                type="text"
                                placeholder="Apellido"
                                value={myProfile.apellido || ''}
                                onChange={(e) => setMyProfile({ ...myProfile, apellido: e.target.value })}
                                className="border rounded p-2"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={myProfile.email || ''}
                                onChange={(e) => setMyProfile({ ...myProfile, email: e.target.value })}
                                className="border rounded p-2"
                            />
                            <select
                                value={myProfile.genero || ''}
                                onChange={(e) => setMyProfile({ ...myProfile, genero: e.target.value })}
                                className="border rounded p-2"
                            >
                                <option value="">Seleccionar género</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                {loading ? 'Guardando...' : 'Actualizar Perfil'}
                            </button>
                            <button type="button" onClick={deleteMyAccount} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                Eliminar Cuenta
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* ========== USUARIOS ========== */}
            {activeTab === 'users' && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-semibold mb-4">Gestión de Usuarios</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3 text-left">Foto</th>
                                    <th className="p-3 text-left">Nombre</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Teléfono</th>
                                    <th className="p-3 text-left">Estado</th>
                                    <th className="p-3 text-left">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border-t">
                                        <td className="p-3">
                                            <img src={user.profilePicture} alt="" className="w-10 h-10 rounded-full object-cover" />
                                        </td>
                                        <td className="p-3">{user.name} {user.apellido}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3">{user.telefono || '-'}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {user.isActive ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setUserForm(user);
                                                        setUserModalOpen(true);
                                                    }}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Editar
                                                </button>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    id={`user-pic-${user._id}`}
                                                    onChange={(e) => {
                                                        if (e.target.files[0]) uploadUserPicture(user._id, e.target.files[0]);
                                                    }}
                                                />
                                                <label htmlFor={`user-pic-${user._id}`} className="bg-green-500 text-white px-3 py-1 rounded text-sm cursor-pointer">
                                                    Foto
                                                </label>
                                                <button
                                                    onClick={() => deleteUserPicture(user._id)}
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Reset
                                                </button>
                                                <button
                                                    onClick={() => deleteUser(user._id, user.name)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ========== ADMINISTRADORES ========== */}
            {activeTab === 'admins' && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-semibold mb-4">Gestión de Administradores</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3 text-left">Foto</th>
                                    <th className="p-3 text-left">Nombre</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Rol</th>
                                    <th className="p-3 text-left">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map((admin) => (
                                    <tr key={admin._id} className="border-t">
                                        <td className="p-3">
                                            <img src={admin.profileUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                                        </td>
                                        <td className="p-3">{admin.name} {admin.apellido}</td>
                                        <td className="p-3">{admin.email}</td>
                                        <td className="p-3">{admin.role}</td>
                                        <td className="p-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedAdmin(admin);
                                                        setAdminForm(admin);
                                                        setAdminModalOpen(true);
                                                    }}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Editar
                                                </button>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    id={`admin-pic-${admin._id}`}
                                                    onChange={(e) => {
                                                        if (e.target.files[0]) uploadAdminPicture(admin._id, e.target.files[0]);
                                                    }}
                                                />
                                                <label htmlFor={`admin-pic-${admin._id}`} className="bg-green-500 text-white px-3 py-1 rounded text-sm cursor-pointer">
                                                    Foto
                                                </label>
                                                <button
                                                    onClick={() => deleteAdmin(admin._id, admin.name)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ========== REGISTRO ========== */}
            {activeTab === 'register' && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-semibold mb-4">Registrar Usuario / Administrador</h2>
                    <form onSubmit={registerUserOrAdmin} className="space-y-4 max-w-md">
                        <select
                            value={registerForm.role}
                            onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}
                            className="border rounded p-2 w-full"
                        >
                            <option value="user">Usuario Normal</option>
                            <option value="admin">Administrador</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Nombre"
                            value={registerForm.name}
                            onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                            className="border rounded p-2 w-full"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Apellido"
                            value={registerForm.apellido}
                            onChange={(e) => setRegisterForm({ ...registerForm, apellido: e.target.value })}
                            className="border rounded p-2 w-full"
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                            className="border rounded p-2 w-full"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                            className="border rounded p-2 w-full"
                            required
                        />

                        <select
                            value={registerForm.genero}
                            onChange={(e) => setRegisterForm({ ...registerForm, genero: e.target.value })}
                            className="border rounded p-2 w-full"
                        >
                            <option value="">Seleccionar género</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>

                        {registerForm.role === 'user' && (
                            <input
                                type="text"
                                placeholder="Teléfono"
                                value={registerForm.telefono}
                                onChange={(e) => setRegisterForm({ ...registerForm, telefono: e.target.value })}
                                className="border rounded p-2 w-full"
                            />
                        )}

                        <button type="submit" disabled={loading} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
                            {loading ? 'Registrando...' : 'Registrar'}
                        </button>
                    </form>
                </div>
            )}

            {/* Modal Editar Usuario */}
            {userModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">Editar Usuario</h3>
                        <div className="space-y-3">
                            <input type="text" placeholder="Nombre" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} className="border rounded p-2 w-full" />
                            <input type="text" placeholder="Apellido" value={userForm.apellido} onChange={(e) => setUserForm({ ...userForm, apellido: e.target.value })} className="border rounded p-2 w-full" />
                            <input type="email" placeholder="Email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} className="border rounded p-2 w-full" />
                            <input type="text" placeholder="Teléfono" value={userForm.telefono} onChange={(e) => setUserForm({ ...userForm, telefono: e.target.value })} className="border rounded p-2 w-full" />
                            <select value={userForm.genero} onChange={(e) => setUserForm({ ...userForm, genero: e.target.value })} className="border rounded p-2 w-full">
                                <option value="">Género</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={userForm.isActive} onChange={(e) => setUserForm({ ...userForm, isActive: e.target.checked })} />
                                Activo
                            </label>
                            <div className="flex gap-2 mt-4">
                                <button onClick={() => updateUser(selectedUser._id, userForm)} className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
                                <button onClick={() => setUserModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Editar Admin */}
            {adminModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">Editar Administrador</h3>
                        <div className="space-y-3">
                            <input type="text" placeholder="Nombre" value={adminForm.name} onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })} className="border rounded p-2 w-full" />
                            <input type="text" placeholder="Apellido" value={adminForm.apellido} onChange={(e) => setAdminForm({ ...adminForm, apellido: e.target.value })} className="border rounded p-2 w-full" />
                            <input type="email" placeholder="Email" value={adminForm.email} onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })} className="border rounded p-2 w-full" />
                            <select value={adminForm.genero} onChange={(e) => setAdminForm({ ...adminForm, genero: e.target.value })} className="border rounded p-2 w-full">
                                <option value="">Género</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                            <div className="flex gap-2 mt-4">
                                <button onClick={() => updateAdmin(selectedAdmin._id, adminForm)} className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
                                <button onClick={() => setAdminModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}