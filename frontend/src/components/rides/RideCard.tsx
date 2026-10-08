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
      className="p-4 sm:p-5 flex flex-col gap-3.5 text-left border-2 border-slate-300 hover:border-coop-primary transition-all bg-white shadow-xs"
    >
      {/* Route & Price Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        
        {/* Route Details */}
        <div className="flex-1 flex flex-col gap-1.5 min-w-0 w-full sm:w-auto">
          
          {/* Departure */}
          <div className="flex items-center gap-2.5 h-6">
            <span className="text-base font-black text-slate-950 w-12 shrink-0">
              {ride.departureTime}
            </span>
            <Icon name="trip_origin" size="sm" className="text-coop-primary shrink-0" />
            <span className="text-sm font-extrabold text-slate-950 truncate">
              {ride.originCity}
            </span>
            <span className="text-xs text-slate-600 font-medium truncate hidden md:inline">
              ({ride.originSpot})
            </span>
          </div>

          {/* Stepper Line + Duration */}
          <div className="flex items-center gap-2.5 h-4 pl-12 -my-0.5">
            <div className="w-0.5 h-full bg-slate-400 ml-1.5" />
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 pl-3">
              <Icon name="schedule" size="sm" className="text-slate-600" />
              <span>{ride.estimatedDuration}</span>
            </div>
          </div>

          {/* Arrival */}
          <div className="flex items-center gap-2.5 h-6">
            <span className="text-base font-black text-slate-950 w-12 shrink-0">
              {ride.estimatedArrivalTime}
            </span>
            <Icon name="location_on" size="sm" className="text-red-600 shrink-0" />
            <span className="text-sm font-extrabold text-slate-950 truncate">
              {ride.destinationCity}
            </span>
            <span className="text-xs text-slate-600 font-medium truncate hidden md:inline">
              ({ride.destinationSpot})
            </span>
          </div>

        </div>

        {/* Price & Seats Available (Aligned Horizontally) */}
        <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 shrink-0">
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-slate-700 sm:hidden">Valor:</span>
            <span className="text-2xl font-black text-slate-950">
              R$ {ride.pricePerSeat.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Available Seats with Icon Only + Number */}
          <div className="flex items-center gap-1 text-xs font-black text-emerald-800 h-6">
            <Icon name="airline_seat_recline_normal" size="sm" className="text-coop-primary" />
            <span>{ride.availableSeats} {ride.availableSeats === 1 ? 'vaga' : 'vagas'}</span>
          </div>
        </div>

      </div>

      {/* Driver and Amenities Row (Aligned horizontally on same height) */}
      <div className="flex items-center justify-between pt-2.5 border-t border-slate-200 h-10">
        
        {/* Driver Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={ride.driverAvatar}
            alt={ride.driverName}
            className="w-8 h-8 rounded-md object-cover border border-slate-400 shrink-0"
          />
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-extrabold text-xs text-slate-950 truncate">{ride.driverName}</span>
            <span className="text-slate-400">•</span>
            
            <div className="flex items-center gap-0.5 text-xs text-amber-700 font-black shrink-0">
              <Icon name="star" size="sm" fill />
              <span>{ride.driverRating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Vehicle Amenities (Clean Icons, No Badges) */}
        <div className="flex items-center gap-2 text-slate-700 shrink-0">
          {ride.vehicle.hasAC && (
            <span title="Ar-condicionado" className="flex items-center">
              <Icon name="ac_unit" size="sm" className="text-sky-700" />
            </span>
          )}
          {ride.vehicle.hasUSB && (
            <span title="Carregador USB" className="flex items-center">
              <Icon name="usb" size="sm" className="text-slate-700" />
            </span>
          )}
          <span title={ride.vehicle.model} className="flex items-center text-xs text-slate-700 font-bold hidden sm:inline">
            <Icon name="directions_car" size="sm" className="text-slate-600 mr-1" />
            {ride.vehicle.model}
          </span>
        </div>

      </div>
    </Card>
  );
};
