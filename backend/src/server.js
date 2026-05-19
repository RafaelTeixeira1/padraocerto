require("dotenv").config();

const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { Sequelize, DataTypes, Op } = require("sequelize");

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_TTL_HOURS = 24;

const sequelize = new Sequelize(
  process.env.DB_NAME || "padraocerto",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "root",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: false,
  }
);

const User = sequelize.define("User", {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
});

const Session = sequelize.define("Session", {
  token: { type: DataTypes.STRING(96), allowNull: false, unique: true },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
});

const Obra = sequelize.define(
  "Obra",
  {
    nome: { type: DataTypes.STRING, allowNull: false },
    localizacao: { type: DataTypes.STRING, allowNull: false },
    responsavel: { type: DataTypes.STRING, allowNull: false },
    dataInicio: { type: DataTypes.DATEONLY, allowNull: false },
    descricao: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "ativa" },
  },
  { paranoid: true }
);

const Checklist = sequelize.define("Checklist", {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: true },
});

const ChecklistItem = sequelize.define("ChecklistItem", {
  descricao: { type: DataTypes.STRING, allowNull: false },
  ordem: { type: DataTypes.INTEGER, allowNull: false },
});

const ObraChecklist = sequelize.define("ObraChecklist", {
  dataVencimento: { type: DataTypes.DATEONLY, allowNull: true },
  vinculadoEm: { type: DataTypes.DATEONLY, allowNull: false },
});

const Inspecao = sequelize.define("Inspecao", {
  responsavel: { type: DataTypes.STRING, allowNull: false },
  startTime: { type: DataTypes.DATE, allowNull: false },
  endTime: { type: DataTypes.DATE, allowNull: true },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: "in-progress" },
  conformidade: { type: DataTypes.INTEGER, allowNull: true },
});

const InspecaoItem = sequelize.define("InspecaoItem", {
  descricao: { type: DataTypes.STRING, allowNull: false },
  ordem: { type: DataTypes.INTEGER, allowNull: false },
  conforme: { type: DataTypes.BOOLEAN, allowNull: true },
  observacoes: { type: DataTypes.TEXT, allowNull: true },
});

User.hasMany(Session, { onDelete: "CASCADE" });
Session.belongsTo(User);

Checklist.hasMany(ChecklistItem, { as: "itens", onDelete: "CASCADE" });
ChecklistItem.belongsTo(Checklist);

Obra.belongsToMany(Checklist, { through: ObraChecklist, as: "checklists" });
Checklist.belongsToMany(Obra, { through: ObraChecklist, as: "obras" });

Obra.hasMany(Inspecao, { as: "inspecoes" });
Inspecao.belongsTo(Obra);
Checklist.hasMany(Inspecao);
Inspecao.belongsTo(Checklist);
User.hasMany(Inspecao);
Inspecao.belongsTo(User);
Inspecao.hasMany(InspecaoItem, { as: "itens", onDelete: "CASCADE" });
InspecaoItem.belongsTo(Inspecao);

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const addHours = (date, hours) => new Date(date.getTime() + hours * 60 * 60 * 1000);
const today = () => new Date().toISOString().slice(0, 10);
const toNumber = (value) => Number.parseInt(value, 10);
const clean = (value) => String(value || "").trim();

const formatDate = (value) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("pt-BR");
};

const formatObra = async (obra) => {
  const historico = await Inspecao.findAll({
    where: { ObraId: obra.id, status: "finished" },
    include: [Checklist],
    order: [["endTime", "DESC"]],
  });

  return {
    id: obra.id,
    nome: obra.nome,
    localizacao: obra.localizacao,
    responsavel: obra.responsavel,
    dataInicio: formatDate(obra.dataInicio),
    descricao: obra.descricao || "",
    status: obra.status,
    checklists: (obra.checklists || []).map((checklist) => ({
      id: checklist.id,
      nome: checklist.nome,
      itens: Number(checklist.itensCount || checklist.itens?.length || 0),
      data: formatDate(checklist.ObraChecklist?.vinculadoEm),
      dataVencimento: formatDate(checklist.ObraChecklist?.dataVencimento),
    })),
    historico: historico.map((inspecao) => ({
      id: inspecao.id,
      checklist: inspecao.Checklist?.nome || "",
      responsavel: inspecao.responsavel,
      conformidade: inspecao.conformidade,
      data: inspecao.endTime ? inspecao.endTime.toLocaleDateString("pt-BR") : null,
    })),
  };
};

const formatChecklist = (checklist) => ({
  id: checklist.id,
  nome: checklist.nome,
  descricao: checklist.descricao || "",
  itens: (checklist.itens || [])
    .sort((a, b) => a.ordem - b.ordem)
    .map((item) => item.descricao),
});

const requireAuth = async (req, res, next) => {
  const auth = req.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) return res.status(401).json({ error: "Autenticação obrigatória" });

  const session = await Session.findOne({
    where: { token, expiresAt: { [Op.gt]: new Date() } },
    include: [User],
  });

  if (!session) return res.status(401).json({ error: "Sessão inválida ou expirada" });

  req.user = session.User;
  req.session = session;
  next();
};

const validateChecklistInput = (payload) => {
  const nome = clean(payload.nome);
  const descricao = clean(payload.descricao);
  const itens = Array.isArray(payload.itens)
    ? payload.itens
        .map((item) => (typeof item === "string" ? clean(item) : clean(item?.descricao)))
        .filter(Boolean)
    : [];

  if (!nome) return { error: "Nome do checklist é obrigatório" };
  if (itens.length < 3) return { error: "Mínimo de 3 itens é obrigatório" };
  if (itens.length > 20) return { error: "Máximo de 20 itens por checklist" };

  return { nome, descricao, itens };
};

const validateObraInput = (payload) => {
  const nome = clean(payload.nome);
  const localizacao = clean(payload.localizacao);
  const responsavel = clean(payload.responsavel);
  const dataInicio = clean(payload.dataInicio);
  const descricao = clean(payload.descricao);

  if (!nome) return { error: "Nome da obra é obrigatório" };
  if (!localizacao) return { error: "Localização é obrigatória" };
  if (!responsavel) return { error: "Responsável é obrigatório" };
  if (!dataInicio) return { error: "Data de início é obrigatória" };

  return { nome, localizacao, responsavel, dataInicio, descricao };
};

app.get("/", (req, res) => {
  res.send("API PadrãoCerto rodando");
});

app.get("/health", async (req, res) => {
  await sequelize.authenticate();
  res.json({ status: "ok", database: "connected" });
});

app.post("/auth/register", async (req, res) => {
  const nome = clean(req.body.nome || req.body.fullName);
  const email = clean(req.body.email).toLowerCase();
  const password = String(req.body.password || "");

  if (!nome) return res.status(400).json({ error: "Nome é obrigatório" });
  if (!email || !email.includes("@")) return res.status(400).json({ error: "Email inválido" });
  if (password.length < 6) return res.status(400).json({ error: "Senha deve ter no mínimo 6 caracteres" });

  const exists = await User.findOne({ where: { email } });
  if (exists) return res.status(409).json({ error: "Email já cadastrado" });

  const user = await User.create({
    nome,
    email,
    passwordHash: await bcrypt.hash(password, 10),
  });
  const token = crypto.randomBytes(36).toString("hex");
  await Session.create({ token, UserId: user.id, expiresAt: addHours(new Date(), SESSION_TTL_HOURS) });

  res.status(201).json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
});

app.post("/auth/login", async (req, res) => {
  const email = clean(req.body.email).toLowerCase();
  const password = String(req.body.password || "");
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }

  const token = crypto.randomBytes(36).toString("hex");
  await Session.create({ token, UserId: user.id, expiresAt: addHours(new Date(), SESSION_TTL_HOURS) });

  res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
});

app.post("/auth/recover", async (req, res) => {
  const email = clean(req.body.email).toLowerCase();
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ error: "Email não encontrado" });

  const temporaryPassword = crypto.randomBytes(5).toString("hex").toUpperCase();
  user.passwordHash = await bcrypt.hash(temporaryPassword, 10);
  await user.save();

  res.json({ temporaryPassword });
});

app.post("/auth/logout", requireAuth, async (req, res) => {
  await req.session.destroy();
  res.json({ success: true });
});

app.get("/auth/me", requireAuth, (req, res) => {
  res.json({ id: req.user.id, nome: req.user.nome, email: req.user.email });
});

app.get("/checklists", requireAuth, async (req, res) => {
  const checklists = await Checklist.findAll({ include: [{ model: ChecklistItem, as: "itens" }] });
  res.json(checklists.map(formatChecklist));
});

app.post("/checklists", requireAuth, async (req, res) => {
  const input = validateChecklistInput(req.body);
  if (input.error) return res.status(400).json({ error: input.error });

  const checklist = await sequelize.transaction(async (transaction) => {
    const created = await Checklist.create(
      { nome: input.nome, descricao: input.descricao },
      { transaction }
    );
    await ChecklistItem.bulkCreate(
      input.itens.map((descricao, index) => ({ descricao, ordem: index + 1, ChecklistId: created.id })),
      { transaction }
    );
    return created;
  });

  const created = await Checklist.findByPk(checklist.id, { include: [{ model: ChecklistItem, as: "itens" }] });
  res.status(201).json(formatChecklist(created));
});

app.put("/checklists/:id", requireAuth, async (req, res) => {
  const input = validateChecklistInput(req.body);
  if (input.error) return res.status(400).json({ error: input.error });

  const checklist = await Checklist.findByPk(toNumber(req.params.id));
  if (!checklist) return res.status(404).json({ error: "Checklist não encontrado" });

  await sequelize.transaction(async (transaction) => {
    await checklist.update({ nome: input.nome, descricao: input.descricao }, { transaction });
    await ChecklistItem.destroy({ where: { ChecklistId: checklist.id }, transaction });
    await ChecklistItem.bulkCreate(
      input.itens.map((descricao, index) => ({ descricao, ordem: index + 1, ChecklistId: checklist.id })),
      { transaction }
    );
  });

  const updated = await Checklist.findByPk(checklist.id, { include: [{ model: ChecklistItem, as: "itens" }] });
  res.json(formatChecklist(updated));
});

app.delete("/checklists/:id", requireAuth, async (req, res) => {
  const checklist = await Checklist.findByPk(toNumber(req.params.id));
  if (!checklist) return res.status(404).json({ error: "Checklist não encontrado" });

  const used = await Inspecao.count({ where: { ChecklistId: checklist.id } });
  if (used) return res.status(409).json({ error: "Checklist com inspeções não pode ser removido" });

  await checklist.destroy();
  res.status(204).send();
});

app.get("/obras", requireAuth, async (req, res) => {
  const where = req.query.status ? { status: req.query.status } : {};
  const obras = await Obra.findAll({
    where,
    include: [{ model: Checklist, as: "checklists", include: [{ model: ChecklistItem, as: "itens" }] }],
    order: [["createdAt", "DESC"]],
  });

  res.json(await Promise.all(obras.map(formatObra)));
});

app.post("/obras", requireAuth, async (req, res) => {
  const input = validateObraInput(req.body);
  if (input.error) return res.status(400).json({ error: input.error });

  const obra = await Obra.create(input);
  res.status(201).json(await formatObra(obra));
});

app.get("/obras/:id", requireAuth, async (req, res) => {
  const obra = await Obra.findByPk(toNumber(req.params.id), {
    include: [{ model: Checklist, as: "checklists", include: [{ model: ChecklistItem, as: "itens" }] }],
  });
  if (!obra) return res.status(404).json({ error: "Obra não encontrada" });

  res.json(await formatObra(obra));
});

app.put("/obras/:id", requireAuth, async (req, res) => {
  const input = validateObraInput(req.body);
  if (input.error) return res.status(400).json({ error: input.error });

  const obra = await Obra.findByPk(toNumber(req.params.id));
  if (!obra) return res.status(404).json({ error: "Obra não encontrada" });

  await obra.update({ ...input, status: clean(req.body.status) || obra.status });
  res.json(await formatObra(obra));
});

app.delete("/obras/:id", requireAuth, async (req, res) => {
  const obra = await Obra.findByPk(toNumber(req.params.id));
  if (!obra) return res.status(404).json({ error: "Obra não encontrada" });

  const inspections = await Inspecao.count({ where: { ObraId: obra.id } });
  if (inspections) {
    await obra.update({ status: "arquivada" });
    return res.json(await formatObra(obra));
  }

  await obra.destroy();
  res.status(204).send();
});

app.post("/obras/:id/vincular", requireAuth, async (req, res) => {
  const obra = await Obra.findByPk(toNumber(req.params.id));
  if (!obra) return res.status(404).json({ error: "Obra não encontrada" });

  const checklist = await Checklist.findByPk(toNumber(req.body.checklistId), {
    include: [{ model: ChecklistItem, as: "itens" }],
  });
  if (!checklist) return res.status(404).json({ error: "Checklist não encontrado" });

  await ObraChecklist.upsert({
    ObraId: obra.id,
    ChecklistId: checklist.id,
    dataVencimento: clean(req.body.dataVencimento) || null,
    vinculadoEm: today(),
  });

  res.json({
    success: true,
    vinculo: {
      id: checklist.id,
      nome: checklist.nome,
      itens: checklist.itens.length,
      data: formatDate(today()),
    },
  });
});

app.post("/inspecoes", requireAuth, async (req, res) => {
  const obraId = toNumber(req.body.obraId);
  const checklistId = toNumber(req.body.checklistId);

  const obra = await Obra.findByPk(obraId);
  const checklist = await Checklist.findByPk(checklistId, { include: [{ model: ChecklistItem, as: "itens" }] });
  if (!obra || !checklist) return res.status(400).json({ error: "Obra ou checklist inválido" });

  const linked = await ObraChecklist.findOne({ where: { ObraId: obra.id, ChecklistId: checklist.id } });
  if (!linked) return res.status(400).json({ error: "Checklist não está vinculado à obra" });

  const open = await Inspecao.findOne({ where: { ObraId: obra.id, status: "in-progress" } });
  if (open) return res.status(409).json({ error: "Já existe inspeção em andamento para esta obra", inspecaoId: open.id });

  const inspecao = await sequelize.transaction(async (transaction) => {
    const created = await Inspecao.create(
      {
        ObraId: obra.id,
        ChecklistId: checklist.id,
        UserId: req.user.id,
        responsavel: clean(req.body.responsavel) || req.user.nome,
        startTime: new Date(),
      },
      { transaction }
    );
    await InspecaoItem.bulkCreate(
      checklist.itens
        .sort((a, b) => a.ordem - b.ordem)
        .map((item) => ({
          InspecaoId: created.id,
          descricao: item.descricao,
          ordem: item.ordem,
          conforme: null,
          observacoes: "",
        })),
      { transaction }
    );
    return created;
  });

  const created = await Inspecao.findByPk(inspecao.id, { include: [{ model: InspecaoItem, as: "itens" }] });
  res.status(201).json(created);
});

app.post("/inspecoes/:id/finish", requireAuth, async (req, res) => {
  const inspecao = await Inspecao.findByPk(toNumber(req.params.id), {
    include: [{ model: InspecaoItem, as: "itens" }],
  });
  if (!inspecao) return res.status(404).json({ error: "Inspeção não encontrada" });
  if (inspecao.status === "finished") return res.status(409).json({ error: "Inspeção já finalizada" });

  const responses = Array.isArray(req.body.responses) ? req.body.responses : [];
  if (responses.length !== inspecao.itens.length) {
    return res.status(400).json({ error: "Todos os itens devem ser respondidos" });
  }

  await sequelize.transaction(async (transaction) => {
    for (const response of responses) {
      if (typeof response.conforme !== "boolean") {
        throw new Error("Todos os itens devem ser respondidos");
      }

      const item = inspecao.itens.find((candidate) => candidate.ordem === Number(response.index) + 1);
      if (!item) throw new Error("Resposta inválida");

      await item.update(
        { conforme: response.conforme, observacoes: clean(response.observacoes) },
        { transaction }
      );
    }

    const conformes = responses.filter((item) => item.conforme === true).length;
    await inspecao.update(
      {
        conformidade: Math.round((conformes / inspecao.itens.length) * 100),
        endTime: new Date(),
        status: "finished",
      },
      { transaction }
    );
  });

  const finished = await Inspecao.findByPk(inspecao.id, { include: [{ model: InspecaoItem, as: "itens" }] });
  res.json(finished);
});

app.get("/inspecoes/:id", requireAuth, async (req, res) => {
  const inspecao = await Inspecao.findByPk(toNumber(req.params.id), {
    include: [Obra, Checklist, { model: InspecaoItem, as: "itens" }],
  });
  if (!inspecao) return res.status(404).json({ error: "Inspeção não encontrada" });

  res.json({
    id: inspecao.id,
    obraId: inspecao.ObraId,
    checklistId: inspecao.ChecklistId,
    obraNome: inspecao.Obra?.nome || "",
    checklistNome: inspecao.Checklist?.nome || "",
    responsavel: inspecao.responsavel,
    startTime: inspecao.startTime,
    endTime: inspecao.endTime,
    status: inspecao.status,
    conformidade: inspecao.conformidade,
    itens: inspecao.itens.sort((a, b) => a.ordem - b.ordem).map((item, index) => ({
      index,
      descricao: item.descricao,
      conforme: item.conforme,
      observacoes: item.observacoes || "",
    })),
  });
});

app.get("/inspecoes", requireAuth, async (req, res) => {
  const where = { status: "finished" };
  if (req.query.obraId) where.ObraId = toNumber(req.query.obraId);

  const inspecoes = await Inspecao.findAll({
    where,
    include: [Obra, Checklist],
    order: [["endTime", "DESC"]],
    limit: req.query.limit ? toNumber(req.query.limit) : undefined,
  });

  res.json(inspecoes.map((inspecao) => ({
    id: inspecao.id,
    obraId: inspecao.ObraId,
    obra: inspecao.Obra?.nome || "",
    checklistId: inspecao.ChecklistId,
    checklist: inspecao.Checklist?.nome || "",
    responsavel: inspecao.responsavel,
    conformidade: inspecao.conformidade,
    data: inspecao.endTime ? inspecao.endTime.toLocaleDateString("pt-BR") : null,
  })));
});

app.get("/dashboard", requireAuth, async (req, res) => {
  const [totalObras, totalInspecoes, finished] = await Promise.all([
    Obra.count(),
    Inspecao.count({ where: { status: "finished" } }),
    Inspecao.findAll({ where: { status: "finished" }, include: [Obra, Checklist], order: [["endTime", "DESC"]] }),
  ]);

  const media = finished.length
    ? Math.round(finished.reduce((total, item) => total + item.conformidade, 0) / finished.length)
    : 0;

  res.json({
    totalObras,
    totalInspecoes,
    conformidadeMedia: media,
    conformes: finished.filter((item) => item.conformidade >= 70).length,
    naoConformes: finished.filter((item) => item.conformidade < 70).length,
    ultimasInspecoes: finished.slice(0, 10).map((inspecao) => ({
      id: inspecao.id,
      obraId: inspecao.ObraId,
      obra: inspecao.Obra?.nome || "",
      checklistId: inspecao.ChecklistId,
      checklist: inspecao.Checklist?.nome || "",
      responsavel: inspecao.responsavel,
      conformidade: inspecao.conformidade,
      data: inspecao.endTime ? inspecao.endTime.toLocaleDateString("pt-BR") : null,
    })),
  });
});

app.use((err, req, res, next) => {
  if (err.message === "Todos os itens devem ser respondidos" || err.message === "Resposta inválida") {
    return res.status(400).json({ error: err.message });
  }

  console.error(err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

const seedDatabase = async () => {
  const userCount = await User.count();
  if (!userCount) {
    await User.create({
      nome: "Usuário Demo",
      email: "demo@padraocerto.com",
      passwordHash: await bcrypt.hash("123456", 10),
    });
  }

  const checklistCount = await Checklist.count();
  if (!checklistCount) {
    const defaults = [
      { nome: "Estrutura Civil", descricao: "Avaliação da estrutura", itens: ["Fundações", "Pilares", "Vigas", "Lajes"] },
      { nome: "Segurança", descricao: "Itens de segurança", itens: ["EPI", "Sinalização", "Acesso seguro"] },
      { nome: "Hidráulica", descricao: "Sistema hidráulico", itens: ["Tubulações", "Conexões", "Testes de pressão"] },
      { nome: "Elétrica", descricao: "Sistema elétrico", itens: ["Fiação", "Quadros", "Tomadas", "Iluminação"] },
    ];

    for (const item of defaults) {
      const checklist = await Checklist.create({ nome: item.nome, descricao: item.descricao });
      await ChecklistItem.bulkCreate(
        item.itens.map((descricao, index) => ({ ChecklistId: checklist.id, descricao, ordem: index + 1 }))
      );
    }
  }
};

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

start().catch((error) => {
  console.error("Falha ao iniciar servidor", error);
  process.exit(1);
});
