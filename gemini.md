# Diretrizes do Projeto - Cooperativa (Viagens Compartilhadas)

## Regra Estrita de Identidade Visual e Ícones

- **PROIBIDO O USO DE EMOJIS**: É terminantemente proibido utilizar emojis (ex.: 🚗, 📅, 👥, ⭐, etc.) na interface gráfica, componentes, textos de exibição ou código da aplicação.
- **USO EXCLUSIVO DE ÍCONES GOOGLE (MATERIAL SYMBOLS / ICONS)**:
  - Utilize exclusivamente ícones profissionais SVG do Google Icons ([Google Fonts Icons](https://fonts.google.com/icons)) ou a biblioteca oficial `@google-symbols` / classes `material-symbols-outlined` / SVGs extraídos do Google Material Symbols.
  - Exemplos de mapeamento:
    - Origem / Destino / Localização: `pin_drop`, `location_on`, `trip_origin`
    - Calendário / Horário: `calendar_today`, `schedule`, `access_time`
    - Vagas / Assentos: `airline_seat_recline_normal`, `person`, `group`
    - Preço / Pagamento: `payments`, `qr_code_2`, `receipt_long`
    - Reputação: `star`, `star_half`, `verified`
    - Veículo: `directions_car`, `ac_unit`, `usb`
    - Notificações: `notifications`, `chat`, `send`
    - Cooperativa: `shield`, `verified_user`, `diversity_3`

## Regra de Componentes e Formas de UI

- **PROIBIDO O USO DE PÍLULAS (PILLS)**: Não utilizar botões, tags, badges ou inputs em formato de pílula (`rounded-full` / formato oval comprimido). 
- **PADRÃO DE BORDAS E SUPERFÍCIES**: Utilizar cantos suavemente arredondados estruturados e convencionais (`rounded-md` / `rounded-lg`, ex.: 6px a 8px), botões retangulares bem definidos e cartões legíveis que transmitam clareza e solidez visual.

## Usabilidade e Inclusão Digital (10 Heurísticas de Jakob Nielsen)

O aplicativo é projetado para máxima acessibilidade cognitiva e simplicidade, permitindo que pessoas com **baixo ou nenhum letramento tecnológico** consigam realizar todas as ações (buscar, reservar, pagar e publicar) com total autonomia:

1. **Visibilidade do status do sistema**: Sempre informar claramente o que está acontecendo (ex.: "Pagamento confirmado", "Aguardando aprovação", "3 vagas restantes").
2. **Correspondência entre o sistema e o mundo real**: Usar linguagem direta, humana e cotidiana brasileira, sem termos técnicos (ex.: usar "Carona" ou "Viagem", "Valor por pessoa", "Ponto de encontro").
3. **Controle do usuário e liberdade**: Botões explícitos de "Voltar", "Cancelar" e confirmações antes de ações irreversíveis, sem prender o usuário em fluxos confusos.
4. **Consistência e padrões**: Padrões visuais e de navegação previsíveis e familiares em todas as telas.
5. **Prevenção de erros**: Validações amigáveis antes do envio, bloqueios preventivos explicados claramente (ex.: aviso preventivo de antecedência de 2 horas).
6. **Reconhecimento em vez de memorização**: Informações cruciais (horário, origem, destino, valor) sempre visíveis na tela sem exigir que o usuário memorize passos anteriores.
7. **Flexibilidade e eficiência**: Fluxos diretos e guiados passo a passo (Step-by-Step com 1 pergunta/ação por tela quando necessário).
8. **Design estético e minimalista**: Layout ultra limpo, sem poluição visual, sem distrações, com alto contraste e tipografia grande e legível.
9. **Apoio para reconhecer, diagnosticar e recuperar-se de erros**: Mensagens de erro claras, humanas e que indicam exatamente como corrigir (ex.: "Digite o número do seu celular com DDD").
10. **Ajuda e documentação acessível**: Instruções contextuais curtas, visíveis e fáceis de ler logo acima ou abaixo dos campos de ação.

## Diretrizes de Código e Escrita
- Seguir o padrão de escrita sem jargões desnecessários (direto, voz ativa, fatos concretos).
- Arquitetura modular (componentes < 300 linhas, separação estrita de UI e lógica).
