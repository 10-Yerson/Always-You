'use client'

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome, FiLogOut, FiUser, FiMail, FiImage, FiTarget, FiMusic
} from "react-icons/fi";
import { 
  Home, User, LogOut, Heart, 
  Mail, Image, Target, Music, Camera
} from "lucide-react";
import axios from '@/utils/axios';
import { toast } from 'react-toastify';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      router.push('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error('Error al cerrar sesión');
    }
  };

  const menuSections = [
    {
      title: "Principal",
      items: [
        { href: "/admin", icon: FiHome, label: "Dashboard" },
      ]
    },
    {
      title: "Cartas",
      items: [
        { href: "/admin/letters", icon: FiMail, label: "Administrar Cartas" },
      ]
    },
    {
      title: "Recuerdos",
      items: [
        { href: "/admin/memories", icon: FiImage, label: "Administrar Recuerdos" },
      ]
    },
    {
      title: "Metas",
      items: [
        { href: "/admin/goals", icon: FiTarget, label: "Administrar Metas" },
      ]
    },
    {
      title: "Música",
      items: [
        { href: "/admin/music", icon: FiMusic, label: "Administrar Música" },
      ]
    },
    {
      title: "Cuenta",
      items: [
        { href: "/admin/profile", icon: FiUser, label: "Mi Perfil" },
      ]
    }
  ];

  // Items para el nav móvil (los más importantes)
  const mobileItems = [
    { href: "/admin", Icon: Home, label: "Inicio" },
    { href: "/admin/letters", Icon: Mail, label: "Cartas" },
    { href: "/admin/memories", Icon: Camera, label: "Recuerdos" },
    { href: "/admin/goals", Icon: Target, label: "Metas" },
    { href: "/admin/music", Icon: Music, label: "Música" },
    { href: "/admin/profile", Icon: User, label: "Perfil" },
  ];

  return (
    <>
      {/* ========== SIDEBAR DESKTOP ========== */}
      <div className="hidden lg:flex w-72 h-screen bg-white text-gray-900 fixed shadow-sm border-r border-gray-100 flex-col z-50">

        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900">Always You</h1>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <div className="flex-1 px-4 py-5 overflow-y-auto space-y-5">
          {menuSections.map((section, i) => (
            <div key={i}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                      >
                        <item.icon size={17} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <FiLogOut size={17} />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* ========== MENÚ MÓVIL ABAJO ========== */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden z-50 bg-white border-t border-gray-100 shadow-2xl">
        <ul className="flex items-center justify-around px-2 py-2">
          {mobileItems.map(({ href, Icon, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link href={href} className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-200 scale-110'
                      : 'text-gray-400'
                  }`}>
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <span className={`text-[10px] font-semibold transition-colors ${
                    isActive ? 'text-blue-500' : 'text-gray-400'
                  }`}>
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}

          {/* Logout móvil */}
          <li>
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl text-red-400 hover:bg-red-50 transition-all duration-200">
                <LogOut size={20} strokeWidth={1.5} />
              </div>
              <span className="text-[10px] font-semibold text-red-400">Salir</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}