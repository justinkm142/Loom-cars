import React from "react";







function Tables(props) {




  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm bg-white rounded-2xl">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Sl No.
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Phone
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Email
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Cars Provided
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Status
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Actions
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
            {props.users.map((data,index)=>{
                return(
                    <tr key={data._id}> 
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    {index+1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                     { data.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    { data.phone}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    { data.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    { data.carList.length==0? "No": "Yes"}
                    </td>
                    <td className={`whitespace-nowrap px-4 py-2 font-bold text-center  ${ data.isBlocked? "text-red-700":  "text-green-500"}`}>
                    { data.isBlocked?"Blocked": "Active" }
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 flex justify-center ">
                      <div className="align-middle">
        
                        {/* <span className="mr-3 text-sm font-medium text-red-700 align-middle">Block</span> */}
                        <label className="relative inline-flex   cursor-pointer my-auto align-middle">
                            <input type="checkbox" value="active" className="sr-only peer" defaultChecked={!data.isBlocked} onChange={()=>props.changeUserStatus(data._id,!data.isBlocked)}></input>
                            <div className="w-9 h-5 bg-red-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-green-700"></div>
                            {/* <span className="ml-3 text-sm font-medium text-green-700">Active</span> */}
                        </label>
        
                      </div>
                      
                      
                    </td>
                  </tr>

            )})}

         

        </tbody>
      </table>
    </div>
  );
}

export default Tables;
