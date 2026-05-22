# PadrãoCerto

Sistema web para gerenciamento de obras, checklists de qualidade e inspeções na construção civil.

O projeto foi desenvolvido para a disciplina Desenvolvimento de Software Baseado em Frameworks.

---

## Objetivo

O PadrãoCerto auxilia engenheiros, técnicos e responsáveis por obras a padronizar inspeções de qualidade. A aplicação permite cadastrar obras, criar checklists, vincular checklists a obras, executar inspeções e acompanhar indicadores no dashboard.

O sistema busca melhorar:

- Rastreabilidade das inspeções.
- Padronização dos processos de verificação.
- Controle de conformidades e não conformidades.
- Registro de evidências e histórico por obra.
- Acompanhamento visual das informações principais.

---

## Frameworks Utilizados

### Frontend: Vue.js 3

Vue.js é um framework JavaScript progressivo usado para construir interfaces web reativas e componentizadas. Ele é adequado para aplicações SPA, dashboards, sistemas CRUD, painéis administrativos e interfaces que precisam responder rapidamente às ações do usuário.

No projeto, o Vue.js é responsável pelas telas, componentes visuais, navegação e integração com a API.

Principais recursos utilizados:

- **Componentes Vue** para reaproveitar estruturas de interface.
- **Vue Router** para rotas públicas e protegidas.
- **Axios** para comunicação HTTP com o backend.
- **Vite** para ambiente de desenvolvimento e build.

Por que escolhemos Vue.js:

- Curva de aprendizado amigável.
- Boa organização por componentes.
- Ecossistema simples para projetos CRUD.
- Integração direta com APIs REST.
- Performance adequada para dashboards e formulários.

### Backend: Express.js

Express.js é um framework Node.js minimalista para construção de APIs e aplicações web. Ele utiliza JavaScript no servidor e oferece recursos de roteamento, middlewares e tratamento de requisições HTTP.

No projeto, o Express.js é responsável pela API REST, autenticação, validações, regras de negócio e comunicação com o banco de dados via Sequelize.

Principais recursos utilizados:

- **Rotas HTTP** para autenticar usuários, gerenciar obras, checklists e inspeções.
- **Sequelize** como ORM para modelar e consultar o MySQL.

Por que escolhemos Express.js:

- Simplicidade para criar APIs REST.
- Flexibilidade para organizar a aplicação.
- Uso de JavaScript no frontend e no backend.
- Boa integração com MySQL via Sequelize.
- Comunidade grande e documentacao abundante.

---

## Tecnologias

### Frontend

- Vue.js 3
- Vue Router
- Axios

### Backend

- Node.js
- Express.js
- Sequelize
- MySQL2

### Banco de Dados

- MySQL 8

### Infraestrutura

- Docker
- Docker Compose
- phpMyAdmin

---

## Arquitetura

O projeto usa uma arquitetura em camadas inspirada em MVC:

- **View:** telas e componentes em Vue.js dentro de `frontend/src`.
- **Controller/Rotas:** endpoints Express definidos em `backend/src/server.js`.
- **Model:** modelos Sequelize definidos em `backend/src/server.js`.
- **Data:** persistência em MySQL.

Fluxo principal:

```text
1. Usuário interage com uma tela Vue.
2. O frontend envia uma requisição via Axios.
3. O Express recebe a requisição em uma rota.
4. A rota aplica validações e regras de negócio.
5. O Sequelize consulta ou altera dados no MySQL.
6. A API retorna JSON.
7. O Vue atualiza a interface.
```

### Onde ficam as principais regras de negocio

As regras principais estao em `backend/src/server.js`:

- `requireAuth`: valida a sessão enviada no header `Authorization`.
- `validateChecklistInput`: valida nome, descrição e quantidade de itens do checklist.
- `validateObraInput`: valida campos obrigatórios de uma obra.
- Rotas `/auth/*`: cadastro, login, recuperação de senha, logout e usuário atual.
- Rotas `/obras/*`: cadastro, listagem, edição, exclusão lógica e vinculação de checklists.
- Rotas `/checklists/*`: CRUD de checklists e itens.
- Rotas `/inspecoes/*`: início, finalização, consulta e histórico de inspeções.
- Rota `/dashboard`: dados consolidados para a tela inicial.

---

## Estrutura do Projeto

```text
padraocerto/
├── backend/
│   ├── src/
│   │   └── server.js          # API Express, modelos Sequelize, rotas e regras de negocio
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # Componentes reutilizaveis
│   │   ├── layouts/           # Layout principal
│   │   ├── pages/             # Telas da aplicacao
│   │   ├── router/            # Rotas e guarda de autenticacao
│   │   ├── utils/             # Utilitarios de feedback
│   │   ├── App.vue
│   │   └── main.js
│   ├── Dockerfile
│   └── package.json
├── docs/
│   ├── ui/                    # Prints das funcionalidades
│   ├── evidencias/
│   └── metricas/
├── docker-compose.yml
└── README.md
```

---

## Como Executar

### Pré-requisitos

- Docker instalado.
- Docker Compose instalado.
- Portas livres: `5173`, `3000`, `3306` e `8080`.

### Subir a aplicação

```bash
git clone https://github.com/RafaelTeixeira1/padraocerto.git
cd padraocerto
docker compose up --build -d
```

Depois de iniciar os containers, acesse:

| Servico | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |
| Health check | http://localhost:3000/health |
| phpMyAdmin | http://localhost:8080 |

Credenciais padrao do MySQL:

- Usuario: `root`
- Senha: `root`
- Banco: `padraocerto`

### Parar a aplicação

```bash
docker compose down
```

## Funcionalidades Implementadas

### Autenticação

- Cadastro de usuário.
- Login com email e senha.
- Recuperação de senha com senha temporária.
- Logout.
- Rotas protegidas no frontend e no backend.

### Obras

- Cadastro de obras.
- Listagem de obras.
- Visualização de detalhes.
- Edição de dados.
- Exclusão lógica.
- Vinculação de checklists a uma obra.

### Checklists

- Cadastro de checklists.
- Listagem de checklists.
- Edição.
- Exclusão.
- Cadastro de itens do checklist.
- Validacao de minimo de 3 e maximo de 20 itens.

### Inspecoes

- Início de uma inspeção a partir de obra e checklist.
- Registro de respostas conforme ou não conforme.
- Observações por item.
- Finalização da inspeção.
- Calculo de percentual de conformidade.
- Histórico de inspeções finalizadas.

### Dashboard

- Total de obras.
- Total de checklists.
- Total de inspeções finalizadas.
- Média geral de conformidade.

---

## Prints e Funcionalidades

### Dashboard Principal

![Dashboard](docs/ui/dashboard.png)

Tela inicial com indicadores do sistema e acesso rápido às principais áreas.

### Cadastro de Obras

![Cadastro de obras](docs/ui/modalCriacaoObras.png)

Modal para cadastrar uma nova obra com nome, localização, responsável, data de início e descrição.

### Painel de Obras

![Painel de obras](docs/ui/painelObras.png)

Listagem das obras cadastradas, com ações para visualizar, editar, excluir e acessar detalhes.

### Cadastro de Checklists

![Cadastro de checklists](docs/ui/modalCriacaoCheck.png)

Modal para criar checklists padronizados com descrição e itens de verificação.

### Painel de Checklists

![Painel de checklists](docs/ui/painelChecklists.png)

Listagem dos checklists cadastrados, com opções de edição e exclusão.

---

## Principais Rotas da API

### Autenticacao

| Metodo | Rota | Descrição |
|---|---|---|
| `POST` | `/auth/register` | Cadastra usuário |
| `POST` | `/auth/login` | Autentica usuário |
| `POST` | `/auth/recover` | Gera senha temporária |
| `POST` | `/auth/logout` | Encerra sessão |
| `GET` | `/auth/me` | Retorna usuário autenticado |

### Obras

| Metodo | Rota | Descrição |
|---|---|---|
| `GET` | `/obras` | Lista obras |
| `POST` | `/obras` | Cria obra |
| `GET` | `/obras/:id` | Detalha obra |
| `PUT` | `/obras/:id` | Atualiza obra |
| `DELETE` | `/obras/:id` | Remove obra |
| `POST` | `/obras/:id/vincular` | Vincula checklist à obra |

### Checklists

| Metodo | Rota | Descrição |
|---|---|---|
| `GET` | `/checklists` | Lista checklists |
| `POST` | `/checklists` | Cria checklist |
| `PUT` | `/checklists/:id` | Atualiza checklist |
| `DELETE` | `/checklists/:id` | Remove checklist |

### Inspecoes e Dashboard

| Metodo | Rota | Descrição |
|---|---|---|
| `POST` | `/inspecoes` | Inicia inspeção |
| `POST` | `/inspecoes/:id/finish` | Finaliza inspeção |
| `GET` | `/inspecoes/:id` | Detalha inspeção |
| `GET` | `/inspecoes` | Lista inspeções |
| `GET` | `/dashboard` | Retorna indicadores |

---

## Comparacao: Express.js x Laravel

| Aspecto | Express.js | Laravel |
|---|---|---|
| Linguagem | JavaScript | PHP |
| Tipo | Minimalista e flexivel | Framework completo |
| Estrutura | O grupo define a organizacao | Estrutura padronizada |
| Rotas | Definidas manualmente | Definidas em arquivos especificos |
| ORM | Sequelize no projeto | Eloquent nativo |
| Validacao | Implementada por codigo ou bibliotecas | Recursos nativos de validacao |
| Autenticacao | Montada conforme a necessidade | Solucoes prontas no ecossistema |
| Melhor uso | APIs, SPAs e servicos leves | Aplicacoes full-stack robustas |

Conclusão: Express.js deu mais liberdade para montar a API do PadrãoCerto, enquanto Laravel ofereceria mais convenções prontas. Para este projeto, Express.js foi adequado por ser simples, direto e fácil de integrar com Vue.js.

---

## Pontos Positivos

- Uso de JavaScript no frontend e backend.
- Separação clara entre interface e API.
- Docker Compose facilita a execucao do ambiente.
- Vue.js permite criar telas reativas e componentizadas.
- Express.js facilita a criacao de endpoints REST.
- Sequelize simplifica a integração com MySQL.
- Estrutura suficiente para demonstrar CRUD completo e regras de negócio.

---

## Dificuldades Encontradas

- Ajustar a comunicação entre frontend e backend.
- Configurar corretamente os containers Docker e a conexao com MySQL.
- Definir validações no frontend e também no backend.
- Organizar o fluxo de sessão para proteger rotas.
- Modelar relacionamentos entre obras, checklists e inspeções.
- Sincronizar os dados exibidos no dashboard com o estado real da API.

---

## Utilizariamos Novamente?

Sim. A combinação Vue.js + Express.js funcionou bem para um sistema CRUD com dashboard e API REST. O Vue.js facilitou a construção das telas, enquanto o Express.js permitiu criar rapidamente as rotas e regras de negócio.

Em uma próxima versão, seriam melhorias importantes:

- Separar o backend em arquivos de rotas, controllers e models.
- Adicionar migrations do Sequelize.
- Criar testes automatizados.
- Melhorar logs e tratamento global de erros.
- Adotar TypeScript para reduzir erros de tipagem.
- Criar pipeline de CI/CD.

---

## Equipe

Projeto academico desenvolvido para a disciplina **Desenvolvimento de Software Baseado em Frameworks**.

Autores:

- Rafael Teixeira
- Jhannyfer Biangulo

---
