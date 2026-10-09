// Figma Plugin: Cooperativa — Gerador de Telas, Rotas & Backend
// Desenha todas as 11 telas, setas de rotas e caixas de conexão de backend nativas no canvas do Figma

async function run() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  const page = figma.currentPage;

  // Colors
  const black = { r: 0, g: 0, b: 0 };
  const white = { r: 1, g: 1, b: 1 };
  const grayBg = { r: 0.96, g: 0.96, b: 0.96 };
  const borderGray = { r: 0.89, g: 0.91, b: 0.93 };
  const blue = { r: 0.15, g: 0.39, b: 0.92 };
  const emerald = { r: 0.02, g: 0.72, b: 0.41 };
  const amber = { r: 0.96, g: 0.62, b: 0.04 };
  const purple = { r: 0.55, g: 0.36, b: 0.96 };
  const darkSlate = { r: 0.08, g: 0.09, b: 0.12 };

  const screensData = [
    {
      id: "screen_home",
      title: "01. Home & Hero Transit",
      route: "#/",
      role: "Público / Todos",
      col: 0,
      row: 0,
      elements: [
        { type: "header", text: "COOPERATIVA — VIAGENS" },
        { type: "hero", title: "Viagens Compartilhadas no Nordeste", sub: "Economia real, segurança e pontualidade" },
        { type: "input", label: "Origem", value: "Fortaleza, CE (Terminal João Thomé)" },
        { type: "input", label: "Destino", value: "Juazeiro do Norte, CE (Cariri Shopping)" },
        { type: "input", label: "Data & Vagas", value: "10 de Outubro • 1 passageiro" },
        { type: "button", text: "Buscar Viagens", bg: black, fg: white },
        { type: "section", title: "Rotas em Destaque", items: ["Sobral x Fortaleza (R$ 40)", "Recife x Caruaru (R$ 35)", "Salvador x Feira (R$ 30)"] }
      ],
      backend: {
        endpoints: ["GET /api/rides/highlights", "GET /api/stats/cooperative"],
        state: ["search_origin", "search_destination", "search_date", "search_seats"],
        db: ["rides", "users"]
      }
    },
    {
      id: "screen_buscar",
      title: "02. Busca e Filtros",
      route: "#/buscar",
      role: "Passageiro",
      col: 1,
      row: 0,
      elements: [
        { type: "header", text: "Viagens Disponíveis (4 encontradas)" },
        { type: "chips", list: ["Manhã", "Tarde", "Ar-condicionado", "Bagagem"] },
        { type: "card", title: "07:00 → 13:30 (Fortaleza → Juazeiro)", price: "R$ 65,00", driver: "Marcos Silva (4.95 ★)", car: "Toyota Corolla • Prata", seats: "3 vagas restantes" },
        { type: "card", title: "08:30 → 15:00 (Fortaleza → Juazeiro)", price: "R$ 60,00", driver: "Ana Beatriz (5.0 ★)", car: "Honda Civic • Preto", seats: "2 vagas restantes" },
        { type: "button", text: "Ver Detalhes da Viagem", bg: black, fg: white }
      ],
      backend: {
        endpoints: ["GET /api/rides?origin&dest&date&seats"],
        state: ["time_filter", "only_ac", "luggage_allowed", "max_price"],
        db: ["rides", "vehicles", "users"]
      }
    },
    {
      id: "screen_viagem",
      title: "03. Detalhes & Reserva",
      route: "#/viagem/:id",
      role: "Passageiro",
      col: 2,
      row: 0,
      elements: [
        { type: "header", text: "Itinerário da Viagem" },
        { type: "hero", title: "Fortaleza → Juazeiro do Norte", sub: "490 km • 6h 30m de percurso" },
        { type: "card", title: "Condutor Responsável", driver: "Marcos Silva (Cooperado Verificado)", car: "Toyota Corolla (Placa: BRA2E19)" },
        { type: "section", title: "Resumo de Valores", items: ["Valor por pessoa: R$ 65,00", "Taxa de Manutenção Cooperativa (5%): R$ 3,25", "Total: R$ 68,25"] },
        { type: "button", text: "Reservar e Pagar via PIX", bg: emerald, fg: white }
      ],
      backend: {
        endpoints: ["GET /api/rides/:id", "POST /api/bookings"],
        state: ["ride_id", "seats_count", "subtotal", "fee_5pct", "total_amount"],
        db: ["bookings", "rides", "users"]
      }
    },
    {
      id: "screen_pix",
      title: "12. Modal PIX Dinâmico",
      route: "Overlay / Modal",
      role: "Passageiro",
      col: 3,
      row: 0,
      elements: [
        { type: "header", text: "Pagamento Instantâneo PIX" },
        { type: "hero", title: "R$ 68,25", sub: "Válido por 10 minutos" },
        { type: "card", title: "QR Code PIX", driver: "[QR CODE DINÂMICO BANCO CENTRAL]", car: "Copia e Cola: 00020126580014br.gov.bcb.pix..." },
        { type: "button", text: "Copiar Código PIX", bg: black, fg: white },
        { type: "button", text: "Confirmar / Enviar Comprovante", bg: blue, fg: white }
      ],
      backend: {
        endpoints: ["POST /api/webhooks/pix/confirm", "GET /api/bookings/:id/status"],
        state: ["pix_code", "pix_qr_url", "payment_status"],
        db: ["bookings", "transactions"]
      }
    },
    {
      id: "screen_motorista",
      title: "04. Perfil Público do Condutor",
      route: "#/motorista/:id",
      role: "Público",
      col: 4,
      row: 0,
      elements: [
        { type: "header", text: "Perfil do Cooperado" },
        { type: "hero", title: "Marcos Silva", sub: "Membro desde Março/2023 • Fortaleza, CE" },
        { type: "card", title: "Reputação", driver: "Nota 4.95 ★ (142 viagens)", car: "Selo de Identidade Verificada" },
        { type: "section", title: "Garagem", items: ["Toyota Corolla 2022 (Prata)", "Honda HR-V 2021 (Branco)"] },
        { type: "section", title: "Últimas Avaliações", items: ["'Excelente condutor, pontual e muito tranquilo.'", "'Carro limpo e com ar funcionando perfeitamente.'"] }
      ],
      backend: {
        endpoints: ["GET /api/drivers/:id", "GET /api/reviews?driver_id={id}"],
        state: ["driver_id", "rating", "total_trips", "vehicles"],
        db: ["users", "vehicles", "reviews"]
      }
    },
    {
      id: "screen_publicar",
      title: "07. Publicar Viagem",
      route: "#/publicar",
      role: "Motorista",
      col: 0,
      row: 1,
      elements: [
        { type: "header", text: "Oferecer Nova Viagem" },
        { type: "input", label: "Origem & Ponto de Embarque", value: "Recife, PE (TIP)" },
        { type: "input", label: "Destino & Desembarque", value: "Caruaru, PE (Shopping)" },
        { type: "input", label: "Data e Horário", value: "10/10/2026 às 08:00" },
        { type: "input", label: "Veículo Selecionado", value: "Corolla Prata (BRA2E19)" },
        { type: "card", title: "Precificação Inteligente", price: "R$ 35,00 / vaga", driver: "Distância calculada: 135 km", car: "4 vagas disponíveis" },
        { type: "button", text: "Publicar Carona", bg: amber, fg: black }
      ],
      backend: {
        endpoints: ["POST /api/rides"],
        state: ["origin_city", "dest_city", "departure_time", "vehicle_id", "price_per_seat", "seats"],
        db: ["rides", "vehicles"]
      }
    },
    {
      id: "screen_minhas_viagens",
      title: "05 & 06. Minhas Viagens",
      route: "#/minhas-viagens",
      role: "Passageiro / Motorista",
      col: 1,
      row: 1,
      elements: [
        { type: "header", text: "Painel de Viagens" },
        { type: "chips", list: ["Como Passageiro (1)", "Como Motorista (2)"] },
        { type: "card", title: "Fortaleza → Juazeiro (Confirmada)", price: "R$ 68,25 (Pago via PIX)", driver: "Condutor: Marcos Silva", car: "Saída: 10/10 às 07:00", seats: "1 vaga reservada" },
        { type: "button", text: "Abrir Chat da Viagem", bg: black, fg: white },
        { type: "button", text: "Cancelar Reserva (Estorno PIX)", bg: white, fg: black }
      ],
      backend: {
        endpoints: ["GET /api/bookings/my", "POST /api/bookings/:id/cancel"],
        state: ["booking_status", "payment_status", "refund_amount"],
        db: ["bookings", "rides", "transactions"]
      }
    },
    {
      id: "screen_chat",
      title: "08. Chat em Tempo Real",
      route: "#/chat/:id",
      role: "Ambos",
      col: 2,
      row: 1,
      elements: [
        { type: "header", text: "Chat da Viagem #4902" },
        { type: "card", title: "Marcos Silva (Condutor)", driver: "'Olá! Estarei na entrada principal às 06:45.'", car: "Enviado às 06:30" },
        { type: "card", title: "Você (Passageiro)", driver: "'Perfeito, estarei de camisa azul.'", car: "Enviado às 06:32" },
        { type: "input", label: "Digite sua mensagem...", value: "Cheguei no ponto de encontro!" },
        { type: "button", text: "Enviar Mensagem", bg: black, fg: white }
      ],
      backend: {
        endpoints: ["WSS /realtime/v1/rides:{id}:chat"],
        state: ["message_id", "sender_id", "message_text", "sent_at"],
        db: ["chat_messages"]
      }
    },
    {
      id: "screen_avaliar",
      title: "09. Avaliação de Viagem",
      route: "#/avaliar/:id",
      role: "Passageiro",
      col: 3,
      row: 1,
      elements: [
        { type: "header", text: "Como foi sua viagem?" },
        { type: "hero", title: "Marcos Silva", sub: "Viagem Fortaleza → Juazeiro concluída" },
        { type: "chips", list: ["★★★★★ (5 Estrelas)"] },
        { type: "chips", list: ["Pontual", "Direção Segura", "Carro Limpo", "Ótima Conversa"] },
        { type: "input", label: "Deixe um comentário (opcional)", value: "Viagem muito tranquila e segura!" },
        { type: "button", text: "Enviar Avaliação", bg: black, fg: white }
      ],
      backend: {
        endpoints: ["POST /api/reviews"],
        state: ["rating", "tags", "comment"],
        db: ["reviews", "users"]
      }
    },
    {
      id: "screen_perfil",
      title: "10. Perfil & Garagem",
      route: "#/perfil",
      role: "Ambos",
      col: 0,
      row: 2,
      elements: [
        { type: "header", text: "Meu Cadastro & Garagem" },
        { type: "input", label: "Nome Completo", value: "Rennan Silva" },
        { type: "input", label: "Chave PIX para Recebimento", value: "85999887766 (Celular)" },
        { type: "card", title: "Veículos Cadastrados", driver: "Toyota Corolla 2022 (Prata)", car: "Placa: BRA2E19 • 4 assentos" },
        { type: "button", text: "+ Adicionar Novo Veículo", bg: blue, fg: white }
      ],
      backend: {
        endpoints: ["PUT /api/users/profile", "POST /api/vehicles", "DELETE /api/vehicles/:id"],
        state: ["name", "phone", "pix_key", "vehicles"],
        db: ["users", "vehicles"]
      }
    },
    {
      id: "screen_admin",
      title: "11. Painel Admin Cooperativa",
      route: "#/admin",
      role: "Administrador",
      col: 1,
      row: 2,
      elements: [
        { type: "header", text: "Dashboard de Gestão" },
        { type: "card", title: "Volume Bruto Transacionado (GMV)", price: "R$ 142.800,00", driver: "Taxa Cooperativa 5%: R$ 7.140,00" },
        { type: "card", title: "Aprovações Pendentes", driver: "3 novos motoristas aguardando análise de CNH", car: "0 disputas financeiras abertas" },
        { type: "button", text: "Gerenciar Usuários & Extrato", bg: black, fg: white }
      ],
      backend: {
        endpoints: ["GET /api/admin/metrics", "POST /api/admin/drivers/:id/approve"],
        state: ["total_gmv", "total_revenue", "pending_drivers_count"],
        db: ["transactions", "rides", "bookings", "users"]
      }
    }
  ];

  const screenNodes = {};

  // Render Screens
  for (const s of screensData) {
    const frameX = s.col * 520 + 100;
    const frameY = s.row * 1050 + 100;

    const frame = figma.createFrame();
    frame.name = s.title;
    frame.resize(390, 720);
    frame.x = frameX;
    frame.y = frameY;
    frame.fills = [{ type: "SOLID", color: white }];
    frame.strokes = [{ type: "SOLID", color: borderGray }];
    frame.strokeWeight = 1.5;
    frame.cornerRadius = 12;
    frame.layoutMode = "VERTICAL";
    frame.itemSpacing = 12;
    frame.paddingTop = 16;
    frame.paddingBottom = 16;
    frame.paddingLeft = 16;
    frame.paddingRight = 16;

    // Header badge
    const badge = figma.createText();
    badge.characters = `${s.route} • ${s.role}`;
    badge.fontSize = 11;
    badge.fontName = { family: "Inter", style: "Bold" };
    badge.fills = [{ type: "SOLID", color: blue }];
    frame.appendChild(badge);

    // Elements inside screen
    for (const el of s.elements) {
      if (el.type === "header") {
        const t = figma.createText();
        t.characters = el.text;
        t.fontSize = 16;
        t.fontName = { family: "Inter", style: "Bold" };
        t.fills = [{ type: "SOLID", color: black }];
        frame.appendChild(t);
      } else if (el.type === "hero") {
        const hCard = figma.createFrame();
        hCard.layoutMode = "VERTICAL";
        hCard.itemSpacing = 4;
        hCard.fills = [{ type: "SOLID", color: grayBg }];
        hCard.cornerRadius = 8;
        hCard.paddingTop = 10;
        hCard.paddingBottom = 10;
        hCard.paddingLeft = 10;
        hCard.paddingRight = 10;
        hCard.resize(358, 60);

        const ht = figma.createText();
        ht.characters = el.title;
        ht.fontSize = 13;
        ht.fontName = { family: "Inter", style: "Bold" };
        hCard.appendChild(ht);

        const hs = figma.createText();
        hs.characters = el.sub;
        hs.fontSize = 11;
        hs.fontName = { family: "Inter", style: "Regular" };
        hs.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
        hCard.appendChild(hs);

        frame.appendChild(hCard);
      } else if (el.type === "input") {
        const inp = figma.createFrame();
        inp.layoutMode = "VERTICAL";
        inp.itemSpacing = 2;
        inp.fills = [{ type: "SOLID", color: white }];
        inp.strokes = [{ type: "SOLID", color: borderGray }];
        inp.strokeWeight = 1;
        inp.cornerRadius = 8;
        inp.paddingTop = 8;
        inp.paddingBottom = 8;
        inp.paddingLeft = 10;
        inp.paddingRight = 10;
        inp.resize(358, 50);

        const lbl = figma.createText();
        lbl.characters = el.label;
        lbl.fontSize = 10;
        lbl.fontName = { family: "Inter", style: "Bold" };
        lbl.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
        inp.appendChild(lbl);

        const val = figma.createText();
        val.characters = el.value;
        val.fontSize = 11;
        val.fontName = { family: "Inter", style: "Medium" };
        val.fills = [{ type: "SOLID", color: black }];
        inp.appendChild(val);

        frame.appendChild(inp);
      } else if (el.type === "button") {
        const btn = figma.createFrame();
        btn.layoutMode = "HORIZONTAL";
        btn.primaryAxisAlignItems = "CENTER";
        btn.counterAxisAlignItems = "CENTER";
        btn.fills = [{ type: "SOLID", color: el.bg }];
        btn.cornerRadius = 8;
        btn.resize(358, 42);

        const bt = figma.createText();
        bt.characters = el.text;
        bt.fontSize = 13;
        bt.fontName = { family: "Inter", style: "Bold" };
        bt.fills = [{ type: "SOLID", color: el.fg }];
        btn.appendChild(bt);

        frame.appendChild(btn);
      } else if (el.type === "card") {
        const cd = figma.createFrame();
        cd.layoutMode = "VERTICAL";
        cd.itemSpacing = 4;
        cd.fills = [{ type: "SOLID", color: grayBg }];
        cd.cornerRadius = 8;
        cd.paddingTop = 10;
        cd.paddingBottom = 10;
        cd.paddingLeft = 10;
        cd.paddingRight = 10;
        cd.resize(358, 70);

        const ct = figma.createText();
        ct.characters = el.title;
        ct.fontSize = 12;
        ct.fontName = { family: "Inter", style: "Bold" };
        cd.appendChild(ct);

        if (el.price) {
          const cp = figma.createText();
          cp.characters = `Valor: ${el.price}`;
          cp.fontSize = 13;
          cp.fontName = { family: "Inter", style: "Bold" };
          cp.fills = [{ type: "SOLID", color: emerald }];
          cd.appendChild(cp);
        }

        if (el.driver) {
          const cdriv = figma.createText();
          cdriv.characters = el.driver;
          cdriv.fontSize = 11;
          cdriv.fontName = { family: "Inter", style: "Medium" };
          cd.appendChild(cdriv);
        }

        frame.appendChild(cd);
      } else if (el.type === "chips") {
        const chipsFrame = figma.createFrame();
        chipsFrame.layoutMode = "HORIZONTAL";
        chipsFrame.itemSpacing = 6;
        chipsFrame.fills = [];
        chipsFrame.resize(358, 28);

        for (const chipText of el.list) {
          const ch = figma.createFrame();
          ch.layoutMode = "HORIZONTAL";
          ch.primaryAxisAlignItems = "CENTER";
          ch.fills = [{ type: "SOLID", color: grayBg }];
          ch.strokes = [{ type: "SOLID", color: borderGray }];
          ch.cornerRadius = 6;
          ch.paddingLeft = 8;
          ch.paddingRight = 8;
          ch.paddingTop = 4;
          ch.paddingBottom = 4;

          const cht = figma.createText();
          cht.characters = chipText;
          cht.fontSize = 10;
          cht.fontName = { family: "Inter", style: "Bold" };
          ch.appendChild(cht);

          chipsFrame.appendChild(ch);
        }
        frame.appendChild(chipsFrame);
      } else if (el.type === "section") {
        const sec = figma.createFrame();
        sec.layoutMode = "VERTICAL";
        sec.itemSpacing = 4;
        sec.fills = [];
        sec.resize(358, 60);

        const st = figma.createText();
        st.characters = el.title;
        st.fontSize = 11;
        st.fontName = { family: "Inter", style: "Bold" };
        sec.appendChild(st);

        for (const item of el.items) {
          const it = figma.createText();
          it.characters = `• ${item}`;
          it.fontSize = 10;
          it.fontName = { family: "Inter", style: "Regular" };
          it.fills = [{ type: "SOLID", color: { r: 0.3, g: 0.3, b: 0.3 } }];
          sec.appendChild(it);
        }
        frame.appendChild(sec);
      }
    }

    // Sticky Note: Backend Specs Card (Abaixo de cada tela)
    const specCard = figma.createFrame();
    specCard.name = `Specs Backend — ${s.title}`;
    specCard.resize(390, 180);
    specCard.x = frameX;
    specCard.y = frameY + 740;
    specCard.fills = [{ type: "SOLID", color: darkSlate }];
    specCard.cornerRadius = 8;
    specCard.paddingTop = 12;
    specCard.paddingBottom = 12;
    specCard.paddingLeft = 14;
    specCard.paddingRight = 14;
    specCard.layoutMode = "VERTICAL";
    specCard.itemSpacing = 6;

    const specTitle = figma.createText();
    specTitle.characters = "⚙️ VARIÁVEIS & BACKEND CONEXÃO";
    specTitle.fontSize = 11;
    specTitle.fontName = { family: "Inter", style: "Bold" };
    specTitle.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.8, b: 1 } }];
    specCard.appendChild(specTitle);

    const epText = figma.createText();
    epText.characters = `Endpoints:\n${s.backend.endpoints.map(e => `  → ${e}`).join("\n")}`;
    epText.fontSize = 10;
    epText.fontName = { family: "Inter", style: "Regular" };
    epText.fills = [{ type: "SOLID", color: { r: 0.3, g: 0.95, b: 0.6 } }];
    specCard.appendChild(epText);

    const stateText = figma.createText();
    stateText.characters = `State / Payloads:\n  [ ${s.backend.state.join(", ")} ]`;
    stateText.fontSize = 10;
    stateText.fontName = { family: "Inter", style: "Regular" };
    stateText.fills = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
    specCard.appendChild(stateText);

    const dbText = figma.createText();
    dbText.characters = `Tabelas DB: ${s.backend.db.join(", ")}`;
    dbText.fontSize = 10;
    dbText.fontName = { family: "Inter", style: "Bold" };
    dbText.fills = [{ type: "SOLID", color: purple }];
    specCard.appendChild(dbText);

    page.appendChild(frame);
    page.appendChild(specCard);

    screenNodes[s.id] = { frame, specCard, x: frameX, y: frameY };
  }

  // Draw Connectors / Arrows between Screens
  const flowConnections = [
    { from: "screen_home", to: "screen_buscar", color: blue, label: "Submeter Busca" },
    { from: "screen_buscar", to: "screen_viagem", color: blue, label: "Selecionar Card" },
    { from: "screen_viagem", to: "screen_pix", color: emerald, label: "Reservar / Pagar" },
    { from: "screen_home", to: "screen_publicar", color: amber, label: "Oferecer Viagem" },
    { from: "screen_publicar", to: "screen_minhas_viagens", color: amber, label: "Salvar Viagem" },
    { from: "screen_minhas_viagens", to: "screen_chat", color: blue, label: "Abrir Conversa" },
    { from: "screen_minhas_viagens", to: "screen_avaliar", color: amber, label: "Após Viagem" }
  ];

  for (const conn of flowConnections) {
    const start = screenNodes[conn.from];
    const end = screenNodes[conn.to];
    if (start && end) {
      try {
        const connector = figma.createConnector();
        connector.strokeWeight = 3;
        connector.strokes = [{ type: "SOLID", color: conn.color }];
        connector.connectorStart = { endpointNodeId: start.frame.id, position: { x: 1, y: 0.4 } };
        connector.connectorEnd = { endpointNodeId: end.frame.id, position: { x: 0, y: 0.4 } };
        connector.connectorStartStrokeCap = "NONE";
        connector.connectorEndStrokeCap = "TRIANGLE_FILLED";
        page.appendChild(connector);
      } catch (e) {
        // Fallback Vector Line if FigJam connector is not enabled
        const line = figma.createVector();
        line.name = `Rota: ${conn.label}`;
        line.vectorPaths = [{
          windingRule: "NONE",
          data: `M ${start.x + 390} ${start.y + 200} L ${end.x} ${end.y + 200}`
        }];
        line.strokes = [{ type: "SOLID", color: conn.color }];
        line.strokeWeight = 3;
        page.appendChild(line);
      }
    }
  }

  figma.notify("✅ 11 Telas, Setas de Rotas e Backend Specs criados com sucesso no seu Figma!");
  figma.closePlugin();
}

run();
