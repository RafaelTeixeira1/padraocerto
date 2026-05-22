<template>
  <div class="fixed bottom-4 right-4 z-[80] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:bottom-6 sm:right-6">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="rounded-lg border bg-card p-4 shadow-lg"
      :class="{
        'border-green-200': toast.type === 'success',
        'border-red-200': toast.type === 'error',
        'border-blue-200': toast.type === 'info'
      }"
    >
      <div class="flex items-start justify-between gap-3">
        <div>
          <p
            class="text-sm font-semibold"
            :class="{
              'text-green-700': toast.type === 'success',
              'text-red-700': toast.type === 'error',
              'text-blue-700': toast.type === 'info'
            }"
          >
            {{ toast.title }}
          </p>
          <p v-if="toast.message" class="mt-1 text-sm text-muted-foreground">{{ toast.message }}</p>
        </div>
        <button class="text-muted-foreground hover:text-foreground" @click="removeToast(toast.id)">x</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const toasts = ref([])

const removeToast = (id) => {
  toasts.value = toasts.value.filter(toast => toast.id !== id)
}

const addToast = (event) => {
  const toast = {
    id: Date.now() + Math.random(),
    type: event.detail?.type || 'success',
    title: event.detail?.title || 'Ação concluída',
    message: event.detail?.message || ''
  }

  toasts.value.push(toast)
  window.setTimeout(() => removeToast(toast.id), 4500)
}

onMounted(() => window.addEventListener('padraocerto:feedback', addToast))
onBeforeUnmount(() => window.removeEventListener('padraocerto:feedback', addToast))
</script>
