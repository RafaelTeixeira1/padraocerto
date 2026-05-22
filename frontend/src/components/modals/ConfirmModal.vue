<template>
  <Modal :open="open" :title="title" @close="handleClose">
    <div class="text-center py-4">
      <div class="text-5xl mb-4">{{ icon }}</div>
      <h3 class="text-lg font-semibold text-foreground mb-2">{{ heading }}</h3>
      <p class="text-muted-foreground mb-6">{{ message }}</p>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
        <p class="text-sm text-blue-900">{{ details }}</p>
      </div>
    </div>

    <template #footer>
      <Button @click="handleClose" variant="primary" :fullWidth="true">
        {{ buttonText }}
      </Button>
    </template>
  </Modal>
</template>

<script setup>
import { Modal, Button } from '../ui'

defineProps({
  open: Boolean,
  type: {
    type: String,
    default: 'success',
    validator: (v) => ['success', 'error', 'warning', 'info'].includes(v)
  },
  title: String,
  heading: String,
  message: String,
  details: String,
  buttonText: {
    type: String,
    default: 'OK'
  }
})

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}
</script>
