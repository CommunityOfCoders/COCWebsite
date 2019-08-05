<template>
  <div>
    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5">
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Community info</div>
              </v-card-title>
              <v-card-text class="text-justify">
                Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Contact us</div>
              </v-card-title>
              <v-card-text>
                Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
              </v-card-text>

              <v-list rounded disabled>
                <v-list-item-group v-model="item" color="primary">
                  <v-list-item v-for="(item, i) in items" :key="i">
                      <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                      </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
            </v-list>
              
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        icon: 'fas fa-phone',
        text: '777-867-5309'
      },
      {
        icon: 'fas fa-map-marker-alt',
        text: 'VJTI, Mumbai'
      },
      {
        icon: 'fas fa-envelope-open',
        text: 'communityofcoders@gmail.com'
      },
    ]
  })
}
</script>

<style scoped>
</style>