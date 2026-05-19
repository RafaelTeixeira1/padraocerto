# Resultados de Testes - PadrãoCerto

**Data**: 2026-05-19  
**Ambiente**: Docker Compose local  
**Status**: Aprovado

---

## Ambiente Validado

Serviços executados:

| Serviço | Porta | Status esperado |
|---|---:|---|
| Frontend | 5173 | Vite em execução |
| Backend | 3000 | API Express em execução |
| MySQL | 3306 | Banco saudável |
| phpMyAdmin | 8080 | Interface disponível |

Healthcheck validado:

```json
{"status":"ok","database":"connected"}
```

---

## Smoke Test Automatizado

Script:

```bash
node scripts/api-smoke-test.mjs
```

Escopo coberto:

| Issue | Fluxo validado | Status |
|---:|---|---|
| #17 | Conexão API com MySQL | Aprovado |
| #25 | Criar e consultar obra | Aprovado |
| #29 | Criar checklist com itens | Aprovado |
| #34 | Fluxo completo de inspeção | Aprovado |
| #38 | Dashboard, indicadores e relatório | Aprovado |
| #43 | Teste geral ponta a ponta da API | Aprovado |

Fluxo executado:

1. Verifica `/health`.
2. Cria usuário de teste e autentica.
3. Cria obra persistida.
4. Cria checklist com 3 itens.
5. Vincula checklist à obra.
6. Inicia inspeção.
7. Responde os itens.
8. Finaliza inspeção.
9. Confere cálculo automático de conformidade.
10. Consulta relatório da inspeção.
11. Confere indicadores do dashboard.

Resultado esperado:

```text
Smoke test API concluído com sucesso
Obra: <id> | Checklist: <id> | Inspeção: <id> | Conformidade: 67%
```

---

## Observações

- O teste usa dados únicos por timestamp, evitando colisão de email e nomes.
- O script exige que o backend esteja disponível em `http://localhost:3000`.
- Para outro endereço, usar `API_URL`, por exemplo:

```bash
API_URL=http://localhost:3000 node scripts/api-smoke-test.mjs
```
