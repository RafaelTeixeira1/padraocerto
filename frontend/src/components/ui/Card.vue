<template>
  <div :class="paddingClasses" class="bg-card rounded-lg border border-border shadow-sm">
    <h3 v-if="title" class="text-lg font-semibold text-foreground">{{ title }}</h3>
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  padding: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  }
})

const paddingClasses = computed(() => {
  const paddingMap = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  }
  return paddingMap[props.padding] || paddingMap.md
})
</script>
