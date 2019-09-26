<template>
  <div>
    <section>
      <v-parallax :src="require('@/assets/hero.jpeg')" height="600">

        <v-layout
          column
          align-center
          justify-center
          class="white--text"
        >

          <img src="../../assets/coclogowithname.png" alt="Vuetify.js" height="auto" class="hidden-sm-and-down" width="80%">
          <img src="../../assets/coc_logo.png" alt="Vuetify.js" height="200" class="hidden-md-and-up">
          <h1 class="white--text mb-2 display-1 text-center">Community Of Coders</h1>
          <div class="subheading mb-3 text-center">Good software, like wine, takes time ~ Joel Spolsky</div>

        </v-layout>
      </v-parallax>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
</style>