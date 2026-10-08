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
      <div className="max-w-md mx-auto py-16 px-4 text-center animate-fade-in">
        <Icon name="verified" size="xl" className="text-uber-black mb-3" fill />
        <h2 className="text-2xl font-bold text-uber-black">Avaliação Enviada!</h2>
        <p className="text-uber-iron text-xs sm:text-sm font-normal mt-1 mb-6">
          Obrigado por fortalecer a comunidade e a reputação dos membros da Cooperativa.
        </p>
        <Button variant="primary" size="md" onClick={() => navigate('/minhas-viagens')} className="w-full font-bold">
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
          className="flex items-center gap-1.5 text-xs font-bold text-uber-black hover:text-uber-iron mb-3 transition-colors"
        >
          <Icon name="arrow_back" size="sm" />
          <span>Voltar</span>
        </button>
        <h1 className="text-2xl font-bold text-uber-black">Avaliar Experiência</h1>
        <p className="text-uber-iron text-xs font-normal mt-0.5">
          {ride ? `${ride.originCity} ➔ ${ride.destinationCity} com ${ride.driverName}` : 'Sua avaliação ajuda a manter a qualidade e segurança da Cooperativa.'}
        </p>
      </div>

      <Card className="p-5 sm:p-6 border border-uber-border rounded-xl bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Star Rating Selector */}
          <div className="text-center py-4 bg-uber-gray border border-uber-border rounded-xl">
            <span className="text-xs font-bold text-uber-black block mb-3 uppercase tracking-wider">
              Nota da Viagem:
            </span>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 active:scale-95 transition-transform focus:outline-none"
                >
                  <Icon
                    name="star"
                    size="xl"
                    className={star <= rating ? 'text-uber-black' : 'text-uber-border'}
                    fill={star <= rating}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-semibold text-uber-black mt-2 block">
              {rating === 5 ? 'Excelente!' : rating === 4 ? 'Muito Bom' : rating === 3 ? 'Regular' : 'Abaixo do esperado'}
            </span>
          </div>

          {/* Quick Tags */}
          <div>
            <span className="text-xs font-bold text-uber-black block mb-2 uppercase tracking-wider">
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
                    className={`h-9 px-3.5 text-xs font-semibold rounded-full border transition-all flex items-center gap-1.5 active:scale-95 ${
                      isSelected
                        ? 'bg-uber-black text-white border-uber-black'
                        : 'bg-white text-uber-black border-uber-border hover:bg-uber-gray'
                    }`}
                  >
                    <Icon name={isSelected ? "check" : "add"} size="sm" className={isSelected ? 'text-white' : 'text-uber-iron'} />
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="rating-comment" className="block text-xs font-bold text-uber-black uppercase tracking-wider mb-1.5">
              Comentário (Opcional):
            </label>
            <textarea
              id="rating-comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ex: Motorista super pontual, carro impecável e viagem muito tranquila."
              className="w-full bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white font-normal rounded-xl p-3 text-xs text-uber-black focus:outline-none transition-all"
            />
          </div>

          <Alert variant="info">
            <p className="text-xs font-normal text-uber-charcoal">
              As avaliações são calculadas automaticamente no perfil dos membros.
            </p>
          </Alert>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            iconLeft="star"
            className="w-full h-12 font-bold mt-1"
          >
            Enviar Avaliação
          </Button>

        </form>
      </Card>

    </div>
  );
};

