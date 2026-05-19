const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API PadrãoCerto rodando");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Dados em memória (mock simples)
let checklists = [
  { id: 1, nome: 'Estrutura Civil', descricao: 'Avaliação da estrutura', itens: ['Fundações', 'Pilares', 'Vigas', 'Lajes'] },
  { id: 2, nome: 'Segurança', descricao: 'Itens de segurança', itens: ['EPI', 'Sinalização', 'Acesso seguro'] },
  { id: 3, nome: 'Hidráulica', descricao: 'Sistema hidráulico', itens: ['Tubulações', 'Conexões', 'Testes de pressão'] },
  { id: 4, nome: 'Elétrica', descricao: 'Sistema elétrico', itens: ['Fiação', 'Quadros', 'Tomadas', 'Iluminação'] }
]

let nextChecklistId = checklists.length + 1

let obras = [
  { id: 1, nome: 'Centro Comercial', localizacao: 'Av. Paulista, 1000 - São Paulo, SP', responsavel: 'João Silva', dataInicio: '01/03/2026', status: 'ativa', checklists: [], historico: [] }
]

let inspecoes = []
let nextInspecaoId = 1

app.get('/checklists', (req, res) => {
  res.json(checklists)
})

app.post('/checklists', (req, res) => {
  const { nome, descricao = '', itens = [] } = req.body

  if (!nome || !String(nome).trim()) {
    return res.status(400).json({ error: 'Nome do checklist é obrigatório' })
  }

  const normalizedItems = Array.isArray(itens)
    ? itens.map(item => (typeof item === 'string' ? item.trim() : String(item?.descricao || '').trim()))
    : []

  const filledItems = normalizedItems.filter(Boolean)
  if (filledItems.length < 3) {
    return res.status(400).json({ error: 'Mínimo de 3 itens é obrigatório' })
  }

  const checklist = {
    id: nextChecklistId++,
    nome: String(nome).trim(),
    descricao: String(descricao).trim(),
    itens: filledItems
  }

  checklists.push(checklist)
  res.status(201).json(checklist)
})

app.get('/obras', (req, res) => {
  res.json(obras)
})

app.post('/obras', (req, res) => {
  const { nome, localizacao, responsavel, dataInicio, descricao } = req.body
  const id = obras.length + 1
  const nova = { id, nome, localizacao, responsavel, dataInicio, descricao, status: 'ativa', checklists: [], historico: [] }
  obras.push(nova)
  res.status(201).json(nova)
})

app.get('/obras/:id', (req, res) => {
  const obra = obras.find(o => o.id === parseInt(req.params.id))
  if (!obra) return res.status(404).json({ error: 'Obra não encontrada' })
  res.json(obra)
})

app.post('/obras/:id/vincular', (req, res) => {
  const obra = obras.find(o => o.id === parseInt(req.params.id))
  if (!obra) return res.status(404).json({ error: 'Obra não encontrada' })
  const { checklistId, dataVencimento } = req.body
  const checklist = checklists.find(c => c.id === parseInt(checklistId))
  if (!checklist) return res.status(404).json({ error: 'Checklist não encontrado' })
  const vinculo = { id: checklist.id, nome: checklist.nome, itens: checklist.itens.length, data: dataVencimento || new Date().toLocaleDateString('pt-BR') }
  const existingIndex = obra.checklists.findIndex(c => c.id === vinculo.id)
  if (existingIndex >= 0) {
    obra.checklists[existingIndex] = vinculo
  } else {
    obra.checklists.push(vinculo)
  }
  res.json({ success: true, vinculo })
})

// Inspeções
app.post('/inspecoes', (req, res) => {
  const { obraId, checklistId, responsavel } = req.body
  const obra = obras.find(o => o.id === parseInt(obraId))
  const checklist = checklists.find(c => c.id === parseInt(checklistId))
  if (!obra || !checklist) return res.status(400).json({ error: 'Obra ou checklist inválido' })
  const id = nextInspecaoId++
  const inspecao = {
    id,
    obraId: obra.id,
    checklistId: checklist.id,
    responsavel: responsavel || 'Anônimo',
    itens: checklist.itens.map((desc, idx) => ({ index: idx, descricao: desc, conforme: null, observacoes: '' })),
    startTime: new Date(),
    endTime: null,
    status: 'in-progress',
    conformidade: null
  }
  inspecoes.push(inspecao)
  res.status(201).json(inspecao)
})

app.post('/inspecoes/:id/finish', (req, res) => {
  const inspecao = inspecoes.find(i => i.id === parseInt(req.params.id))
  if (!inspecao) return res.status(404).json({ error: 'Inspeção não encontrada' })
  const { responses } = req.body
  // aplicar respostas
  responses.forEach(r => {
    const item = inspecao.itens[r.index]
    if (item) {
      item.conforme = r.conforme
      item.observacoes = r.observacoes || ''
    }
  })
  const conformes = inspecao.itens.filter(it => it.conforme === true).length
  inspecao.conformidade = Math.round((conformes / inspecao.itens.length) * 100)
  inspecao.endTime = new Date()
  inspecao.status = 'finished'
  // adicionar ao histórico da obra
  const obra = obras.find(o => o.id === inspecao.obraId)
  if (obra) {
    obra.historico.push({ id: inspecao.id, checklist: checklists.find(c => c.id === inspecao.checklistId).nome, responsavel: inspecao.responsavel, conformidade: inspecao.conformidade, data: inspecao.endTime.toLocaleDateString('pt-BR') })
  }
  res.json(inspecao)
})

app.get('/inspecoes/:id', (req, res) => {
  const inspecao = inspecoes.find(i => i.id === parseInt(req.params.id))
  if (!inspecao) return res.status(404).json({ error: 'Inspeção não encontrada' })
  const obra = obras.find(o => o.id === inspecao.obraId)
  const checklist = checklists.find(c => c.id === inspecao.checklistId)
  res.json({
    ...inspecao,
    obraNome: obra ? obra.nome : '',
    checklistNome: checklist ? checklist.nome : ''
  })
})

app.get('/inspecoes', (req, res) => {
  // opcional: filtrar por obraId
  const obraId = req.query.obraId ? parseInt(req.query.obraId) : null
  let list = inspecoes.filter(i => i.status === 'finished')
  if (obraId) list = list.filter(i => i.obraId === obraId)
  res.json(list.map(i => {
    const obra = obras.find(o => o.id === i.obraId)
    const checklist = checklists.find(c => c.id === i.checklistId)
    return {
      id: i.id,
      obraId: i.obraId,
      obra: obra ? obra.nome : '',
      checklistId: i.checklistId,
      checklist: checklist ? checklist.nome : '',
      responsavel: i.responsavel,
      conformidade: i.conformidade,
      data: i.endTime ? i.endTime.toLocaleDateString('pt-BR') : null
    }
  }))
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});