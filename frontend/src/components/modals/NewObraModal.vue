<template>
  <Modal :open="open" title="Nova Obra" @close="emit('close')">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <Input
        v-model="form.nome"
        type="text"
        label="Nome da Obra"
        placeholder="Ex: Centro Comercial..."
        :error="errors.nome"
        required
      />

      <Input
        v-model="form.localizacao"
        type="text"
        label="Localização/Endereço"
        placeholder="Ex: Av. Paulista, São Paulo..."
        :error="errors.localizacao"
        required
      />

      <Input
        v-model="form.responsavel"
        type="text"
        label="Responsável"
        placeholder="Nome do responsável"
        :error="errors.responsavel"
        required
      />

      <Input
        v-model="form.dataInicio"
        type="date"
        label="Data de Início"
        :error="errors.dataInicio"
        required
      />

      <div>
        <label class="block text-sm font-medium text-foreground mb-2">Descrição (Opcional)</label>
        <textarea
          v-model="form.descricao"
          placeholder="Detalhes da obra..."
          rows="3"
          class="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        ></textarea>
      </div>
    </form>

    <template #footer>
      <Button @click="emit('close')" variant="outline">Cancelar</Button>
      <Button @click="handleSubmit" variant="primary" :loading="loading">
        {{ props.initialData ? 'Salvar Obra' : 'Criar Obra' }}
      </Button>
    </template>
  </Modal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Modal, Button, Input } from '../ui'

const props = defineProps({
  open: Boolean,
  initialData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'submit'])

const loading = ref(false)
const form = ref({
  nome: '',
  localizacao: '',
  responsavel: '',
  dataInicio: '',
  descricao: ''
})

const errors = ref({
  nome: '',
  localizacao: '',
  responsavel: '',
  dataInicio: ''
})

const toInputDate = (value) => {
  if (!value) return ''
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value

  const [day, month, year] = String(value).split('/')
  if (day && month && year) return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`

  return ''
}

const resetForm = () => {
  if (props.initialData) {
    form.value = {
      nome: props.initialData.nome || '',
      localizacao: props.initialData.localizacao || '',
      responsavel: props.initialData.responsavel || '',
      dataInicio: toInputDate(props.initialData.dataInicio),
      descricao: props.initialData.descricao || ''
    }
    return
  }

  form.value = {
    nome: '',
    localizacao: '',
    responsavel: '',
    dataInicio: '',
    descricao: ''
  }
}

watch(() => props.open, (open) => {
  if (open) resetForm()
})

const handleSubmit = async () => {
  errors.value = { nome: '', localizacao: '', responsavel: '', dataInicio: '' }

  if (!form.value.nome.trim()) {
    errors.value.nome = 'Nome é obrigatório'
    return
  }
  if (!form.value.localizacao.trim()) {
    errors.value.localizacao = 'Localização é obrigatória'
    return
  }
  if (!form.value.responsavel.trim()) {
    errors.value.responsavel = 'Responsável é obrigatório'
    return
  }
  if (!form.value.dataInicio) {
    errors.value.dataInicio = 'Data é obrigatória'
    return
  }

  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false

  emit('submit', { ...form.value, id: props.initialData?.id })
}
</script>
