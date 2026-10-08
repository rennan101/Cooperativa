import React from 'react';
import { useToastStore, ToastType } from '../../store/useToastStore';
import { Icon } from './Icon';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  const getIconAndStyle = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          icon: 'check_circle',
          bg: 'bg-emerald-950 text-white border-emerald-500',
          iconColor: 'text-emerald-400',
        };
      case 'warning':
        return {
          icon: 'warning',
          bg: 'bg-amber-950 text-white border-amber-500',
          iconColor: 'text-amber-400',
        };
      case 'error':
        return {
          icon: 'error',
          bg: 'bg-red-950 text-white border-red-500',
          iconColor: 'text-red-400',
        };
      case 'info':
      default:
        return {
          icon: 'info',
          bg: 'bg-slate-900 text-white border-slate-600',
          iconColor: 'text-sky-400',
        };
    }
  };

  return (
    <aside aria-label="Notificações do sistema" className="fixed top-4 right-4 left-4 sm:left-auto sm:w-96 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => {
        const style = getIconAndStyle(toast.type);
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-md border-2 shadow-2xl animate-scale-up ${style.bg}`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon name={style.icon} size="md" className={`${style.iconColor} shrink-0`} fill />
              <span className="text-xs sm:text-sm font-black leading-tight text-left truncate">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-sm transition-colors shrink-0"
              aria-label="Fechar notificação"
            >
              <Icon name="close" size="sm" />
            </button>
          </div>
        );
      })}
    </aside>
  );
};
