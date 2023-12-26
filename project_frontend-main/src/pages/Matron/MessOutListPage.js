import React, { useState } from 'react'
import MessOutList from '../../components/MessOutList'
function MessOutListPage() {

  return (
    <div className='flex flex-col w-full items-center min-h-screen h-full overflow-y-scroll'>
      <div className='flex flex-row justify-between w-11/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Matron</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>user Name</div>
        </div>
      </div>

      <div className='flex flex-col place-items-center pl-12 py-8 space-y-4 w-full w-10/12 mt-8 bg-white rounded-xl'>
        {/* white box nav bar */}
        <div className='text-xl font-bold '>Mess Out List</div>


          <MessOutList/>


              

         
        

      </div>
    </div>
  )
}

export default MessOutListPage