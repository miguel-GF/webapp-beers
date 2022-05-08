<template>
  <v-app>
    <app-bar />
    <loader
      :mostrar="$store.getters.getLoader"
      :mensaje="'Getting beers ..'"
    />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar'
export default {
  name: 'App',
  components: {
    AppBar
  },
  data () {
    return {}
  }
}
</script>
