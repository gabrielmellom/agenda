'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Clock, Users, Settings, Home, Menu, X, LogOut } from 'lucide-react';

export default function AdminLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const isActive = (path) => {
    return pathname === path;
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={toggleMenu} className="mr-3">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-blue-600">AgendaFácil</h1>
          </div>
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 font-bold">A</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        </div>
      </header>
      
      {/* Menu lateral deslizante */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleMenu}></div>
          <div className="relative w-64 max-w-xs h-full bg-white shadow-xl flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-blue-600">Menu</h2>
              <button onClick={toggleMenu}>
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex-1 px-2 py-4">
              <Link 
                href="/admin"
                className={`flex items-center p-4 mb-2 rounded-md cursor-pointer ${
                  isActive('/admin') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={toggleMenu}
              >
                <Home size={22} className="mr-3" />
                <span>Dashboard</span>
              </Link>
              
              <Link 
                href="/admin/agendamentos"
                className={`flex items-center p-4 mb-2 rounded-md cursor-pointer ${
                  isActive('/admin/agendamentos') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={toggleMenu}
              >
                <Calendar size={22} className="mr-3" />
                <span>Agendamentos</span>
              </Link>
              
              <Link 
                href="/admin/clientes"
                className={`flex items-center p-4 mb-2 rounded-md cursor-pointer ${
                  isActive('/admin/clientes') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={toggleMenu}
              >
                <Users size={22} className="mr-3" />
                <span>Clientes</span>
              </Link>
              
              <Link 
                href="/admin/horarios"
                className={`flex items-center p-4 mb-2 rounded-md cursor-pointer ${
                  isActive('/admin/horarios') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={toggleMenu}
              >
                <Clock size={22} className="mr-3" />
                <span>Disponibilidade</span>
              </Link>
              
              <Link 
                href="/admin/configuracoes"
                className={`flex items-center p-4 mb-2 rounded-md cursor-pointer ${
                  isActive('/admin/configuracoes') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={toggleMenu}
              >
                <Settings size={22} className="mr-3" />
                <span>Configurações</span>
              </Link>
              
              <Link 
                href="/"
                className="flex items-center p-4 mb-2 rounded-md cursor-pointer text-gray-700 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <LogOut size={22} className="mr-3" />
                <span>Sair</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
      
      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-auto p-4 pb-24">
        {children}
      </main>
      
      {/* Navegação inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2">
        <Link 
          href="/admin"
          className={`flex flex-col items-center p-2 ${isActive('/admin') ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Início</span>
        </Link>
        
        <Link 
          href="/admin/agendamentos"
          className={`flex flex-col items-center p-2 ${
            isActive('/admin/agendamentos') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Calendar size={20} />
          <span className="text-xs mt-1">Agenda</span>
        </Link>
        
        <Link 
          href="/admin/clientes"
          className={`flex flex-col items-center p-2 ${
            isActive('/admin/clientes') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Users size={20} />
          <span className="text-xs mt-1">Clientes</span>
        </Link>
        
        <Link 
          href="/admin/horarios"
          className={`flex flex-col items-center p-2 ${
            isActive('/admin/horarios') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Clock size={20} />
          <span className="text-xs mt-1">Horários</span>
        </Link>
      </nav>
    </div>
  );
}