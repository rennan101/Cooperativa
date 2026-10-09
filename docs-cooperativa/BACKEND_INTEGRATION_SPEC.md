# Especificação Técnica de Integração com o Backend — Cooperativa

Este documento estabelece o mapeamento detalhado entre as **11 telas da aplicação**, os fluxos de navegação e as **variáveis de conexão, tabelas de banco de dados e endpoints de API**.

---

## 1. Variáveis de Ambiente & Configurações Globais

| Variável | Tipo | Descrição | Exemplo |
| :--- | :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | URL | Endpoint base do Supabase / Backend API | `https://coop-viagens.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | String | Chave pública anônima para requisições frontend | `eyJhbGciOiJIUzI1NiIsInR5cCI...` |
| `PIX_GATEWAY_URL` | URL | Endpoint da API do Gateway Pix | `https://api.gerencianet.com.br/v2` |
| `PIX_GATEWAY_CLIENT_ID` | String | Client ID da integração de pagamento | `Client_Id_prod_9921...` |
| `PIX_GATEWAY_CLIENT_SECRET`| String | Secret para geração de credenciais OAuth PIX | `Client_Secret_prod_881...` |
| `GOOGLE_MAPS_API_KEY` | String | Chave para geocodificação e distâncias | `AIzaSyD2_...` |
| `WEBSOCKET_REALTIME_URL` | WSS | Conexão para chat em tempo real e status de PIX | `wss://coop-viagens.supabase.co/realtime/v1` |

---

## 2. Dicionário de Telas, Rotas e Variáveis de Backend

### Tela 01: Home & Hero Transit (`#/`)
* **Rota SPA**: `#/`
* **Objetivo**: Entrada principal, busca rápida de viagens, destaques regionais e conversão.
* **Variáveis de Entrada (State / UI)**:
  * `search_origin` (string): Cidade/Ponto de partida.
  * `search_destination` (string): Cidade/Ponto de chegada.
  * `search_date` (string `YYYY-MM-DD`): Data da viagem.
  * `search_seats` (number 1-4): Quantidade de assentos desejados.
* **Consultas / Endpoints de Backend**:
  * `GET /api/rides/highlights`: Retorna rotas populares em destaque no Nordeste.
  * `GET /api/stats/cooperative`: Retorna total de passageiros transportados, nota média geral e economia gerada.
* **Destinos de Rota (Setas)**:
  * $\rightarrow$ `#/buscar` (ao submeter busca)
  * $\rightarrow$ `#/publicar` (ao clicar em "Oferecer Viagem")
  * $\rightarrow$ `#/motorista/:driverId` (ao clicar no perfil de motoristas em destaque)

---

### Tela 02: Busca e Resultados (`#/buscar`)
* **Rota SPA**: `#/buscar`
* **Objetivo**: Listagem filtrada de viagens disponíveis com visualização de veículos e motoristas.
* **Filtros e Variáveis de Consulta**:
  * `origin_city` (string)
  * `dest_city` (string)
  * `travel_date` (date)
  * `min_seats` (integer)
  * `time_filter` (`MORNING` [05:00-11:59], `AFTERNOON` [12:00-17:59], `NIGHT` [18:00-23:59])
  * `only_ac` (boolean)
  * `luggage_allowed` (boolean)
  * `max_price` (number)
* **Consultas / Endpoints de Backend**:
  * `GET /api/rides?origin={origin}&destination={destination}&date={date}&seats={seats}`
* **Variáveis do Card de Viagem**:
  * `ride.id`, `ride.departure_time`, `ride.origin_city`, `ride.origin_spot`, `ride.dest_city`, `ride.dest_spot`
  * `driver.id`, `driver.name`, `driver.avatar_url`, `driver.rating`, `driver.is_verified`
  * `vehicle.brand`, `vehicle.model`, `vehicle.color_id`, `vehicle.color_name`, `vehicle.plate`
  * `ride.price_per_seat`, `ride.available_seats`
* **Destinos de Rota (Setas)**:
  * $\rightarrow$ `#/viagem/:id` (ao selecionar card)
  * $\rightarrow$ `#/motorista/:driverId` (ao clicar no avatar do condutor)

---

### Tela 03: Detalhes da Viagem & Reserva (`#/viagem/:id`)
* **Rota SPA**: `#/viagem/:id`
* **Objetivo**: Apresentação detalhada do itinerário, veículo, regras e confirmação de reserva.
* **Variáveis de Backend Mapeadas**:
  * `ride.distance_km` (number): Distância total em quilômetros.
  * `ride.duration` (string): Duração estimada (ex: "6h 30m").
  * `ride.stops` (array): Paradas programadas ao longo do percurso.
  * `ride.ac_available` (boolean): Veículo climatizado.
  * `ride.luggage_allowed` (boolean): Bagagem de até 15kg no porta-malas.
  * `pricing.subtotal`: `ride.price_per_seat * selected_seats`
  * `pricing.fee`: `subtotal * 0.05` (5% taxa cooperativa)
  * `pricing.total`: `subtotal + fee`
* **Mutação / Endpoint**:
  * `POST /api/bookings`: Cria a reserva com status `PENDING_PIX`.
* **Destinos de Rota (Setas)**:
  * $\rightarrow$ `Modal PIX` (Abre modal de pagamento imediato)
  * $\rightarrow$ `#/motorista/:driverId` (ao ver detalhes do perfil)

---

### Tela 04: Perfil Público do Motorista (`#/motorista/:driverId`)
* **Rota SPA**: `#/motorista/:driverId`
* **Objetivo**: Prova social, histórico de viagens e reputação do cooperado.
* **Variáveis de Backend**:
  * `driver.name`, `driver.avatar_url`, `driver.rating`, `driver.total_trips`, `driver.member_since`, `driver.city`
  * `driver.vehicles` (array de veículos cadastrados com cor e placa)
  * `driver.active_rides` (array de próximas viagens disponíveis)
  * `driver.reviews` (array com `passenger_name`, `rating`, `comment`, `date`, `tags`)
* **Destinos de Rota (Setas)**:
  * $\rightarrow$ `#/viagem/:id` (ao selecionar uma viagem ativa do motorista)

---

### Tela 05: Painel Minhas Viagens — Passageiro (`#/minhas-viagens`)
* **Rota SPA**: `#/minhas-viagens` (Modo Passageiro)
* **Objetivo**: Acompanhar reservas ativas, comprovantes de pagamento, acesso ao chat e cancelamento.
* **Variáveis de Backend**:
  * `booking.id`, `booking.booking_status` (`CONFIRMED`, `PENDING_APPROVAL`, `CANCELLED`)
  * `booking.payment_status` (`PENDING_PIX`, `PAID`, `REFUNDED`)
  * `booking.pix_code`, `booking.seats_count`, `booking.total_amount`
* **Ações & Endpoints**:
  * `POST /api/bookings/:id/cancel`: Aciona estorno PIX automático via Gateway.
* **Destinos de Rota (Setas)**:
  * $\rightarrow$ `#/chat/:rideId` (ao abrir chat com o condutor)
  * $\rightarrow$ `Modal PIX` (ao clicar em pagar ou ver QR Code)
  * $\rightarrow$ `#/avaliar/:rideId` (após a viagem ser marcada como `COMPLETED`)

---

### Tela 06: Painel de Controle — Motorista (`#/minhas-viagens`)
* **Rota SPA**: `#/minhas-viagens` (Modo Motorista)
* **Objetivo**: Gestão de viagens publicadas, aprovação/recusa de passageiros e status da viagem.
* **Variáveis de Backend**:
  * `driver_rides`: Lista de viagens criadas pelo motorista logado.
  * `ride.passengers`: Lista de passageiros confirmados com foto e telefone.
  * `ride.pending_requests`: Solicitações pendentes de aprovação.
  * `ride.total_earnings`: Valor total acumulado a receber via PIX.
* **Ações & Endpoints**:
  * `PUT /api/bookings/:id/status`: Aceitar (`ACCEPTED`) ou Recusar (`REJECTED`) passageiro.
  * `PUT /api/rides/:id/start`: Altera status para `IN_PROGRESS`.
  * `PUT /api/rides/:id/complete`: Altera status para `COMPLETED` e libera repasse PIX.
* **Destinos de Rota (Setas)**:
  * $\rightarrow$ `#/chat/:rideId`
  * $\rightarrow$ `#/perfil` (Adicionar ou trocar veículo)

---

### Tela 07: Publicar Nova Viagem (`#/publicar`)
* **Rota SPA**: `#/publicar`
* **Objetivo**: Criação de novas ofertas de caronas/viagens com precificação inteligente.
* **Variáveis do Formulário**:
  * `origin_city` (string), `origin_spot` (string)
  * `dest_city` (string), `dest_spot` (string)
  * `departure_date` (date), `departure_time` (time)
  * `vehicle_id` (uuid)
  * `available_seats` (1 a 6)
  * `price_per_seat` (decimal sugerido automaticamente pela matriz de distância)
  * `luggage_allowed` (boolean), `ac_available` (boolean)
* **Endpoint**:
  * `POST /api/rides`: Grava a viagem no banco e notifica passageiros com rotas salvas.
* **Destinos de Rota (Setas)**:
  * $\rightarrow$ `#/minhas-viagens` (ao publicar com sucesso)

---

### Tela 08: Chat em Tempo Real (`#/chat/:rideId`)
* **Rota SPA**: `#/chat/:rideId`
* **Objetivo**: Comunicação direta entre passageiros e motorista para alinhamento de embarque.
* **Variáveis e Schema Realtime**:
  * `message.id` (uuid)
  * `message.ride_id` (uuid)
  * `message.sender_id` (uuid)
  * `message.sender_name` (string)
  * `message.sender_role` (`DRIVER` | `PASSENGER`)
  * `message.text` (string)
  * `message.timestamp` (ISO datetime)
* **Conexão**:
  * `WSS /realtime/v1/rides:{rideId}:chat`

---

### Tela 09: Avaliação Pós-Viagem (`#/avaliar/:rideId`)
* **Rota SPA**: `#/avaliar/:rideId`
* **Objetivo**: Feedback de reputação mútua.
* **Variáveis**:
  * `rating` (integer 1 a 5)
  * `tags` (array: `["Pontual", "Direção Segura", "Carro Limpo", "Boa Conversa"]`)
  * `comment` (text)
* **Endpoint**:
  * `POST /api/reviews`

---

### Tela 10: Meu Perfil & Garagem (`#/perfil`)
* **Rota SPA**: `#/perfil`
* **Objetivo**: Gestão cadastral, chave PIX e gerenciador de frota de veículos.
* **Variáveis**:
  * `user.name`, `user.phone`, `user.pix_key`, `user.avatar_url`
  * `vehicles[]`: `[ { id, brand, model, color_id, color_name, plate, year, seats } ]`
* **Endpoints**:
  * `PUT /api/users/profile`
  * `POST /api/vehicles` / `DELETE /api/vehicles/:id`

---

### Tela 11: Painel Administrativo (`#/admin`)
* **Rota SPA**: `#/admin`
* **Objetivo**: Supervisão da cooperativa, conciliação financeira e auditoria de estornos.
* **Variáveis de Métricas**:
  * `metrics.total_gmv`: Volume financeiro total bruto.
  * `metrics.coop_revenue`: Receita retida pela taxa de 5%.
  * `metrics.total_trips_completed`: Total de viagens finalizadas.
  * `metrics.disputes_count`: Reservas em disputa ou cancelamentos sob análise.
