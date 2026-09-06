<script setup>
import { ref, onMounted } from 'vue'
import { getApiStatus } from '../services/systemService'
import { getGeneralFeed } from '../services/newsService'

const apiStatus = ref('verificando...')

onMounted(async () => {
  try {
    const response = await getApiStatus()
    apiStatus.value = response.data.status // "online"
  } catch (error) {
    apiStatus.value = 'offline'
    console.error('Erro ao consultar a API:', error.message)
  }

  // --- teste temporário do newsService (extra, não faz parte da entrega oficial) ---
  getGeneralFeed()
    .then((response) => {
      console.log('Feed geral OK:', response.data)
    })
    .catch((error) => {
      console.error('Erro ao buscar feed:', error.message)
    })
  // --- fim do teste temporário ---
})
</script>

<template>
  <div class="landing">
    <h1>Bem-vindo ao NewsStream</h1>
    <p>Status da API: <strong>{{ apiStatus }}</strong></p>
  </div>
</template>