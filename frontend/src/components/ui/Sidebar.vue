<template>
  <aside class="fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col shadow-xl z-50">
    <!-- Logo -->
    <div class="p-6 border-b border-sidebar-border">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center text-lg">
          🏗️
        </div>
        <div>
          <h1 class="text-lg font-bold text-sidebar-foreground">PadrãoCerto</h1>
          <p class="text-xs text-sidebar-foreground/70">Gestão de Qualidade</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4">
      <ul class="space-y-2">
        <li v-for="item in items" :key="item.path">
          <router-link
            :to="item.path"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            :class="{
              'bg-sidebar-accent text-sidebar-accent-foreground': active === item.path,
              'hover:bg-sidebar-accent/50': active !== item.path
            }"
          >
            <span class="text-lg">{{ item.icon }}</span>
            <span class="text-sm font-medium">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Logout -->
    <div class="p-4 border-t border-sidebar-border">
      <button
        @click="handleLogout"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent/50 transition-colors text-sidebar-foreground"
      >
        <span class="text-lg">🚪</span>
        <span class="text-sm font-medium">Sair</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  items: {
    type: Array,
    default: () => [
      { label: 'Dashboard', icon: '📊', path: '/' },
      { label: 'Obras', icon: '🏗️', path: '/obras' },
      { label: 'Checklists', icon: '✅', path: '/checklists' }
    ]
  },
  active: String
})

const handleLogout = () => {
  localStorage.removeItem('session')
  localStorage.removeItem('userName')
  router.push('/login')
}
</script>
