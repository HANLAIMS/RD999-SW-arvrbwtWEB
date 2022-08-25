import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import userStore from '@/store/userStore.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  // state, mutations, actions, getters 모두 모듈화시킴.

  modules: {
      userStore: userStore,
  },
  //vuex plugin 명시
  plugins: [createPersistedState({
      paths: ["userStore"]
  })]
})

export default store