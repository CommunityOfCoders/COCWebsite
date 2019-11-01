<template>
  <v-layout justify-center align-center>
    <v-flex xs11 md10>
      <editor :value="editorText" :options="editorOptions" :html="editorHtml" :visible="editorVisible" previewStyle="vertical" v-model="editorText" height="65vh"/><br>
      <v-btn color="success" @click="leet">Print</v-btn>
    </v-flex>
  </v-layout>
</template>


<script>
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
import { Editor } from '@toast-ui/vue-editor'
 
export default {
  components: {
    'editor': Editor
  },
  data() {
      return {
          editorText: '',
          editorOptions: {
              hideModeSwitch: true
          },
          editorHtml: '',
          editorVisible: true
      }
  },
  methods: {
    leet () {
      console.log(this.editorText)
    }
  }
}
</script> 