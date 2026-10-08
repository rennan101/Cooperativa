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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-uber-black/80 backdrop-blur-xs">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl border border-uber-border shadow-2xl max-w-md w-full p-5 sm:p-6 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-uber-border">
          <div className="flex items-center gap-3">
            <div className="bg-uber-gray text-uber-black p-2 rounded-lg flex items-center justify-center">
              <Icon name="qr_code_2" size="md" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-uber-black leading-tight">Pagamento PIX (50%)</h3>
              <p className="text-xs text-uber-iron font-normal">Garantia de vaga na carona</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="text-uber-iron hover:text-uber-black p-1.5 rounded-lg hover:bg-uber-gray transition-colors"
          >
            <Icon name="close" size="md" />
          </button>
        </div>

        {/* Amount Summary */}
        <div className="my-4 bg-uber-gray border border-uber-border rounded-xl p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center h-8">
            <span className="text-sm font-semibold text-uber-black flex items-center gap-1.5">
              <Icon name="payments" size="sm" className="text-uber-black" />
              Sinal agora (50%):
            </span>
            <span className="text-2xl font-extrabold text-uber-black">
              R$ {booking.amountPaidSignal.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs text-uber-iron pt-2 border-t border-uber-border h-6 font-normal">
            <span>Restante no fim da viagem:</span>
            <span className="font-bold text-uber-black">R$ {booking.amountDueFinal.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        {/* Simple Step-by-Step with Icons */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-3 p-2.5 bg-uber-gray rounded-lg border border-uber-border text-xs font-medium text-uber-black h-11">
            <div className="w-5 h-5 rounded-full bg-uber-black text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
              1
            </div>
            <span className="flex-1 truncate">Copie o código PIX abaixo</span>
            <Icon name="content_copy" size="sm" className="text-uber-iron shrink-0" />
          </div>

          <div className="flex items-center gap-3 p-2.5 bg-uber-gray rounded-lg border border-uber-border text-xs font-medium text-uber-black h-11">
            <div className="w-5 h-5 rounded-full bg-uber-black text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
              2
            </div>
            <span className="flex-1 truncate">Abra seu banco e escolha PIX Copia e Cola</span>
            <Icon name="account_balance" size="sm" className="text-uber-iron shrink-0" />
          </div>

          <div className="flex items-center gap-3 p-2.5 bg-uber-gray rounded-lg border border-uber-border text-xs font-medium text-uber-black h-11">
            <div className="w-5 h-5 rounded-full bg-uber-black text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
              3
            </div>
            <span className="flex-1 truncate">Cole e confirme o pagamento</span>
            <Icon name="check_circle" size="sm" className="text-uber-black shrink-0" />
          </div>
        </div>

        {/* Pix Code Box */}
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={booking.pixCopyPasteCode}
              className="flex-1 bg-uber-gray border border-uber-border rounded-lg px-3 h-11 text-xs font-mono font-medium text-uber-black select-all"
            />
            <Button
              variant="primary"
              size="sm"
              iconLeft={copied ? "check" : "content_copy"}
              onClick={handleCopyCode}
              className="h-11 px-4 font-bold"
            >
              {copied ? 'Copiado!' : 'Copiar'}
            </Button>
          </div>
        </div>

        {/* Custody Info */}
        <Alert variant="info" className="mb-4">
          <p className="text-xs font-normal text-uber-charcoal">
            Valor em custódia protegida pela Cooperativa até o fim do trajeto.
          </p>
        </Alert>

        {/* Action Buttons */}
        <div className="flex gap-2.5 pt-1">
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            className="flex-1 h-12 font-semibold"
          >
            Voltar
          </Button>

          <Button
            variant="primary"
            size="md"
            iconLeft="check_circle"
            isLoading={isProcessing}
            onClick={handleSimulatePayment}
            className="flex-1 h-12 font-bold"
          >
            Confirmar PIX
          </Button>
        </div>

      </div>
    </div>
  );
};

