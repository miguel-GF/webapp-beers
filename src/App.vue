<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        elevation="2"
        small
        color="secondary"
        to="/Beers"
      >
        Beers
        <v-icon class="ml-2">
          mdi-glass-mug-variant
        </v-icon>
      </v-btn>

    </v-app-bar>

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
export default {
  name: 'App',

  data () {
    return {}
  }
}
</script>
