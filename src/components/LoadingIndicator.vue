<template>
    <div class="loading-indicator sw-lightsaber">
      <div class="lightsaber-handle"></div>
      <div class="lightsaber-blade"></div>
      <p class="loading-text">Procesando...</p>
    </div>
  </template>
  
  <style scoped>
  .loading-indicator.sw-lightsaber {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .lightsaber-handle {
    width: 40px;
    height: 80px;
    background-color: #333;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }
  
  .lightsaber-blade {
    width: 10px;
    height: 120px;
    background-color: #00ffff; /* Azul claro de sable de luz */
    border-radius: 5px;
    box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
    animation: pulse 1s infinite alternate;
  }
  
  .loading-text {
    font-size: 1.2rem;
    color: #eee;
  }
  
  @keyframes pulse {
    from {
      opacity: 0.8;
    }
    to {
      opacity: 1;
    }
  }
  </style>
  
  <script setup>
  // Puedes agregar lógica aquí si es necesario
  </script>