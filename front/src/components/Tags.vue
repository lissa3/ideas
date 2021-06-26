<template>
    <section >
        <div v-if="isLoading">Loading</div>
        <div v-if="tags" class="tag-list">
            <router-link v-for="tag in tags" :key="tag.id" :to="{name:'tag',params:{slug:tag.slug}}" class="tag">
                <b-badge variant="secondary" class="tag px-2 mx-1">{{tag.name}}</b-badge>          
            </router-link> 
                    
        </div>
        <div v-if=error>Smth went wrong</div>
    </section>
</template>
                
                
<script>
import {actionTypes} from '@/store/modules/tags'
import {mapState} from 'vuex'
export default {
    name:'AppTags',
    mounted(){
        // console.log("I am a tag component")
        this.$store.dispatch(actionTypes.getTags)
        
    },
    computed:{
        ...mapState({
            isLoading: state=> state.tags.isLoading,
            error: state=>state.tags.error,
            tags:state=>state.tags.data

        })
    }
}
</script>
<style scoped>
.tag-list{
    display: flex;
    flex-direction: row;
    justify-content: right;
    flex-wrap: wrap;
    
}
.tag{
    color:rgb(56, 43, 10)

}
.tag:hover{
    cursor: pointer;
}
</style>