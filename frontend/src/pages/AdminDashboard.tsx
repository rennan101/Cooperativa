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
        <h2 className="text-xl font-bold text-uber-black">Acesso Restrito</h2>
        <p className="text-xs font-normal text-uber-iron mt-1 mb-4">Esta área é restrita a administradores da Cooperativa.</p>
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
          <h1 className="text-xl sm:text-2xl font-bold text-uber-black">Painel de Gestão</h1>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-uber-black bg-uber-gray px-3 py-1 rounded-full border border-uber-border">
          <Icon name="shield" size="sm" />
          <span>Perfil {role === 'ADMIN' ? 'Administrador' : 'Gestor'}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <Card className="p-4 border border-uber-border bg-white rounded-xl">
          <span className="text-xs font-semibold text-uber-iron block uppercase tracking-wider text-[11px]">Volume Transacionado</span>
          <p className="text-2xl font-extrabold text-uber-black mt-1">R$ {totalVolume.toFixed(2).replace('.', ',')}</p>
          <span className="text-[11px] font-semibold text-uber-black flex items-center gap-1 mt-1">
            <Icon name="trending_up" size="sm" />
            +14% este mês
          </span>
        </Card>

        <Card className="p-4 border border-uber-border bg-white rounded-xl">
          <span className="text-xs font-semibold text-uber-iron block uppercase tracking-wider text-[11px]">Saldo em Custódia</span>
          <p className="text-2xl font-extrabold text-uber-black mt-1">R$ {custodyBalance.toFixed(2).replace('.', ',')}</p>
          <span className="text-[11px] font-normal text-uber-iron flex items-center gap-1 mt-1">
            <Icon name="lock" size="sm" />
            Garantia de viagens ativas
          </span>
        </Card>

        <Card className="p-4 border border-uber-border bg-white rounded-xl">
          <span className="text-xs font-semibold text-uber-iron block uppercase tracking-wider text-[11px]">Fila de Motoristas</span>
          <p className="text-2xl font-extrabold text-uber-black mt-1">{pendingRequests.length} pendentes</p>
          <span className="text-[11px] font-normal text-uber-iron flex items-center gap-1 mt-1">
            <Icon name="pending_actions" size="sm" />
            Fila de moderação
          </span>
        </Card>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-uber-border mb-6 gap-2">
        <button
          onClick={() => setActiveTab('REQUESTS')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'REQUESTS'
              ? 'text-uber-black border-uber-black'
              : 'text-uber-iron border-transparent hover:text-uber-black'
          }`}
        >
          <Icon name="how_to_reg" size="sm" />
          <span>Fila de Motoristas ({pendingRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('FINANCES')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'FINANCES'
              ? 'text-uber-black border-uber-black'
              : 'text-uber-iron border-transparent hover:text-uber-black'
          }`}
        >
          <Icon name="account_balance_wallet" size="sm" />
          <span>Financeiro & Custódia</span>
        </button>

        <button
          onClick={() => setActiveTab('SETTINGS')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'SETTINGS'
              ? 'text-uber-black border-uber-black'
              : 'text-uber-iron border-transparent hover:text-uber-black'
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  requestFilter === filter
                    ? 'bg-uber-black text-white border-uber-black'
                    : 'bg-white text-uber-black border-uber-border hover:bg-uber-gray'
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
              <Card key={req.id} className="p-4 sm:p-5 border border-uber-border bg-white rounded-xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-uber-border">
                  <div>
                    <h3 className="text-base font-bold text-uber-black">{req.userName}</h3>
                    <p className="text-xs text-uber-iron font-normal">{req.userEmail} • {req.userPhone}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    {req.status === 'PENDING' && (
                      <span className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        <Icon name="hourglass_top" size="sm" />
                        Pendente
                      </span>
                    )}
                    {req.status === 'APPROVED' && (
                      <span className="flex items-center gap-1.5 text-[11px] font-bold text-uber-black bg-uber-gray px-2.5 py-1 rounded-full border border-uber-border">
                        <Icon name="check_circle" size="sm" />
                        Aprovado
                      </span>
                    )}
                    {req.status === 'REJECTED' && (
                      <span className="flex items-center gap-1.5 text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                        <Icon name="cancel" size="sm" />
                        Recusado
                      </span>
                    )}
                  </div>
                </div>

                <div className="py-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-uber-gray border border-uber-border rounded-lg">
                    <span className="font-semibold text-uber-iron block text-[11px]">Documento CNH</span>
                    <p className="font-mono font-bold text-sm text-uber-black mt-0.5">{req.cnhNumber}</p>
                  </div>

                  <div className="p-3 bg-uber-gray border border-uber-border rounded-lg">
                    <span className="font-semibold text-uber-iron block text-[11px]">Veículo Declarado</span>
                    <p className="font-bold text-uber-black mt-0.5">{req.vehicle.brand} {req.vehicle.model} ({req.vehicle.year})</p>
                    <p className="text-uber-iron mt-0.5">Placa: {req.vehicle.plate} • {req.vehicle.hasAC ? 'Com Ar' : 'Sem Ar'} • {req.vehicle.hasUSB ? 'Com USB' : 'Sem USB'}</p>
                  </div>
                </div>

                {req.rejectionReason && (
                  <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 font-normal">
                    Motivo da Recusa: {req.rejectionReason}
                  </div>
                )}

                {req.status === 'PENDING' && (
                  <div className="pt-3 border-t border-uber-border flex flex-col sm:flex-row justify-end gap-2">
                    {rejectingId === req.id ? (
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          placeholder="Motivo da recusa..."
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          className="flex-1 text-xs border border-uber-border bg-uber-gray rounded-lg px-3 h-10 font-normal focus:outline-none focus:border-uber-black"
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
                          className="h-10 text-xs font-bold text-red-600 hover:bg-red-50 border-red-200"
                        >
                          Recusar Cadastro
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          iconLeft="check_circle"
                          onClick={() => handleApprove(req.id, req.userName)}
                          className="h-10 text-xs font-bold"
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
            <div className="bg-white border border-uber-border rounded-xl p-8 text-center text-uber-iron text-xs font-normal">
              Nenhuma solicitação encontrada nesta categoria.
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Financial & Custody */}
      {activeTab === 'FINANCES' && (
        <div className="space-y-4">
          <Card className="p-5 border border-uber-border rounded-xl bg-white">
            <h3 className="font-bold text-base text-uber-black mb-3">Transações em Custódia Aberta</h3>
            
            <div className="space-y-3">
              {bookings.filter(b => b.status === 'SIGNAL_CONFIRMED').length > 0 ? (
                bookings.filter(b => b.status === 'SIGNAL_CONFIRMED').map(b => (
                  <div key={b.id} className="p-3.5 bg-uber-gray border border-uber-border rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                    <div>
                      <span className="font-mono font-medium text-uber-iron block">{b.id}</span>
                      <p className="font-bold text-uber-black text-sm">Passageiro: {b.passengerName}</p>
                      <p className="text-uber-charcoal mt-0.5">Sinal Retido: <strong>R$ {b.amountPaidSignal.toFixed(2).replace('.', ',')}</strong></p>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      iconLeft="payments"
                      onClick={() => handleReleaseCustody(b.id, b.amountPaidSignal)}
                      className="h-9 px-3.5 text-xs font-bold"
                    >
                      Liberar Repasse (72h)
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-uber-iron font-normal p-6 text-center bg-uber-gray rounded-xl border border-uber-border">
                  Nenhuma transação com sinal pendente de liberação no momento.
                </p>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Tab 3: Settings */}
      {activeTab === 'SETTINGS' && (
        <Card className="p-5 border border-uber-border rounded-xl bg-white space-y-4 text-xs">
          <h3 className="font-bold text-base text-uber-black">Parâmetros Operacionais da Plataforma</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-uber-gray border border-uber-border rounded-lg">
              <span className="font-semibold text-uber-iron block text-[11px]">Divisão Padrão do PIX:</span>
              <p className="font-bold text-uber-black text-sm mt-0.5">50% Sinal / 50% Chegada</p>
            </div>
            <div className="p-3 bg-uber-gray border border-uber-border rounded-lg">
              <span className="font-semibold text-uber-iron block text-[11px]">Prazo de Resgate ao Motorista:</span>
              <p className="font-bold text-uber-black text-sm mt-0.5">Até 72 horas pós-viagem</p>
            </div>
            <div className="p-3 bg-uber-gray border border-uber-border rounded-lg">
              <span className="font-semibold text-uber-iron block text-[11px]">Antecedência Mínima para Publicação:</span>
              <p className="font-bold text-uber-black text-sm mt-0.5">2 horas (RN-06)</p>
            </div>
            <div className="p-3 bg-uber-gray border border-uber-border rounded-lg">
              <span className="font-semibold text-uber-iron block text-[11px]">Taxa de Estorno (&gt;1h):</span>
              <p className="font-bold text-uber-black text-sm mt-0.5">70% devolvido ao passageiro</p>
            </div>
          </div>
        </Card>
      )}

    </div>
  );
};

