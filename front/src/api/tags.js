import simpleAPI from '@/api/plainAxios'

const getTags = ()=>{    
    // console.log("simple API for tags firing")
    return simpleAPI.get(`/api/v1/tags/`)
}
const getByTagName = ()=>{    
    console.log("simple API for tags name firing")
    return simpleAPI.get(`/api/v1/tags-name/`)
}


export default {    
    getTags,
    getByTagName
    

}    