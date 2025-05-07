<template>
    <div class="card">
      <h3>{{ planet.name }}</h3>
      <p><strong>Clima:</strong> {{ planet.climate }}</p>
      <p><strong>Terreno:</strong> {{ planet.terrain }}</p>
      <p><strong>Población:</strong> {{ planet.population }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    planet: {
      type: Object,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem;
    width: 250px;
    background-color: white;
    color: black;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  </style>
  