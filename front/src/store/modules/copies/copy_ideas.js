// import authAPI from '@/api/idea'
import axios from '@/api/axios'

const state = {
    data:null,
    isLoading:false,
    error:null,
    //pagination
    page:1,
    currentPage:1,
    totalPages:null,
    next:null,
    prev:null,
    pageSize:null
    // step:0
}
export const getterTypes = {
    getStep:'[idea] get step',
    getNext:'[idea] get next page',
    getPrev:'[idea] get prev page',
    getPageSize:'[idea] get page size',
    
  }
export const mutationTypes = {
    GET_IDEAS_START:'[ideas] Get ideas start',
    GET_IDEAS_SUCCESS:'[ideas] Get ideas success',
    GET_IDEAS_FAILURE:'[ideas] Get ideas failure',
    SET_PAGINATION_TOTAL_PAGES:'[ideas] Set total pages',
    SET_PAGINATION_NEXT:'[ideas] Set next',
    SET_PAGINATION_PREV:'[ideas] Set prev',
    SET_PAGE_SIZE:'[ideas] Set page size',
    

}

export const actionTypes = {
    getIdeas:'[ideas] Get ideas'
}

const getters = {
    [getterTypes.getStep]:(state)=>{  
        if(state.pageSize>0)  {
            const step = Math.ceil(state.totalPages/state.pageSize);
            console.log("total Pages",state.totalPages)  
            console.log("step is",step)
            return step
        }
        else{
            console.log("state data len",state.pageSize)
            return 1
        }
    },
    [getterTypes.getNext]:(state)=>{
        return state.next
    },
    [getterTypes.getPrev]:(state)=>{
        return state.prev
    }
} 
const actions = {
    async [actionTypes.getIdeas]({commit},apiUrl){
        console.log("store dispatching getIdeas")
        commit(mutationTypes.GET_IDEAS_START);
        try{
            // instead of apiUrl(str)=> {object, к можно деструктурировать}
           const resp = await axios.get(apiUrl) 
           // let op data .results,.count,.prev,next 
            //   console.log("response getIdeas is",resp.data.results)             
              let count = resp.data.count  
            //   console.log("count!!!!!!!!!",count)          
              let prev = resp.data.links.prev            
              let next = resp.data.links.next 
              let pageSize = resp.data.results.length
              console.log("??!!! this len",pageSize)            
              commit(mutationTypes.GET_IDEAS_SUCCESS,resp.data.results)
              commit(mutationTypes.SET_PAGINATION_TOTAL_PAGES,count) 
              commit(mutationTypes.SET_PAGINATION_NEXT,next) 
              commit(mutationTypes.SET_PAGINATION_PREV,prev) 
              if(pageSize>0){
                  commit(mutationTypes.SET_PAGE_SIZE,pageSize) 
              }
              return resp            

        } catch(err){
            console.log("error by getIdea request",err)
            commit(mutationTypes.GET_IDEAS_FAILURE)
        }          
  },
}
const mutations = {
    [mutationTypes.GET_IDEAS_START](state){
        state.isLoading = true
        // let op: all prev data will be out|=> met een schone lei beginnen
        state.data = null
      },
    [mutationTypes.GET_IDEAS_SUCCESS](state,payload){
        state.isLoading = false
        state.data = payload
    }, 
    [mutationTypes.SET_PAGINATION_TOTAL_PAGES](state,count){        
        state.totalPages = count        
    }, 
    [mutationTypes.SET_PAGINATION_NEXT](state,next){
       state.next = next
    }, 
    [mutationTypes.SET_PAGINATION_PREV](state,prev){
       state.prev = prev       
    }, 
    [mutationTypes.SET_PAGE_SIZE](state,pageSize){
       state.pageSize = pageSize      
    }, 
    [mutationTypes.GET_IDEAS_FAILURE](state){
        // at this point I don't know what errors I'll get
        state.isLoading = false
    }, 
}


export default {
    state,
    getters,
    mutations,
    actions
    
  }







