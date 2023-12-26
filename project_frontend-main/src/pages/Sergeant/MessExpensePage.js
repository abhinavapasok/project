import React, { useState,useEffect, useContext } from 'react'
import axios from 'axios'
import {motion} from 'framer-motion'
import AddPerDayMessExpense from './AddPerDayMessExpense';
import MessExpenseList from './MessExpenseList';
import { UserContext } from '../../Contexts/UserContext';
import { baseUrl } from '../../baseUrl';
import SupplierList from '../../components/Supplierlist';
import MessExpenseHistoryStatus from '../../components/MessExpenseHistoryStatus';
function MessExpensePage() {
  const [tabSelected, setTabSelected] = useState(1)
  const [suppliers,setSuppliers]=useState([]);
  const {setLoading } = useContext(UserContext)
  useEffect(()=>{
    setLoading(true);
    axios.get(`${baseUrl}/warden/get-supplier-list`).then((res)=>{
    console.log(res.data)
    setSuppliers(res.data.data)
    setLoading(false)
    }).catch((er)=>{
   console.log(er)
   setLoading(false)
    })
      
  },[])
  return (
    <div className='flex flex-col w-full items-center min-h-screen h-full overflow-y-scroll'>
      <div className='flex flex-row justify-between w-11/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Mess Expenses</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
           
        </div>
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}  className='flex flex-col items-center py-8 space-y-4 w-11/12 mt-8 bg-white rounded-xl'>
        {/* white box nav bar */}
        <div className='flex flex-row justify-between w-11/12 items-center'>
          <div className='flex flex-row tex-black text-sm font-bold relative'>
              <div
                className='cursor-pointer '
                onClick={()=>{
                  setTabSelected(1)
                }}
              >
                  <div>Supplier List</div>
                  <div className={tabSelected===1?'mt-2 h-1 self-center w-12/12 bg-stone-800 rounded-full':''}/>
              </div>

              <div 
                className='ml-5 cursor-pointer'
                onClick={()=>{
                  setTabSelected(2)
                }}
              >
                <div>Expense List</div>
                <div className={tabSelected===2?'mt-2 h-1 w-12/12 self-center bg-stone-800 rounded-full':''}/>
              </div>

              <div 
                className='ml-5 cursor-pointer'
                onClick={()=>{
                  setTabSelected(3)
                }}
              >
                <div>Expense Status</div>
                <div className={tabSelected===3?'mt-2 h-1 w-12/12 self-center bg-stone-800 rounded-full':''}/>
              </div>
          </div>

          {/* {tabSelected===1&&<div className='text-sm mb-2'>Showing 1-8 out of 200 results</div>} */}
          <br />
        </div>
        {tabSelected===1&&<SupplierList suppliers={suppliers} setSuppliers={setSuppliers}/>}

        {tabSelected===2&&<MessExpenseList paymentinitiated={false} suppliers={suppliers} setSuppliers={setSuppliers}/>}

        {tabSelected===3&&<MessExpenseHistoryStatus paymentinitiated={false} suppliers={suppliers} setSuppliers={setSuppliers}/>}
      </motion.div>
    </div>
  )
}

export default MessExpensePage