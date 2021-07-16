import ideaAPI from '@/api/idea'

const state = {
    data:null,
    isLoading:false,
    error:null,    
    
}
// const getters = {
//     [getterTypes.ideaAuthor]:state=>{
//         return state.user||JSON.parse(localStorage.getItem('user'))
//       },
// }

// export const getterTypes = {
//     ideaAuthor:'[single idea] idea author',
    
//   }
export const mutationTypes = {
    SET_IDEA_LOADING:'[single idea] Load idea start',
    GET_IDEA_SUCCESS:'[single idea] Get idea success',
    GET_IDEA_FAILURE:'[single idea] Get idea failure',

    DELETE_IDEA_LOADING:'[single idea] DELETE idea start',
    DELETE_IDEA_SUCCESS:'[single idea] DELETE idea success',
    DELETE_IDEA_FAILURE:'[single idea] DELETE idea failure',
   
}

export const actionTypes = {
    getIdea:'[single idea] Get one idea',
    deleteIdea:'[single idea] Delete idea',
    
    
}
const mutations = {
    [mutationTypes.SET_IDEA_LOADING](state){
        state.isLoading = true
        // let op: all prev data will be out|=> met een schone lei beginnen
        state.data = null
      },
    [mutationTypes.GET_IDEA_SUCCESS](state,payload){
        state.isLoading = false
        state.data = payload
    }, 
    [mutationTypes.GET_IDEA_FAILURE](state,error){
        // at this point I don't know what errors I'll get
        state.isLoading = false
        state.error=error
    },
    // at this point they do (almost) nothing but draft for feauture
    [mutationTypes.DELETE_IDEA_LOADING](){},   
    [mutationTypes.DELETE_IDEA_SUCCESS](state){        
        state.data = null
    }, 
    [mutationTypes.DELETE_IDEA_FAILURE](state,err){
        state.error = err
    },    
    
}
const actions = {
    async [actionTypes.getIdea]({commit},{slug}){
        // console.log("store dispatching getIdeas")
        commit(mutationTypes.SET_IDEA_LOADING);
        try{
           // let op: you can get resp.data already ( see api) if you want            
           const resp = await ideaAPI.getOneIdea(slug)  
            console.log("response getIdeas is",resp)
            commit(mutationTypes.GET_IDEA_SUCCESS,resp.data)                        
            return resp           

        } catch(err){
            console.log("error by getOneIdea request",err)
            // example: incorrect url in request ot dj server
            commit(mutationTypes.GET_IDEA_FAILURE,err)            
            
        }          
    },
    async [actionTypes.deleteIdea]({commit},{slug}){
        console.log("store dispatching deleteIdeas with slug",slug)
        commit(mutationTypes.SET_IDEA_LOADING);
        try{
           // let op: you can get resp.data already ( see api) if you want            
           const resp = await ideaAPI.deleteIdea(slug)  
            console.log("response from delete:",resp)
            commit(mutationTypes.DELETE_IDEA_SUCCESS)                        
            return resp           
        } catch(err){
            console.log("error by deleteIdea request",err)
            // example: incorrect url in request ot dj server
            commit(mutationTypes.DELETE_IDEA_FAILURE,err)        
        }          
    },
    
}


export default {
    state,    
    mutations,
    // getters,
    actions
    
  }
