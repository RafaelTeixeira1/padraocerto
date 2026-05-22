<template>
  <header class="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-4 shadow-sm z-40 md:left-64 md:px-6">
    <div class="hidden items-center gap-4 flex-1 max-w-xl sm:flex">
      <div class="relative flex-1">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Buscar obras, checklists..."
          class="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>

    <div class="flex flex-1 items-center justify-end gap-3 sm:flex-none sm:gap-4">
      <button class="relative p-2 hover:bg-muted rounded-lg transition-colors">
        <svg class="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span class="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
      </button>

      <div class="flex items-center gap-3 pl-3 border-l border-border sm:pl-4">
        <div class="hidden text-right sm:block">
          <p class="text-sm text-foreground">{{ user?.name || 'Usuário' }}</p>
          <p class="text-xs text-muted-foreground">{{ user?.email || 'user@example.com' }}</p>
        </div>
        <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
            <path fill-rule="evenodd" d="M12 1C6.477 1 2 5.477 2 11c0 5.013 3.694 9.153 8.505 9.876.75.111 1.226.111 1.495.111.27 0 .745 0 1.495-.111C18.306 20.153 22 15.013 22 11c0-5.523-4.477-10-10-10z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  user: Object
})
</script>
