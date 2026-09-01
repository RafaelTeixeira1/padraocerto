#!/bin/bash

set -e

USER1="RafaelTeixeira1"
USER2="jhannyfer"

echo "🔖 Criando labels..."

criar_label() {
  LABEL_NAME="$1"
  COLOR="$2"
  DESC="$3"

  if ! gh label list --limit 300 | cut -f1 | grep -qx "$LABEL_NAME"; then
    gh label create "$LABEL_NAME" --color "$COLOR" --description "$DESC"
    echo "Label criada: $LABEL_NAME"
  else
    echo "Label já existe: $LABEL_NAME"
  fi
}

criar_label "feature" "0E8A16" "Nova funcionalidade"
criar_label "fix" "D73A4A" "Correção de erro"
criar_label "docs" "0075CA" "Documentação"
criar_label "test" "A2EEEF" "Testes"
criar_label "refactor" "C5DEF5" "Refatoração de código"
criar_label "style" "FBCA04" "Interface e estilos"
criar_label "chore" "5319E7" "Configuração e manutenção"

criar_label "frontend" "1D76DB" "Parte visual do sistema"
criar_label "backend" "0E8A16" "API e regras de negócio"
criar_label "database" "7057FF" "Banco de dados e models"
criar_label "docker" "BFD4F2" "Docker e ambiente"
criar_label "auth" "D93F0B" "Autenticação"
criar_label "ui" "F9D0C4" "Interface visual"
criar_label "metrics" "FEF2C0" "Métricas de software"

criar_label "priority: high" "B60205" "Alta prioridade"
criar_label "priority: medium" "FBCA04" "Média prioridade"
criar_label "priority: low" "C2E0C6" "Baixa prioridade"

echo "🏁 Criando milestones..."

criar_milestone() {
  TITLE="$1"
  DESC="$2"

  if ! gh api repos/:owner/:repo/milestones --paginate | grep -q "\"title\":\"$TITLE\""; then
    gh api repos/:owner/:repo/milestones \
      -f title="$TITLE" \
      -f description="$DESC"
    echo "Milestone criada: $TITLE"
  else
    echo "Milestone já existe: $TITLE"
  fi
}

criar_milestone "M1 - Estrutura Inicial e Infraestrutura" "Configuração inicial do projeto, Docker, monorepo, README, documentação visual e base do ambiente."
criar_milestone "M2 - UI Base e Navegação" "Criação do layout principal, componentes visuais reutilizáveis, rotas e telas estáticas."
criar_milestone "M3 - Banco de Dados e Models" "Configuração do Sequelize, models, migrations e relacionamentos."
criar_milestone "M4 - Autenticação e Usuários" "Cadastro, login, sessão simples, logout e recuperação de senha simulada."
criar_milestone "M5 - Gestão de Obras" "CRUD de obras, detalhes da obra e integração frontend/backend."
criar_milestone "M6 - Gestão de Checklists" "CRUD de modelos de checklist, itens e vínculo com obra."
criar_milestone "M7 - Execução de Inspeções" "Criação, execução, resposta e finalização de checklists."
criar_milestone "M8 - Dashboard e Relatórios" "Indicadores, relatório em tela e dados resumidos do sistema."
criar_milestone "M9 - Testes, Ajustes e Usabilidade" "Testes finais, correções, feedback visual, responsividade e refinamentos."
criar_milestone "M10 - Métricas e Documentação Final" "Coleta, análise das métricas, documentação final e preparação da entrega."

echo "📌 Criando issues..."

criar_issue() {
  TITLE="$1"
  BODY="$2"
  LABELS="$3"
  MILESTONE="$4"
  ASSIGNEE="$5"

  gh issue create \
    --title "$TITLE" \
    --body "$BODY" \
    --label "$LABELS" \
    --milestone "$MILESTONE" \
    --assignee "$ASSIGNEE"

  echo "Issue criada: $TITLE"
}

# M1
#criar_issue "docs: registrar escopo mínimo do sistema" "Documentar o escopo mínimo do PadrãoCerto em docs/requisitos, incluindo funcionalidades, limites da versão inicial e regras principais." "docs,metrics,priority: high" "M1 - Estrutura Inicial e Infraestrutura" "$USER1"

criar_issue "docs: organizar referências visuais das telas" "Salvar os prints das telas em docs/ui e documentar quais telas servirão como referência para implementação do frontend." "docs,ui,priority: high" "M1 - Estrutura Inicial e Infraestrutura" "$USER2"

criar_issue "docs: definir critérios de pronto das issues" "Registrar os critérios para considerar uma issue concluída: código implementado, testado, commitado, horas registradas e issue movida para Concluído." "docs,metrics,priority: medium" "M1 - Estrutura Inicial e Infraestrutura" "$USER1"

criar_issue "docs: preparar planilha de coleta de métricas" "Criar planilha para registro de horas, issues, testes, retrabalho, throughput, lead time, cycle time e dados de produto." "docs,metrics,priority: high" "M1 - Estrutura Inicial e Infraestrutura" "$USER2"

# M2
criar_issue "feat: implementar layout principal com sidebar e navbar" "Criar layout principal baseado nas telas de referência, contendo sidebar fixa, navbar superior e área de conteúdo." "feature,frontend,ui,priority: high" "M2 - UI Base e Navegação" "$USER1"

criar_issue "feat: configurar rotas do frontend com Vue Router" "Criar rotas para login, cadastro, recuperação de senha, dashboard, obras, detalhes da obra, execução de checklist e relatório." "feature,frontend,priority: high" "M2 - UI Base e Navegação" "$USER1"

criar_issue "feat: criar componentes visuais reutilizáveis" "Criar componentes Button, Input, Card, Badge, ProgressBar, Modal, Sidebar e Navbar." "feature,frontend,ui,priority: high" "M2 - UI Base e Navegação" "$USER2"

criar_issue "feat: implementar telas estáticas de autenticação" "Criar telas de login, cadastro de usuário e recuperação de senha conforme modelo visual definido." "feature,frontend,ui,auth,priority: high" "M2 - UI Base e Navegação" "$USER2"

criar_issue "feat: implementar dashboard estático" "Criar dashboard visual com cards, gráficos simulados e listagem inicial de obras, sem integração com backend." "feature,frontend,ui,priority: medium" "M2 - UI Base e Navegação" "$USER1"

criar_issue "feat: implementar telas estáticas de obras e checklists" "Criar telas e modais de nova obra, novo checklist, detalhes da obra e vincular checklist, usando dados simulados." "feature,frontend,ui,priority: high" "M2 - UI Base e Navegação" "$USER2"

criar_issue "feat: implementar tela estática de execução de checklist" "Criar tela visual para responder itens do checklist, com botões conforme/não conforme e campo de observação." "feature,frontend,ui,priority: high" "M2 - UI Base e Navegação" "$USER1"

criar_issue "feat: implementar tela estática de relatório de inspeção" "Criar tela ou modal de relatório exibindo percentual, itens conformes, não conformes e observações." "feature,frontend,ui,priority: medium" "M2 - UI Base e Navegação" "$USER2"

# M3
criar_issue "feat: configurar Sequelize no backend" "Configurar Sequelize com MySQL usando variáveis de ambiente, estrutura de models e conexão inicial." "feature,backend,database,priority: high" "M3 - Banco de Dados e Models" "$USER1"

criar_issue "feat: criar models e migrations principais" "Criar models e migrations para usuários, obras, checklist_modelos, checklist_itens_modelo, inspeções e inspecao_itens." "feature,backend,database,priority: high" "M3 - Banco de Dados e Models" "$USER1"

criar_issue "feat: configurar relacionamentos entre models" "Implementar relacionamentos entre usuários, obras, checklists, inspeções e itens de inspeção." "feature,backend,database,priority: high" "M3 - Banco de Dados e Models" "$USER2"

criar_issue "test: validar conexão e migrations no MySQL" "Testar se o backend executa as migrations corretamente e se o MySQL persiste os dados no Docker." "test,backend,database,docker,priority: high" "M3 - Banco de Dados e Models" "$USER2"

# M4
criar_issue "feat: implementar cadastro de usuário" "Criar endpoint e integração frontend para cadastro de usuário, validando nome, email, senha e confirmação." "feature,auth,backend,frontend,priority: high" "M4 - Autenticação e Usuários" "$USER1"

criar_issue "feat: implementar login com sessão simples" "Criar autenticação por sessão simples no backend e fluxo de login no frontend." "feature,auth,backend,frontend,priority: high" "M4 - Autenticação e Usuários" "$USER1"

criar_issue "feat: implementar logout" "Permitir encerrar sessão do usuário e retornar para a tela de login." "feature,auth,backend,frontend,priority: medium" "M4 - Autenticação e Usuários" "$USER2"

criar_issue "feat: implementar recuperação de senha simulada" "Criar fluxo simples de recuperação de senha com mensagem de confirmação, sem envio real de email." "feature,auth,frontend,priority: medium" "M4 - Autenticação e Usuários" "$USER2"

# M5
criar_issue "feat: implementar CRUD de obras no backend" "Criar endpoints para cadastrar, listar, visualizar, editar e excluir obras." "feature,backend,priority: high" "M5 - Gestão de Obras" "$USER1"

criar_issue "feat: integrar cadastro e listagem de obras no frontend" "Integrar tela de nova obra e listagem de obras com a API." "feature,frontend,priority: high" "M5 - Gestão de Obras" "$USER2"

criar_issue "feat: implementar detalhes da obra" "Exibir dados da obra, status, conformidade geral e checklists vinculados." "feature,frontend,backend,priority: high" "M5 - Gestão de Obras" "$USER1"

criar_issue "test: testar fluxo completo de obras" "Validar criação, listagem, detalhe, edição e exclusão de obras." "test,frontend,backend,priority: medium" "M5 - Gestão de Obras" "$USER2"

# M6
criar_issue "feat: implementar CRUD de modelos de checklist" "Criar backend e frontend para cadastrar, listar, editar e excluir modelos de checklist." "feature,frontend,backend,priority: high" "M6 - Gestão de Checklists" "$USER1"

criar_issue "feat: implementar itens do modelo de checklist" "Permitir cadastro, listagem e remoção dos itens vinculados a um modelo de checklist." "feature,frontend,backend,priority: high" "M6 - Gestão de Checklists" "$USER2"

criar_issue "feat: implementar vínculo de checklist com obra" "Permitir selecionar um modelo de checklist e iniciar uma inspeção para uma obra." "feature,frontend,backend,priority: high" "M6 - Gestão de Checklists" "$USER1"

criar_issue "test: testar fluxo completo de checklists" "Validar criação de modelo, inclusão de itens e vínculo com obra." "test,frontend,backend,priority: medium" "M6 - Gestão de Checklists" "$USER2"

# M7
criar_issue "feat: implementar criação de inspeção" "Criar inspeção a partir de uma obra e modelo de checklist, copiando os itens do modelo para a inspeção." "feature,backend,frontend,priority: high" "M7 - Execução de Inspeções" "$USER1"

criar_issue "feat: implementar resposta dos itens da inspeção" "Permitir marcar cada item como conforme ou não conforme e registrar observação." "feature,backend,frontend,priority: high" "M7 - Execução de Inspeções" "$USER2"

criar_issue "feat: implementar cálculo automático de conformidade" "Calcular percentual de conformidade com base nos itens respondidos." "feature,backend,priority: high" "M7 - Execução de Inspeções" "$USER1"

criar_issue "feat: implementar finalização de checklist" "Finalizar inspeção somente quando todos os itens estiverem respondidos, salvando status e percentual." "feature,backend,frontend,priority: high" "M7 - Execução de Inspeções" "$USER2"

criar_issue "test: testar fluxo completo de inspeção" "Validar criação, resposta, cálculo, finalização e visualização da inspeção." "test,frontend,backend,priority: high" "M7 - Execução de Inspeções" "$USER1"

# M8
criar_issue "feat: implementar relatório de inspeção em tela" "Exibir relatório com obra, checklist, percentual, total de itens, conformes, não conformes e observações." "feature,frontend,backend,priority: high" "M8 - Dashboard e Relatórios" "$USER2"

criar_issue "feat: atualizar dashboard com dados reais" "Exibir total de obras, obras ativas, conformidade média e checklists ativos com base no banco." "feature,frontend,backend,priority: medium" "M8 - Dashboard e Relatórios" "$USER1"

criar_issue "feat: implementar gráficos simples do dashboard" "Criar gráficos simples com dados reais ou simulados de forma controlada." "feature,frontend,ui,priority: low" "M8 - Dashboard e Relatórios" "$USER2"

criar_issue "test: validar indicadores e relatório" "Verificar se percentuais, contadores e relatórios exibem dados corretos." "test,frontend,backend,priority: medium" "M8 - Dashboard e Relatórios" "$USER1"

# M9
criar_issue "fix: corrigir inconsistências de integração" "Corrigir erros de comunicação entre frontend e backend identificados durante testes." "fix,frontend,backend,priority: high" "M9 - Testes, Ajustes e Usabilidade" "$USER1"

criar_issue "feat: implementar feedback visual de ações" "Exibir mensagens de sucesso, erro e carregamento nas principais ações do sistema." "feature,frontend,ui,priority: medium" "M9 - Testes, Ajustes e Usabilidade" "$USER2"

criar_issue "style: ajustar responsividade das telas" "Adaptar layout para diferentes tamanhos de tela." "style,frontend,ui,priority: medium" "M9 - Testes, Ajustes e Usabilidade" "$USER2"

criar_issue "refactor: revisar organização do código" "Melhorar organização de componentes, services, controllers e models sem alterar funcionalidades." "refactor,frontend,backend,priority: medium" "M9 - Testes, Ajustes e Usabilidade" "$USER1"

criar_issue "test: realizar teste geral do sistema" "Executar teste completo do fluxo login, obra, checklist, inspeção e relatório." "test,frontend,backend,priority: high" "M9 - Testes, Ajustes e Usabilidade" "$USER2"

# M10
criar_issue "docs: documentar execução do projeto com Docker" "Atualizar README com comandos para subir frontend, backend, MySQL e phpMyAdmin." "docs,docker,priority: high" "M10 - Métricas e Documentação Final" "$USER1"

criar_issue "docs: documentar estrutura do projeto e tecnologias" "Explicar Vue, Express, Sequelize, MySQL, Docker e organização das pastas." "docs,priority: high" "M10 - Métricas e Documentação Final" "$USER2"

criar_issue "docs: registrar métricas coletadas" "Consolidar dados de horas, issues, throughput, retrabalho, lead time, cycle time e testes." "docs,metrics,priority: high" "M10 - Métricas e Documentação Final" "$USER1"

criar_issue "docs: analisar resultados das métricas" "Interpretar os dados coletados e relacionar com decisões do projeto." "docs,metrics,priority: high" "M10 - Métricas e Documentação Final" "$USER2"

criar_issue "docs: preparar evidências da entrega" "Organizar prints, testes, planilhas, README e informações necessárias para apresentação." "docs,metrics,priority: medium" "M10 - Métricas e Documentação Final" "$USER1"

echo "✅ Organização criada com sucesso!"
