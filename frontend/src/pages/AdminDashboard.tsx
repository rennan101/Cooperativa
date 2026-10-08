import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { useToastStore } from '../store/useToastStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { driverRequests, approveDriverRequest, rejectDriverRequest, bookings, releaseCustody, role } = useAppStore();
  const { addToast } = useToastStore();
  
  const [activeTab, setActiveTab] = useState<'REQUESTS' | 'FINANCES' | 'SETTINGS'>('REQUESTS');
  const [requestFilter, setRequestFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [rejectReason, setRejectReason] = useState('');
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  // Security Gate: Admin / Manager only
  if (role !== 'ADMIN' && role !== 'MANAGER') {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center animate-fade-in">
        <Icon name="lock" size="xl" className="text-red-600 mb-2" />
        <h2 className="text-xl font-black text-slate-950">Acesso Restrito</h2>
        <p className="text-xs font-semibold text-slate-700 mt-1 mb-4">Esta área é restrita a administradores da Cooperativa.</p>
        <Button variant="primary" size="md" onClick={() => navigate('/')}>Voltar ao Início</Button>
      </div>
    );
  }

  // Calculate Real-time Metrics
  const totalVolume = bookings.reduce((acc, b) => acc + b.totalAmount, 0) + 1540.00;
  const custodyBalance = bookings.filter(b => b.status === 'SIGNAL_CONFIRMED').reduce((acc, b) => acc + b.amountPaidSignal, 0) + 420.00;
  const pendingRequests = driverRequests.filter(r => r.status === 'PENDING');

  const filteredRequests = driverRequests.filter(req => {
    if (requestFilter === 'ALL') return true;
    return req.status === requestFilter;
  });

  const handleApprove = (id: string, name: string) => {
    approveDriverRequest(id);
    addToast(`Motorista ${name} aprovado com sucesso!`, 'success');
  };

  const handleReject = (id: string) => {
    if (!rejectReason.trim()) {
      addToast('Por favor, informe o motivo da recusa.', 'warning');
      return;
    }
    rejectDriverRequest(id, rejectReason.trim());
    setRejectingId(null);
    setRejectReason('');
    addToast('Solicitação recusada e notificada ao solicitante.', 'info');
  };

  const handleReleaseCustody = (bookingId: string, amount: number) => {
    releaseCustody(bookingId);
    addToast(`Repasse de R$ ${amount.toFixed(2).replace('.', ',')} liberado com sucesso para o motorista!`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 text-left pb-24 md:pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 h-10">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-950">Painel de Gestão e Administração</h1>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-extrabold text-coop-primary bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-300">
          <Icon name="shield" size="sm" />
          <span>Perfil {role === 'ADMIN' ? 'Administrador' : 'Gestor'}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <Card className="p-4 border-2 border-slate-300 bg-white shadow-xs">
          <span className="text-xs font-bold text-slate-700 block">Volume Transacionado</span>
          <p className="text-2xl font-black text-slate-950 mt-1">R$ {totalVolume.toFixed(2).replace('.', ',')}</p>
          <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1 mt-1">
            <Icon name="trending_up" size="sm" />
            +14% este mês
          </span>
        </Card>

        <Card className="p-4 border-2 border-slate-300 bg-white shadow-xs">
          <span className="text-xs font-bold text-slate-700 block">Saldo em Custódia Protegida</span>
          <p className="text-2xl font-black text-coop-primary mt-1">R$ {custodyBalance.toFixed(2).replace('.', ',')}</p>
          <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1 mt-1">
            <Icon name="lock" size="sm" />
            Garantia de viagens ativas
          </span>
        </Card>

        <Card className="p-4 border-2 border-slate-300 bg-white shadow-xs">
          <span className="text-xs font-bold text-slate-700 block">Solicitações de Motoristas</span>
          <p className="text-2xl font-black text-amber-700 mt-1">{pendingRequests.length} pendentes</p>
          <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1 mt-1">
            <Icon name="pending_actions" size="sm" />
            Fila de moderação
          </span>
        </Card>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b-2 border-slate-300 mb-6 gap-2">
        <button
          onClick={() => setActiveTab('REQUESTS')}
          className={`pb-2 px-3 text-xs sm:text-sm font-black border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'REQUESTS'
              ? 'text-coop-primary border-coop-primary'
              : 'text-slate-600 border-transparent hover:text-slate-950'
          }`}
        >
          <Icon name="how_to_reg" size="sm" />
          <span>Fila de Motoristas ({pendingRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('FINANCES')}
          className={`pb-2 px-3 text-xs sm:text-sm font-black border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'FINANCES'
              ? 'text-coop-primary border-coop-primary'
              : 'text-slate-600 border-transparent hover:text-slate-950'
          }`}
        >
          <Icon name="account_balance_wallet" size="sm" />
          <span>Financeiro & Custódia</span>
        </button>

        <button
          onClick={() => setActiveTab('SETTINGS')}
          className={`pb-2 px-3 text-xs sm:text-sm font-black border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'SETTINGS'
              ? 'text-coop-primary border-coop-primary'
              : 'text-slate-600 border-transparent hover:text-slate-950'
          }`}
        >
          <Icon name="settings" size="sm" />
          <span>Parâmetros</span>
        </button>
      </div>

      {/* Tab 1: Driver Requests */}
      {activeTab === 'REQUESTS' && (
        <div className="flex flex-col gap-4">
          
          {/* Sub-filter chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setRequestFilter(filter)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold border transition-colors ${
                  requestFilter === filter
                    ? 'bg-emerald-950 text-white border-emerald-950 font-black'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                {filter === 'ALL' && 'Todos'}
                {filter === 'PENDING' && 'Pendentes'}
                {filter === 'APPROVED' && 'Aprovados'}
                {filter === 'REJECTED' && 'Recusados'}
              </button>
            ))}
          </div>

          {filteredRequests.length > 0 ? (
            filteredRequests.map(req => (
              <Card key={req.id} className="p-4 sm:p-5 border-2 border-slate-300 bg-white shadow-xs">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-200">
                  <div>
                    <h3 className="text-base font-black text-slate-950">{req.userName}</h3>
                    <p className="text-xs text-slate-700 font-semibold">{req.userEmail} • {req.userPhone}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    {req.status === 'PENDING' && (
                      <span className="flex items-center gap-1 text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                        <Icon name="hourglass_top" size="sm" />
                        Pendente
                      </span>
                    )}
                    {req.status === 'APPROVED' && (
                      <span className="flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300">
                        <Icon name="check_circle" size="sm" />
                        Aprovado
                      </span>
                    )}
                    {req.status === 'REJECTED' && (
                      <span className="flex items-center gap-1 text-xs font-black text-red-800 bg-red-100 px-2.5 py-1 rounded-md border border-red-300">
                        <Icon name="cancel" size="sm" />
                        Recusado
                      </span>
                    )}
                  </div>
                </div>

                <div className="py-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
                  <div className="p-2.5 bg-slate-50 border border-slate-300 rounded-md">
                    <span className="font-bold text-slate-600 block">Documento CNH</span>
                    <p className="font-mono font-black text-sm text-slate-950">{req.cnhNumber}</p>
                  </div>

                  <div className="p-2.5 bg-slate-50 border border-slate-300 rounded-md">
                    <span className="font-bold text-slate-600 block">Veículo Declarado</span>
                    <p className="font-black text-slate-950">{req.vehicle.brand} {req.vehicle.model} ({req.vehicle.year})</p>
                    <p className="text-slate-700">Placa: {req.vehicle.plate} • {req.vehicle.hasAC ? 'Com Ar' : 'Sem Ar'} • {req.vehicle.hasUSB ? 'Com USB' : 'Sem USB'}</p>
                  </div>
                </div>

                {req.rejectionReason && (
                  <div className="mb-3 p-2.5 bg-red-50 border border-red-300 rounded-md text-xs text-red-900 font-semibold">
                    Motivo da Recusa: {req.rejectionReason}
                  </div>
                )}

                {req.status === 'PENDING' && (
                  <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-2">
                    {rejectingId === req.id ? (
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          placeholder="Motivo da recusa..."
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          className="flex-1 text-xs border border-slate-400 rounded-md px-2.5 h-10 font-medium"
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleReject(req.id)}
                          className="h-10 text-xs font-bold"
                        >
                          Confirmar Recusa
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setRejectingId(null)}
                          className="h-10 text-xs font-bold"
                        >
                          Cancelar
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          iconLeft="cancel"
                          onClick={() => setRejectingId(req.id)}
                          className="h-10 text-xs font-bold text-red-700 hover:bg-red-50 border-red-300"
                        >
                          Recusar Cadastro
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          iconLeft="check_circle"
                          onClick={() => handleApprove(req.id, req.userName)}
                          className="h-10 text-xs font-black"
                        >
                          Aprovar Motorista & Gerar Acesso
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </Card>
            ))
          ) : (
            <div className="bg-white border-2 border-slate-300 rounded-md p-6 text-center text-slate-700 text-xs font-bold">
              Nenhuma solicitação encontrada nesta categoria.
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Financial & Custody */}
      {activeTab === 'FINANCES' && (
        <div className="space-y-4">
          <Card className="p-5 border-2 border-slate-300 bg-white">
            <h3 className="font-black text-base text-slate-950 mb-3">Transações em Custódia Aberta</h3>
            
            <div className="space-y-3">
              {bookings.filter(b => b.status === 'SIGNAL_CONFIRMED').length > 0 ? (
                bookings.filter(b => b.status === 'SIGNAL_CONFIRMED').map(b => (
                  <div key={b.id} className="p-3 bg-slate-50 border border-slate-300 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                    <div>
                      <span className="font-mono font-bold text-slate-600 block">{b.id}</span>
                      <p className="font-black text-slate-950 text-sm">Passageiro: {b.passengerName}</p>
                      <p className="text-slate-700">Sinal Retido: <strong>R$ {b.amountPaidSignal.toFixed(2).replace('.', ',')}</strong></p>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      iconLeft="payments"
                      onClick={() => handleReleaseCustody(b.id, b.amountPaidSignal)}
                      className="h-9 px-3 text-xs font-black"
                    >
                      Liberar Repasse (72h)
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-600 font-semibold p-4 text-center bg-slate-50 rounded-md border border-slate-200">
                  Nenhuma transação com sinal pendente de liberação no momento.
                </p>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Tab 3: Settings */}
      {activeTab === 'SETTINGS' && (
        <Card className="p-5 border-2 border-slate-300 bg-white space-y-4 text-xs">
          <h3 className="font-black text-base text-slate-950">Parâmetros Operacionais da Plataforma</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-300 rounded-md">
              <span className="font-bold text-slate-600 block">Divisão Padrão do PIX:</span>
              <p className="font-black text-slate-950 text-sm">50% Sinal / 50% Chegada</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-300 rounded-md">
              <span className="font-bold text-slate-600 block">Prazo de Resgate ao Motorista:</span>
              <p className="font-black text-slate-950 text-sm">Até 72 horas pós-viagem</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-300 rounded-md">
              <span className="font-bold text-slate-600 block">Antecedência Mínima para Publicação:</span>
              <p className="font-black text-slate-950 text-sm">2 horas (RN-06)</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-300 rounded-md">
              <span className="font-bold text-slate-600 block">Taxa de Estorno (&gt;1h):</span>
              <p className="font-black text-slate-950 text-sm">70% devolvido ao passageiro</p>
            </div>
          </div>
        </Card>
      )}

    </div>
  );
};
