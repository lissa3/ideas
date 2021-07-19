// function-ty that changes state ( edit/edit ideas)
import ideaAPI from '@/api/idea'

const state = {
    idea:null,
    isLoading:null,
    isSubmitting:false,
    servErrs:{
        status:null,
        titleErr:null,
        leadTextErr:null,
        mainTextErr:null,
        categErr:null,
        tagsErr:null,
        thumbnailErr:null,
        nonFieldErrs:null,
        netWorkErr:null,
        status500:null
      },
    
}

export const mutationTypes = { 
    // fetch idea   
    SET_IDEA_LOADING:'[editIdea] Load idea start',
    GET_IDEA_SUCCESS:'[editIdea] Get idea success',
    GET_IDEA_FAILURE:'[editIdea] Get idea failure',
    // edit idea
    EDIT_IDEA_START:'[editIdea] EDIT idea start',
    EDIT_IDEA_SUCCESS:'[editIdea] EDIT idea success',
    EDIT_IDEA_FAILURE:'[editIdea] EDIT idea failure',
    // network-problem
    NETWORK_PROBELM:'[EditIdea] NETWORK_PROBELM',
    STATUS_500:'[EditIdea] STATUS 500 SERVER ERROR',
    // temp loader
    STOP_LOADER:'[editIdea] STOP SUBMIT LOADER',
}

export const actionTypes = {
    getIdea:'[editIdea] FETCH idea',    
    editIdea:'[editIdea] EDIT idea'    
}

const mutations = { 
    [mutationTypes.SET_IDEA_LOADING](state){
        state.isLoading = true
        // let op: all prev data will be out|=> met een schone lei beginnen
        state.idea = null
      },
    [mutationTypes.GET_IDEA_SUCCESS](state,payload){
        state.isLoading = false
        state.idea = payload
    }, 
    [mutationTypes.GET_IDEA_FAILURE](state,error){
        // at this point I don't know what errors I'll get
        state.isLoading = false
        // state.error=error
    },   
    [mutationTypes.EDIT_IDEA_START](){
        state.isSubmitting = true
        state.servErrs = {}
    },   
    [mutationTypes.EDIT_IDEA_SUCCESS](state){   
        state.isSubmitting = false     
        // state.idea = idea
    }, 
    [mutationTypes.EDIT_IDEA_FAILURE](state){
        state.isSubmitting = false
        
    },
    [mutationTypes.NETWORK_PROBELM](state){
        state.netWorkErr = true    
        state.isSubmitting=false
    },
    [mutationTypes.STATUS_500](state){
        state.err500 = true    
        state.isSubmitting=false
    },    
      
}


const actions = {  
    // console.log("url?????",actionTypes.getIdea)  
    async [actionTypes.getIdea]({commit},slug){
        console.log("store fetching idea before edit")
        commit(mutationTypes.SET_IDEA_LOADING);
        const servResp = {}
        try{
           // let op: you can get resp.data already ( see api) if you want            
           const resp = await ideaAPI.getIdeaBeforeEdit(slug)  
            console.log("response from edit:",resp)
            commit(mutationTypes.GET_IDEA_SUCCESS,resp.data)  
            // servResp.slug = resp.data.slug 
            // servResp.title = resp.data.title
            // servResp.mainText = resp.data.main_text
            // servResp.leadtext = resp.data.lead_text
            // servResp.tags = resp.data.tags
            // servResp.thumbnail = resp.data.thumbnail
            servResp.status = resp.status
            console.log("to vue",servResp)                     
            return servResp           
        } catch(err){
            console.dir(err)
            // servResp.status = err.response.status
            if(err.response === undefined){
                // DONE
                commit(mutationTypes.NETWORK_PROBELM)
                servResp.servDown = true  
                return servResp
            }else if(err.response.status === 500) {
                commit(mutationTypes. STATUS_500)
                // DONE  
                servResp.status = err.response.status
                console.log("500 error gets sent to vue page",servResp)
                return servResp
            } else{     
                
                console.log("error by fetching idea before editing",err)
                console.dir(err)
                // example: incorrect url in request ot dj server            
                commit(mutationTypes.GET_IDEA_FAILURE)  
                return servResp
                }     
        }          
    },
    async [actionTypes.editIdea]({commit},{slug,ideaInput}){
        console.log("store dispatching edit ideas")
        commit(mutationTypes.EDIT_IDEA_START);
        const servResp = {}
        try{
           // let op: you can get resp.data already ( see api) if you want            
           const resp = await ideaAPI.editIdea(slug,ideaInput)  
            console.log("response from edit:",resp)
            commit(mutationTypes.EDIT_IDEA_SUCCESS)  
            servResp.status = resp.status
            console.log("to vue",servResp)                     
            return servResp           
        } catch(err){
            console.dir(err)
            // servResp.status = err.response.status
            if(err.response === undefined){
                // DONE
                commit(mutationTypes.NETWORK_PROBELM)
                servResp.servDown = true  
                return servResp
            }else if(err.response.status === 500) {
                commit(mutationTypes. STATUS_500)
                // DONE  
                servResp.status = err.response.status
                console.log("500 error gets sent to vue page",servResp)
                return servResp
            } else{     
                servResp.status = err.response.status
                servResp.titleErr = err.response.data.title
                servResp.leadTextErr = err.response.data.lead_text
                servResp.mainTextErr = err.response.data.main_text
                servResp.categErr = err.response.data.categ
                servResp.tagsErr = err.response.data.detail||err.response.tags
                servResp.thumbnailErr = err.response.data.thumbnail
                servResp.nonFieldErrs = err.response.data.non_field_errors
                console.log("error by edit Idea request",err)
                console.dir(err)
                // example: incorrect url in request ot dj server            
                commit(mutationTypes.EDIT_IDEA_FAILURE)  
                return servResp
                }     
        }          
    },
}


export default {
    state,    
    mutations,
    actions
    
  }
