import React from 'react'
import Uploader from '../../components/Uploader'

function SignupInviteHod() {
  return (
    <div className='flex flex-col w-full items-center'>
      <div className='flex flex-row justify-between w-10/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Signup Invite</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>user Name</div>
        </div>
      </div>

      <div className='w-11/12 mt-12 bg-white rounded-lg'>

        

        {/* search and filter */}
        <div className='flex flex-row bg-white rounded-lg w-11/12 items-center p-3 justify-between'>
        <div className='text-sm font-bold'>Send signup link (individually)</div>
          {/* search */}
          <div className='flex flex-row items-center bg-white rounded-lg text-sm px-2  border-solid border-2 border-black	'>
            
            <input 
              placeholder='Enter an Email address'
              className='p-2 w-80 outline-none 	'
            />
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
            <div className='py-2 cursor-pointer hover:bg-stone-600 px-3 bg-stone-800 text-white text-sm font-semibold rounded-2xl'>Submit</div>

          </div>  
        <div className='text-sm font-bold mt-5 w-11/12 p-3'>Send signup link (Using Sheets)</div>


      <Uploader/>
      
      <div className="w-full flex items-end justify-end mt-5">
          <div className='mr-3 mb-3 p-3 py-2 cursor-pointer hover:bg-stone-600 px-3 bg-stone-800 text-white text-sm font-semibold rounded-2xl'>Submit</div>
        </div>
      </div>
    </div>
  )
}

export default SignupInviteHod