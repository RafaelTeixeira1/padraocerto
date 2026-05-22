<template>
  <router-view v-if="isBlankLayout" />
  <MainLayout v-else />
  <ToastHost />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import { ToastHost } from './components/ui'

const route = useRoute()
const isBlankLayout = computed(() => route.meta.layout === 'blank')
</script>
