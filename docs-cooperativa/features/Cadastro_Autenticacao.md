# Funcionalidade: Cadastro e Autenticação

Fluxo de onboarding, solicitação de acesso de motoristas e controle de credenciais.

---

## Regras de Negócio e Requisitos

- **RF-AUT-01 / RN-01**: Motorista solicita autorização antes de ter acesso liberado.
- **RF-AUT-02 / RN-02**: Cadastro exige nome, WhatsApp e e-mail validado.
- **RF-AUT-03 / RN-03**: Administrador analisa na fila de aprovação e aprova ou rejeita com motivo.
- **RF-AUT-04 / RN-04**: Motorista aprovado recebe credencial / senha provisória por e-mail.
- **RF-AUT-05 / RN-05**: Primeiro acesso força a troca imediata de senha provisória.

---

## Componentes de Interface (BlaBlaCar Style)

1. **Modal / Página de Login**: Input limpo para e-mail/senha com links para recuperação e cadastro.
2. **Formulário de Solicitação do Motorista**:
   - Etapa 1: Dados pessoais (Nome completo, WhatsApp com máscara brasileira, E-mail corporativo/pessoal).
   - Etapa 2: Confirmação de código de 6 dígitos enviado por e-mail.
   - Etapa 3: Dados do veículo (Placa, UF, Modelo, Ano, RENAVAM, Ar-condicionado, USB, Tomada).
3. **Tela de Status da Análise**: Feedback visual (status: *Em análise pelo time de administração*).
4. **Tela de Primeiro Acesso**: Formulário de redefinição de senha com validação de força.

---

## Links Relacionados
- [[MOC_Regras_Negocio]]: Tabela de RNs e status de usuário.
- [[MOC_Perfis_Permissoes]]: Papéis e permissões.
- [[Sprint_02_Autenticacao_Perfis]]: Detalhamento das tarefas de frontend.
- [[MOC_Geral]]: Retorno ao índice geral.
