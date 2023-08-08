import React, {useEffect,useState} from "react";
import { useNavigate } from 'react-router'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import toast, { Toaster } from 'react-hot-toast';






function Tables_Report(props) {

  const navigate =useNavigate()

 

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm bg-white rounded-2xl">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Sl No.
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Car No.
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Phone
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Location
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Amount
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Booked Date
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Payment Status
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Booking Status
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Action
            </th>
            <th className="px-0 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
            {props.bookings.map((data,index)=>{
                return(
                    <tr key={data._id}> 
                    <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900 text-center">
                    {/* {index+1==10 ? null : props.page}{index+1} */}
                    {10*(props.page-1)+index+1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-1 text-gray-700 text-center">
                     { data.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-1 text-gray-700 text-center">
                    { data.carDetails?.carNumber}
                    </td>
                    <td className="whitespace-nowrap px-4 py-1 text-gray-700 text-center">
                    { data.phone}
                    </td>
                    <td className="whitespace-nowrap px-4 py-1 text-gray-700 text-center">
                    { data.carDetails?.availableLocation}
                    </td>
                    <td className="whitespace-nowrap px-4 py-1 text-gray-700 text-center">
                    { data.amount}
                    </td>
                    <td className={`whitespace-nowrap px-4 py-1 text-gray-700 text-center `}>
                    { data.datesBooked[0].startDate} to { data.datesBooked[0].endDate}
                    </td>
                    <td className={`whitespace-nowrap px-4 py-1 text-gray-700 text-center `}>
                    { data.paymentStatus} 
                    </td>
                    <td className={`whitespace-nowrap px-4 py-1 text-gray-700 text-center `}>
                    { data.bookingStatus} 
                    </td>
                    <td className={`whitespace-nowrap px-4 py-1 flex justify-end text-gray-700 text-center `}>
                    <button onClick={()=>{
                      navigate("/admin/bookingsDetails/"+data._id)
                    }}
                    className="border ms-2 p-1 rounded-lg hover:bg-slate-300 active:bg-slate-500">Details</button>
                    </td>

                  </tr>

            )})}

         

        </tbody>
      </table>
    </div>
  );
}

export default Tables_Report;
