import simpleAPI from '@/api/plainAxios'
  
const getCategTree = ()=>{    
    // console.log("cat with simpleAPI")
    return simpleAPI.get(`/api/v1/categories/`)
}
export default {    
    getCategTree
    

}    