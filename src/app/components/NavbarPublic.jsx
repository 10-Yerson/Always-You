'use client'
import { useState, useEffect } from 'react';
import { Menu, X, Home, Heart, Target, Clock, Users, LogIn } from 'lucide-react';

export default function NavbarPublic() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', icon: Home, href: '#inicio' },
    { name: 'Recuerdos', icon: Heart, href: '#recuerdos' },
    { name: 'Metas', icon: Target, href: '#metas' },
    { name: 'Historial', icon: Clock, href: '#historial' },
    { name: 'Sobre Nosotros', icon: Users, href: '#sobre-nosotros' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
          ? 'bg-white shadow-sm border-b border-gray-100'
          : 'bg-white border-b border-gray-100'
        }`}
    >
      <nav className="mx-auto flex items-center justify-between px-6 lg:px-8 py-4 max-w-7xl">

        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-serif font-bold text-gray-900 tracking-tight leading-none">
              Always You
            </h1>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-light">
              Nuestros Momentos
            </span>
          </div>
        </div>

        {/* Menu Desktop */}
        <ul className="hidden lg:flex items-center space-x-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-slate-600 hover:bg-slate-50 transition-all duration-200 group"
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/auth/login"
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-slate-500 to-slate-600 text-white font-medium text-sm hover:shadow-lg shadow-md transform hover:scale-105 transition-all duration-200"
          >
            <LogIn className="w-4 h-4" />
            Acceder
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-6 py-4 bg-white border-t border-gray-100 shadow-lg">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-rose-500 hover:bg-rose-50 font-medium transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <a
              href="/auth/login"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-slate-500 to-slate-600 text-white font-medium hover:shadow-lg shadow-md transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogIn className="w-5 h-5" />
              Acceder
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}