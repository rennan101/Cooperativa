import React, { useState } from 'react';
import { Booking } from '../../types';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { Alert } from '../ui/Alert';
import { useAppStore } from '../../store/useAppStore';
import { useToastStore } from '../../store/useToastStore';

export interface PixModalProps {
  booking: Booking;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

export const PixModal: React.FC<PixModalProps> = ({
  booking,
  onClose,
  onPaymentSuccess,
}) => {
  const { confirmBookingPayment } = useAppStore();
  const { addToast } = useToastStore();
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(booking.pixCopyPasteCode);
    setCopied(true);
    addToast('Código PIX copiado para a área de transferência!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      confirmBookingPayment(booking.id);
      setIsProcessing(false);
      addToast('Pagamento do sinal confirmado com sucesso! Vaga garantida.', 'success');
      onPaymentSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-t-lg sm:rounded-lg border-t-2 sm:border-2 border-slate-400 shadow-2xl max-w-md w-full p-5 sm:p-6 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-300">
          <div className="flex items-center gap-2.5">
            <div className="bg-emerald-100 text-emerald-900 p-2 rounded-md flex items-center justify-center">
              <Icon name="qr_code_2" size="md" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-950 leading-tight">Pagamento PIX (50%)</h3>
              <p className="text-xs font-bold text-slate-600">Garantia de vaga na carona</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="text-slate-600 hover:text-slate-950 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
          >
            <Icon name="close" size="md" />
          </button>
        </div>

        {/* Amount Summary (Aligned in same line and height) */}
        <div className="my-4 bg-emerald-50 border-2 border-emerald-300 rounded-md p-3.5 flex flex-col gap-2">
          <div className="flex justify-between items-center h-8">
            <span className="text-sm font-extrabold text-slate-950 flex items-center gap-1.5">
              <Icon name="payments" size="sm" className="text-coop-primary" />
              Sinal agora (50%):
            </span>
            <span className="text-2xl font-black text-emerald-950">
              R$ {booking.amountPaidSignal.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-700 pt-2 border-t border-emerald-200 h-6 font-semibold">
            <span>Restante no fim da viagem:</span>
            <span className="font-extrabold text-slate-950">R$ {booking.amountDueFinal.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        {/* Simple Step-by-Step with Icons */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2.5 p-2 bg-slate-100 rounded-md border border-slate-300 text-xs font-bold text-slate-950 h-11">
            <div className="w-6 h-6 rounded-md bg-coop-primary text-white font-black flex items-center justify-center shrink-0 text-xs">
              1
            </div>
            <span className="flex-1 truncate">Copie o código PIX abaixo</span>
            <Icon name="content_copy" size="sm" className="text-slate-600 shrink-0" />
          </div>

          <div className="flex items-center gap-2.5 p-2 bg-slate-100 rounded-md border border-slate-300 text-xs font-bold text-slate-950 h-11">
            <div className="w-6 h-6 rounded-md bg-coop-primary text-white font-black flex items-center justify-center shrink-0 text-xs">
              2
            </div>
            <span className="flex-1 truncate">Abra seu banco e escolha PIX Copia e Cola</span>
            <Icon name="account_balance" size="sm" className="text-slate-600 shrink-0" />
          </div>

          <div className="flex items-center gap-2.5 p-2 bg-slate-100 rounded-md border border-slate-300 text-xs font-bold text-slate-950 h-11">
            <div className="w-6 h-6 rounded-md bg-coop-primary text-white font-black flex items-center justify-center shrink-0 text-xs">
              3
            </div>
            <span className="flex-1 truncate">Cole e confirme o pagamento</span>
            <Icon name="check_circle" size="sm" className="text-coop-primary shrink-0" />
          </div>
        </div>

        {/* Pix Code Box */}
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={booking.pixCopyPasteCode}
              className="flex-1 bg-slate-100 border border-slate-400 rounded-md px-3 h-11 text-xs font-mono font-bold text-slate-950 select-all"
            />
            <Button
              variant="primary"
              size="sm"
              iconLeft={copied ? "check" : "content_copy"}
              onClick={handleCopyCode}
              className="h-11 px-3.5 font-extrabold"
            >
              {copied ? 'Copiado!' : 'Copiar'}
            </Button>
          </div>
        </div>

        {/* Custody Info */}
        <Alert variant="info" className="mb-4">
          <p className="text-xs font-bold text-slate-950">
            Valor em custódia protegida pela Cooperativa até o fim do trajeto.
          </p>
        </Alert>

        {/* Action Buttons */}
        <div className="flex gap-2.5 pt-1">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            className="flex-1 h-12 font-bold"
          >
            Voltar
          </Button>

          <Button
            variant="primary"
            size="md"
            iconLeft="check_circle"
            isLoading={isProcessing}
            onClick={handleSimulatePayment}
            className="flex-1 h-12 font-black"
          >
            Confirmar PIX
          </Button>
        </div>

      </div>
    </div>
  );
};
