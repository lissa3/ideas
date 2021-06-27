<template>
  <div class="container-fluid">
    
        <div class="row">
          <h3>I am a tag idea component</h3>
          <div class="col col-md-2">
            <section class="categs-space">
              <app-categs></app-categs>            
            </section> </div>
          <div class="col col-md-8">
            <app-idea :api-url="apiUrl"></app-idea>
          </div>
          <div class="col col-md-2">
            <section class="tags-space">
              <app-tags></app-tags>
            </section>
          </div>
        </div>    
    </div>
</template>
<script>
import AppIdea from '@/components/Idea'
import AppTags from '@/components/Tags'
import AppCategs from '@/components/categs/Categs'
export default {
  name:'AppTagIdeas',
  components:{
      AppIdea,
      AppTags,
      AppCategs,
      
  },
  computed: {
    tagName() {
      return this.$route.params.slug
    },
    apiUrl() {
      return `/api/v1/tags/${this.tagName}/`
    }
  },
  
}
</script>
