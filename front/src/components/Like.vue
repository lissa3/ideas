<template>
<div class="list-group list-group-horizontal">
    <div :class="{'btn':true,'btn-sm':true,
                'btn-outline-secondary':likeToToggle,
                'btn-outline-success':!likeToToggle}"
         @click="doLike">
        <div class="click-like">
          <div class="px-1 ">Like &nbsp; <b-icon-heart-fill></b-icon-heart-fill><span class="px-1"></span></div>

        </div>
    </div>    
    <div class="px-2 zoo">
            <span class="px-1" v-if="isLiked===null">{{ideaLikes}}</span>
            <span class="px-1" v-else>{{newLikeVal}}</span>

    </div>

        
    
</div>
</template>

<script>
import {actionTypes as singleIdeaActionType} from '@/store/modules/singleIdea'
export default {
    name:'Like',
    props:{
        id:{
            type:Number,
            required:true
        },
        ideaLikes:{
            type:null||Number,
            // required:true
        }
    },
    data(){
        return{        
        likeToToggle:false,         
        newLikeVal:this.ideaLikes,
        isLiked:null
        }
    },
    methods:{
        async doLike(){
        // console.log("like now is:",this.likeToToggle)      
        this.likeToToggle = !this.likeToToggle
        const likeInfo = {
                    like:{"like":this.likeToToggle},
                    id:this.id
        };
        this.$store.dispatch(singleIdeaActionType.handleLike,likeInfo)
        .then((resp)=>{
            if(resp.status==200){
                this.isLiked = resp.data.like                          
            }
            if(this.isLiked===true){
                    this.newLikeVal ++                    
            }else{
                this.newLikeVal = this.newLikeVal -1                
            }
            this.isLiked = !this.isLiked
          })
      },
    }, 

}

</script>
<style scoped>
.click-like{
  cursor: pointer;
  padding:3px;
  

  
}
.zoo{
    display: flex;
    flex-direction: column;
    justify-content: center;

}
</style>