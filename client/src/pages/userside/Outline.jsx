import React,{useState,useEffect,createContext} from 'react'
import {Outlet} from 'react-router-dom'
import axios from '../../utils/axiosInterceptor_user'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";


import Modal_SidePanel from '../../componants/user/Modal_SidePanel'
import UserNavbar1 from '../../componants/user/Navbar-user'
import Footer from '../../componants/user/Footer'



export const UserContext = createContext();


function Outline() {
  const [showModal,setShowModal] = useState(false);
  const [userDetails, setUserDeatils] =useState({});

  const name = useSelector((state)=>state.user.name)

  const navigate = useNavigate();

  useEffect(()=>{
    
    let token = localStorage.getItem("token");
    if(token){
      let decoded = jwt_decode(token);
      let userId = decoded.userId;
      getUserDetails(userId);
    }else{
      setUserDeatils({})
    }
  },[name])




  const getUserDetails = async (userId) => {
    try {
      let serverRespose = await axios({
        method: "get",
        url: "/userDetails",
        params: {
          userId: userId,
        },
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("token"),
        // },
      });
      if (serverRespose.data.message == "sucess") {
       
        setUserDeatils((pre) => {
          return {...serverRespose.data.data};
        });
      } else {
        setError1("Please re-try after some time");
      }
    } catch (error) {
      console.log(error);

      if (error.response.status == 401) {
        localStorage.clear();
        navigate("/user/login");
      }
    }
  };
  





  const modalClose= ()=>{
    setShowModal(false)
  }




  return (
    <UserContext.Provider value={{userDetails , setUserDeatils}} >
    <div>
          <UserNavbar1 setModal={setShowModal}/>
          <Modal_SidePanel visible={showModal} modalClose={modalClose} />
          <div className="min-h-screen">

              <Outlet />

          </div>

          <Footer />
    </div>
    </UserContext.Provider>
  )
}

export default Outline
