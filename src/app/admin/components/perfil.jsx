"use client";

import { useState, useEffect } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import {
    Users,
    User,
    Heart,
    Edit,
    Trash2,
    Plus,
    Camera,
    Save,
    Search,
    UserCheck,
    UserX,
    X,
    Shield,
    UserPlus,
    Crown
} from "lucide-react";

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(true);

    // Usuarios normales
    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    const [showUserModal, setShowUserModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userForm, setUserForm] = useState({
        name: "",
        apellido: "",
        email: "",
        password: "",
        genero: "",
        telefono: "",
        role: "user",
        isActive: true
    });

    // Administradores
    const [admins, setAdmins] = useState([]);
    const [searchAdmin, setSearchAdmin] = useState("");
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [adminForm, setAdminForm] = useState({
        name: "",
        apellido: "",
        email: "",
        password: "",
        genero: "",
        isActive: true
    });

    // Perfil Admin
    const [profile, setProfile] = useState({ name: "", apellido: "", email: "", genero: "", profileUrl: "" });
    const [uploading, setUploading] = useState(false);

    // ==================== FUNCIONES ====================

    // Obtener todos los usuarios
    const fetchUsers = async () => {
        try {
            const { data } = await axios.get("/api/admin/users");
            // Filtrar solo usuarios (no admins)
            const normalUsers = data.filter(u => u.role !== "admin");
            setUsers(normalUsers);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
            toast.error("Error al cargar usuarios");
        }
    };

    // Obtener todos los administradores
    const fetchAdmins = async () => {
        try {
            const { data } = await axios.get("/api/admin/users");
            setAdmins(data);
        } catch (error) {
            console.error("Error al cargar administradores:", error);
            toast.error("Error al cargar administradores");
        }
    };

    // Obtener perfil del admin
    const fetchProfile = async () => {
        try {
            const { data } = await axios.get("/api/admin/me");
            setProfile(data);
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error("Error al cargar perfil");
        }
    };

    // ========== CRUD USUARIOS ==========
    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/auth/register", {
                name: userForm.name,
                apellido: userForm.apellido,
                email: userForm.email,
                password: userForm.password,
                genero: userForm.genero,
                telefono: userForm.telefono
            });
            toast.success("Usuario creado exitosamente");
            fetchUsers();
            setShowUserModal(false);
            resetUserForm();
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al crear usuario");
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const updateData = {
                name: userForm.name,
                apellido: userForm.apellido,
                email: userForm.email,
                genero: userForm.genero,
                telefono: userForm.telefono,
                isActive: userForm.isActive
            };
            if (userForm.password && userForm.password.trim() !== "") {
                updateData.password = userForm.password;
            }
            await axios.put(`/api/users/${editingUser._id}`, updateData);
            toast.success("Usuario actualizado exitosamente");
            fetchUsers();
            setShowUserModal(false);
            resetUserForm();
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al actualizar usuario");
        }
    };

    const handleToggleUserActive = async (userId, currentStatus) => {
        try {
            await axios.put(`/api/users/${userId}`, { isActive: !currentStatus });
            toast.success(`Usuario ${!currentStatus ? "activado" : "desactivado"}`);
            fetchUsers();
        } catch (error) {
            toast.error("Error al cambiar estado");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!confirm("¿Eliminar este usuario?")) return;
        try {
            await axios.delete(`/api/users/${userId}`);
            toast.success("Usuario eliminado exitosamente");
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al eliminar usuario");
        }
    };

    // ========== CRUD ADMINISTRADORES ==========
    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/admin/admins", {
                name: adminForm.name,
                apellido: adminForm.apellido,
                email: adminForm.email,
                password: adminForm.password,
                genero: adminForm.genero,
                isActive: adminForm.isActive
            });
            toast.success("Administrador creado exitosamente");
            fetchAdmins();
            setShowAdminModal(false);
            resetAdminForm();
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al crear administrador");
        }
    };

    const handleUpdateAdmin = async (e) => {
        e.preventDefault();
        try {
            const updateData = {
                name: adminForm.name,
                apellido: adminForm.apellido,
                email: adminForm.email,
                genero: adminForm.genero,
                isActive: adminForm.isActive
            };
            if (adminForm.password && adminForm.password.trim() !== "") {
                updateData.password = adminForm.password;
            }
            await axios.put(`/api/admin/admins/${editingAdmin._id}`, updateData);
            toast.success("Administrador actualizado exitosamente");
            fetchAdmins();
            setShowAdminModal(false);
            resetAdminForm();
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al actualizar administrador");
        }
    };

    const handleToggleAdminActive = async (adminId, currentStatus) => {
        if (currentStatus === true && admins.length === 1) {
            toast.error("No puedes desactivar al único administrador");
            return;
        }
        try {
            await axios.put(`/api/admin/admins/${adminId}`, { isActive: !currentStatus });
            toast.success(`Administrador ${!currentStatus ? "activado" : "desactivado"}`);
            fetchAdmins();
        } catch (error) {
            toast.error("Error al cambiar estado");
        }
    };

    const handleDeleteAdmin = async (adminId) => {
        if (admins.length === 1) {
            toast.error("No puedes eliminar al único administrador");
            return;
        }
        if (!confirm("¿Eliminar este administrador?")) return;
        try {
            await axios.delete(`/api/admin/admins/${adminId}`);
            toast.success("Administrador eliminado exitosamente");
            fetchAdmins();
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al eliminar administrador");
        }
    };

    const resetUserForm = () => {
        setEditingUser(null);
        setUserForm({
            name: "",
            apellido: "",
            email: "",
            password: "",
            genero: "",
            telefono: "",
            role: "user",
            isActive: true
        });
    };

    const resetAdminForm = () => {
        setEditingAdmin(null);
        setAdminForm({
            name: "",
            apellido: "",
            email: "",
            password: "",
            genero: "",
            isActive: true
        });
    };

    const openEditUser = (user) => {
        setEditingUser(user);
        setUserForm({
            name: user.name || "",
            apellido: user.apellido || "",
            email: user.email || "",
            password: "",
            genero: user.genero || "",
            telefono: user.telefono || "",
            role: user.role || "user",
            isActive: user.isActive !== undefined ? user.isActive : true
        });
        setShowUserModal(true);
    };

    const openEditAdmin = (admin) => {
        setEditingAdmin(admin);
        setAdminForm({
            name: admin.name || "",
            apellido: admin.apellido || "",
            email: admin.email || "",
            password: "",
            genero: admin.genero || "",
            isActive: admin.isActive !== undefined ? admin.isActive : true
        });
        setShowAdminModal(true);
    };

    // ========== PERFIL ADMIN ==========
    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            await axios.put("/api/admin/me", profile);
            toast.success("Perfil actualizado exitosamente");
            fetchProfile();
        } catch (error) {
            toast.error("Error al actualizar perfil");
        }
    };

    const handleProfileImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);
        try {
            const { data } = await axios.put("/api/admin/profile-picture", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setProfile({ ...profile, profileUrl: data.profileUrl });
            toast.success("Foto actualizada exitosamente");
        } catch (error) {
            toast.error("Error al subir imagen");
        } finally {
            setUploading(false);
        }
    };

    // Cargar datos iniciales
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchUsers(), fetchAdmins(), fetchProfile()]);
            setLoading(false);
        };
        loadData();
    }, []);

    // Filtrar
    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchUser.toLowerCase())
    );

    const filteredAdmins = admins.filter(admin =>
        admin.name?.toLowerCase().includes(searchAdmin.toLowerCase()) ||
        admin.email?.toLowerCase().includes(searchAdmin.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Tabs Navegación */}
            <div className="flex gap-2 border-b mb-6 overflow-x-auto pb-1">
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === "profile"
                            ? "bg-blue-500 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                >
                    <User size={18} />
                    Mi Perfil
                </button>
                <button
                    onClick={() => setActiveTab("admins")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === "admins"
                            ? "bg-blue-500 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                >
                    <Crown size={18} />
                    Administradores
                </button>
                <button
                    onClick={() => setActiveTab("users")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === "users"
                            ? "bg-blue-500 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                >
                    <Users size={18} />
                    Usuarios
                </button>
            </div>

            {/* ==================== MI PERFIL ==================== */}
            {activeTab === "profile" && (
                <div>
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Mi Perfil</h1>
                        <p className="text-gray-500 text-sm">Administra tu información personal</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-5 border-b bg-gray-50">
                            <div className="flex items-center gap-5 flex-wrap">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                                        {profile.profileUrl ? (
                                            <img src={profile.profileUrl} alt="Perfil" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-blue-100">
                                                <User className="w-8 h-8 text-blue-500" />
                                            </div>
                                        )}
                                    </div>
                                    <label className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition">
                                        <Camera className="w-3 h-3 text-white" />
                                        <input type="file" className="hidden" accept="image/*" onChange={handleProfileImage} disabled={uploading} />
                                    </label>
                                    {uploading && <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center"><div className="animate-spin w-5 h-5 border-2 border-white rounded-full"></div></div>}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">{profile.name} {profile.apellido}</h2>
                                    <p className="text-sm text-gray-500">{profile.email}</p>
                                    <p className="text-xs text-gray-400 mt-1">Administrador</p>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSaveProfile} className="p-5 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label><input type="text" name="name" value={profile.name} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label><input type="text" name="apellido" value={profile.apellido} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" name="email" value={profile.email} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Género</label><select name="genero" value={profile.genero} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-lg"><option value="">Seleccionar</option><option value="Masculino">Masculino</option><option value="Femenino">Femenino</option><option value="Otro">Otro</option></select></div>
                            </div>
                            <div className="flex justify-end"><button type="submit" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"><Save size={16} />Guardar Cambios</button></div>
                        </form>
                    </div>
                </div>
            )}

            {/* ==================== ADMINISTRADORES ==================== */}
            {activeTab === "admins" && (
                <div>
                    <div className="mb-6 flex justify-between items-center flex-wrap gap-3">
                        <div><h1 className="text-2xl font-bold text-gray-800">Administradores</h1><p className="text-gray-500 text-sm">Gestiona los administradores del sistema</p></div>
                        <div className="flex gap-2">
                            <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Buscar admin..." value={searchAdmin} onChange={(e) => setSearchAdmin(e.target.value)} className="pl-9 pr-3 py-1.5 border rounded-lg text-sm w-56 focus:ring-2 focus:ring-blue-500" /></div>
                            <button onClick={() => { resetAdminForm(); setShowAdminModal(true); }} className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm"><UserPlus size={16} />Nuevo Admin</button>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Administrador</th>
                                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredAdmins.map((admin) => (
                                        <tr key={admin._id} className="hover:bg-gray-50">
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                                                        {admin.profileUrl ? (
                                                            <img src={admin.profileUrl} className="w-full h-full rounded-full object-cover" />
                                                        ) : (
                                                            <Crown className="w-4 h-4 text-purple-500" />
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-medium">{admin.name} {admin.apellido}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 text-sm text-gray-600">{admin.email}</td>
                                            <td className="px-5 py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${admin.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                    {admin.isActive ? "Activo" : "Inactivo"}
                                                </span>
                                             </td>
                                            <td className="px-5 py-3">
                                                <div className="flex gap-1.5">
                                                    <button onClick={() => openEditAdmin(admin)} className="p-1 hover:bg-gray-100 rounded">
                                                        <Edit size={16} className="text-gray-500" />
                                                    </button>
                                                    <button onClick={() => handleToggleAdminActive(admin._id, admin.isActive)} className="p-1 hover:bg-gray-100 rounded">
                                                        {admin.isActive ? <UserX size={16} className="text-red-500" /> : <UserCheck size={16} className="text-green-500" />}
                                                    </button>
                                                    <button onClick={() => handleDeleteAdmin(admin._id)} className="p-1 hover:bg-gray-100 rounded">
                                                        <Trash2 size={16} className="text-gray-500 hover:text-red-500" />
                                                    </button>
                                                </div>
                                             </td>
                                         </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* ==================== USUARIOS NORMALES ==================== */}
            {activeTab === "users" && (
                <div>
                    <div className="mb-6 flex justify-between items-center flex-wrap gap-3">
                        <div><h1 className="text-2xl font-bold text-gray-800">Usuarios</h1><p className="text-gray-500 text-sm">Gestiona los usuarios de la plataforma</p></div>
                        <div className="flex gap-2">
                            <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Buscar usuario..." value={searchUser} onChange={(e) => setSearchUser(e.target.value)} className="pl-9 pr-3 py-1.5 border rounded-lg text-sm w-56 focus:ring-2 focus:ring-blue-500" /></div>
                            <button onClick={() => { resetUserForm(); setShowUserModal(true); }} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"><UserPlus size={16} />Nuevo Usuario</button>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredUsers.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50">
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                                                        {user.profilePicture ? (
                                                            <img src={user.profilePicture} className="w-full h-full rounded-full object-cover" />
                                                        ) : (
                                                            <span className="text-blue-600 font-semibold text-xs">{user.name?.charAt(0)}</span>
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-medium">{user.name} {user.apellido}</span>
                                                </div>
                                             </td>
                                            <td className="px-5 py-3 text-sm text-gray-600">{user.email}</td>
                                            <td className="px-5 py-3 text-sm text-gray-600">{user.telefono || "-"}</td>
                                            <td className="px-5 py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                    {user.isActive ? "Activo" : "Inactivo"}
                                                </span>
                                             </td>
                                            <td className="px-5 py-3">
                                                <div className="flex gap-1.5">
                                                    <button onClick={() => openEditUser(user)} className="p-1 hover:bg-gray-100 rounded">
                                                        <Edit size={16} className="text-gray-500" />
                                                    </button>
                                                    <button onClick={() => handleToggleUserActive(user._id, user.isActive)} className="p-1 hover:bg-gray-100 rounded">
                                                        {user.isActive ? <UserX size={16} className="text-red-500" /> : <UserCheck size={16} className="text-green-500" />}
                                                    </button>
                                                    <button onClick={() => handleDeleteUser(user._id)} className="p-1 hover:bg-gray-100 rounded">
                                                        <Trash2 size={16} className="text-gray-500 hover:text-red-500" />
                                                    </button>
                                                </div>
                                             </td>
                                         </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Usuarios */}
            {showUserModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowUserModal(false)}>
                    <div className="bg-white rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-lg font-bold">{editingUser ? "Editar Usuario" : "Nuevo Usuario"}</h2>
                            <button onClick={() => setShowUserModal(false)}><X size={18} /></button>
                        </div>
                        <form onSubmit={handleSaveUser} className="p-4 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" placeholder="Nombre *" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" required />
                                <input type="text" placeholder="Apellido" value={userForm.apellido} onChange={(e) => setUserForm({ ...userForm, apellido: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" />
                            </div>
                            <input type="email" placeholder="Email *" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" required />
                            {!editingUser && <input type="password" placeholder="Contraseña *" value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" required />}
                            {editingUser && <input type="password" placeholder="Nueva contraseña (opcional)" value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />}
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" placeholder="Teléfono" value={userForm.telefono} onChange={(e) => setUserForm({ ...userForm, telefono: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" />
                                <select value={userForm.genero} onChange={(e) => setUserForm({ ...userForm, genero: e.target.value })} className="px-3 py-2 border rounded-lg text-sm"><option value="">Género</option><option value="Masculino">Masculino</option><option value="Femenino">Femenino</option><option value="Otro">Otro</option></select>
                            </div>
                            <div className="flex justify-end gap-2 pt-3">
                                <button type="button" onClick={() => setShowUserModal(false)} className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-50">Cancelar</button>
                                <button type="submit" className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Administradores */}
            {showAdminModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowAdminModal(false)}>
                    <div className="bg-white rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-lg font-bold">{editingAdmin ? "Editar Administrador" : "Nuevo Administrador"}</h2>
                            <button onClick={() => setShowAdminModal(false)}><X size={18} /></button>
                        </div>
                        <form onSubmit={handleSaveAdmin} className="p-4 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" placeholder="Nombre *" value={adminForm.name} onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" required />
                                <input type="text" placeholder="Apellido" value={adminForm.apellido} onChange={(e) => setAdminForm({ ...adminForm, apellido: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" />
                            </div>
                            <input type="email" placeholder="Email *" value={adminForm.email} onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" required />
                            {!editingAdmin && <input type="password" placeholder="Contraseña *" value={adminForm.password} onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" required />}
                            {editingAdmin && <input type="password" placeholder="Nueva contraseña (opcional)" value={adminForm.password} onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />}
                            <select value={adminForm.genero} onChange={(e) => setAdminForm({ ...adminForm, genero: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm"><option value="">Género</option><option value="Masculino">Masculino</option><option value="Femenino">Femenino</option><option value="Otro">Otro</option></select>
                            <div className="flex justify-end gap-2 pt-3">
                                <button type="button" onClick={() => setShowAdminModal(false)} className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-50">Cancelar</button>
                                <button type="submit" className="px-3 py-1.5 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}