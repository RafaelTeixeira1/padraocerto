<template>
  <div class="min-h-screen bg-background p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <button @click="$router.back()" class="text-secondary hover:underline mb-4">← Voltar</button>
      </div>

      <!-- Success Status -->
      <div class="bg-card rounded-lg border border-green-200 bg-green-50 p-8 text-center shadow-sm mb-8">
        <div class="text-6xl mb-4">✅</div>
        <h1 class="text-3xl font-bold text-green-900 mb-2">Inspeção Finalizada</h1>
        <p class="text-green-700">Relatório gerado em {{ reportDate }} às {{ reportTime }}</p>
      </div>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Info Card -->
        <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h3 class="text-sm font-medium text-muted-foreground mb-4">Informações da Inspeção</h3>
          <div class="space-y-3 text-sm">
            <div>
              <p class="text-xs text-muted-foreground">Obra</p>
              <p class="font-medium text-foreground">Centro Comercial</p>
            </div>
            <div>
              <p class="text-xs text-muted-foreground">Checklist</p>
              <p class="font-medium text-foreground">Estrutura Civil</p>
            </div>
            <div>
              <p class="text-xs text-muted-foreground">Responsável</p>
              <p class="font-medium text-foreground">João Silva</p>
            </div>
            <div>
              <p class="text-xs text-muted-foreground">Total de Itens</p>
              <p class="font-medium text-foreground">5</p>
            </div>
          </div>
        </div>

        <!-- Conformity Card -->
        <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h3 class="text-sm font-medium text-muted-foreground mb-4">Taxa de Conformidade</h3>
          <div class="flex flex-col items-center justify-center">
            <div class="text-5xl font-bold text-green-600 mb-3">88%</div>
            <div class="w-full bg-muted rounded-full h-3 mb-4">
              <div class="bg-green-500 h-3 rounded-full" style="width: 88%"></div>
            </div>
            <div class="space-y-2 text-sm w-full">
              <div class="flex justify-between">
                <span class="text-foreground">Conformes:</span>
                <span class="font-semibold text-green-600">4 itens</span>
              </div>
              <div class="flex justify-between">
                <span class="text-foreground">Não-conformes:</span>
                <span class="font-semibold text-red-600">1 item</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h3 class="text-sm font-medium text-muted-foreground mb-4">Resumo</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <span class="text-2xl">✅</span>
              <div>
                <p class="text-xs text-green-600 font-medium">Conformes</p>
                <p class="text-lg font-bold text-green-700">4 de 5</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <span class="text-2xl">❌</span>
              <div>
                <p class="text-xs text-red-600 font-medium">Não-conformes</p>
                <p class="text-lg font-bold text-red-700">1 de 5</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Items Detail -->
      <div class="bg-card rounded-lg border border-border p-6 shadow-sm mb-8">
        <h2 class="text-lg font-semibold text-foreground mb-4">Detalhes dos Itens</h2>

        <div class="space-y-3">
          <div class="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div class="flex gap-3">
              <span class="text-2xl">✅</span>
              <div class="flex-1">
                <p class="font-medium text-foreground">Item 1: Fundações executadas corretamente</p>
                <p class="text-xs text-muted-foreground mt-1">Status: <span class="text-green-600 font-semibold">Conforme</span></p>
              </div>
            </div>
          </div>

          <div class="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div class="flex gap-3">
              <span class="text-2xl">✅</span>
              <div class="flex-1">
                <p class="font-medium text-foreground">Item 2: Pilares alinhados e com espaçamento correto</p>
                <p class="text-xs text-muted-foreground mt-1">Status: <span class="text-green-600 font-semibold">Conforme</span></p>
              </div>
            </div>
          </div>

          <div class="p-4 border border-red-200 bg-red-50 rounded-lg">
            <div class="flex gap-3">
              <span class="text-2xl">❌</span>
              <div class="flex-1">
                <p class="font-medium text-foreground">Item 3: Vigas principais com apoio adequado</p>
                <p class="text-xs text-muted-foreground mt-1">Status: <span class="text-red-600 font-semibold">Não Conforme</span></p>
                <div class="mt-2 p-2 bg-white rounded border border-red-100">
                  <p class="text-sm text-foreground"><span class="font-medium">Observação:</span> Viga B3 apresenta pequeno desalinhamento de 1,5cm</p>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div class="flex gap-3">
              <span class="text-2xl">✅</span>
              <div class="flex-1">
                <p class="font-medium text-foreground">Item 4: Lajes sem fissuras aparentes</p>
                <p class="text-xs text-muted-foreground mt-1">Status: <span class="text-green-600 font-semibold">Conforme</span></p>
              </div>
            </div>
          </div>

          <div class="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div class="flex gap-3">
              <span class="text-2xl">✅</span>
              <div class="flex-1">
                <p class="font-medium text-foreground">Item 5: Escoramentos removidos conforme cronograma</p>
                <p class="text-xs text-muted-foreground mt-1">Status: <span class="text-green-600 font-semibold">Conforme</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 justify-center">
        <Button variant="outline" @click="$router.push('/')">
          Voltar ao Dashboard
        </Button>
        <Button variant="secondary" @click="startNewInspection">
          + Nova Inspeção
        </Button>
        <Button variant="primary">
          📄 Gerar PDF
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '../components/ui'

const router = useRouter()

const now = new Date()
const reportDate = now.toLocaleDateString('pt-BR')
const reportTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

const startNewInspection = () => {
  alert('Implementar iniciar nova inspeção')
}
</script>
