<template>
  <div>
    <v-card color="grey lighten-4" flat tile min-height="100vh" min-width="100vw">
      <v-toolbar height="70px"  dark>
        <v-spacer />
        <v-toolbar-items>
          <v-text-field class="mt-2" v-model="search" label="Search" name="search" prepend-inner-icon="mdi-magnify" type="text" single outlined rounded></v-text-field>
        </v-toolbar-items>
        
      </v-toolbar>

      <v-row class="mr-0 ml-0">
        <v-col cols="12">
          <v-row :align="alignment" :justify="justify" class="grey lighten-5">

            <v-card class="mx-auto mt-4 mb-4" :max-width="imageHeight" v-for="event in filteredEvents" :key="event._id" dark>
              <v-img class="white--text" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
                <v-card-title class="align-end fill-height">{{ event.eventName }}</v-card-title>
              </v-img>

              <v-card-text class="text">
                <span>Date: {{ event.date }}</span><br><br>
                <span>
                  <span>Description: {{ event.description }}</span><br><br>
                  <span>Venue: {{ event.venue }}</span>
                </span>
              </v-card-text>

              <v-card-actions>
                <v-btn text color="success">Register</v-btn>
                <v-btn text color="orange">Explore</v-btn>
              </v-card-actions>
            </v-card>

            <p v-if="!filteredEvents.length" class="errorText">Hello I am center to vertically using "align-center".</p> 

          </v-row>
        </v-col>
      </v-row>

    </v-card>
  </div>
</template>

<script>
import EventServices from '@/services/EventServices'
export default {
  async mounted() {
    const response = await EventServices.getEvents()
    this.events = response.data
  },
  data: () => ({
    events: [],
    alignment: 'center',
    dense: false, 
    justify: 'center',
    search: ''
  }),
  computed: {
    imageHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '90vw'
        case 'sm': return '90vw'
        case 'md': return '400'
        case 'lg': return '400'
        case 'xl': return '400'
      }
    },
    filteredEvents () {
      return this.events.filter((event) => {
        return event.eventName.match(this.search)
      })
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 1.15em;
    color: white;
  }
</style>