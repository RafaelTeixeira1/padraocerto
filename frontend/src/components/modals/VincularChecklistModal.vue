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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { Modal, Button, Input } from '../ui'

const props = defineProps({
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

const availableChecklists = ref([])
const loadError = ref('')

const loadChecklists = async () => {
  const base = import.meta.env.VITE_API_URL || 'http://localhost:3000'
  const response = await axios.get(`${base}/checklists`)
  availableChecklists.value = response.data
}

onMounted(async () => {
  try {
    await loadChecklists()
  } catch (error) {
    console.error(error)
    loadError.value = 'Não foi possível carregar os checklists'
  }
})

const selectedChecklist = computed(() => {
  return availableChecklists.value.find(c => c.id === parseInt(form.value.checklistId))
})

const router = useRouter()

const handleSubmit = async () => {
  errors.value = { checklistId: '' }

  if (!form.value.checklistId) {
    errors.value.checklistId = 'Selecione um checklist'
    return
  }

  loading.value = true
  try {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    const response = await axios.post(`${base}/obras/${props.obraId}/vincular`, { checklistId: form.value.checklistId, dataVencimento: form.value.dataVencimento })
    loading.value = false
    emit('submit', response.data)
    router.push({ path: `/obras/${props.obraId}/apos-vincular`, query: { checklistId: form.value.checklistId } })
  } catch (err) {
    loading.value = false
    console.error(err)
    errors.value.checklistId = 'Erro ao vincular checklist'
  }
}
</script>
