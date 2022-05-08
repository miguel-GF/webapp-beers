<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome
        </h1>
        <v-btn
          elevation="2"
          small
          color="secondary"
          to="/Beers"
        >
          Go to see our Beers!
          <v-icon class="ml-2">
            mdi-glass-mug-variant
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home'
}
</script>
