<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="w-full max-w-md">
      <div class="bg-card rounded-xl shadow-lg p-8">
        <div class="flex flex-col items-center mb-8">
          <div class="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4">
            <span class="text-3xl">🔑</span>
          </div>
          <h1 class="text-2xl font-bold text-card-foreground mb-2">Recuperar Senha</h1>
          <p class="text-sm text-muted-foreground text-center">
            Digite seu email para receber uma nova senha
          </p>
        </div>

        <form @submit.prevent="handleRecover" class="space-y-4">
          <Input
            v-model="email"
            type="email"
            label="Email"
            placeholder="seu@email.com"
            required
          />

          <Button type="submit" variant="primary" :fullWidth="true" :loading="loading">
            Recuperar Senha
          </Button>

          <p class="text-center text-sm text-muted-foreground">
            Lembrou a senha?
            <router-link to="/login" class="text-secondary hover:underline font-medium">
              Voltar ao login
            </router-link>
          </p>
        </form>

        <div v-if="temporaryPassword" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-sm font-medium text-green-900 mb-2">Senha temporária gerada:</p>
          <p class="text-lg font-mono text-green-700 bg-white p-2 rounded">{{ temporaryPassword }}</p>
          <p class="text-xs text-green-600 mt-2">Use esta senha para fazer login. Você poderá alterar a senha após autenticar.</p>
        </div>
      </div>

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
const loading = ref(false)
const temporaryPassword = ref('')
const router = useRouter()

const handleRecover = async () => {
  loading.value = true
  temporaryPassword.value = ''

  await new Promise(resolve => setTimeout(resolve, 500))

  temporaryPassword.value = Math.random().toString(36).substr(2, 10).toUpperCase()
  loading.value = false
}
</script>
