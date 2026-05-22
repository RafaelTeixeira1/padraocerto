# PadrãoCerto

**Sistema web para gerenciamento de inspeções e controle de qualidade em obras da construção civil**

---

## 📌 Objetivo do Projeto

O PadrãoCerto foi desenvolvido para auxiliar engenheiros, técnicos e responsáveis por obras no processo de inspeção de qualidade, padronização de checklists e geração de relatórios de conformidade.

O sistema busca melhorar:
- Rastreabilidade das inspeções
- Controle de não conformidades
- Padronização dos processos
- Geração de evidências
- Acompanhamento das obras em tempo real

---

## 🎯 Frameworks Utilizados

### **Frontend: Vue.js 3**

#### O que é Vue.js?
Vue.js é um framework JavaScript progressivo utilizado para construir interfaces de usuário interativas. É conhecido por sua facilidade de aprendizado, documentação clara e abordagem flexível.

#### Características principais:
- **Reatividade**: Sincronização automática entre dados e interface
- **Componentes**: Reutilizáveis e isolados
- **Virtual DOM**: Otimização de performance
- **Ferramentas de desenvolvimento**: Vue DevTools para debug

#### Por que escolhemos Vue.js?
- Curva de aprendizado menor comparado ao React
- Melhor documentação que Angular
- Performance adequada para aplicações CRUD
- Ecossistema robusto com Vue Router e Pinia

#### Ferramentas complementares:
- **Vue Router**: Roteamento de páginas (lista, edição, detalhes)
- **Pinia**: Gerenciamento de estado global (autenticação, dados do usuário)
- **Axios**: HTTP client para comunicação com backend
- **Vite**: Build tool moderno e rápido

### **Backend: Express.js**

#### O que é Express.js?
Express.js é um framework Node.js minimalista e flexível para construir APIs REST e aplicações web. É o framework mais popular do Node.js.

#### Características principais:
- **Roteamento simples**: Fácil definição de endpoints
- **Middleware**: Processamento de requisições em camadas
- **Lightweight**: Apenas o necessário, sem overhead
- **Comunidade grande**: Muitos pacotes e soluções disponíveis

#### Por que escolhemos Express.js?
- Integração perfeita com Node.js
- Performance superior para APIs REST
- Flexibilidade para implementar padrões arquiteturais (MVC)
- Suporte nativo a middleware para autenticação (JWT)
- Documentação abundante

#### Ferramentas complementares:
- **Node.js**: Runtime JavaScript server-side
- **JWT (JSON Web Tokens)**: Autenticação stateless
- **Sequelize**: ORM para abstração de banco de dados
- **MySQL**: Persistência de dados

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- Vue.js 3
### Frontend
- Vue.js 3
- Vue Router (navegação)
- Pinia (gerenciamento de estado)
- Axios (requisições HTTP)
- Vite (build tool)

### Backend
- Node.js (runtime)
- Express.js (framework)
- JWT (autenticação)
- Sequelize (ORM)

### Banco de Dados
- MySQL 8
- MySQL 8

### Infraestrutura
- Docker
- Docker Compose
- phpMyAdmin (interface MySQL)

---

## 📐 Arquitetura do Projeto

O projeto foi estruturado seguindo o padrão **MVC (Model-View-Controller)**:

### **Frontend (View)**
- Componentes Vue.js reutilizáveis
- Páginas para operações CRUD (Create, Read, Update, Delete)
- Comunicação com backend via API REST

### **Backend (Controller + Model)**
- Rotas Express.js que recebem requisições
- Controladores que processam lógica de negócio
- Modelos Sequelize que representam tabelas do banco

### **Banco de Dados (Data)**
- MySQL com tabelas normalizadas
- Relacionamentos entre entidades

### Fluxo de Requisição:
```
1. Usuário interage com componente Vue (Frontend)
2. Axios realiza requisição HTTP
3. Express.js roteia para controlador apropriado
4. Controlador acessa modelo via Sequelize
5. Dados retornam em JSON
6. Vue atualiza interface reativa
```

---

## 📂 Estrutura do Projeto

```bash
padraocerto/
│
├── backend/
│   ├── src/
│   │   ├── controllers/      # Lógica de negócio
│   │   ├── models/           # Definição de tabelas
│   │   ├── routes/           # Endpoints da API
│   │   ├── middleware/       # Autenticação, validação
│   │   └── app.js            # Configuração Express
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes Vue reutilizáveis
│   │   ├── views/            # Páginas (lista, edição, detalhes)
│   │   ├── router/           # Rotas Vue Router
│   │   ├── stores/           # Estado global (Pinia)
│   │   └── App.vue           # Componente raiz
│   ├── Dockerfile
│   └── package.json
│
├── docs/
│   └── ui/                   # Prints e mockups
│
├── docker-compose.yml        # Orquestração de containers
├── .gitignore
└── README.md
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Docker e Docker Compose instalados
- Porta 5173 (frontend) disponível
- Porta 3000 (backend) disponível
- Porta 3306 (MySQL) disponível
- Porta 8080 (phpMyAdmin) disponível

### Passos para execução

```bash
# 1. Clone o repositório
git clone https://github.com/RafaelTeixeira1/padraocerto.git
cd padraocerto

# 2. Inicie os containers
docker compose up --build -d

# 3. Aguarde ~10 segundos para inicialização
sleep 10

# 4. Acesse a aplicação
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

### Para parar os containers

```bash
docker compose down
```

O backend inicializa o Sequelize automaticamente no startup do container, sincroniza as tabelas no MySQL e cria dados mínimos de demonstração quando o banco está vazio.

## Acesso de demonstração

```text
Email: demo@padraocerto.com
Senha: 123456
```

Também é possível criar novos usuários pela tela de cadastro.

---

## 🌐 Acessos e Portas

| Serviço | Porta | URL |
|---|---|---|
| Frontend (Vue.js) | 5173 | http://localhost:5173 |
| Backend (Express.js) | 3000 | http://localhost:3000 |
| Health Check | 3000 | http://localhost:3000/health |
| phpMyAdmin | 8080 | http://localhost:8080 |
| MySQL | 3306 | localhost:3306 |

### Credenciais MySQL (padrão)
- Usuário: `root`
- Senha: `root`
- Banco: `padraocerto`

---

## 📋 Funcionalidades Implementadas

### ✅ CRUD Completo

#### 1. **Cadastro** (CREATE)
- Formulário para criar novas entidades
- Validação de dados no frontend e backend
- Mensagens de sucesso/erro

#### 2. **Listagem** (READ)
- Visualização de todos os registros
- Tabela com paginação e filtros
- Acesso aos dados via API REST

#### 3. **Edição** (UPDATE)
- Formulário pré-preenchido com dados existentes
- Atualização em tempo real
- Validação antes de enviar

#### 4. **Exclusão** (DELETE)
- Confirmação antes de remover
- Deleção em cascata conforme necessário
- Feedback visual ao usuário

---

## 🔑 Principais Recursos do Framework

### Express.js
- **Middleware**: Processamento de requisições (autenticação, validação)
- **Roteamento dinâmico**: Organização de endpoints por recurso
- **Tratamento de erros**: Middleware centralizador de exceções
- **Integração com banco**: ORM Sequelize para queries seguras

### Vue.js 3
- **Composition API**: Código mais organizado e reutilizável
- **Reatividade automática**: Sincronização dados ↔ interface
- **Componentes scoped**: Estilos isolados por componente
- **Diretivas úteis**: `v-if`, `v-for`, `v-on` para controle de DOM

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
>>>>>>> developer

- **JWT (JSON Web Tokens)**: Tokens stateless para sessões seguras
- **Middleware de validação**: Proteção de rotas no backend
- **Guard no frontend**: Redirecionamento automático se não autenticado
- **Armazenamento seguro**: Token salvo em localStorage

---

## 🆚 Comparação: Express.js vs Laravel

| Aspecto | Express.js | Laravel |
|---|---|---|
| Linguagem | JavaScript | PHP |
| Curva Aprendizado | Fácil | Média |
| ORM | Sequelize | Eloquent |
| Roteamento | Manual | Automático |
| Migrations | Manual | Automático |
| Validação | Biblioteca | Built-in |
| Performance | Alta | Boa |
| Comunidade | Grande | Muito grande |

**Conclusão**: Express.js é ideal para aplicações leves e APIs, enquanto Laravel é melhor para aplicações full-stack tradicionais.

---

## ✅ Pontos Positivos

1. **Separação Frontend/Backend**: Comunicação clara via API REST
2. **Performance**: Vue.js e Express.js são leves e rápidos
3. **Facilidade de manutenção**: Código bem organizado em camadas
4. **Escalabilidade**: Arquitetura preparada para crescimento
5. **Docker**: Ambiente reproduzível em qualquer máquina
6. **Reatividade**: Vue.js permite UX interativa
7. **Flexibilidade**: Express.js não impõe padrões rígidos

---

## ⚠️ Dificuldades Encontradas

1. **Sincronização Frontend/Backend**: Necessidade de acordo de contrato de API
2. **Gerenciamento de estado**: Inicialmente sem Pinia foi caótico
3. **Configuração Docker**: Variáveis de ambiente e comunicação entre containers
4. **CORS**: Problemas de cross-origin no desenvolvimento
5. **Validação em duas camadas**: Frontend e backend devem validar
6. **Migrations banco**: Sequelize requer atenção com relacionamentos

---

## 🚀 Utilizaríamos novamente?

### **SIM**, pelos seguintes motivos:

✅ Vue.js + Express.js é uma excelente combinação para projetos médios

✅ Curva de aprendizado apropriada para equipes

✅ Documentação e comunidade fortes

✅ Facilidade de deploy com Docker

✅ Performance satisfatória para aplicações CRUD

### **Melhorias para próximas versões:**

- Adicionar testes automatizados (Jest)
- Implementar logging centralizado
- Usar TypeScript para type safety
- CI/CD com GitHub Actions

---

## 🐳 Containers Docker

O projeto utiliza orquestração Docker Compose com 4 containers:

1. **frontend**: Aplicação Vue.js (Vite dev server)
2. **backend**: API Express.js
3. **mysql**: Banco de dados
4. **phpmyadmin**: Interface para gerenciar banco

Todos os containers estão na mesma rede e se comunicam facilmente.

---

## 👨‍💻 Equipe

Projeto acadêmico desenvolvido para a disciplina: **Desenvolvimento de Software Baseado em Frameworks**

### Autores:
- **Rafael Teixeira** - Backend e Infraestrutura
- **Jhannyfer Biangulo** - Frontend e Interface

---

## 📄 Licença

Projeto acadêmico para fins educacionais.
