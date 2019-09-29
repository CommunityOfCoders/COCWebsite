<template>
  <v-row>
    <v-col cols="12">
      <v-row :align="alignment" :justify="justify" class="grey lighten-5">

        <v-card class="mx-auto mt-4 mb-4" max-width="400" v-for="event in events" :key="event._id">
          <v-img class="white--text" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
            <v-card-title class="align-end fill-height">{{ event.eventName }}</v-card-title>
          </v-img>

          <v-card-text class="text">
            <span>Date: {{ event.date }}</span><br><br>
            <span class="text--primary">
              <span>Description: {{ event.description }}</span><br><br>
              <span>Venue: {{ event.venue }}</span>
            </span>
          </v-card-text>

          <v-card-actions>
            <v-btn text color="success">Register</v-btn>
            <v-btn text color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>

      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import EventServices from '@/services/EventServices'
export default {
  async mounted() {
    const response = await EventServices.getEvents()
    this.events = response.data
    console.log(response.data)
  },
  data: () => ({
    events: [],
    alignment: 'center',
    dense: false, 
    justify: 'center',
  })
}
</script>

<style scoped>
  .text {
    font-size: 1.15em;
  }
</style>