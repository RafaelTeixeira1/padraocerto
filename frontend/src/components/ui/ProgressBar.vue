<template>
  <div class="relative w-full h-6 bg-muted rounded-full overflow-hidden flex items-center">
    <div
      class="h-full transition-all duration-300 rounded-full"
      :style="{ width: `${value}%`, backgroundColor: progressColor }"
    ></div>
    <span v-if="showLabel" class="absolute w-full text-center font-semibold text-xs text-foreground">
      {{ value }}%
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true,
    validator: (v) => v >= 0 && v <= 100
  },
  showLabel: Boolean,
  color: String
})

const progressColor = computed(() => {
  if (props.color) return props.color
  if (props.value >= 80) return '#10b981'
  if (props.value >= 50) return '#f59e0b'
  return '#ef4444'
})
</script>
