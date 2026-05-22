const API_URL = process.env.API_URL || "http://localhost:3000";

const state = {
  token: "",
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.error || response.statusText;
    throw new Error(`${options.method || "GET"} ${path} -> ${response.status}: ${message}`);
  }

  return data;
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const unique = Date.now();

const run = async () => {
  const health = await request("/health");
  assert(health.status === "ok" && health.database === "connected", "Healthcheck não confirmou banco conectado");

  const auth = await request("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      nome: "Teste Automatizado",
      email: `smoke.${unique}@padraocerto.test`,
      password: "123456",
    }),
  });
  state.token = auth.token;
  assert(auth.user?.email, "Cadastro não retornou usuário autenticado");

  const obra = await request("/obras", {
    method: "POST",
    body: JSON.stringify({
      nome: `Obra Smoke ${unique}`,
      localizacao: "Rua de Teste, 100",
      responsavel: "Teste Automatizado",
      dataInicio: "2026-05-19",
      descricao: "Obra criada pelo smoke test",
    }),
  });
  assert(obra.id, "Obra não foi criada");

  const checklist = await request("/checklists", {
    method: "POST",
    body: JSON.stringify({
      nome: `Checklist Smoke ${unique}`,
      descricao: "Checklist criado pelo smoke test",
      itens: ["Fundação conferida", "Pilares conferidos", "Laje conferida"],
    }),
  });
  assert(checklist.itens.length === 3, "Checklist não retornou os 3 itens esperados");

  const vinculo = await request(`/obras/${obra.id}/vincular`, {
    method: "POST",
    body: JSON.stringify({ checklistId: checklist.id }),
  });
  assert(vinculo.success === true, "Checklist não foi vinculado à obra");

  const inspecao = await request("/inspecoes", {
    method: "POST",
    body: JSON.stringify({
      obraId: obra.id,
      checklistId: checklist.id,
      responsavel: "Teste Automatizado",
    }),
  });
  assert(inspecao.itens.length === 3, "Inspeção não recebeu itens do checklist");

  const finalizada = await request(`/inspecoes/${inspecao.id}/finish`, {
    method: "POST",
    body: JSON.stringify({
      responses: [
        { index: 0, conforme: true, observacoes: "" },
        { index: 1, conforme: true, observacoes: "" },
        { index: 2, conforme: false, observacoes: "Não conformidade de teste" },
      ],
    }),
  });
  assert(finalizada.status === "finished", "Inspeção não foi finalizada");
  assert(finalizada.conformidade === 67, `Conformidade esperada 67%, recebida ${finalizada.conformidade}%`);

  const relatorio = await request(`/inspecoes/${inspecao.id}`);
  assert(relatorio.obraNome === obra.nome, "Relatório não retornou nome da obra");
  assert(relatorio.checklistNome === checklist.nome, "Relatório não retornou nome do checklist");
  assert(relatorio.itens.some((item) => item.conforme === false), "Relatório não preservou item não conforme");

  const dashboard = await request("/dashboard");
  assert(dashboard.totalObras >= 1, "Dashboard não contou obras");
  assert(dashboard.totalInspecoes >= 1, "Dashboard não contou inspeções");
  assert(dashboard.ultimasInspecoes.some((item) => item.id === inspecao.id), "Dashboard não listou inspeção recente");

  console.log("Smoke test API concluído com sucesso");
  console.log(`Obra: ${obra.id} | Checklist: ${checklist.id} | Inspeção: ${inspecao.id} | Conformidade: ${finalizada.conformidade}%`);
};

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
