<template>

  <v-layout align-center justify-center class="bgimage">

    <v-flex md6 xs12 sm12 class="mt-4 mb-4 mr-4 ml-4">
      <v-alert
        type="success"
        v-if="dialog"
      >
        Form Added Successfully
      </v-alert>

      <v-alert
        type="error"
        v-if="errordialog"
      >
        Could Not Add form to the specified event
      </v-alert>

      <v-card
        max-width="1000"
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
            v-for="event in filteredEvents"
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
                <v-text-field :id="event._id" outlined rounded solo placeholder="formURL" :persistent-hint="persistentHint" hint="Enter the Google Form URL" :value="event.form"></v-text-field>
                <v-btn dark @click="addForm(event._id)">Add Form</v-btn>
              </v-list-item-content>
            </v-list-item>
          
        </v-list-group>
        </v-list>
      </v-card>
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
    events: [],
    persistentHint: true,
    errordialog: false,
    dialog:false
  }),
  computed:{
    filteredEvents () {
      return this.events.filter((event) => {
        return new Date(event.date).getTime() > Date.now()
      })
    }
  },
  methods: {
    async addForm(id) {
      const formURL = document.getElementById(id).value
      console.log(formURL)
      const response = await EventServices.addForm({
        id: id,
        formURL: formURL
      })

      if (response.status == 200) {
        this.dialog = true
        this.errordialog = false
      }
      else {
        this.errordialog = true
        this.dialog = false
      }
    }
  }
}
</script>