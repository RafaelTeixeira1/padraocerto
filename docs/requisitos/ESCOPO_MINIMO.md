# Escopo Mínimo do PadrãoCerto (MVP)

**Versão**: 1.0  
**Data**: 2026-05-19  
**Status**: Ativo  
**Autores**: Rafael Teixeira, Jhannyfer Biangulo  

---

## 1. Visão Geral

O **PadrãoCerto** é um sistema web para gerenciamento de inspeções e controle de qualidade em obras de construção civil. Esta documentação define o escopo funcional **mínimo viável (MVP)** para a primeira versão do sistema.

O objetivo é entregar um produto funcional que permite:
- Registrar e acompanhar inspeções de qualidade
- Executar checklists padronizados
- Gerar relatórios de conformidade
- Manter histórico de inspeções

Este documento serve como referência central para todas as 48 issues de desenvolvimento, garantindo que não haja scope creep e mantendo foco nas funcionalidades essenciais.

---

## 2. Funcionalidades Incluídas no MVP

### 2.1 Autenticação e Usuários
- **Cadastro de usuário**: Novo usuário pode se registrar com email e senha
- **Login**: Autenticação via sessão simples (sem OAuth)
- **Logout**: Encerrar sessão de forma segura
- **Recuperação de senha**: Simulada (gerar senha temporária)
- **Proteção de rotas**: Todas as páginas/APIs exigem autenticação

**Issues relacionadas**: #18, #19, #20, #21

---

### 2.2 Cadastro e Gerenciamento de Obras
- **Criar obra**: Nome, localização, responsável, data de início
- **Listar obras**: Visualizar todas as obras com filtro básico
- **Detalhes da obra**: Ver informações completas e histórico de inspeções
- **Editar obra**: Atualizar informações básicas
- **Excluir obra**: Remover obra (soft delete)

**Issues relacionadas**: #22, #23, #24

---

### 2.3 Modelos de Checklist
- **Criar modelo de checklist**: Template com itens pré-definidos
- **Itens do checklist**: Cada item tem descrição, tipo (conformidade, observação)
- **CRUD de modelos**: Criar, listar, editar, deletar modelos
- **Reutilização**: Modelos podem ser vinculados a várias obras

**Issues relacionadas**: #26, #27

---

### 2.4 Inspeções
- **Vincular checklist à obra**: Associar modelo de checklist com uma obra
- **Criar inspeção**: Iniciar nova inspeção (data, responsável)
- **Responder itens**: Marcar cada item como conforme/não conforme
- **Adicionar observações**: Campo opcional para cada item
- **Finalização com cálculo**: Sistema calcula automáticamente % de conformidade
- **Relatório de inspeção**: Visualizar resultado com indicadores
- **Histórico imutável**: Inspeções finalizadas não podem ser editadas

**Issues relacionadas**: #28, #30, #31, #32, #33, #35

---

### 2.5 Dashboard
- **Indicadores principais**: Total de obras, inspeções realizadas, taxa média de conformidade
- **Gráficos simples**: Barras/pizza com dados básicos
- **Últimas inspeções**: Listagem das 10 inspeções mais recentes
- **Filtros básicos**: Por obra, data, responsável

**Issues relacionadas**: #36, #37

---

### 2.6 Testes e Validação
- **Testes de fluxo**: Validar caminho completo do usuário (login → obra → inspeção → relatório)
- **Testes de integração**: Frontend ↔ Backend ↔ MySQL
- **Testes de conformidade**: Validar cálculos e regras de negócio

**Issues relacionadas**: #25, #29, #34, #38, #43

---

### 2.7 Documentação
- **Escopo mínimo**: Este documento
- **Referências visuais**: Prototipagem com imagens de telas
- **Estrutura e tecnologias**: Stack completo documentado
- **Execução com Docker**: Instruções passo a passo
- **Métricas**: Planilha de coleta de dados
- **Análise final**: Resultados e evidências

**Issues relacionadas**: #1-5, #44-48

---

## 3. Funcionalidades FORA do Escopo (V1)

As seguintes funcionalidades **NÃO** são implementadas nesta versão:

- ❌ Upload de fotos/evidências de inspeção
- ❌ Geração de PDF dinâmico de relatórios
- ❌ Exportação de dados (Excel, CSV)
- ❌ Integração com sistemas externos (SAP, ERP)
- ❌ Múltiplos níveis de usuários (admin, inspetor, engenheiro)
- ❌ Notificações por email/SMS
- ❌ API REST pública para terceiros
- ❌ Aplicativo mobile
- ❌ Multi-idioma/Internacionalização
- ❌ Auditoria e rastreamento de mudanças por usuário
- ❌ Agendamento de inspeções
- ❌ Comparação entre inspeções

**Nota**: Essas funcionalidades podem ser adicionadas em versões futuras (V2, V3) após análise de prioridade.

---

## 4. Limites Técnicos (Constraints)

### 4.1 Usuários e Dados
- **Máximo de usuários**: 100 usuários simultâneos
- **Máximo de obras**: 50 obras por sistema
- **Máximo de checklists**: 20 modelos de checklist
- **Máximo de itens por checklist**: 20 itens
- **Máximo de inspeções por obra**: 100 inspeções
- **Retenção de dados**: Sem limite (sem exclusão automática)

### 4.2 Performance
- **Tempo de resposta API**: < 500ms (requisições GET/POST)
- **Tempo de carregamento de página**: < 2s
- **Sem cache distribuído**: Cache local apenas (navegador + Redis básico)
- **Sem otimização para offline**: Requer internet sempre

### 4.3 Sessão
- **Duração da sessão**: 24 horas
- **Expiração automática**: Sim, com logout forçado
- **Multi-dispositivo**: Cada login cria nova sessão

### 4.4 Banco de Dados
- **Motor**: MySQL 8.0
- **Armazenamento**: Local (Docker volume)
- **Backup**: Manual apenas
- **Replicação**: Não suportada

---

## 5. Regras de Negócio Principais

### 5.1 Autenticação e Acesso
1. **Todo usuário deve estar autenticado** para acessar qualquer funcionalidade
2. **Senha mínima**: 6 caracteres (sem complexidade adicional no MVP)
3. **Sessão expirada**: Redirecionar para login
4. **Recuperação de senha**: Gerar senha temporária (sem email, exibir na tela)

### 5.2 Obras
1. **Obra sem checklist**: Não pode iniciar inspeção
2. **Obra vinculada a inspeção**: Não pode ser deletada (soft delete)
3. **Responsável obrigatório**: Toda obra precisa de usuário responsável

### 5.3 Modelos de Checklist
1. **Modelo mínimo**: Mínimo 3 itens obrigatório
2. **Item sem descrição**: Não pode salvar modelo
3. **Reutilização**: Modelo pode ser usado em múltiplas obras/inspeções

### 5.4 Inspeções - Validação
1. **Inspeção sem resposta completa**: Não pode finalizar
2. **Todos os itens devem ser respondidos**: Antes de finalização
3. **Observações opcionais**: Não bloqueiam finalização
4. **Uma inspeção por obra**: Apenas uma inspeção "em progresso" por obra (outras finalizadas)

### 5.5 Cálculo de Conformidade
```
% Conformidade = (Itens Conformes / Total de Itens) × 100

Exemplo:
- Total: 10 itens
- Conformes: 8 itens
- % Conformidade: 80%
- Status: ✅ Conforme (ou ⚠️ Não Conforme se < 70%)
```

### 5.6 Histórico e Imutabilidade
1. **Inspeção finalizada**: Não pode ser editada/deletada
2. **Histórico completo**: Todas as inspeções (finalizadas e canceladas) ficam visíveis
3. **Data e hora**: Registradas automaticamente no sistema
4. **Responsável**: Registrado quem executou a inspeção

### 5.7 Operacional
1. **Não há aprovação**: Inspeção finalizada fica registrada automaticamente
2. **Não há revisão**: Sem workflow de aprovação por gerente
3. **Não há notificações**: Sistema não envia avisos automáticos

---

## 6. Casos de Uso Principais (Happy Path)

### 6.1 Novo Usuário - Primeiro Acesso
```
1. Usuário acessa http://localhost:5173
2. Clica em "Cadastrar"
3. Preenche: Email, Senha, Nome
4. Clica em "Criar Conta"
5. Sistema cria usuário e faz login automático
6. Redireciona para dashboard (obra vazia)
```

### 6.2 Inspetor - Executar Inspeção
```
1. Inspetor faz login
2. Vê dashboard com obras
3. Clica em obra "Edifício Centro"
4. Seleciona checklist "Fundação - Fase 1"
5. Sistema cria inspeção com data/hora
6. Responde cada item:
   - Item 1: ✅ Conforme
   - Item 2: ❌ Não Conforme (observação: "Trinca no canto")
   - ...Item N: ✅ Conforme
7. Clica em "Finalizar Inspeção"
8. Sistema calcula: 85% de conformidade
9. Exibe relatório com status e gráfico
10. Inspeção fica imutável no histórico
```

### 6.3 Engenheiro - Analisar Inspeções
```
1. Engenheiro faz login
2. Vê dashboard com indicadores:
   - 12 obras registradas
   - 45 inspeções realizadas
   - Taxa média: 82% conformidade
3. Clica em obra para ver histórico completo
4. Analisa últimas 5 inspeções
5. Identifica padrões de não-conformidade
6. Toma decisões baseado nos dados
```

---

## 7. Referências Visuais

Prototipagem de telas disponível em `docs/ui/`:

| Tela | Arquivo | Descrição |
|---|---|---|
| Login | `login.png` | Autenticação - email + senha |
| Cadastro | `cadastroUsuari.png` | Novo usuário - email, senha, nome |
| Recuperar Senha | `recuperarSenha.png` | Resetar senha simulado |
| Nova Obra | `novaObra.png` | Formulário para criar obra |
| Listar Obras | (dashboard com lista) | Todas as obras do usuário |
| Detalhe Obra | `detalheObra.png` | Informações + histórico de inspeções |
| Novo Checklist | `novoChecklist.png` | Criar modelo de checklist |
| Vincular Checklist | `VincularChecklist.png` | Associar checklist com obra |
| Iniciar Inspeção | `inicioChecklist1.png`, `inicioChecklist2.png` | Começar inspeção |
| Responder Itens | `checklistRespondidoMaisNaoFinalizado.png` | Marcar conforme/não conforme |
| Finalizar | `checklistFinalizado1.png`, `checklistFinalizado2.png` | Relatório com resultado |
| Dashboard | `dashboard1.png`, `dashboard2.png` | Indicadores e gráficos |

---

## 8. Critérios de Conclusão (Definição de Pronto - DoD)

Uma issue é considerada **CONCLUÍDA** quando:

### 8.1 Desenvolvimento
- ✅ Código implementado conforme especificação
- ✅ Testes passando (manual ou automático)
- ✅ Sem console errors/warnings
- ✅ Integração frontend ↔ backend ↔ banco de dados funcionando
- ✅ Tratamento de erros básico implementado

### 8.2 Código
- ✅ Segue padrões do projeto (Vue 3 + Express.js)
- ✅ Variáveis e funções nomeadas claramente
- ✅ Sem código duplicado desnecessário
- ✅ Sem hardcoding (valores configuráveis)

### 8.3 Segurança
- ✅ Rotas protegidas por autenticação (onde aplicável)
- ✅ Entrada validada (no backend)
- ✅ Sem SQL injection
- ✅ Sem XSS

### 8.4 Testes
- ✅ Testado happy path no navegador
- ✅ Testado com Postman (se for API)
- ✅ Fluxo de erro tratado
- ✅ Dados persistem no banco (MySQL)

### 8.5 Documentação
- ✅ Descrição clara no commit
- ✅ Issue fechada com comentário de conclusão
- ✅ Métricas registradas (tempo gasto)

---

## 9. Roadmap de Entregas

| Milestone | Issues | Funcionalidades | Prazo |
|---|---|---|---|
| **M1: Estrutura & Docs** | #1-5 | Escopo, requisitos, métricas | Semana 1 |
| **M2: Frontend Base** | #6-13 | Telas estáticas, rotas, componentes | Semana 1-2 |
| **M3: Backend Base** | #14-17 | Banco de dados, models, migrations | Semana 1-2 |
| **M4: Autenticação** | #18-21 | Login, cadastro, logout | Semana 2 |
| **M5: Obras** | #22-25 | CRUD obras + testes | Semana 2-3 |
| **M6: Checklists** | #26-29 | CRUD checklists + testes | Semana 3 |
| **M7: Inspeções** | #30-34 | Criar, responder, finalizar + testes | Semana 3-4 |
| **M8: Dashboard** | #35-37 | Relatórios e gráficos | Semana 4 |
| **M9: Polimento** | #39-42 | Fixes, UI, refactoring | Semana 4 |
| **M10: Testes Finais** | #43 | Teste geral do sistema | Semana 4 |
| **M11: Documentação Final** | #44-48 | Docs, métricas, evidências | Semana 5 |

---

## 10. Métricas de Sucesso

Ao final do MVP, o sistema deve cumprir:

| Métrica | Target | Como Medir |
|---|---|---|
| **% de Issues Fechadas** | 100% | GitHub Issues |
| **Taxa de Retrabalho** | < 20% | Bugs / Total Issues |
| **Throughput Médio** | 2-3 issues/semana | GitHub Issues |
| **Lead Time Médio** | < 5 dias por issue | Datas no GitHub |
| **Taxa de Conformidade** | 100% (projeto) | Funcionalidades vs. Escopo |
| **Tempo de Resposta API** | < 500ms | Postman |
| **Taxa de Sucesso Testes** | 100% | Manual testing |

---

## 11. Glossário

| Termo | Definição |
|---|---|
| **Obra** | Projeto de construção civil que será inspecionado |
| **Checklist** | Modelo com itens padrão a inspecionar |
| **Inspeção** | Execução de checklist em uma obra (coleta de dados) |
| **Conforme** | Item que atende o padrão de qualidade |
| **Não Conforme** | Item que NÃO atende o padrão |
| **Conformidade (%)** | Taxa de itens conformes vs. total |
| **Relatório** | Resultado final da inspeção com indicadores |
| **MVP** | Produto viável mínimo (escopo deste documento) |

---

## 12. Próximas Etapas

1. **Validar escopo**: Discussão com stakeholders
2. **Criar issues relacionadas**: Issues #2-5 (docs), #6-48 (implementação)
3. **Priorizar issues**: Sequenciar por dependências
4. **Iniciar desenvolvimento**: Começar pelos pré-requisitos (docs, DB, frontend base)
5. **Registrar métricas**: Ativar planilha de coleta de horas
6. **Revisão semanal**: Acompanhar progresso vs. escopo

---

**Status**: Documento ativo - sujeito a revisão após feedback da equipe
