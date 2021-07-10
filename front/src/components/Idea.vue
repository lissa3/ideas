<template>
    <div class="container">        
        <div v-if="isLoading"><app-loader></app-loader></div>
        <div  v-if="ideas" class="wrapper">            
            <div class="row main-row" v-for="idea in ideas" :key="idea.id">
                <div   class="col-lg-4 col-md-12 col-sm-12">
                    <div class="idea-img mb-2">
                        <img src="@/assets/logo.png" alt="img" class="img-fluid">
                    </div>
                    <div class="row">
                        <div class="col-sm-12 mb-2">
                            <ul class="list-group list-group-horizontal ul-cls">
                                <li class="list-group-item">
                                    <b-icon icon="bookmark-heart-fill"></b-icon>
                                    
                                </li>
                                <!-- <li class="list-group-item tooltip"> -->
                                <li class="list-group-item">
                                    <b-icon icon="person-fill"></b-icon>
                                    <!-- <span class="tooltiptext">See author profile</span> -->
                                </li>
                                <li class="list-group-item">
                                    <b-icon icon="envelope"></b-icon>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 col-md-12 col-sm-12">
                <div class="idea-title mb-1 mt-1">
                        <h3>{{idea.title}}</h3>
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
                <div class="idea-main-text mb-2">
                    <p>{{idea.lead_text}}</p>
                </div>
                <div class="idea-read-more mb-2">
                    <button class="btn btn-outline-dark">Read More</button>
                </div>
                <div class="idea-read-more mb-2">
                    <div >List of tags</div>
                    
                </div>
              </div>
            </div>
        </div>
        <div v-else>No ideas yet</div>
        <div v-if="error">smth went wrong</div>
        <div class="col-lg-8 col-md-12 col-sm-12 pagination">
            <app-pagination  
            :currentPage="currentPage" 
            :total="total"
            :limit="limit"
            :url="baseUrl"
            :next="next"
            :prev="prev">
            </app-pagination>           
        </div>
    </div>
</template>
<script>

// import {parseUrl} from 'query-string'
import {stringify, parseUrl} from 'query-string'
import {actionTypes} from '@/store/modules/ideas'
import {limit} from '@/helpers/vars'
import {mapState} from 'vuex'
import  AppPagination from '@/components/Pagination'
import AppLoader from '@/components/Loader'
export default {
    name:'AppIdea',
    components:{
         AppPagination,
         AppLoader
    },
    props:{
        apiUrl:{
            type:String,
            required:true
        }
    },
    computed:{            
        ...mapState({
            ideas:state=>state.ideas.data,
            total:state=>state.ideas.count,
            isLoading:state=>state.ideas.isLoading,
            error:state=>state.ideas.error,
            prev:state=>state.ideas.prev,
            next:state=>state.ideas.next           
        }),
        baseUrl() {
         console.log("route.path is",this.$route.path)
         return this.$route.path
        },
        currentPage() {
            console.log("rout query page",this.$route.query.page)
            return Number(this.$route.query.page || '1')
        },
        limit(){
            return limit
        },
        offset() {
         return this.currentPage * limit - limit
        },      
                  
    },    
    watch: {
        currentPage() {
            console.log("watcher here; see changes")
            this.fetchIdeas()
        },
         baseUrl(){
            console.log("watcher base url; see changes")
            this.fetchIdeas()
        }
    },     
    created(){
        this.fetchIdeas()       
    },
    methods:{
        fetchIdeas(){
            console.log("looking for bible...")
            const parsedUrl = parseUrl(this.apiUrl)
            // console.log("step 1 parsed url:",parsedUrl)
            // console.log("parsedUrl",parsedUrl)
            // console.log("parsedUrl.url:   ",parsedUrl.url)
            // console.log("parsedUrl.query:  ",parsedUrl.query)

            const stringifiedParams = stringify({
                limit,
                offset: this.offset,
                ...parsedUrl.query
            })
            const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
            
            console.log("calling store func for request")           
            //this.$store.dispatch(actionTypes.getIdeas, {apiUrl: this.apiUrl})       
            this.$store.dispatch(actionTypes.getIdeas, {apiUrl: apiUrlWithParams})       
            },
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
<style>
.main-row{
    margin:8%;
    background-color: blanchedalmond;
    box-shadow: 0 0 10px 10px rgba(0,0,0,.05);
    border-radius: 0.5rem;
}
.idea-img   >   img{
    width:100%;
    height:100%;
    /* transform: translateY(-30px); */
    object-fit: cover;
    border-radius:0.5rem;
    box-shadow: 0 0 8px 3px rgba(0,0,0,.3);

}
.idea-date span{
    color:#962c51;
}
.ul-cls{
    justify-content: center;
}
.ul-cls li{
    cursor: pointer;
}
.idea-title >h3{
    font-weight: 400;
    font-style: normal;
}
.idea-main-text{
    font-style: normal;
    line-height: 2;
}
/* tooltip */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: -5px;
  left: 105%;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

</style>