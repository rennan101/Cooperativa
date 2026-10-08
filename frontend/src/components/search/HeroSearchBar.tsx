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
        className="bg-white border border-uber-border shadow-lg rounded-xl p-2.5 sm:p-3 flex flex-col md:flex-row items-stretch md:items-center gap-2"
      >
        {/* Origin */}
        <div className="flex-1 relative flex items-center gap-3 px-3.5 h-12 bg-uber-gray rounded-lg border border-transparent focus-within:border-uber-black focus-within:bg-white transition-all">
          <div className="w-2.5 h-2.5 rounded-full bg-uber-black shrink-0" />
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
              placeholder="Ponto de partida"
              className="w-full bg-transparent font-semibold text-uber-black focus:outline-none text-sm placeholder-uber-iron truncate"
              required
            />
          </div>

          {/* Autocomplete Dropdown */}
          {showOriginSuggestions && filteredOriginCities.length > 0 && (
            <div className="absolute top-14 left-0 right-0 z-50 bg-white border border-uber-border shadow-xl rounded-lg py-1.5 max-h-52 overflow-y-auto">
              {filteredOriginCities.map((city) => (
                <button
                  type="button"
                  key={city}
                  onMouseDown={() => {
                    setOrigin(city);
                    setShowOriginSuggestions(false);
                  }}
                  className="w-full px-3.5 py-2.5 text-left text-xs font-semibold text-uber-black hover:bg-uber-gray flex items-center gap-2.5 transition-colors"
                >
                  <Icon name="location_on" size="sm" className="text-uber-iron" />
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
          className="w-8 h-8 self-center bg-uber-gray hover:bg-uber-border text-uber-black rounded-full flex items-center justify-center transition-all duration-150 active:scale-90 shrink-0"
        >
          <Icon name="swap_horiz" size="sm" />
        </button>

        {/* Destination */}
        <div className="flex-1 relative flex items-center gap-3 px-3.5 h-12 bg-uber-gray rounded-lg border border-transparent focus-within:border-uber-black focus-within:bg-white transition-all">
          <div className="w-2.5 h-2.5 bg-uber-black shrink-0" />
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
              placeholder="Para onde vamos?"
              className="w-full bg-transparent font-semibold text-uber-black focus:outline-none text-sm placeholder-uber-iron truncate"
              required
            />
          </div>

          {/* Autocomplete Dropdown */}
          {showDestSuggestions && filteredDestCities.length > 0 && (
            <div className="absolute top-14 left-0 right-0 z-50 bg-white border border-uber-border shadow-xl rounded-lg py-1.5 max-h-52 overflow-y-auto">
              {filteredDestCities.map((city) => (
                <button
                  type="button"
                  key={city}
                  onMouseDown={() => {
                    setDestination(city);
                    setShowDestSuggestions(false);
                  }}
                  className="w-full px-3.5 py-2.5 text-left text-xs font-semibold text-uber-black hover:bg-uber-gray flex items-center gap-2.5 transition-colors"
                >
                  <Icon name="location_on" size="sm" className="text-uber-iron" />
                  <span>{city}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date & Seats Row */}
        <div className="flex items-center gap-2 flex-initial">
          {/* Date */}
          <div className="flex-1 md:flex-initial flex items-center gap-2 px-3 h-12 bg-uber-gray rounded-lg border border-transparent focus-within:border-uber-black focus-within:bg-white min-w-[135px] transition-all">
            <Icon name="calendar_today" size="sm" className="text-uber-iron shrink-0" />
            <input
              id="date-input"
              aria-label="Data da viagem"
              type="date"
              min={todayStr}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent font-semibold text-uber-black focus:outline-none text-xs cursor-pointer"
              required
            />
          </div>

          {/* Seats */}
          <div className="flex-1 md:flex-initial flex items-center gap-2 px-3 h-12 bg-uber-gray rounded-lg border border-transparent focus-within:border-uber-black focus-within:bg-white min-w-[100px] transition-all">
            <Icon name="group" size="sm" className="text-uber-iron shrink-0" />
            <select
              id="seats-select"
              aria-label="Quantidade de vagas"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full bg-transparent font-bold text-uber-black focus:outline-none text-xs cursor-pointer"
            >
              <option value={1}>1 lugar</option>
              <option value={2}>2 lugares</option>
              <option value={3}>3 lugares</option>
              <option value={4}>4 lugares</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          iconLeft="search"
          className="w-full md:w-auto h-12 px-6 shrink-0 font-bold"
        >
          Buscar
        </Button>
      </form>
    </div>
  );
};

