<template>
  <div class="layout">
    <Navbar :title="'PadrãoCerto'" :user="currentUser">
      <template #actions>
        <Button size="sm" @click="handleLogout">Logout</Button>
      </template>
    </Navbar>
    <div class="layout-body">
      <Sidebar :items="navItems" :active="$route.path" />
      <main class="content">
        <div class="content-inner">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Navbar, Sidebar, Button } from '../components/ui'

const router = useRouter()

const currentUser = computed(() => ({
  name: localStorage.getItem('userName') || 'Usuário'
}))

const navItems = [
  { label: 'Dashboard', icon: '📊', path: '/' },
  { label: 'Obras', icon: '🏗️', path: '/obras' },
  { label: 'Checklists', icon: '✅', path: '/checklists' }
]

const handleLogout = () => {
  localStorage.removeItem('session')
  localStorage.removeItem('userName')
  router.push('/login')
}
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr;
  height: 100vh;
  width: 100%;
}

.navbar-wrapper {
  grid-column: 1 / -1;
  grid-row: 1;
}

.layout-body {
  grid-row: 2;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 250px 1fr;
}

.content {
  grid-column: 2;
  overflow-y: auto;
  background-color: #f5f5f5;
}

.content-inner {
  padding: 24px;
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
  }

  .layout-body {
    grid-template-columns: 1fr;
  }

  .content {
    grid-column: 1;
  }
}
</style>
