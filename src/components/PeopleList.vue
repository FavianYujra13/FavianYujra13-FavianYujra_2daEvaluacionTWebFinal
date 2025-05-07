<template>
  <div>
    <h2>Lista de Personajes</h2>

    <!-- Reemplazar el mensaje de carga por el nuevo componente -->
    <LoadingIndicator v-if="loading" />

    <!-- Reemplazar el mensaje de error por el nuevo componente -->
    <ErrorMessage v-else-if="error" :message="error" />

    <div v-else>
      <div class="grid">
        <PersonCard
          v-for="person in people"
          :key="person.uid"
          :person="person"
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
import PersonCard from './PersonCard.vue'
import LoadingIndicator from './LoadingIndicator.vue'  
import ErrorMessage from './ErrorMessage.vue' 

const people = ref([])
const loading = ref(true)
const error = ref(null)

const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 10  // Número de elementos por página

// Función para obtener los datos de personajes
const fetchPeople = async () => {
  loading.value = true
  try {
    people.value = []  // Limpiar los datos antes de hacer una nueva solicitud
    
    const res = await axios.get(`https://www.swapi.tech/api/people?page=${currentPage.value}&limit=${itemsPerPage}`)
    
    totalPages.value = Math.ceil(res.data.total_records / itemsPerPage)

    const detailedPeople = await Promise.all(
      res.data.results.map(async (item) => {
        const detail = await axios.get(item.url)
        return detail.data.result.properties
      })
    )
    
    people.value = detailedPeople // Asignar los datos obtenidos
    error.value = null
  } catch (err) {
    error.value = 'Error al cargar personajes. Intente nuevamente.'
    console.error('Error fetching people:', err)
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

// Llamar a fetchPeople cuando el componente se monta
onMounted(fetchPeople)

// Verificar cambios en la página y llamar a fetchPeople nuevamente
watch(currentPage, fetchPeople)
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
  gap: 1rem;
  margin-top: 1.5rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
