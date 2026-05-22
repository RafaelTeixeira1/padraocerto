<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="text-center max-w-md">
      <div class="text-6xl mb-6">🚫</div>
      <h1 class="text-4xl font-bold text-foreground mb-2">404</h1>
      <h2 class="text-2xl font-semibold text-foreground mb-4">Página não encontrada</h2>
      <p class="text-muted-foreground mb-8">
        Desculpe, a página que você está procurando não existe ou foi removida.
      </p>

      <div class="space-y-3">
        <router-link to="/" class="inline-block w-full">
          <Button variant="primary" :fullWidth="true">
            Voltar ao Dashboard
          </Button>
        </router-link>
        <router-link to="/obras" class="inline-block w-full">
          <Button variant="secondary" :fullWidth="true">
            Ir para Obras
          </Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Button } from '../components/ui'
</script>
