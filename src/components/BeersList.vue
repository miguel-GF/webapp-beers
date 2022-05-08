<template>
  <v-row class="text-center">
    <v-col cols="12">
      <v-data-table
        fixed-header
        :headers="headers"
        :items="$store.getters.getBeers"
        :items-per-page="$store.getters.getRowsPerPage"
        :hide-default-footer="true"
        class="elevation-1 main-table"
        :height="$store.getters.getShowFilters === true ? '51vh' : '65vh'"
      >
        <template v-slot:item.id="{ item }">
          <td class="w50 text-left">
          <v-tooltip class="w50" bottom>
            <template v-slot:activator="{ on, attrs }">
              <router-link :to="'/Beers/Detail/' + item.id">
                <v-img :src="item.image_url" max-width="40" min-width="40" :aspect-ratio="1/1" v-bind="attrs" v-on="on" />
              </router-link>
            </template>
            <span>See more</span>
          </v-tooltip>
          </td>
        </template>
        <template v-slot:item.name="{ item }">
          <td class="w300 text-left">
            {{ item.name || '--' }}
          </td>
        </template>
        <template v-slot:footer>
          <v-container class="text-right">
          <v-row class="justify-end pa-2">
            <div class="mr-6">
              Total registers: {{ $store.getters.getBeers.length }}
            </div>
            <div class="mr-6">
              Page: {{ $store.getters.getPage }}
            </div>
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
