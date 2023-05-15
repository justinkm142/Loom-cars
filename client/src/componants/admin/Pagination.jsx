import React from 'react'

function Pagination() {
  return (
    <div>
      <a href="#" className="inline-flex items-center align-middle px-4 py-2 mr-3 text-sm font-medium  border  rounded-lg  hover:text-gray-70 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
        Previous
        </a>
        <a href="#" className="inline-flex items-center align-middle px-4 py-2 text-sm font-medium   border  rounded-lg   bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
         Next
        <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </a>
    </div>
  )
}
export default Pagination
