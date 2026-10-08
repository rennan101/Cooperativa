# Design System & Usabilidade (Inclusão Digital & BlaBlaCar)

Guia de componentes e identidade visual para a plataforma de viagens compartilhadas profissionais. O design combina a clareza e eficiência do **BlaBlaCar** com as **10 Heurísticas de Usabilidade de Jakob Nielsen**, priorizando usuários com baixo letramento tecnológico.

---

## Diretrizes Fundamentais de Design

- **SEM EMOJIS**: Uso exclusivo de ícones SVG profissionais do Google Material Symbols.
- **SEM PÍLULAS (NO PILLS)**: Proibido o uso de botões, tags ou elementos ovais comprimidos (`rounded-full`). Adotar bordas limpas retangulares com cantos estruturados suaves (`rounded-md` / `rounded-lg` entre 6px e 8px).
- **ALTO CONTRASTE E TIPOGRAFIA GENEROSA**: Textos em tamanhos confortáveis para leitura (mínimo de 16px para textos corridos, 20px+ para títulos), contraste WCAG AAA.

---

## Aplicação das 10 Heurísticas de Nielsen para Inclusão Digital

1. **Visibilidade do Status**: Indicadores claros de progresso e estado em todas as etapas (ex.: "Etapa 1 de 3", "Pagamento aprovado").
2. **Linguagem Natural e Cotidiana**: Termos como "Onde você está?", "Para onde vai?", "Quantas pessoas vão?", sem termos técnicos como "origem/destino geocodificado" ou "payload".
3. **Liberdade de Ação**: Botões claros de "Voltar" e "Cancelar" sempre visíveis no topo ou rodapé.
4. **Consistência Visual**: Botões primários sempre em Azul BlaBlaCar (`#0088CC` / `#00AFF5`) e com formato retangular padrão.
5. **Prevenção Ativa de Erros**: Desabilitação visual com explicação clara para opções inválidas (ex.: horários com menos de 2h de antecedência).
6. **Reconhecimento Imediato**: Resumo visual da viagem (horário, partida, chegada e preço) sempre fixo no topo durante a reserva.
7. **Simplicidade de Fluxos**: Telas focadas com poucos campos por etapa para evitar sobrecarga cognitiva.
8. **Minimalismo e Limpeza**: Espaço em branco generoso, eliminação de menus secundários confusos.
9. **Mensagens de Ajuda Humanizadas**: Em vez de "Erro 422: Campo inválido", exibir "Por favor, digite seu número de WhatsApp com o DDD (ex: 11 99999-9999)".
10. **Instruções Guiadas Visíveis**: Dicas curtas e explicativas ao lado de botões importantes como "Como pagar via PIX".

---

## Paleta de Cores Acessível

| Nome | Hex | Aplicação Principal |
| :--- | :--- | :--- |
| **Primary (BlaBla Blue)** | `#0088CC` / `#00AFF5` | Botões de ação principal, busca, destaques de rota |
| **Primary Dark (Navy)** | `#054752` | Tipografia de títulos e cabeçalho |
| **Secondary (Cooperativa Green)** | `#008744` | Confirmação de pagamento e selo de associado |
| **Background Neutral** | `#F8FAFC` / `#FFFFFF` | Fundo limpo e cartões de conteúdo |
| **Borders & Dividers** | `#CBD5E1` | Linhas nítidas com bom contraste |
| **Text Primary** | `#0F172A` | Texto de alto contraste e legibilidade |
| **Text Muted** | `#475569` | Textos secundários explicativos |

---

## Links Relacionados
- [[MOC_Frontend]]: Integração no ecossistema de telas.
- [[Sprint_01_DesignSystem_Fundacao]]: Sprint de construção dos componentes.
- [[MOC_Geral]]: Retorno ao índice geral.
