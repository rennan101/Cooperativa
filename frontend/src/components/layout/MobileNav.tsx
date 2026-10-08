import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { useAppStore } from '../../store/useAppStore';

export const MobileNav: React.FC = () => {
  const location = useLocation();
  const { role } = useAppStore();
  const isSearchActive = location.pathname === '/' || location.pathname === '/buscar';
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav aria-label="Navegação inferior móvel" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-uber-border px-2 h-16 flex items-center justify-around">
      <Link
        to="/buscar"
        className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-150 active:scale-95 ${
          isSearchActive ? 'text-uber-black font-bold' : 'text-uber-iron hover:text-uber-black font-medium'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <Icon name="search" size="md" fill={isSearchActive} />
          {isSearchActive && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-uber-black rounded-full" />
          )}
        </div>
        <span className="text-[11px] leading-tight mt-0.5">Buscar</span>
      </Link>

      {/* Driver only: Nova Viagem */}
      {role === 'DRIVER' && (
        <Link
          to="/publicar"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-150 active:scale-95 ${
            isActive('/publicar') ? 'text-uber-black font-bold' : 'text-uber-iron hover:text-uber-black font-medium'
          }`}
        >
          <div className="bg-uber-black text-white w-7 h-7 rounded-lg flex items-center justify-center transition-transform active:scale-90">
            <Icon name="add" size="sm" />
          </div>
          <span className="text-[11px] leading-tight font-bold text-uber-black mt-0.5">Nova Viagem</span>
        </Link>
      )}

      {/* Admin / Manager only: Painel tab */}
      {(role === 'ADMIN' || role === 'MANAGER') && (
        <Link
          to="/admin"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-150 active:scale-95 ${
            isActive('/admin') ? 'text-uber-black font-bold' : 'text-uber-iron hover:text-uber-black font-medium'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <Icon name="admin_panel_settings" size="md" fill={isActive('/admin')} />
            {isActive('/admin') && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 bg-uber-black rounded-full" />
            )}
          </div>
          <span className="text-[11px] leading-tight mt-0.5">Painel</span>
        </Link>
      )}

      <Link
        to="/minhas-viagens"
        className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-150 active:scale-95 ${
          isActive('/minhas-viagens') ? 'text-uber-black font-bold' : 'text-uber-iron hover:text-uber-black font-medium'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <Icon name="history" size="md" fill={isActive('/minhas-viagens')} />
          {isActive('/minhas-viagens') && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-uber-black rounded-full" />
          )}
        </div>
        <span className="text-[11px] leading-tight mt-0.5">Viagens</span>
      </Link>

      <Link
        to="/perfil"
        className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-150 active:scale-95 ${
          isActive('/perfil') ? 'text-uber-black font-bold' : 'text-uber-iron hover:text-uber-black font-medium'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <Icon name="account_circle" size="md" fill={isActive('/perfil')} />
          {isActive('/perfil') && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-uber-black rounded-full" />
          )}
        </div>
        <span className="text-[11px] leading-tight mt-0.5">Perfil</span>
      </Link>
    </nav>
  );
};

