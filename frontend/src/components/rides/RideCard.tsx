import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ride } from '../../types';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';

export interface RideCardProps {
  ride: Ride;
}

export const RideCard: React.FC<RideCardProps> = ({ ride }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => navigate(`/viagem/${ride.id}`)}
      className="p-4 sm:p-5 flex flex-col gap-4 text-left border border-uber-border hover:border-uber-black hover:bg-uber-gray/30 transition-all bg-white"
    >
      {/* Route & Price Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        
        {/* Route Details */}
        <div className="flex-1 flex flex-col gap-2 min-w-0 w-full sm:w-auto">
          
          {/* Departure */}
          <div className="flex items-center gap-3">
            <span className="text-sm sm:text-base font-bold text-uber-black w-12 shrink-0">
              {ride.departureTime}
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-uber-black shrink-0" />
            <span className="text-sm sm:text-base font-semibold text-uber-black truncate">
              {ride.originCity}
            </span>
            <span className="text-xs text-uber-iron truncate hidden md:inline">
              ({ride.originSpot})
            </span>
          </div>

          {/* Stepper Line + Duration */}
          <div className="flex items-center gap-3 pl-12 -my-1">
            <div className="w-0.5 h-4 bg-uber-border ml-[4px]" />
            <div className="flex items-center gap-1 text-[11px] font-medium text-uber-iron pl-3">
              <Icon name="schedule" size="sm" className="text-uber-iron" />
              <span>{ride.estimatedDuration}</span>
            </div>
          </div>

          {/* Arrival */}
          <div className="flex items-center gap-3">
            <span className="text-sm sm:text-base font-bold text-uber-black w-12 shrink-0">
              {ride.estimatedArrivalTime}
            </span>
            <div className="w-2.5 h-2.5 bg-uber-black shrink-0" />
            <span className="text-sm sm:text-base font-semibold text-uber-black truncate">
              {ride.destinationCity}
            </span>
            <span className="text-xs text-uber-iron truncate hidden md:inline">
              ({ride.destinationSpot})
            </span>
          </div>

        </div>

        {/* Price & Seats Available (Aligned Horizontally on mobile) */}
        <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-uber-border shrink-0">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-uber-iron sm:hidden">Valor:</span>
            <span className="text-xl sm:text-2xl font-extrabold text-uber-black tracking-tight">
              R$ {ride.pricePerSeat.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Available Seats */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-uber-charcoal mt-1">
            <Icon name="airline_seat_recline_normal" size="sm" className="text-uber-black" />
            <span>{ride.availableSeats} {ride.availableSeats === 1 ? 'lugar' : 'lugares'}</span>
          </div>
        </div>

      </div>

      {/* Driver and Amenities Row */}
      <div className="flex items-center justify-between pt-3 border-t border-uber-border">
        
        {/* Driver Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={ride.driverAvatar}
            alt={ride.driverName}
            className="w-7 h-7 rounded-full object-cover border border-uber-border shrink-0"
          />
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-xs text-uber-black truncate">{ride.driverName}</span>
            <span className="text-uber-border">•</span>
            
            <div className="flex items-center gap-0.5 text-xs text-uber-black font-semibold shrink-0">
              <Icon name="star" size="sm" fill className="text-uber-black" />
              <span>{ride.driverRating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Vehicle Amenities */}
        <div className="flex items-center gap-2 text-uber-iron shrink-0">
          {ride.vehicle.hasAC && (
            <span title="Ar-condicionado" className="flex items-center">
              <Icon name="ac_unit" size="sm" className="text-uber-iron" />
            </span>
          )}
          {ride.vehicle.hasUSB && (
            <span title="Carregador USB" className="flex items-center">
              <Icon name="usb" size="sm" className="text-uber-iron" />
            </span>
          )}
          <span title={ride.vehicle.model} className="flex items-center text-xs text-uber-iron font-medium hidden sm:inline">
            <Icon name="directions_car" size="sm" className="text-uber-iron mr-1" />
            {ride.vehicle.model}
          </span>
        </div>

      </div>
    </Card>
  );
};

