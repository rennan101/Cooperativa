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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-lg border-2 border-slate-400 shadow-2xl max-w-lg w-full p-5 sm:p-7 text-left max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-300">
          <div className="flex items-center gap-2">
            <div className="bg-coop-primary text-white w-8 h-8 rounded-md flex items-center justify-center font-bold">
              <Icon name="receipt_long" size="md" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-950 leading-tight">Comprovante Digital Oficial</h3>
              <p className="text-[11px] font-bold text-slate-600">Cooperativa de Viagens Compartilhadas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar comprovante"
            className="text-slate-600 hover:text-slate-950 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
          >
            <Icon name="close" size="md" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="py-4 space-y-4 text-xs text-slate-900">
          
          {/* Status Banner */}
          <div className="bg-emerald-50 border-2 border-emerald-400 rounded-md p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="verified" size="md" className="text-coop-primary shrink-0" fill />
              <div>
                <p className="font-black text-xs text-emerald-950">Pagamento Garantido em Custódia</p>
                <p className="text-[11px] font-semibold text-emerald-800">Sinal de 50% confirmado via PIX</p>
              </div>
            </div>
            <span className="font-mono text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-sm border border-emerald-300">
              {booking.id}
            </span>
          </div>

          {/* Passenger & Ride Info */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-300 rounded-md">
            <div>
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Passageiro:</span>
              <p className="font-black text-slate-950">{booking.passengerName}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Motorista:</span>
              <p className="font-black text-slate-950">{ride ? ride.driverName : 'Motorista Credenciado'}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Data da Emissão:</span>
              <p className="font-semibold text-slate-900">{new Date(booking.createdAt).toLocaleDateString('pt-BR')} às {new Date(booking.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Assentos Reservados:</span>
              <p className="font-black text-slate-950">{booking.seatsBooked} {booking.seatsBooked === 1 ? 'vaga' : 'vagas'}</p>
            </div>
          </div>

          {/* Route Section */}
          {ride && (
            <div className="p-3 border border-slate-300 rounded-md space-y-2">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Itinerário da Viagem:</span>
              <div className="flex items-center justify-between text-xs font-bold text-slate-950">
                <span>{ride.originCity} ({ride.originSpot})</span>
                <span className="text-coop-primary">➔</span>
                <span>{ride.destinationCity} ({ride.destinationSpot})</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-700">
                Partida: <strong>{ride.departureDate}</strong> às <strong>{ride.departureTime}</strong> • Chegada Estimada: <strong>{ride.estimatedArrivalTime}</strong>
              </p>
            </div>
          )}

          {/* Financial Breakdown */}
          <div className="p-3 bg-slate-100 border border-slate-300 rounded-md space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-700">Valor Total da Corrida:</span>
              <span className="font-bold text-slate-950">R$ {booking.totalAmount.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-300">
              <span className="font-bold text-emerald-900">Sinal 50% Pago (Custódia):</span>
              <span className="font-black text-emerald-900 text-sm">R$ {booking.amountPaidSignal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-300">
              <span className="font-medium text-slate-700">Saldo Restante na Chegada:</span>
              <span className="font-bold text-slate-950">R$ {booking.amountDueFinal.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          {/* Audit & Security Footer */}
          <div className="text-[10px] text-slate-600 font-mono text-center p-2 bg-slate-50 border border-slate-200 rounded-md truncate">
            Autenticação Bancária: BCB-PIX-CUSTODIA-{booking.id.toUpperCase()}
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 pt-2 border-t border-slate-300">
          <Button
            variant="outline"
            size="md"
            iconLeft="print"
            onClick={handlePrint}
            className="flex-1 h-11 font-bold"
          >
            Imprimir / PDF
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={onClose}
            className="flex-1 h-11 font-black"
          >
            Concluir
          </Button>
        </div>

      </div>
    </div>
  );
};
