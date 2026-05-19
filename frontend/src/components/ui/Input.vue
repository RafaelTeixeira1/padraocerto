<template>
  <div class="input-group">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="input"
      :class="{ 'input-error': error }"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    />
    <span v-if="error" class="input-error-msg">{{ error }}</span>
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

defineEmits(['update:modelValue', 'blur'])

const id = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-label {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}

.input-error {
  border-color: #dc3545;
}

.input-error-msg {
  font-size: 12px;
  color: #dc3545;
}
</style>
