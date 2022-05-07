<template>
  <v-container>
    <v-row class="text-left vertical-align">
      <v-col cols="12">
        <h1>
          List of beers
        </h1>
      </v-col>
    </v-row>
    <v-row class="text-left vertical-align">
      <v-col cols="3">
        <v-text-field
          v-model.trim="search"
          label="Name"
        >
          <template v-slot:append>
            <v-icon
              dense
              color="green darken-4"
              class="cursor-pointer"
            >
              mdi-magnify
            </v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <beers-list :beers="beers" />
  </v-container>
</template>

<script>
import BeersList from '../components/BeersList'
import { api } from '../plugins/axiosConfig'

export default {
  name: 'Beers',
  components: {
    BeersList
  },
  data () {
    return {
      beers: [],
      search: ''
    }
  },
  mounted () {
    console.log('estas en beers')
    this.getBeers()
  },
  methods: {
    async getBeers () {
      const filtros = new URLSearchParams()
      filtros.append('page', '1')
      filtros.append('per_page', '20')
      const params = { params: filtros }
      await api.get('beers', params).then((response) => {
        console.log(response)
        if (response.status !== 200) {
          console.log('ocurrio un error')
        }
        this.beers = response.data
        this.beers.map(b => console.log(b.id))
      })
    }
  }
}
</script>
