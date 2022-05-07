<template>
  <v-container>
    <v-col class="mb-4">
      <h1 class="display-2 font-weight-bold mb-3">
        Beer list
      </h1>
      <h5>{{ beerDetail || '--' }}</h5>
    </v-col>
  </v-container>
</template>

<script>
import { api } from '../plugins/axiosConfig'

export default {
  name: 'Beers',
  data () {
    return {
      beerDetail: {}
    }
  },
  mounted () {
    console.log('ES EL DETALLE')
    console.log(this.$router)
    console.log(this.$route)
    this.getBeersDetail()
  },
  methods: {
    async getBeersDetail () {
      const filtros = new URLSearchParams()
      filtros.append('ids', this.$route.params.id)
      const params = { params: filtros }
      await api.get('beers', params).then((response) => {
        console.log(response)
        if (response.status !== 200) {
          console.log('ocurrio un error')
        }
        this.beerDetail = response.data.length > 0 ? response.data[0] : {}
      })
    }
  }
}
</script>
