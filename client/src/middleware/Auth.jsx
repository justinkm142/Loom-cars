import {Navigate} from 'react-router-dom'
import axios from 'axios';


export const AuthorizeAdmin = ({children})=>{
    const token = localStorage.getItem('admin_token');
    if(!token){
        return <Navigate to={'/admin/login'} replace={true}></Navigate> 
    }

    let payload= token.split('.')[1];
    let decodedPayload= JSON.parse(window.atob(payload))
    console.log("data after decode ",decodedPayload)
    if(decodedPayload.role=="admin"){
      return children;
    }else{
      return <Navigate to={'/admin/login'} replace={true}></Navigate> 
    }
    

}


export const ProtectPath = ({children})=>{
    const token = localStorage.getItem('admin_token');
    if(token){
      let payload= token.split('.')[1];
      let decodedPayload= JSON.parse(window.atob(payload))
      console.log("data after decode ",decodedPayload)
      if(decodedPayload.role=="admin"){
        return <Navigate to={'/admin/dashboard'} replace={true}></Navigate> 
      }else{
        return children;
      }
    }
    return children;

}



 let verifyToken = async()=>{
      let serverRespose = await axios({
        method: "get",
        url: "http://localhost:3000/api/v1/verify/admin",
        headers: {
          Authorization: "Bearer " + localStorage.getItem('admin_token')
        }
      });
      if (serverRespose.data.message == "sucess") {
        return true
      } else {
        localStorage.clear();
        return false
      }
  }
