import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false

Vue.use(VueCookies)
VueCookies.config('7d')

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
