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
        <h1 className="text-xl sm:text-2xl font-black text-slate-950">Meu Perfil</h1>
        <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-md border border-slate-300">
          <Icon name="person" size="sm" />
          <span>{role === 'DRIVER' ? 'Motorista' : role === 'ADMIN' ? 'Administrador' : 'Passageiro'}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        
        {/* User Info Card */}
        <Card className="p-4 sm:p-5 border-2 border-slate-300 bg-white shadow-xs">
          <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-14 h-14 rounded-md object-cover border-2 border-slate-400"
            />
            <div>
              <h2 className="text-lg font-black text-slate-950">{currentUser.name}</h2>
              <p className="text-xs font-bold text-slate-700">{currentUser.email} • {currentUser.phone}</p>
              <div className="flex items-center gap-1 text-xs text-amber-700 font-black mt-1">
                <Icon name="star" size="sm" fill />
                <span>{currentUser.rating.toFixed(1)} de reputação</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-800">{currentUser.totalTrips} viagens concluídas</span>
              </div>
            </div>
          </div>

          {/* PIX Key Form for Refund and Payout Guarantee */}
          <form onSubmit={handleSavePix} className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-end gap-2.5">
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
              className="h-[46px] font-black"
            >
              Salvar Chave
            </Button>
          </form>
        </Card>

        {/* Vehicle Card - ONLY FOR DRIVERS */}
        {role === 'DRIVER' && currentUser.vehicle && (
          <Card className="p-4 sm:p-5 border-2 border-slate-300 bg-white shadow-xs animate-scale-up">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <Icon name="directions_car" size="md" className="text-coop-primary" />
              <h3 className="font-black text-base text-slate-950">Veículo Cadastrado</h3>
            </div>

            <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-900">
              <div className="p-2 bg-slate-50 border border-slate-300 rounded-md">
                <span className="font-bold text-slate-600 block">Marca/Modelo</span>
                <p className="font-black text-slate-950">{currentUser.vehicle.brand} {currentUser.vehicle.model}</p>
              </div>

              <div className="p-2 bg-slate-50 border border-slate-300 rounded-md">
                <span className="font-bold text-slate-600 block">Placa</span>
                <p className="font-mono font-black text-slate-950">{currentUser.vehicle.plate}</p>
              </div>

              <div className="p-2 bg-slate-50 border border-slate-300 rounded-md">
                <span className="font-bold text-slate-600 block">Ano</span>
                <p className="font-black text-slate-950">{currentUser.vehicle.year}</p>
              </div>

              <div className="p-2 bg-slate-50 border border-slate-300 rounded-md">
                <span className="font-bold text-slate-600 block">Recursos</span>
                <p className="font-black text-slate-950">{currentUser.vehicle.hasAC ? 'Ar-condicionado' : ''} {currentUser.vehicle.hasUSB ? '• USB' : ''}</p>
              </div>
            </div>
          </Card>
        )}

        {/* System & Reset Options */}
        <div className="pt-2 text-center">
          <button
            onClick={handleResetData}
            className="text-xs text-slate-500 hover:text-red-700 underline font-semibold transition-colors"
          >
            Restaurar Dados de Demonstração (Reset Local)
          </button>
        </div>

      </div>

    </div>
  );
};
