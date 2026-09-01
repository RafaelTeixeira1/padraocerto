# PadrãoCerto 🏗️

Sistema web para gerenciamento de obras, checklists de qualidade e inspeções na construção civil.

O PadrãoCerto foi desenvolvido para apoiar engenheiros, técnicos e responsáveis por obras na padronização das inspeções de qualidade, reunindo cadastro de obras, modelos de checklist, execução de inspeções e indicadores de conformidade em uma única aplicação.

## Visão geral

A aplicação permite acompanhar o processo de inspeção desde a criação da obra e do checklist até o registro das respostas e cálculo do percentual de conformidade.

Principais objetivos:

- aumentar a rastreabilidade das inspeções;
- padronizar processos de verificação em obra;
- registrar conformidades e não conformidades;
- manter histórico das inspeções realizadas;
- centralizar indicadores de qualidade em um dashboard.

## Funcionalidades

### Autenticação

- Cadastro de usuário.
- Login com e-mail e senha.
- Recuperação de senha com senha temporária.
- Logout.
- Rotas protegidas no frontend e backend.

### Obras

- Cadastro, listagem e edição de obras.
- Visualização de detalhes.
- Exclusão lógica.
- Vinculação de checklists às obras.

### Checklists

- Cadastro, listagem, edição e exclusão.
- Criação de itens de verificação.
- Validação de quantidade mínima e máxima de itens.

### Inspeções

- Início de inspeção a partir de uma obra e checklist.
- Registro de itens como conforme ou não conforme.
- Observações por item.
- Finalização e histórico das inspeções.
- Cálculo automático do percentual de conformidade.

### Dashboard

- Total de obras.
- Total de checklists.
- Total de inspeções finalizadas.
- Média geral de conformidade.

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Frontend | Vue.js 3, Vue Router, Axios, Vite |
| Backend | Node.js, Express.js, Sequelize, MySQL2 |
| Banco de dados | MySQL 8 |
| Infraestrutura | Docker, Docker Compose, phpMyAdmin |

## Arquitetura

O projeto utiliza frontend e backend separados, com uma arquitetura em camadas inspirada em MVC.

```text
┌────────────────────┐
│      Vue.js        │
│     Frontend       │
└─────────┬──────────┘
          │ Axios / HTTP
          ▼
┌────────────────────┐
│     Express.js     │
│      REST API      │
└─────────┬──────────┘
          │ Sequelize
          ▼
┌────────────────────┐
│      MySQL 8       │
│   Persistência     │
└────────────────────┘
```

Fluxo principal:

1. O usuário interage com uma tela Vue.
2. O frontend envia uma requisição HTTP usando Axios.
3. O Express recebe a requisição e aplica validações e regras de negócio.
4. O Sequelize consulta ou altera os dados no MySQL.
5. A API retorna a resposta em JSON.
6. O Vue atualiza a interface.

Atualmente, parte importante das rotas, modelos e regras de negócio está centralizada em `backend/src/server.js`. A separação em controllers, services e models é uma das melhorias arquiteturais previstas.

## Estrutura do projeto

```text
padraocerto/
├── backend/
│   ├── src/
│   │   └── server.js          # API, rotas, modelos e regras de negócio
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── layouts/           # Layouts da aplicação
│   │   ├── pages/             # Telas
│   │   ├── router/            # Rotas e guarda de autenticação
│   │   ├── utils/             # Utilitários
│   │   ├── App.vue
│   │   └── main.js
│   ├── Dockerfile
│   └── package.json
├── docs/
│   ├── ui/                    # Capturas das funcionalidades
│   ├── evidencias/
│   └── metricas/
├── scripts/
├── docker-compose.yml
└── README.md
```

## Interface

### Dashboard

![Dashboard do PadrãoCerto](docs/ui/dashboard.png)

Painel inicial com indicadores e acesso rápido às principais áreas do sistema.

### Cadastro de obras

![Cadastro de obras](docs/ui/modalCriacaoObras.png)

Cadastro de obra com informações como nome, localização, responsável, data de início e descrição.

### Painel de obras

![Painel de obras](docs/ui/painelObras.png)

Listagem das obras cadastradas com ações de visualização, edição, exclusão e acesso aos detalhes.

### Cadastro de checklists

![Cadastro de checklist](docs/ui/modalCriacaoCheck.png)

Criação de checklists padronizados com descrição e itens de verificação.

### Painel de checklists

![Painel de checklists](docs/ui/painelChecklists.png)

Listagem dos modelos de checklist disponíveis para gerenciamento e utilização nas obras.

## Como executar

### Pré-requisitos

- Docker.
- Docker Compose.
- Portas `5173`, `3000`, `3306` e `8080` disponíveis.

Clone o repositório:

```bash
git clone https://github.com/RafaelTeixeira1/padraocerto.git
cd padraocerto
```

Suba os containers:

```bash
docker compose up --build -d
```

Após a inicialização:

| Serviço | Endereço |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend | `http://localhost:3000` |
| Health check | `http://localhost:3000/health` |
| phpMyAdmin | `http://localhost:8080` |

Configuração padrão do ambiente de desenvolvimento do MySQL:

```text
Usuário: root
Senha: root
Banco: padraocerto
```

> As credenciais acima são destinadas exclusivamente ao ambiente local de desenvolvimento e devem ser substituídas em qualquer implantação real.

Para encerrar os containers:

```bash
docker compose down
```

## Principais rotas da API

### Autenticação

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/auth/register` | Cadastra usuário |
| `POST` | `/auth/login` | Autentica usuário |
| `POST` | `/auth/recover` | Gera senha temporária |
| `POST` | `/auth/logout` | Encerra sessão |
| `GET` | `/auth/me` | Retorna usuário autenticado |

### Obras

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/obras` | Lista obras |
| `POST` | `/obras` | Cria obra |
| `GET` | `/obras/:id` | Detalha obra |
| `PUT` | `/obras/:id` | Atualiza obra |
| `DELETE` | `/obras/:id` | Remove obra |
| `POST` | `/obras/:id/vincular` | Vincula checklist à obra |

### Checklists

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/checklists` | Lista checklists |
| `POST` | `/checklists` | Cria checklist |
| `PUT` | `/checklists/:id` | Atualiza checklist |
| `DELETE` | `/checklists/:id` | Remove checklist |

### Inspeções e dashboard

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/inspecoes` | Inicia inspeção |
| `POST` | `/inspecoes/:id/finish` | Finaliza inspeção |
| `GET` | `/inspecoes/:id` | Detalha inspeção |
| `GET` | `/inspecoes` | Lista inspeções |
| `GET` | `/dashboard` | Retorna indicadores |

## Decisões técnicas

O Vue.js foi escolhido pela organização baseada em componentes e pela integração simples com APIs REST. O Express.js foi utilizado para a construção da API por oferecer uma estrutura leve e flexível, enquanto o Sequelize faz a comunicação com o MySQL.

A utilização de Docker Compose permite executar frontend, backend, banco de dados e phpMyAdmin de forma reproduzível, reduzindo diferenças entre ambientes de desenvolvimento.

## Melhorias planejadas

- Separar o backend em rotas, controllers, services e models.
- Adicionar migrations do Sequelize.
- Implementar testes automatizados.
- Melhorar logs e tratamento global de erros.
- Avaliar adoção de TypeScript.
- Criar pipeline de CI/CD.
- Evoluir relatórios e indicadores de qualidade.

## Contexto acadêmico

O projeto foi desenvolvido na disciplina **Desenvolvimento de Software Baseado em Frameworks**, demonstrando a construção de uma aplicação full stack com Vue.js, Express.js, MySQL e Docker.

Embora tenha origem acadêmica, o domínio escolhido aproxima o sistema de um cenário profissional da construção civil: controle e rastreabilidade de inspeções de qualidade em obras.

## Autores

- Rafael Teixeira
- Jhannyfer Biangulo
