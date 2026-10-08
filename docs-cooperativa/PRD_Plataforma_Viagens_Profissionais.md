# PRD --- Plataforma de Viagens Compartilhadas para Profissionais

**Versão:** 1.0\
**Data:** 06/10/2026\
**Status:** Rascunho para validação de negócio

## 1. Visão Geral

A plataforma será um site/app voltado para profissionais, permitindo
conectar motoristas e passageiros para viagens compartilhadas.
Motoristas poderão publicar roteiros entre origem e destino, informar
data, horário, valor, vagas e características do veículo. Passageiros
poderão encontrar viagens compatíveis, reservar vagas, pagar via PIX,
conversar com o motorista e avaliar a experiência.

A plataforma também deverá controlar pagamentos, cancelamentos,
estornos, repasses, mensalidades, assinaturas, associação à cooperativa,
benefícios, avaliações e recibos.

## 2. Objetivos

-   Facilitar a criação e reserva de viagens compartilhadas.
-   Encontrar passageiros compatíveis com o trajeto real do motorista.
-   Evitar sugestões que exijam desvios incompatíveis.
-   Centralizar pagamentos na plataforma.
-   Controlar cancelamentos, estornos e repasses.
-   Incentivar associação à cooperativa.
-   Criar benefícios para motoristas recorrentes.
-   Disponibilizar histórico, avaliações e recibos.

## 3. Perfis

### 3.1 Administrador

Pode aprovar/rejeitar motoristas, gerenciar usuários, viagens,
pagamentos, estornos, repasses, assinaturas, cooperativa, regras
comerciais, indicadores e bloqueios.

### 3.2 Motorista

Pode criar e editar viagens, cadastrar veículo, consultar passageiros,
trocar mensagens, acompanhar ganhos, avaliações, mensalidades,
associação à cooperativa, solicitar resgates e emitir recibos.

### 3.3 Passageiro

Pode pesquisar e reservar viagens, pagar via PIX, conversar com
motorista, cancelar, acompanhar estornos, consultar histórico, avaliar
motorista, cadastrar chave PIX e emitir recibos.

### 3.4 Gestor

Perfil gerencial com acesso a dashboards e informações de mensalidades,
associações, pagamentos, estornos, repasses, receitas, viagens e
indicadores.

Recomenda-se utilizar controle de acesso por função (RBAC), permitindo
níveis diferentes para administrador e gestor.

## 4. Cadastro e Autenticação

O motorista deverá solicitar autorização antes de acessar as
funcionalidades de motorista.

Dados iniciais: - nome; - WhatsApp; - e-mail.

O e-mail deverá ser validado. A solicitação ficará pendente até análise
administrativa. Após aprovação, o usuário poderá receber uma senha
provisória, que deverá ser alterada no primeiro acesso.

### Requisitos

-   **RF-AUT-01:** permitir solicitação de acesso do motorista.
-   **RF-AUT-02:** validar e-mail.
-   **RF-AUT-03:** permitir aprovação/rejeição pelo administrador.
-   **RF-AUT-04:** permitir senha provisória.
-   **RF-AUT-05:** exigir troca da senha provisória no primeiro acesso.

## 5. Perfil do Motorista

### Dados pessoais

-   nome;
-   foto;
-   e-mail;
-   WhatsApp;
-   bio.

### Indicadores

-   quantidade de viagens realizadas;
-   valor total recebido;
-   percentual relacionado aos ganhos, se aplicável;
-   avaliação média;
-   quantidade de avaliações;
-   status da cooperativa;
-   status da assinatura.

### Veículo

-   placa;
-   UF;
-   ano;
-   marca;
-   modelo;
-   RENAVAM;
-   funcionalidades do veículo.

Funcionalidades iniciais sugeridas: - ar-condicionado; - USB; - outros
recursos configuráveis.

## 6. Pontos Favoritos

O motorista poderá salvar pontos específicos como favoritos de origem
e/ou destino para agilizar a criação de novas viagens.

## 7. Perfil do Passageiro

Campos e informações: - nome; - foto; - e-mail; - WhatsApp; - quantidade
de viagens; - avaliação média; - histórico; - chave PIX; - recibos; -
status da cooperativa, quando aplicável.

A chave PIX deverá ser protegida e usada apenas para operações
autorizadas, como estornos.

## 8. Criação de Viagem

O motorista deverá informar: - origem; - destino; - data; - horário; -
valor por passageiro; - quantidade de vagas; - veículo; -
características do veículo; - observações.

### Antecedência mínima

A viagem só poderá ser criada para horário **igual ou superior a 2 horas
após o horário atual**.

A validação deverá ocorrer no servidor.

## 9. Compatibilidade de Rotas

A plataforma deverá encontrar passageiros com origem e destino
compatíveis com a rota do motorista.

Devem ser considerados: - origem; - destino; - direção; - distância do
ponto do passageiro ao trajeto; - desvio de tempo/distância.

O sistema não deverá recomendar automaticamente locais que exijam desvio
incompatível com a rota.

Recomenda-se que a margem de desvio seja configurável pelo administrador
e baseada em distância e/ou tempo, não apenas em distância em linha
reta.

## 10. Múltiplos Passageiros

Uma viagem poderá possuir mais de um passageiro, limitada pela
quantidade de vagas.

O sistema deverá controlar vagas disponíveis, reservas, ocupação,
pagamentos e cancelamentos individualmente.

## 11. Edição de Viagem

O motorista poderá editar: - data; - horário; - origem; - destino; -
valor; - vagas; - observações.

O sistema deverá manter histórico das alterações.

Quando houver reservas, alterações que afetem os passageiros deverão
gerar notificação e obedecer a uma regra de cancelamento/aceite que
deverá ser definida.

## 12. Mensagens

Passageiro e motorista poderão trocar mensagens vinculadas à
viagem/reserva.

Cada mensagem deverá registrar: - texto; - data; - hora; - remetente; -
foto de perfil.

O destinatário deverá receber notificação de novas mensagens.

## 13. Avaliações

A avaliação deverá ser bidirecional:

-   passageiro → motorista;
-   motorista → passageiro.

Cada avaliação deverá possuir: - nota; - comentário opcional; - data; -
viagem relacionada.

A média deverá ser calculada pelo sistema.

> O requisito original sobre "avaliações ... dos não motoristas pelos
> passageiros" é ambíguo. Neste PRD foi adotada a interpretação de
> avaliação bidirecional entre motorista e passageiro.

## 14. Pagamentos

O meio de pagamento será PIX.

Todos os pagamentos deverão passar pela plataforma.

### Reserva

O passageiro deverá pagar **50% do valor da reserva no momento da
reserva**.

### Ponto a confirmar

Há uma inconsistência entre "pagamento por PIX no fim da corrida" e
"passageiro paga 50% da reserva". A interpretação adotada neste PRD é:

-   50% na reserva;
-   50% no encerramento da corrida.

Essa regra precisa ser confirmada antes do desenvolvimento.

## 15. Custódia e Repasse

Os valores deverão ser direcionados à plataforma.

O motorista terá até **72 horas para solicitar o resgate** dos valores
disponíveis, conforme regra operacional.

O motorista deverá receber notificação quando o pagamento for
confirmado.

Status sugeridos: - aguardando pagamento; - pagamento pendente; -
pagamento confirmado; - viagem realizada; - disponível para resgate; -
resgate solicitado; - resgate processando; - resgate concluído; -
estorno solicitado; - estorno processando; - estorno concluído.

## 16. Cancelamento

### Mais de 1 hora antes da viagem

O passageiro recebe **70% do valor pago**.

### Menos de 1 hora antes

O passageiro recebe **50% do valor pago**.

Na regra informada para cancelamento tardio: - 50% → passageiro; - 30% →
motorista; - 20% → plataforma.

A base de cálculo deverá ser definida: valor total da viagem ou valor
efetivamente pago até o cancelamento.

## 17. Estorno

O requisito original informa prazo de **92 horas** para estorno.

O sistema deverá registrar: - solicitação; - data/hora; - valor; -
motivo; - status; - conclusão.

Status: - solicitado; - em análise; - aprovado; - processando; -
concluído; - recusado.

**Ponto de validação:** confirmar se "92 horas" está correto ou se houve
erro de digitação.

## 18. Cooperativa

O usuário poderá solicitar associação à cooperativa.

Status: - não associado; - solicitação pendente; - associado; -
suspenso; - cancelado.

O associado poderá receber: - badge; - benefícios; - bônus; - campanhas
específicas.

Foi informado inicialmente um benefício de **15%** em determinadas
situações de cancelamento.

A aplicação exata desse percentual deverá ser definida: desconto ao
passageiro, redução da taxa da plataforma, aumento do repasse ou outro
modelo.

## 19. Assinatura Mensal do Motorista

O motorista poderá pagar assinatura mensal.

Registrar: - plano; - valor; - contratação; - período; - vencimento; -
pagamento; - status; - histórico; - benefícios.

Motoristas assinantes poderão ter um benefício percentual em regras de
cancelamento, independentemente do prazo.

O percentual e a forma de aplicação precisam ser definidos.

## 20. Benefício por Volume de Corridas

O motorista poderá receber benefício conforme o número de corridas
concluídas no mês.

Benefícios possíveis: - desconto na mensalidade; - isenção da
mensalidade; - outros benefícios.

As faixas deverão ser configuráveis pelo administrador.

Exemplo ilustrativo, não definitivo:

    Corridas concluídas Benefício
  --------------------- ----------------------
                   0--9 Sem benefício
                 10--19 25% de desconto
                 20--29 50% de desconto
                    30+ Mensalidade gratuita

## 21. Cooperativa, Assinatura e Estrelas

Motorista não associado: - não recebe badge de cooperado; - não recebe
benefícios exclusivos; - paga mensalidade integral; - não recebe
estrelas iniciais de cooperado.

Recomenda-se separar **avaliação real** de **benefício/reputação
inicial**, para evitar atribuir uma nota artificial antes de existirem
avaliações.

A quantidade X de estrelas e seu significado deverão ser definidos.

## 22. Recibos

### Motorista

Recibos de viagens, recebimentos, repasses, mensalidades e outras
operações aplicáveis.

### Passageiro

Recibos de reservas, pagamentos, viagens, taxas e estornos.

### Gestor/Plataforma

Recibos e consultas de mensalidades, receitas, pagamentos, repasses e
estornos.

Recibo deverá conter, quando aplicável: - identificador; - data; -
usuário; - viagem; - valor; - descrição; - status; - forma de pagamento.

## 23. Dashboard

### Usuários

-   motoristas;
-   passageiros;
-   novos cadastros;
-   ativos;
-   bloqueados.

### Viagens

-   criadas;
-   realizadas;
-   canceladas;
-   passageiros transportados;
-   ocupação média.

### Financeiro

-   volume transacionado;
-   receita da plataforma;
-   valores de motoristas;
-   valores em custódia;
-   estornos;
-   mensalidades;
-   assinaturas ativas;
-   valores disponíveis para resgate.

### Cooperativa

-   associados;
-   solicitações pendentes;
-   associados ativos;
-   benefícios concedidos.

## 24. Notificações

O sistema deverá notificar: - cadastro aprovado/rejeitado; - senha
provisória; - nova reserva; - pagamento confirmado; - pagamento
pendente; - viagem próxima; - alteração de viagem; - cancelamento; -
estorno; - nova mensagem; - avaliação disponível; - valor disponível
para resgate; - resgate concluído; - mensalidade próxima do
vencimento; - mensalidade vencida; - benefício conquistado; - alteração
no status da cooperativa.

## 25. Histórico

### Motorista

Viagens, passageiros, ganhos, pagamentos, repasses, mensalidades,
avaliações, cancelamentos, estornos e associação.

### Passageiro

Reservas, viagens, pagamentos, cancelamentos, estornos, avaliações e
recibos.

### Administração

Alterações administrativas, pagamentos, estornos, repasses,
mensalidades, associações e alterações de regras.

## 26. Requisitos Não Funcionais

### Segurança

-   HTTPS;
-   hash seguro de senhas;
-   proteção de dados sensíveis;
-   RBAC;
-   isolamento de dados por usuário;
-   auditoria de operações financeiras;
-   logs de operações críticas.

### Privacidade

A plataforma deverá observar a LGPD, incluindo política de privacidade,
tratamento adequado de dados pessoais, retenção e exclusão conforme
requisitos legais.

### Disponibilidade

Autenticação, reservas, pagamentos e mensagens deverão ser projetados
para alta disponibilidade.

### Desempenho

Login, busca, consulta de viagens e reservas deverão possuir resposta
rápida. Integrações externas deverão possuir timeout e tratamento de
falhas.

### Escalabilidade

A arquitetura deverá suportar crescimento de usuários, viagens,
mensagens e transações.

### Auditoria

Operações administrativas e financeiras deverão registrar usuário, ação,
data/hora, identificador e valores anterior/novo quando aplicável.

## 27. Usabilidade

A plataforma deverá: - funcionar em desktop e dispositivos móveis; -
possuir interface responsiva; - apresentar valores e status
claramente; - apresentar origem/destino; - apresentar vagas; -
apresentar avaliação; - apresentar características do veículo; -
permitir ações importantes em poucos passos.

## 28. Mapas e Localização

O sistema deverá utilizar serviço de mapas/geolocalização para: -
localizar origem; - localizar destino; - calcular rotas; - estimar
distância; - estimar duração; - verificar compatibilidade.

Endereços deverão preferencialmente ser convertidos para coordenadas
geográficas.

## 29. Regras de Negócio Consolidadas

  -----------------------------------------------------------------------
  ID                                  Regra
  ----------------------------------- -----------------------------------
  RN-01                               Motorista precisa solicitar
                                      autorização.

  RN-02                               Cadastro inicial exige nome,
                                      WhatsApp e e-mail validado.

  RN-03                               Administrador aprova ou rejeita.

  RN-04                               Motorista aprovado pode receber
                                      senha provisória.

  RN-05                               Senha provisória deve ser alterada
                                      no primeiro acesso.

  RN-06                               Viagem deve ser criada com pelo
                                      menos 2 horas de antecedência.

  RN-07                               Viagem possui origem, destino, data
                                      e horário.

  RN-08                               Viagem pode ter múltiplos
                                      passageiros até o limite de vagas.

  RN-09                               Sistema busca passageiros
                                      compatíveis.

  RN-10                               Sistema evita desvios
                                      incompatíveis.

  RN-11                               50% da reserva é pago
                                      antecipadamente, conforme
                                      interpretação atual.

  RN-12                               Saldo de 50% é tratado como
                                      pagamento no final, pendente de
                                      confirmação.

  RN-13                               Pagamentos passam pela plataforma.

  RN-14                               Motorista pode solicitar resgate em
                                      até 72 horas, conforme regra
                                      operacional.

  RN-15                               Cancelamento com mais de 1 hora
                                      devolve 70%.

  RN-16                               Cancelamento com menos de 1 hora
                                      devolve 50%.

  RN-17                               Na regra tardia, 30% vão ao
                                      motorista e 20% à plataforma.

  RN-18                               Estorno informado como 92 horas,
                                      pendente de validação.

  RN-19                               Cooperados podem receber
                                      benefícios.

  RN-20                               Benefício inicial informado da
                                      cooperativa: 15%, aplicação
                                      pendente.

  RN-21                               Assinantes podem ter benefícios
                                      adicionais em cancelamentos.

  RN-22                               Motoristas podem receber benefícios
                                      por volume mensal de corridas.

  RN-23                               Não associados não recebem badge de
                                      cooperado.

  RN-24                               Não associados pagam mensalidade
                                      integral.

  RN-25                               Avaliações são bidirecionais.

  RN-26                               Operações financeiras elegíveis
                                      devem permitir emissão de recibo.
  -----------------------------------------------------------------------

## 30. Estados Principais

### Usuário

-   pendente;
-   ativo;
-   suspenso;
-   bloqueado;
-   inativo.

### Motorista

-   solicitação pendente;
-   aprovado;
-   rejeitado;
-   ativo;
-   suspenso.

### Viagem

-   rascunho;
-   publicada;
-   com vagas;
-   lotada;
-   em andamento;
-   concluída;
-   cancelada.

### Reserva

-   aguardando pagamento;
-   parcialmente paga;
-   paga;
-   confirmada;
-   cancelada;
-   estorno pendente;
-   estornada;
-   concluída.

### Pagamento

-   pendente;
-   processando;
-   confirmado;
-   falhou;
-   cancelado;
-   estornado.

### Repasse

-   indisponível;
-   disponível;
-   solicitado;
-   processando;
-   concluído;
-   falhou.

## 31. Critérios de Aceitação

### Cadastro

-   [ ] Solicitação com nome, WhatsApp e e-mail.
-   [ ] Validação do e-mail.
-   [ ] Aprovação/rejeição administrativa.
-   [ ] Acesso após aprovação.
-   [ ] Troca da senha provisória.

### Viagem

-   [ ] Origem e destino.
-   [ ] Data e horário.
-   [ ] Bloqueio de viagens com menos de 2 horas.
-   [ ] Valor.
-   [ ] Vagas.
-   [ ] Veículo.
-   [ ] Publicação.

### Busca

-   [ ] Pesquisa de origem/destino.
-   [ ] Viagens compatíveis.
-   [ ] Consideração do trajeto real.
-   [ ] Exclusão de desvios incompatíveis.
-   [ ] Visualização de detalhes.

### Reserva

-   [ ] Verificação de vagas.
-   [ ] Pagamento PIX.
-   [ ] Confirmação após pagamento.
-   [ ] Notificação ao motorista.

### Cancelamento

-   [ ] Identificação do horário.
-   [ ] Cálculo automático do percentual.
-   [ ] Registro da distribuição dos valores.
-   [ ] Registro do estorno.

### Avaliação

-   [ ] Apenas usuários elegíveis podem avaliar.
-   [ ] Passageiro avalia motorista.
-   [ ] Motorista avalia passageiro.
-   [ ] Média atualizada.

## 32. Pontos a Definir Antes do Desenvolvimento

1.  **Pagamento:** confirmar 50% na reserva + 50% no final ou outro
    modelo.
2.  **Cancelamento:** definir se o percentual incide sobre valor total
    ou valor já pago.
3.  **Cancelamento pelo motorista:** definir regra específica.
4.  **Estorno:** confirmar se o prazo é realmente 92 horas.
5.  **Cooperativa:** definir aplicação do benefício de 15%.
6.  **Assinatura:** definir preço, planos, benefícios e percentual de
    cancelamento.
7.  **Volume de corridas:** definir faixas e benefícios.
8.  **Estrelas:** definir quantidade X e se é reputação ou benefício
    promocional.
9.  **Rotas:** definir margem máxima de distância/tempo fora do trajeto.
10. **Documentação:** definir documentos obrigatórios do motorista e
    veículo.
11. **Alteração de viagens:** definir direitos do passageiro quando uma
    viagem reservada for alterada.
12. **Saldo final:** definir o que acontece se o passageiro não pagar os
    50% restantes.

## 33. MVP Recomendado

### Fase 1 --- Fundação

-   cadastro;
-   login;
-   perfis;
-   aprovação de motorista;
-   veículo;
-   permissões;
-   dashboard básico.

### Fase 2 --- Viagens

-   criação;
-   edição;
-   origem/destino;
-   vagas;
-   pesquisa;
-   compatibilidade de rotas;
-   reserva.

### Fase 3 --- Pagamentos

-   PIX;
-   confirmação;
-   pagamentos;
-   cancelamentos;
-   estornos;
-   repasses;
-   recibos.

### Fase 4 --- Comunicação

-   mensagens;
-   notificações;
-   histórico.

### Fase 5 --- Reputação

-   avaliações;
-   indicadores;
-   histórico.

### Fase 6 --- Cooperativa e Assinatura

-   associação;
-   badge;
-   benefícios;
-   mensalidade;
-   assinatura;
-   benefícios por volume.

### Fase 7 --- Gestão Avançada

-   dashboard financeiro;
-   relatórios;
-   auditoria;
-   indicadores;
-   configurações comerciais.

## 34. Diretriz Arquitetural

Percentuais, prazos, valores de mensalidade, faixas de benefícios,
quantidade de corridas e margem de desvio de rota deverão ser
**parametrizáveis** sempre que possível, evitando regras comerciais
fixadas diretamente no código.

As regras financeiras e de cancelamento deverão ser validadas
formalmente antes do desenvolvimento, principalmente: - pagamento 50% +
50%; - cálculo de cancelamento; - prazo de 92 horas; - benefício de 15%
da cooperativa; - benefício para assinantes; - benefício por volume de
corridas; - estrelas iniciais.
