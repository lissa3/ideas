// import authAPI from '@/api/idea'
import axios from '@/api/axios'

const state = {
    data:null,
    isLoading:false,
    error:null,
    ideas:[],
    count:0,
    prev:'',
    next:''
    
    //pagination
    // page:1,
    // currentPage:1,
    // totalPages:null,
    // next:null,
    // prev:null,
    // pageSize:null
    // step:0
}
// export const getterTypes = {
//     getStep:'[idea] get step',
//     getNext:'[idea] get next page',
//     getPrev:'[idea] get prev page',
//     getPageSize:'[idea] get page size',
    
//   }
export const mutationTypes = {
    GET_IDEAS_START:'[ideas] Get ideas start',
    GET_IDEAS_SUCCESS:'[ideas] Get ideas success',
    GET_IDEAS_FAILURE:'[ideas] Get ideas failure',   
    SET_IDEAS:'[ideas] Set ideas',
    SET_COUNT:'[ideas] Set ideas count',
    SET_PREV:'[ideas] Set ideas prev',
    SET_NEXT:'[ideas] Set ideas next',

}

export const actionTypes = {
    getIdeas:'[ideas] Get ideas'
}

const getters = {
    
} 
const actions = {
    async [actionTypes.getIdeas]({commit},{apiUrl}){
        // console.log("store dispatching getIdeas")
        console.log("api url is",apiUrl)
        commit(mutationTypes.GET_IDEAS_START);
        try{
            // instead of apiUrl(str)=> {object, к можно деструктурировать}
           const resp = await axios.get(apiUrl) 
           // let op data .results,.count,.prev,next 
            console.log("whole response:",resp)
            // console.log("api url is",apiUrl)
            console.log("response getIdeas is",resp.data)
            commit(mutationTypes.GET_IDEAS_SUCCESS,resp.data)             
            commit(mutationTypes.SET_IDEAS,resp.data.results)
            commit(mutationTypes.SET_NEXT,resp.data.next)
            commit(mutationTypes.SET_PREV,resp.data.previous)
            commit(mutationTypes.SET_COUNT,resp.data.count)
            console.log("results",resp.data.results)  
            console.log("mutation done, look at results in store")           
            // console.log("len results",resp.data.results.length)             
            //   let count = resp.data.count  
            //   console.log("count!!!!!!!!!",count)          
                
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
    [mutationTypes.GET_IDEAS_FAILURE](state){
        // at this point I don't know what errors I'll get
        state.isLoading = false
    }, 
    [mutationTypes.SET_IDEAS](state,payload){
        state.isLoading = false
        state.ideas = payload
    },     
    [mutationTypes.SET_COUNT](state,count){        
        state.count = count
    },     
    [mutationTypes.SET_PREV](state,prev){        
        state.prev = prev
    },     
    [mutationTypes.SET_NEXT](state,next){        
        state.next = next
    },     
}


export default {
    state,
    getters,
    mutations,
    actions
    
  }







