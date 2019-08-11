import Vue from 'vue'
import Vuex from 'vuex'
import AuthServices from '@/services/AuthServices'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isLoggedIn: false,
    token: null,
    firsttime: true
  },
  mutations: {
    setUser (state,user) {
      state.user = user
    },
    setIsLoggedIn (state,isLoggedIn) {
      state.isLoggedIn = isLoggedIn
    },
    setToken(state,token) {
      state.token = token
    },
    setFirstTime(state,firsttime) {
      state.firsttime = firsttime
    }
  },
  actions: {
    setUser({commit},user) {
      commit('setUser',user)
    },
    setIsLoggedIn({commit},isLoggedIn) {
      commit('setIsLoggedIn',isLoggedIn)
    },
    setToken({commit},token) {
      commit('setToken',token)
    },
    setFirstTime ({commit},firsttime) {
      commit('setFirstTime',firsttime)
    },
    setCookie () {
      $cookies.set('token',this.state.token);
      $cookies.set('user',this.state.user)
    },
    async authenticate () {
      console.log("Inside Authenticate")
      this.state.token = $cookies.get('token')
      this.state.user = $cookies.get('user')
      
      if (this.state.token) {
        const token = await AuthServices.verifyToken({
          token: this.state.token
        })
        if (token.data.status) {
          console.log("Not Expired")
          this.state.isLoggedIn = true
        }
        else {
          console.log("Expired")
          this.state.token = null
          this.state.user = null
          router.push({
            name: 'auth'
          })
        }
      }
    }
  }
})
