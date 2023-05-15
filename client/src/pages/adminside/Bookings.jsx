import React ,{useState, useEffect} from 'react'
import Tables_booking from '../../componants/admin/Tables _booking.jsx'
import Pagination from '../../componants/admin/Pagination.jsx'
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';

function Bookings() {


    const [bookingList, setBookingList]=useState([]);
    const [error1,setError1]=useState(null);
    const [nameFilter, setNameFilter] = useState("asc")
  
    let navigate = useNavigate();
  
    useEffect(() => {
      fetchBookingData();
    }, []);
  
    let fetchBookingData = async () => {
      try {
        let serverRespose = await axios({
          method: "get",
          url: "http://localhost:3000/api/v1/admin/booking",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admin_token"),
          },
        });
        if (serverRespose.data.message == "sucess") {
            console.log(serverRespose.data.result)
            setBookingList(serverRespose.data.result);
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
          url: "http://localhost:3000/api/v1/admin/users",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admin_token"),
          },
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
        <h1 className='font-bold text-4xl mb-10 underline text-white'>Booking Management</h1>
        
        <Tables_booking bookings={bookingList} changeUserStatus={changeUserStatus} />
        <div className='mt-10'>
        <Pagination />
        </div>
  
        </div>
        <Toaster />
      </div>
    )
  }

export default Bookings
