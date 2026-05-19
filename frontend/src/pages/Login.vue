<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="bg-card rounded-xl shadow-lg p-8">
        <!-- Header -->
        <div class="flex flex-col items-center mb-8">
          <div class="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4">
            <span class="text-3xl">🏗️</span>
          </div>
          <h1 class="text-2xl font-bold text-card-foreground mb-2">PadrãoCerto</h1>
          <p class="text-sm text-muted-foreground text-center">
            Sistema de Inspeção de Qualidade em Obras
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <Input
            v-model="email"
            type="email"
            label="Email"
            placeholder="seu@email.com"
            required
          />

          <Input
            v-model="password"
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            required
          />

          <div class="flex justify-end">
            <router-link to="/recuperar-senha" class="text-sm text-secondary hover:underline">
              Esqueceu a senha?
            </router-link>
          </div>

          <Button type="submit" variant="primary" :fullWidth="true" :loading="loading">
            Entrar
          </Button>

          <p class="text-center text-sm text-muted-foreground">
            Não tem uma conta?
            <router-link to="/cadastro" class="text-secondary hover:underline font-medium">
              Cadastre-se
            </router-link>
          </p>
        </form>
      </div>

      <!-- Footer -->
      <p class="text-center text-xs text-muted-foreground mt-6">
        Desenvolvido com ❤️ para a construção civil
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Input, Button } from '../components/ui'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  // Simulando chamada à API
  await new Promise(resolve => setTimeout(resolve, 500))

  localStorage.setItem('session', 'mock-token')
  localStorage.setItem('userName', email.value.split('@')[0])

  loading.value = false
  router.push('/')
}
</script>
