<template>
  <div>
    <v-app-bar app dark>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-toolbar-title class="mr-2"><img src="../assets/coc_logo.png" height="50"></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text dark :to="{name: 'home'}"><v-icon>fas fa-home</v-icon>&nbsp;Home</v-btn>
        <v-btn text dark ><v-icon>fas fa-info-circle</v-icon>&nbsp;About Us</v-btn>
        <v-btn text dark ><v-icon>fas fa-laptop-code</v-icon>&nbsp;Activities</v-btn>
        <v-btn text dark ><v-icon>fas fa-images</v-icon>&nbsp;Glimpses</v-btn>
        <v-btn text dark ><v-icon>fas fa-users</v-icon>&nbsp;Team</v-btn>
        <v-btn text dark :to="{name: 'add-event'}" v-if="$store.state.isAdmin"><v-icon>fas fa-users</v-icon>&nbsp;AddEvents</v-btn>
        <v-btn text dark v-if="$store.state.isLoggedIn" @click="logout"><v-icon>fas fa-sign-out-alt</v-icon>&nbsp;LogOut&nbsp;</v-btn>
        <v-avatar color="red" v-if="$store.state.isLoggedIn" class="mt-2">
          <span class="white--text headline">{{this.$store.state.user.substring(0,1)}}</span>
        </v-avatar>
        <v-btn text dark :to="{name: 'auth'}" v-if="!$store.state.isLoggedIn"><v-icon>fas fa-sign-in-alt</v-icon>&nbsp;SignUp</v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <v-navigation-drawer dark v-model="drawer" absolute temporary app style="position:fixed; top:0; left:0; overflow-y:scroll;">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-avatar color="red" v-if="$store.state.isLoggedIn" class="mt-2">
              <span class="white--text headline">{{this.$store.state.user.substring(0,1)}}</span>
            </v-avatar>
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav rounded>

        <v-list-item dark link color="black" :to="{name: 'home'}">
            <v-list-item-icon>
              <v-icon>fas fa-home</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item dark link color="black" >
            <v-list-item-icon>
              <v-icon>fas fa-info-circle</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>About Us</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item dark link color="black">
            <v-list-item-icon>
              <v-icon>fas fa-laptop-code</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Activities</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item dark link color="black">
            <v-list-item-icon>
              <v-icon>fas fa-images</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Glimpses</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item dark link color="black">
            <v-list-item-icon>
              <v-icon>fas fa-users</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Team</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item dark link color="black" v-if="$store.state.isLoggedIn" @click="logout">
            <v-list-item-icon>
              <v-icon>fas fa-sign-out-alt</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item dark link color="black" v-if="!$store.state.isLoggedIn" :to="{name: 'auth'}">
            <v-list-item-icon>
              <v-icon>fas fa-sign-in-alt</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>SignUp</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
  methods: {
    logout () {
      this.$store.dispatch('setIsLoggedIn',false)
      this.$store.dispatch('setUser',null)
      this.$store.dispatch('setToken',null)
      this.$store.dispatch('setIsAdmin',false)
      this.$store.dispatch('setCookie')
    }
  }
}
</script>

<style scoped>
</style>