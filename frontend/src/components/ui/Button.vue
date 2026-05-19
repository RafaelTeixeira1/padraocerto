<template>
  <button
    :class="[
      'px-6 py-3 rounded-lg font-medium transition-all duration-200',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variantClass,
      sizeClass,
      fullWidth ? 'w-full' : '',
      className
    ]"
    :disabled="disabled || loading"
    @click="emit('click')"
  >
    <span v-if="loading" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'outline'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  fullWidth: Boolean,
  disabled: Boolean,
  loading: Boolean,
  className: String
})

const emit = defineEmits(['click'])

const variantClass = computed(() => {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
  }
  return variants[props.variant] || variants.primary
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  return sizes[props.size] || sizes.md
})
</script>
