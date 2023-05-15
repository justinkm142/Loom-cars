import React from 'react'
import OtpWindow from './OtpWindow'




function Modal(props) {
    if(!props.visible){
        return null
    }
let handleClose=(e)=>{
if(e.target.id=="container" || e.target.id=="closeButton"){
props.handleClose(false)
}
}

  return (
    <div id="container" onClick={handleClose} className='fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center ease-in-out duration-300'>
        <div className='bg-[#1F1F1E] flex items-center justify-center h-5/6 w-1/3 rounded-xl relative ease-in-out duration-300'>
        <p 
        id='closeButton'
        onClick={handleClose}
        className='ease-in-out duration-300 absolute top-0  right-0 text-black bg-slate-200 text-4xl p-2 m-0 rounded-md hover:bg-slate-400 cursor-pointer active:bg-slate-600'>X</p>
          <OtpWindow />
        </div>
      
    </div>
  )
}

export default Modal
