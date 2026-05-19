# Coleta de Métricas de Software - PadrãoCerto

**Versão**: 1.0  
**Data**: 2026-05-19  
**Status**: Ativo  

---

## Visão Geral

Este documento descreve como usar a **planilha de coleta de métricas** para acompanhar o desenvolvimento do PadrãoCerto.

As métricas são coletadas **semanalmente** e servem para:
- ✅ Medir produtividade da equipe
- ✅ Identificar gargalos e problemas
- ✅ Comparar planejado vs. realizado
- ✅ Atender requisitos da disciplina de Métricas de Software

---

## 1. 📋 Métricas Coletadas

### 1.1 TRABALHO (Dimensão)
**O que medir**: Tamanho do projeto em funcionalidades

| Métrica | Descrição | Frequência | Responsável |
|---|---|---|---|
| **Total de Issues** | Quantidade total de issues no projeto | Semanal | Rafael |
| **Issues Abertas** | Issues no backlog (não iniciadas) | Semanal | Rafael |
| **Issues em Andamento** | Issues sendo desenvolvidas | Semanal | Rafael |
| **Issues Concluídas** | Issues finalizadas e fechadas | Semanal | Rafael |

---

### 1.2 ESFORÇO (Dimensão)
**O que medir**: Tempo investido pela equipe

| Métrica | Descrição | Frequência | Responsável |
|---|---|---|---|
| **Homem-hora (HH)** | Total de horas trabalhadas por pessoa | Contínuo + consolidação semanal | Rafael + Jhannyfer |
| **Esforço Total** | Soma de todas as horas da semana | Semanal | Rafael |
| **Variação Esforço** | Esforço real vs. planejado | Semanal | Rafael |

---

### 1.3 PRAZO (Dimensão)
**O que medir**: Cumprimento de datas planejadas

| Métrica | Descrição | Frequência | Responsável |
|---|---|---|---|
| **% Issues Milestone** | % de issues concluídas dentro da milestone | Semanal | Rafael |
| **Lead Time Médio** | Tempo médio de abertura até fechamento | Semanal | Rafael |
| **Atrasos** | Número de issues atrasadas | Semanal | Rafael |

---

### 1.4 PRODUTIVIDADE (Dimensão)
**O que medir**: Velocidade de entrega

| Métrica | Descrição | Frequência | Responsável |
|---|---|---|---|
| **Throughput** | Issues concluídas por semana | Semanal | Jhannyfer/Rafael |
| **Produtividade por Esforço** | Issues / Total HH | Semanal | Rafael |
| **Velocity** | Trend de throughput ao longo do tempo | Bi-semanal | Rafael |

---

### 1.5 QUALIDADE (Dimensão)
**O que medir**: Erros e retrabalho

| Métrica | Descrição | Frequência | Responsável |
|---|---|---|---|
| **Taxa de Retrabalho** | % de issues que tiveram bugs/fixes | Semanal | Jhannyfer/Rafael |
| **Bugs Identificados** | Número de bugs encontrados por semana | Semanal | Jhannyfer/Rafael |
| **Issues Corrigidas** | Issues com label "fix" | Semanal | Rafael |

---

### 1.6 USABILIDADE, CONFIABILIDADE, DESEMPENHO (Dimensão)
**O que medir**: Qualidade do produto final

| Métrica | Descrição | Frequência | Responsável |
|---|---|---|---|
| **Tempo de Resposta API** | Latência média de requisições | Testes finais | Rafael |
| **Taxa Sucesso Operações** | % de operações que não falham | Testes finais | Jhannyfer |
| **Número de Falhas** | Erros encontrados em testes | Testes finais | Jhannyfer |

---

## 2. 📁 Planilhas de Coleta

### 2.1 ABA 1: Horas Trabalhadas (CONTÍNUO)

**Frequência**: Preenchimento diário/contínuo, revisão semanal

**Estrutura**:

```
Data        | Tarefa/Issue | Responsável | Horas | Descrição
2026-05-19  | #1          | Rafael      | 2.5   | Escopo mínimo
2026-05-19  | #2          | Jhannyfer   | 1.0   | Organizar telas
2026-05-20  | #2          | Jhannyfer   | 1.5   | Telas continuação
2026-05-20  | #4          | Rafael      | 1.0   | Critérios DoD
...
```

**Como preencher**:
- [ ] Cada pessoa registra suas horas diariamente
- [ ] Data do trabalho realizado
- [ ] Número da issue trabalhada
- [ ] Tempo gasto (em horas, com decimais)
  - 1h 30min = 1.5
  - 45min = 0.75
- [ ] Breve descrição do que foi feito

**Onde**: Google Sheets ou Excel

---

### 2.2 ABA 2: Issues (SEMANAL)

**Frequência**: Toda segunda-feira, consolidado da semana anterior

**Estrutura**:

```
Semana | De      | Até     | Total Issues | Abertas | Concluídas | Em Andamento | Retrabalho | Velocidade
1      | 19/05   | 25/05   | 48          | 45      | 3          | 2            | 0          | 3 issues/sem
2      | 26/05   | 01/06   | 48          | 40      | 8          | 5            | 1          | 8 issues/sem
```

**Como preencher**:
- [ ] Contar no GitHub quantas issues existem em cada coluna
- [ ] Total Issues = Abertas + Em Andamento + Concluídas
- [ ] Retrabalho = Issues que voltaram do "Concluído" para "Em Andamento"
- [ ] Velocidade = Concluídas da semana / 7 dias

**Fórmulas**:
```
Retrabalho % = (Retrabalho / Total) × 100
Velocidade = Concluídas / 7
```

---

### 2.3 ABA 3: Qualidade (SEMANAL)

**Frequência**: Toda segunda-feira

**Estrutura**:

```
Semana | Bugs Encontrados | Issues "Fix" | Taxa Retrabalho % | Lead Time Médio | Cycle Time Médio
1      | 0               | 0           | 0%               | -              | -
2      | 2               | 1           | 12.5%            | 3 dias         | 1 dia
```

**Como preencher**:
- [ ] Bugs Encontrados = Issues com label "bug" criadas na semana
- [ ] Issues "Fix" = Issues com label "fix" fechadas na semana
- [ ] Taxa Retrabalho = (Issues reabertos / Total Concluídos) × 100
- [ ] Lead Time = Data fechamento - Data abertura (em dias, média)
- [ ] Cycle Time = Apenas tempo em "Em Andamento" (sem tempo no backlog)

---

### 2.4 ABA 4: Desempenho (SEMANAL)

**Frequência**: Toda segunda-feira

**Estrutura**:

```
Semana | Throughput | Esforço Total HH | Produtividade (issues/HH) | Desvio Estimativa
1      | 3          | 12               | 0.25                     | +2h
2      | 8          | 20               | 0.40                     | -1h
```

**Como preencher**:
- [ ] Throughput = Issues concluídas na semana
- [ ] Esforço Total = Soma de todas as horas da semana
- [ ] Produtividade = Throughput / Esforço Total
- [ ] Desvio = Esforço Real - Esforço Planejado (positivo = ultrapassou)

---

### 2.5 ABA 5: Testes (QUANDO APLICÁVEL)

**Frequência**: Durante testes finais

**Estrutura**:

```
Data    | Teste              | Status | Bugs Encontrados | Observações
2026-06-15 | Login            | ✅ Pass | 0               | Sessão OK
2026-06-15 | Criar obra       | ✅ Pass | 0               | Validação OK
2026-06-16 | Dashboard        | ⚠️ Falhou | 2               | Gráfico não carregava
```

**Como preencher**:
- [ ] Data do teste
- [ ] Nome do teste (que funcionalidade testou)
- [ ] Status: ✅ Pass / ⚠️ Falhou
- [ ] Número de bugs encontrados
- [ ] Detalhes do bug ou observação

---

### 2.6 ABA 6: Análise (OPCIONAL - MENSAL)

**Frequência**: Fim do mês

**Estrutura**:

```
Período    | Total HH | Total Issues | Produtividade | Qualidade | Observações
Semana 1-2 | 32       | 11           | 0.34          | 91%       | Bom andamento
Semana 3-4 | 35       | 18           | 0.51          | 88%       | Aceleração
```

**Cálculos**:
```
Produtividade = Total Issues / Total HH
Qualidade = (Issues sem bugs × 100) / Total Issues
```

---

## 3. 🔍 Como Usar as Métricas

### 3.1 Análise Semanal
**Toda segunda-feira**:

1. [ ] Consolidar horas da semana anterior
2. [ ] Contar issues no GitHub
3. [ ] Preencher abas 2-4 com dados consolidados
4. [ ] Gerar gráficos simples
5. [ ] Comparar: Planejado vs. Realizado
6. [ ] Documentar desvios

### 3.2 Identificar Problemas

**Se Throughput Baixo**:
- ❌ Menos de 1 issue por semana
- 🔍 Possível causa: Issues complexas, gargalos, blockers
- 📝 Ação: Quebrar issues maiores, identificar dependências

**Se Taxa Retrabalho Alta**:
- ❌ Mais de 20% de bugs
- 🔍 Possível causa: Testes inadequados, DoD não sendo seguido
- 📝 Ação: Reforçar testes antes de concluir

**Se Lead Time Longo**:
- ❌ Média acima de 5 dias
- 🔍 Possível causa: Issues bloqueadas, falta de clareza
- 📝 Ação: Remover blockers, melhorar comunicação

---

## 4. 📈 Visualizações Recomendadas

### Gráfico 1: Progresso de Issues (Semanal)
```
Tipo: Gráfico de Barras Empilhadas
Eixo X: Semanas
Eixo Y: Quantidade de issues
Categorias: Abertas (azul), Em Andamento (amarelo), Concluídas (verde)
```

**Objetivo**: Ver avanço visual

---

### Gráfico 2: Produtividade (Semanal)
```
Tipo: Gráfico de Linha
Eixo X: Semanas
Eixo Y: Issues concluídas / Semana
Linha: Velocity trend
```

**Objetivo**: Identificar padrões de produtividade

---

### Gráfico 3: Qualidade (Semanal)
```
Tipo: Gráfico de Barras
Eixo X: Semanas
Eixo Y: % Taxa Retrabalho
```

**Objetivo**: Monitorar qualidade

---

### Gráfico 4: Esforço vs. Issues (Semanal)
```
Tipo: Gráfico de Dispersão ou Barras Duplas
Eixo X: Semanas
Eixo Y1: Horas (barras)
Eixo Y2: Issues (linha)
```

**Objetivo**: Comparar esforço investido vs. resultado

---

## 5. 🎯 Metas de Referência (MVP)

| Métrica | Target | Range Aceitável |
|---|---|---|
| **Throughput Médio** | 4 issues/sem | 3-6 |
| **Lead Time Médio** | 3 dias | 2-5 dias |
| **Taxa Retrabalho** | < 10% | < 20% |
| **Produtividade** | 0.4 issues/HH | 0.3-0.6 |
| **Taxa Sucesso Testes** | 100% | > 95% |

---

## 6. 📝 Responsabilidades

| Responsável | Tarefa | Frequência |
|---|---|---|
| **Rafael** | Consolidar dados semanalmente | Toda segunda-feira |
| **Rafael + Jhannyfer** | Registrar horas trabalhadas | Diariamente |
| **Rafael** | Gerar relatório semanal | Toda segunda-feira |
| **Rafael + Jhannyfer** | Revisar métricas e ajustar | Bi-semanal |

---

## 7. 📊 Acesso à Planilha

**Formato**: Google Sheets (compartilhado)  
**Acesso**: Ambos membros da equipe podem editar  
**Backup**: Exportar como CSV toda segunda-feira  

**Link**: [Será preenchido após criação]

---

## 8. 📋 Ciclo de Coleta

```
Dia Útil | Ação
Mon      | Consolidar métricas da semana anterior
Mon      | Gerar relatório semanal
Tue-Fri  | Registrar horas diárias
Fri      | Preparar dados para segunda-feira
Seg+1    | Análise de desvios e plano de ação
```

---

## 9. 🔄 Revisão das Métricas

**A cada 2 semanas**:
- [ ] Revisar se métricas estão refletindo realidade
- [ ] Ajustar se necessário
- [ ] Adicionar/remover métricas
- [ ] Atualizar este documento

**Exemplo de ajuste**:
- Métrica não está sendo coletada? → Remover
- Métrica não traz insight? → Trocar por outra
- Métrica está trazendo muito insight? → Detalhar mais

---

## 10. 📄 Template CSV (Para Download)

Arquivo `COLETA_METRICAS.csv` com estrutura:

```csv
Data,Tarefa,Responsavel,Horas,Descricao
2026-05-19,#1,Rafael,2.5,Escopo mínimo
2026-05-19,#2,Jhannyfer,1.0,Telas
```

---

## 11. Próximas Etapas

1. ✅ Estrutura de métricas documentada (este arquivo)
2. ⏳ Criar Google Sheets com as abas
3. ⏳ Compartilhar com equipe
4. ⏳ Iniciar coleta a partir de próxima semana
5. ⏳ Gerar primeiro relatório (segunda-feira)

---

**Status**: Documento ativo - pronto para coleta semanal
