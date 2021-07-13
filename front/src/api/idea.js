import axios from '@/api/axios'
import simpleAPI from '@/api/plainAxios'

const getIdeas = (apiUrl)=>{
    // console.log("api idea url is:",apiUrl)
    return simpleAPI.get(apiUrl)
}
const getOneIdea = (slug)=>{
    return simpleAPI.get(`api/v1/ideas-collection/ideas/${slug}/`)
    // return axios.get(`api/v1/ideas-collection/ideas/${slug}`).then(response.data)
}
const deleteIdea = (slug)=>{
    return axios.delete(`/api/v1/ideas-collection/ideas/${slug}/`)
}
export default {    
    getIdeas,
    getOneIdea,
    deleteIdea
    

}    