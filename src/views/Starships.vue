<template>
    <div>
  
      <!-- Puedes agregar un componente de carga mientras se obtienen los datos -->
      <LoadingIndicator v-if="loading" />
  
      <!-- En caso de error, mostrar el mensaje -->
      <ErrorMessage v-else-if="error" :message="error" />
  
      <!-- Si no hay error y los datos están listos, mostrar la lista de naves -->
      <div v-else>
        <StarshipsList />
      </div>
    </div>
  </template>
  
  <script setup>
  // Importa los componentes necesarios
  import StarshipsList from '../components/StarshipsList.vue'
  import LoadingIndicator from '../components/LoadingIndicator.vue'
  import ErrorMessage from '../components/ErrorMessage.vue'
  
  // Aquí puedes agregar lógica si quieres hacer alguna llamada a la API o manejar datos específicos de esta vista
  // Por ejemplo, si necesitas cargar alguna información extra para las naves
  </script>
  
  <style scoped>
  /* Aquí puedes agregar estilos específicos para la vista de Starships */
  </style>
  