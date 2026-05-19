<template>
  <Modal :open="open" title="Novo Checklist" @close="emit('close')">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <Input
        v-model="form.nome"
        type="text"
        label="Nome do Checklist"
        placeholder="Ex: Estrutura Civil..."
        :error="errors.nome"
        required
      />

      <div>
        <label class="block text-sm font-medium text-foreground mb-2">Descrição</label>
        <textarea
          v-model="form.descricao"
          placeholder="Descreva o objetivo deste checklist..."
          rows="2"
          class="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        ></textarea>
      </div>

      <!-- Items -->
      <div>
        <label class="block text-sm font-medium text-foreground mb-2">Itens do Checklist</label>
        <div class="space-y-2 mb-3 max-h-48 overflow-y-auto">
          <div v-for="(item, idx) in form.itens" :key="idx" class="flex gap-2 items-start p-2 bg-muted rounded-lg">
            <input
              v-model="item.descricao"
              type="text"
              placeholder="Descrição do item..."
              class="flex-1 px-3 py-2 bg-input-background border border-input rounded text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button
              @click="removeItem(idx)"
              variant="outline"
              size="sm"
              type="button"
            >
              ✕
            </Button>
          </div>
        </div>
        <div v-if="errors.itens" class="text-sm text-destructive mb-2">{{ errors.itens }}</div>
        <Button
          @click="addItem"
          variant="secondary"
          size="sm"
          type="button"
          class="w-full"
        >
          + Adicionar Item
        </Button>
      </div>
    </form>

    <template #footer>
      <Button @click="emit('close')" variant="outline">Cancelar</Button>
      <Button @click="handleSubmit" variant="primary" :loading="loading">Criar Checklist</Button>
    </template>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { Modal, Button, Input } from '../ui'

defineProps({
  open: Boolean
})

const emit = defineEmits(['close', 'submit'])

const loading = ref(false)
const form = ref({
  nome: '',
  descricao: '',
  itens: [
    { descricao: '' },
    { descricao: '' },
    { descricao: '' }
  ]
})

const errors = ref({
  nome: '',
  itens: ''
})

const addItem = () => {
  form.value.itens.push({ descricao: '' })
}

const removeItem = (idx) => {
  if (form.value.itens.length > 3) {
    form.value.itens.splice(idx, 1)
  }
}

const handleSubmit = async () => {
  errors.value = { nome: '', itens: '' }

  if (!form.value.nome.trim()) {
    errors.value.nome = 'Nome é obrigatório'
    return
  }

  const filledItems = form.value.itens.filter(i => i.descricao.trim())
  if (filledItems.length < 3) {
    errors.value.itens = 'Mínimo 3 itens obrigatório'
    return
  }

  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false

  emit('submit', { ...form.value, itens: filledItems })
}
</script>
