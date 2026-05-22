# Evidências da Entrega - PadrãoCerto

**Data**: 2026-05-19  
**Branch**: `developer`  
**Ambiente**: Docker Compose

---

## 1. Execução

Comando principal:

```bash
docker compose up --build -d
```

Serviços esperados:

| Serviço | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |
| Healthcheck | http://localhost:3000/health |
| phpMyAdmin | http://localhost:8080 |

Credenciais de demonstração:

```text
Email: demo@padraocerto.com
Senha: 123456
```

---

## 2. Commits Relevantes

| Commit | Entrega |
|---|---|
| `6e25235` | Persistência com Sequelize/MySQL |
| `df13151` | Autenticação persistente no frontend |
| `7a2d31e` | CRUD e dashboard conectados ao banco |
| `9741943` | Fluxo persistente de inspeção |
| `d2490cf` | Documentação Docker/persistência |
| `477a485` | Smoke test de API persistente |

---

## 3. Validação Técnica

Comandos executados:

```bash
docker compose config
docker compose up --build -d
curl -s http://localhost:3000/health
node scripts/api-smoke-test.mjs
```

Resultados registrados:

```json
{"status":"ok","database":"connected"}
```

```text
Smoke test API concluído com sucesso
Obra: 2 | Checklist: 6 | Inspeção: 2 | Conformidade: 67%
```

---

## 4. Funcionalidades Evidenciadas

| Funcionalidade | Evidência |
|---|---|
| Cadastro de usuário | Endpoint `/auth/register` no smoke test |
| Login | Endpoint `/auth/login` validado manualmente |
| Obras | Criação e consulta no smoke test |
| Checklists | Criação com 3 itens no smoke test |
| Vínculo checklist-obra | Endpoint `/obras/:id/vincular` |
| Inspeção | Endpoint `/inspecoes` |
| Finalização | Endpoint `/inspecoes/:id/finish` |
| Conformidade | Resultado calculado em 67% |
| Relatório | Consulta `/inspecoes/:id` |
| Dashboard | Consulta `/dashboard` |

---

## 5. Persistência

Dados persistidos no MySQL:

- Usuários
- Sessões
- Obras
- Modelos de checklist
- Itens de checklist
- Vínculos entre obras e checklists
- Inspeções
- Respostas dos itens da inspeção

O volume Docker usado para persistência é:

```text
padraocerto_db_data
```
