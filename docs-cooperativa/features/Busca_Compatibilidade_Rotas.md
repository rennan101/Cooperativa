# Funcionalidade: Busca e Compatibilidade de Rotas

Mecanismo de busca e recomendação de viagens baseado no trajeto real, inspirado na experiência central do BlaBlaCar.

---

## Regras de Negócio e Algoritmo

- **RN-09**: Busca compatibiliza passageiros pelo trajeto real do motorista, considerando direção e proximidade geométrica.
- **RN-10**: O sistema bloqueia recomendações automáticas que exijam desvios incompatíveis de tempo ou distância.
- **Parametrização**: Tolerância máxima de desvio em km ou minutos é configurável pelo administrador.

---

## Interface e Experiência do Usuário (BlaBlaCar UX)

1. **Barra de Busca Flutuante (Header / Hero)**:
   - Entrada de Origem com detecção de geolocalização ou texto preditivo.
   - Entrada de Destino.
   - Calendário com seletor de data.
   - Seletor de número de assentos necessários.
2. **Listagem de Resultados com Filtros**:
   - Ordenação: Mais cedo, Menor preço, Menor tempo de desvio, Melhor reputação do motorista.
   - Filtros laterais: Faixa de horário (Manhã, Tarde, Noite), Comodidades (Ar-condicionado, Carro elétrico, USB), Badges de cooperado.
3. **Card de Viagem (BlaBlaCar Style)**:
   - Timeline vertical com horários e pontos de encontro.
   - Preço individual destacado.
   - Foto do motorista com estrelas e badge de associado da cooperativa.

---

## Links Relacionados
- [[Design_System_BlaBlaCar]]: Componentes de `SearchBar` e `RideCard`.
- [[Publicacao_Viagem]]: Cadastro das rotas pelos motoristas.
- [[Sprint_03_Busca_Listagem]]: Sprint de construção da busca e listagem.
- [[MOC_Geral]]: Retorno ao índice geral.
