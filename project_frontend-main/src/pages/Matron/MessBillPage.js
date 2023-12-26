import React, { useState } from 'react'
import MessOutPage from '../../components/MessOutPage'
import MessBill from '../../components/MessBill'
import UploadMessBill from '../../components/UploadMessBill'
import MessOutList from '../../components/MessOutList'
import CurrentMessInmates from '../../components/CurrentMessInmates'
function MessBillPage() {
  const [inmates,setInmates]=useState([])
  return (
    <div className='flex flex-col w-full items-center min-h-screen h-full overflow-y-scroll'>
      <div className='flex flex-row justify-between w-11/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Matron</div>

        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>user Name</div>
        </div>
      </div>

      <div className='flex flex-col items-center py-3 space-y-4 w-11/12 mt-8 bg-white rounded-xl'>
        {/* white box nav bar */}
          <div className='text-xl font-bold'>Inmate List</div>
          <CurrentMessInmates inmates={inmates} setInmates={setInmates}/>
      </div>
    </div>
  )
}

export default MessBillPage