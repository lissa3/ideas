import axios from '@/api/axios'

const getIdeas = (apiUrl)=>{
    console.log("api idea url is:",apiUrl)
    return axios.get(apiUrl)
}

export default {    
    getIdeas,
    

}    