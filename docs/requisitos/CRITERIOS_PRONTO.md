# Critérios de Pronto (Definition of Done - DoD)

**Versão**: 1.0  
**Data**: 2026-05-19  
**Status**: Ativo  

---

## Visão Geral

Este documento define os **critérios obrigatórios** para uma issue ser considerada **CONCLUÍDA** e pronta para merge no repositório.

Toda issue do PadrãoCerto deve atender **TODOS** os critérios desta seção antes de ser marcada como "Concluído" no GitHub.

---

## 1. ✅ DESENVOLVIMENTO

Uma issue com código precisa comprovar que a funcionalidade foi implementada corretamente:

- [ ] **Código implementado** conforme especificação descrita na issue
- [ ] **Funcionalidade testada** manualmente (ou com testes automáticos)
- [ ] **Sem console errors** - Verificar DevTools no navegador
- [ ] **Sem console warnings** - Ou warnings justificados e documentados
- [ ] **Integração funcionando**: Frontend ↔ Backend ↔ Banco de Dados
  - Se API: Testar com Postman/Insomnia
  - Se Frontend: Testar no navegador
  - Se Backend: Testar queries no MySQL
- [ ] **Tratamento de erros básico** implementado
  - Validação de entrada (backend obrigatório)
  - Mensagens de erro amigáveis ao usuário
  - Sem crashes silenciosos

---

## 2. 💻 CÓDIGO

O código deve seguir padrões definidos para o projeto:

- [ ] **Segue padrões do projeto**:
  - Frontend: Vue 3 (Composition API), componentes em `src/`
  - Backend: Express.js, rotas em `/routes`, controllers em `/controllers`
- [ ] **Nomes claros**: Variáveis, funções e componentes com nomes descritivos
  - ❌ `data1`, `func()`, `x`
  - ✅ `userData`, `validateEmail()`, `isAuthenticated`
- [ ] **Sem duplicação desnecessária**: Código reutilizável extraído em utils/helpers
- [ ] **Sem hardcoding**: Valores configuráveis em `.env` ou constantes
- [ ] **Sem comentários desnecessários**: Código fala por si (nomes claros)
  - Comentários apenas para lógica complexa ou "por quê" da decisão
- [ ] **Formatação consistente**: Indentação, espaçamento seguem padrão

---

## 3. 🔒 SEGURANÇA

Segurança é obrigatória, especialmente para autenticação e dados:

- [ ] **Rotas protegidas**: Verificar autenticação onde aplicável
  - Usar middleware de verificação de sessão
  - Retornar 401/403 se não autenticado
- [ ] **Entrada validada no backend** (obrigatório):
  - Verificar tipo de dados
  - Limpar strings (trim, sanitizar)
  - Rejeitar valores inválidos
- [ ] **Sem SQL Injection**:
  - Usar Sequelize com placeholders (nunca concatenar SQL)
  - Ex: `WHERE id = ?` ✅ | `WHERE id = ${id}` ❌
- [ ] **Sem XSS (Cross-Site Scripting)**:
  - Vue.js escapa automaticamente {{}}
  - Não usar v-html com dados de usuário
  - Se usar v-html, sanitizar com DOMPurify
- [ ] **Senhas**: Se autenticação, verificar hashing com bcryptjs
- [ ] **Sem credentials hardcoded**: Usar variáveis de ambiente

---

## 4. 🧪 TESTES

Testes validam que a funcionalidade funciona como esperado:

### 4.1 Happy Path (Fluxo Normal)
- [ ] **Testado manualmente no navegador**:
  - Abrir http://localhost:5173 (ou rota específica)
  - Seguir fluxo esperado
  - Verificar resultado
- [ ] **Testado com Postman (se for API)**:
  - GET/POST/PUT/DELETE conforme esperado
  - Status HTTP correto (200, 201, 400, etc.)
  - Response JSON estruturado
  - Dados salvos no MySQL
- [ ] **Dados persistem no banco**: Recarregar página e confirmar dados

### 4.2 Fluxo de Erro
- [ ] **Validações funcionam**:
  - Campo obrigatório vazio → erro exibido
  - Email inválido → erro exibido
  - Valores fora de range → erro exibido
- [ ] **Mensagens de erro claras**: Usuário entende o que fazer
  - ❌ "Erro 500"
  - ✅ "Email inválido. Use formato: nome@dominio.com"
- [ ] **Sistema não quebra**: Continua funcionando após erro

### 4.3 Dados Correctos
- [ ] **Formato correto**: Se espera número, salva número (não string)
- [ ] **Limites respeitados**: Se máximo 20 itens, não permite 21
- [ ] **Relacionamentos mantidos**: Obra → Checklist → Inspeção (FK intactas)

---

## 5. 📚 DOCUMENTAÇÃO

Documentação ajuda outros a entenderem o que foi feito:

- [ ] **Commit message descritiva**:
  - Primeira linha: Tipo (feat/fix/docs/refactor) + resumo breve
  - Corpo: Por quê essa mudança? Que problema resolve?
  - Exemplo:
    ```
    feat: implementar login com sessão
    
    - Autenticar usuário com email/senha
    - Criar sessão no banco com connect-session-sequelize
    - Redirecionar para dashboard após login
    - Adicionar middleware de proteção de rotas
    ```
- [ ] **Issue comentada** com resumo da conclusão:
  - Descrever o que foi feito
  - Mencionar commit(s)
  - Mencionar o link do PR (se houver)
  - Exemplo:
    ```
    ✅ Concluído em 27abc12
    
    Login implementado com sucesso:
    - API: POST /auth/login
    - Frontend: tela em src/pages/Login.vue
    - Testes: passaram no navegador e Postman
    ```
- [ ] **Métricas registradas** na planilha:
  - Data
  - Tarefa/Issue
  - Tempo gasto (em horas)
  - Observações (se houver)

---

## 6. 🔄 GIT & GITHUB

O repositório deve estar limpo e organizado:

- [ ] **Branch correto**: Sempre trabalhar em branch `developer`, não `main`
  - Branch naming: `feature/#19-login` ou `fix/#39-bug-x`
- [ ] **Commits atômicos**: Cada commit representa uma mudança lógica completa
  - Não misturar features diferentes no mesmo commit
- [ ] **Sem commits quebrados**: Todo commit deve deixar projeto em estado viável
- [ ] **Issue movida para "Concluído"**:
  - No quadro Kanban do GitHub
  - Comentário com link do commit
- [ ] **Link do commit adicionado**:
  - Comentário na issue: `Resolvido em [sha-do-commit]`
  - Exemplo: `Resolvido em 27abc12`
- [ ] **Estimativa vs. Real registrado**:
  - Se estimativa foi 2h e levou 3h → documentar
  - Ajuda na próxima estimativa

---

## 7. 📋 TIPO DE ISSUE vs. DoD

Nem todas as issues têm os mesmos critérios. Ajuste conforme tipo:

### 7.1 Feature (feat)
- ✅ Todos os critérios acima
- ✅ Testes extensivos
- ✅ Documentação de API (se backend)

### 7.2 Bug Fix (fix)
- ✅ Reproduzir bug primeiro
- ✅ Confirmar que foi resolvido
- ✅ Adicionar testes que detectem regressão
- ✅ Documentar causa raiz

### 7.3 Refactor (refactor)
- ✅ Funcionalidade não muda (testes devem passar)
- ✅ Código mais legível/manutenível
- ✅ Sem performance degradation

### 7.4 Documentação (docs)
- ✅ Arquivo criado/atualizado
- ✅ Conteúdo claro e completo
- ✅ Links funcionando (se houver)
- ✅ Sem erros ortográficos

### 7.5 Testes (test)
- ✅ Testes escritos/executados
- ✅ Coverage adequado
- ✅ Documentado como rodar

---

## 8. 🎯 CHECKLIST PRÁTICO

Use este checklist antes de marcar issue como "Concluído":

```
DESENVOLVIMENTO
- [ ] Código escrito conforme issue
- [ ] Testado manualmente - OK
- [ ] Sem console errors
- [ ] Sem console warnings
- [ ] Integração funcionando (FE-BE-BD)
- [ ] Erro handling implementado

CÓDIGO
- [ ] Segue padrões do projeto
- [ ] Nomes claros
- [ ] Sem duplicação
- [ ] Sem hardcoding
- [ ] Formatação OK

SEGURANÇA
- [ ] Rotas protegidas (se aplicável)
- [ ] Entrada validada (backend)
- [ ] Sem SQL injection
- [ ] Sem XSS
- [ ] Senhas hashed (se auth)

TESTES
- [ ] Happy path testado no navegador
- [ ] Postman OK (se API)
- [ ] Dados persistem
- [ ] Erro handling funcionando

DOCUMENTAÇÃO
- [ ] Commit message descritiva
- [ ] Issue comentada
- [ ] Métricas registradas

GIT & GITHUB
- [ ] Branch developer
- [ ] Commits atômicos
- [ ] Issue movida para Concluído
- [ ] Link do commit adicionado
- [ ] Estimativa vs. Real registrado
```

---

## 9. ⏱️ Tempo de Implementação

Como referência, tempo esperado por tipo:

| Tipo | Tempo Típico | Complexidade |
|---|---|---|
| Docs | 30 min - 1h | Baixa |
| Fix simples | 30 min - 1h | Baixa |
| Feature simples (CRUD) | 2-3h | Média |
| Feature complexa (cálculos) | 4-6h | Alta |
| Testes | 1-2h | Média |
| Refactor | 2-4h | Média |

---

## 10. 🔍 Revisão por Pares (Code Review)

Se houver revisão (opcional no MVP):

- [ ] Código compreensível
- [ ] Sem bugs óbvios
- [ ] Segurança OK
- [ ] Testes adequados
- [ ] Performance aceitável

---

## 11. Exemplo Prático: Issue Concluída

**Issue #19**: "Implementar login com sessão simples"

✅ **PASSOU EM TODOS OS CRITÉRIOS**:

```
DESENVOLVIMENTO
- [x] Código escrito - Backend (POST /auth/login) + Frontend (Login.vue)
- [x] Testado manualmente - Login funcionando no navegador
- [x] Sem console errors - ✓
- [x] Sem console warnings - ✓
- [x] Integração FE-BE-BD - ✓ Dados salvos em sessions table
- [x] Error handling - ✓ Email não encontrado → mensagem

CÓDIGO
- [x] Padrões projeto - Express.js + Vue 3 ✓
- [x] Nomes claros - validateEmail(), sessionManager ✓
- [x] Sem duplicação - Util reutilizável extraída ✓
- [x] Sem hardcoding - DB_HOST em .env ✓

SEGURANÇA
- [x] Rotas protegidas - /dashboard requer autenticação ✓
- [x] Input validado - Email + Senha verificados ✓
- [x] Sem SQL injection - Sequelize ORM ✓
- [x] Sem XSS - Vue escapa {{}} ✓
- [x] Senha hashed - bcryptjs ✓

TESTES
- [x] Happy path - Login email correto + senha correta ✓
- [x] Postman OK - POST 200, JWT válido ✓
- [x] Dados persistem - Sessão criada em DB ✓
- [x] Errors - Email inválido → 400 ✓

DOCUMENTAÇÃO
- [x] Commit - "feat: login com sessão simples..."
- [x] Issue comentada - ✓
- [x] Métricas - 2.5h registradas

GIT & GITHUB
- [x] Branch developer - ✓
- [x] Commits atômicos - 2 commits relacionados ✓
- [x] Issue movida - Para "Concluído" ✓
- [x] Link commit - "27abc12" ✓
```

---

## 12. Próximas Etapas

1. ✅ DoD documentado (este arquivo)
2. ⏳ Usar checklist em cada issue
3. ⏳ Revisar DoD após 2-3 issues (ajustar se necessário)
4. ⏳ Documentar lições aprendidas

---

**Status**: Documento ativo - seguir rigorosamente para qualidade consistente
