import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken : null,
  },
  mutations: {
    LOGIN (state, {accessToken}) {
      state.accessToken = accessToken
    },
    LOGOUT (state) {
      state.accessToken = null
    },
  },
  actions: {
    LOGIN ({commit}, {email, password}) {
      return axios.post(`${process.env.VUE_APP_SERVER_DOMAIN}/login`, {email, password})
      .then(({token}) => commit('LOGIN', token))
    },
    LOGOUT ({commit}) {
      commit('LOGOUT')
    },
  },
  modules: {
  }
})
