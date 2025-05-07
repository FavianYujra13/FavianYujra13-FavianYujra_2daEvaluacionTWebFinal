<template>
  <div>

    <!-- Puedes agregar un componente de carga mientras se obtienen los datos -->
    <LoadingIndicator v-if="loading" />

    <!-- Mostrar un mensaje de error si no se cargan los planetas -->
    <ErrorMessage v-else-if="error" :message="error" />

    <!-- Mostrar la lista de planetas -->
    <div v-else>
      <PlanetsList />
    </div>
  </div>
</template>

<script setup>
// Importa los componentes necesarios
import PlanetsList from '../components/PlanetsList.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos para la vista de Planets */
</style>
