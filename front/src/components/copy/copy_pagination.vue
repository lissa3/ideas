<template>
  <div >
    <nav>
    <div> 
      <ul class="pagination">
            <li class="page-item disabled" @click="changePageNum(1)"><a class="page-link">First</a></li>
            <li v-if="prev"  class="page-item" @click="changePageNum(currentPage-1)">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
            </li>
            <li class="page-item" v-for="but in buttonCount" :key="but">
                <a class="page-link" href="#" 
                @click="changePageNum(but)"
                :class="{active:currentPage===but}">{{but}}</a>
            </li>            
            <li v-if="next" class="page-item" @click="changePageNum(currentPage+1)">
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
            </li>
            <li class="page-item" @click="changePageNum(buttonCount)"><a class="page-link">Last</a></li>            
        </ul>
    </div>
</nav>
  </div>
</template>
<script>

import {getterTypes} from '@/store/modules/ideas'
import {mapGetters} from 'vuex'


export default {
  name:'AppPagination',
  props:[
        'currentPage',
        
        ],
  data(){
    return {
      count:0     
      
    }
  },
  methods:{
    changePageNum(pageNumber){
      console.log("pagination page calling ... ",pageNumber)
      this.$emit('changePageNum',pageNumber)
    }
  },
  computed:{
    ...mapGetters({
      next:getterTypes.getNext,
      prev:getterTypes.getPrev,
      step:getterTypes.getStep
    }),
    buttonCount(){          
        if(this.step){
          return this.step
        }else{
        // otherwise error (NaN value before getting value from create hook)
        return 1
        }      
    },
  },
  mounted(){
    console.log("I an a pagination")
  }  
}
</script>
<style>
.active{
  background-color: #efb79e;
  color:white;
  border: 1px solid #efb79e;
  border-radius: 4px;
  outline: none;
}
.page-link{
    color:black;
    border-radius:4px;
}
</style>
