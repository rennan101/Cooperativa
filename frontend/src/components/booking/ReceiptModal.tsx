import React from 'react';
import { Booking, Ride } from '../../types';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

export interface ReceiptModalProps {
  booking: Booking;
  ride?: Ride;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  booking,
  ride,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-uber-black/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl border border-uber-border shadow-2xl max-w-lg w-full p-5 sm:p-7 text-left max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-uber-border">
          <div className="flex items-center gap-3">
            <div className="bg-uber-black text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">
              <Icon name="receipt_long" size="sm" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-uber-black leading-tight">Comprovante Digital</h3>
              <p className="text-[11px] font-normal text-uber-iron">Cooperativa de Viagens Compartilhadas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar comprovante"
            className="text-uber-iron hover:text-uber-black p-1.5 rounded-lg hover:bg-uber-gray transition-colors"
          >
            <Icon name="close" size="md" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="py-4 space-y-4 text-xs text-uber-charcoal">
          
          {/* Status Banner */}
          <div className="bg-uber-gray border border-uber-border rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Icon name="verified" size="md" className="text-uber-black shrink-0" fill />
              <div>
                <p className="font-bold text-xs text-uber-black">Pagamento Garantido em Custódia</p>
                <p className="text-[11px] font-normal text-uber-iron">Sinal de 50% confirmado via PIX</p>
              </div>
            </div>
            <span className="font-mono text-[11px] font-medium text-uber-black bg-white px-2 py-0.5 rounded-md border border-uber-border">
              {booking.id}
            </span>
          </div>

          {/* Passenger & Ride Info */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-uber-gray border border-uber-border rounded-xl">
            <div>
              <span className="text-[10px] font-semibold text-uber-iron uppercase tracking-wider block">Passageiro:</span>
              <p className="font-bold text-uber-black mt-0.5">{booking.passengerName}</p>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-uber-iron uppercase tracking-wider block">Motorista:</span>
              <p className="font-bold text-uber-black mt-0.5">{ride ? ride.driverName : 'Motorista Credenciado'}</p>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-uber-iron uppercase tracking-wider block">Data da Emissão:</span>
              <p className="font-medium text-uber-black mt-0.5">{new Date(booking.createdAt).toLocaleDateString('pt-BR')} às {new Date(booking.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-uber-iron uppercase tracking-wider block">Lugares:</span>
              <p className="font-bold text-uber-black mt-0.5">{booking.seatsBooked} {booking.seatsBooked === 1 ? 'lugar' : 'lugares'}</p>
            </div>
          </div>

          {/* Route Section */}
          {ride && (
            <div className="p-3.5 border border-uber-border rounded-xl space-y-2">
              <span className="text-[10px] font-semibold text-uber-iron uppercase tracking-wider block">Itinerário:</span>
              <div className="flex items-center justify-between text-xs font-bold text-uber-black">
                <span>{ride.originCity} ({ride.originSpot})</span>
                <span className="text-uber-black">➔</span>
                <span>{ride.destinationCity} ({ride.destinationSpot})</span>
              </div>
              <p className="text-[11px] font-normal text-uber-iron">
                Partida: <strong className="text-uber-black">{ride.departureDate}</strong> às <strong className="text-uber-black">{ride.departureTime}</strong> • Chegada Estimada: <strong className="text-uber-black">{ride.estimatedArrivalTime}</strong>
              </p>
            </div>
          )}

          {/* Financial Breakdown */}
          <div className="p-3.5 bg-uber-gray border border-uber-border rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-normal text-uber-iron">Valor Total da Corrida:</span>
              <span className="font-bold text-uber-black">R$ {booking.totalAmount.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1.5 border-t border-uber-border">
              <span className="font-semibold text-uber-black">Sinal 50% Pago (Custódia):</span>
              <span className="font-extrabold text-uber-black text-sm">R$ {booking.amountPaidSignal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1.5 border-t border-uber-border">
              <span className="font-normal text-uber-iron">Saldo Restante na Chegada:</span>
              <span className="font-bold text-uber-black">R$ {booking.amountDueFinal.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          {/* Audit & Security Footer */}
          <div className="text-[10px] text-uber-iron font-mono text-center p-2.5 bg-white border border-uber-border rounded-lg truncate">
            Autenticação Bancária: BCB-PIX-CUSTODIA-{booking.id.toUpperCase()}
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 pt-2 border-t border-uber-border">
          <Button
            variant="secondary"
            size="md"
            iconLeft="print"
            onClick={handlePrint}
            className="flex-1 h-11 font-semibold"
          >
            Imprimir / PDF
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={onClose}
            className="flex-1 h-11 font-bold"
          >
            Concluir
          </Button>
        </div>

      </div>
    </div>
  );
};

