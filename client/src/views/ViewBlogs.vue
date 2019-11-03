<template>
  <v-layout justify-center align-center>
    <v-flex xs11 md8>
      <v-card
        class="mr-2 ml-2 mt-4 mb-4"
        color="#26c6da"
        dark
        v-for="blog in blogs"
        :key="blog._key"
      >
        <v-card-title>
          <v-icon large left>mdi-twitter</v-icon>
          <span class="title font-weight-light">Community of Coders</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">{{blog.blogTitle}}</v-card-text>

        <v-card-text class="headline font-weight-bold">Tags: 
          <v-chip-group
            :multiple="true"
            
            active-class="primary--text"
          >
            <v-chip v-for="tag in blog.tags" :key="tag">{{ tag }}</v-chip>
          </v-chip-group>
         </v-card-text>

        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{blog.author}}</v-list-item-title>
            </v-list-item-content>

            <v-row align="center" justify="end">
               <v-btn class="ma-2" rounded outlined color="white" :to="{name: 'view-blog', params: {id: blog._id}}">
                <v-icon left>mdi-pencil</v-icon> Read
              </v-btn>
              <v-icon class="mr-1 hidden-sm-and-down">mdi-heart</v-icon>
              <span class="subheading mr-2 hidden-sm-and-down">256</span>
              <span class="mr-1 hidden-sm-and-down">·</span>
              <v-icon class="mr-1 hidden-sm-and-down">mdi-share-variant</v-icon>
              <span class="subheading hidden-sm-and-down">45</span>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import BlogServices from "@/services/BlogServices";
export default {
  async beforeMount() {
    const response = await BlogServices.getAllBLogs();
    if (response.status == 200) {
      this.blogs = response.data;
      console.log(this.blogs);
    } else {
    }
  },
  data: () => ({
    blogs: []
  })
};
</script>

<style scoped>
</style>