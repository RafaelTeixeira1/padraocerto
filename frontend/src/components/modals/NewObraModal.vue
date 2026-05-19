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
      <Button @click="handleSubmit" variant="primary" :loading="loading">Criar Obra</Button>
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

  emit('submit', form.value)
}
</script>
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
      <Button @click="$emit('close')" variant="outline">Cancelar</Button>
      <Button @click="handleSubmit" variant="primary" :loading="loading">Criar Obra</Button>
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

  emit('submit', form.value)
}
</script>
