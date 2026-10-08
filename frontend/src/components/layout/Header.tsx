import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { useAppStore } from '../../store/useAppStore';

export const Header: React.FC = () => {
  const location = useLocation();
  const { currentUser, role, setRole } = useAppStore();

  const isSearchActive = location.pathname === '/' || location.pathname === '/buscar';
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-uber-black text-white sticky top-0 z-40 border-b border-uber-charcoal">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="bg-white text-uber-black w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-transform group-hover:scale-105">
            <Icon name="directions_car" size="sm" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-lg tracking-tight text-white leading-none">
              Cooperativa
            </span>
            <span className="text-[10px] font-semibold text-uber-iron uppercase tracking-wider">
              Viagens
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 h-full">
          <Link
            to="/buscar"
            className={`h-full flex items-center gap-1.5 text-sm font-semibold transition-colors border-b-2 ${
              isSearchActive
                ? 'text-white border-white'
                : 'text-uber-slate border-transparent hover:text-white'
            }`}
          >
            <Icon name="search" size="sm" />
            <span>Buscar</span>
          </Link>

          {role === 'DRIVER' && (
            <Link
              to="/publicar"
              className={`h-full flex items-center gap-1.5 text-sm font-semibold transition-colors border-b-2 ${
                isActive('/publicar')
                  ? 'text-white border-white'
                  : 'text-uber-slate border-transparent hover:text-white'
              }`}
            >
              <Icon name="add" size="sm" />
              <span>Nova Viagem</span>
            </Link>
          )}

          <Link
            to="/minhas-viagens"
            className={`h-full flex items-center gap-1.5 text-sm font-semibold transition-colors border-b-2 ${
              isActive('/minhas-viagens')
                ? 'text-white border-white'
                : 'text-uber-slate border-transparent hover:text-white'
            }`}
          >
            <Icon name="history" size="sm" />
            <span>Viagens</span>
          </Link>

          {(role === 'ADMIN' || role === 'MANAGER') && (
            <Link
              to="/admin"
              className={`h-full flex items-center gap-1.5 text-sm font-semibold transition-colors border-b-2 ${
                isActive('/admin')
                  ? 'text-white border-white'
                  : 'text-uber-slate border-transparent hover:text-white'
              }`}
            >
              <Icon name="admin_panel_settings" size="sm" />
              <span>Painel</span>
            </Link>
          )}

          <Link
            to="/perfil"
            className={`h-full flex items-center gap-1.5 text-sm font-semibold transition-colors border-b-2 ${
              isActive('/perfil')
                ? 'text-white border-white'
                : 'text-uber-slate border-transparent hover:text-white'
            }`}
          >
            <Icon name="account_circle" size="sm" />
            <span>Perfil</span>
          </Link>
        </nav>

        {/* User Info & Role Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/perfil" className="flex items-center gap-1.5 text-right hover:opacity-90">
            <span className="text-xs sm:text-sm font-semibold text-white hidden sm:inline">
              {currentUser.name.split(' ')[0]}
            </span>
          </Link>

          {/* Quick Role Switcher Button */}
          <button
            onClick={() => setRole(role === 'PASSENGER' ? 'DRIVER' : role === 'DRIVER' ? 'ADMIN' : 'PASSENGER')}
            title="Alternar Perfil para Teste"
            className="h-8 px-3 flex items-center gap-1.5 text-xs font-semibold text-white bg-uber-charcoal hover:bg-uber-iron/30 rounded-full transition-colors active:scale-95"
          >
            <Icon name="swap_horiz" size="sm" className="text-uber-slate" />
            <span className="text-[11px] font-bold">
              {role === 'DRIVER' ? 'Motorista' : role === 'ADMIN' ? 'Admin' : 'Passageiro'}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};

