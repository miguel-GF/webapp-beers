<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <h2>
          Detail of beer
        </h2>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-img :src="beerDetail.image_url" max-width="150"  :aspect-ratio="1/2"  />
    </v-row>
    <v-row class="justify-center">
      {{ beerDetail.name || '--' }}
    </v-row>
    <v-row class="justify-center">
      {{ beerDetail.tagline || '--' }}
    </v-row>
    <v-row class="justify-center">
      {{ beerDetail.description || '--' }}
    </v-row>
    <v-row class="mt-10">
      <v-simple-table class="w100p">
        <tbody>
          <tr>
            <td class="w25p font-weight-bold">
              Volume
            </td>
            <td class="w25p">
              {{ `${beerDetail.volume.value || '--'} ${beerDetail.volume.unit || '--'}` }}
            </td>
            <td class="w25p font-weight-bold">
              Boil volume
            </td>
            <td class="w25p">
              {{ `${beerDetail.boil_volume.value || '--'} ${beerDetail.boil_volume.unit || '--'}` }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold">
              Abv
            </td>
            <td>
              {{ `${beerDetail.abv || '--'}` }}
            </td>
            <td class="font-weight-bold">
              Ebc
            </td>
            <td>
              {{ `${beerDetail.ebc || '--'}` }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold">
              Ph
            </td>
            <td>
              {{ `${beerDetail.ph || '--'}` }}
            </td>
            <td class="font-weight-bold">
              Ibu
            </td>
            <td>
              {{ `${beerDetail.ibu || '--'}` }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold">
              Target fg
            </td>
            <td>
              {{ `${beerDetail.target_fg || '--'}` }}
            </td>
            <td class="font-weight-bold">
              Target og
            </td>
            <td>
              {{ `${beerDetail.target_og || '--'}` }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-row>
    <v-row class="mt-10 justify-center">
      <h4>Ingredients</h4>
    </v-row>
    <v-row>
      <v-simple-table class="w100p">
        <tbody>
          <tr no-hover>
            <td colspan="2 justify-center">
              Malt
            </td>
          </tr>
          <tr v-for="(ingredient, i) in beerDetail.ingredients.malt" :key="i">
            <td class="w50p font-weight-bold">
              {{ `${ingredient.name || '--'}` }}
            </td>
            <td class="w50p">
              {{ `${ingredient.amount.value || '--'} ${ingredient.amount.unit || '--'}` }}
            </td>
          </tr>
          <tr>
            <td colspan="2">
              Hops
            </td>
          </tr>
          <tr v-for="(ingredient, i) in beerDetail.ingredients.hops" :key="i+ingredient.name">
            <td class="font-weight-bold">
              {{ `${ingredient.name || '--'}` }}
            </td>
            <td>
              {{ `${ingredient.amount.value || '--'} ${ingredient.amount.unit || '--'}` }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-row>
  </v-container>
</template>

<script>
import BeerService from '../services/BeerService'

export default {
  name: 'Beers',
  data () {
    return {
      beerDetail: {}
    }
  },
  mounted () {
    this.getBeersDetail()
  },
  methods: {
    async getBeersDetail () {
      this.$store.dispatch('showLoaderAction', true)
      const filtros = new URLSearchParams()
      filtros.append('ids', this.$route.params.id)
      const params = { params: filtros }
      await BeerService.getBeers('beers', params)
        .then((response) => {
          if (response.status !== 200) {
            console.log('ocurrio un error')
          }
          this.beerDetail = response.data.length > 0 ? response.data[0] : {}
          this.$store.dispatch('showLoaderAction', false)
        })
        .catch((e) => {
          this.$store.dispatch('showLoaderAction', false)
        })
    }
  }
}
</script>

<style>
.w100p {
  width: 100%;
}
.w25p {
  width: 25%;
}
.w50p {
  width: 50%;
}
</style>
