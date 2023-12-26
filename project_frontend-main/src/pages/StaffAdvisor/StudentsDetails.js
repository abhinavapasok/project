import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion" 
import axios from 'axios'
function StudentsDetails() {


  const [hostelDataSelected, setHostelDataSelected] = useState([])
  const [tabSelected, setTabSelected] = useState("MH")
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
  const [selectedHostel, setSelectedHostel] = useState(null) //hostel in which a row is selected
  const [selectedRole, setSelectedRole] = useState(null)
  const [selectedInmateRoles, setSelectedInmateRoles] = useState([]) //List of roles of inmate selected to assign role

  const [modalText,setModalText]=useState("")
  const [modalHeading,setModalHeading]=useState("")
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);


  useEffect(() => {
      console.log("first useEffect is called")
      if(tabSelected=="MH" || tabSelected=="LH")
      {
        axios.get('http://localhost:8080/staffadvisor/inmates',{
          params:{hostel: tabSelected}
        })
        .then(function (response) {
            // console.log("success" , response ,"response.data");
            console.log("hostel data is set")
            setHostelDataSelected(response.data)
        })
        .catch(function (error) {
            console.log("FAILED!!! ",error);
        });
      }
      else if(tabSelected=="roles" && hostelDataSelected[selectedRowIndex]!=undefined)
      {
        // getAndSetRoles()
      }
  }, [tabSelected])
  

  const HostelList=()=>{
    console.log("Hostel List is called")
    return (
      // <div className='w-full'>
      <>
        {/* search and filter */}
        <div className='flex flex-row bg-primary rounded-lg w-11/12 items-center p-3 justify-between'>
          {/* search */}
          <div className='flex flex-row items-center bg-white rounded-lg text-sm px-2'>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              placeholder='Search by name or by admission number'
              className='p-2 w-80 outline-none'
            />
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          
          {/* <div className='text-stone-800 font-bold text-sm'>Click on a user row to assign role</div> */}

          {/* filter and export*/}
          <div className='flex flex-row space-x-2 items-center'>
            <div className='py-2 cursor-pointer hover:bg-stone-600 px-3 bg-stone-800 text-white text-sm font-semibold rounded-2xl'>Filter</div>
            <div className='py-2 cursor-pointer hover:bg-stone-600 px-3 bg-stone-800 text-white text-sm font-semibold rounded-2xl'>Export</div>
          </div>
        </div>

        {/* inmates list */}
        <div className='w-11/12 overflow-y-scroll no-scrollbar'>
          <table className='w-full table-auto'>
              <tr className='bg-primary text-left sticky top-0'>
                <th className='py-3'>Admission Number</th>
                <th>Name</th>
                <th>Department</th>
                <th>Batch</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
                {hostelDataSelected.map((user, index)=>(
                  <tr 
                    className={'border-b border-slate-200 border-solid '+(index==selectedRowIndex && selectedHostel==tabSelected ?' bg-blue-300 ':' hover:bg-gray-300')}
                    onClick={()=>{
                      setSelectedInmateRoles([])
                      
                      if(selectedRowIndex==index && selectedHostel==tabSelected)//deselecting the selected row
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
                    <td className='py-3'>{user.admission_no}</td>
                    <td>{user.name}</td>
                    <td>{user.department}</td>
                    <td>{user.batchid}</td>
                    <td>{user.mobile_no}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
          </table>
        </div>
      </>
    )
  }

  return (
    <div className='flex flex-col w-full items-center min-h-screen h-full'>
      
        {/* <AlertDialog open={open1} setOpen={setOpen1} modalHeading={modalHeading} modalText={modalText}/> */}
        {/* <ConfirmDialog open={open2} setOpen={setOpen2} modalHeading={modalHeading} modalText={modalText} confirmFunction={submitForm}/> */}

        <div className='w-full flex justify-center pt-4'>
          <div className='flex flex-row justify-between w-11/12 items-center'>
            <div className='text-xl font-bold'>Inmates</div>
            <div className='flex flex-row space-x-4 items-center'>
                <div className='bg-white border rounded-full w-10 aspect-square'/>
                <div>user Name</div>
            </div>
        </div>
      </div>

      <div className='flex flex-col overflow-hidden items-center py-8 space-y-4 w-11/12 mt-8 bg-white rounded-xl admin-dashbord-height'>
        {/* white box nav bar */}
        <div className='flex flex-row justify-between w-11/12 items-center'>
          <div className='flex flex-row tex-black text-sm font-bold relative'>
              <div
                className='cursor-pointer '
                onClick={()=>{
                  console.log("hostel data is set")
                  setHostelDataSelected([]) //making the list empty before populating it with the inmates list
                  setTabSelected("MH")
                }}
              >
                  <div>Mens Hostel <span className='ml-2 p-2 text-white bg-stone-800 rounded-lg cursor-default'>200</span></div>
                  <div className={tabSelected=="MH"?'h-1 self-center w-8/12 bg-stone-800 rounded-full':''}/>
              </div>

              <div 
                className='ml-5 cursor-pointer'
                onClick={()=>{
                  console.log("hostel data is set")
                  setHostelDataSelected([]) //making the list empty before populating it with the inmates list
                  setTabSelected("LH")
                }}
              >
                <div>Ladies Hostel <span className='ml-2 p-2 text-white bg-stone-800 rounded-lg cursor-default'>200</span></div>
                <div className={tabSelected=="LH"?'h-1 w-8/12 self-center bg-stone-800 rounded-full':''}/>
              </div>

              {/* {selectedRowIndex!=-1&& <motion.div initial={{scale:0.8}} animate={{scale:1}}  
                className={'ml-5 -mt-2 cursor-pointer text-green-600 bg-primary p-3 flex items-center rounded-xl '+(tabSelected=="roles"?' bg-green-600 text-white ':'')}
                onClick={()=>{
                  setTabSelected("roles")
                }}
              > */}
                {/* <div>Assign Role</div> */}
                {/* <div className={tabSelected=="roles"?'mt-2 h-1 w-full self-center bg-stone-800 rounded-full':''}/> */}
              {/* </motion.div>} */}
          </div>

          {tabSelected!="roles"&&<div className='text-sm mb-2'>Showing 1-8 out of 200 results</div>}
        </div>

        {tabSelected!="roles"&&<HostelList />}
      </div>
    </div>
  )
}

export default StudentsDetails