import axios from "axios";
import { userBaseUrl } from "./API";




const userInstance=axios.create({
    baseURL:userBaseUrl
})


userInstance.interceptors.request.use((config)=>{
    const userToken=localStorage.getItem('token');
    if(userToken){
        config.headers.Authorization=`Bearer ${userToken}`
    }
    return config
},(error)=>{
    return Promise.reject(error)
})




export default userInstance
