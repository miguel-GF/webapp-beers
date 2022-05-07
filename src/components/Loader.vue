<template>
  <v-container class="position">
    <v-overlay :value="mostrar">
        <v-container >
          <v-layout>
            <v-row >
              <v-col cols="12">
                <v-progress-circular indeterminate size="128"></v-progress-circular>
              </v-col>
            </v-row>
          </v-layout>
        </v-container>
      </v-overlay>

      <v-overlay :value="mostrar">
        <v-container class="margin-auto">
          <v-layout>
            <v-row >
              <v-col cols="12">
                <span>{{ mensaje || 'Loading ...' }}</span>
              </v-col>
            </v-row>
          </v-layout>
        </v-container>
      </v-overlay>
  </v-container>
</template>

<script>
export default {
  name: 'LoaderComponente',
  props: {
    mensaje: String,
    mostrar: Boolean
  }
}
</script>

<style scoped>
  span {
    font-size: 16px;
  }

  .margin-auto { margin-top: 25vh; }
  .position { position: fixed; z-index: 9999!important; }
</style>
