# Cooperativa — Viagens Compartilhadas

> **Plataforma de viagens intermunicipais e interestaduais compartilhadas com foco no interior do Nordeste brasileiro.**  
> Conecta passageiros e motoristas cooperados com máxima segurança, economia real, pagamento facilitado via PIX e uma experiência digital acessível para todos os níveis de letramento tecnológico.

---

## 📌 O Desafio da Mobilidade no Interior do Nordeste

No interior do Nordeste brasileiro, milhões de pessoas enfrentam diariamente a escassez de linhas regulares de transporte, passagens rodoviárias com preços elevados e horários inflexíveis. A dependência de transportes informais desregulados gera insegurança, incerteza de horários e falta de transparência financeira.

O **Cooperativa** foi desenvolvido especificamente para transformar essa realidade:
- **Conexão Real entre Cidades e Polos**: Integra capitais, cidades polo e pequenos municípios do interior (como Fortaleza, Juazeiro do Norte, Sobral, Quixadá, Crateús, Recife, Caruaru, Petrolina, Garanhuns, Salvador, Feira de Santana, Vitória da Conquista, João Pessoa, Campina Grande, Patos, Sousa, Natal, Mossoró, Caicó, Maceió, Arapiraca, São Luís, Imperatriz, Teresina, Parnaíba, Picos, Aracaju e Itabaiana).
- **Garantia de Vaga com Custódia Segura**: O passageiro reserva sua vaga com antecedência pagando um sinal via PIX retido em custódia segura pela cooperativa, e acerta o restante diretamente no momento da viagem.
- **Renda Justa e Direta para Condutores Locais**: Motoristas do interior monetizam assentos ociosos em trajetos que já fariam, recebendo repasses diretamente em suas chaves PIX.
- **Inclusão Digital Absoluta**: Interface simples, direta e intuitiva, pensada para que qualquer pessoa, independente do nível de familiaridade com tecnologia, consiga pesquisar, reservar, pagar e viajar sem dificuldades.

---

## 🛠️ Stack Tecnológica

A aplicação adota uma arquitetura **Vanilla JavaScript ES6+ Pura (Zero-Build)**, permitindo alta performance e execução instantânea:

* **Core Frontend**: Vanilla JavaScript (ES6+ Modules & SPA Hash Routing).
* **Gerenciamento de Estado**: Centralizado e reativo (`Store` com persistência local).
* **Estilização**: Tailwind CSS (Utility-First) + CSS Customizado (`style.css`).
* **Design System**: Monochrome Transit Kiosk (Alto contraste, preto `#000000`, branco `#FFFFFF`, cinzas neutros).
* **Tipografia**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts).
* **Ícones**: [Google Material Symbols](https://fonts.google.com/icons) (Ícones profissionais em SVG).
* **Motor Gráfico de Veículos**: `assets/vehicles/templates.js` (Renderização de veículos vetorizados com cores customizadas de fábrica).
* **Deploy & Hospedagem**: Vercel / Static Web Hosting.

---

## 📱 Mapeamento de Telas e Módulos

| Rota SPA | Módulo | Descrição |
| :--- | :--- | :--- |
| `#/` | **Home & Hero Transit** | Busca rápida de viagens, destaques de rotas nordestinas, estatísticas de impacto e vantagens. |
| `#/buscar` | **Busca e Resultados** | Listagem filtrada por horário, ar-condicionado, bagagem e visualização gráfica dos veículos. |
| `#/viagem/:id` | **Detalhes da Viagem** | Itinerário completo com paradas, perfil do condutor, comodidades, valores e reserva. |
| `Overlay` | **Modal PIX Dinâmico** | QR Code gerado, código Copia e Cola, temporizador regressivo e confirmação de pagamento. |
| `#/motorista/:id` | **Perfil do Condutor** | Reputação por estrelas, selo de verificação, total de viagens completadas, frota e avaliações. |
| `#/minhas-viagens` | **Minhas Viagens / Plataforma** | Gestão de reservas do passageiro, controle de saídas do motorista e painel administrativo com busca por CPF. |
| `#/publicar` | **Publicar Viagem** | Assistente passo a passo com estimativas inteligentes de valores, paradas e viagem de volta. |
| `#/chat/:rideId` | **Chat em Tempo Real** | Comunicação direta e instantânea entre condutor e passageiros da viagem. |
| `#/avaliar/:rideId` | **Avaliação Pós-Viagem** | Seleção de 1 a 5 estrelas, tags de elogio rápido e comentário. |
| `#/perfil` | **Meu Perfil & Garagem** | Edição cadastral, chave PIX e gerenciamento de múltiplos veículos com regras de viagem. |
| `#/admin` | **Painel de Gestão** | Credenciamento de motoristas, custódia financeira e configuração interligada de taxas e estornos. |

---

## 📂 Estrutura do Projeto

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
├── REQUISITOS_FUNCIONAIS_E_NAO_FUNCIONAIS.md # Matriz de requisitos e status
├── cooperativa_figma_artboards.svg  # Artboards completos em SVG para design
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
