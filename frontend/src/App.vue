<template>
  <MainLayout v-if="isAuthenticated" />
  <router-view v-else />
</template>

<script setup>
import { computed } from 'vue'
import MainLayout from './layouts/MainLayout.vue'

const isAuthenticated = computed(() => {
  return !!localStorage.getItem('session')
})
</script>