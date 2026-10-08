# Sprint 02 - Autenticação, Onboarding e Perfis

**Objetivo da Sprint**: Implementar os fluxos de login, solicitação de acesso para motoristas, validação de e-mail e gestão de perfil/veículo.

---

## Tarefas de Desenvolvimento

1. **Autenticação**:
   - Tela de login com validação de campos.
   - Tela de primeiro acesso para troca de senha provisória (**RN-05**).
   - Tela de recuperação de senha.

2. **Fluxo de Solicitação do Motorista ([[Cadastro_Autenticacao]])**:
   - Formulário em etapas: dados pessoais (Nome, WhatsApp, E-mail) -> código de verificação -> veículo.
   - Cadastro de dados do veículo (Placa, UF, Ano, Marca, Modelo, RENAVAM, Recursos: Ar, USB).
   - Tela de feedback de análise pendente (**RN-01**, **RN-03**).

3. **Telas de Perfil**:
   - Perfil do motorista (Bio, indicadores, status cooperativa, lista de veículos).
   - Perfil do passageiro (Dados de contato, chave PIX para estornos).

---

## Critérios de Aceite
- [ ] Validação de e-mail implementada (**RN-02**).
- [ ] Bloqueio de acesso a motoristas não aprovados.
- [ ] Troca obrigatória de senha provisória (**RN-05**).

---

## Links Relacionados
- [[Cadastro_Autenticacao]]: Regras e fluxo completo.
- [[MOC_Perfis_Permissoes]]: Matriz de permissões.
- [[Sprint_03_Busca_Listagem]]: Próxima sprint.
