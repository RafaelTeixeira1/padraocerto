# PadrãoCerto

Sistema web para gerenciamento de inspeções e controle de qualidade em obras da construção civil.

---

# 📌 Objetivo

O PadrãoCerto foi desenvolvido para auxiliar engenheiros, técnicos e responsáveis por obras no processo de inspeção de qualidade, padronização de checklists e geração de relatórios de conformidade.

O sistema busca melhorar:
- rastreabilidade das inspeções;
- controle de não conformidades;
- padronização dos processos;
- geração de evidências;
- acompanhamento das obras em tempo real.

---

# 🛠️ Tecnologias Utilizadas

## Frontend
- Vue.js 3
- Vue Router
- Pinia
- Axios
- Vite

## Backend
- Node.js
- Express.js
- Sessão simples com token opaco
- Sequelize

## Banco de Dados
- MySQL 8

## Infraestrutura
- Docker
- Docker Compose
- phpMyAdmin

---

# 📂 Estrutura do Projeto

```bash
padraocerto/
│
├── backend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── docs/
│   └── ui/
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

# 🚀 Como Executar o Projeto

## Subir containers

```bash
docker compose up --build -d
```

O backend inicializa o Sequelize automaticamente no startup do container, sincroniza as tabelas no MySQL e cria dados mínimos de demonstração quando o banco está vazio.

## Acesso de demonstração

```text
Email: demo@padraocerto.com
Senha: 123456
```

Também é possível criar novos usuários pela tela de cadastro.

---

# 🌐 Portas do Projeto

| Serviço | Porta |
|---|---|
| Frontend | 5173 |
| Backend | 3000 |
| phpMyAdmin | 8080 |
| MySQL | 3306 |

---

# 🔗 URLs

## Frontend
http://localhost:5173

## Backend
http://localhost:3000

## Health Check
http://localhost:3000/health

## phpMyAdmin
http://localhost:8080

---

# 📋 Funcionalidades Previstas

- Autenticação de usuários
- Cadastro de obras
- Cadastro de checklists
- Execução de inspeções
- Registro de conformidades
- Registro de não conformidades
- Upload de imagens
- Relatórios em PDF
- Dashboard gerencial
- Histórico de inspeções

---

# ✅ Persistência

Os dados de usuários, sessões, obras, checklists, vínculos e inspeções são persistidos no MySQL do Docker Compose, usando o volume `padraocerto_db_data`.

Para reiniciar os containers sem apagar dados:

```bash
docker compose down
docker compose up --build -d
```

Para apagar o banco de desenvolvimento e começar limpo:

```bash
docker compose down -v
docker compose up --build -d
```

---

# 📊 Organização do Projeto

O projeto utiliza:
- GitFlow
- Issues
- Milestones
- Kanban Board
- Métricas de desenvolvimento

---

# 🐳 Containers Docker

## Containers utilizados

- frontend
- backend
- mysql
- phpmyadmin

---

# 👨‍💻 Equipe

Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento de Software Baseado em Frameworks.

Autores:
- Rafael Teixeira
- Jhannyfer Biangulo

---

# 📄 Licença

Projeto acadêmico para fins educacionais.
