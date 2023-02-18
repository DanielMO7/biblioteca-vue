import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../modules/home/HomeView.vue')
  },
  {
    path: '/ingresar',
    name: 'ingresar',
    component: () => import(/* webpackChunkName: "ingresar" */ '../modules/login/LoginView.vue')
  },
  {
    path: '/insertar',
    name: 'insertar',
    component: () => import(/* webpackChunkName: "insertar" */ '../modules/register/RegisterView.vue')
  },
  {
    path: '*',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/404View.vue')
  }

]

const router = new VueRouter({
  mode:'history',
  routes
})


export default router
