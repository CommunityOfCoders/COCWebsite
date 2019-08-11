import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddEvent from './views/AddEvent.vue'
import Auth from './views/Auth.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/event/add',
      name: 'add-event',
      component: AddEvent
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
})
