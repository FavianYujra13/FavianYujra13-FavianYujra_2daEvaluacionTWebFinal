<template>
  <div>
    <h2>Lista de Planetas</h2>

    <!-- Mostrar componente de carga -->
    <LoadingIndicator v-if="loading" />

    <!-- Mostrar mensaje de error si ocurre un problema -->
    <ErrorMessage v-else-if="error" :message="error" />

    <div v-else>
      <div class="grid">
        <PlanetCard
          v-for="planet in planets"
          :key="planet.uid"
          :planet="planet"
        />
      </div>

      <!-- Paginación -->
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
import PlanetCard from './PlanetCard.vue'
import LoadingIndicator from './LoadingIndicator.vue'
import ErrorMessage from './ErrorMessage.vue'

const planets = ref([])
const loading = ref(true)
const error = ref(null)

const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 10  // Número de elementos por página

// Función para obtener los planetas
const fetchPlanets = async () => {
  loading.value = true
  try {
    planets.value = []  // Limpiar los datos antes de hacer una nueva solicitud
    
    const res = await axios.get(`https://www.swapi.tech/api/planets?page=${currentPage.value}&limit=${itemsPerPage}`)
    
    totalPages.value = Math.ceil(res.data.total_records / itemsPerPage)

    const detailedPlanets = await Promise.all(
      res.data.results.map(async (item) => {
        const detail = await axios.get(item.url)
        return {
          uid: item.uid,
          url: item.url,
          ...detail.data.result.properties
        }
      })
    )

    planets.value = detailedPlanets
    error.value = null
  } catch (err) {
    error.value = 'Error al cargar planetas.'
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

// Llamar a fetchPlanets cuando el componente se monta
onMounted(fetchPlanets)

// Verificar cambios en la página y llamar a fetchPlanets nuevamente
watch(currentPage, fetchPlanets)
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
