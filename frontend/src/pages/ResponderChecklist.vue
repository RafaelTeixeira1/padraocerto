<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-4xl mx-auto p-6">
      <!-- Header -->
      <div class="mb-8">
        <button @click="router.back()" class="text-secondary hover:underline mb-4">← Voltar</button>
        <h1 class="text-3xl font-bold text-foreground mb-2">Inspeção em Andamento</h1>
        <p class="text-muted-foreground">{{ checklist.obra }} • {{ checklist.nome }}</p>
        <p v-if="loadError" class="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {{ loadError }}
        </p>
      </div>

      <!-- Progress Bar -->
      <div class="bg-card rounded-lg border border-border p-6 shadow-sm mb-6">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-sm font-medium text-foreground">Progresso da Inspeção</h3>
          <span class="text-sm font-semibold text-secondary">{{ currentItemIndex + 1 }} de {{ checklist.itens.length }}</span>
        </div>
        <div class="w-full bg-muted rounded-full h-3">
          <div
            class="h-3 rounded-full bg-primary transition-all duration-300"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>
        <div class="flex justify-between mt-3 text-xs text-muted-foreground">
          <span>{{ respondidos }} respondidos</span>
          <span>{{ checklist.itens.length - respondidos }} pendentes</span>
        </div>
      </div>

      <!-- Current Item -->
      <div class="bg-card rounded-lg border border-border p-8 shadow-sm mb-6">
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-foreground mb-3">
            {{ currentItem.numero }}. {{ currentItem.descricao }}
          </h2>
          <p v-if="currentItem.detalhe" class="text-muted-foreground">{{ currentItem.detalhe }}</p>
        </div>

        <!-- Response Options -->
        <div class="mb-6 space-y-3">
          <label class="flex items-center gap-3 p-3 border border-input rounded-lg hover:bg-muted/50 cursor-pointer transition-colors" :class="{ 'border-green-500 bg-green-50': responses[currentItemIndex]?.conforme === true }">
            <input
              type="radio"
              :value="true"
              v-model="responses[currentItemIndex].conforme"
              class="h-4 w-4 text-green-600"
            />
            <span class="flex-1">
              <span class="font-medium text-foreground">✅ Conforme</span>
              <p class="text-xs text-muted-foreground">Item atende aos critérios</p>
            </span>
          </label>

          <label class="flex items-center gap-3 p-3 border border-input rounded-lg hover:bg-muted/50 cursor-pointer transition-colors" :class="{ 'border-red-500 bg-red-50': responses[currentItemIndex]?.conforme === false }">
            <input
              type="radio"
              :value="false"
              v-model="responses[currentItemIndex].conforme"
              class="h-4 w-4 text-red-600"
            />
            <span class="flex-1">
              <span class="font-medium text-foreground">❌ Não Conforme</span>
              <p class="text-xs text-muted-foreground">Item não atende aos critérios</p>
            </span>
          </label>
        </div>

        <!-- Observations -->
        <div class="mb-6">
          <label for="obs" class="block text-sm font-medium text-foreground mb-2">
            Observações (Opcional)
          </label>
          <textarea
            id="obs"
            v-model="responses[currentItemIndex].observacoes"
            placeholder="Adicione observações sobre este item..."
            rows="3"
            class="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          ></textarea>
        </div>

        <!-- Actions -->
        <div class="flex justify-between gap-3">
          <Button @click="previousItem" variant="outline" :disabled="currentItemIndex === 0">
            ← Item Anterior
          </Button>

          <div class="text-center text-sm text-muted-foreground py-2">
            {{ currentItemIndex + 1 }} / {{ checklist.itens.length }}
          </div>

          <Button
            @click="isLastItem ? finishInspection() : nextItem()"
            variant="primary"
            :disabled="responses[currentItemIndex].conforme === null"
          >
            {{ isLastItem ? 'Finalizar Inspeção' : 'Próximo Item' }} →
          </Button>
        </div>
      </div>

      <!-- Item Status Summary -->
      <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 class="text-sm font-medium text-foreground mb-4">Status dos Itens</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            v-for="(item, idx) in checklist.itens"
            :key="idx"
            @click="goToItem(idx)"
            :class="{
              'bg-primary text-primary-foreground': currentItemIndex === idx,
              'bg-green-100 text-green-800': responses[idx]?.conforme === true,
              'bg-red-100 text-red-800': responses[idx]?.conforme === false,
              'bg-muted text-muted-foreground': responses[idx]?.conforme === null
            }"
            class="p-3 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
          >
            {{ idx + 1 }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { Button } from '../components/ui'

const router = useRouter()
const route = useRoute()

const checklist = ref({
  obra: 'Centro Comercial',
  nome: 'Estrutura Civil',
  itens: [
    { numero: 'Item 1', descricao: 'Fundações executadas corretamente', detalhe: 'Verificar se as fundações estão niveladas e com profundidade adequada' },
    { numero: 'Item 2', descricao: 'Pilares alinhados e com espaçamento correto', detalhe: 'Medir distância entre pilares - deve estar dentro de ±2cm' },
    { numero: 'Item 3', descricao: 'Vigas principais com apoio adequado', detalhe: 'Vigas devem descansar completamente sobre os pilares' },
    { numero: 'Item 4', descricao: 'Lajes sem fissuras aparentes', detalhe: 'Verificar presença de trincas ou rachaduras' },
    { numero: 'Item 5', descricao: 'Escoramentos removidos conforme cronograma', detalhe: 'Comparar com data prevista de remoção' }
  ]
})

const inspectionId = ref(route.query.inspecao ? String(route.query.inspecao) : '')
const loading = ref(false)
const loadError = ref('')

const currentItemIndex = ref(0)
const responses = ref(checklist.value.itens.map(() => ({
  conforme: null,
  observacoes: ''
})))

const currentItem = computed(() => checklist.value.itens[currentItemIndex.value])
const isLastItem = computed(() => currentItemIndex.value === checklist.value.itens.length - 1)
const respondidos = computed(() => responses.value.filter(r => r.conforme !== null).length)
const progressPercent = computed(() => Math.round((respondidos.value / checklist.value.itens.length) * 100))

onMounted(async () => {
  if (!inspectionId.value) {
    loadError.value = 'Inspeção não informada'
    return
  }

  loading.value = true
  try {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    const res = await axios.get(`${base}/inspecoes/${inspectionId.value}`)
    const inspection = res.data

    const [obraRes, checklistsRes] = await Promise.all([
      axios.get(`${base}/obras/${inspection.obraId}`),
      axios.get(`${base}/checklists`)
    ])

    const checklistData = checklistsRes.data.find(item => item.id === inspection.checklistId)
    const itens = inspection.itens.map((item, index) => ({
      numero: `Item ${index + 1}`,
      descricao: item.descricao,
      detalhe: checklistData?.itens?.[index] ? `Referência: ${checklistData.itens[index]}` : ''
    }))

    checklist.value = {
      obra: obraRes.data.nome,
      nome: checklistData ? checklistData.nome : 'Checklist',
      itens
    }

    responses.value = inspection.itens.map(item => ({
      conforme: item.conforme,
      observacoes: item.observacoes || ''
    }))

    currentItemIndex.value = 0
  } catch (error) {
    console.error(error)
    loadError.value = 'Não foi possível carregar a inspeção'
  } finally {
    loading.value = false
  }
})

const nextItem = () => {
  if (currentItemIndex.value < checklist.value.itens.length - 1) {
    currentItemIndex.value++
  }
}

const previousItem = () => {
  if (currentItemIndex.value > 0) {
    currentItemIndex.value--
  }
}

const goToItem = (index) => {
  currentItemIndex.value = index
}

const finishInspection = async () => {
  if (respondidos.value < checklist.value.itens.length) {
    alert('Por favor, responda todos os itens antes de finalizar')
    return
  }

  const inspecaoId = route.query.inspecao
  const responsesPayload = responses.value.map((r, idx) => ({ index: idx, conforme: r.conforme, observacoes: r.observacoes }))

  try {
    if (inspecaoId) {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      await axios.post(`${base}/inspecoes/${inspecaoId}/finish`, { responses: responsesPayload })
      router.push({ name: 'relatorio', params: { id: inspecaoId } })
    } else {
      alert('Inspeção não informada')
    }
  } catch (err) {
    console.error(err)
    alert(err.response?.data?.error || 'Erro ao finalizar inspeção')
  }
}
</script>
