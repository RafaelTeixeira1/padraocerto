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

#### Exemplo: Configuração básica do Express.js

```javascript
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rota simples
app.get("/", (req, res) => {
  res.send("API PadrãoCerto rodando");
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

#### Exemplo: Rota de CRUD com Express.js

```javascript
// POST - Criar nova inspeção
app.post("/api/inspections", async (req, res) => {
  try {
    const { title, description, workId } = req.body;
    
    // Validação
    if (!title || !workId) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }
    
    // Criar no banco via Sequelize
    const inspection = await Inspection.create({
      title,
      description,
      workId
    });
    
    res.status(201).json(inspection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Listar todas as inspeções
app.get("/api/inspections", async (req, res) => {
  try {
    const inspections = await Inspection.findAll();
    res.json(inspections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Obter uma inspeção por ID
app.get("/api/inspections/:id", async (req, res) => {
  try {
    const inspection = await Inspection.findByPk(req.params.id);
    if (!inspection) {
      return res.status(404).json({ error: "Inspeção não encontrada" });
    }
    res.json(inspection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Atualizar inspeção
app.put("/api/inspections/:id", async (req, res) => {
  try {
    const inspection = await Inspection.findByPk(req.params.id);
    if (!inspection) {
      return res.status(404).json({ error: "Inspeção não encontrada" });
    }
    
    await inspection.update(req.body);
    res.json(inspection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Deletar inspeção
app.delete("/api/inspections/:id", async (req, res) => {
  try {
    const inspection = await Inspection.findByPk(req.params.id);
    if (!inspection) {
      return res.status(404).json({ error: "Inspeção não encontrada" });
    }
    
    await inspection.destroy();
    res.json({ message: "Inspeção deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Vue.js 3
- **Composition API**: Código mais organizado e reutilizável
- **Reatividade automática**: Sincronização dados ↔ interface
- **Componentes scoped**: Estilos isolados por componente
- **Diretivas úteis**: `v-if`, `v-for`, `v-on` para controle de DOM

#### Exemplo: Componente Vue.js 3 com Composition API

```vue
<template>
  <div class="inspections-container">
    <h1>Lista de Inspeções</h1>
    
    <!-- Formulário para criar -->
    <form @submit.prevent="createInspection">
      <input v-model="newInspection.title" placeholder="Título" required />
      <textarea v-model="newInspection.description" placeholder="Descrição"></textarea>
      <button type="submit">Criar Inspeção</button>
    </form>
    
    <!-- Listagem com v-for -->
    <table v-if="inspections.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="inspection in inspections" :key="inspection.id">
          <td>{{ inspection.id }}</td>
          <td>{{ inspection.title }}</td>
          <td>{{ inspection.description }}</td>
          <td>
            <button @click="editInspection(inspection)">Editar</button>
            <button @click="deleteInspection(inspection.id)">Deletar</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- Mensagem se não houver registros -->
    <p v-else>Nenhuma inspeção cadastrada</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Estado reativo
const inspections = ref([]);
const newInspection = ref({ title: "", description: "" });

// API base
const API_URL = "http://localhost:3000/api/inspections";

// Carregar inspeções ao montar
onMounted(() => {
  fetchInspections();
});

// Buscar todas as inspeções
const fetchInspections = async () => {
  try {
    const response = await axios.get(API_URL);
    inspections.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar inspeções:", error);
  }
};

// Criar nova inspeção
const createInspection = async () => {
  try {
    const response = await axios.post(API_URL, newInspection.value);
    inspections.value.push(response.data);
    newInspection.value = { title: "", description: "" };
    alert("Inspeção criada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar inspeção:", error);
    alert("Erro ao criar inspeção");
  }
};

// Editar inspeção
const editInspection = async (inspection) => {
  const updatedTitle = prompt("Novo título:", inspection.title);
  if (updatedTitle) {
    try {
      await axios.put(`${API_URL}/${inspection.id}`, {
        title: updatedTitle,
        description: inspection.description
      });
      await fetchInspections();
      alert("Inspeção atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar inspeção");
    }
  }
};

// Deletar inspeção
const deleteInspection = async (id) => {
  if (confirm("Tem certeza que deseja deletar?")) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchInspections();
      alert("Inspeção deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao deletar inspeção");
    }
  }
};
</script>

<style scoped>
.inspections-container {
  padding: 20px;
}

form {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  padding: 8px 12px;
  margin: 5px;
  cursor: pointer;
}
</style>
```

#### Exemplo: Vue Router (Roteamento)

```javascript
// router.js - Definir rotas
import { createRouter, createWebHistory } from "vue-router";
import ListInspections from "./views/ListInspections.vue";
import CreateInspection from "./views/CreateInspection.vue";
import EditInspection from "./views/EditInspection.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: ListInspections
  },
  {
    path: "/inspections",
    name: "InspectionsList",
    component: ListInspections
  },
  {
    path: "/inspections/create",
    name: "CreateInspection",
    component: CreateInspection
  },
  {
    path: "/inspections/:id/edit",
    name: "EditInspection",
    component: EditInspection
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

```vue
<!-- App.vue - Usar o router -->
<template>
  <div id="app">
    <nav>
      <!-- Links para navegação -->
      <router-link to="/">Home</router-link>
      <router-link to="/inspections">Inspeções</router-link>
      <router-link to="/inspections/create">Nova Inspeção</router-link>
    </nav>
    
    <!-- Componente renderiza aqui -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>
```

#### Exemplo: Pinia (Gerenciamento de Estado Global)

```javascript
// stores/authStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("token"));

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );
      
      token.value = response.data.token;
      user.value = response.data.user;
      
      localStorage.setItem("token", token.value);
      return true;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
  };

  return { user, token, login, logout };
});
```

```vue
<!-- UsarStore.vue - Usar a store em componente -->
<template>
  <div>
    <div v-if="authStore.user">
      <p>Bem-vindo, {{ authStore.user.name }}!</p>
      <button @click="authStore.logout">Logout</button>
    </div>
    <div v-else>
      <p>Não autenticado</p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
</script>
```

---

## 🗄️ Banco de Dados com Sequelize

### O que é Sequelize?
Sequelize é um ORM (Object-Relational Mapping) que permite trabalhar com bancos de dados usando objetos JavaScript, sem escrever SQL puro.

#### Exemplo: Definir um Modelo (Inspection)

```javascript
// models/Inspection.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Inspection = sequelize.define("Inspection", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("pendente", "em_progresso", "concluida"),
      defaultValue: "pendente"
    },
    workId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Works",
        key: "id"
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "inspections",
    timestamps: true
  });

  return Inspection;
};
```

#### Exemplo: Operações com Sequelize no Controlador

```javascript
// controllers/InspectionController.js

// CREATE - Criar inspeção
const create = async (req, res) => {
  try {
    const { title, description, workId } = req.body;
    
    const inspection = await Inspection.create({
      title,
      description,
      workId,
      status: "pendente"
    });
    
    res.status(201).json({
      success: true,
      data: inspection,
      message: "Inspeção criada com sucesso"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// READ - Buscar todas
const getAll = async (req, res) => {
  try {
    const inspections = await Inspection.findAll({
      include: ["Work"],
      order: [["createdAt", "DESC"]]
    });
    
    res.json({
      success: true,
      data: inspections
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// READ - Buscar por ID
const getById = async (req, res) => {
  try {
    const inspection = await Inspection.findByPk(req.params.id, {
      include: ["Work", "Comments"]
    });
    
    if (!inspection) {
      return res.status(404).json({
        success: false,
        error: "Inspeção não encontrada"
      });
    }
    
    res.json({
      success: true,
      data: inspection
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// UPDATE - Atualizar
const update = async (req, res) => {
  try {
    const inspection = await Inspection.findByPk(req.params.id);
    
    if (!inspection) {
      return res.status(404).json({
        success: false,
        error: "Inspeção não encontrada"
      });
    }
    
    await inspection.update(req.body);
    
    res.json({
      success: true,
      data: inspection,
      message: "Inspeção atualizada com sucesso"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// DELETE - Deletar
const delete = async (req, res) => {
  try {
    const inspection = await Inspection.findByPk(req.params.id);
    
    if (!inspection) {
      return res.status(404).json({
        success: false,
        error: "Inspeção não encontrada"
      });
    }
    
    await inspection.destroy();
    
    res.json({
      success: true,
      message: "Inspeção deletada com sucesso"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  delete
};
```

---

## 🔐 Autenticação com JWT

- **JWT (JSON Web Tokens)**: Tokens stateless para sessões seguras
- **Middleware de validação**: Proteção de rotas no backend
- **Guard no frontend**: Redirecionamento automático se não autenticado
- **Armazenamento seguro**: Token salvo em localStorage

## 🔐 Autenticação com JWT

#### Como funciona JWT?

JWT (JSON Web Token) é um padrão de autenticação estateless. Em vez de manter sessões no servidor, o servidor emite um token que o cliente armazena e envia em cada requisição.

**Fluxo:**
1. Usuário faz login com email/senha
2. Servidor valida e gera um JWT
3. Cliente armazena o token
4. Cliente envia o token em cada requisição
5. Servidor valida o token

#### Exemplo: Login com JWT (Backend)

```javascript
// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "sua_chave_secreta";

// POST - Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação
    if (!email || !password) {
      return res.status(400).json({
        error: "Email e senha são obrigatórios"
      });
    }

    // Buscar usuário
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: "Email ou senha incorretos"
      });
    }

    // Verificar senha (bcrypt)
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Email ou senha incorretos"
      });
    }

    // Gerar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Register (Registro)
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validação
    if (!email || !password || !name) {
      return res.status(400).json({
        error: "Nome, email e senha são obrigatórios"
      });
    }

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        error: "Email já cadastrado"
      });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role: "user"
    });

    // Gerar token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

#### Exemplo: Middleware de Autenticação (Backend)

```javascript
// middleware/auth.js
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "sua_chave_secreta";

// Middleware para verificar token
const verifyToken = (req, res, next) => {
  // Pegar token do header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Token não fornecido"
    });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Adicionar usuário à requisição
    next();
  } catch (error) {
    res.status(401).json({
      error: "Token inválido ou expirado"
    });
  }
};

// Middleware para verificar role (permissões)
const verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        error: "Acesso negado. Você não tem permissão"
      });
    }
    next();
  };
};

module.exports = { verifyToken, verifyRole };
```

#### Exemplo: Usar middleware em rotas

```javascript
// server.js
const express = require("express");
const { verifyToken, verifyRole } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const inspectionRoutes = require("./routes/inspections");

const app = express();

app.use(express.json());

// Rotas públicas
app.use("/api/auth", authRoutes);

// Rotas protegidas (requer autenticação)
app.use("/api/inspections", verifyToken, inspectionRoutes);

// Rota apenas para admin
app.get("/api/admin/users", verifyToken, verifyRole("admin"), (req, res) => {
  res.json({ message: "Apenas admins podem acessar" });
});

app.listen(3000, () => {
  console.log("Servidor rodando");
});
```

#### Exemplo: Usar JWT no Frontend (Vue.js)

```javascript
// stores/authStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("token"));

  // Configurar axios para enviar token em todas as requisições
  if (token.value) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );

      token.value = response.data.token;
      user.value = response.data.user;

      // Salvar token localmente
      localStorage.setItem("token", token.value);

      // Configurar header para requisições futuras
      axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Erro ao fazer login"
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        { name, email, password }
      );

      token.value = response.data.token;
      user.value = response.data.user;

      localStorage.setItem("token", token.value);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Erro ao registrar"
      };
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  const isAuthenticated = () => {
    return !!token.value;
  };

  return { user, token, login, register, logout, isAuthenticated };
});
```

```vue
<!-- components/LoginForm.vue -->
<template>
  <div class="login-form">
    <h2>Login</h2>
    
    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>

    <form @submit.prevent="handleLogin">
      <div>
        <label>Email:</label>
        <input v-model="email" type="email" required />
      </div>

      <div>
        <label>Senha:</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Carregando..." : "Login" }}
      </button>
    </form>

    <p>
      Não tem conta?
      <router-link to="/register">Registre-se aqui</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const loading = ref(false);
const message = ref("");
const messageType = ref("");

const handleLogin = async () => {
  loading.value = true;

  const result = await authStore.login(email.value, password.value);

  if (result.success) {
    message.value = "Login realizado com sucesso!";
    messageType.value = "success";

    // Redirecionar após 2 segundos
    setTimeout(() => {
      router.push("/inspections");
    }, 2000);
  } else {
    message.value = result.error;
    messageType.value = "error";
  }

  loading.value = false;
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.message {
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
}

form div {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #6c757d;
}
</style>
```

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