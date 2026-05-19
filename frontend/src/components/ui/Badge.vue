<template>
  <span class="badge" :class="`badge-${variant} badge-${size}`">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'info',
    validator: (v) => ['success', 'warning', 'danger', 'info'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md'].includes(v)
  }
})
</script>

<style scoped>
.badge {
  display: inline-block;
  border-radius: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.badge-sm {
  padding: 2px 8px;
  font-size: 11px;
}

.badge-md {
  padding: 4px 12px;
  font-size: 12px;
}

.badge-success {
  background-color: #d4edda;
  color: #155724;
}

.badge-warning {
  background-color: #fff3cd;
  color: #856404;
}

.badge-danger {
  background-color: #f8d7da;
  color: #721c24;
}

.badge-info {
  background-color: #d1ecf1;
  color: #0c5460;
}
</style>
