import React from 'react';
import { Booking, Ride } from '../../types';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

export interface CancelBookingModalProps {
  booking: Booking;
  ride?: Ride;
  onClose: () => void;
  onConfirm: () => void;
}

export const CancelBookingModal: React.FC<CancelBookingModalProps> = ({
  booking,
  ride,
  onClose,
  onConfirm,
}) => {
  // Calculate refund percentage (>1h before = 70%, <1h = 50%)
  const refundPercent = 70;
  const refundAmount = (booking.amountPaidSignal * refundPercent) / 100;
  const operationalFee = booking.amountPaidSignal - refundAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-uber-black/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl border border-uber-border shadow-2xl max-w-md w-full p-5 sm:p-6 text-left max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-uber-border">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 text-red-600 w-9 h-9 rounded-full flex items-center justify-center font-bold">
              <Icon name="warning" size="md" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-uber-black leading-tight">Cancelar Reserva</h3>
              <p className="text-[11px] font-normal text-uber-iron">Confirmação de estorno via PIX</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar diálogo"
            className="text-uber-iron hover:text-uber-black p-1.5 rounded-lg hover:bg-uber-gray transition-colors"
          >
            <Icon name="close" size="md" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-3.5 text-xs text-uber-charcoal">
          <p className="text-uber-black font-medium leading-relaxed">
            Tem certeza de que deseja cancelar sua reserva na viagem {ride ? `para ${ride.destinationCity}` : ''}?
          </p>

          {/* Refund Breakdown Card */}
          <div className="bg-uber-gray border border-uber-border rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-normal text-uber-iron">Sinal pago anteriormente:</span>
              <span className="font-bold text-uber-black">R$ {booking.amountPaidSignal.toFixed(2).replace('.', ',')}</span>
            </div>

            <div className="flex justify-between items-center text-xs pt-1.5 border-t border-uber-border">
              <span className="font-semibold text-uber-black">Valor a ser estornado ({refundPercent}%):</span>
              <span className="font-extrabold text-uber-black text-sm">R$ {refundAmount.toFixed(2).replace('.', ',')}</span>
            </div>

            <div className="flex justify-between items-center text-[11px] text-uber-iron pt-1.5 border-t border-uber-border">
              <span>Retenção operacional:</span>
              <span>R$ {operationalFee.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-uber-gray p-3 rounded-xl border border-uber-border text-[11px] text-uber-charcoal font-normal">
            <Icon name="info" size="sm" className="text-uber-black shrink-0 mt-0.5" />
            <span>O estorno de R$ {refundAmount.toFixed(2).replace('.', ',')} será enviado automaticamente para sua chave PIX cadastrada.</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5 pt-2 border-t border-uber-border">
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            className="flex-1 h-11 font-semibold"
          >
            Manter Reserva
          </Button>

          <Button
            variant="danger"
            size="md"
            iconLeft="cancel"
            onClick={onConfirm}
            className="flex-1 h-11 font-bold"
          >
            Confirmar Cancelamento
          </Button>
        </div>

      </div>
    </div>
  );
};

