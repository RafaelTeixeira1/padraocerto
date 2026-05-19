<template>
  <div class="p-6">
    <!-- Header -->
    <div v-if="loadError" class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {{ loadError }}
    </div>

    <div class="flex justify-between items-start mb-8">
      <div>
        <h1 class="text-3xl font-bold text-foreground mb-2">{{ obra.nome }}</h1>
        <div class="flex gap-4 text-sm text-muted-foreground">
          <span>📍 {{ obra.localizacao }}</span>
          <span :class="{
            'text-green-600': obra.status === 'ativa',
            'text-gray-600': obra.status === 'finalizada',
            'text-yellow-600': obra.status === 'pausada'
          }">
            Status: <span class="font-semibold">{{ obra.status.charAt(0).toUpperCase() + obra.status.slice(1) }}</span>
          </span>
        </div>
      </div>
      <div class="flex gap-3">
        <Button variant="secondary" @click="showEditModal = true">Editar</Button>
        <Button variant="outline" @click="deleteObra">Deletar</Button>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Info Cards -->
      <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 class="text-sm font-medium text-muted-foreground mb-3">Informações Básicas</h3>
        <div class="space-y-3">
          <div>
            <p class="text-xs text-muted-foreground">Responsável</p>
            <p class="text-foreground font-medium">{{ obra.responsavel }}</p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground">Data de Início</p>
            <p class="text-foreground font-medium">{{ obra.dataInicio }}</p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground">Total de Inspeções</p>
            <p class="text-foreground font-medium">{{ obra.historico.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 class="text-sm font-medium text-muted-foreground mb-3">Descrição</h3>
        <p class="text-foreground">{{ obra.descricao }}</p>
      </div>

      <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 class="text-sm font-medium text-muted-foreground mb-3">Taxa de Conformidade</h3>
        <div class="flex items-end gap-3">
          <div class="text-4xl font-bold" :class="{
            'text-green-600': obra.conformidade >= 80,
            'text-yellow-600': obra.conformidade >= 60,
            'text-red-600': obra.conformidade < 60
          }">
            {{ obra.conformidade }}%
          </div>
          <div class="flex-1">
            <div class="w-full bg-muted rounded-full h-3 mb-2">
              <div
                class="h-3 rounded-full transition-all"
                :class="{
                  'bg-green-500': obra.conformidade >= 80,
                  'bg-yellow-500': obra.conformidade >= 60 && obra.conformidade < 80,
                  'bg-red-500': obra.conformidade < 60
                }"
                :style="{ width: obra.conformidade + '%' }"
              ></div>
            </div>
            <p class="text-xs text-muted-foreground">Última inspeção</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Checklists Section -->
    <div class="bg-card rounded-lg border border-border p-6 shadow-sm mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-foreground">Checklists Vinculados</h2>
        <Button @click="showVincularModal = true" variant="secondary" size="sm">
          + Vincular Checklist
        </Button>
      </div>

      <div v-if="obra.checklists.length > 0" class="space-y-3">
        <div v-for="checklist in obra.checklists" :key="checklist.id" class="flex justify-between items-center p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
          <div>
            <p class="font-medium text-foreground">{{ checklist.nome }}</p>
            <p class="text-xs text-muted-foreground">{{ checklist.itens }} itens • Vinculado em {{ checklist.data }}</p>
          </div>
          <Button @click="startInspection(checklist.id)" variant="primary" size="sm">
            Iniciar Inspeção
          </Button>
        </div>
      </div>
      <div v-else class="text-center py-8">
        <p class="text-muted-foreground mb-4">Nenhum checklist vinculado</p>
        <Button @click="showVincularModal = true" variant="secondary">
          Vincular Primeiro Checklist
        </Button>
      </div>
    </div>

    <!-- Inspection History -->
    <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-foreground mb-4">Histórico de Inspeções</h2>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="border-b border-border">
            <tr>
              <th class="text-left py-3 px-3 font-medium text-muted-foreground">Checklist</th>
              <th class="text-left py-3 px-3 font-medium text-muted-foreground">Responsável</th>
              <th class="text-center py-3 px-3 font-medium text-muted-foreground">Conformidade</th>
              <th class="text-left py-3 px-3 font-medium text-muted-foreground">Data</th>
              <th class="text-left py-3 px-3 font-medium text-muted-foreground">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(inspecao, idx) in obra.historico" :key="idx" class="border-b border-border hover:bg-muted/50 transition-colors">
              <td class="py-3 px-3 text-foreground">{{ inspecao.checklist }}</td>
              <td class="py-3 px-3 text-foreground">{{ inspecao.responsavel }}</td>
              <td class="py-3 px-3 text-center">
                <span :class="{
                  'text-green-600 font-semibold': inspecao.conformidade >= 80,
                  'text-yellow-600 font-semibold': inspecao.conformidade >= 60 && inspecao.conformidade < 80,
                  'text-red-600 font-semibold': inspecao.conformidade < 60
                }">
                  {{ inspecao.conformidade }}%
                </span>
              </td>
              <td class="py-3 px-3 text-muted-foreground">{{ inspecao.data }}</td>
              <td class="py-3 px-3">
                <router-link :to="`/relatorio/${inspecao.id}`" class="text-secondary hover:underline text-sm">
                  Ver Relatório
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="obra.historico.length === 0" class="text-center py-8">
        <p class="text-muted-foreground">Nenhuma inspeção realizada ainda</p>
      </div>
    </div>

    <!-- Modal -->
    <VincularChecklistModal :open="showVincularModal" :obraId="obraId" @close="showVincularModal = false" @submit="handleVincularChecklist" />
    <NewObraModal :open="showEditModal" :initialData="obra" @close="showEditModal = false" @submit="handleEditObra" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { Button } from '../components/ui'
import { NewObraModal, VincularChecklistModal } from '../components/modals'

const route = useRoute()
const obraId = route.params.id

const showVincularModal = ref(false)
const showEditModal = ref(false)
const loadError = ref('')

const obra = ref({
  nome: 'Carregando...',
  localizacao: '',
  status: 'ativa',
  responsavel: '',
  dataInicio: '',
  conformidade: 0,
  descricao: '',
  checklists: [],
  historico: []
})

const router = useRouter()

const loadObra = async () => {
  try {
    const { data } = await axios.get(`/obras/${obraId}`)
    const conformidade = data.historico.length
      ? Math.round(data.historico.reduce((total, item) => total + item.conformidade, 0) / data.historico.length)
      : 0
    obra.value = { ...data, conformidade }
  } catch (error) {
    console.error(error)
    loadError.value = error.response?.data?.error || 'Não foi possível carregar a obra'
  }
}

onMounted(loadObra)

const startInspection = (checklistId) => {
  const checklist = obra.value.checklists.find(c => c.id === checklistId)
  if (checklist) {
    // Navegar para a confirmação antes de iniciar
    router.push(`/obras/${obraId}/checklist/${checklistId}/confirm`)
  }
}

const handleVincularChecklist = async () => {
  await loadObra()
  showVincularModal.value = false
}

const deleteObra = async () => {
  if (!window.confirm('Deseja remover esta obra?')) {
    return
  }

  try {
    await axios.delete(`/obras/${obraId}`)
    router.push('/obras')
  } catch (error) {
    console.error(error)
    loadError.value = error.response?.data?.error || 'Não foi possível remover a obra'
  }
}

const handleEditObra = async (formData) => {
  try {
    await axios.put(`/obras/${obraId}`, { ...formData, status: obra.value.status })
    showEditModal.value = false
    await loadObra()
  } catch (error) {
    console.error(error)
    loadError.value = error.response?.data?.error || 'Não foi possível editar a obra'
  }
}
</script>
