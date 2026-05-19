<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-foreground">Dashboard</h1>
        <p class="text-sm text-muted-foreground">Bem-vindo ao PadrãoCerto!</p>
      </div>
      <div class="flex gap-3">
        <Button @click="showNewObraModal = true" variant="primary">
          <span class="mr-2">🏗️</span> Nova Obra
        </Button>
        <Button @click="showNewChecklistModal = true" variant="secondary">
          <span class="mr-2">✅</span> Novo Checklist
        </Button>
      </div>
    </div>

    <!-- Indicators Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
        <p class="text-sm text-muted-foreground mb-1">Total de Obras</p>
        <p class="text-3xl font-bold text-foreground">12</p>
        <p class="text-xs text-green-600 mt-1">+2 este mês</p>
      </div>
      <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
        <p class="text-sm text-muted-foreground mb-1">Total de Inspeções</p>
        <p class="text-3xl font-bold text-foreground">47</p>
        <p class="text-xs text-green-600 mt-1">+12 esta semana</p>
      </div>
      <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
        <p class="text-sm text-muted-foreground mb-1">Taxa Média de Conformidade</p>
        <p class="text-3xl font-bold text-foreground">82%</p>
        <p class="text-xs text-yellow-600 mt-1">↑ 3% vs. mês anterior</p>
      </div>
      <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
        <p class="text-sm text-muted-foreground mb-1">Inspeções Esta Semana</p>
        <p class="text-3xl font-bold text-foreground">8</p>
        <p class="text-xs text-blue-600 mt-1">Média de 1.6/dia</p>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Conformance Distribution -->
      <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h2 class="text-lg font-semibold text-foreground mb-4">Distribuição de Conformidade</h2>
        <div class="space-y-3">
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-foreground">Conforme</span>
              <span class="font-semibold text-green-600">72%</span>
            </div>
            <div class="w-full bg-muted rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full" style="width: 72%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-foreground">Não-Conforme</span>
              <span class="font-semibold text-red-600">18%</span>
            </div>
            <div class="w-full bg-muted rounded-full h-2">
              <div class="bg-red-500 h-2 rounded-full" style="width: 18%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-foreground">Atenção</span>
              <span class="font-semibold text-yellow-600">10%</span>
            </div>
            <div class="w-full bg-muted rounded-full h-2">
              <div class="bg-yellow-500 h-2 rounded-full" style="width: 10%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h2 class="text-lg font-semibold text-foreground mb-4">Atividade Recente</h2>
        <div class="space-y-3 text-sm">
          <div class="flex items-center gap-3 pb-3 border-b border-border">
            <span class="text-xl">🏗️</span>
            <div class="flex-1">
              <p class="text-foreground">Obra "Centro Comercial" criada</p>
              <p class="text-xs text-muted-foreground">Há 2 horas</p>
            </div>
          </div>
          <div class="flex items-center gap-3 pb-3 border-b border-border">
            <span class="text-xl">✅</span>
            <div class="flex-1">
              <p class="text-foreground">Inspeção finalizada com 85% conforme</p>
              <p class="text-xs text-muted-foreground">Há 5 horas</p>
            </div>
          </div>
          <div class="flex items-center gap-3 pb-3 border-b border-border">
            <span class="text-xl">⚠️</span>
            <div class="flex-1">
              <p class="text-foreground">Itens não-conformes encontrados</p>
              <p class="text-xs text-muted-foreground">Ontem</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xl">✅</span>
            <div class="flex-1">
              <p class="text-foreground">Nova checklist criada</p>
              <p class="text-xs text-muted-foreground">2 dias atrás</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Latest Inspections -->
    <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-foreground mb-4">Últimas Inspeções</h2>
      <div class="mb-4 flex items-center gap-3">
        <label class="text-sm text-muted-foreground">Filtrar por obra:</label>
        <select v-model="filterObra" class="px-3 py-2 rounded border border-input bg-white">
          <option value="">Todas Obras</option>
          <option v-for="o in obras" :key="o.id" :value="o.id">{{ o.nome }}</option>
        </select>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="border-b border-border">
            <tr>
              <th class="text-left py-3 px-3 font-medium text-muted-foreground">Obra</th>
              <th class="text-left py-3 px-3 font-medium text-muted-foreground">Checklist</th>
              <th class="text-left py-3 px-3 font-medium text-muted-foreground">Responsável</th>
              <th class="text-center py-3 px-3 font-medium text-muted-foreground">Conformidade</th>
              <th class="text-left py-3 px-3 font-medium text-muted-foreground">Data</th>
              <th class="text-left py-3 px-3 font-medium text-muted-foreground">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(inspection, idx) in mockInspections.filter(i => !filterObra || i.obraId == filterObra)" :key="idx" class="border-b border-border hover:bg-muted/50 transition-colors">
              <td class="py-3 px-3 text-foreground">{{ inspection.obra }}</td>
              <td class="py-3 px-3 text-foreground">{{ inspection.checklist }}</td>
              <td class="py-3 px-3 text-foreground">{{ inspection.responsavel }}</td>
              <td class="py-3 px-3 text-center">
                <span :class="{
                  'text-green-600 font-semibold': inspection.conformidade >= 80,
                  'text-yellow-600 font-semibold': inspection.conformidade >= 60 && inspection.conformidade < 80,
                  'text-red-600 font-semibold': inspection.conformidade < 60
                }">
                  {{ inspection.conformidade }}%
                </span>
              </td>
              <td class="py-3 px-3 text-muted-foreground">{{ inspection.data }}</td>
              <td class="py-3 px-3">
                <router-link :to="`/relatorio/${inspection.id}`" class="text-secondary hover:underline text-sm">
                  Ver Relatório
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modals -->
    <NewObraModal :open="showNewObraModal" @close="showNewObraModal = false" @submit="handleNewObra" />
    <NewChecklistModal :open="showNewChecklistModal" @close="showNewChecklistModal = false" @submit="handleNewChecklist" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Button } from '../components/ui'
import { NewObraModal, NewChecklistModal } from '../components/modals'
import axios from 'axios'

const showNewObraModal = ref(false)
const showNewChecklistModal = ref(false)

const mockInspections = ref([])
const obras = ref([])
const filterObra = ref('')

const loadData = async () => {
  try {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    const [oRes, iRes] = await Promise.all([axios.get(`${base}/obras`), axios.get(`${base}/inspecoes`)])
    obras.value = oRes.data
    mockInspections.value = iRes.data
  } catch (err) {
    console.error(err)
  }
}

onMounted(loadData)

const handleNewObra = async (formData) => {
  try {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    await axios.post(`${base}/obras`, formData)
    await loadData()
  } catch (error) {
    console.error(error)
  } finally {
    showNewObraModal.value = false
  }
}

const handleNewChecklist = async (formData) => {
  try {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    await axios.post(`${base}/checklists`, formData)
  } catch (error) {
    console.error(error)
  } finally {
    showNewChecklistModal.value = false
  }
}
</script>
