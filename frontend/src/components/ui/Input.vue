<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-foreground">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all"
      :class="{ 'border-destructive': error }"
      @input="emit('update:modelValue', $event.target.value)"
      @blur="emit('blur')"
    />
    <p v-if="error" class="mt-1 text-sm text-destructive">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (v) => ['text', 'email', 'password', 'number'].includes(v)
  },
  label: String,
  placeholder: String,
  modelValue: String,
  error: String,
  disabled: Boolean
})

const emit = defineEmits(['update:modelValue', 'blur'])

const id = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)
</script>
