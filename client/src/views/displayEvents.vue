<template>
  <div>
    <p>THis is displayEvents page</p>
  </div>
</template>

<script>
import EventServices from '@/services/EventServices'
export default {
  async mounted() {
    console.log("Idhar to jaa raha hai")

    const response = await EventServices.getEvents()

    console.log("Idhar bhi")

    console.log(response.data)
  }
}
</script>

<style lang="scss" scoped>
</style>