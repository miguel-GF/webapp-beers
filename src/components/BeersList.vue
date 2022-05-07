<template>
  <v-row class="text-center vertical-align">
    <v-col cols="12">
      <v-data-table
        fixed-header
        :headers="headers"
        :items="$store.getters.getBeers"
        :items-per-page="$store.getters.getRowsPerPage"
        :hide-default-footer="true"
        class="elevation-1"
        height="56vh"
      >
        <template v-slot:item.id="{ item }">
          <router-link :to="'/Beers/Detail/' + item.id">
            <v-img :src="item.image_url" max-width="40" :aspect-ratio="1/1"  />
          </router-link>
        </template>
        <template v-slot:item.name="{ item }">
          <td class="w200 text-left">
            {{ item.name || '--' }}
          </td>
        </template>
        <template v-slot:footer>
          <v-container class="pa20">
          <v-row class="text-left vertical-align">
            Total registers: {{ $store.getters.getBeers.length }}
            Page: {{ $store.getters.getPage }}
            <v-icon
              dense
              color="green darken-4"
              class="cursor-pointer"
              @click="previousPage()"
              :disabled="$store.getters.getPage === 1"
            >
              mdi-chevron-left
            </v-icon>
            <v-icon
              dense
              color="green darken-4"
              class="cursor-pointer"
              @click="nextPage()"
              :disabled="$store.getters.getBeers.length < 20"
            >
              mdi-chevron-right
            </v-icon>
          </v-row>
          </v-container>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Beerlist',
  data () {
    return {
      headers: [
        {
          text: '',
          align: 'center',
          sortable: false,
          value: 'id'
        },
        {
          text: 'name',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Abv',
          align: 'start',
          sortable: true,
          value: 'abv'
        },
        {
          text: 'Ebc',
          align: 'start',
          sortable: true,
          value: 'ebc'
        },
        {
          text: 'First brewed',
          align: 'start',
          sortable: true,
          value: 'first_brewed'
        }
      ]
    }
  },
  methods: {
    nextPage () {
      this.$store.dispatch('nextPageAction')
      this.$emit('get-beers')
    },
    previousPage () {
      this.$store.dispatch('previousPageAction')
      this.$emit('get-beers')
    }
  }
}
</script>

<style>
  .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    text-transform: uppercase;
    background-color: #b1b1b1;
  }
  .w200 {
    width: 300px;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>
