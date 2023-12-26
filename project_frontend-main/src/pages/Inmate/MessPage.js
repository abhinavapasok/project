import React, { useState,useEffect, useContext } from 'react'
import axios from 'axios'
import MessOutPage from '../../components/MessOutPage';
import MessBill from '../../components/MessBill'
import {motion} from 'framer-motion'
import { UserContext } from '../../Contexts/UserContext';
import MessOutList from '../../components/MessOutList';
import MessOutReqs from '../../components/MessOutReqs';
import MessOutReqsforToday from '../../components/MessoutReqForToday';
function MessPage() {
  const {user}=useContext(UserContext)
  const [tabSelected, setTabSelected] = useState(2)
  const [noofkdaybefore,setnoofkdaybefore]=useState(0);
  const [noofDays,setNoofDays]=useState(0)
  const [noofMaxmessoutDays,setnoofMaxmessoutDays]=useState(0);
  const [noOfMaxMessOutsinMonth,setnoOfMaxMessOutsinMonth]=useState(0);

  return (
    <div className='flex flex-col w-full items-center min-h-screen h-full overflow-y-scroll'>
      <div className='flex flex-row justify-between w-11/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Mess</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>{user.name}</div>
        </div>
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}  className='flex flex-col items-center py-8 space-y-4 w-11/12 mt-8 bg-white rounded-xl'>
        {/* white box nav bar */}
        <div className='flex flex-row justify-between w-11/12 items-center'>
          <div className='flex flex-row tex-black text-sm font-bold relative'>
              {/* <div
                className='cursor-pointer '
                onClick={()=>{
                  setTabSelected(1)
                }}
              >
                  <div>Mess Bill</div>
                  <div className={tabSelected===1?'mt-2 h-1 self-center w-12/12 bg-stone-800 rounded-full':''}/>
              </div> */}

              <div 
                className='ml-5 cursor-pointer'
                onClick={()=>{
                  setTabSelected(2)
                }}
              >
                <div>Mess in/Mess out</div>
                <div className={tabSelected===2?'mt-2 h-1 w-12/12 self-center bg-stone-800 rounded-full':''}/>
              </div>
              <div 
                className='ml-5 cursor-pointer'
                onClick={()=>{
                  setTabSelected(3)
                }}
              >
                <div>Todays Mess Out</div>
                <div className={tabSelected===3?'mt-2 h-1 w-12/12 self-center bg-stone-800 rounded-full':''}/>
              </div>
          </div>

          {/* {tabSelected===1&&<div className='text-sm mb-2'>Showing 1-8 out of 200 results</div>} */}
          <br />
        </div>
        {tabSelected===2&&<MessOutPage noofkdaybefore={noofkdaybefore} setnoofkdaybefore={setnoofkdaybefore} noofMaxmessoutDays={noofMaxmessoutDays} setnoofMaxmessoutDays={setnoofMaxmessoutDays} noOfMaxMessOutsinMonth={noOfMaxMessOutsinMonth} setnoOfMaxMessOutsinMonth={setnoOfMaxMessOutsinMonth} noofDays={noofDays} setNoofDays={setNoofDays}/>}
      {tabSelected==3&&<MessOutReqsforToday/>}
      
      </motion.div>
    </div>
  )
}

export default MessPage