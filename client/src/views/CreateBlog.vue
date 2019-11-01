<template>
  <v-layout justify-center align-center>
    <v-flex xs11 md10>
      <editor :value="editorText" :html="editorHtml" :visible="editorVisible" previewStyle="vertical" v-model="editorText" height="65vh"/><br>
      <v-btn color="success" @click="leet">Print</v-btn><br>
    </v-flex>
  </v-layout>
</template>


<script>
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
// import 'highlight.js/styles/github.css';
import 'highlight.js/styles/vs.css'
// import 'highlight.js/styles/dracula.css'
// import 'highlight.js/styles/dark.css'
import Editor from '@toast-ui/vue-editor/src/Editor.vue'

 
export default {
  components: {
    'editor': Editor,
  },
  data() {
      return {
          editorText: '',
          editorHtml: '',
          editorVisible: true
      }
  },
  methods: {
    leet () {
      console.log(this.editorText)
      console.log(this.editorHtml)
    }
  }
}
</script> 

<style scoped>
</style>