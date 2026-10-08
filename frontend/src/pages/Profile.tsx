import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { useToastStore } from '../store/useToastStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Icon } from '../components/ui/Icon';

export const Profile: React.FC = () => {
  const { currentUser, role, updateUserPixKey, resetToDefaults } = useAppStore();
  const { addToast } = useToastStore();
  const [pixKey, setPixKey] = useState(currentUser.pixKey || '');

  const handleSavePix = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserPixKey(pixKey);
    addToast('Chave PIX atualizada com sucesso!', 'success');
  };

  const handleResetData = () => {
    resetToDefaults();
    setPixKey(currentUser.pixKey || '');
    addToast('Dados de demonstração restaurados com sucesso!', 'info');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 text-left pb-24 md:pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 h-10">
        <h1 className="text-xl sm:text-2xl font-bold text-uber-black">Meu Perfil</h1>
        <div className="flex items-center gap-1.5 text-xs font-bold text-uber-black bg-uber-gray px-3 py-1 rounded-full border border-uber-border">
          <Icon name="person" size="sm" />
          <span>{role === 'DRIVER' ? 'Motorista' : role === 'ADMIN' ? 'Administrador' : 'Passageiro'}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        
        {/* User Info Card */}
        <Card className="p-4 sm:p-5 border border-uber-border bg-white rounded-xl">
          <div className="flex items-center gap-4 pb-4 border-b border-uber-border">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-14 h-14 rounded-full object-cover border border-uber-border"
            />
            <div>
              <h2 className="text-lg font-bold text-uber-black">{currentUser.name}</h2>
              <p className="text-xs text-uber-iron font-normal">{currentUser.email} • {currentUser.phone}</p>
              <div className="flex items-center gap-1 text-xs text-uber-black font-semibold mt-1">
                <Icon name="star" size="sm" fill className="text-uber-black" />
                <span>{currentUser.rating.toFixed(1)} de reputação</span>
                <span className="text-uber-border">•</span>
                <span className="text-uber-charcoal font-normal">{currentUser.totalTrips} viagens concluídas</span>
              </div>
            </div>
          </div>

          {/* PIX Key Form for Refund and Payout Guarantee */}
          <form onSubmit={handleSavePix} className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
            <div className="flex-1">
              <Input
                label="Chave PIX para Estornos e Resgates"
                placeholder="CPF, E-mail ou Telefone"
                iconLeft="qr_code_2"
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                helperText="Utilizada para estornos automáticos e transferências."
                required
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              iconLeft="save"
              className="h-[48px] font-bold"
            >
              Salvar Chave
            </Button>
          </form>
        </Card>

        {/* Vehicle Card - ONLY FOR DRIVERS */}
        {role === 'DRIVER' && currentUser.vehicle && (
          <Card className="p-4 sm:p-5 border border-uber-border bg-white rounded-xl">
            <div className="flex items-center gap-2 pb-3 border-b border-uber-border">
              <Icon name="directions_car" size="md" className="text-uber-black" />
              <h3 className="font-bold text-base text-uber-black">Veículo Cadastrado</h3>
            </div>

            <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-uber-gray border border-uber-border rounded-lg">
                <span className="font-semibold text-uber-iron block text-[11px]">Marca/Modelo</span>
                <p className="font-bold text-uber-black mt-0.5">{currentUser.vehicle.brand} {currentUser.vehicle.model}</p>
              </div>

              <div className="p-3 bg-uber-gray border border-uber-border rounded-lg">
                <span className="font-semibold text-uber-iron block text-[11px]">Placa</span>
                <p className="font-mono font-bold text-uber-black mt-0.5">{currentUser.vehicle.plate}</p>
              </div>

              <div className="p-3 bg-uber-gray border border-uber-border rounded-lg">
                <span className="font-semibold text-uber-iron block text-[11px]">Ano</span>
                <p className="font-bold text-uber-black mt-0.5">{currentUser.vehicle.year}</p>
              </div>

              <div className="p-3 bg-uber-gray border border-uber-border rounded-lg">
                <span className="font-semibold text-uber-iron block text-[11px]">Recursos</span>
                <p className="font-bold text-uber-black mt-0.5">{currentUser.vehicle.hasAC ? 'Ar-condicionado' : ''} {currentUser.vehicle.hasUSB ? '• USB' : ''}</p>
              </div>
            </div>
          </Card>
        )}

        {/* System & Reset Options */}
        <div className="pt-2 text-center">
          <button
            onClick={handleResetData}
            className="text-xs text-uber-iron hover:text-red-600 underline font-normal transition-colors"
          >
            Restaurar Dados de Demonstração (Reset Local)
          </button>
        </div>

      </div>

    </div>
  );
};

