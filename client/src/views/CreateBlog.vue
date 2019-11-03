<template>
  <v-layout justify-center align-center>
    <v-flex xs11 md10>

      <br>

      <v-alert
        text
        type="success"
        v-if="dialog"
      >
        Blog Created Successfully
      </v-alert>

      <v-alert
        text
        type="error"
        v-if="errordialog"
      >
        Could Not Create Blog
      </v-alert>

      <v-text-field
        label="BlogTitle"
        outlined
        v-model="blogTitle"
        class="mt-2 mb-2"
      ></v-text-field>
      <editor :value="editorText" :html="editorHtml" :visible="editorVisible" previewStyle="vertical" v-model="editorText" height="65vh"/><br>
      
      <v-combobox multiple
        v-model="select" 
        label="Tags" 
        append-icon
        chips
        deletable-chips
        class="tag-input"
        :search-input.sync="search" 
        @keyup.tab="updateTags"
        @paste="updateTags">
      </v-combobox>
      
      <v-btn color="success" @click="addBlog" class="mt-2 mb-2">Add Blog</v-btn>&ensp;
      <v-btn color="success" @click="print" class="mt-2 mb-2">Print</v-btn>&ensp;
      <v-btn color="warning" @click="reset" class="mt-2 mb-2">Reset</v-btn><br>
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

import BlogServices from '@/services/BlogServices'
 
export default {
  components: {
    'editor': Editor,
  },
  data() {
      return {
          editorText: '',
          editorHtml: '',
          editorVisible: true,
          blogTitle: '',
          dialog: false,
          errordialog: false,
          select: [],
          items: [],
          search: ''
      }
  },
  methods: {
    async addBlog () {
      const response = await BlogServices.addBlog({
        blogTitle : this.blogTitle,
        blogContent: this.editorText,
        date: Date.now,
        tags: this.select,
        author: this.$store.state.user
      });
      if (response.status == 200) {
        this.dialog = true
        this.errordialog = false
      } else {
        this.errordialog = true
        this.dialog = false
      }
    },
    reset () {
      this.editorText = ''
      this.items = []
      this.select = []
      this.search = ""
    },
    print () {
      console.log(this.select)
    },
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(","));
        this.$nextTick(() => {
          this.search = "";
        });
      });
    }
  }
}
</script> 

<style scoped>
  
</style>