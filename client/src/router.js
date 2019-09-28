import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddEvent from './views/AddEvent.vue'
import Auth from './views/Auth.vue'
import store from './store'

Vue.use(Router)

function guard(to, from, next){
  if(store.state.isLoggedIn) {
      // or however you store your logged in state
      next(); // allow to enter route
  } else{
      next()
      next('/auth'); // go to '/login';
  }
}

const router = new Router({
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
      component: AddEvent,
      beforeEnter: guard,
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
})

export default router;
