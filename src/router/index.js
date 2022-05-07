import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Beers from '../views/Beers.vue'
import BeersDetail from '../views/BeersDetail.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Beers',
    name: 'Beers',
    component: Beers
  },
  {
    path: '/Beers/Detail/:id',
    name: 'BeersDetail',
    component: BeersDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
