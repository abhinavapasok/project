import React, { useEffect, useRef, useState } from 'react'
import {motion} from "framer-motion" 
import axios from 'axios'
import AlertDialog from '../../components/AlertDialog'
import ConfirmDialog from '../../components/ConfirmDialog'
import optimizedSearch from '../../components/Search'
import { baseUrl } from '../../baseUrl'

function AdminInmates() {
  
  const [hostelDataSelectedOriginal, setHostelDataSelectedOriginal] = useState([]) //All data from which data for display will be filtered
  const [hostelDataSelected, setHostelDataSelected] = useState([]) //display data
  const [tabSelected, setTabSelected] = useState("MH")
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
  const [selectedHostel, setSelectedHostel] = useState(null) //hostel in which a row is selected
  const [selectedRole, setSelectedRole] = useState(null)
  const [selectedInmateRoles, setSelectedInmateRoles] = useState([]) //List of roles of inmate selected to assign role

  const [modalText,setModalText]=useState("")
  const [modalHeading,setModalHeading]=useState("")
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [searchText, setSearchText] = useState("")
  const [filter, setFilter] = useState([])

  const getAndSetRoles=()=>{
    axios.get('http://localhost:8080/admin/inmates/getRoles',{
      params:{
        hostelAdmNo: hostelDataSelected[selectedRowIndex].hostel_admission_no,
      }
    })
    .then(function (response) {
        console.log("Inmate roles is set" ,response.data)
        setSelectedInmateRoles([...response.data])
    })
    .catch(function (error) {
        console.log("FAILED!!! ",error);
    });
  }

  useEffect(() => {
      console.log("first useEffect is called")
      if(tabSelected=="MH" || tabSelected=="LH")
      {
        axios.get(`${baseUrl}/admin/inmates`,{
          params:{hostel: tabSelected}
        })
        .then(function (response) {
            // console.log("success" , response ,"response.data");
            console.log("hostel data is set")
            setHostelDataSelectedOriginal(response.data.map(item=>({...item}))) //object inside array may not be deep copied
            setHostelDataSelected(optimizedSearch(
              {
                searchText:searchText, 
                originalData:response.data.map(item=>({...item})), 
                filters:filter
              }))
        })
        .catch(function (error) {
            console.log("FAILED!!! ",error);
        });
      }
      else if(tabSelected=="roles" && hostelDataSelected[selectedRowIndex]!=undefined)
      {
        getAndSetRoles()
      }
  }, [tabSelected])

  useEffect(() => {
    setHostelDataSelected(optimizedSearch({
      searchText:searchText, 
      originalData:hostelDataSelectedOriginal, 
      filters:filter
    }))
  }, [filter])
  

  const HostelList=()=>{
    console.log("Hostel List is called")
    return (
      // <div className='w-full'>
      <>
        {/* search and filter */}
        <div className='flex flex-col w-11/12 bg-primary rounded-lg '>
          <div className='flex flex-row w-full w-full items-center p-3 justify-between'>
            {/* search */}
            <div className='flex flex-row items-center bg-white rounded-lg text-sm px-2'>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                placeholder='Search by name or by admission number'
                type="text"
                className='p-2 w-80 outline-none'
                value={searchText}
    
                onChange={(e)=>{
                  setSearchText(e.target.value)
                  setHostelDataSelected(optimizedSearch(
                  {
                    searchText:e.target.value, 
                    originalData:hostelDataSelectedOriginal, 
                    filters:filter
                  }))
                }}
              />
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            
            <div className='text-stone-800 font-bold text-sm'>Click on a user row to assign role</div>

            {/* filter and export*/}
            <div className='flex flex-row space-x-2 items-center'>
              <div className='font-bold text-base text-stone-800'>Filter </div>
              {hostelDataSelectedOriginal[0]&&(
              <select 
                onChange={e=>{setFilter(f=>[...f,e.target.value])}}
                className='p-2 w-40 outline-none ring-slate-200 ring-2 rounded-xl'
              >
                <option>-- select --</option>
                {Object.keys(hostelDataSelectedOriginal[0]).
                              filter(item=>(
                                  item!="password"&&
                                  item!="designation"&&
                                  item!="is_admin"&&
                                  item!="stage"&&
                                  item!="current_inmates"&&
                                  item!="maximum_inmates"&&
                                  item!="user_type"&&
                                  item!="floor_no"&&
                                  item!="room_id"&&
                                  item!="block_id"&&
                                  item!="hostel")).map(item=>(<option>{item}</option>))}
              </select>)}
              {/* <div className='py-2 cursor-pointer hover:bg-stone-600 px-3 bg-stone-800 text-white text-sm font-semibold rounded-2xl'>Filter</div> */}
              {/* <div className='py-2 cursor-pointer hover:bg-stone-600 px-3 bg-stone-800 text-white text-sm font-semibold rounded-2xl'>Export</div> */}
            </div>
          </div>

          {filter.length>0&&(<div className='w-full px-3 py-2 flex flex-wrap space-x-1'>
            {filter.map((item, index)=>(
              <div key={index} className='flex flex-row w-fit justify-between items-center py-2 px-3 bg-stone-800 text-white text-sm font-medium rounded-full'>
                <div>{item}</div>
                {/* remove button */}
                <div
                    className='ml-2 text-white cursor-pointer rounded-full hover:text-red-600'
                    onClick={()=>{
                        var newFilter=[...filter]
                        newFilter.splice(index,1)

                        setFilter([...newFilter])
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
              </div>
            ))}
          </div>)}
        </div>


        {/* inmates list */}
        <div className='w-11/12 overflow-y-scroll no-scrollbar'>
          <table className='w-full table-auto'>
              <tr className='bg-primary text-left sticky top-0'>
                <th className='py-3'>Admission Number</th>
                <th>Name</th>
                <th>Course</th>
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
                    <td>{user.course}</td>
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

  const updateRole=()=>{
    console.log("update role is called")
    axios.post('http://localhost:8080/admin/inmates/updateRole',{
      hostelAdmNo: hostelDataSelected[selectedRowIndex].hostel_admission_no,
      role:selectedRole
    })
    .then(function (response) {
        console.log("success" , response ,"response.data");
        
        //setting the new roles
        getAndSetRoles();

        setModalText("Successfully Updated !")
        setOpen1(true)
    })
    .catch(function (error) {
        console.log("FAILED!!! ",error);
    });
  }

  const deleteRole=(role)=>{
    console.log("delete role is called")
    axios.get('http://localhost:8080/admin/inmates/removeRole',{
      params:{
        hostelAdmNo: hostelDataSelected[selectedRowIndex].hostel_admission_no,
        role:role
      }
    })
    .then(function (response) {
        console.log("success" , response ,"response.data");
        
        //setting the new roles
        getAndSetRoles();

        setModalText("Successfully removed !")
        setOpen1(true)
    })
    .catch(function (error) {
        console.log("FAILED!!! ",error);
    });
  }
  

  const AssignRole=()=>{
    console.log("Assign role is called")
    
    return (  
      <div className='flex flex-col w-11/12 overflow-y-auto'>
          {/* <div className='text-stone-800 font-bold text-lg'>Inmate - {selectedHostel}</div> */}
          
          <div className='flex flex-col bg-primary p-8 rounded-xl'>
            <div className='w-full flex flex-row'>
              <div className='grid grid-cols-2 gap-4 w-1/2'>
                <div className='text-stone-800 font-bold'>Name</div>
                <div> 
                  <span className='text-stone-800 font-bold mr-3'>:</span>
                  {hostelDataSelected[selectedRowIndex]&&hostelDataSelected[selectedRowIndex].name}
                </div>

                <div className='text-stone-800 font-bold'>Admission No</div>
                <div> 
                  <span className='text-stone-800 font-bold mr-3'>:</span>
                  {hostelDataSelected[selectedRowIndex]&&hostelDataSelected[selectedRowIndex].admission_no}
                </div>
                
                <div className='text-stone-800 font-bold'>Department</div>
                <div> 
                  <span className='text-stone-800 font-bold mr-3'>:</span>
                  {hostelDataSelected[selectedRowIndex]&&hostelDataSelected[selectedRowIndex].department}
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 bg-primary w-1/2'>
                <div className='text-stone-800 font-bold'>Batch</div>
                <div> 
                  <span className='text-stone-800 font-bold mr-3'>:</span>
                  {hostelDataSelected[selectedRowIndex]&&hostelDataSelected[selectedRowIndex].batchid}
                </div>
                
                <div className='text-stone-800 font-bold'>Phone</div>
                <div> 
                  <span className='text-stone-800 font-bold mr-3'>:</span>
                  {hostelDataSelected[selectedRowIndex]&&hostelDataSelected[selectedRowIndex].mobile_no}
                </div>
                
                <div className='text-stone-800 font-bold'>Email</div>
                <div> 
                  <span className='text-stone-800 font-bold mr-3'>:</span>
                  {hostelDataSelected[selectedRowIndex]&&hostelDataSelected[selectedRowIndex].email}
                </div>
              </div>
            </div>

            <div className='w-full flex flex-row items-center mt-4'>
              <div className='text-stone-800 font-bold'>Roles</div> 
                <span className='text-stone-800 font-bold mr-3 flex flex-row'>:</span>
                {selectedInmateRoles.map((item, index)=>(
                  <div key={index} className='flex flex-row w-fit justify-between items-center mr-2 py-2 px-3 bg-stone-800 text-white text-sm font-medium rounded-full space-x-2'>
                    <div>{item}</div>
                    <div
                        className='ml-2 text-white cursor-pointer rounded-full hover:text-red-600'
                        onClick={()=>{
                          deleteRole(item)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                  </div>
                ))}
            </div>

          </div>


          <div className='mt-5 mb-1 text-stone-800 text-md font-semibold'>Select Role</div>
          <select 
            value={selectedRole}
            onChange={(e)=>{setSelectedRole(e.target.value)}}
            className='p-3 ring-slate-200 ring-2 rounded-xl w-1/4 outline-none'
          >
            <option value={null}>NIL</option>
            <option value="md">Mess Director</option>
            <option value="ms">Mess Secretary</option>
          </select>

          <button 
            className='mt-5 rounded-xl p-2 bg-green-500 w-2/12 text-white font-bold hover:bg-green-700'
            onClick={updateRole}
          >
              Update
            </button>
          
        </div>
    )
  }

  return (
    <div className='flex flex-col w-full items-center min-h-screen h-full'>
      
        <AlertDialog open={open1} setOpen={setOpen1} modalHeading={modalHeading} modalText={modalText}/>
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

      {/* <input 
              // placeholder='Search by name or by admission number'
              type="text"
              className='p-2 w-80 outline-none'
              value={searchText}
              onChange={e=>{setSearchText(e.target.value)}}
  
              // onChange={(e)=>{
              //   setSearchText(e.target.value)
              //   setHostelDataSelected(optimizedSearch(
              //   {
              //     searchText:e.target.value, 
              //     originalData:hostelDataSelectedOriginal, 
              //     filters:[]
              //   }))
              // }}
            /> */}
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
                  {/* <div>Mens Hostel <span className='ml-2 p-2 text-white bg-stone-800 rounded-lg cursor-default'></span></div> */}
                  <div>Mens Hostel</div>
                  <div className={tabSelected=="MH"?'h-1 self-center w-12/12 bg-stone-800 rounded-full':''}/>
              </div>

              <div 
                className='ml-5 cursor-pointer'
                onClick={()=>{
                  console.log("hostel data is set")
                  setHostelDataSelected([]) //making the list empty before populating it with the inmates list
                  setTabSelected("LH")
                }}
              >
                {/* <div>Ladies Hostel <span className='ml-2 p-2 text-white bg-stone-800 rounded-lg cursor-default'>{hostelDataSelectedOriginal.length}</span></div> */}
                <div>Ladies Hostel</div>
                <div className={tabSelected=="LH"?'h-1 w-12/12 self-center bg-stone-800 rounded-full':''}/>
              </div>

              {selectedRowIndex!=-1&& <motion.div initial={{scale:0.8}} animate={{scale:1}}  
                className={'ml-5 -mt-2 cursor-pointer text-green-600 bg-primary p-3 flex items-center rounded-xl '+(tabSelected=="roles"?' bg-green-600 text-white ':'')}
                onClick={()=>{
                  setTabSelected("roles")
                }}
              >
                <div>Assign Role</div>
                {/* <div className={tabSelected=="roles"?'mt-2 h-1 w-full self-center bg-stone-800 rounded-full':''}/> */}
              </motion.div>}
          </div>

          {tabSelected!="roles"&&<div className='text-sm mb-2'>Showing 1-8 out of 200 results</div>}
        </div>

        {tabSelected!="roles"&&HostelList()}
        {tabSelected=="roles"&&AssignRole()}
      </div>
    </div>
  )
}

export default AdminInmates