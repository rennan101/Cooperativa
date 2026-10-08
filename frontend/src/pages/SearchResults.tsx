import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { RideCard } from '../components/rides/RideCard';
import { HeroSearchBar } from '../components/search/HeroSearchBar';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export const SearchResults: React.FC = () => {
  const { rides, searchParams } = useAppStore();

  const [hasAC, setHasAC] = useState(false);
  const [sortBy, setSortBy] = useState<'EARLIEST' | 'CHEAPEST'>('EARLIEST');

  // Filter rides
  const filteredRides = rides.filter(ride => {
    const matchOrigin = !searchParams.origin || 
      ride.originCity.toLowerCase().includes(searchParams.origin.toLowerCase().split(',')[0].trim());
    const matchDest = !searchParams.destination || 
      ride.destinationCity.toLowerCase().includes(searchParams.destination.toLowerCase().split(',')[0].trim());
    const matchSeats = ride.availableSeats >= (searchParams.seats || 1);
    const matchAC = !hasAC || ride.vehicle.hasAC;

    return matchOrigin && matchDest && matchSeats && matchAC;
  }).sort((a, b) => {
    if (sortBy === 'CHEAPEST') return a.pricePerSeat - b.pricePerSeat;
    return a.departureTime.localeCompare(b.departureTime);
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 text-left animate-fade-in">
      
      {/* Top Search Bar */}
      <div className="mb-6">
        <HeroSearchBar />
      </div>

      {/* Quick Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white p-3 rounded-md border-2 border-slate-300 shadow-xs mb-5 h-auto sm:h-14">
        
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {/* AC Filter Toggle Button */}
          <button
            onClick={() => setHasAC(!hasAC)}
            className={`h-9 px-3 flex items-center gap-1.5 text-xs font-black rounded-md border-2 transition-colors shrink-0 ${
              hasAC
                ? 'bg-emerald-100 text-emerald-950 border-coop-primary'
                : 'bg-white text-slate-900 border-slate-400 hover:bg-slate-100'
            }`}
          >
            <Icon name="ac_unit" size="sm" className={hasAC ? 'text-sky-700' : 'text-slate-600'} />
            <span>Ar-condicionado</span>
          </button>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-1.5 h-9 shrink-0">
          <Icon name="sort" size="sm" className="text-slate-700" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'EARLIEST' | 'CHEAPEST')}
            className="h-9 bg-slate-100 border border-slate-400 rounded-md px-2.5 text-xs font-black text-slate-950 focus:outline-none focus:ring-1 focus:ring-coop-primary cursor-pointer"
          >
            <option value="EARLIEST">Mais cedo</option>
            <option value="CHEAPEST">Menor preço</option>
          </select>
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-3 h-6">
        <span className="text-sm font-black text-slate-950">
          {filteredRides.length} {filteredRides.length === 1 ? 'viagem encontrada' : 'viagens encontradas'}
        </span>
        <span className="text-xs font-bold text-slate-700">
          Data: {new Date(searchParams.date + 'T00:00:00').toLocaleDateString('pt-BR')}
        </span>
      </div>

      {/* Results List */}
      <div className="flex flex-col gap-3">
        {filteredRides.length > 0 ? (
          filteredRides.map(ride => (
            <RideCard key={ride.id} ride={ride} />
          ))
        ) : (
          <div className="bg-white border-2 border-slate-300 rounded-lg p-8 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-md flex items-center justify-center">
              <Icon name="search_off" size="md" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-950">Nenhuma viagem disponível</h3>
              <p className="text-slate-700 text-xs font-medium mt-0.5">Tente limpar os filtros ou selecionar outra data.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconLeft="restart_alt"
              onClick={() => setHasAC(false)}
              className="h-10 font-bold"
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};
