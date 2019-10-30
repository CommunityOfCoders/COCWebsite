<template>
  <v-layout justify-center align-center>
    <v-flex xs12 md3>
      <v-card
        width="375"
        class="mx-auto mt-2 mb-2"
        grey
      >

        <div v-html="identicon" class="profilepic"></div>

        <v-list two-line>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="red">fas fa-user</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ user.username }}</v-list-item-title>
              <v-list-item-subtitle>Username</v-list-item-subtitle>
            </v-list-item-content>

          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item >
            <v-list-item-icon>
              <v-icon color="red">fas fa-envelope-open</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ user.email }}</v-list-item-title>
              <v-list-item-subtitle>Personal Email</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item >
            <v-list-item-icon>
              <v-icon color="red">fas fa-graduation-cap</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ user.graduationYear }}</v-list-item-title>
              <v-list-item-subtitle>Graduation Year</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item >
            <v-list-item-icon>
              <v-icon color="red">fas fa-user-secret</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ hash(user.username) }}</v-list-item-title>
              <v-list-item-subtitle>Community Secret</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthServices from '@/services/AuthServices'
import heros from '@/services/heros'
export default {
  async mounted () {
    this.textInput = this.$store.state.user

    const response = await AuthServices.getUser({
      username: this.textInput
    })

    this.user = response.data
  },
  data: () => ({
    textInput: '',
    user: {}
  }),
  computed: { // Turn data into viewable values
    identicon: function() {
      const html = jdenticon.toSvg(this.textInput, 375)

      return html
    }
  },
  methods: {
    hash (s){
      return heros[Math.floor(Math.random() * heros.length)];              
    }
  }
}
</script>

<style scoped>
</style>