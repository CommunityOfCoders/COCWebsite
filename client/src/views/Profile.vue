<template>
  <div>
    <div v-html="identicon" class="profilepic"></div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.textInput = this.$store.state.user
  },
  data: () => ({
    textInput: ''
  }),
  computed: { // Turn data into viewable values
    identicon: function() {
      const html = jdenticon.toSvg(this.textInput, 200);
      console.log(html)
      return html
    }
  }
}
</script>

<style scoped>
svg {
  display: block;
  border: 1px solid block;
  width: 1000px;
  height: 1000px;
}
</style>