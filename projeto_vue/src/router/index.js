import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'CadastroView',
    component: () => import(/* webpackChunkName: "about" */ '../views/CadastroView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pedidos',
    name: 'PedidosView',

    component: () => import(/* webpackChunkName: "about" */ '../views/PedidosView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
