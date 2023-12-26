import {motion} from "framer-motion" 
import {useState} from 'react'
import axios from 'axios'
function NonInmateCertificate() {
    const [purpose,setPurpose]=useState("")
    const [remarks,setRemarks]=useState("")

    const submitHandler = (e)=>{
      e.preventDefault();
      axios.post('http://localhost:8080/student/noninmate',{
        purpose:purpose,
        remarks:remarks
      }).then((res)=>{
        console.log("submitted")
      })
      }
    return (
      <div  className='flex flex-col w-full items-center'>
        <div className='flex flex-row justify-between w-10/12 pt-4 items-center'>
          <div className='text-xl font-bold'>Apply for Non Inmate Certificate</div>
          <div className='flex flex-row space-x-4 items-center'>
              <div className='bg-white border rounded-full w-10 aspect-square'/>
              <div>user Name</div>
          </div>
        </div>
  
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} className='w-10/12 mt-12 bg-white rounded-xl p-5'>
          <form action="" onSubmit={submitHandler}>
            <div className="grid grid-cols-2 gap-y-4 w-7/12">
                <label htmlFor="">Nature of Certificate:</label>
                <p className="ml-3">Non Inmate Certificate</p>
                <label htmlFor="purpose">Purpose of Certificate:</label>
                <textarea placeholder="Enter the purpose for applying" name="purpose" value={purpose} onChange={(e)=>{setPurpose(e.target.value)}} className="border-solid border-2 rounded-lg ml-3 p-1" required/>
                <label htmlFor="">Remarks (if any):</label>
                <textarea placeholder="Enter remarks" name="remarks" value={remarks} onChange={(e)=>{setRemarks(e.target.value)}} className="border-solid border-2 rounded-lg ml-3 p-1"/>
            </div>
            <div className="w-full flex items-end justify-end mt-5">
                <button type="submit" className="ml-auto p-3 bg-stone-800 text-white rounded-xl">Apply for certificate</button>
            </div>
          </form>
        </motion.div>
      </div>
    )
  }
  
  export default NonInmateCertificate