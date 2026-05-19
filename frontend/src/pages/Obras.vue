<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-foreground">Obras</h1>
        <p class="text-sm text-muted-foreground">Gerenciamento de projetos de construção</p>
      </div>
      <Button @click="showNewObraModal = true" variant="primary">
        <span class="mr-2">+</span> Nova Obra
      </Button>
    </div>

    <!-- Search and Filters -->
    <div class="bg-card rounded-lg border border-border p-4 mb-6 shadow-sm">
      <div class="flex gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por nome ou localização..."
          class="flex-1 px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <select
          v-model="filterStatus"
          class="px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Todos os Status</option>
          <option value="ativa">Ativa</option>
          <option value="finalizada">Finalizada</option>
          <option value="pausada">Pausada</option>
        </select>
      </div>
    </div>

    <!-- Obras Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link
        v-for="obra in filteredObras"
        :key="obra.id"
        :to="`/obras/${obra.id}`"
        class="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md hover:border-secondary transition-all cursor-pointer"
      >
        <div class="flex justify-between items-start mb-3">
          <div>
            <h3 class="text-lg font-semibold text-foreground">{{ obra.nome }}</h3>
            <p class="text-sm text-muted-foreground">{{ obra.localizacao }}</p>
          </div>
          <span
            :class="{
              'bg-green-100 text-green-800': obra.status === 'ativa',
              'bg-gray-100 text-gray-800': obra.status === 'finalizada',
              'bg-yellow-100 text-yellow-800': obra.status === 'pausada'
            }"
            class="px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ obra.status.charAt(0).toUpperCase() + obra.status.slice(1) }}
          </span>
        </div>

        <div class="space-y-2 mb-4">
          <p class="text-sm text-muted-foreground">
            <span class="font-medium text-foreground">Responsável:</span> {{ obra.responsavel }}
          </p>
          <p class="text-sm text-muted-foreground">
            <span class="font-medium text-foreground">Início:</span> {{ obra.dataInicio }}
          </p>
          <p class="text-sm text-muted-foreground">
            <span class="font-medium text-foreground">Inspeções:</span>
            <span class="font-semibold text-foreground">{{ obra.inspecoes }}</span>
          </p>
        </div>

        <div class="pt-4 border-t border-border">
          <div class="flex justify-between text-xs text-muted-foreground">
            <span>Taxa de Conformidade</span>
            <span
              :class="{
                'text-green-600': obra.conformidade >= 80,
                'text-yellow-600': obra.conformidade >= 60,
                'text-red-600': obra.conformidade < 60
              }"
              class="font-semibold"
            >
              {{ obra.conformidade }}%
            </span>
          </div>
          <div class="w-full bg-muted rounded-full h-2 mt-2">
            <div
              class="h-2 rounded-full transition-all"
              :class="{
                'bg-green-500': obra.conformidade >= 80,
                'bg-yellow-500': obra.conformidade >= 60 && obra.conformidade < 80,
                'bg-red-500': obra.conformidade < 60
              }"
              :style="{ width: obra.conformidade + '%' }"
            ></div>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Empty State -->
    <div v-if="filteredObras.length === 0" class="text-center py-12">
      <p class="text-4xl mb-4">🏗️</p>
      <h3 class="text-lg font-semibold text-foreground mb-2">Nenhuma obra encontrada</h3>
      <p class="text-muted-foreground mb-6">Comece criando uma nova obra</p>
      <Button @click="showNewObraModal = true" variant="primary">Nova Obra</Button>
    </div>

    <!-- Modal -->
    <NewObraModal :open="showNewObraModal" @close="showNewObraModal = false" @submit="handleNewObra" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Button } from '../components/ui'
import { NewObraModal } from '../components/modals'
import axios from 'axios'
import { showFeedback } from '../utils/feedback'

const searchQuery = ref('')
const filterStatus = ref('')
const showNewObraModal = ref(false)

const mockObras = ref([])

const loadObras = async () => {
  const base = import.meta.env.VITE_API_URL || 'http://localhost:3000'
  const response = await axios.get(`${base}/obras`)
  mockObras.value = response.data.map(obra => ({
    ...obra,
    inspecoes: obra.historico?.length || 0,
    conformidade: obra.historico?.length
      ? Math.round(obra.historico.reduce((total, item) => total + item.conformidade, 0) / obra.historico.length)
      : 100
  }))
}

onMounted(async () => {
  try {
    await loadObras()
  } catch (error) {
    console.error(error)
  }
})

const filteredObras = computed(() => {
  return mockObras.value.filter(obra => {
    const matchesSearch = obra.nome.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         obra.localizacao.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = filterStatus.value === '' || obra.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

const handleNewObra = async (formData) => {
  try {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    await axios.post(`${base}/obras`, formData)
    await loadObras()
    showFeedback({ title: 'Obra criada', message: 'A obra foi salva no banco de dados.' })
  } catch (error) {
    console.error(error)
    showFeedback({ type: 'error', title: 'Erro ao criar obra', message: error.response?.data?.error || 'Tente novamente.' })
  } finally {
    showNewObraModal.value = false
  }
}
</script>
