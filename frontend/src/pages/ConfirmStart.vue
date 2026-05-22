<template>
  <div class="min-h-screen bg-background p-6">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Confirmar Início da Inspeção</h1>
      <div class="bg-card rounded-lg p-6 border border-border mb-4">
        <p class="text-sm text-muted-foreground">Obra: <span class="font-medium">{{ obra.nome }}</span></p>
        <p class="text-sm text-muted-foreground">Checklist: <span class="font-medium">{{ checklist.nome }}</span></p>
        <p class="text-sm text-muted-foreground">Itens: <span class="font-medium">{{ checklist.itens.length }}</span></p>
        <p class="text-sm text-muted-foreground">Responsável: <span class="font-medium">{{ responsavel }}</span></p>
      </div>

      <div class="flex gap-3">
        <button :disabled="loading" @click="confirmStart" class="px-4 py-2 bg-primary text-white rounded disabled:opacity-70">
          {{ loading ? 'Iniciando...' : 'Confirmar Início' }}
        </button>
        <button @click="router.back()" class="px-4 py-2 bg-muted rounded">Cancelar</button>
      </div>
      <p v-if="errorMessage" class="mt-4 text-sm text-red-600">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { showFeedback } from '../utils/feedback'

const route = useRoute()
const router = useRouter()

const obraId = route.params.obraId
const checklistId = route.params.checklistId

const obra = ref({ nome: 'Carregando...' })
const checklist = ref({ nome: 'Carregando...', itens: [] })
const loading = ref(false)
const errorMessage = ref('')
const responsavel = ref(localStorage.getItem('userName') || 'Usuário logado')

onMounted(async () => {
  try {
    const [oRes, cRes] = await Promise.all([
      axios.get(`/obras/${obraId}`),
      axios.get('/checklists')
    ])
    obra.value = oRes.data
    const list = cRes.data
    checklist.value = list.find(c => c.id === parseInt(checklistId)) || { nome: 'Desconhecido', itens: [] }
  } catch (err) {
    console.error(err)
  }
})

const confirmStart = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const res = await axios.post('/inspecoes', {
      obraId,
      checklistId,
      responsavel: responsavel.value
    })
    const inspecao = res.data
    showFeedback({ title: 'Inspeção iniciada', message: 'Responda todos os itens para finalizar.' })
    router.push(`/obras/${obraId}/checklist/${checklistId}/responder?inspecao=${inspecao.id}`)
  } catch (err) {
    console.error(err)
    if (err.response?.status === 409 && err.response?.data?.inspecaoId) {
      router.push(`/obras/${obraId}/checklist/${checklistId}/responder?inspecao=${err.response.data.inspecaoId}`)
      return
    }

    errorMessage.value = err.response?.data?.error || 'Erro ao iniciar inspeção'
    showFeedback({ type: 'error', title: 'Erro ao iniciar inspeção', message: errorMessage.value })
  } finally {
    loading.value = false
  }
}
</script>
