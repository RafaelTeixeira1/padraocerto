<template>
  <div class="login-page">
    <Card title="Login" padding="lg" class="login-card">
      <form @submit.prevent="handleLogin">
        <Input 
          v-model="email" 
          type="email" 
          label="Email" 
          placeholder="seu@email.com"
        />
        <Input 
          v-model="password" 
          type="password" 
          label="Senha" 
          placeholder="••••••"
        />
        <Button variant="primary" class="full-width" :loading="loading">
          Entrar
        </Button>
      </form>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Card, Input, Button } from '../components/ui'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  // TODO: Chamar API de login
  localStorage.setItem('session', 'mock-token')
  localStorage.setItem('userName', email.value.split('@')[0])
  setTimeout(() => {
    router.push('/')
  }, 500)
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 100%;
  max-width: 400px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.full-width {
  width: 100%;
}
</style>
