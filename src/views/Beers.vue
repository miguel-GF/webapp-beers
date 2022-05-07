<template>
  <v-container>
    <v-row class="text-left vertical-align">
      <v-col cols="12">
        <h2>
          List of beers
        </h2>
      </v-col>
    </v-row>
    <v-row class="text-left vertical-align">
      <v-col cols="3">
        <v-text-field
          v-model.trim="search"
          dense
          label="Name"
          @keyup.enter.prevent="getBeers()"
        >
          <template v-slot:append>
            <v-icon
              dens
              color="green darken-4"
              class="cursor-pointer"
              @click="getBeers()"
            >
              mdi-magnify
            </v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <beers-list @get-beers="getBeers()" />
  </v-container>
</template>

<script>
import BeerService from '../services/BeerService'
import BeersList from '../components/BeersList'

export default {
  name: 'Beers',
  components: {
    BeersList
  },
  data () {
    return {
      search: ''
    }
  },
  mounted () {
    this.getBeers()
  },
  methods: {
    async getBeers () {
      this.$store.dispatch('showLoaderAction', true)
      const filtros = this.handleFilters()
      const params = { params: filtros }
      await BeerService.getBeers('beers', params)
        .then(response => {
          if (response.status !== 200) {
            console.log('ocurrio un error')
          }
          response.data.map(b => console.log(b.id))
          console.log(response.data.length)
          this.$store.dispatch('showLoaderAction', false)
        })
        .catch((e) => {
          console.log(e)
          this.$store.dispatch('showLoaderAction', false)
        })
    },
    handleFilters () {
      const filtros = new URLSearchParams()
      filtros.append('page', this.$store.getters.getPage)
      filtros.append('per_page', this.$store.getters.getRowsPerPage)

      if (this.search) {
        filtros.append('beer_name', this.search)
      }

      return filtros
    }
  }
}
</script>
