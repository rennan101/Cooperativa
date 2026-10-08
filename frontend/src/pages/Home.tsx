import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSearchBar } from '../components/search/HeroSearchBar';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAppStore } from '../store/useAppStore';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setSearchParams, role } = useAppStore();

  const handleSelectPopularRoute = (origin: string, destination: string) => {
    setSearchParams({
      origin,
      destination,
      date: new Date().toISOString().split('T')[0],
      seats: 1,
    });
    navigate('/buscar');
  };

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-12 text-left">
      
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white pt-10 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-5">
          
          {/* Top verified trust indicator */}
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-300">
            <Icon name="verified_user" size="sm" className="text-emerald-400" />
            <span>Cooperativa Oficial</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight max-w-2xl leading-tight text-white">
            Viaje a trabalho com economia, segurança e conforto.
          </h1>

          <p className="text-slate-100 text-sm sm:text-base max-w-xl font-medium">
            Pague 50% no PIX para garantir o lugar e 50% na chegada.
          </p>

          {/* Floating Search Bar */}
          <div className="w-full mt-2">
            <HeroSearchBar />
          </div>

        </div>
      </section>

      {/* 3 Steps Section (Equal Height & Aligned Lines) */}
      <section className="max-w-4xl mx-auto px-4 w-full -mt-20 z-10">
        <div className="bg-white border-2 border-slate-300 rounded-lg shadow-md p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            
            <div className="flex items-center md:flex-col md:items-start gap-3 p-3.5 bg-slate-50 rounded-md border border-slate-300 h-20 md:h-36">
              <div className="w-10 h-10 rounded-md bg-coop-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                <Icon name="search" size="md" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-950 leading-tight">1. Escolha a viagem</h3>
                <p className="text-slate-700 text-xs font-medium leading-tight mt-1 hidden md:block">
                  Selecione origem, destino e motorista verificado.
                </p>
              </div>
            </div>

            <div className="flex items-center md:flex-col md:items-start gap-3 p-3.5 bg-slate-50 rounded-md border border-slate-300 h-20 md:h-36">
              <div className="w-10 h-10 rounded-md bg-coop-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                <Icon name="payments" size="md" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-950 leading-tight">2. Sinal de 50% PIX</h3>
                <p className="text-slate-700 text-xs font-medium leading-tight mt-1 hidden md:block">
                  Garantia de vaga com custódia segura.
                </p>
              </div>
            </div>

            <div className="flex items-center md:flex-col md:items-start gap-3 p-3.5 bg-slate-50 rounded-md border border-slate-300 h-20 md:h-36">
              <div className="w-10 h-10 rounded-md bg-coop-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                <Icon name="directions_car" size="md" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-950 leading-tight">3. Embarque e viaje</h3>
                <p className="text-slate-700 text-xs font-medium leading-tight mt-1 hidden md:block">
                  Encontro pontual e recibo digital no final.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="max-w-4xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between mb-4 h-8">
          <h2 className="text-lg sm:text-xl font-black text-slate-950 flex items-center gap-2">
            <Icon name="trending_up" size="sm" className="text-coop-primary" />
            <span>Rotas Mais Procuradas</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <Card
            hoverable
            onClick={() => handleSelectPopularRoute('São Paulo, SP', 'Campinas, SP')}
            className="p-3.5 flex items-center justify-between border-2 border-slate-300 hover:border-coop-primary h-18 bg-white"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 bg-emerald-100 text-emerald-900 rounded-md shrink-0">
                <Icon name="commute" size="sm" />
              </div>
              <div className="truncate">
                <p className="font-black text-xs sm:text-sm text-slate-950 truncate">São Paulo ➔ Campinas</p>
                <p className="text-[11px] font-extrabold text-emerald-800">A partir de R$ 35,00</p>
              </div>
            </div>
            <Icon name="chevron_right" size="sm" className="text-slate-600 shrink-0" />
          </Card>

          <Card
            hoverable
            onClick={() => handleSelectPopularRoute('São Paulo, SP', 'São José dos Campos, SP')}
            className="p-3.5 flex items-center justify-between border-2 border-slate-300 hover:border-coop-primary h-18 bg-white"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 bg-emerald-100 text-emerald-900 rounded-md shrink-0">
                <Icon name="commute" size="sm" />
              </div>
              <div className="truncate">
                <p className="font-black text-xs sm:text-sm text-slate-950 truncate">São Paulo ➔ S. José dos Campos</p>
                <p className="text-[11px] font-extrabold text-emerald-800">A partir de R$ 40,00</p>
              </div>
            </div>
            <Icon name="chevron_right" size="sm" className="text-slate-600 shrink-0" />
          </Card>

          <Card
            hoverable
            onClick={() => handleSelectPopularRoute('Belo Horizonte, MG', 'Ouro Preto, MG')}
            className="p-3.5 flex items-center justify-between border-2 border-slate-300 hover:border-coop-primary h-18 bg-white"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 bg-emerald-100 text-emerald-900 rounded-md shrink-0">
                <Icon name="commute" size="sm" />
              </div>
              <div className="truncate">
                <p className="font-black text-xs sm:text-sm text-slate-950 truncate">Belo Horizonte ➔ Ouro Preto</p>
                <p className="text-[11px] font-extrabold text-emerald-800">A partir de R$ 45,00</p>
              </div>
            </div>
            <Icon name="chevron_right" size="sm" className="text-slate-600 shrink-0" />
          </Card>

        </div>
      </section>

      {/* Driver CTA Section (Only for Drivers) */}
      {role === 'DRIVER' && (
        <section className="max-w-4xl mx-auto px-4 w-full animate-fade-in">
          <div className="bg-slate-950 text-white rounded-lg p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-2 border-slate-800">
            <div className="max-w-lg">
              <h2 className="text-lg sm:text-xl font-black mb-1 text-white">
                Vai viajar? Ofereça seus lugares livres.
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-medium">
                Publique com pelo menos 2h de antecedência e receba resgate via PIX em até 72h.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              iconLeft="add_circle"
              onClick={() => navigate('/publicar')}
              className="w-full sm:w-auto h-12 px-6 shrink-0 font-extrabold"
            >
              Nova Viagem
            </Button>
          </div>
        </section>
      )}

    </div>
  );
};
