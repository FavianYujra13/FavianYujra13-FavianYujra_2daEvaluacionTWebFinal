<template>
  <div>
    <h2>Lista de Naves Estelares</h2>

    <!-- Reemplazar el mensaje de carga por el nuevo componente -->
    <LoadingIndicator v-if="loading" />

    <!-- Reemplazar el mensaje de error por el nuevo componente -->
    <ErrorMessage v-else-if="error" :message="error" />

    <div v-else>
      <div class="grid">
        <StarshipCard
          v-for="ship in starships"
          :key="ship.uid"
          :ship="ship"
        />
      </div>

      <div class="pagination" v-if="totalPages > 1">
        <button :disabled="currentPage === 1" @click="prevPage">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="nextPage">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import StarshipCard from './StarshipCard.vue'
import LoadingIndicator from './LoadingIndicator.vue'
import ErrorMessage from './ErrorMessage.vue'

const starships = ref([])
const loading = ref(true)
const error = ref(null)

const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 10  // Número de elementos por página

// Función para obtener las naves estelares
const fetchStarships = async () => {
  loading.value = true
  try {
    starships.value = []  // Limpiar los datos antes de hacer una nueva solicitud
    
    const res = await axios.get(`https://www.swapi.tech/api/starships?page=${currentPage.value}&limit=${itemsPerPage}`)
    
    totalPages.value = Math.ceil(res.data.total_records / itemsPerPage)

    const detailedStarships = await Promise.all(
      res.data.results.map(async (item) => {
        const detail = await axios.get(item.url)
        return {
          uid: item.uid,
          url: item.url,
          ...detail.data.result.properties
        }
      })
    )

    starships.value = detailedStarships
    error.value = null
  } catch (err) {
    error.value = 'Error al cargar naves estelares.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Función para cambiar a la siguiente página
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Función para cambiar a la página anterior
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Llamar a fetchStarships cuando el componente se monta
onMounted(fetchStarships)

// Verificar cambios en la página y llamar a fetchStarships nuevamente
watch(currentPage, fetchStarships)
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.pagination button {
  padding: 0.6rem 1.2rem;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid #555;
  background-color: #222;
  color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

.pagination button:hover {
  background-color: #444;
  border-color: #ffd700;
  transform: scale(1.05); /* Efecto de ampliación suave en botones */
}

.pagination button:disabled {
  background-color: #555;
  color: #999;
  cursor: not-allowed;
  border-color: #777;
}
</style>
