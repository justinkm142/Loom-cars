import React, { useState, useEffect } from "react";
import Tables_Report from "../../componants/admin/Tables_Report.jsx";
import Pagination from "../../componants/admin/Pagination.jsx";
import axios from "../../utils/axiosInterceptor_admin";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

function Reports() {
  const [bookingList, setBookingList] = useState([]);
  const [error1, setError1] = useState(null);
  const [page , setPage] = useState(1);
  const [totalDocument , setTotalDocument] = useState(0)
  const [filter,setFilter] = useState("All")


  let navigate = useNavigate();

  useEffect(() => {
    fetchBookingData();
  }, [page,filter]);

  let fetchBookingData = async () => {
    try {
      let serverRespose = await axios({
        method: "get",
        url: "/report",
        params:{
            page,
            filter
        },
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("admin_token"),
        // }
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

 


  return (
    <div className="flex h-screen w-full justify-center bg-slate-900 py-10">
      <div className="w-11/12">
        <div className="flex justify-between">
            <h1 className="mb-5 text-4xl font-bold text-white underline">
            Reports
            </h1>
                    <div className="me-4">
                    <label htmlFor="HeadlineAct" className="block text-sm font-medium text-white">
                        Report Selector
                    </label>

                    <select
                        onChange={(e)=>{
                          setPage(1);
                          setTotalDocument(0);
                          setFilter(e.target.value)
                        }}
                        name="HeadlineAct"
                        id="HeadlineAct"
                        className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                    >
                        <option value="">Please select</option>
                        <optgroup label="Weekly">
                        <option value="ThisWeek">This Week</option>
                        <option value="LastWeek">Last Week</option>
                        </optgroup>

                        <optgroup label="Monthly">
                        <option value="ThisMonth">This Month</option>
                        <option value="LastMonth">Last Month</option>
                        </optgroup>

                        <optgroup label="Yearly">
                        <option value="ThisYear">This Year</option>
                        <option value="LastYear">Last Year</option>
                        </optgroup>

                    </select>
                    </div>

        </div>


        <Tables_Report
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

export default Reports;
