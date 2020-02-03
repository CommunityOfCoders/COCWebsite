<template>

  <v-layout align-center justify-center class="bgimage">

    <v-flex md6 class="mt-4 mb-4 mr-4 ml-4">
      <v-card
        max-width="500"
        class="mx-auto"
      >
        <v-toolbar
          color="teal"
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Events</v-toolbar-title>

        </v-toolbar>

        <v-list>
          <v-list-group
            v-for="event in events"
            :key="event._id"
            
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="event.eventName"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-text="event.description"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </v-flex>

    <v-flex md6 class="mt-4 mb-4 mr-4 ml-4">
      <p> This is not working</p>
    </v-flex>

  </v-layout>
</template>

<script>
import EventServices from '@/services/EventServices'
export default {
  async mounted() {
    const response = await EventServices.getEvents()
    this.events = response.data
  },
  data: () => ({
    events: []
  })
}
</script>