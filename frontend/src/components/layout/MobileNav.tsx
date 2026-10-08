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
    <nav aria-label="Navegação inferior móvel" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-300 shadow-2xl px-2 h-16 flex items-center justify-around">
      <Link
        to="/buscar"
        className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-150 active:scale-90 ${
          isSearchActive ? 'text-coop-primary font-black' : 'text-slate-700 hover:text-slate-950 font-bold'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <Icon name="search" size="md" fill={isSearchActive} />
          {isSearchActive && (
            <span className="absolute -bottom-1 w-1 h-1 bg-coop-primary rounded-xs" />
          )}
        </div>
        <span className="text-[11px] leading-tight mt-0.5">Buscar</span>
      </Link>

      {/* Driver only: Nova Viagem */}
      {role === 'DRIVER' && (
        <Link
          to="/publicar"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-150 active:scale-90 ${
            isActive('/publicar') ? 'text-coop-primary font-black' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          <div className="bg-coop-primary text-white w-8 h-8 rounded-md flex items-center justify-center shadow-xs transition-transform active:scale-95">
            <Icon name="add" size="md" />
          </div>
          <span className="text-[11px] leading-tight font-black">Nova Viagem</span>
        </Link>
      )}

      {/* Admin / Manager only: Painel tab */}
      {(role === 'ADMIN' || role === 'MANAGER') && (
        <Link
          to="/admin"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-150 active:scale-90 ${
            isActive('/admin') ? 'text-coop-primary font-black' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <Icon name="admin_panel_settings" size="md" fill={isActive('/admin')} />
            {isActive('/admin') && (
              <span className="absolute -bottom-1 w-1 h-1 bg-coop-primary rounded-xs" />
            )}
          </div>
          <span className="text-[11px] leading-tight mt-0.5">Painel</span>
        </Link>
      )}

      <Link
        to="/minhas-viagens"
        className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-150 active:scale-90 ${
          isActive('/minhas-viagens') ? 'text-coop-primary font-black' : 'text-slate-700 hover:text-slate-950 font-bold'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <Icon name="history" size="md" fill={isActive('/minhas-viagens')} />
          {isActive('/minhas-viagens') && (
            <span className="absolute -bottom-1 w-1 h-1 bg-coop-primary rounded-xs" />
          )}
        </div>
        <span className="text-[11px] leading-tight mt-0.5">Viagens</span>
      </Link>

      <Link
        to="/perfil"
        className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-150 active:scale-90 ${
          isActive('/perfil') ? 'text-coop-primary font-black' : 'text-slate-700 hover:text-slate-950 font-bold'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <Icon name="account_circle" size="md" fill={isActive('/perfil')} />
          {isActive('/perfil') && (
            <span className="absolute -bottom-1 w-1 h-1 bg-coop-primary rounded-xs" />
          )}
        </div>
        <span className="text-[11px] leading-tight mt-0.5">Perfil</span>
      </Link>
    </nav>
  );
};
