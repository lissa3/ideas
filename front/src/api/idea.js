import axios from '@/api/axios'

const getIdeas = (apiUrl)=>{
    // console.log("api idea url is:",apiUrl)
    return axios.get(apiUrl)
}
const getOneIdea = (slug)=>{
    return axios.get(`api/v1/ideas-collection/ideas/${slug}`)
    // return axios.get(`api/v1/ideas-collection/ideas/${slug}`).then(response.data)
}
export default {    
    getIdeas,
    getOneIdea
    

}    