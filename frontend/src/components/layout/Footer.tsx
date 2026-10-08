import React from 'react';
import { Icon } from '../ui/Icon';

export const Footer: React.FC = () => {
  return (
    <footer className="hidden md:block bg-slate-950 text-white border-t border-slate-800 mt-16 pb-12 pt-10">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        
        {/* Brand */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 h-8">
            <div className="bg-coop-primary text-white w-7 h-7 rounded-md flex items-center justify-center font-bold">
              <Icon name="directions_car" size="sm" />
            </div>
            <span className="font-black text-lg text-white">Cooperativa</span>
          </div>
          <p className="text-slate-200 text-xs leading-relaxed font-normal">
            Plataforma de viagens compartilhadas para profissionais. Segurança, economia e transparência para motoristas e passageiros.
          </p>
        </div>

        {/* Benefits List */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 h-8 font-extrabold text-white text-sm">
            <Icon name="verified_user" size="sm" className="text-emerald-400" />
            <span>Garantia e Segurança</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-200 font-medium">
            <li className="flex items-center gap-2">
              <Icon name="check" size="sm" className="text-emerald-400 shrink-0" />
              <span>Sinal de 50% via PIX em custódia protegida</span>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="check" size="sm" className="text-emerald-400 shrink-0" />
              <span>Resgate garantido para o motorista em até 72h</span>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="check" size="sm" className="text-emerald-400 shrink-0" />
              <span>Motoristas com validação cadastral prévia</span>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 h-8 font-extrabold text-white text-sm">
            <Icon name="headset_mic" size="sm" className="text-emerald-400" />
            <span>Atendimento Simples</span>
          </div>
          <p className="text-slate-200 text-xs leading-relaxed font-normal">
            Dúvidas sobre reservas, comprovantes digitais ou estornos automáticos? Conte com o suporte direto da cooperativa.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-200 bg-slate-900 p-2.5 rounded-md border border-slate-800 font-medium">
            <Icon name="lock" size="sm" className="text-emerald-400" />
            <span>Transações 100% auditadas com recibo digital</span>
          </div>
        </div>

      </div>

      <div className="max-w-4xl mx-auto px-4 pt-6 mt-6 border-t border-slate-900 text-center text-xs text-slate-400 font-medium">
        Cooperativa de Viagens. Todos os direitos reservados.
      </div>
    </footer>
  );
};
