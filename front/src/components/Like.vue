<template>
    <div class="click-like"  @click="doLike">
        <span>Like &nbsp; <b-icon-heart-fill></b-icon-heart-fill><span class="px-1"></span></span>
        <span class="px-1">{{ideaLikes}}</span>
    </div>
</template>

<script>
// import {actionTypes as singleIdeaActionType} from '@/store/modules/singleIdea'
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
        this.$emit('likeChange',likeInfo) 
        // this.likeToToggle = this.likeState  
        // this.$store.dispatch(singleIdeaActionType.handleLike,likeInfo)
        // .then((resp)=>{
        //     if(resp.status===200){
        //         const likeState = resp.data.like
        //         this.$emit('likeChange',likeState)
            // // update like on front
            // if(likeState ===true){
            //     this.idea.an_likes +=1
            // }else{
            //     this.idea.an_likes -=1
            // } 
            // // console.log("setting a new state for like",likeState)     
            // this.likeToToggle = likeState;   
        //    }
     // })      
    },
  }
}
</script>