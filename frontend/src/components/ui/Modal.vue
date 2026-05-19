<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="$emit('close')">
        <div class="bg-card rounded-xl shadow-2xl min-w-96 max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
          <div class="flex justify-between items-center p-6 border-b border-border">
            <h2 class="text-xl font-semibold text-foreground">{{ title }}</h2>
            <button
              v-if="closeButton"
              @click="$emit('close')"
              aria-label="Fechar"
              class="text-muted-foreground hover:text-foreground transition-colors text-2xl font-light leading-none"
            >
              ✕
            </button>
          </div>
          <div class="p-6 text-foreground">
            <slot />
          </div>
          <div v-if="$slots.footer" class="flex gap-3 justify-end p-6 border-t border-border">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
defineProps({
  open: Boolean,
  title: String,
  closeButton: { type: Boolean, default: true }
})

defineEmits(['close'])
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
