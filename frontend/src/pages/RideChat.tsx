import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';

export const RideChat: React.FC = () => {
  const { rideId } = useParams<{ rideId: string }>();
  const navigate = useNavigate();
  const { rides, messages, sendMessage, addSimulatedReply, currentUser } = useAppStore();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const ride = rides.find(r => r.id === rideId);
  const rideMessages = messages.filter(m => m.rideId === rideId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [rideMessages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !rideId) return;
    const sentText = inputText.trim();
    sendMessage(rideId, sentText);
    setInputText('');

    // Simulate realistic contextual reply from driver/interlocutor
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const isQuestion = sentText.includes('?') || sentText.toLowerCase().includes('onde') || sentText.toLowerCase().includes('horário');
      const replyText = isQuestion
        ? 'Perfeito! Ponto de encontro combinado. Qualquer dúvida nos falamos aqui.'
        : 'Mensagem recebida! Te aguardo no horário combinado.';
      
      const interlocutorName = ride?.driverName || 'Motorista';
      const interlocutorAvatar = ride?.driverAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80';
      
      addSimulatedReply(rideId, replyText, interlocutorName, interlocutorAvatar);
    }, 1600);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 text-left pb-24 md:pb-12 flex flex-col h-[85vh] animate-fade-in">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-uber-border mb-3 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-xs font-bold text-uber-black hover:text-uber-iron transition-colors"
        >
          <Icon name="arrow_back" size="sm" />
          <span>Voltar</span>
        </button>

        <div className="text-center">
          <h1 className="text-sm font-bold text-uber-black">
            {ride ? `${ride.originCity} ➔ ${ride.destinationCity}` : 'Chat da Viagem'}
          </h1>
          <p className="text-[11px] font-normal text-uber-iron">Comunicação direta com o motorista e passageiros</p>
        </div>

        <div className="w-12" />
      </div>

      {/* Messages Box */}
      <Card className="flex-1 p-4 border border-uber-border bg-white rounded-xl flex flex-col gap-3 overflow-y-auto">
        {rideMessages.length > 0 ? (
          rideMessages.map(msg => {
            const isMe = msg.senderId === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'} animate-fade-in`}
              >
                <img
                  src={msg.senderAvatar}
                  alt={msg.senderName}
                  className="w-7 h-7 rounded-full object-cover border border-uber-border shrink-0 mt-1"
                />
                <div className={`p-3 rounded-xl text-xs ${
                  isMe
                    ? 'bg-uber-black text-white text-left'
                    : 'bg-uber-gray text-uber-black text-left'
                }`}>
                  <p className={`font-bold text-[11px] mb-0.5 ${isMe ? 'text-uber-slate' : 'text-uber-black'}`}>
                    {msg.senderName}
                  </p>
                  <p className="leading-relaxed font-normal">{msg.text}</p>
                  <span className={`text-[10px] block text-right mt-1 font-medium ${isMe ? 'text-uber-iron' : 'text-uber-iron'}`}>
                    {msg.createdAt}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="m-auto text-center text-uber-iron text-xs font-normal">
            <Icon name="chat" size="lg" className="text-uber-border mb-1" />
            <p>Nenhuma mensagem ainda. Inicie a conversa sobre pontos de encontro ou horários.</p>
          </div>
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="self-start flex items-center gap-2 p-2.5 bg-uber-gray rounded-xl text-xs font-medium text-uber-charcoal animate-pulse">
            <Icon name="edit" size="sm" className="text-uber-black" />
            <span>{ride?.driverName || 'Motorista'} está digitando...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </Card>

      {/* Input Box */}
      <form onSubmit={handleSend} className="mt-3 flex gap-2 shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 h-12 bg-uber-gray border border-transparent focus:border-uber-black focus:bg-white text-uber-black font-medium px-4 rounded-xl focus:outline-none text-xs sm:text-sm transition-all"
          required
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          iconLeft="send"
          className="h-12 px-5 font-bold"
        >
          Enviar
        </Button>
      </form>

    </div>
  );
};

