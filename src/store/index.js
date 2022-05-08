import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rowsPerPage: 20,
    page: 1,
    beers: [],
    loader: false,
    showFilters: false,
    filters: {
      name: '',
      abv_gt: '',
      abv_lt: '',
      brewed_before: '',
      brewed_after: ''
    }
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
    },
    // Note: methods for filters
    changeFilters (state, params) {
      if (params.name) {
        state.filters.name = params.name
      }
      if (params.abv_gt) {
        state.filters.abv_gt = params.abv_gt
      }
      if (params.abv_lt) {
        state.filters.abv_lt = params.abv_lt
      }
      if (params.brewed_before) {
        state.filters.brewed_before = params.brewed_before
      }
      if (params.brewed_after) {
        state.filters.brewed_after = params.brewed_after
      }
    },
    refreshFilters (state) {
      state.filters.name = ''
      state.filters.abv_gt = ''
      state.filters.abv_lt = ''
      state.filters.brewed_before = ''
      state.filters.brewed_after = ''
    },
    // Note: methods for loader
    showFilters (state) {
      state.showFilters = !state.showFilters
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
    },
    // Note: methods for filters
    changeFiltersAction (context, params) {
      context.commit('changeFilters', params)
    },
    refreshFiltersAction (context) {
      context.commit('refreshFilters')
    },
    showFiltersAction (context) {
      context.commit('showFilters')
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
    },
    // Note: methods for filters
    getFilters (state) {
      return state.filters
    },
    getShowFilters (state) {
      return state.showFilters
    }
  }
})
