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
          bg: 'bg-uber-black text-white border-uber-charcoal',
          iconColor: 'text-white',
        };
      case 'warning':
        return {
          icon: 'warning',
          bg: 'bg-uber-black text-white border-amber-500',
          iconColor: 'text-amber-400',
        };
      case 'error':
        return {
          icon: 'error',
          bg: 'bg-uber-black text-white border-red-500',
          iconColor: 'text-red-400',
        };
      case 'info':
      default:
        return {
          icon: 'info',
          bg: 'bg-uber-black text-white border-uber-charcoal',
          iconColor: 'text-white',
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
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-lg border shadow-xl animate-fade-in ${style.bg}`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <Icon name={style.icon} size="md" className={`${style.iconColor} shrink-0`} fill />
              <span className="text-xs sm:text-sm font-semibold leading-tight text-left truncate">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-uber-slate hover:text-white p-1 rounded-sm transition-colors shrink-0"
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

