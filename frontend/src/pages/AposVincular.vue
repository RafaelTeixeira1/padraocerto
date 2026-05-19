<template>
  <div class="min-h-screen bg-background p-6">
    <div class="max-w-2xl mx-auto text-center">
      <div class="bg-card rounded-lg p-8 border border-border mb-6">
        <h2 class="text-2xl font-bold text-foreground mb-2">Checklist Vinculado</h2>
        <p class="text-muted-foreground mb-2">O checklist foi vinculado com sucesso à obra.</p>
        <p v-if="checklistNome" class="text-sm text-foreground mb-4">Checklist: <span class="font-medium">{{ checklistNome }}</span></p>
        <div class="space-x-3 space-y-3 sm:space-y-0">
          <router-link :to="`/obras/${obraId}`" class="inline-block px-4 py-2 bg-primary text-white rounded">Ver Obra</router-link>
          <router-link
            v-if="checklistId"
            :to="`/obras/${obraId}/checklist/${checklistId}/confirm`"
            class="inline-block px-4 py-2 bg-secondary text-white rounded"
          >
            Iniciar Inspeção
          </router-link>
          <router-link to="/" class="inline-block px-4 py-2 bg-muted rounded">Voltar ao Dashboard</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const obraId = route.params.obraId
const checklistId = route.query.checklistId ? String(route.query.checklistId) : ''
const checklistNome = ref('')

onMounted(async () => {
  if (!checklistId) return

  try {
    const response = await axios.get('/checklists')
    const checklist = response.data.find(item => String(item.id) === String(checklistId))
    checklistNome.value = checklist ? checklist.nome : ''
  } catch (error) {
    console.error(error)
  }
})
</script>
