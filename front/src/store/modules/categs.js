import getCateg from '@/api/categs'

export const actionTypes = {
    getCategs:'[categs] Get categ tree'
}

export const mutationTypes = {
    LOADING_CATEGS:'[cats] Load tags',
    GET_CATEGS_SUCCESS:'[cats] Set list tags',
    GET_CATEGS_FAILURE:'[cats] Fail list tags',
}
const state ={
    isLoading:null,
    data:null,
    error:null
}
const mutations = {
    [mutationTypes.LOADING_CATEGS](state){
        state.isLoading = true
        state.data = null
    },
    [mutationTypes.GET_CATEGS_SUCCESS](state,payload){
        state.isLoading = false,
        state.data = payload
    },
    [mutationTypes.GET_CATEGS_FAILURE](state,error){
        state.isLoading = false
        state.error = error

    }
}
const actions = {
    async [actionTypes.getCategs]({commit}){    
        // data from djoser:userId,
        console.log("inside getCategs") 
        commit(mutationTypes.LOADING_CATEGS);  
        try{
          // commit(mutationTypes.GET_CURRENT_USER_START)   
          console.log("trying to fetch cats")
          const resp= await getCateg.getCategTree()
          console.log("got categs",resp.data)
          if(resp.status === 200){                         
            commit(mutationTypes.GET_CATEGS_SUCCESS,resp.data)            
            return resp.data      
            }
          }
          catch(err){
            console.log("can't fetch categs",err)
            commit(mutationTypes.GET_CATEGS_FAILURE,err)
            
          }
        },
}




export default {
    state,
    actions,
    mutations,
    
    
  }
