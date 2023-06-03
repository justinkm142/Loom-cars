import { useDispatch } from 'react-redux';
import {Navigate} from 'react-router-dom'
import { update } from '../redux/userSlice';
import jwt_decode from "jwt-decode";


export const AuthorizeUser = ({children})=>{
    const token = localStorage.getItem('token');
    if(!token){
        return <Navigate to={'/user/login'} replace={true}></Navigate> 
    }
    return children;

}


export const ProtectPathUser = ({children})=>{
    const token = localStorage.getItem('token');
    if(token){
        return <Navigate to={'/user/home'} replace={true}></Navigate> 
    }
    return children;

}


export const UserDetails = ({children})=>{
    const dispach = useDispatch()
    const token = localStorage.getItem('token');
    let decoded
    if(token){
        try {
            decoded  = jwt_decode(token);
        } catch (error) {
            console.log(error)
            localStorage.clear();
            return children;
        }
        
        console.log("decoded data =>",decoded) 
        let userId = decoded.userId;
        let name= decoded.user;
        let email= decoded.email;
        let phone = decoded.phone;
        dispach(update({name,email,userId,phone}))
    }
    return children;

}