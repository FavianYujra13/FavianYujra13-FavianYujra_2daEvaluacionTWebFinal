import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue' 
import Starships from './views/Starships.vue'  // Asegúrate de importar la vista de Starships
import Planets from './views/Planets.vue'  // Asegúrate de importar la vista de Planets

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/starships', name: 'Starships', component: Starships },  // Nueva ruta para Starships
    { path: '/planets', name: 'Planets', component: Planets },  // Ruta para Planets
    { path: '/:pathMatch(.*)*', redirect: '/' }  // Redirección si se ingresa una ruta incorrecta
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
