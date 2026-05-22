<template>
  <div class="min-h-screen bg-background">
    <!-- Navbar -->
    <Navbar :user="currentUser" />

    <!-- Main Content -->
    <div class="flex">
      <!-- Sidebar -->
      <Sidebar :items="navItems" :active="$route.path" />

      <!-- Content Area -->
      <main class="flex-1 pt-16 overflow-y-auto md:ml-64">
        <div class="min-h-screen pb-20 md:pb-0">
          <router-view />
        </div>
      </main>
    </div>

    <nav class="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3 border-t border-border bg-sidebar text-sidebar-foreground shadow-xl md:hidden">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center gap-1 px-2 py-3 text-xs"
        :class="{ 'bg-sidebar-accent text-sidebar-accent-foreground': $route.path === item.path }"
      >
        <span class="text-lg">{{ item.icon }}</span>
        <span class="font-medium">{{ item.label }}</span>
      </router-link>
    </nav>
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
