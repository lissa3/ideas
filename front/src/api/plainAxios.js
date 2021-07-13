import axios from 'axios'
let baseUrl = 'http://127.0.0.1:8000'



const simpleAPI = axios.create({
    baseURL: baseUrl,
    headers:{
      Accept:"application/json",
      'Content-Type': 'application/json',
      
    }
  })

  
export default  simpleAPI
