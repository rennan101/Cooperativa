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
    <header className="bg-white border-b border-slate-300 sticky top-0 z-40 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="bg-coop-primary text-white w-9 h-9 rounded-md flex items-center justify-center font-bold shadow-xs">
            <Icon name="directions_car" size="md" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-black text-lg tracking-tight text-slate-950 leading-none">
              Cooperativa
            </span>
            <span className="text-[10px] font-extrabold text-coop-700 uppercase tracking-wider">
              Viagens
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 h-full">
          <Link
            to="/buscar"
            className={`h-full flex items-center gap-1 text-sm font-extrabold transition-colors border-b-2 ${
              isSearchActive
                ? 'text-coop-700 border-coop-primary'
                : 'text-slate-800 border-transparent hover:text-coop-700'
            }`}
          >
            <Icon name="search" size="sm" />
            <span>Buscar</span>
          </Link>

          {role === 'DRIVER' && (
            <Link
              to="/publicar"
              className={`h-full flex items-center gap-1 text-sm font-extrabold transition-colors border-b-2 ${
                isActive('/publicar')
                  ? 'text-coop-700 border-coop-primary'
                  : 'text-slate-800 border-transparent hover:text-coop-700'
              }`}
            >
              <Icon name="add_circle" size="sm" />
              <span>Nova Viagem</span>
            </Link>
          )}

          <Link
            to="/minhas-viagens"
            className={`h-full flex items-center gap-1 text-sm font-extrabold transition-colors border-b-2 ${
              isActive('/minhas-viagens')
                ? 'text-coop-700 border-coop-primary'
                : 'text-slate-800 border-transparent hover:text-coop-700'
            }`}
          >
            <Icon name="history" size="sm" />
            <span>Viagens</span>
          </Link>

          {(role === 'ADMIN' || role === 'MANAGER') && (
            <Link
              to="/admin"
              className={`h-full flex items-center gap-1 text-sm font-extrabold transition-colors border-b-2 ${
                isActive('/admin')
                  ? 'text-coop-700 border-coop-primary'
                  : 'text-slate-800 border-transparent hover:text-coop-700'
              }`}
            >
              <Icon name="admin_panel_settings" size="sm" />
              <span>Painel</span>
            </Link>
          )}

          <Link
            to="/perfil"
            className={`h-full flex items-center gap-1 text-sm font-extrabold transition-colors border-b-2 ${
              isActive('/perfil')
                ? 'text-coop-700 border-coop-primary'
                : 'text-slate-800 border-transparent hover:text-coop-700'
            }`}
          >
            <Icon name="account_circle" size="sm" />
            <span>Perfil</span>
          </Link>
        </nav>

        {/* User Info & Role Switcher */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link to="/perfil" className="flex items-center gap-1.5 text-right hover:opacity-90">
            <span className="text-xs sm:text-sm font-black text-slate-950 hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
          </Link>

          {/* Quick Role Switcher Button */}
          <button
            onClick={() => setRole(role === 'PASSENGER' ? 'DRIVER' : role === 'DRIVER' ? 'ADMIN' : 'PASSENGER')}
            title="Alternar Perfil para Teste"
            className="h-9 px-2.5 flex items-center gap-1 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-400 rounded-md transition-colors"
          >
            <Icon name="swap_horiz" size="sm" className="text-slate-700" />
            <span className="text-[11px] font-extrabold">{role === 'DRIVER' ? 'Motorista' : role === 'ADMIN' ? 'Admin' : 'Passageiro'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
