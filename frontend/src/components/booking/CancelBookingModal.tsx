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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-lg border-2 border-slate-400 shadow-2xl max-w-md w-full p-5 sm:p-6 text-left max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-300">
          <div className="flex items-center gap-2.5">
            <div className="bg-red-100 text-red-700 w-9 h-9 rounded-md flex items-center justify-center font-bold">
              <Icon name="warning" size="md" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-950 leading-tight">Cancelar Reserva</h3>
              <p className="text-[11px] font-bold text-slate-600">Confirmação de estorno via PIX</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar diálogo"
            className="text-slate-600 hover:text-slate-950 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
          >
            <Icon name="close" size="md" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-3.5 text-xs text-slate-800">
          <p className="text-slate-950 font-semibold leading-relaxed">
            Tem certeza de que deseja cancelar sua reserva na viagem {ride ? `para ${ride.destinationCity}` : ''}?
          </p>

          {/* Refund Breakdown Card */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-md p-3.5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-700">Sinal pago anteriormente:</span>
              <span className="font-bold text-slate-950">R$ {booking.amountPaidSignal.toFixed(2).replace('.', ',')}</span>
            </div>

            <div className="flex justify-between items-center text-xs pt-1 border-t border-amber-200">
              <span className="font-bold text-emerald-950">Valor a ser estornado ({refundPercent}%):</span>
              <span className="font-black text-emerald-950 text-sm">R$ {refundAmount.toFixed(2).replace('.', ',')}</span>
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-600 pt-1 border-t border-amber-200">
              <span>Retenção operacional:</span>
              <span>R$ {operationalFee.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-slate-100 p-2.5 rounded-md border border-slate-300 text-[11px] text-slate-700 font-medium">
            <Icon name="info" size="sm" className="text-slate-600 shrink-0 mt-0.5" />
            <span>O estorno de R$ {refundAmount.toFixed(2).replace('.', ',')} será enviado automaticamente para sua chave PIX cadastrada.</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5 pt-2 border-t border-slate-300">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            className="flex-1 h-11 font-bold"
          >
            Manter Reserva
          </Button>

          <Button
            variant="danger"
            size="md"
            iconLeft="cancel"
            onClick={onConfirm}
            className="flex-1 h-11 font-black"
          >
            Confirmar Cancelamento
          </Button>
        </div>

      </div>
    </div>
  );
};
