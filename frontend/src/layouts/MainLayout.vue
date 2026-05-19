<template>
  <div class="min-h-screen bg-background">
    <!-- Navbar -->
    <Navbar :user="currentUser" />

    <!-- Main Content -->
    <div class="flex">
      <!-- Sidebar -->
      <Sidebar :items="navItems" :active="$route.path" />

      <!-- Content Area -->
      <main class="flex-1 ml-64 pt-16 overflow-y-auto">
        <div class="min-h-screen">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Navbar, Sidebar } from '../components/ui'

const currentUser = computed(() => ({
  name: localStorage.getItem('userName') || 'Usuário',
  email: localStorage.getItem('userEmail') || 'user@padraocerto.com'
}))

const navItems = [
  { label: 'Dashboard', icon: '📊', path: '/' },
  { label: 'Obras', icon: '🏗️', path: '/obras' },
  { label: 'Checklists', icon: '✅', path: '/checklists' }
]
</script>
