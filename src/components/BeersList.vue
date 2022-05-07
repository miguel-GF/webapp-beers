<template>
  <v-row class="text-center vertical-align">
    <v-col cols="12">
      <v-data-table
        fixed-header
        :headers="headers"
        :items="beers"
        :items-per-page="20"
        :hide-default-footer="true"
        class="elevation-1"
        height="60vh"
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
            Total registers: {{ beers.length }}
            <v-icon
              dense
              color="green darken-4"
              class="cursor-pointer"
            >
              mdi-magnify
            </v-icon>
            <v-icon
              dense
              color="green darken-4"
              class="cursor-pointer"
            >
              mdi-magnify
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
  props: {
    beers: {
      type: Array,
      default: () => []
    }
  },
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
