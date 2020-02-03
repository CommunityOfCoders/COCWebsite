<template>
  <v-layout align-center justify-center class="bgimage">

    <v-flex xs12 sm12 md6>

      <v-alert
        type="success"
        v-if="dialog"
      >
        Event Created Successfully
      </v-alert>

      <v-alert
        type="error"
        v-if="errordialog"
      >
        Could Not Create Event
      </v-alert>

      <v-card light elevation="12" class="mb-3 mt-3" color="rgba(255,255,255,0.85)">

        <v-toolbar color="black" dark flat>

          <v-toolbar-title>Add Event</v-toolbar-title>

          <v-spacer></v-spacer>

        </v-toolbar>

        <v-card-text>

          <v-form>

            <v-text-field v-model="eventName" label="EventName" name="event-name" prepend-icon="fas fa-users" type="text" outlined rounded></v-text-field>

            <v-textarea v-model="description" rows="1" name="description" label="Description" auto-grow prepend-icon="far fa-comment-alt" outlined rounded></v-textarea>

            <v-autocomplete :items="items" v-model="venue" label="Venue" name="venue" prepend-icon="fas fa-map-marker-alt" outlined rounded></v-autocomplete>

            <v-text-field v-model="graduationYear" label="GraduationYear" name="graduation-year" prepend-icon="fas fa-users" type="text" outlined rounded></v-text-field>
            
            <v-text-field v-model="picker" @click="ifdate = !ifdate" label="Date" prepend-icon="fas fa-calendar-alt" outlined single-line rounded></v-text-field>

            <center><v-date-picker v-if="ifdate" v-model="picker" class="mb-3"></v-date-picker></center>

            <v-file-input v-model="images" small-chips accept="image/png, image/jpeg, image/bmp" placeholder="Poster" prepend-icon="mdi-camera" label="Avatar" outlined single-line rounded></v-file-input>

          </v-form>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="addEvent">Add Event</v-btn>
        </v-card-actions>

      </v-card>

      <!-- <v-dialog
        v-model="dialog"
        max-width="400"
      >
        <v-card>
          <v-card-title class="headline">Success!!!</v-card-title>

          <v-divider></v-divider>

          <v-card-text class="errortext success--text">
            Event SuccessfullyCreated
          </v-card-text>

          <v-card-actions>
            <div class="flex-grow-1"></div>

            <v-btn
              color="green darken-1"
              @click="reroute"
              class="white--text"
            >
              Great
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="errordialog"
        max-width="400"
      >
        <v-card>
          <v-card-title class="headline">Error!!!</v-card-title>

          <v-divider></v-divider>

          <v-card-text class="errortext error--text">
            Could not Create Event 
          </v-card-text>

          <v-card-actions>
            <div class="flex-grow-1"></div>

            <v-btn
              color="red darken-1"
              @click="errordialog = false"
              class="white--text"
            >
              Try Again
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </v-flex>
  </v-layout>
</template>

<script>
import EventServices from '@/services/EventServices'

export default {
  data: () => ({
    eventName: '',
    description: '',
    venue: '',
    graduationYear: '',
    items: [
      'Lab3',
      'CCF2',
      'CCF1',
      'AL004'
    ],
    ifdate: false,
    picker: new Date().toISOString().substr(0, 10),
    images: [],
    dialog: false,
    errordialog: false,
    events: []
  }),
  methods: {
    async addEvent () {
      let event = new FormData()
      event.append('eventName',this.eventName)
      event.append('description',this.description)
      event.append('venue',this.venue)
      event.append('date',this.picker)
      event.append('graduationYear',this.graduationYear)
      event.append('COC_Event',this.images)
      
      const events = await EventServices.addEvent(event)

      if (events.status == 200) {
        console.log("Done")
        this.dialog = true
        this.errordialog = false
      }
      else {
        this.errordialog = true
        this.dialog = false
      }
    },
    reroute () {
      this.dialog = false
      this.$router.push({
        name: 'add-event'
      })
    }
  }
}
</script>

<style scoped>
  .bgimage {
    background-image: url("../assets/eventBack.jpg");
  
    
    /* Full height */
    height: 100%; 
    
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>