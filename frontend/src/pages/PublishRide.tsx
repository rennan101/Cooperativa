import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { useToastStore } from '../store/useToastStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Icon } from '../components/ui/Icon';
import { Alert } from '../components/ui/Alert';

export const PublishRide: React.FC = () => {
  const navigate = useNavigate();
  const { addRide, currentUser, role } = useAppStore();
  const { addToast } = useToastStore();

  // Ride Creation States (For Approved Drivers only)
  const [originCity, setOriginCity] = useState('');
  const [originSpot, setOriginSpot] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [destinationSpot, setDestinationSpot] = useState('');
  
  const [departureDate, setDepartureDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [departureTime, setDepartureTime] = useState('10:00');
  const [pricePerSeat, setPricePerSeat] = useState('35.00');
  const [totalSeats, setTotalSeats] = useState(3);
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 1. GATE DE PERMISSÃO: Apenas MOTORISTAS têm acesso a esta tela
  if (role !== 'DRIVER') {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center animate-fade-in">
        <div className="w-14 h-14 bg-slate-100 text-slate-600 rounded-md flex items-center justify-center mx-auto mb-3 shadow-xs">
          <Icon name="lock" size="lg" />
        </div>
        <h2 className="text-xl font-black text-slate-950">Acesso Restrito</h2>
        <p className="text-slate-700 text-xs sm:text-sm font-semibold mt-1 mb-5">
          Apenas motoristas credenciados podem cadastrar viagens na plataforma.
        </p>
        <Button
          variant="primary"
          size="md"
          iconLeft="home"
          onClick={() => navigate('/')}
          className="w-full font-bold h-11"
        >
          Voltar para o Início
        </Button>
      </div>
    );
  }

  // 2. MOTORISTA: Fluxo de Publicação de Nova Viagem (+2h de antecedência mínima)
  const validateTwoHoursAdvance = (dateStr: string, timeStr: string): boolean => {
    try {
      const selectedDateTime = new Date(`${dateStr}T${timeStr}:00`);
      const minValidDateTime = new Date(Date.now() + 2 * 60 * 60 * 1000);

      if (selectedDateTime < minValidDateTime) {
        setErrorMessage(
          'As viagens devem ser publicadas com pelo menos 2 horas de antecedência do horário atual.'
        );
        return false;
      }
      setErrorMessage('');
      return true;
    } catch {
      return false;
    }
  };

  const handleTimeChange = (time: string) => {
    setDepartureTime(time);
    validateTwoHoursAdvance(departureDate, time);
  };

  const handleDateChange = (date: string) => {
    setDepartureDate(date);
    validateTwoHoursAdvance(date, departureTime);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateTwoHoursAdvance(departureDate, departureTime)) {
      return;
    }

    const vehicle = currentUser.vehicle || {
      plate: 'ABC-1234',
      state: 'SP',
      brand: 'Toyota',
      model: 'Corolla 2.0',
      year: 2022,
      hasAC: true,
      hasUSB: true,
    };

    addRide({
      originCity,
      originSpot,
      destinationCity,
      destinationSpot,
      departureDate,
      departureTime,
      estimatedDuration: '1h 30m',
      estimatedArrivalTime: '11:30',
      pricePerSeat: parseFloat(pricePerSeat) || 30.00,
      totalSeats,
      availableSeats: totalSeats,
      vehicle,
      notes,
      status: 'PUBLISHED',
    });

    addToast(`Viagem para ${destinationCity} publicada com sucesso!`, 'success');
    navigate('/minhas-viagens');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 text-left pb-24 md:pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-black text-slate-800 hover:text-coop-primary mb-3 transition-colors"
        >
          <Icon name="arrow_back" size="sm" />
          <span>Voltar</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950">Nova Viagem</h1>
        <p className="text-slate-700 text-xs sm:text-sm font-semibold mt-0.5">
          Cadastre uma nova rota e receba passageiros verificados.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Step 1: Route */}
        <Card className="p-4 sm:p-5 border-2 border-slate-300 flex flex-col gap-3 bg-white">
          <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200 h-8">
            <Icon name="route" size="sm" className="text-coop-primary" />
            <h2 className="font-black text-sm sm:text-base text-slate-950">1. Trajeto</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Cidade de Partida"
              placeholder="Ex: São Paulo, SP"
              iconLeft="trip_origin"
              value={originCity}
              onChange={(e) => setOriginCity(e.target.value)}
              required
            />
            <Input
              label="Ponto de Encontro"
              placeholder="Ex: Metrô Tietê"
              iconLeft="pin_drop"
              value={originSpot}
              onChange={(e) => setOriginSpot(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Cidade de Destino"
              placeholder="Ex: Campinas, SP"
              iconLeft="location_on"
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
              required
            />
            <Input
              label="Ponto de Chegada"
              placeholder="Ex: Rodoviária / Shopping"
              iconLeft="flag"
              value={destinationSpot}
              onChange={(e) => setDestinationSpot(e.target.value)}
              required
            />
          </div>
        </Card>

        {/* Step 2: Date & Time */}
        <Card className="p-4 sm:p-5 border-2 border-slate-300 flex flex-col gap-3 bg-white">
          <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200 h-8">
            <Icon name="schedule" size="sm" className="text-coop-primary" />
            <h2 className="font-black text-sm sm:text-base text-slate-950">2. Data e Horário</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Data da Viagem"
              type="date"
              iconLeft="calendar_today"
              value={departureDate}
              onChange={(e) => handleDateChange(e.target.value)}
              required
            />
            <Input
              label="Horário de Saída"
              type="time"
              iconLeft="access_time"
              value={departureTime}
              onChange={(e) => handleTimeChange(e.target.value)}
              required
            />
          </div>

          {errorMessage ? (
            <Alert variant="danger" title="Horário Inválido">
              {errorMessage}
            </Alert>
          ) : (
            <div className="flex items-center gap-2 text-xs font-black text-emerald-950 bg-emerald-50 p-2.5 rounded-md border-2 border-emerald-300 h-10">
              <Icon name="check_circle" size="sm" className="text-coop-primary shrink-0" />
              <span>Antecedência mínima de 2h respeitada.</span>
            </div>
          )}
        </Card>

        {/* Step 3: Seats & Pricing */}
        <Card className="p-4 sm:p-5 border-2 border-slate-300 flex flex-col gap-3 bg-white">
          <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200 h-8">
            <Icon name="payments" size="sm" className="text-coop-primary" />
            <h2 className="font-black text-sm sm:text-base text-slate-950">3. Vagas e Valor</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="publish-seats-select" className="block text-xs font-black text-slate-900 mb-1.5">
                Vagas Livres
              </label>
              <select
                id="publish-seats-select"
                aria-label="Quantidade de vagas livres"
                value={totalSeats}
                onChange={(e) => setTotalSeats(Number(e.target.value))}
                className="w-full bg-white border-2 border-slate-300 text-slate-950 rounded-md h-[46px] px-3 font-bold focus:outline-none focus:ring-2 focus:ring-coop-primary text-sm cursor-pointer"
              >
                <option value={1}>1 passageiro</option>
                <option value={2}>2 passageiros</option>
                <option value={3}>3 passageiros</option>
                <option value={4}>4 passageiros</option>
              </select>
            </div>

            <Input
              label="Valor por Pessoa (R$)"
              type="number"
              step="0.50"
              iconLeft="payments"
              value={pricePerSeat}
              onChange={(e) => setPricePerSeat(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="publish-notes-input" className="block text-xs font-black text-slate-900 mb-1.5">
              Observações (Opcional)
            </label>
            <textarea
              id="publish-notes-input"
              aria-label="Observações da viagem"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Tolerância de 10 minutos no ponto de encontro."
              className="w-full bg-white border-2 border-slate-300 font-medium rounded-md p-2.5 text-xs text-slate-950 focus:outline-none focus:ring-2 focus:ring-coop-primary"
            />
          </div>
        </Card>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          iconLeft="check_circle"
          disabled={!!errorMessage}
          className="w-full h-14 mt-2 font-black shadow-md hover:shadow-lg"
        >
          Publicar Nova Viagem
        </Button>

      </form>
    </div>
  );
};
