import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rowsPerPage: 20,
    page: 1,
    beers: [],
    loader: false
  },
  mutations: {
    // Note: methods for pagination
    nextPage (state) {
      if (state.page < 17) {
        state.page = state.page + 1
      }
    },
    previousPage (state) {
      if (state.page > 1) {
        state.page = state.page - 1
      }
    },
    resetPage (state) {
      state.page = 1
    },
    // Note: methods for beers
    getBeers (state, beers) {
      state.beers = beers
    },
    // Note: methods for loader
    showLoader (state, bool) {
      state.loader = bool
    }
  },
  actions: {
    // Note: methods for pagination
    nextPageAction (context) {
      context.commit('nextPage')
    },
    previousPageAction (context) {
      context.commit('previousPage')
    },
    resetPageAction (context) {
      context.commit('resetPage')
    },
    // Note: methods for pagination
    getBeersAction (context, beers) {
      context.commit('getBeers', beers)
    },
    // Note: methods for loader
    showLoaderAction (context, bool) {
      context.commit('showLoader', bool)
    }
  },
  modules: {
  },
  getters: {
    // Note: methods for pagination
    getRowsPerPage (state) {
      return state.rowsPerPage
    },
    getPage (state) {
      return state.page
    },
    // Note: methods for pagination
    getBeers (state) {
      return state.beers
    },
    // Note: methods for loader
    getLoader (state) {
      return state.loader
    }
  }
})
