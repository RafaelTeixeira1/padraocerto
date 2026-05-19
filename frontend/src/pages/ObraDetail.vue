<template>
  <div class="p-6">
    <!-- Header -->
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
        <Button variant="secondary">Editar</Button>
        <Button variant="outline">Deletar</Button>
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
            <p class="text-foreground font-medium">{{ obra.totalInspecoes }}</p>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '../components/ui'
import { VincularChecklistModal } from '../components/modals'

const route = useRoute()
const obraId = route.params.id

const showVincularModal = ref(false)

const obra = ref({
  nome: 'Centro Comercial',
  localizacao: 'Av. Paulista, 1000 - São Paulo, SP',
  status: 'ativa',
  responsavel: 'João Silva',
  dataInicio: '01/03/2026',
  totalInspecoes: 5,
  conformidade: 88,
  descricao: 'Projeto de construção de centro comercial com 15 lojas, 2 andares de estacionamento e áreas de convivência.',
  checklists: [
    { id: 1, nome: 'Estrutura Civil', itens: 25, data: '01/03/2026' },
    { id: 2, nome: 'Segurança', itens: 15, data: '05/03/2026' }
  ],
  historico: [
    { id: 1, checklist: 'Estrutura Civil', responsavel: 'João Silva', conformidade: 88, data: '19/05/2026' },
    { id: 2, checklist: 'Segurança', responsavel: 'Pedro Costa', conformidade: 92, data: '17/05/2026' },
    { id: 3, checklist: 'Estrutura Civil', responsavel: 'João Silva', conformidade: 85, data: '10/05/2026' }
  ]
})

const startInspection = (checklistId) => {
  const checklist = obra.value.checklists.find(c => c.id === checklistId)
  if (checklist) {
    // Navegar para a página de responder checklist
    // router.push(`/obras/${obraId}/checklist/${checklistId}/responder`)
  }
}

const handleVincularChecklist = (formData) => {
  const checklist = {
    id: formData.checklistId,
    nome: 'Novo Checklist',
    itens: 15,
    data: new Date().toLocaleDateString('pt-BR')
  }
  if (!obra.value.checklists.find(c => c.id === checklist.id)) {
    obra.value.checklists.push(checklist)
  }
  showVincularModal.value = false
}
</script>
