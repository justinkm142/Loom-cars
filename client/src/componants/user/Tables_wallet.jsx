import React from "react";







function Tables_wallet(props) {

console.log("user List in tables",props?.bookings)


  return (
    <div className="overflow-x-auto mt-10 p-10">
      <h1 className=" ms-10 mb-5"> My Recent Transations</h1>
      <table className="min-w-full divide-y-2 divide-slate-300 text-sm bg-white border border-collapse border-black ">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="border border-slate-300 whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Date
            </th>
            <th className=" border border-slate-300whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Activity 
            </th>
            <th className=" border border-slate-300 whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Amount Credicted
            </th>
            <th className=" border border-slate-300 whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Amount Debited
            </th>
            <th className=" border border-slate-300 whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Balance
            </th>


          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
            {props.bookings.map((data,index)=>{
                return(
                    <tr key={data._id}> 
                    <td className=" border border-slate-300 whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    {index+1}
                    </td>
                    <td className=" border border-slate-300 whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                     { data.name}
                    </td>
                    <td className=" border border-slate-300 whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    { data.phone}
                    </td>
                    <td className=" border border-slate-300 whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    { data.amount}
                    </td>
                    <td className=" border border-slate-300 whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    { data.paymentMethod}
                    </td>

                  </tr>

            )})}

         

        </tbody>
      </table>
    </div>
  );
}

export default Tables_wallet;
