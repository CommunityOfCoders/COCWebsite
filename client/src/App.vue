<template>
  <v-app>
    <PageHeader />
    <v-content>
      <v-container fluid fill-height class="pa-0"><router-view/></v-container>
    </v-content>
    <PageFooter />
  </v-app>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  }
};
</script>
