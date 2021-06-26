<template>
    <section >
        <div v-if="isLoading">Loading</div>
        <div  class="categ-list">
            <div class="section-categs">Categories:</div>
            <!-- <div>Zoo:{{categs}}</div> -->
            <app-categ-tree :treeData="categs"></app-categ-tree>
            
                    
        </div>
        <div v-if="error">Smth went wrong</div>
    </section>
</template>
                
                
<script>
import AppCategTree from '@/components/categs/CatTree'
import axios from 'axios'
// import {actionTypes} from '@/store/modules/categs'
import {mapState} from 'vuex'
export default {
    name:'AppCategs',
    data(){
        return {
           categs:[]
        }
    },
    components:{
        AppCategTree
    },
    // created(){
    //     this.$store.dispatch(actionTypes.getCategs)

    // },
    mounted(){
        console.log("I am a categ component")
        axios.get('http://127.0.0.1:8000/api/v1/categories/')
        .then((resp)=>{
            this.categs = resp.data
        })
        .catch(err=>{
            console.log("error after get cats",err)
        })
        
    },
    computed:{
        ...mapState({
            isLoading: state=> state.categs.isLoading,
            error: state=>state.categs.error,
            zoo:state=>state.categs.data

        })
    }
}
</script>
<style scoped>
.categ-list{
    display: flex;
    flex-direction: row;
    justify-content: right;
    flex-wrap: wrap;
    
}
.categ{
    color:rgb(56, 43, 10)

}
.categ:hover{
    cursor: pointer;
}
.li-indent {
  padding-left: 1rem;
  margin-left: 1rem;
  background-color: red;
}
.cat-container {
  background-color: cadetblue;
}
.section-categs {
  text-align: left;
  text-decoration: none;
  list-style: none;
  padding-left: 1rem;
  margin-left: 1rem;
}
.section-categs li {
  cursor: pointer;
  padding: 1rem;
}
.section-categs li:hover {
  background-color: darkcyan;
}
</style>