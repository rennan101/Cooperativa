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
          <h1 className="text-xl sm:text-2xl font-bold text-uber-black">
            {role === 'DRIVER' ? 'Minhas Viagens' : 'Minhas Reservas'}
          </h1>
        </div>

        {role === 'PASSENGER' && (
          <Button
            variant="secondary"
            size="sm"
            iconLeft="search"
            onClick={() => navigate('/buscar')}
            className="h-9 px-3.5 text-xs font-semibold rounded-full"
          >
            Buscar
          </Button>
        )}
      </div>

      {/* 1. SEÇÃO PASSAGEIRO */}
      {role === 'PASSENGER' && (
        <div className="space-y-3">
          {bookings.length > 0 ? (
            bookings.map(booking => {
              const ride = rides.find(r => r.id === booking.rideId);
              return (
                <Card key={booking.id} className="p-4 border border-uber-border bg-white rounded-xl">
                  
                  {/* Top Status Row */}
                  <div className="flex justify-between items-center pb-3 border-b border-uber-border text-xs">
                    <span className="font-mono font-medium text-uber-iron">{booking.id}</span>

                    {/* Status badge */}
                    {booking.status === 'SIGNAL_CONFIRMED' && (
                      <span className="flex items-center gap-1.5 font-bold text-uber-black bg-uber-gray px-2.5 py-1 rounded-full text-[11px]">
                        <Icon name="check_circle" size="sm" className="text-uber-black" />
                        <span>Sinal 50% Pago</span>
                      </span>
                    )}
                    {booking.status === 'FULLY_PAID' && (
                      <span className="flex items-center gap-1.5 font-bold text-uber-black bg-uber-gray px-2.5 py-1 rounded-full text-[11px]">
                        <Icon name="verified" size="sm" className="text-uber-black" />
                        <span>100% Concluído</span>
                      </span>
                    )}
                    {booking.status === 'AWAITING_PAYMENT' && (
                      <span className="flex items-center gap-1.5 font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full text-[11px]">
                        <Icon name="hourglass_top" size="sm" className="text-amber-700" />
                        <span>Aguardando PIX</span>
                      </span>
                    )}
                    {booking.status === 'CANCELLED' && (
                      <span className="flex items-center gap-1.5 font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full text-[11px]">
                        <Icon name="cancel" size="sm" className="text-red-600" />
                        <span>Cancelada</span>
                      </span>
                    )}
                  </div>

                  {ride && (
                    <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-uber-gray flex items-center justify-center shrink-0">
                          <Icon name="directions_car" size="sm" className="text-uber-black" />
                        </div>
                        <div>
                          <p className="font-bold text-sm sm:text-base text-uber-black">{ride.originCity} ➔ {ride.destinationCity}</p>
                          <p className="text-uber-iron font-normal mt-0.5">{ride.departureDate} às {ride.departureTime} • {ride.driverName}</p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right mt-1 sm:mt-0">
                        <span className="font-bold text-uber-black text-sm block">
                          Sinal: R$ {booking.amountPaidSignal.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-uber-iron font-normal text-xs">
                          Final: R$ {booking.amountDueFinal.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  )}

                  {booking.status !== 'CANCELLED' && (
                    <div className="pt-3 border-t border-uber-border flex flex-wrap justify-end gap-2 text-xs">
                      {ride && (
                        <>
                          <button
                            onClick={() => navigate(`/chat/${ride.id}`)}
                            className="font-semibold text-uber-black hover:bg-uber-border flex items-center gap-1.5 px-3 py-1.5 bg-uber-gray rounded-lg transition-colors active:scale-95"
                          >
                            <Icon name="chat" size="sm" />
                            <span>Conversar</span>
                          </button>

                          <button
                            onClick={() => navigate(`/avaliar/${ride.id}`)}
                            className="font-semibold text-uber-black hover:bg-uber-border flex items-center gap-1.5 px-3 py-1.5 bg-uber-gray rounded-lg transition-colors active:scale-95"
                          >
                            <Icon name="star" size="sm" fill className="text-uber-black" />
                            <span>Avaliar</span>
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => setSelectedReceiptBooking(booking)}
                        className="font-semibold text-uber-black hover:bg-uber-border flex items-center gap-1.5 px-3 py-1.5 bg-uber-gray rounded-lg transition-colors active:scale-95"
                      >
                        <Icon name="receipt" size="sm" />
                        <span>Comprovante</span>
                      </button>

                      <button
                        onClick={() => setCancellingBooking(booking)}
                        className="font-semibold text-red-600 hover:bg-red-100 flex items-center gap-1.5 px-3 py-1.5 bg-red-50 rounded-lg transition-colors active:scale-95"
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
            <div className="bg-white border border-uber-border rounded-xl p-8 text-center text-uber-iron text-xs font-normal">
              Nenhuma reserva encontrada.
            </div>
          )}
        </div>
      )}

      {/* 2. SEÇÃO MOTORISTA */}
      {role === 'DRIVER' && (
        <div className="space-y-3">
          {myPublishedRides.length > 0 ? (
            myPublishedRides.map(ride => (
              <Card key={ride.id} className="p-4 border border-uber-border bg-white rounded-xl">
                <div className="flex justify-between items-center pb-3 border-b border-uber-border text-xs">
                  <span className="font-bold text-sm sm:text-base text-uber-black">
                    {ride.originCity} ➔ {ride.destinationCity}
                  </span>

                  <span className="flex items-center gap-1.5 font-bold text-uber-black bg-uber-gray px-2.5 py-1 rounded-full text-[11px]">
                    <Icon name="airline_seat_recline_normal" size="sm" className="text-uber-black" />
                    <span>{ride.availableSeats}/{ride.totalSeats} lugares</span>
                  </span>
                </div>

                <div className="py-3 flex justify-between items-center text-xs">
                  <span className="text-uber-iron font-normal">
                    {ride.departureDate} às {ride.departureTime}
                  </span>
                  <span className="font-bold text-uber-black text-sm">
                    R$ {ride.pricePerSeat.toFixed(2).replace('.', ',')} / lugar
                  </span>
                </div>

                <div className="pt-3 border-t border-uber-border flex justify-end gap-2 text-xs">
                  <button
                    onClick={() => navigate(`/chat/${ride.id}`)}
                    className="font-semibold text-uber-black hover:bg-uber-border flex items-center gap-1.5 px-3 py-1.5 bg-uber-gray rounded-lg transition-colors active:scale-95"
                  >
                    <Icon name="chat" size="sm" />
                    <span>Mensagens</span>
                  </button>

                  <button
                    onClick={() => navigate(`/viagem/${ride.id}`)}
                    className="font-bold text-uber-black hover:underline flex items-center gap-1.5 px-3 py-1.5"
                  >
                    <Icon name="visibility" size="sm" />
                    <span>Ver Detalhes</span>
                  </button>
                </div>
              </Card>
            ))
          ) : (
            <div className="bg-white border border-uber-border rounded-xl p-8 text-center text-uber-iron text-xs font-normal">
              Você ainda não cadastrou nenhuma viagem como motorista.
            </div>
          )}
        </div>
      )}

      {/* 3. SEÇÃO ADMIN */}
      {(role === 'ADMIN' || role === 'MANAGER') && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-uber-iron mb-2">Visão geral administrativa das viagens cadastradas na plataforma:</p>
          {rides.map(ride => (
            <Card key={ride.id} className="p-4 border border-uber-border bg-white rounded-xl">
              <div className="flex justify-between items-center pb-2.5 border-b border-uber-border text-xs">
                <span className="font-bold text-uber-black">{ride.originCity} ➔ {ride.destinationCity}</span>
                <span className="font-medium text-uber-iron">Motorista: {ride.driverName}</span>
              </div>
              <div className="pt-2.5 flex justify-between items-center text-xs">
                <span className="text-uber-iron font-normal">{ride.departureDate} às {ride.departureTime}</span>
                <span className="font-bold text-uber-black">R$ {ride.pricePerSeat.toFixed(2).replace('.', ',')}</span>
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

