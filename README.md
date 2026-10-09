# Cooperativa — Viagens Compartilhadas

> **Plataforma de viagens intermunicipais e interestaduais compartilhadas com foco no Nordeste brasileiro.**  
> Conecta passageiros e motoristas cooperados com máxima segurança, economia real, pagamento facilitado via PIX e uma experiência digital acessível para todos os níveis de letramento tecnológico.

---

## 📌 Sobre o Projeto

O **Cooperativa** nasceu para resolver o desafio de mobilidade e transporte regional no Nordeste (ligando capitais a cidades polo como Fortaleza, Juazeiro do Norte, Sobral, Recife, Caruaru, Petrolina, Salvador, Feira de Santana, Natal, Mossoró e outras).

### Principais Diferenciais:
1. **Confiança e Segurança Comunitária**: Motoristas verificados com histórico de viagens, avaliações mútuas e veículos validados.
2. **Modelo Financeiro Justo**: Sinal de 50% pago via PIX na reserva para garantir o assento, com os 50% restantes pagos diretamente na chegada.
3. **Taxa de Manutenção Reduzida**: Cobrança transparente de apenas 5% de taxa de serviço para sustentabilidade da cooperativa.
4. **Política Clara de Cancelamento**: Estorno automático de 100% do valor para cancelamentos com mais de 2 horas de antecedência (ou 50% se inferior a 2 horas).
5. **Inclusão Digital & Alta Acessibilidade**: Interface baseada nas **10 Heurísticas de Jakob Nielsen**, com linguagem direta, fontes legíveis e sem jargões técnicos.

---

## 🛠️ Stack Tecnológica Atual

A aplicação adota uma arquitetura **Vanilla JavaScript ES6+ Pura (Zero-Build)**, permitindo execução instantânea sem necessidade de etapas pesadas de compilação ou dependências desnecessárias:

* **Core Frontend**: Vanilla JavaScript (ES6+ Modules & SPA Hash Routing).
* **Gerenciamento de Estado**: Reativo em memória (`Store` centralizada com suporte a persistência local).
* **Estilização & Design**: Tailwind CSS (Utility-First) + CSS Customizado (`style.css`).
* **Design System**: *Uber Monochrome Transit Kiosk* (Alto contraste, preto `#000000`, branco `#FFFFFF`, cinzas neutros).
* **Tipografia**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts).
* **Ícones**: [Google Material Symbols](https://fonts.google.com/icons) (Uso exclusivo de SVGs profissionais; **proibido o uso de emojis**).
* **Motor Gráfico de Veículos**: `assets/vehicles/templates.js` (Engine própria de renderização e interpolação de cores de fábrica em SVG).
* **Deploy & Hospedagem**: Vercel / Static Web Hosting.

---

## 📱 Mapeamento de Telas e Módulos

| Rota SPA | Módulo | Descrição |
| :--- | :--- | :--- |
| `#/` | **Home & Hero Transit** | Busca rápida de viagens, destaques de rotas nordestinas, estatísticas de impacto e vantagens. |
| `#/buscar` | **Busca e Resultados** | Listagem filtrada por horário (Manhã/Tarde/Noite), ar-condicionado, bagagem e exibição dinâmica dos carros. |
| `#/viagem/:id` | **Detalhes da Viagem** | Itinerário completo com paradas, perfil do condutor, comodidades, breakdown de custos e botão de reserva. |
| `Overlay` | **Modal PIX Dinâmico** | QR Code gerado, código Copia e Cola, temporizador regressivo de 10 minutos e confirmação de pagamento. |
| `#/motorista/:id` | **Perfil do Condutor** | Reputação por estrelas, selo de verificação, total de viagens completadas, frota e avaliações de passageiros. |
| `#/minhas-viagens` | **Minhas Viagens** | Painel dividido em visão Passageiro (reservas ativas/cancelamento com estorno) e Motorista (gestão de solicitações). |
| `#/publicar` | **Publicar Viagem** | Formulário inteligente com pontos de encontro, seleção de veículo da garagem e precificação sugerida por km. |
| `#/chat/:rideId` | **Chat em Tempo Real** | Comunicação direta e instantânea entre condutor e passageiros da viagem. |
| `#/avaliar/:rideId` | **Avaliação Pós-Viagem** | Seleção de 1 a 5 estrelas, tags de elogio rápido (Pontualidade, Condução Segura, Conforto) e comentário. |
| `#/perfil` | **Meu Perfil & Garagem** | Edição cadastral, chave PIX para repasses e gerenciamento completo de veículos com swatches de cores. |
| `#/admin` | **Painel Administrativo** | Dashboard com GMV total bruto, receita da cooperativa (5%), fila de validação de CNH e auditoria de disputas. |

---

## 🎨 Diretrizes Estritas de Design e UX

1. **PROIBIDO O USO DE EMOJIS**: Toda a interface utiliza exclusivamente a biblioteca de ícones profissionais do Google (`material-symbols-outlined`).
2. **PROIBIDO O USO DE PÍLULAS (`rounded-full`)**: Botões, tags e inputs seguem estrutura retangular sólida e suavemente arredondada (`rounded-lg` / `rounded-xl` entre 6px e 12px).
3. **ACESSIBILIDADE COGNITIVA**:
   - Informações cruciais (horário, origem, destino, valor por pessoa) sempre visíveis.
   - Botões explícitos de "Voltar" e confirmações antes de ações destrutivas.
   - Mensagens de erro humanas que instruem exatamente como corrigir o problema.

---

## 📂 Estrutura de Diretórios

```
Cooperativa/
├── assets/
│   ├── vehicles/
│   │   └── templates.js             # Motor SVG de renderização de veículos coloridos
│   └── video/
│       └── homevideo.mp4            # Vídeo de fundo do hero
├── docs-cooperativa/
│   ├── BACKEND_INTEGRATION_SPEC.md  # Especificação técnica de endpoints e tabelas
│   ├── PRD_Plataforma_Viagens...    # Documento de Requisitos de Produto
│   ├── features/                    # Especificação detalhada de cada funcionalidade
│   └── sprints/                     # Planejamento ágil de entregas
├── figma-plugin/
│   ├── manifest.json                # Manifesto para importação nativa no Figma
│   └── code.js                      # Script gerador de telas e rotas
├── REQUISITOS_FUNCIONAIS_E_NAO_FUNCIONAIS.md # Matriz de requisitos e status
├── cooperativa_figma_artboards.svg  # Artboards completos em SVG para design
├── figma_flow_interactive_map.html  # Visualizador interativo de telas e rotas
├── index.html                       # Entry point da aplicação SPA
├── style.css                        # Folha de estilos customizada e animações
├── app.js                           # Lógica central da aplicação (Vanilla JS)
├── vercel.json                      # Configuração de rotas de deploy na Vercel
└── README.md                        # Documentação principal
```

---

## 🚀 Como Executar Localmente

Como o projeto é construído em **Vanilla JavaScript Zero-Build**, não é necessária nenhuma instalação de dependências ou processo de compilação:

### Opção 1: Usando qualquer servidor estático local (Python / Node / Live Server)
```bash
# Com Python 3
python3 -m http.server 3000

# Ou com Node.js (npx serve)
npx serve .
```

Abra seu navegador em: `http://localhost:3000`

---

## 🗺️ Requisitos & Roadmap de Produção

Consulte o documento completo com o levantamento detalhado de requisitos funcionais e não funcionais, itens implementados e pendências de backend:

📄 **[REQUISITOS_FUNCIONAIS_E_NAO_FUNCIONAIS.md](REQUISITOS_FUNCIONAIS_E_NAO_FUNCIONAIS.md)**

---

## 📄 Licença

Projeto desenvolvido para a **Cooperativa de Viagens Compartilhadas**. Todos os direitos reservados.
