<template>
  <v-layout align-center justify-center class="bgimage">

    <v-flex xs12 sm12 md6>
      <div class="mt-4 mb-4">
        <iframe :src="event.form" width="640" height="923" frameborder="0" marginheight="20" marginwidth="20">Loading…</iframe>
      </div>
    </v-flex>

  </v-layout>
</template>

<script>
import EventServices from '@/services/EventServices'
export default {
    async mounted () {
      const response = await EventServices.getEvent(this.$route.params.id)
      if(response.status == 200) {
        this.event = response.data
      } else {
        
      }
      
    },
    data: () => ({
      event: {}
    })
}
</script>