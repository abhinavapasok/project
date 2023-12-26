import React, { useState } from 'react'
import CertificateForm from '../../components/CertificateForm'
import DownloadIcon from '@mui/icons-material/Download';
import MessDuesClear from '../../components/MessDuesClear';
import {motion} from 'framer-motion'
function HostelOfficeMess() {
  const applications=[
    {
      SlNo:"1234",
      Certificate:"xyz",
      Date:"cse"
    },
    {
      SlNo:"1234",
      Certificate:"xyz",
      Date:"cse"
    },
    {
      SlNo:"1234",
      Certificate:"xyz",
      Date:"cse"
    },
    {
      SlNo:"1234",
      Certificate:"xyz",
      Date:"cse"
    },
    {
      SlNo:"1234",
      Certificate:"xyz",
      Date:"cse"
    },
    {
      SlNo:"1234",
      Certificate:"xyz",
      Date:"cse"
    },
    {
      SlNo:"1234",
      Certificate:"xyz",
      Date:"cse"
    },
    {
      SlNo:"1234",
      Certificate:"xyz",
      Date:"cse"
    },
    {
      SlNo:"1234",
      Certificate:"xyz",
      Date:"cse"
    },
    {
      SlNo:"1234",
      Certificate:"xyz",
      Date:"cse"
    },
    {
      SlNo:"1234",
      Certificate:"xyz",
      Date:"cse"
    },
    {
      SlNo:"1234",
      Certificate:"xyz",
      Date:"cse"
    }
    
  ]


  const [hostelDataSelected, setHostelDataSelected] = useState(applications)
  const [tabSelected, setTabSelected] = useState(1)
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
  const [selectedHostel, setSelectedHostel] = useState(null)

  const ApplicationList=()=>{
    return (
      // <div className='w-full'>
      <>
        {/* inmates list */}
        <div className='w-11/12 overflow-y-scroll no-scrollbar'>
          <table className='w-full relative table-auto'>
              <tr className='rounded-xl p-3 bg-primary text-center'>
                <th className='p-3'>Sl.No</th>
                <th className='p-3'>Certificate Type</th>
                <th className='p-3'>Date</th>
                <th className='p-3'>Download</th>
              </tr>
              {hostelDataSelected.map((user, index)=>(
                <tr 
                  className={'border-b text-center border-slate-200 border-solid '+(index==selectedRowIndex && selectedHostel==tabSelected ?' bg-blue-300 ':' hover:bg-gray-300')}
                  onClick={()=>{
                    if(selectedRowIndex==index && selectedHostel==tabSelected)
                    {
                      setSelectedRowIndex(-1)
                      setSelectedHostel(null)
                    }
                    else
                    {
                      setSelectedRowIndex(index)
                      setSelectedHostel(tabSelected) //"MH" or "LH"
                    }
                  }}
                >
                  <td className='p-3'>{user.SlNo}</td>
                  <td className='p-3'>{user.Certificate}</td>
                  <td className='p-3'>{user.Date}</td>
                  <td className='p-3'><DownloadIcon className='cursor-pointer'/></td>
                </tr>
              ))}
          </table>
        </div>
      </>
    )
  }


  return (
    <div className='flex flex-col w-full items-center min-h-screen h-full'>
      <div className='flex flex-row justify-between w-11/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Mess</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>user Name</div>
        </div>
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}  className='flex flex-col items-center py-8 space-y-4 w-11/12 mt-8 bg-white rounded-xl admin-dashbord-height'>
        {/* white box nav bar */}
        <div className='flex flex-row justify-between w-11/12 items-center'>
          <div className='flex flex-row tex-black text-sm font-bold relative mb-3'>
              <div
                className='cursor-pointer '
                onClick={()=>{
                  setHostelDataSelected(applications)
                  setTabSelected(1)
                }}
              >
                  <div>Mess Dues </div>
                  <div className={tabSelected===1?'mt-2 h-1 self-center w-12/12 bg-stone-800 rounded-full':''}/>
              </div>
   
          </div>
        </div>
        <MessDuesClear/>
        
      </motion.div>
    </div>
  )
}

export default HostelOfficeMess