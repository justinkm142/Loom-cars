import React, { useEffect, useState } from 'react'
import Tables from '../../componants/admin/Tables.jsx'
import Pagination from '../../componants/admin/Pagination.jsx'
import axios from "../../utils/axiosInterceptor_admin";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';





function Users() {
  const [userList, setUserList]=useState([]);
  const [error1,setError1]=useState(null);
  const [nameFilter, setNameFilter] = useState("asc")
  const [page , setPage] = useState(1);
  const [totalDocument , setTotalDocument] = useState(0)

  let navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, [page]);

  let fetchUserData = async () => {
    try {
      let serverRespose = await axios({
        method: "get",
        url: "/users",
        params:{
          page
        },
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("admin_token"),
        // },
      });
      if (serverRespose.data.message == "sucess") {
        setUserList(serverRespose.data.result);
        setTotalDocument(serverRespose.data.totalDocument)
      } else {
        setError1("Please re-try after some time");
      }
    } catch (error) {
      if (error.response.status == 401) {
        
        localStorage.removeItem("admin_token");

        navigate("/admin/login");
      }
    }
  };

  let changeUserStatus = async (userId, status) => {
    try {
      let serverRespose = await axios({
        method: "patch",
        url: "/users",
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("admin_token"),
        // },
        data: {
          userId,
          status,
        },
      });
      if (serverRespose.data.message == "sucess") {
        status
          ? toast.error("User is Blocked!")
          : toast.success("User is Active!");

        fetchUserData();
      } else {
        setError1("Please re-try after some time");
        toast.error("Something Went Wrong!");
      }
    } catch (err) {
      console.log(err);
      if (err.response.data.error == "Token Expired") {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      }
    }
  };

  return (
    <div className='h-screen w-full bg-slate-900 p-10 flex justify-center'>
      <div className='w-11/12'>
      <h1 className='font-bold text-4xl mb-10 underline text-white'>User Management</h1>
      
      <Tables users={userList} changeUserStatus={changeUserStatus} />
      <div className='mt-10'>
      <Pagination setPage = {setPage} totalDocument = {totalDocument} page={page} />
      </div>

      </div>
      <Toaster />
    </div>
  )
}

export default Users
