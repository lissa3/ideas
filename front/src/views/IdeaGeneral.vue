<template>
    <div class="container-fluid">
        <div class="row">
          <h3>This is a main idea place</h3>
          <div class="col col-md-2">
            <section class="categs-space">
              <app-categs>  
                
              </app-categs>
            </section>
            </div>
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
    name:'AppIdeaGeneral',
    components:{
        AppIdea,
        AppTags,
        AppCategs
    },
    data(){
      return {
        apiUrl:'/api/v1/ideas-collection/ideas/'
      }
    },    
}
</script>
<style scoped>
.row > div{
  border:1px solid black;
}
</style>