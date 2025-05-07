<template>
    <div class="error-message">
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    message: {
      type: String,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .error-message {
    color: red;
    font-size: 1.2rem;
    text-align: center;
    background-color: #ffcccb;
    border: 1px solid red;
    padding: 1rem;
    border-radius: 8px;
  }
  </style>