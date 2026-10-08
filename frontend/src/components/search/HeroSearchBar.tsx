import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { useAppStore } from '../../store/useAppStore';

const POPULAR_CITIES = [
  'São Paulo, SP',
  'Campinas, SP',
  'Santos, SP',
  'São José dos Campos, SP',
  'Sorocaba, SP',
  'Ribeirão Preto, SP',
  'Belo Horizonte, MG',
  'Ouro Preto, MG',
  'Rio de Janeiro, RJ',
  'Curitiba, PR',
];

export const HeroSearchBar: React.FC = () => {
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useAppStore();

  const [origin, setOrigin] = useState(searchParams.origin);
  const [destination, setDestination] = useState(searchParams.destination);
  const [date, setDate] = useState(searchParams.date);
  const [seats, setSeats] = useState(searchParams.seats);

  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ origin, destination, date, seats });
    navigate('/buscar');
  };

  const handleSwapCities = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const filteredOriginCities = POPULAR_CITIES.filter(c =>
    c.toLowerCase().includes(origin.toLowerCase())
  );

  const filteredDestCities = POPULAR_CITIES.filter(c =>
    c.toLowerCase().includes(destination.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <form
        onSubmit={handleSearch}
        className="bg-white border-2 border-slate-400 shadow-xl rounded-md p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2"
      >
        {/* Origin */}
        <div className="flex-1 relative flex items-center gap-2.5 px-3 h-12 bg-slate-50 md:bg-transparent rounded-md border md:border-0 border-slate-300">
          <Icon name="trip_origin" size="md" className="text-coop-primary shrink-0" />
          <div className="flex-1 text-left min-w-0">
            <input
              id="origin-input"
              aria-label="Cidade ou ponto de partida"
              type="text"
              value={origin}
              onChange={(e) => {
                setOrigin(e.target.value);
                setShowOriginSuggestions(true);
              }}
              onFocus={() => setShowOriginSuggestions(true)}
              onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 200)}
              placeholder="Origem (ex: São Paulo)"
              className="w-full bg-transparent font-bold text-slate-950 focus:outline-none text-xs sm:text-sm placeholder-slate-500 truncate"
              required
            />
          </div>

          {/* Autocomplete Dropdown */}
          {showOriginSuggestions && filteredOriginCities.length > 0 && (
            <div className="absolute top-13 left-0 right-0 z-50 bg-white border-2 border-slate-300 shadow-2xl rounded-md py-1 max-h-48 overflow-y-auto">
              {filteredOriginCities.map((city) => (
                <button
                  type="button"
                  key={city}
                  onMouseDown={() => {
                    setOrigin(city);
                    setShowOriginSuggestions(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs font-bold text-slate-900 hover:bg-emerald-50 hover:text-coop-primary flex items-center gap-2 transition-colors"
                >
                  <Icon name="location_on" size="sm" className="text-slate-500" />
                  <span>{city}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* City Swap Button */}
        <button
          type="button"
          onClick={handleSwapCities}
          title="Inverter Origem e Destino"
          aria-label="Inverter Origem e Destino"
          className="w-8 h-8 self-center bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-coop-primary border border-slate-300 rounded-md flex items-center justify-center transition-all duration-150 active:rotate-180 shrink-0"
        >
          <Icon name="swap_horiz" size="sm" />
        </button>

        {/* Destination */}
        <div className="flex-1 relative flex items-center gap-2.5 px-3 h-12 bg-slate-50 md:bg-transparent rounded-md border md:border-0 border-slate-300">
          <Icon name="location_on" size="md" className="text-red-600 shrink-0" />
          <div className="flex-1 text-left min-w-0">
            <input
              id="dest-input"
              aria-label="Cidade ou ponto de chegada"
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setShowDestSuggestions(true);
              }}
              onFocus={() => setShowDestSuggestions(true)}
              onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
              placeholder="Destino (ex: Campinas)"
              className="w-full bg-transparent font-bold text-slate-950 focus:outline-none text-xs sm:text-sm placeholder-slate-500 truncate"
              required
            />
          </div>

          {/* Autocomplete Dropdown */}
          {showDestSuggestions && filteredDestCities.length > 0 && (
            <div className="absolute top-13 left-0 right-0 z-50 bg-white border-2 border-slate-300 shadow-2xl rounded-md py-1 max-h-48 overflow-y-auto">
              {filteredDestCities.map((city) => (
                <button
                  type="button"
                  key={city}
                  onMouseDown={() => {
                    setDestination(city);
                    setShowDestSuggestions(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs font-bold text-slate-900 hover:bg-emerald-50 hover:text-coop-primary flex items-center gap-2 transition-colors"
                >
                  <Icon name="location_on" size="sm" className="text-slate-500" />
                  <span>{city}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:block w-px h-8 bg-slate-300" />

        {/* Date & Seats Row */}
        <div className="flex items-center gap-2 flex-initial">
          {/* Date */}
          <div className="flex-1 md:flex-initial flex items-center gap-2 px-3 h-12 bg-slate-50 md:bg-transparent rounded-md border md:border-0 border-slate-300 min-w-[130px]">
            <Icon name="calendar_today" size="sm" className="text-slate-700 shrink-0" />
            <input
              id="date-input"
              aria-label="Data da viagem"
              type="date"
              min={todayStr}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent font-bold text-slate-950 focus:outline-none text-xs cursor-pointer"
              required
            />
          </div>

          <div className="hidden md:block w-px h-8 bg-slate-300" />

          {/* Seats */}
          <div className="flex-1 md:flex-initial flex items-center gap-2 px-3 h-12 bg-slate-50 md:bg-transparent rounded-md border md:border-0 border-slate-300 min-w-[95px]">
            <Icon name="group" size="sm" className="text-slate-700 shrink-0" />
            <select
              id="seats-select"
              aria-label="Quantidade de vagas"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full bg-transparent font-extrabold text-slate-950 focus:outline-none text-xs cursor-pointer"
            >
              <option value={1}>1 vaga</option>
              <option value={2}>2 vagas</option>
              <option value={3}>3 vagas</option>
              <option value={4}>4 vagas</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          iconLeft="search"
          className="w-full md:w-auto h-12 px-6 shrink-0 font-extrabold"
        >
          Buscar
        </Button>
      </form>
    </div>
  );
};
