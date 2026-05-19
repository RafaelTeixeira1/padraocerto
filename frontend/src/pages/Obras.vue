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
          <span :class="{
            'bg-green-100 text-green-800': obra.status === 'ativa',
            'bg-gray-100 text-gray-800': obra.status === 'finalizada',
            'bg-yellow-100 text-yellow-800': obra.status === 'pausada'
          }" class="px-3 py-1 rounded-full text-xs font-medium">
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
            <span class="font-medium text-foreground">Inspeções:</span> <span class="font-semibold text-foreground">{{ obra.inspecoes }}</span>
          </p>
        </div>

        <div class="pt-4 border-t border-border">
          <div class="flex justify-between text-xs text-muted-foreground">
            <span>Taxa de Conformidade</span>
            <span class="font-semibold" :class="{
              'text-green-600': obra.conformidade >= 80,
              'text-yellow-600': obra.conformidade >= 60,
              'text-red-600': obra.conformidade < 60
            }">
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
import { ref, computed } from 'vue'
import { Button } from '../components/ui'
import { NewObraModal, ConfirmModal } from '../components/modals'

const searchQuery = ref('')
const filterStatus = ref('')
const showNewObraModal = ref(false)

const mockObras = ref([
  { id: 1, nome: 'Centro Comercial', localizacao: 'Av. Paulista, São Paulo', status: 'ativa', responsavel: 'João Silva', dataInicio: '01/03/2026', inspecoes: 5, conformidade: 88 },
  { id: 2, nome: 'Residencial Sul', localizacao: 'Rua das Flores, Rio de Janeiro', status: 'ativa', responsavel: 'Maria Santos', dataInicio: '15/02/2026', inspecoes: 8, conformidade: 92 },
  { id: 3, nome: 'Hospital Regional', localizacao: 'BR-101 km 150, Bahia', status: 'ativa', responsavel: 'Pedro Costa', dataInicio: '10/01/2026', inspecoes: 12, conformidade: 76 },
  { id: 4, nome: 'Escola Pública', localizacao: 'Centro, Minas Gerais', status: 'finalizada', responsavel: 'Ana Souza', dataInicio: '01/11/2025', inspecoes: 20, conformidade: 85 },
  { id: 5, nome: 'Prédio Comercial', localizacao: 'Setor Comercial, Brasília', status: 'pausada', responsavel: 'Carlos Lima', dataInicio: '20/04/2026', inspecoes: 3, conformidade: 65 },
  { id: 6, nome: 'Shopping Center', localizacao: 'Zona Sul, São Paulo', status: 'ativa', responsavel: 'João Silva', dataInicio: '05/05/2026', inspecoes: 2, conformidade: 91 }
])

const filteredObras = computed(() => {
  return mockObras.value.filter(obra => {
    const matchesSearch = obra.nome.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         obra.localizacao.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = filterStatus.value === '' || obra.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

const handleNewObra = (formData) => {
  showNewObraModal.value = false
  const newObra = {
    id: mockObras.value.length + 1,
    ...formData,
    status: 'ativa',
    inspecoes: 0,
    conformidade: 100
  }
  mockObras.value.push(newObra)
}
</script>

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
          <span :class="{
            'bg-green-100 text-green-800': obra.status === 'ativa',
            'bg-gray-100 text-gray-800': obra.status === 'finalizada',
            'bg-yellow-100 text-yellow-800': obra.status === 'pausada'
          }" class="px-3 py-1 rounded-full text-xs font-medium">
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
            <span class="font-medium text-foreground">Inspeções:</span> <span class="font-semibold text-foreground">{{ obra.inspecoes }}</span>
          </p>
        </div>

        <div class="pt-4 border-t border-border">
          <div class="flex justify-between text-xs text-muted-foreground">
            <span>Taxa de Conformidade</span>
            <span class="font-semibold" :class="{
              'text-green-600': obra.conformidade >= 80,
              'text-yellow-600': obra.conformidade >= 60,
              'text-red-600': obra.conformidade < 60
            }">
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
      <Button @click="showNewObra" variant="primary">Nova Obra</Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Button } from '../components/ui'

const searchQuery = ref('')
const filterStatus = ref('')

const mockObras = ref([
  { id: 1, nome: 'Centro Comercial', localizacao: 'Av. Paulista, São Paulo', status: 'ativa', responsavel: 'João Silva', dataInicio: '01/03/2026', inspecoes: 5, conformidade: 88 },
  { id: 2, nome: 'Residencial Sul', localizacao: 'Rua das Flores, Rio de Janeiro', status: 'ativa', responsavel: 'Maria Santos', dataInicio: '15/02/2026', inspecoes: 8, conformidade: 92 },
  { id: 3, nome: 'Hospital Regional', localizacao: 'BR-101 km 150, Bahia', status: 'ativa', responsavel: 'Pedro Costa', dataInicio: '10/01/2026', inspecoes: 12, conformidade: 76 },
  { id: 4, nome: 'Escola Pública', localizacao: 'Centro, Minas Gerais', status: 'finalizada', responsavel: 'Ana Souza', dataInicio: '01/11/2025', inspecoes: 20, conformidade: 85 },
  { id: 5, nome: 'Prédio Comercial', localizacao: 'Setor Comercial, Brasília', status: 'pausada', responsavel: 'Carlos Lima', dataInicio: '20/04/2026', inspecoes: 3, conformidade: 65 },
  { id: 6, nome: 'Shopping Center', localizacao: 'Zona Sul, São Paulo', status: 'ativa', responsavel: 'João Silva', dataInicio: '05/05/2026', inspecoes: 2, conformidade: 91 }
])

const filteredObras = computed(() => {
  return mockObras.value.filter(obra => {
    const matchesSearch = obra.nome.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         obra.localizacao.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = filterStatus.value === '' || obra.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

const showNewObra = () => {
  alert('Implementar modal/página de nova obra')
}
</script>
