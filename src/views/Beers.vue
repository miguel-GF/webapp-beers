<template>
  <v-container>
    <v-row class="text-left">
      <v-col cols="12">
        <v-row class="text-left">
          <v-col lg="7" md="4" sm="12">
            <h2>
              List of beers
            </h2>
          </v-col>
          <v-col lg="3" md="3" sm="8">
            <v-text-field
              v-model.trim="filters.name"
              dense
              outlined
              label="Name"
              append-icon="mdi-magnify"
              @click:append="getBeers()"
              @keyup.enter.prevent="getBeers()"
            >
            </v-text-field>
          </v-col>
          <v-col class="text-left" lg="2" md="2" sm="4">
            <v-btn
              elevation="2"
              small
              @click="refresh()"
              class="mr-4 mt-1"
            >
            <v-icon>
              mdi-refresh
            </v-icon>
            </v-btn>
            <v-btn
              elevation="2"
              small
              color="info"
              @click="$store.dispatch('showFiltersAction')"
              class="mt-1"
            >
              <v-icon>
                {{ $store.getters.getShowFilters === true ? 'mdi-filter-remove' : 'mdi-filter'}}
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-container v-if="$store.getters.getShowFilters === true" class="overflow-x-visible">
    <v-row class="text-left">
      <v-col cols="10 row" sm="9">
        <!-- Firs row -->
        <v-col cols="7" xl="7" lg="7" md="7" sm="12" xs="12" class="pa-0">
          <v-row class="text-left">
            <v-col cols="2" class="body-2">
              <span>Between</span>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.trim="filters.abv_gt"
                dense
                outlined
                label="Abv min"
                @keypress=validateNumber($event)
                @keyup.enter.prevent="getBeers()"
              />
            </v-col>
            <v-col cols="1" class="body-2">
              <span>and</span>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.trim="filters.abv_lt"
                dense
                outlined
                label="Abv max"
                @keypress=validateNumber($event)
                @keyup.enter.prevent="getBeers()"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="5" xl="5" lg="5" md="5" sm="12" xs="12" class="pa-0">
          <v-row class="text-left">
            <v-col cols="4" class="body-2">
              <span>Food pairing</span>
            </v-col>
            <v-col>
              <v-text-field
                v-model.trim="filters.food"
                dense
                outlined
                label="Food name"
                @keyup.enter.prevent="getBeers()"
              />
            </v-col>
          </v-row>
        </v-col>
        <!-- Second row -->
        <v-col cols="7" xl="7" lg="7" md="7" sm="12" xs="12" class="pa-0">
          <v-row class="text-left">
            <v-col cols="2" class="body-2">
              <span>Between</span>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.trim="filters.brewed_after"
                dense
                outlined
                label="Brewed min"
                placeholder="MM/YYYY"
                v-mask="'##/####'"
                @keyup.enter.prevent="getBeers()"
              />
            </v-col>
            <v-col cols="1" class="body-2">
              <span>and</span>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.trim="filters.brewed_before"
                dense
                outlined
                label="Brewed max"
                placeholder="MM/YYYY"
                v-mask="'##/####'"
                @keyup.enter.prevent="getBeers()"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="5" xl="5" lg="5" md="5" sm="12" xs="12" class="pa-0" />
      </v-col>
      <v-col cols="2" sm="3" class="pt-0 pl-5">
         <v-btn
          elevation="2"
          small
          @click="getBeers()"
          class="mt-1"
        >
          Apply filters
          <v-icon class="ml-2">
            mdi-filter-check
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    </v-container>
    <beers-list @get-beers="getBeers()" />
  </v-container>
</template>

<script>
import BeerService from '../services/BeerService'
import UtilService from '../services/UtilService'
import BeersList from '../components/BeersList'

export default {
  name: 'Beers',
  components: {
    BeersList
  },
  data () {
    return {
      filters: {
        name: '',
        abv_gt: '',
        abv_lt: '',
        brewed_before: '',
        brewed_after: '',
        food: ''
      },
      showFilters: false
    }
  },
  mounted () {
    this.filters = this.$store.getters.getFilters
    this.getBeers()
  },
  methods: {
    async getBeers () {
      this.$store.dispatch('showLoaderAction', true)
      const filtros = await this.handleFilters()
      const params = { params: filtros }
      await BeerService.getBeers('beers', params)
        .then(response => {
          if (response.status !== 200) {
            console.log('ocurrio un error')
          }
          this.$store.dispatch('changeFiltersAction', this.filters)
          this.$store.dispatch('showLoaderAction', false)
        })
        .catch((e) => {
          console.log(e)
          this.$store.dispatch('showLoaderAction', false)
        })
    },
    async handleFilters () {
      const filters = new URLSearchParams()

      if (this.filters.name) {
        filters.append('beer_name', this.filters.name)
      }
      if (this.filters.abv_gt) {
        filters.append('abv_gt', this.filters.abv_gt)
      }
      if (this.filters.abv_lt) {
        filters.append('abv_lt', this.filters.abv_lt)
      }
      if (this.filters.brewed_before) {
        filters.append('brewed_before', this.filters.brewed_before)
      }
      if (this.filters.brewed_after) {
        filters.append('brewed_after', this.filters.brewed_after)
      }
      if (this.filters.food) {
        filters.append('food', this.filters.food.replace(' ', '_'))
      }
      this.resetPage()
      filters.append('page', this.$store.getters.getPage)
      filters.append('per_page', this.$store.getters.getRowsPerPage)

      return filters
    },
    validateNumber (event) {
      UtilService.isNumber(event)
    },
    async refresh () {
      await this.refreshFilters()
      await this.getBeers()
    },
    async refreshFilters () {
      this.filters = {
        name: '',
        abv_gt: '',
        abv_lt: '',
        brewed_before: '',
        brewed_after: '',
        food: ''
      }
      this.$store.dispatch('resetPageAction')
      this.$store.dispatch('refreshFiltersAction')
    },
    async resetPage () {
      let validation = false
      const filtersStore = this.$store.getters.getFilters
      if (this.filters.name !== filtersStore.name) {
        validation = true
      } else if (this.filters.abv_gt !== filtersStore.abv_gt) {
        validation = true
      } else if (this.filters.abv_lt !== filtersStore.abv_lt) {
        validation = true
      } else if (this.filters.brewed_after !== filtersStore.brewed_after) {
        validation = true
      } else if (this.filters.brewed_before !== filtersStore.brewed_before) {
        validation = true
      } else if (this.filters.food !== filtersStore.food) {
        validation = true
      }
      if (validation) {
        this.$store.dispatch('resetPageAction')
      }
    }
  }
}
</script>
