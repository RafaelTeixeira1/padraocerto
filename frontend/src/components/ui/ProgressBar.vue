<template>
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: `${value}%`, backgroundColor: progressColor }"></div>
    <span v-if="showLabel" class="progress-label">{{ value }}%</span>
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
  if (props.value >= 80) return '#28a745'
  if (props.value >= 50) return '#ffc107'
  return '#dc3545'
})
</script>

<style scoped>
.progress-container {
  position: relative;
  width: 100%;
  height: 24px;
  background-color: #e9ecef;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s ease;
}

.progress-label {
  position: absolute;
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  color: #333;
}
</style>
