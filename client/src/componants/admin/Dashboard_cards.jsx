import React from 'react'
import {GiMoneyStack} from 'react-icons/gi'
import {FaUsers, FaCarSide} from 'react-icons/fa'

function Dashboard_cards(props) {
  return (
    <div>
        <div className="w-full px-6 py-6 mx-auto">
        {/* <!-- row 1 --> */}
        <div className="flex flex-wrap -mx-3">
            



          {/* <!-- card 2 --> */}
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl  rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase ">Total Earning</p>
                      <h5 className="mb-2 font-bold mt-5 ">Rs. {props.totalEarning}</h5>
                      {/* <p className="mb-0 ">
                        <span className="text-sm font-bold leading-normal text-emerald-500">+55%</span>
                        since yesterday
                      </p> */}
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className=" w-12 h-12 text-center rounded-full bg-violet-500 text-white flex items-center justify-center ">
                     
                      <GiMoneyStack size={30}/>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

 


          {/* <!-- card 3 --> */}
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl  rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase ">Total Users</p>
                      <h5 className="mb-2 font-bold mt-5 ">Rs. {props.totalUser}</h5>
                      {/* <p className="mb-0 ">
                        <span className="text-sm font-bold leading-normal text-emerald-500">+55%</span>
                        since yesterday
                      </p> */}
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className=" w-12 h-12 text-center rounded-full bg-violet-500 text-white flex items-center justify-center ">
                     
                      <FaUsers size={30}/>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* <!-- card 4 --> */}
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl  rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase ">Total Cars</p>
                      <h5 className="mb-2 font-bold mt-5 ">Rs. {props.totalCar}</h5>
                      {/* <p className="mb-0 ">
                        <span className="text-sm font-bold leading-normal text-emerald-500">+55%</span>
                        since yesterday
                      </p> */}
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className=" w-12 h-12 text-center rounded-full bg-violet-500 text-white flex items-center justify-center ">
                     
                      <FaCarSide size={30}/>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>








        </div>



     </div>
    </div>
  )
}

export default Dashboard_cards
