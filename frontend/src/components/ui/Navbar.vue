<template>
  <header class="navbar">
    <div class="navbar-content">
      <h2 class="navbar-title">{{ title }}</h2>
      <div class="navbar-actions">
        <slot name="actions" />
        <div v-if="user" class="navbar-user">
          <span class="user-name">{{ user.name }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: String,
  user: Object
})
</script>

<style scoped>
.navbar {
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.navbar-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.navbar-user {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 16px;
  border-left: 1px solid #e0e0e0;
}

.user-name {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}
</style>
