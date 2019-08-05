<template>
  <v-footer dark padless height="auto">

    <v-card class="flex" flat tile>

      <v-card-title class="black">
        <strong class="subheading hidden-sm-and-down">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-actions class="grey darken-3 justify-center">
        &copy;&nbsp;{{ new Date().getFullYear() }} — <strong>COC</strong>
      </v-card-actions>

    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
        'fab fa-facebook',
        'fab fa-youtube',
        'fab fa-instagram',
      ],
  })
}
</script>

<style scoped>
</style>