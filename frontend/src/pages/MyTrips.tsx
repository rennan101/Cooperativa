import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { useToastStore } from '../store/useToastStore';
import { Booking } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { ReceiptModal } from '../components/booking/ReceiptModal';
import { CancelBookingModal } from '../components/booking/CancelBookingModal';

export const MyTrips: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, rides, currentUser, cancelBooking, role } = useAppStore();
  const { addToast } = useToastStore();

  const [selectedReceiptBooking, setSelectedReceiptBooking] = useState<Booking | null>(null);
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null);

  const myPublishedRides = rides.filter(r => r.driverId === currentUser.id);

  const handleExecuteCancel = () => {
    if (!cancellingBooking) return;
    const result = cancelBooking(cancellingBooking.id);
    setCancellingBooking(null);
    addToast(`Reserva cancelada. Estorno de R$ ${result.refundAmount.toFixed(2).replace('.', ',')} enviado via PIX.`, 'warning');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 text-left pb-24 md:pb-12 animate-fade-in">
      
      {/* Page Title & Action */}
      <div className="flex justify-between items-center gap-3 mb-6 h-10">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-950">
            {role === 'DRIVER' ? 'Minhas Viagens (Motorista)' : 'Minhas Reservas'}
          </h1>
        </div>

        {role === 'PASSENGER' && (
          <Button
            variant="outline"
            size="sm"
            iconLeft="search"
            onClick={() => navigate('/buscar')}
            className="h-9 px-3 text-xs font-bold"
          >
            Buscar
          </Button>
        )}
      </div>

      {/* 1. SEÇÃO PASSAGEIRO: Apenas visível para Passageiro */}
      {role === 'PASSENGER' && (
        <div className="space-y-3">
          {bookings.length > 0 ? (
            bookings.map(booking => {
              const ride = rides.find(r => r.id === booking.rideId);
              return (
                <Card key={booking.id} className="p-4 border-2 border-slate-300 bg-white shadow-xs">
                  
                  {/* Top Status Row */}
                  <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 h-7 text-xs">
                    <span className="font-mono font-bold text-slate-700">{booking.id}</span>

                    {/* Status icon + label */}
                    {booking.status === 'SIGNAL_CONFIRMED' && (
                      <span className="flex items-center gap-1 font-black text-emerald-800">
                        <Icon name="check_circle" size="sm" className="text-coop-primary" />
                        <span>Sinal 50% Pago</span>
                      </span>
                    )}
                    {booking.status === 'FULLY_PAID' && (
                      <span className="flex items-center gap-1 font-black text-emerald-800">
                        <Icon name="verified" size="sm" className="text-coop-primary" />
                        <span>100% Concluído</span>
                      </span>
                    )}
                    {booking.status === 'AWAITING_PAYMENT' && (
                      <span className="flex items-center gap-1 font-black text-amber-800">
                        <Icon name="hourglass_top" size="sm" className="text-amber-600" />
                        <span>Aguardando PIX</span>
                      </span>
                    )}
                    {booking.status === 'CANCELLED' && (
                      <span className="flex items-center gap-1 font-black text-red-700">
                        <Icon name="cancel" size="sm" className="text-red-600" />
                        <span>Cancelada</span>
                      </span>
                    )}
                  </div>

                  {ride && (
                    <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Icon name="directions_car" size="sm" className="text-slate-600 shrink-0" />
                        <div>
                          <p className="font-black text-sm text-slate-950">{ride.originCity} ➔ {ride.destinationCity}</p>
                          <p className="text-slate-700 font-semibold">{ride.departureDate} às {ride.departureTime} • {ride.driverName}</p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="font-black text-emerald-800 text-sm block">
                          Sinal: R$ {booking.amountPaidSignal.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-slate-700 font-semibold">
                          Final: R$ {booking.amountDueFinal.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  )}

                  {booking.status !== 'CANCELLED' && (
                    <div className="pt-2.5 border-t border-slate-200 flex flex-wrap justify-end gap-2 text-xs">
                      {ride && (
                        <>
                          <button
                            onClick={() => navigate(`/chat/${ride.id}`)}
                            className="font-bold text-slate-800 hover:text-coop-primary flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 rounded-md border border-slate-300 transition-colors"
                          >
                            <Icon name="chat" size="sm" />
                            <span>Conversar</span>
                          </button>

                          <button
                            onClick={() => navigate(`/avaliar/${ride.id}`)}
                            className="font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 rounded-md border border-amber-300 transition-colors"
                          >
                            <Icon name="star" size="sm" fill />
                            <span>Avaliar</span>
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => setSelectedReceiptBooking(booking)}
                        className="font-bold text-slate-800 hover:text-coop-primary flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 rounded-md border border-slate-300 transition-colors"
                      >
                        <Icon name="receipt" size="sm" />
                        <span>Comprovante</span>
                      </button>

                      <button
                        onClick={() => setCancellingBooking(booking)}
                        className="font-bold text-red-700 hover:text-red-800 flex items-center gap-1 px-2.5 py-1.5 bg-red-50 rounded-md border border-red-300 transition-colors"
                      >
                        <Icon name="cancel" size="sm" />
                        <span>Cancelar</span>
                      </button>
                    </div>
                  )}
                </Card>
              );
            })
          ) : (
            <div className="bg-white border-2 border-slate-300 rounded-md p-6 text-center text-slate-700 text-xs font-bold">
              Nenhuma reserva encontrada.
            </div>
          )}
        </div>
      )}

      {/* 2. SEÇÃO MOTORISTA: Apenas visível para Motorista */}
      {role === 'DRIVER' && (
        <div className="space-y-3">
          {myPublishedRides.length > 0 ? (
            myPublishedRides.map(ride => (
              <Card key={ride.id} className="p-4 border-2 border-slate-300 bg-white shadow-xs">
                <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 h-7 text-xs">
                  <span className="font-black text-sm text-slate-950">
                    {ride.originCity} ➔ {ride.destinationCity}
                  </span>

                  <span className="flex items-center gap-1 font-black text-emerald-800">
                    <Icon name="airline_seat_recline_normal" size="sm" className="text-coop-primary" />
                    <span>{ride.availableSeats}/{ride.totalSeats} vagas</span>
                  </span>
                </div>

                <div className="py-2.5 flex justify-between items-center text-xs">
                  <span className="text-slate-700 font-semibold">
                    {ride.departureDate} às {ride.departureTime}
                  </span>
                  <span className="font-black text-slate-950 text-sm">
                    R$ {ride.pricePerSeat.toFixed(2).replace('.', ',')} / vaga
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-end gap-2 text-xs">
                  <button
                    onClick={() => navigate(`/chat/${ride.id}`)}
                    className="font-bold text-slate-800 hover:text-coop-primary flex items-center gap-1 px-2.5 py-1 bg-slate-100 rounded-md border border-slate-300"
                  >
                    <Icon name="chat" size="sm" />
                    <span>Mensagens</span>
                  </button>

                  <button
                    onClick={() => navigate(`/viagem/${ride.id}`)}
                    className="font-black text-coop-primary hover:underline flex items-center gap-1 px-2 py-1"
                  >
                    <Icon name="visibility" size="sm" />
                    <span>Ver Detalhes</span>
                  </button>
                </div>
              </Card>
            ))
          ) : (
            <div className="bg-white border-2 border-slate-300 rounded-md p-6 text-center text-slate-700 text-xs font-bold">
              Você ainda não cadastrou nenhuma viagem como motorista.
            </div>
          )}
        </div>
      )}

      {/* 3. SEÇÃO ADMIN: Visão limpa de viagens */}
      {(role === 'ADMIN' || role === 'MANAGER') && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-700 mb-2">Visão geral administrativa das viagens cadastradas na plataforma:</p>
          {rides.map(ride => (
            <Card key={ride.id} className="p-4 border-2 border-slate-300 bg-white shadow-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 text-xs">
                <span className="font-black text-slate-950">{ride.originCity} ➔ {ride.destinationCity}</span>
                <span className="font-bold text-slate-700">Motorista: {ride.driverName}</span>
              </div>
              <div className="pt-2 flex justify-between items-center text-xs">
                <span className="text-slate-700">{ride.departureDate} às {ride.departureTime}</span>
                <span className="font-bold text-emerald-800">R$ {ride.pricePerSeat.toFixed(2).replace('.', ',')}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Receipt Modal */}
      {selectedReceiptBooking && (
        <ReceiptModal
          booking={selectedReceiptBooking}
          ride={rides.find(r => r.id === selectedReceiptBooking.rideId)}
          onClose={() => setSelectedReceiptBooking(null)}
        />
      )}

      {/* Cancel Confirmation Modal */}
      {cancellingBooking && (
        <CancelBookingModal
          booking={cancellingBooking}
          ride={rides.find(r => r.id === cancellingBooking.rideId)}
          onClose={() => setCancellingBooking(null)}
          onConfirm={handleExecuteCancel}
        />
      )}

    </div>
  );
};
