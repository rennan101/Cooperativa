import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Booking } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { Alert } from '../components/ui/Alert';
import { PixModal } from '../components/booking/PixModal';

export const RideDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { rides, bookRide, searchParams, role } = useAppStore();

  const [selectedSeats, setSelectedSeats] = useState(searchParams.seats || 1);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [showPixModal, setShowPixModal] = useState(false);

  const ride = rides.find(r => r.id === id);

  if (!ride) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center animate-fade-in">
        <Icon name="error_outline" size="xl" className="text-red-600 mb-2" />
        <h2 className="text-xl font-bold text-uber-black">Viagem não encontrada</h2>
        <Button variant="primary" size="md" onClick={() => navigate('/')} className="mt-4 font-semibold">
          Voltar para Início
        </Button>
      </div>
    );
  }

  const totalAmount = ride.pricePerSeat * selectedSeats;
  const signalAmount = totalAmount * 0.5;
  const finalAmount = totalAmount * 0.5;

  const handleStartBooking = () => {
    if (role === 'DRIVER') return;
    const booking = bookRide(ride.id, selectedSeats);
    setActiveBooking(booking);
    setShowPixModal(true);
  };

  const isDriverMode = role === 'DRIVER';

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 text-left pb-40 md:pb-12 animate-fade-in">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-xs font-bold text-uber-black hover:text-uber-iron mb-4 transition-colors"
      >
        <Icon name="arrow_back" size="sm" />
        <span>Voltar</span>
      </button>

      <div className="flex flex-col gap-4">
        
        {/* Main Route Card */}
        <Card className="p-4 sm:p-5 border border-uber-border bg-white rounded-xl">
          
          <div className="flex items-center justify-between pb-3 border-b border-uber-border">
            <div className="flex items-center gap-2">
              <Icon name="calendar_today" size="sm" className="text-uber-black" />
              <span className="text-xs sm:text-sm font-bold text-uber-black">
                {ride.departureDate}
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-xs font-semibold text-uber-charcoal">
              <Icon name="airline_seat_recline_normal" size="sm" className="text-uber-black" />
              <span>{ride.availableSeats} {ride.availableSeats === 1 ? 'lugar restante' : 'lugares restantes'}</span>
            </div>
          </div>

          {/* Timeline Route with Clean Waypoints */}
          <div className="py-4 flex flex-col gap-3">
            
            {/* Origin */}
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-uber-black shrink-0 mt-1.5" />
                <div className="w-0.5 h-10 bg-uber-border my-1" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold text-uber-black">{ride.departureTime}</span>
                  <span className="text-sm font-semibold text-uber-black">{ride.originCity}</span>
                </div>
                <div className="text-xs text-uber-iron mt-0.5">
                  <span>Ponto de Encontro: <strong className="text-uber-black font-semibold">{ride.originSpot}</strong></span>
                </div>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 bg-uber-black shrink-0 mt-1.5" />
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold text-uber-black">{ride.estimatedArrivalTime}</span>
                  <span className="text-sm font-semibold text-uber-black">{ride.destinationCity}</span>
                </div>
                <div className="text-xs text-uber-iron mt-0.5">
                  <span>Ponto de Chegada: <strong className="text-uber-black font-semibold">{ride.destinationSpot}</strong></span>
                </div>
              </div>
            </div>

          </div>

          {ride.notes && (
            <div className="pt-3 border-t border-uber-border text-xs text-uber-charcoal bg-uber-gray p-3 rounded-lg font-normal">
              <span className="font-bold text-uber-black block mb-0.5">Observações do Motorista:</span>
              {ride.notes}
            </div>
          )}
        </Card>

        {/* Driver and Vehicle Card */}
        <Card className="p-4 sm:p-5 border border-uber-border bg-white rounded-xl">
          <div className="flex items-center justify-between pb-3 border-b border-uber-border h-12">
            <div className="flex items-center gap-3">
              <img
                src={ride.driverAvatar}
                alt={ride.driverName}
                className="w-10 h-10 rounded-full object-cover border border-uber-border"
              />
              <div>
                <span className="text-sm font-bold text-uber-black block leading-tight">{ride.driverName}</span>
                <div className="flex items-center gap-1.5 text-xs text-uber-iron font-medium mt-0.5">
                  <span className="flex items-center gap-0.5 text-uber-black font-bold">
                    <Icon name="star" size="sm" fill className="text-uber-black" />
                    {ride.driverRating.toFixed(1)}
                  </span>
                  <span>•</span>
                  <span>{ride.driverTripsCount} viagens</span>
                </div>
              </div>
            </div>

            {/* Vehicle Specs Icons */}
            <div className="flex items-center gap-2 text-uber-iron">
              {ride.vehicle.hasAC && (
                <span title="Ar-condicionado" className="p-1.5 bg-uber-gray rounded-lg border border-uber-border">
                  <Icon name="ac_unit" size="sm" className="text-uber-black" />
                </span>
              )}
              {ride.vehicle.hasUSB && (
                <span title="USB" className="p-1.5 bg-uber-gray rounded-lg border border-uber-border">
                  <Icon name="usb" size="sm" className="text-uber-black" />
                </span>
              )}
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between text-xs text-uber-charcoal h-6 font-medium">
            <span>Veículo: <strong className="text-uber-black font-semibold">{ride.vehicle.brand} {ride.vehicle.model}</strong></span>
            <span>Placa: <strong className="text-uber-black font-semibold">{ride.vehicle.plate}</strong></span>
          </div>
        </Card>

        {/* Payment and Seat Selector Card (Only for non-drivers) */}
        {!isDriverMode && (
          <Card className="p-4 sm:p-5 border border-uber-border bg-white rounded-xl">
            <div className="flex items-center justify-between pb-3 border-b border-uber-border">
              <span className="text-xs font-bold text-uber-black uppercase tracking-wider">
                Lugares para reservar
              </span>

              <select
                value={selectedSeats}
                onChange={(e) => setSelectedSeats(Number(e.target.value))}
                className="h-10 bg-uber-gray border border-uber-border rounded-lg px-3 font-semibold text-uber-black focus:outline-none focus:border-uber-black text-sm cursor-pointer"
              >
                {Array.from({ length: ride.availableSeats }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'lugar' : 'lugares'} (R$ {(ride.pricePerSeat * num).toFixed(2).replace('.', ',')})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="p-3 bg-uber-gray rounded-lg border border-uber-border text-left">
                <span className="text-xs font-semibold text-uber-iron block">Sinal Agora (50%):</span>
                <span className="text-xl font-extrabold text-uber-black">
                  R$ {signalAmount.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <div className="p-3 bg-uber-gray rounded-lg border border-uber-border text-left">
                <span className="text-xs font-semibold text-uber-iron block">Na Chegada (50%):</span>
                <span className="text-xl font-extrabold text-uber-black">
                  R$ {finalAmount.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <Alert variant="info">
              <p className="text-xs font-normal text-uber-charcoal">
                Cancelamento com devolução de 70% (&gt;1h) ou 50% (&lt;1h) via PIX.
              </p>
            </Alert>

            {/* Desktop Booking Button */}
            <div className="hidden md:block mt-4">
              <Button
                variant="primary"
                size="lg"
                iconLeft="payments"
                onClick={handleStartBooking}
                className="w-full h-12 font-bold text-base"
              >
                Reservar com PIX (50%)
              </Button>
            </div>
          </Card>
        )}

      </div>

      {/* Mobile Sticky Booking Footer (Only for non-drivers) */}
      {!isDriverMode && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-uber-border p-3 shadow-lg flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[11px] font-semibold text-uber-iron block leading-none">Sinal 50%</span>
            <span className="text-xl font-extrabold text-uber-black">
              R$ {signalAmount.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <Button
            variant="primary"
            size="md"
            iconLeft="payments"
            onClick={handleStartBooking}
            className="flex-1 h-11 font-bold"
          >
            Reservar com PIX
          </Button>
        </div>
      )}

      {/* Pix Modal */}
      {showPixModal && activeBooking && (
        <PixModal
          booking={activeBooking}
          onClose={() => setShowPixModal(false)}
          onPaymentSuccess={() => {
            setShowPixModal(false);
            navigate('/minhas-viagens');
          }}
        />
      )}

    </div>
  );
};

