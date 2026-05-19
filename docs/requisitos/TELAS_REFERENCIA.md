# Telas de Referência - PadrãoCerto

**Versão**: 1.0  
**Data**: 2026-05-19  
**Status**: Ativo  

---

## Visão Geral

Este documento cataloga as **17 telas prototipadas** do PadrãoCerto, organizadas por fluxo de usuário. Cada tela serve como referência visual para a equipe de frontend na implementação.

Os protótipos foram desenvolvidos baseados no escopo definido em `ESCOPO_MINIMO.md`.

---

## 1. 🔐 Autenticação (3 telas)

### 1.1 Login
- **Arquivo**: `docs/ui/login.png`
- **Funcionalidade**: Acesso ao sistema com email e senha
- **Elementos**:
  - Campo email (validação)
  - Campo senha (mascarado)
  - Botão "Entrar"
  - Link "Esqueceu a senha?"
  - Link "Criar conta"
- **Fluxo**: Usuário → Email → Senha → Dashboard
- **Status**: Prototipado ✅

### 1.2 Cadastro de Usuário
- **Arquivo**: `docs/ui/cadastroUsuari.png`
- **Funcionalidade**: Registro de novo usuário
- **Elementos**:
  - Campo nome completo
  - Campo email
  - Campo senha (com confirmação)
  - Checkbox "Concordo com termos"
  - Botão "Criar Conta"
- **Fluxo**: Visitor → Email → Senha → Login automático
- **Status**: Prototipado ✅
- **Validações**:
  - Email único no sistema
  - Senha mínimo 6 caracteres
  - Campos obrigatórios

### 1.3 Recuperar Senha
- **Arquivo**: `docs/ui/recuperarSenha.png`
- **Funcionalidade**: Reset de senha (simulado)
- **Elementos**:
  - Campo email
  - Botão "Recuperar"
  - Exibição de senha temporária (na tela)
- **Fluxo**: Usuário → Email → Senha Temporária → Login
- **Status**: Prototipado ✅
- **Notas**: MVP não envia email; exibe senha na tela

---

## 2. 🏗️ Obras (3 telas)

### 2.1 Nova Obra
- **Arquivo**: `docs/ui/novaObra.png`
- **Funcionalidade**: Criar novo registro de obra
- **Elementos**:
  - Campo nome da obra
  - Campo localização/endereço
  - Campo responsável (dropdown de usuários)
  - Campo data de início
  - Campo descrição (opcional)
  - Botão "Criar Obra"
  - Botão "Cancelar"
- **Fluxo**: Dashboard → Novo → Preencer → Salvar
- **Status**: Prototipado ✅
- **Validações**:
  - Obra só pode ser criada por usuário autenticado
  - Nome obrigatório

### 2.2 Detalhe da Obra
- **Arquivo**: `docs/ui/detalheObra.png`
- **Funcionalidade**: Visualizar informações e histórico de uma obra
- **Elementos**:
  - Informações básicas (nome, local, responsável)
  - Status da obra (ativa/finalizada)
  - Lista de checklists vinculados
  - Histórico de inspeções (últimas 5)
  - Botão "Nova Inspeção"
  - Botão "Editar"
  - Botão "Deletar"
- **Fluxo**: Obras → Seleciona → Vê detalhes → Ações
- **Status**: Prototipado ✅

### 2.3 Detalhe Obra com Checklist Finalizado
- **Arquivo**: `docs/ui/DetalheObrasChecklistFinalizado.png`
- **Funcionalidade**: Visualizar resultado de inspeção finalizada
- **Elementos**:
  - Dados da obra
  - Status da inspeção (Finalizado ✅)
  - % de conformidade com cor (verde/amarelo/vermelho)
  - Data/hora da inspeção
  - Responsável pela inspeção
  - Detalhes dos itens conformes/não-conformes
  - Observações registradas
- **Fluxo**: Detalhe → Histórico → Ver resultado
- **Status**: Prototipado ✅

---

## 3. ✅ Modelos de Checklist (2 telas)

### 3.1 Novo Checklist (Modelo)
- **Arquivo**: `docs/ui/novoChecklist.png`
- **Funcionalidade**: Criar template de checklist reutilizável
- **Elementos**:
  - Campo nome do checklist
  - Campo descrição
  - Lista de itens (dinâmica):
    - Campo descrição item
    - Dropdown tipo (conformidade/observação)
    - Botão remover item
  - Botão "+ Adicionar Item"
  - Botão "Salvar Checklist"
  - Botão "Cancelar"
- **Fluxo**: Dashboard → Novo Checklist → Itens → Salvar
- **Status**: Prototipado ✅
- **Restrições**:
  - Mínimo 3 itens obrigatório
  - Nome obrigatório

### 3.2 Vincular Checklist à Obra
- **Arquivo**: `docs/ui/VincularChecklist.png`
- **Funcionalidade**: Associar modelo de checklist com obra
- **Elementos**:
  - Dropdown com lista de modelos
  - Visualização prévia (mostra itens)
  - Data de vencimento (opcional)
  - Botão "Vincular"
  - Botão "Cancelar"
  - Lista de checklists já vinculados
- **Fluxo**: Detalhe Obra → Vincular → Seleciona modelo → Confirma
- **Status**: Prototipado ✅

---

## 4. 📋 Execução de Inspeção (5 telas)

### 4.1 Iniciar Checklist (Tela 1)
- **Arquivo**: `docs/ui/inicioChecklist1.png`
- **Funcionalidade**: Começar inspeção de uma obra
- **Elementos**:
  - Obra selecionada (nome/local)
  - Checklist selecionado (nome/qtd itens)
  - Data e hora início (preenchida automaticamente)
  - Campo responsável (preenchido do usuário logado)
  - Botão "Iniciar Inspeção"
  - Botão "Voltar"
- **Fluxo**: Obra → Seleciona checklist → Inicia
- **Status**: Prototipado ✅

### 4.2 Iniciar Checklist (Tela 2)
- **Arquivo**: `docs/ui/inicioChecklist2.png`
- **Funcionalidade**: Confirmação antes de iniciar
- **Elementos**:
  - Resumo da inspeção
  - Obra e checklist
  - Número total de itens
  - Tempo estimado
  - Botão "Confirmar Início"
- **Status**: Prototipado ✅
- **Notas**: Pode ser integrada na mesma tela ou ser um modal

### 4.3 Respondendo Itens (Em Andamento)
- **Arquivo**: `docs/ui/checklistRespondidoMaisNaoFinalizado.png`
- **Funcionalidade**: Interface para responder cada item
- **Elementos**:
  - Barra de progresso (ex: 7 de 10)
  - Item atual com descrição
  - Botões rádio: ✅ Conforme / ❌ Não Conforme
  - Campo observações (opcional)
  - Botão "Próximo Item"
  - Botão "Item Anterior"
  - Botão "Salvar e Finalizar" (quando no último item)
- **Fluxo**: Item 1 → Item 2 → ... → Item N → Finalizar
- **Status**: Prototipado ✅
- **Validações**:
  - Não pode pular itens
  - Observações opcionais
  - Confirmar antes de finalizar

### 4.4 Checklist Finalizado (Tela 1)
- **Arquivo**: `docs/ui/checklistFinalizado1.png`
- **Funcionalidade**: Resultado da inspeção (parte 1)
- **Elementos**:
  - Status: ✅ INSPEÇÃO FINALIZADA
  - Data e hora finalização
  - Obra e checklist
  - % de conformidade (grande, com cor)
  - Indicador visual: Conforme / Não-Conforme / Atenção
- **Fluxo**: Último item → Finalizar → Resultado
- **Status**: Prototipado ✅

### 4.5 Checklist Finalizado (Tela 2)
- **Arquivo**: `docs/ui/checklistFinalizado2.png`
- **Funcionalidade**: Resultado da inspeção (detalhes)
- **Elementos**:
  - Resumo:
    - Total itens
    - Conformes (número e %)
    - Não-conformes (número e %)
  - Lista de itens respondidos (resumo)
  - Observações por item
  - Botão "Gerar Relatório"
  - Botão "Voltar ao Dashboard"
  - Botão "Nova Inspeção"
- **Status**: Prototipado ✅

---

## 5. 📊 Dashboard (2 telas)

### 5.1 Dashboard Principal (Visão Geral)
- **Arquivo**: `docs/ui/dashboard1.png`
- **Funcionalidade**: Indicadores principais do sistema
- **Elementos**:
  - Cards de indicadores:
    - Total de obras
    - Total de inspeções
    - Taxa média de conformidade
    - Últimas inspeções
  - Gráfico de conformidade (barras/pizza)
  - Listagem das 5 últimas inspeções
  - Botão "Nova Obra"
  - Botão "Novo Checklist"
- **Fluxo**: Login → Dashboard
- **Status**: Prototipado ✅
- **Atualização**: Em tempo real ou refresh manual

### 5.2 Dashboard Detalhes
- **Arquivo**: `docs/ui/dashboard2.png`
- **Funcionalidade**: Análise detalhada de inspeções
- **Elementos**:
  - Filtros:
    - Por obra
    - Por data (intervalo)
    - Por responsável
  - Gráficos detalhados:
    - Conformidade por obra
    - Tendência ao longo do tempo
    - Top não-conformidades
  - Tabela exportável (informação)
  - Botões de ação
- **Status**: Prototipado ✅

---

## 6. 🔄 Pós-Ações (1 tela)

### 6.1 Após Vincular Checklist
- **Arquivo**: `docs/ui/aposVincular.png`
- **Funcionalidade**: Confirmação de vínculo criado
- **Elementos**:
  - Mensagem de sucesso
  - Obra e checklist vinculado
  - Sugestões de próximas ações:
    - Iniciar inspeção agora
    - Vincular outro checklist
    - Voltar à obra
- **Status**: Prototipado ✅

---

## 7. 📱 Considerações de Design

### Responsive Design
- **Desktop**: 1920x1080 mínimo
- **Tablet**: 768px de largura
- **Mobile**: Fora do escopo v1, mas telas devem ser preparadas

### Paleta de Cores (Sugerida baseada em prototipagem)
- **Verde**: Conforme ✅
- **Vermelho**: Não-conforme ❌
- **Amarelo**: Atenção ⚠️
- **Azul**: Informação ℹ️
- **Cinza**: Inativo/desabilitado

### Tipografia
- **Títulos**: Font-weight bold, 24-32px
- **Subtítulos**: Font-weight semi-bold, 18px
- **Corpo**: Font-weight normal, 14-16px
- **Rótulos**: Font-weight semi-bold, 12-14px

### Acessibilidade
- Contrastes adequados
- Labels em todos os campos
- Navegação por teclado
- Alt text em imagens

---

## 8. Mapeamento para Issues de Frontend

| Tela | Issue(s) | Componente Vue | Status |
|---|---|---|---|
| Login/Cadastro/Recuperar | #9, #19, #20, #21 | AuthLayout | Pendente |
| Nova Obra | #23 | CreateObra | Pendente |
| Detalhe Obra | #24 | ObraDetail | Pendente |
| Novo Checklist | #26 | CreateChecklist | Pendente |
| Vincular | #28 | VincularChecklist | Pendente |
| Iniciar Inspeção | #30 | IniciarChecklist | Pendente |
| Respondendo | #31 | ResponderItens | Pendente |
| Resultado | #33, #35 | ResultadoInspecao | Pendente |
| Dashboard | #36, #37 | DashboardMain | Pendente |

---

## 9. Links de Referência

- **Escopo**: Ver `ESCOPO_MINIMO.md` para funcionalidades incluídas
- **Critérios de pronto**: Ver `CRITERIOS_PRONTO.md` para validação
- **Imagens**: Todas em `docs/ui/`
- **API esperada**: Será documentada ao implementar backend

---

## 10. Próximas Etapas

1. ✅ Telas organizadas (este documento)
2. ⏳ Frontend: Implementar componentes Vue baseado neste catálogo
3. ⏳ Backend: Criar API REST para suportar fluxos
4. ⏳ Testes: Validar UI/UX com usuários
5. ⏳ Refinamento: Ajustes baseado em feedback

---

**Status**: Documento ativo - referência visual para desenvolvimento
