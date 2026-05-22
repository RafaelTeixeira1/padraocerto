# PadraoCerto

Sistema web para gerenciamento de obras, checklists de qualidade e inspecoes na construcao civil.

O projeto foi desenvolvido para a disciplina **Desenvolvimento de Software Baseado em Frameworks** e atende aos direcionamentos do Projeto Pratico 2: demonstrar o uso de frameworks, explicar a arquitetura adotada, documentar a execucao do sistema e apresentar funcionalidades com prints.

---

## Objetivo

O PadraoCerto auxilia engenheiros, tecnicos e responsaveis por obras a padronizar inspecoes de qualidade. A aplicacao permite cadastrar obras, criar checklists, vincular checklists a obras, executar inspecoes e acompanhar indicadores no dashboard.

O sistema busca melhorar:

- Rastreabilidade das inspecoes.
- Padronizacao dos processos de verificacao.
- Controle de conformidades e nao conformidades.
- Registro de evidencias e historico por obra.
- Acompanhamento visual das informacoes principais.

---

## Frameworks Utilizados

### Frontend: Vue.js 3

Vue.js e um framework JavaScript progressivo usado para construir interfaces web reativas e componentizadas. Ele e adequado para aplicacoes SPA, dashboards, sistemas CRUD, paineis administrativos e interfaces que precisam responder rapidamente as acoes do usuario.

No projeto, o Vue.js e responsavel pelas telas, componentes visuais, navegacao e integracao com a API.

Principais recursos utilizados:

- **Componentes Vue** para reaproveitar estruturas de interface.
- **Composition API** com `ref`, `computed` e funcoes reativas.
- **Vue Router** para rotas publicas e protegidas.
- **Axios** para comunicacao HTTP com o backend.
- **Vite** para ambiente de desenvolvimento e build.

Por que escolhemos Vue.js:

- Curva de aprendizado amigavel.
- Boa organizacao por componentes.
- Ecossistema simples para projetos CRUD.
- Integracao direta com APIs REST.
- Performance adequada para dashboards e formularios.

### Backend: Express.js

Express.js e um framework Node.js minimalista para construcao de APIs e aplicacoes web. Ele utiliza JavaScript no servidor e oferece recursos de roteamento, middlewares e tratamento de requisicoes HTTP.

No projeto, o Express.js e responsavel pela API REST, autenticacao, validacoes, regras de negocio e comunicacao com o banco de dados via Sequelize.

Principais recursos utilizados:

- **Rotas HTTP** para autenticar usuarios, gerenciar obras, checklists e inspecoes.
- **Middlewares** para CORS, JSON e autenticacao.
- **Sequelize** como ORM para modelar e consultar o MySQL.
- **bcryptjs** para armazenar senhas com hash.
- **crypto** para gerar tokens de sessao e senhas temporarias.

Por que escolhemos Express.js:

- Simplicidade para criar APIs REST.
- Flexibilidade para organizar a aplicacao.
- Uso de JavaScript no frontend e no backend.
- Boa integracao com MySQL via Sequelize.
- Comunidade grande e documentacao abundante.

---

## Tecnologias

### Frontend

- Vue.js 3
- Vue Router
- Axios
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js
- Sequelize
- bcryptjs
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
- **Data:** persistencia em MySQL.

Fluxo principal:

```text
1. Usuario interage com uma tela Vue.
2. O frontend envia uma requisicao via Axios.
3. O Express recebe a requisicao em uma rota.
4. A rota aplica validacoes e regras de negocio.
5. O Sequelize consulta ou altera dados no MySQL.
6. A API retorna JSON.
7. O Vue atualiza a interface.
```

### Onde ficam as principais regras de negocio

As regras principais estao em `backend/src/server.js`:

- `requireAuth`: valida a sessao enviada no header `Authorization`.
- `validateChecklistInput`: valida nome, descricao e quantidade de itens do checklist.
- `validateObraInput`: valida campos obrigatorios de uma obra.
- Rotas `/auth/*`: cadastro, login, recuperacao de senha, logout e usuario atual.
- Rotas `/obras/*`: cadastro, listagem, edicao, exclusao logica e vinculacao de checklists.
- Rotas `/checklists/*`: CRUD de checklists e itens.
- Rotas `/inspecoes/*`: inicio, finalizacao, consulta e historico de inspecoes.
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
├── scripts/
│   └── api-smoke-test.mjs     # Teste rapido da API
├── docker-compose.yml
└── README.md
```

---

## Como Executar

### Pre-requisitos

- Docker instalado.
- Docker Compose instalado.
- Portas livres: `5173`, `3000`, `3306` e `8080`.

### Subir a aplicacao

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

### Parar a aplicacao

```bash
docker compose down
```

### Teste rapido da API

Com os containers em execucao, rode:

```bash
node scripts/api-smoke-test.mjs
```

---

## Funcionalidades Implementadas

### Autenticacao

- Cadastro de usuario.
- Login com email e senha.
- Recuperacao de senha com senha temporaria.
- Logout.
- Rotas protegidas no frontend e no backend.

A autenticacao usa uma sessao persistida no banco. O backend gera um token com `crypto.randomBytes`, salva esse token na tabela `Sessions` com prazo de expiracao e valida as requisicoes protegidas pelo header `Authorization: Bearer <token>`.

### Obras

- Cadastro de obras.
- Listagem de obras.
- Visualizacao de detalhes.
- Edicao de dados.
- Exclusao logica.
- Vinculacao de checklists a uma obra.

### Checklists

- Cadastro de checklists.
- Listagem de checklists.
- Edicao.
- Exclusao.
- Cadastro de itens do checklist.
- Validacao de minimo de 3 e maximo de 20 itens.

### Inspecoes

- Inicio de uma inspecao a partir de obra e checklist.
- Registro de respostas conforme ou nao conforme.
- Observacoes por item.
- Finalizacao da inspecao.
- Calculo de percentual de conformidade.
- Historico de inspecoes finalizadas.

### Dashboard

- Total de obras.
- Total de checklists.
- Total de inspecoes finalizadas.
- Media geral de conformidade.

---

## Prints e Funcionalidades

### Dashboard Principal

![Dashboard](docs/ui/dashboard.png)

Tela inicial com indicadores do sistema e acesso rapido as principais areas.

### Cadastro de Obras

![Cadastro de obras](docs/ui/modalCriacaoObras.png)

Modal para cadastrar uma nova obra com nome, localizacao, responsavel, data de inicio e descricao.

### Painel de Obras

![Painel de obras](docs/ui/painelObras.png)

Listagem das obras cadastradas, com acoes para visualizar, editar, excluir e acessar detalhes.

### Cadastro de Checklists

![Cadastro de checklists](docs/ui/modalCriacaoCheck.png)

Modal para criar checklists padronizados com descricao e itens de verificacao.

### Painel de Checklists

![Painel de checklists](docs/ui/painelChecklists.png)

Listagem dos checklists cadastrados, com opcoes de edicao e exclusao.

---

## Principais Rotas da API

### Autenticacao

| Metodo | Rota | Descricao |
|---|---|---|
| `POST` | `/auth/register` | Cadastra usuario |
| `POST` | `/auth/login` | Autentica usuario |
| `POST` | `/auth/recover` | Gera senha temporaria |
| `POST` | `/auth/logout` | Encerra sessao |
| `GET` | `/auth/me` | Retorna usuario autenticado |

### Obras

| Metodo | Rota | Descricao |
|---|---|---|
| `GET` | `/obras` | Lista obras |
| `POST` | `/obras` | Cria obra |
| `GET` | `/obras/:id` | Detalha obra |
| `PUT` | `/obras/:id` | Atualiza obra |
| `DELETE` | `/obras/:id` | Remove obra |
| `POST` | `/obras/:id/vincular` | Vincula checklist a obra |

### Checklists

| Metodo | Rota | Descricao |
|---|---|---|
| `GET` | `/checklists` | Lista checklists |
| `POST` | `/checklists` | Cria checklist |
| `PUT` | `/checklists/:id` | Atualiza checklist |
| `DELETE` | `/checklists/:id` | Remove checklist |

### Inspecoes e Dashboard

| Metodo | Rota | Descricao |
|---|---|---|
| `POST` | `/inspecoes` | Inicia inspecao |
| `POST` | `/inspecoes/:id/finish` | Finaliza inspecao |
| `GET` | `/inspecoes/:id` | Detalha inspecao |
| `GET` | `/inspecoes` | Lista inspecoes |
| `GET` | `/dashboard` | Retorna indicadores |

---

## Exemplo de Uso do Express.js no Projeto

Trecho simplificado do fluxo de autenticacao usado pela API:

```javascript
const requireAuth = async (req, res, next) => {
  const auth = req.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) return res.status(401).json({ error: "Autenticacao obrigatoria" });

  const session = await Session.findOne({
    where: { token, expiresAt: { [Op.gt]: new Date() } },
    include: [User],
  });

  if (!session) return res.status(401).json({ error: "Sessao invalida ou expirada" });

  req.user = session.User;
  req.session = session;
  next();
};
```

Esse middleware mostra um dos principais recursos do Express.js: interceptar a requisicao antes da rota final para validar regras comuns.

---

## Exemplo de Uso do Vue Router no Projeto

O frontend usa rotas publicas e protegidas. As rotas protegidas consultam a sessao salva no `localStorage`.

```javascript
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("session");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.layout === "blank" && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});
```

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

Conclusao: Express.js deu mais liberdade para montar a API do PadraoCerto, enquanto Laravel ofereceria mais convencoes prontas. Para este projeto, Express.js foi adequado por ser simples, direto e facil de integrar com Vue.js.

---

## Pontos Positivos

- Uso de JavaScript no frontend e backend.
- Separacao clara entre interface e API.
- Docker Compose facilita a execucao do ambiente.
- Vue.js permite criar telas reativas e componentizadas.
- Express.js facilita a criacao de endpoints REST.
- Sequelize simplifica a integracao com MySQL.
- Estrutura suficiente para demonstrar CRUD completo e regras de negocio.

---

## Dificuldades Encontradas

- Ajustar a comunicacao entre frontend e backend.
- Configurar corretamente os containers Docker e a conexao com MySQL.
- Definir validacoes no frontend e tambem no backend.
- Organizar o fluxo de sessao para proteger rotas.
- Modelar relacionamentos entre obras, checklists e inspecoes.
- Sincronizar os dados exibidos no dashboard com o estado real da API.

---

## Utilizariamos Novamente?

Sim. A combinacao Vue.js + Express.js funcionou bem para um sistema CRUD com dashboard e API REST. O Vue.js facilitou a construcao das telas, enquanto o Express.js permitiu criar rapidamente as rotas e regras de negocio.

Em uma proxima versao, seriam melhorias importantes:

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

- Rafael Teixeira - Backend e infraestrutura.
- Jhannyfer Biangulo - Frontend e interface.

---

## Licenca

Projeto academico para fins educacionais.
