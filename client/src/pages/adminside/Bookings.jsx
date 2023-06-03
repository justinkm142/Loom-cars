import React, { useState, useEffect } from "react";
import Tables_booking from "../../componants/admin/Tables _booking.jsx";
import Pagination from "../../componants/admin/Pagination.jsx";
import axios from "../../utils/axiosInterceptor_admin";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

function Bookings() {
  const [bookingList, setBookingList] = useState([]);
  const [error1, setError1] = useState(null);
  const [nameFilter, setNameFilter] = useState("asc");
  const [page , setPage] = useState(1);
  const [totalDocument , setTotalDocument] = useState(0)

  let navigate = useNavigate();

  useEffect(() => {
    fetchBookingData();
  }, [page]);

  let fetchBookingData = async () => {
    try {
      let serverRespose = await axios({
        method: "get",
        url: "/booking",
        params:{
          page
        },
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("admin_token"),
        // },
      });
      if (serverRespose.data.message == "sucess") {
        setBookingList(serverRespose.data.result);
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

  // let changeUserStatus = async (userId, status) => {
  //   try {
  //     let serverRespose = await axios({
  //       method: "patch",
  //       url: "http://localhost:3000/api/v1/admin/users",
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("admin_token"),
  //       },
  //       data: {
  //         userId,
  //         status,
  //       },
  //     });
  //     if (serverRespose.data.message == "sucess") {
  //       status
  //         ? toast.error("User is Blocked!")
  //         : toast.success("User is Active!");

  //       fetchUserData();
  //     } else {
  //       setError1("Please re-try after some time");
  //       toast.error("Something Went Wrong!");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     if (err.response.data.error == "Token Expired") {
  //       localStorage.removeItem("admin_token");
  //       navigate("/admin/login");
  //     }
  //   }
  // };

  return (
    <div className="flex h-screen w-full justify-center bg-slate-900 py-10">
      <div className="w-11/12">
        <h1 className="mb-5 text-4xl font-bold text-white underline">
          Booking Management
        </h1>

        <Tables_booking
          bookings={bookingList}
          getBookingData={fetchBookingData}
          page={page}
        />



        <div className="mt-5">
          <Pagination setPage = {setPage} totalDocument = {totalDocument} page={page} />
        </div>




      </div>
      <Toaster />
    </div>
  );
}

export default Bookings;
