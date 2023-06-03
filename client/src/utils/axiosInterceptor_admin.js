import axios from "axios";
import { adminBaseUrl } from "./API";



const adminInstance=axios.create({
    baseURL:adminBaseUrl
})


adminInstance.interceptors.request.use((config)=>{
    const adminToken=localStorage.getItem('admin_token');
    if(adminToken){
        config.headers.Authorization=`Bearer ${adminToken}`
    }
    return config
},(error)=>{
    return Promise.reject(error)
})




export default adminInstance