<template>
  <div class="card">
    <h3>{{ ship.name }}</h3>
    <p><strong>Modelo:</strong> {{ ship.model }}</p>
    <p><strong>Clase:</strong> {{ ship.starship_class }}</p>
    <p><strong>Fabricante:</strong> {{ ship.manufacturer }}</p>
  </div>
</template>

<script setup>
defineProps({
ship: {
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
