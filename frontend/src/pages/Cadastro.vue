<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="w-full max-w-md">
      <div class="bg-card rounded-xl shadow-lg p-8">
        <div class="flex flex-col items-center mb-8">
          <div class="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4">
            <span class="text-3xl">✍️</span>
          </div>
          <h1 class="text-2xl font-bold text-card-foreground mb-2">Criar Conta</h1>
          <p class="text-sm text-muted-foreground text-center">
            Registre-se no PadrãoCerto
          </p>
        </div>

        <form @submit.prevent="handleSignup" class="space-y-4">
          <Input
            v-model="fullName"
            type="text"
            label="Nome Completo"
            placeholder="João da Silva"
            :error="errors.fullName"
            required
          />

          <Input
            v-model="email"
            type="email"
            label="Email"
            placeholder="seu@email.com"
            :error="errors.email"
            required
          />

          <Input
            v-model="password"
            type="password"
            label="Senha"
            placeholder="Mínimo 6 caracteres"
            :error="errors.password"
            required
          />

          <Input
            v-model="passwordConfirm"
            type="password"
            label="Confirmar Senha"
            placeholder="Repita sua senha"
            :error="errors.passwordConfirm"
            required
          />

          <div class="flex items-start gap-2">
            <input
              v-model="agreeTerms"
              type="checkbox"
              id="agree"
              class="mt-1 h-4 w-4 rounded border-input bg-input-background focus:ring-ring"
            />
            <label for="agree" class="text-sm text-muted-foreground">
              Concordo com os <router-link to="#" class="text-secondary hover:underline">termos de serviço</router-link>
            </label>
          </div>

          <p v-if="errors.form" class="text-sm text-destructive">{{ errors.form }}</p>

          <Button type="submit" variant="primary" :fullWidth="true" :loading="loading">
            Criar Conta
          </Button>

          <p class="text-center text-sm text-muted-foreground">
            Já tem uma conta?
            <router-link to="/login" class="text-secondary hover:underline font-medium">
              Faça login
            </router-link>
          </p>
        </form>
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
import axios from 'axios'
import { Input, Button } from '../components/ui'

const fullName = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const agreeTerms = ref(false)
const loading = ref(false)
const router = useRouter()

const errors = ref({
  fullName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  form: ''
})

const handleSignup = async () => {
  errors.value = { fullName: '', email: '', password: '', passwordConfirm: '', form: '' }

  if (!fullName.value.trim()) {
    errors.value.fullName = 'Nome completo é obrigatório'
    return
  }
  if (!email.value.trim()) {
    errors.value.email = 'Email é obrigatório'
    return
  }
  if (password.value.length < 6) {
    errors.value.password = 'Mínimo 6 caracteres'
    return
  }
  if (password.value !== passwordConfirm.value) {
    errors.value.passwordConfirm = 'Senhas não conferem'
    return
  }
  if (!agreeTerms.value) {
    alert('Você deve concordar com os termos de serviço')
    return
  }

  loading.value = true
  try {
    const { data } = await axios.post('/auth/register', {
      nome: fullName.value,
      email: email.value,
      password: password.value
    })

    localStorage.setItem('session', data.token)
    localStorage.setItem('userName', data.user.nome)
    localStorage.setItem('userEmail', data.user.email)
    router.push('/')
  } catch (error) {
    errors.value.form = error.response?.data?.error || 'Não foi possível criar a conta'
  } finally {
    loading.value = false
  }
}
</script>
