<template>
  <Modal :open="open" title="Vincular Checklist" @close="emit('close')">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="checklist" class="block text-sm font-medium text-foreground mb-2">
          Selecione um Checklist
        </label>
        <select
          v-model="form.checklistId"
          id="checklist"
          class="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          required
        >
          <option value="">-- Selecione um checklist --</option>
          <option v-for="checklist in availableChecklists" :key="checklist.id" :value="checklist.id">
            {{ checklist.nome }} ({{ checklist.itens.length }} itens)
          </option>
        </select>
        <div v-if="errors.checklistId" class="text-sm text-destructive mt-1">{{ errors.checklistId }}</div>
      </div>

      <!-- Preview -->
      <div v-if="selectedChecklist" class="p-3 bg-muted rounded-lg border border-border">
        <h4 class="text-sm font-medium text-foreground mb-2">Prévia do Checklist:</h4>
        <p class="text-xs text-muted-foreground mb-2">{{ selectedChecklist.descricao }}</p>
        <div class="space-y-1">
          <div v-for="(item, idx) in selectedChecklist.itens" :key="idx" class="text-xs text-foreground">
            ✓ {{ item }}
          </div>
        </div>
      </div>

      <Input
        v-model="form.dataVencimento"
        type="date"
        label="Data de Vencimento (Opcional)"
      />
    </form>

    <template #footer>
      <Button @click="emit('close')" variant="outline">Cancelar</Button>
      <Button @click="handleSubmit" variant="primary" :loading="loading">Vincular</Button>
    </template>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Modal, Button, Input } from '../ui'

defineProps({
  open: Boolean,
  obraId: String
})

const emit = defineEmits(['close', 'submit'])

const loading = ref(false)
const form = ref({
  checklistId: '',
  dataVencimento: ''
})

const errors = ref({
  checklistId: ''
})

const availableChecklists = ref([
  { id: 1, nome: 'Estrutura Civil', descricao: 'Avaliação da estrutura', itens: ['Fundações', 'Pilares', 'Vigas', 'Lajes'] },
  { id: 2, nome: 'Segurança', descricao: 'Itens de segurança', itens: ['EPI', 'Sinalização', 'Acesso seguro'] },
  { id: 3, nome: 'Hidráulica', descricao: 'Sistema hidráulico', itens: ['Tubulações', 'Conexões', 'Testes de pressão'] },
  { id: 4, nome: 'Elétrica', descricao: 'Sistema elétrico', itens: ['Fiação', 'Quadros', 'Tomadas', 'Iluminação'] }
])

const selectedChecklist = computed(() => {
  return availableChecklists.value.find(c => c.id === parseInt(form.value.checklistId))
})

const handleSubmit = async () => {
  errors.value = { checklistId: '' }

  if (!form.value.checklistId) {
    errors.value.checklistId = 'Selecione um checklist'
    return
  }

  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false

  emit('submit', form.value)
}
</script>
