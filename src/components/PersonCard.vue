<template>
    <div class="card">
        <h3>{{ person.name }}</h3>
        <p><strong>Altura:</strong> {{ person.height }} cm</p>
        <p><strong>Género:</strong> {{ person.gender }}</p>
        <p><strong>Nacimiento:</strong> {{ person.birth_year }}</p>
    </div>
</template>

<script setup>
defineProps({
    person: {
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
    width: 200px;
    background-color: white;
    color: black;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
</style>