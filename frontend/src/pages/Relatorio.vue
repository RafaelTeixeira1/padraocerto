<template>
  <div class="min-h-screen bg-background p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <button @click="router.back()" class="text-secondary hover:underline mb-4">← Voltar</button>
      </div>

      <!-- Success Status -->
      <div class="rounded-lg border border-green-200 bg-green-50 p-8 text-center shadow-sm mb-8">
        <div class="text-6xl mb-4">✅</div>
        <h1 class="text-3xl font-bold text-green-900 mb-2">Inspeção Finalizada</h1>
        <p class="text-green-700">Relatório gerado em {{ reportDate }} às {{ reportTime }}</p>
      </div>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Info Card -->
        <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h3 class="text-sm font-medium text-muted-foreground mb-4">Informações da Inspeção</h3>
          <div class="space-y-3 text-sm">
              <div>
                <p class="text-xs text-muted-foreground">Obra</p>
                <p class="font-medium text-foreground">{{ report.obra }}</p>
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Checklist</p>
                <p class="font-medium text-foreground">{{ report.checklist }}</p>
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Responsável</p>
                <p class="font-medium text-foreground">{{ report.responsavel }}</p>
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Total de Itens</p>
                <p class="font-medium text-foreground">{{ report.totalItens }}</p>
              </div>
          </div>
        </div>

        <!-- Conformity Card -->
        <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h3 class="text-sm font-medium text-muted-foreground mb-4">Taxa de Conformidade</h3>
          <div class="flex flex-col items-center justify-center">
            <div class="text-5xl font-bold text-green-600 mb-3">{{ report.conformidade }}%</div>
            <div class="w-full bg-muted rounded-full h-3 mb-4">
              <div class="bg-green-500 h-3 rounded-full" :style="{ width: report.conformidade + '%' }"></div>
            </div>
            <div class="space-y-2 text-sm w-full">
              <div class="flex justify-between">
                <span class="text-foreground">Conformes:</span>
                <span class="font-semibold text-green-600">{{ report.conformes }} itens</span>
              </div>
              <div class="flex justify-between">
                <span class="text-foreground">Não-conformes:</span>
                <span class="font-semibold text-red-600">{{ report.naoConformes }} item</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h3 class="text-sm font-medium text-muted-foreground mb-4">Resumo</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <span class="text-2xl">✅</span>
              <div>
                <p class="text-xs text-green-600 font-medium">Conformes</p>
                <p class="text-lg font-bold text-green-700">{{ report.conformes }} de {{ report.totalItens }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <span class="text-2xl">❌</span>
              <div>
                <p class="text-xs text-red-600 font-medium">Não-conformes</p>
                <p class="text-lg font-bold text-red-700">{{ report.naoConformes }} de {{ report.totalItens }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Items Detail -->
      <div class="bg-card rounded-lg border border-border p-6 shadow-sm mb-8">
        <h2 class="text-lg font-semibold text-foreground mb-4">Detalhes dos Itens</h2>

        <div class="space-y-3">
          <div v-for="(item, idx) in report.itens" :key="idx" :class="['p-4 rounded-lg', item.conforme === true ? 'border border-green-200 bg-green-50' : item.conforme === false ? 'border border-red-200 bg-red-50' : 'border border-border bg-card']">
            <div class="flex gap-3">
              <span class="text-2xl">{{ item.conforme === true ? '✅' : item.conforme === false ? '❌' : 'ℹ️' }}</span>
              <div class="flex-1">
                <p class="font-medium text-foreground">{{ idx + 1 }}: {{ item.descricao }}</p>
                <p class="text-xs text-muted-foreground mt-1">Status: <span :class="item.conforme === true ? 'text-green-600 font-semibold' : item.conforme === false ? 'text-red-600 font-semibold' : 'text-muted-foreground'">{{ item.conforme === true ? 'Conforme' : item.conforme === false ? 'Não Conforme' : 'Não respondido' }}</span></p>
                <div v-if="item.observacoes" class="mt-2 p-2 bg-white rounded border border-red-100">
                  <p class="text-sm text-foreground"><span class="font-medium">Observação:</span> {{ item.observacoes }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 justify-center">
        <Button variant="outline" @click="router.push('/')">
          Voltar ao Dashboard
        </Button>
        <Button variant="secondary" @click="startNewInspection">
          + Nova Inspeção
        </Button>
        <Button variant="primary">
          📄 Gerar PDF
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { Button } from '../components/ui'

const router = useRouter()
const route = useRoute()

const reportDate = ref('')
const reportTime = ref('')
const report = ref({
  obra: '',
  checklist: '',
  responsavel: '',
  totalItens: 0,
  conformidade: 0,
  conformes: 0,
  naoConformes: 0,
  itens: []
})

onMounted(async () => {
  const now = new Date()
  reportDate.value = now.toLocaleDateString('pt-BR')
  reportTime.value = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  const id = route.params.id
  if (id) {
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      const res = await axios.get(`${base}/inspecoes/${id}`)
      const data = res.data
      report.value.obra = data.obraNome || ''
      report.value.checklist = data.checklistNome || ''
      report.value.responsavel = data.responsavel
      report.value.totalItens = data.itens.length
      report.value.conformidade = data.conformidade
      report.value.conformes = data.itens.filter(i => i.conforme === true).length
      report.value.naoConformes = data.itens.filter(i => i.conforme === false).length
      report.value.itens = data.itens
    } catch (err) {
      console.error(err)
    }
  } else {
    // fallback: usar dados estáticos
    report.value = {
      obra: 'Centro Comercial',
      checklist: 'Estrutura Civil',
      responsavel: 'João Silva',
      totalItens: 5,
      conformidade: 88,
      conformes: 4,
      naoConformes: 1,
      itens: [
        { descricao: 'Fundações executadas corretamente', conforme: true, observacoes: '' },
        { descricao: 'Pilares alinhados e com espaçamento correto', conforme: true, observacoes: '' },
        { descricao: 'Vigas principais com apoio adequado', conforme: false, observacoes: 'Viga B3 apresenta pequeno desalinhamento de 1,5cm' },
        { descricao: 'Lajes sem fissuras aparentes', conforme: true, observacoes: '' },
        { descricao: 'Escoramentos removidos conforme cronograma', conforme: true, observacoes: '' }
      ]
    }
  }
})

const startNewInspection = () => {
  router.push('/')
}
</script>
