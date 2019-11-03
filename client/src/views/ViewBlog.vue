<template>
  <v-layout justify-center align-center>
    <v-flex xs11 md10>
        <viewer
          :value="blog.blogContent"
          min-height="65vh"
        />
    </v-flex>
  </v-layout>
</template>

<script>
import BlogServices from '@/services/BlogServices'
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
// import 'highlight.js/styles/github.css';
import 'highlight.js/styles/vs.css'
// import 'highlight.js/styles/dracula.css'
// import 'highlight.js/styles/dark.css'
import Viewer from '@toast-ui/vue-editor/src/Viewer.vue'
export default {
  async beforeMount() {
    const response = await BlogServices.getBlog(this.$route.params.id)
    this.blog = response.data
    console.log(this.blog)
  },
  components: {
    viewer: Viewer
  },
  data: () => ({
    blog: {}
  })
}
</script>

<style scoped>
</style>