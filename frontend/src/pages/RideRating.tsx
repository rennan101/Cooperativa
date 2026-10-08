import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { Alert } from '../components/ui/Alert';

export const RideRating: React.FC = () => {
  const { rideId } = useParams<{ rideId: string }>();
  const navigate = useNavigate();
  const { rides, submitReview } = useAppStore();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const ride = rides.find(r => r.id === rideId);

  const availableTags = [
    'Pontualidade',
    'Direção Segura',
    'Carro Limpo',
    'Boa Comunicação',
    'Confortável',
    'Respeitoso',
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ride) return;
    const finalComment = selectedTags.length > 0
      ? `[${selectedTags.join(', ')}] ${comment}`
      : comment;

    submitReview(ride.id, ride.driverId, rating, finalComment);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <Icon name="verified" size="xl" className="text-coop-primary mb-3" fill />
        <h2 className="text-2xl font-black text-slate-950">Avaliação Enviada!</h2>
        <p className="text-slate-700 text-xs sm:text-sm font-semibold mt-1 mb-6">
          Obrigado por fortalecer a comunidade e a reputação dos membros da Cooperativa.
        </p>
        <Button variant="primary" size="md" onClick={() => navigate('/minhas-viagens')} className="w-full font-black">
          Voltar para Minhas Viagens
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 text-left pb-24 md:pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-black text-slate-800 hover:text-coop-primary mb-3 transition-colors"
        >
          <Icon name="arrow_back" size="sm" />
          <span>Voltar</span>
        </button>
        <h1 className="text-2xl font-black text-slate-950">Avaliar Experiência da Viagem</h1>
        <p className="text-slate-700 text-xs font-semibold mt-0.5">
          {ride ? `${ride.originCity} ➔ ${ride.destinationCity} com ${ride.driverName}` : 'Sua avaliação ajuda a manter a qualidade e segurança da Cooperativa.'}
        </p>
      </div>

      <Card className="p-5 sm:p-6 border-2 border-slate-300 bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Star Rating Selector */}
          <div className="text-center py-2 bg-slate-50 border border-slate-300 rounded-md">
            <span className="text-xs font-black text-slate-900 block mb-2 uppercase tracking-wider">
              Nota de 1 a 5 estrelas:
            </span>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform focus:outline-none"
                >
                  <Icon
                    name="star"
                    size="xl"
                    className={star <= rating ? 'text-amber-500' : 'text-slate-300'}
                    fill={star <= rating}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-black text-amber-700 mt-1 block">
              {rating === 5 ? 'Excelente!' : rating === 4 ? 'Muito Bom' : rating === 3 ? 'Regular' : 'Abaixo do esperado'}
            </span>
          </div>

          {/* Quick Tags (No Badges, structured click chips) */}
          <div>
            <span className="text-xs font-black text-slate-900 block mb-2">
              Destaques da viagem:
            </span>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`h-9 px-3 text-xs font-black rounded-md border-2 transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-100 text-emerald-950 border-coop-primary'
                        : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <Icon name={isSelected ? "check" : "add"} size="sm" className={isSelected ? 'text-coop-primary' : 'text-slate-500'} />
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="rating-comment" className="block text-xs font-black text-slate-900 mb-1.5">
              Comentário sobre a viagem (Opcional):
            </label>
            <textarea
              id="rating-comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ex: Motorista super pontual, carro impecável e viagem muito tranquila."
              className="w-full bg-white border-2 border-slate-300 font-medium rounded-md p-3 text-xs text-slate-950 focus:outline-none focus:ring-2 focus:ring-coop-primary"
            />
          </div>

          <Alert variant="info">
            <p className="text-xs font-bold text-slate-950">
              As avaliações são mútuas e calculadas automaticamente no perfil dos membros.
            </p>
          </Alert>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            iconLeft="star"
            className="w-full h-14 font-black mt-1"
          >
            Enviar Avaliação
          </Button>

        </form>
      </Card>

    </div>
  );
};
