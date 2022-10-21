import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import userStore from '@/store/userStore.js'
import constants from '@/store/constants.js'
import trendDataset from '@/store/trendDatasetStore.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  // state, mutations, actions, getters 모두 모듈화시킴.

  modules: {
      userStore: userStore,
      constants: constants,
      trendDataset: trendDataset,
  },
  //vuex plugin 명시
  plugins: [createPersistedState({
      paths: ["userStore","constants","trendDataset"]
  })]
})

export default store