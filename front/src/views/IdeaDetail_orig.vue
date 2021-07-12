<template>
<div class="container-fluid mt-3">
  <section  v-if="idea" class="jumbotron text-center">
        <div class="container banner">
          <h1 class="jumbotron-heading">Title: {{idea.title}} </h1>
          <div >
              <div class="idea-date  text-center">
                <span>{{idea.created_at| filterDateTime}}</span>
              </div>
          </div>
          <div class="banner-collection">
            <div class="author-info d-flex align-items-center justify-content-around">
              
              <b-avatar></b-avatar>
              <router-link :to="{name:'userProfile',params:{id:idea.author}}" class="px-2">
                {{idea.owner_idea}}
              </router-link>
            </div>
            <div class="follow-block">Follow</div>
            <!-- <div class="favorite-block d-flex justify-content-between align-items-center"> -->
            <div class="favorite-block d-flex">
              <p>Favorite</p>
              <div class="col-lg-1 col-md-1 col-sm-1">
                <b-icon icon="heart-fill"></b-icon>
              </div>
            </div>         
         
          </div>  
        </div>
    </section>    
    <section >
        <div v-if="isLoading"><app-loader></app-loader></div>  
    </section>
      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row idea-container">
            <div class="col-md-12">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top"  style="height: 225px; width: 100%; display: block;" src="../assets/logo.png" data-holder-rendered="true">
                <div class="card-body">
                   <div class="idea-title mb-1 mt-1">
                    <h3>Title: {{idea.title}}
                    </h3>
                </div>
                 <div class="idea-title mb-2">
                    <p>by <strong>{{idea.owner_idea}}</strong></p>    
                </div> 
                <div class="idea-title mb-2">
                        <p>Rating</p>
                </div> 
                <div class="mb-2">
                    <div class="row">
                        <div class="col-lg-9 col-md-9 col-sm-9">
                           <div class="idea-date mb-2">
                            <span>{{idea.created_at| filterDateTime}}</span>
                            </div>
                        </div>
                        <div class="col-lg-1 col-md-1 col-sm-1">
                                <b-icon icon="heart-fill"></b-icon>
                        </div>
                        <div class="col-lg-1 col-md-1 col-sm-1">
                                {{idea.an_likes}}
                        </div>
                    </div>
                </div>     
                  <div class="card-text">
                    <div class="idea-main-text mb-2">
                      <p>{{idea.lead_text}}</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur architecto eum atque odio deserunt! Eaque velit possimus, repellat quis adipisci at accusamus dolores ex sequi corrupti fugiat delectus asperiores non.</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint suscipit laboriosam unde, vel nemo blanditiis voluptates? Perferendis similique qui labore porro aliquid, nobis quidem odio, quos neque aperiam placeat consectetur.</p>
                    </div>
                    <div class="idea-read-more mb-2">
                    <div >List of tags</div>                    
                </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">9 mins</small>
                  </div>
                </div>
              </div>
            </div>            
        </div>
      </div>
    </div> 





      
  </div>
</template>

<script>
import AppLoader from '@/components/Loader'
import AppErrorMsg from '@/components/ErrorMsg'
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/singleIdea'

export default {
  name: 'AppIdeaDetail',
  components:{
    AppLoader,
    AppErrorMsg
  },
  data(){
    return{
      // ideaObj:null
    }
  },
  computed:{            
        ...mapState({            
            isLoading:state=>state.idea.isLoading,
            idea:state=>state.idea.data,
            error:state=>state.idea.error
        })
  },
  created(){
    this.getOneIdea()
  },
  methods:{
    getOneIdea(){
      console.log("component created")      
      this.$store.dispatch(actionTypes.getIdea,{slug:this.$route.params.slug})
      .then((resp)=>{
        // console.log("component calling; resp",resp)
        // console.log("with keys",Object.keys(resp))
        if(resp.status ===200){
          console.log("OK 200")
          // this.ideaObj = resp.data
        }else if(resp.status ===404){
          console.log("404 not found")
          this.$router.push({name:'notFound'})
        }
      })
      
    }
  },
  filters: {
    // Filter full date with (local+) time
    // 2020-07-23 20:41:43.833825
    filterDateTime(item) {
      let initialDate = new Date(item);
      return `
          ${initialDate.getDate()}.${
        initialDate.getMonth() + 1
      }.${initialDate.getFullYear()}-${initialDate.getHours()}:${initialDate.getMinutes()} UTC ${initialDate.getUTCHours()}:${initialDate.getMinutes()}`;
    },
    }    
}
</script>
<style scoped>
.banner{
  height: 300px;
  max-height: 350px;
  background-color: burlywood;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.idea-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.banner-collection{
  display: flex;
  justify-content: space-around;
  align-content: center;

}
</style>
