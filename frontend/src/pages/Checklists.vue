<template>
  <div class="p-6">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-foreground">Checklists</h1>
        <p class="text-sm text-muted-foreground">Modelos reutilizáveis para inspeções</p>
      </div>

      <Button @click="openCreateChecklist" variant="secondary">
        <span class="mr-2">➕</span> Novo Checklist
      </Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
        <p class="text-sm text-muted-foreground mb-1">Total de modelos</p>
        <p class="text-3xl font-bold text-foreground">{{ checklists.length }}</p>
      </div>
      <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
        <p class="text-sm text-muted-foreground mb-1">Com 3+ itens</p>
        <p class="text-3xl font-bold text-foreground">{{ validChecklists }}</p>
      </div>
      <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
        <p class="text-sm text-muted-foreground mb-1">Última atualização</p>
        <p class="text-3xl font-bold text-foreground">{{ lastUpdate }}</p>
      </div>
    </div>

    <div class="bg-card rounded-lg border border-border p-4 mb-6 shadow-sm">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar checklist por nome ou descrição..."
        class="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>

    <div v-if="filteredChecklists.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <article
        v-for="checklist in filteredChecklists"
        :key="checklist.id"
        class="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between gap-3 mb-3">
          <div>
            <h2 class="text-lg font-semibold text-foreground">{{ checklist.nome }}</h2>
            <p class="text-sm text-muted-foreground">{{ checklist.descricao || 'Sem descrição informada' }}</p>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            {{ checklist.itens.length }} itens
          </span>
        </div>

        <div class="space-y-2 mb-5">
          <div
            v-for="(item, idx) in checklist.itens"
            :key="idx"
            class="text-sm text-foreground flex items-start gap-2"
          >
            <span class="text-secondary">•</span>
            <span>{{ item }}</span>
          </div>
        </div>

        <Button variant="primary" fullWidth @click="selectedChecklist = checklist">
          Ver detalhes
        </Button>
      </article>
    </div>

    <div v-else class="text-center py-14 bg-card rounded-lg border border-border shadow-sm">
      <p class="text-4xl mb-3">🗂️</p>
      <h3 class="text-lg font-semibold text-foreground mb-2">Nenhum checklist encontrado</h3>
      <p class="text-muted-foreground mb-6">Crie um novo modelo para começar</p>
      <Button variant="secondary" @click="openCreateChecklist">Novo Checklist</Button>
    </div>

    <div v-if="selectedChecklist" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div class="w-full max-w-2xl bg-card rounded-xl border border-border shadow-2xl p-6">
        <div class="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 class="text-2xl font-bold text-foreground">{{ selectedChecklist.nome }}</h3>
            <p class="text-muted-foreground">{{ selectedChecklist.descricao || 'Sem descrição informada' }}</p>
          </div>
          <button class="text-muted-foreground hover:text-foreground" @click="selectedChecklist = null">✕</button>
        </div>

        <div class="bg-muted/40 rounded-lg p-4 mb-6">
          <h4 class="text-sm font-semibold text-foreground mb-3">Itens</h4>
          <ul class="space-y-2">
            <li v-for="(item, idx) in selectedChecklist.itens" :key="idx" class="text-sm text-foreground flex gap-2">
              <span class="text-secondary">{{ idx + 1 }}.</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="flex justify-end gap-3">
          <Button variant="outline" @click="selectedChecklist = null">Fechar</Button>
          <Button variant="outline" @click="deleteChecklist(selectedChecklist)">Excluir</Button>
          <Button variant="primary" @click="openEditChecklist(selectedChecklist)">Editar</Button>
        </div>
      </div>
    </div>

    <NewChecklistModal
      :open="showNewChecklistModal"
      :initialData="editingChecklist"
      @close="closeChecklistModal"
      @submit="handleSaveChecklist"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import { Button } from '../components/ui'
import { NewChecklistModal } from '../components/modals'

const checklists = ref([])
const searchQuery = ref('')
const showNewChecklistModal = ref(false)
const selectedChecklist = ref(null)
const editingChecklist = ref(null)
const lastUpdate = ref('--')

const loadChecklists = async () => {
  const base = import.meta.env.VITE_API_URL || 'http://localhost:3000'
  const response = await axios.get(`${base}/checklists`)
  checklists.value = response.data
  lastUpdate.value = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

onMounted(async () => {
  try {
    await loadChecklists()
  } catch (error) {
    console.error(error)
  }
})

const filteredChecklists = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return checklists.value.filter(checklist => {
    if (!query) return true
    return checklist.nome.toLowerCase().includes(query) || checklist.descricao.toLowerCase().includes(query)
  })
})

const validChecklists = computed(() => checklists.value.filter(checklist => checklist.itens.length >= 3).length)

const openCreateChecklist = () => {
  editingChecklist.value = null
  showNewChecklistModal.value = true
}

const openEditChecklist = (checklist) => {
  editingChecklist.value = checklist
  showNewChecklistModal.value = true
}

const closeChecklistModal = () => {
  showNewChecklistModal.value = false
  editingChecklist.value = null
}

const handleSaveChecklist = async (formData) => {
  try {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    if (formData.id) {
      await axios.put(`${base}/checklists/${formData.id}`, formData)
    } else {
      await axios.post(`${base}/checklists`, formData)
    }
    await loadChecklists()
    selectedChecklist.value = null
  } catch (error) {
    console.error(error)
  } finally {
    closeChecklistModal()
  }
}

const deleteChecklist = async (checklist) => {
  if (!window.confirm(`Excluir o checklist "${checklist.nome}"?`)) {
    return
  }

  try {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    await axios.delete(`${base}/checklists/${checklist.id}`)
    selectedChecklist.value = null
    await loadChecklists()
  } catch (error) {
    console.error(error)
    alert(error.response?.data?.error || 'Não foi possível excluir o checklist')
  }
}
</script>
