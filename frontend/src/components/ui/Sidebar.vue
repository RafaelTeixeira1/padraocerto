<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h1 class="sidebar-logo">PadrãoCerto</h1>
    </div>
    <nav class="sidebar-nav">
      <router-link
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        class="sidebar-item"
        :class="{ active: active === item.path }"
      >
        <span class="sidebar-icon">{{ item.icon }}</span>
        <span class="sidebar-label">{{ item.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  },
  active: String
})
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #34495e;
}

.sidebar-logo {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.sidebar-item:hover {
  background-color: #34495e;
  color: white;
}

.sidebar-item.active {
  background-color: #0066cc;
  color: white;
  border-left-color: #0066cc;
}

.sidebar-icon {
  font-size: 18px;
}

.sidebar-label {
  font-size: 14px;
  font-weight: 500;
}
</style>
