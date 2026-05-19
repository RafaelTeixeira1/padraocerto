# Apresentação de Métricas de Software - PadrãoCerto

**Disciplina**: Métricas de Software - 7º Período  
**Professor**: Paulo Henrique Araujo  
**Curso**: Sistemas de Informação - IF Goiano Ceres  
**Alunos**: Rafael de S. Teixeira e Jhannyfer S. R. Biângulo  
**Data da coleta**: 2026-05-19  
**Fontes principais**: GitHub Issues, Milestones, Project/Kanban, commits, smoke test da API e planilha de horas  
**Repositório**: `RafaelTeixeira1/padraocerto`

> Observação: no documento inicial da disciplina o sistema aparece como **CheckObra**. No repositório e na entrega final o produto foi consolidado com o nome **PadrãoCerto**.

---

## 1. Objetivo da Apresentação

Apresentar como as métricas foram definidas, coletadas, registradas e interpretadas durante o desenvolvimento do PadrãoCerto, atendendo ao pedido do trabalho integrado:

- Métricas de projeto
- Métricas de processo
- Métricas de produto
- Considerações finais

O foco da apresentação não é apenas mostrar números, mas explicar o que eles revelam sobre planejamento, execução, qualidade e decisões tomadas pela equipe.

---

## 2. Contextualização do Projeto

O **PadrãoCerto** é um sistema web para gerenciamento de inspeções e controle de qualidade em obras da construção civil.

Funcionalidades principais:

- Cadastro de usuários
- Login e sessão simples
- Cadastro e gerenciamento de obras
- Criação de modelos de checklist
- Itens de checklist
- Vínculo de checklist com obra
- Execução de inspeções
- Resposta de itens como conforme ou não conforme
- Cálculo automático de conformidade
- Relatório de inspeção
- Dashboard com indicadores

Tecnologias usadas:

| Camada | Tecnologia |
|---|---|
| Frontend | Vue.js, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Banco | MySQL, Sequelize |
| Ambiente | Docker Compose |
| Gestão | GitHub Issues, Milestones e Project Kanban |

---

## 3. Base de Dados Usada nas Métricas

Foram usadas as informações registradas no GitHub:

| Fonte | Dados usados |
|---|---|
| Issues | número, título, estado, labels, responsável, datas |
| Milestones | agrupamento por fase do projeto |
| Project/Kanban | status final dos itens |
| Commits | evidência de implementação |
| Smoke test | validação funcional do produto |

Também foi usada a planilha `planilha_metricas_padraocerto_preenchida.xlsx` como fonte oficial de esforço humano, horas por integrante, datas de execução e retrabalho.

Comandos de coleta:

```bash
gh issue list --repo RafaelTeixeira1/padraocerto --state all --limit 100 \
  --json number,title,state,labels,milestone,assignees,createdAt,closedAt
```

```bash
gh project item-list 2 --owner RafaelTeixeira1 --limit 100 --format json
```

```bash
node scripts/api-smoke-test.mjs
```

---

## 4. Resumo Executivo dos Dados

| Indicador | Resultado |
|---|---:|
| Total de issues planejadas | 48 |
| Issues concluídas | 48 |
| Issues abertas | 0 |
| Percentual concluído | 100% |
| Milestones | 10 |
| Issues do tipo feature | 29 |
| Issues de documentação | 10 |
| Issues de teste | 6 |
| Issues de correção | 1 |
| Total de horas registradas na planilha | 156 h |
| Horas Rafael | 83 h |
| Horas Jhannyfer | 73 h |
| Registros de trabalho na planilha | 42 |
| Período de execução registrado | 01/04/2026 a 19/05/2026 |
| Registros com retrabalho | 9 |
| Horas de retrabalho | 29 h |
| Lead time médio das issues | 9,85 dias |
| Kanban final | 48 itens em Concluído |
| Smoke test da API | Aprovado |
| Falhas no smoke test final | 0 |

---

# PARTE 1 - MÉTRICAS DE PROJETO

As métricas de projeto foram usadas para avaliar o tamanho, esforço, prazo, produtividade e qualidade do desenvolvimento.

---

## 5. Dimensão de Projeto: Tamanho / Trabalho

### O que foi observado

O tamanho do projeto foi observado pelo volume de trabalho planejado em issues.

### Risco que a métrica ajuda a identificar

- Crescimento descontrolado do escopo
- Planejamento inicial incompleto
- Sobrecarga para a equipe

### Métrica escolhida

| Métrica | Valor |
|---|---:|
| Total de issues | 48 |
| Total de milestones | 10 |
| Funcionalidades principais implementadas | 10 fluxos principais |

### Justificativa

Como o projeto foi gerenciado no GitHub, cada funcionalidade, ajuste, documentação ou teste foi representado por uma issue. Essa métrica é mais adequada que linhas de código porque mede trabalho planejado e valor funcional, não apenas volume técnico.

### Gráfico: Status das Issues

```mermaid
pie showData
  title Status das Issues
  "Concluídas" : 48
  "Abertas" : 0
```

### Interpretação

O backlog planejado foi totalmente concluído. Isso indica que o escopo definido para o MVP foi controlado e entregue. Não houve criação de novas issues fora do planejamento inicial durante a fase final, o que reduz o risco de scope creep.

---

## 6. Trabalho por Milestone

```mermaid
xychart-beta
  title "Issues por Milestone"
  x-axis ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10"]
  y-axis "Issues" 0 --> 8
  bar [5, 8, 4, 4, 4, 4, 5, 4, 5, 5]
```

| Milestone | Foco | Issues |
|---|---|---:|
| M1 | Estrutura Inicial e Infraestrutura | 5 |
| M2 | UI Base e Navegação | 8 |
| M3 | Banco de Dados e Models | 4 |
| M4 | Autenticação e Usuários | 4 |
| M5 | Gestão de Obras | 4 |
| M6 | Gestão de Checklists | 4 |
| M7 | Execução de Inspeções | 5 |
| M8 | Dashboard e Relatórios | 4 |
| M9 | Testes, Ajustes e Usabilidade | 5 |
| M10 | Métricas e Documentação Final | 5 |

### Interpretação

A milestone M2 concentrou mais issues porque envolveu criação de interface, componentes visuais, telas estáticas e navegação. As demais milestones ficaram mais equilibradas, com 4 ou 5 issues cada, indicando uma divisão relativamente uniforme do trabalho.

### Decisão tomada a partir da métrica

A equipe manteve as milestones funcionais separadas por área: interface, banco, autenticação, obras, checklists, inspeções, dashboard, testes e documentação. Isso facilitou acompanhar o avanço sem misturar funcionalidades diferentes.

---

## 7. Dimensão de Projeto: Esforço

### O que foi observado

O esforço representa o trabalho humano necessário para desenvolver o sistema.

### Métricas escolhidas no planejamento

- Homem-hora (HH)
- Esforço total
- Variação entre esforço planejado e real

### Forma de coleta definida

| Item | Definição |
|---|---|
| Fonte principal | Planilha de horas |
| Campos | data, pessoa, issue, horas, descrição |
| Frequência | registro contínuo e consolidação semanal |
| Responsáveis | cada integrante registra suas horas |

### Evidência complementar no GitHub

O GitHub não mede horas trabalhadas diretamente. Por isso, a métrica de esforço foi coletada pela planilha feitas pelos autores, e o GitHub foi usado como evidência complementar de atividade técnica.

### Resultados da planilha de horas

| Indicador | Resultado |
|---|---:|
| Total de horas registradas | 156 h |
| Horas Rafael | 83 h |
| Horas Jhannyfer | 73 h |
| Registros de trabalho | 42 |
| Período registrado | 01/04/2026 a 19/05/2026 |
| Período sem registros | 09/04/2026 a 17/04/2026 |
| Registros com retrabalho | 9 |
| Horas de retrabalho | 29 h |
| Percentual de horas em retrabalho | 18,6% |

```mermaid
xychart-beta
  title "Horas Trabalhadas por Integrante"
  x-axis ["Rafael", "Jhannyfer"]
  y-axis "Horas" 0 --> 90
  bar [83, 73]
```

```mermaid
xychart-beta
  title "Horas Trabalhadas por Data"
  x-axis ["01/04", "02/04", "03/04", "04/04", "05/04", "06/04", "07/04", "08/04", "18/04", "19/04", "20/04", "21/04", "22/04", "23/04", "24/04", "25/04", "26/04", "27/04", "28/04", "29/04", "30/04", "01/05", "02/05", "03/05", "04/05", "05/05", "06/05", "07/05", "08/05", "09/05", "10/05", "11/05", "12/05", "13/05", "14/05", "15/05", "16/05", "17/05", "18/05", "19/05"]
  y-axis "Horas" 0 --> 10
  bar [7, 6, 7, 8, 5, 6, 8, 5, 6, 7, 6, 7, 4, 6, 6, 5, 4, 3, 4, 4, 3, 4, 3, 4, 4, 3, 4, 4, 3, 4, 5, 4, 3, 4, 3, 4, 5, 4, 4, 7]
```

```mermaid
xychart-beta
  title "Horas de Retrabalho por Área"
  x-axis ["Docker", "Banco", "Frontend", "Integração", "Validação"]
  y-axis "Horas" 0 --> 10
  bar [6, 5, 7, 6, 5]
```

### Evidência complementar no GitHub

| Indicador complementar | Resultado |
|---|---:|
| Commits registrados no histórico recente | 29 |
| Issues com responsável definido | 47 |
| Issues sem responsável | 1 |

### Interpretação

### Interpretação

O esforço foi distribuído de forma equilibrada: Rafael registrou 83 horas e Jhannyfer 73 horas. A diferença entre os integrantes permaneceu pequena em relação ao total de 156 horas, indicando divisão relativamente equilibrada das atividades.

As 29 horas de retrabalho representam 18,6% do esforço total. Isso indica que houve necessidade de ajustes principalmente em integração frontend/backend, configuração Docker, persistência e responsividade. Em projetos com múltiplas tecnologias integradas, parte desse retrabalho é esperado durante estabilização do ambiente e refinamento das funcionalidades.

A planilha mostra que a execução real ocorreu entre 01/04/2026 e 19/05/2026, com interrupção entre 09/04/2026 e 17/04/2026 devido à indisponibilidade do equipamento utilizado pela equipe.

### Limitação

A planilha mede o esforço real melhor do que o GitHub. Já o GitHub comprova entrega e rastreabilidade. Por isso, a apresentação deve mostrar os dois: **horas reais de trabalho pela planilha** e **conclusão formal pelo GitHub**.

---

## 8. Issues por Responsável

```mermaid
xychart-beta
  title "Issues por Responsável"
  x-axis ["Rafael", "Jhannyfer", "Sem responsável"]
  y-axis "Issues" 0 --> 24
  bar [24, 23, 1]
```

| Responsável | Issues |
|---|---:|
| RafaelTeixeira1 | 24 |
| jhannyfer | 23 |
| Sem responsável | 1 |

### Interpretação

A distribuição ficou praticamente equilibrada. Isso reduz risco de concentração de trabalho em apenas um integrante. A única issue sem responsável não compromete a análise, pois o conjunto total foi concluído.

---

## 8.1 Horas por Milestone na Planilha

A aba `Issues` da planilha também registra uma amostra de horas por milestone.

```mermaid
xychart-beta
  title "Horas por Milestone na Planilha"
  x-axis ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10"]
  y-axis "Horas" 0 --> 35
  bar [12, 31, 14, 12, 24, 18, 20, 11, 7, 7]
```

| Milestone | Horas |
|---|---:|
| M1 | 12 |
| M2 | 31 |
| M3 | 14 |
| M4 | 12 |
| M5 | 24 |
| M6 | 18 |
| M7 | 20 |
| M8 | 11 |
| M9 | 7 |
| M10 | 7 |

### Interpretação

A milestone M2 permaneceu como a mais trabalhosa, concentrando grande parte da construção visual, componentes reutilizáveis e navegação do sistema. As milestones M5, M6 e M7 também tiveram alta carga de horas por envolverem persistência, integração backend/frontend e execução do fluxo completo de inspeções.

---

## 9. Dimensão de Projeto: Prazo

### O que foi observado

Foi observado o tempo entre criação e fechamento das issues.

### Métricas escolhidas

- Percentual de issues concluídas
- Lead time médio

### Resultados

| Métrica | Resultado |
|---|---:|
| Issues concluídas | 48 |
| Percentual concluído | 100% |
| Lead time médio | 18,4 dias |
| Menor lead time | 7 dias |
| Maior lead time | 48 dias |

### Gráfico: Fechamento por Data

O GitHub registra o fechamento formal das issues em 19/05/2026. Porém, a planilha mostra que a execução do trabalho aconteceu em várias datas entre 01/04/2026 e 25/04/2026.

```mermaid
xychart-beta
  title "Lead Time das Issues"
  x-axis ["Mínimo", "Médio", "Máximo"]
  y-axis "Dias" 0 --> 50
  bar [7, 18.4, 48]
```

### Interpretação

Todas as issues foram fechadas formalmente em 2026-05-19. Isso mostra que o fechamento no GitHub foi concentrado no final. No entanto, a planilha de horas demonstra que o trabalho não foi feito de última hora: houve registros distribuídos entre 01/04 e 25/04.

```mermaid
xychart-beta
  title "Execução Real Registrada na Planilha"
  x-axis ["01/04", "02/04", "03/04", "04/04", "05/04", "06/04", "07/04", "08/04", "18/04", "19/04", "20/04", "21/04", "22/04", "23/04", "24/04", "25/04", "26/04", "27/04", "28/04", "29/04", "30/04", "01/05", "02/05", "03/05", "04/05", "05/05", "06/05", "07/05", "08/05", "09/05", "10/05", "11/05", "12/05", "13/05", "14/05", "15/05", "16/05", "17/05", "18/05", "19/05"]
  y-axis "Horas" 0 --> 10
  line [7, 6, 7, 8, 5, 6, 8, 5, 6, 7, 6, 7, 4, 6, 6, 5, 4, 3, 4, 4, 3, 4, 3, 4, 4, 3, 4, 4, 3, 4, 5, 4, 3, 4, 3, 4, 5, 4, 4, 7]
```

Essa separação é importante: **a data de fechamento da issue é um dado administrativo**, enquanto **a data da planilha representa o período real de execução**.

### Decisão corretiva recomendada

Em projetos futuros, mover as issues no Kanban conforme o trabalho avança, e não apenas no final. Isso melhora a precisão de métricas como lead time, cycle time e throughput semanal.

---

## 10. Dimensão de Projeto: Produtividade

### O que foi observado

A produtividade foi observada pela quantidade de issues concluídas no período.

### Métrica escolhida

Throughput: quantidade de issues concluídas por período.

### Resultado

| Indicador | Resultado |
|---|---:|
| Issues concluídas no GitHub | 48 |
| Registros de trabalho na planilha | 42 |
| Total de horas trabalhadas | 156 h |
| Produtividade por esforço | 0,31 issues/h |
| Média de horas por issue | 3,25 h/issue |

### Interpretação

O throughput final foi alto porque as issues foram fechadas em lote. Por outro lado, a planilha permite analisar a produtividade por esforço: 48 issues concluídas para 108 horas registradas, resultando em aproximadamente 0,44 issue por hora, ou 2,25 horas por issue.

Esse valor deve ser interpretado com cuidado, porque nem todas as issues têm o mesmo tamanho. Algumas são simples, como documentação, e outras são complexas, como persistência, autenticação e inspeções.

### Decisão de processo

A equipe passou a registrar evidências finais em documentação e smoke test para compensar a baixa granularidade do fechamento das issues.

---

## 11. Dimensão de Projeto: Qualidade

### O que foi observado

Foi observada a ocorrência de correções e falhas identificadas no fluxo final.

### Métricas escolhidas

- Quantidade de bugs ou correções
- Taxa de retrabalho
- Resultado de teste geral

### Resultados

| Métrica | Resultado |
|---|---:|
| Issues com label `fix` | 1 |
| Issues de teste | 6 |
| Falhas no smoke test final | 0 |
| Taxa aproximada de retrabalho por issue fix | 2,1% |
| Registros de retrabalho na planilha | 8 |
| Horas de retrabalho na planilha | 25 h |
| Taxa de retrabalho por horas | 23,1% |

```mermaid
pie showData
  title Distribuição por Tipo
  "Feature" : 29
  "Docs" : 10
  "Test" : 6
  "Fix" : 1
  "Refactor" : 1
  "Style" : 1
```

### Interpretação

A presença de apenas uma issue do tipo fix sugere baixo volume formal de correção no backlog. Já a planilha mostra 25 horas de retrabalho, principalmente em ajustes de Docker, banco, CORS, responsividade e integração. Isso mostra que o retrabalho existiu, mas foi tratado durante a execução e não ficou como falha final do produto.

O smoke test final não encontrou falhas no fluxo principal, o que indica estabilidade mínima para demonstração do MVP.

### Limitação

Foram feitos commits de correção durante o desenvolvimento, mas nem todos foram representados como issue `fix`. Portanto, a taxa de retrabalho por issue é útil, mas não captura todo ajuste técnico feito em commits.

---

# PARTE 2 - MÉTRICAS DE PROCESSO

As métricas de processo avaliam como o trabalho foi executado pela equipe.

---

## 12. Qualidade do Processo

### O que foi observado

Estabilidade das entregas e necessidade de retrabalho.

### Métricas

| Métrica | Resultado |
|---|---:|
| Issues de teste | 6 |
| Issue de correção formal | 1 |
| Registros de retrabalho na planilha | 9 |
| Horas de retrabalho na planilha | 29 h |
| Taxa de retrabalho por horas | 18,6% |
| Falhas finais | 0 |

### Interpretação

O processo teve retrabalho durante a implementação, mas terminou com uma fase final de validação bem definida. O smoke test cobre cadastro, obra, checklist, vínculo, inspeção, finalização, relatório e dashboard. Isso reduz o risco de entregar uma aplicação apenas visual sem funcionamento real.

### Decisão relacionada

A equipe criou um script automatizado (`scripts/api-smoke-test.mjs`) para tornar a validação repetível e rastreável. Essa decisão melhorou a qualidade do processo porque a verificação deixou de depender apenas de teste manual.

---

## 13. Desempenho do Processo

### O que foi observado

Tempo para transformar uma issue criada em issue fechada.

### Métrica

Lead time.

```mermaid
xychart-beta
  title "Lead Time das Issues"
  x-axis ["Mínimo", "Médio", "Máximo"]
  y-axis "Dias" 0 --> 10
  bar [9.30, 9.85, 9.91]
```

| Indicador | Dias |
|---|---:|
| Lead time mínimo | 9,30 |
| Lead time médio | 9,85 |
| Lead time máximo | 9,91 |

### Interpretação

O lead time ficou muito próximo entre as issues porque quase todas foram criadas no mesmo momento e fechadas no mesmo dia. Isso é bom para confirmar a conclusão do ciclo, mas limita a análise de gargalos internos.

### Ação corretiva recomendada

Registrar datas reais de início e movimentar as issues no Kanban durante o desenvolvimento. Assim, o cycle time ficaria mais fiel ao tempo de trabalho ativo.

---

## 14. Produtividade do Processo

### O que foi observado

Volume de entrega em relação ao processo de trabalho.

### Métricas

- Throughput
- Issues por responsável
- Distribuição por milestone
- Produtividade por esforço

### Resultados

| Indicador | Resultado |
|---|---:|
| Throughput final | 48 issues concluídas |
| Total de horas | 108 h |
| Produtividade por esforço | 0,44 issues/h |
| Média de horas por issue | 2,25 h/issue |
| Responsável com mais issues | RafaelTeixeira1, 24 |
| Segundo responsável | jhannyfer, 23 |
| Maior milestone | M2, 8 issues |

### Interpretação

A produtividade final foi suficiente para concluir 100% do backlog. A divisão equilibrada por responsável indica boa distribuição de trabalho. A milestone M2 teve maior carga por concentrar a base visual do sistema.

---

# PARTE 3 - MÉTRICAS DE PRODUTO

O trabalho pediu a escolha de três dimensões de produto. As dimensões escolhidas foram:

- Usabilidade
- Confiabilidade
- Desempenho

---

## 15. Produto: Usabilidade

### O que foi observado

Facilidade do usuário em executar o fluxo principal.

### Métricas escolhidas

- Tempo para executar uma tarefa
- Número de erros do usuário

### Forma de coleta definida

| Item | Definição |
|---|---|
| Coleta | observação direta ou teste prático |
| Momento | fase final |
| Fluxo observado | login, obra, checklist, inspeção e relatório |

### Evidência disponível

O sistema recebeu ajustes de feedback visual e responsividade:

- Toasts de sucesso e erro
- Mensagens de erro em ações principais
- Layout responsivo com navegação mobile
- Formulários com validação

### Interpretação

Mesmo sem uma bateria formal com usuários externos, as melhorias de interface reduzem risco de erro operacional. Para uma medição mais precisa, o próximo passo seria cronometrar usuários executando o fluxo principal e registrar erros por tarefa.

---

## 16. Produto: Confiabilidade

### O que foi observado

Se o sistema executa o fluxo principal sem falhas e preserva os dados.

### Métricas escolhidas

- Taxa de sucesso das operações
- Número de falhas

### Resultado do smoke test

```text
Smoke test API concluído com sucesso
Obra: 5 | Checklist: 9 | Inspeção: 5 | Conformidade: 67%
```

### Operações validadas

| Operação | Resultado |
|---|---|
| Healthcheck com banco | Aprovado |
| Cadastro de usuário | Aprovado |
| Criação de obra | Aprovado |
| Criação de checklist | Aprovado |
| Vínculo checklist-obra | Aprovado |
| Criação de inspeção | Aprovado |
| Finalização de inspeção | Aprovado |
| Consulta de relatório | Aprovado |
| Consulta de dashboard | Aprovado |

### Métrica calculada

| Métrica | Resultado |
|---|---:|
| Operações testadas | 9 |
| Operações aprovadas | 9 |
| Falhas | 0 |
| Taxa de sucesso | 100% |

### Interpretação

A confiabilidade do fluxo principal foi satisfatória para o MVP. O sistema passou a usar persistência real em MySQL, reduzindo o risco de perda de dados ao reiniciar o backend.

---

## 17. Produto: Desempenho

### O que foi observado

Resposta da API e viabilidade operacional do sistema no ambiente Docker.

### Métrica escolhida

Tempo de resposta da API.

### Evidência disponível

O smoke test executou o fluxo completo da API com sucesso e o healthcheck confirmou conexão com o banco:

```json
{"status":"ok","database":"connected"}
```

### Interpretação

O sistema respondeu adequadamente no ambiente local Docker para o fluxo do MVP. Para uma avaliação mais precisa de desempenho, recomenda-se coletar tempos em milissegundos por endpoint usando Postman, Insomnia, navegador ou script com medição de tempo.

### Ação futura

Adicionar ao smoke test a medição de tempo por requisição, registrando média, mínimo e máximo. Isso tornaria a métrica de desempenho mais forte e comparável.

---

# PARTE 4 - GRÁFICOS COMPLEMENTARES

---

## 18. Issues por Prioridade

```mermaid
pie showData
  title Distribuição por Prioridade
  "Alta" : 34
  "Média" : 13
  "Baixa" : 1
```

| Prioridade | Quantidade | Percentual |
|---|---:|---:|
| Alta | 34 | 70,8% |
| Média | 13 | 27,1% |
| Baixa | 1 | 2,1% |

### Interpretação

A maioria das issues foi classificada como alta prioridade. Isso indica que o backlog estava focado no MVP essencial, com pouca margem para tarefas opcionais.

---

## 19. Issues por Área

Uma issue pode ter mais de uma área, por isso a soma das ocorrências é maior que 48.

```mermaid
xychart-beta
  title "Issues por Área"
  x-axis ["Frontend", "Backend", "UI", "Métricas", "Auth", "Database", "Docker"]
  y-axis "Ocorrências" 0 --> 32
  bar [32, 25, 12, 6, 5, 4, 2]
```

| Área | Ocorrências |
|---|---:|
| Frontend | 32 |
| Backend | 25 |
| UI | 12 |
| Métricas | 6 |
| Auth | 5 |
| Database | 4 |
| Docker | 2 |

### Interpretação

O frontend aparece mais vezes porque o sistema depende de telas e fluxos operacionais. O backend também teve alta participação por causa da persistência, autenticação e regras de negócio.

---

## 20. Kanban Final

O Project/Kanban foi verificado no GitHub.

```text
48 Concluído
```

```mermaid
pie showData
  title Status Final no Kanban
  "Concluído" : 48
  "Outras colunas" : 0
```

### Interpretação

O quadro final confirma que todas as issues planejadas foram movidas para a coluna final. Isso atende ao critério de rastreabilidade do trabalho, pois cada item possui histórico, responsável, labels, milestone e estado final.

---

# PARTE 5 - RELAÇÃO COM DECISÕES DO PROJETO

## 21. Decisões Tomadas com Base nas Métricas

| Métrica observada | O que revelou | Decisão tomada |
|---|---|---|
| Total de issues | Escopo grande para MVP acadêmico | Dividir em 10 milestones |
| Planilha de horas | Trabalho distribuído de 01/04 a 25/04 | Separar execução real de fechamento formal no GitHub |
| Horas por integrante | Esforço equilibrado entre Rafael e Jhannyfer | Manter divisão de responsabilidades |
| Horas de retrabalho | Integração e ambiente exigiram ajustes | Priorizar estabilização com Docker e smoke test |
| Issues por área | Forte peso de frontend e backend | Implementar fluxos verticais completos |
| Issues de teste | Necessidade de evidência objetiva | Criar smoke test automatizado |
| Issue de fix | Integrações ainda exigiam ajuste | Corrigir comunicação frontend/backend |
| Kanban final | Tudo concluído, mas fechamento formal concentrado | Explicar a diferença entre datas do GitHub e datas da planilha |
| Confiabilidade do produto | Fluxo principal passou | Manter Docker + MySQL como ambiente padrão |

---

## 22. Limitações Encontradas

| Limitação | Impacto | Como melhorar |
|---|---|---|
| Fechamento de issues em lote | Distorce throughput semanal e lead time | Mover issues durante o desenvolvimento |
| HH não existe nativamente no GitHub | Exige fonte complementar | Usar planilha de horas como fonte oficial do esforço |
| Cycle time sem data real de início | Dificulta medir tempo ativo | Registrar início real de cada tarefa |
| Usabilidade sem usuários externos | Métrica fica menos objetiva | Fazer teste cronometrado com usuários |
| Desempenho sem tempo por endpoint | Avaliação ainda qualitativa | Medir latência média da API |

---

## 23. Considerações Finais

As métricas revelaram que o projeto teve escopo bem definido, organizado em 48 issues e 10 milestones. O backlog foi totalmente concluído e o Kanban terminou com 48 itens em **Concluído**.

A planilha de horas complementou o GitHub e mostrou que a execução real ocorreu entre entre 01/04/2026 e 19/05/2026, com 156 horas registradas. Isso é importante porque o fechamento das issues no GitHub ocorreu em lote no dia 19/05/2026, mas os registros de esforço demonstram que o trabalho foi realizado ao longo do desenvolvimento.

A métrica mais relevante para o projeto foi a combinação entre issues por milestone e horas trabalhadas, pois ela mostrou tanto o tamanho do escopo quanto o esforço real aplicado. Para o processo, o smoke test foi a evidência mais importante, porque validou que o sistema não ficou apenas visual: o fluxo principal funciona com persistência real em MySQL.

O uso de métricas também mostrou limitações. Como várias issues foram fechadas no mesmo dia, métricas como throughput semanal, lead time e cycle time ficaram menos precisas para representar o andamento real apenas pelo GitHub. A planilha corrigiu parte dessa limitação ao registrar datas e horas efetivas de trabalho.

Para projetos futuros, a equipe deve:

1. Registrar horas trabalhadas por issue desde o início.
2. Atualizar o Kanban durante o desenvolvimento, e não apenas no final.
3. Medir tempo real de resposta da API.
4. Fazer testes de usabilidade com usuários.
5. Manter smoke tests automatizados como evidência mínima de confiabilidade.

De forma geral, o grupo evoluiu na compreensão de que métricas não são apenas números. Elas precisam ser interpretadas e usadas para explicar decisões, riscos e melhorias no projeto.

---
