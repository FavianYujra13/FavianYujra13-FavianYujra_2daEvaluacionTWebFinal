// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css' // si usas estilos globales

const app = createApp(App)
app.use(router)
app.mount('#app')
