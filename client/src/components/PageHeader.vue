<template>
  <div>
    <v-app-bar app dark>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-toolbar-title class="mr-2"><img src="../assets/coc_logo.png" height="50"></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text dark :to="{name: 'home'}"><v-icon>fas fa-home</v-icon>&nbsp;Home</v-btn>
        <v-btn text dark><v-icon>fas fa-info-circle</v-icon>&nbsp;About Us</v-btn>
        <v-btn text dark><v-icon>fas fa-laptop-code</v-icon>&nbsp;Activities</v-btn>
        <v-btn text dark><v-icon>fas fa-images</v-icon>&nbsp;Glimpses</v-btn>
        <v-btn text dark><v-icon>fas fa-users</v-icon>&nbsp;Team</v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <v-navigation-drawer dark v-model="drawer" absolute temporary app style="position:fixed; top:0; left:0; overflow-y:scroll;">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav rounded>

        <v-list-item v-for="(link, i) in links" :key="i" dark link color="black" :to="link.to">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
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
    links: [
      {
        to: "/",
        icon: 'fas fa-home',
        text: 'Home'
      },
      {
        to: '/about',
        icon: 'fas fa-info-circle',
        text: 'About Us'
      },
      {
        to: '/activities',
        icon: 'fas fa-laptop-code',
        text: 'Activities'
      },
      {
        to: '/glimpses',
        icon: 'fas fa-images',
        text: 'Glimpses'
      },
      {
        to: '/team',
        icon: 'fas fa-users',
        text: 'Team'
      }
    ]
  })
}
</script>

<style scoped>
</style>