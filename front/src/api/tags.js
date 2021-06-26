import axios from '@/api/axios'

const getTags = ()=>{    
    return axios.get(`/api/v1/tags/`)
}
export default {    
    getTags
    

}    