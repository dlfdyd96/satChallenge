import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const enhanceAccessToken = () => {
  const {accessToken} = localStorage
  if(!accessToken) return
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}
enhanceAccessToken()

export default new Vuex.Store({
  state: {
    accessToken : null,
  },
  getters: {
    isAuthenticated(state) {
      state.accessToken = state.accessToken || localStorage.accessToken
      return state.accessToken
    },
  },
  mutations: {
    LOGIN (state, {accessToken}) {
      state.accessToken = accessToken
      localStorage.accessToken = accessToken
    },
    LOGOUT (state) {
      state.accessToken = null
      delete localStorage.accessToken
    }
  },
  actions: {
    LOGIN ({commit}, {email, password}) {
      return axios.post(`${process.env.VUE_APP_SERVER_DOMAIN}/login`, {email, password})
      .then(({data : {token}}) => {
        commit('LOGIN', {accessToken : token})
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      })
    },
    LOGOUT ({commit}) {
      axios.defaults.headers.common['Authorization'] = undefined
      commit('LOGOUT')
    },
  },
  modules: {
  }
})
