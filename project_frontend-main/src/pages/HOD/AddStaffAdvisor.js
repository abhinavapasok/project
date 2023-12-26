import React, { useContext, useEffect, useState } from 'react'
import {motion} from "framer-motion" 
import optimizedSearch from '../../components/Search'
import { UserContext } from '../../Contexts/UserContext'
import axios from 'axios'

function AddStaffAdvisor() {
  const dummyData=[
    {
      penNo:"1234",
      name:"Jones Klein Lopez",
      phone:"9876857465",
      email:"xyz@gmail.com"
    },
    {
      penNo:"1234",
      name:"xyz",
      phone:"9876857465",
      email:"xyz@gmail.com"
    },
    {
      penNo:"1234",
      name:"xyz",
      phone:"9876857465",
      email:"xyz@gmail.com"
    },
    {
      penNo:"1234",
      name:"xyz",
      phone:"9876857465",
      email:"xyz@gmail.com"
    },
    {
      penNo:"1234",
      name:"xyz",
      phone:"9876857465",
      email:"xyz@gmail.com"
    },
    {
      penNo:"1234",
      name:"xyz",
      phone:"9876857465",
      email:"xyz@gmail.com"
    },
    {
      penNo:"1234",
      name:"xyz",
      phone:"9876857465",
      email:"xyz@gmail.com"
    },
    {
      penNo:"1234",
      name:"xyz",
      phone:"9876857465",
      email:"xyz@gmail.com"
    }
  ]
  
  const [facultyOriginal, setFacultyOriginal] = useState([])
  const [faculty, setFaculty] = useState([])
  const [tabSelected, setTabSelected] = useState("MH")
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
  const [role, setRole] = useState(null)
  const [selectedFacultyRoles, setSelectedFacultyRoles] = useState([])

  const [dept, setDept] = useState("")
  
  const [searchText, setSearchText] = useState("")
  const [filter, setFilter] = useState([])
  
  const {user, setLoading} =useContext(UserContext)

  useEffect(() => {
    console.log("Hod user : ",user)
    axios.get('http://localhost:8080/hod/getHodDept',{
      params:{
        hodPenNo: user.user_id
      }
    }).then((response)=>{
      console.log("ress : ",response.data)
      setDept(response.data.department)
    })
    axios.get('http://localhost:8080/hod/faculties')
    .then(function (response) {
        console.log("success" , response ,"response.data");
        setFacultyOriginal(response.data.map(item=>({...item})))
        setFaculty(optimizedSearch(
          {
            searchText:searchText, 
            originalData:response.data.map(item=>({...item})), 
            filters:filter
          }))
    })
    .catch(function (error) {
        console.log("FAILED!!! ",error);
    });
  }, [tabSelected])

  useEffect(() => {
    setFaculty(optimizedSearch({
      searchText:searchText, 
      originalData:facultyOriginal, 
      filters:filter
    }))
  }, [filter])

  const [program, setProgram]=useState("")
  const [sem, setSem]=useState("")
  const [course, setCourse] = useState("")
  const [year, setYear] = useState(2000)
  const [batchName, setBatchName]=useState("")


  const getAndSetRoles=()=>{
    console.log("called firko",dept)
    axios.get('http://localhost:8080/hod/faculty/getRoles',{
      params:{
        advPenNo: faculty[selectedRowIndex].pen_no,
        dept:dept
      }
    })
    .then(function (response) {
        console.log("faculty roles is set" ,response.data)
        setSelectedFacultyRoles([...response.data])
        setLoading(false)
    })
    .catch(function (error) {
        console.log("FAILED!!! ",error);
    });
  }

  
  const postRole=()=>{

    setLoading(true)

    axios.post('http://localhost:8080/hod/faculty/postRole',{
      penNo:faculty[selectedRowIndex].pen_no,
      program:program,
      dept:dept,
      sem:sem,
      course: course,
      year: year,
      batchName:batchName
    })
    .then(function (response) {
        getAndSetRoles()
    })
    .catch(function (error) {
        console.log("FAILED!!! ",error);
    });
  }

  const deleteRole=(roleItem)=>{

    setLoading(true)

    console.log("delete role is called")
    axios.get('http://localhost:8080/hod/faculty/removeRole',{
      params:{
        penNo:faculty[selectedRowIndex].pen_no,
        role:roleItem
      }
    })
    .then(function (response) {
        console.log("success" , response ,"response.data");
        //setting the new roles
        getAndSetRoles();
    })
    .catch(function (error) {
        console.log("FAILED!!! ",error);
    });
  }

  useEffect(() => {
    if(tabSelected=="roles")
    {
      // setLoading(true)
      getAndSetRoles()
    }
  }, [tabSelected])

  const FacultyList=()=>{
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
                    setFaculty(optimizedSearch(
                    {
                      searchText:e.target.value, 
                      originalData:facultyOriginal, 
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
              {facultyOriginal[0]&&(
              <select 
                onChange={e=>{setFilter(f=>[...f,e.target.value])}}
                className='p-2 w-40 outline-none ring-slate-200 ring-2 rounded-xl'
              >
                <option>-- select --</option>
                {Object.keys(facultyOriginal[0]).
                              filter(item=>(
                                  item!="password"&&
                                  item!="designation"&&
                                  item!="is_admin"&&
                                  item!="stage")).map(item=>(<option>{item}</option>))}
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

        {/* Faculty list */}
        <div className='w-11/12 overflow-y-auto no-scrollbar'>
          <table className='w-full table-auto'>
              <tr className='bg-primary text-left sticky top-0'>
                <th className='py-3'>PEN Number</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
                {faculty.map((user, index)=>(
                  <tr 
                    className={'border-b border-slate-200 border-solid '+(index==selectedRowIndex?' bg-blue-300 ':' hover:bg-gray-300')}
                    onClick={()=>{
                      if(selectedRowIndex==index)
                      {
                        setSelectedRowIndex(-1)
                      }
                      else
                      {
                        setSelectedRowIndex(index)
                      }
                    }}
                  >
                    <td className='py-3'>{user.user_id}</td>
                    <td className='py-3'>{user.name}</td>
                    <td className='py-3'>{user.mobile_no}</td>
                    <td className='py-3'>{user.email}</td>
                  </tr>
                ))}
          </table>
        </div>
      </>
    )
  }

  const AssignRole=()=>{
    return (  
      <div className='flex flex-col w-11/12 overflow-y-auto'>
          <div className='text-stone-800 font-bold text-lg'>Faculty - {faculty[selectedRowIndex].name}</div>
          
          <div className='flex flex-col bg-primary p-8 rounded-xl'>
            <div className='flex flex-row w-full space-x-3 '>
              <div className='grid grid-cols-2 gap-4 w-1/2'>
                <div className='text-stone-800 font-bold'>Name</div>
                <div> 
                  <span className='text-stone-800 font-bold mr-3'>:</span>
                  {faculty[selectedRowIndex].name}
                </div>

                <div className='text-stone-800 font-bold'>PEN No</div>
                <div> 
                  <span className='text-stone-800 font-bold mr-3'>:</span>
                  {faculty[selectedRowIndex].pen_no}
                </div>
                
              </div>

              <div className='grid grid-cols-2 gap-4 bg-primary w-1/2'>
                
                <div className='text-stone-800 font-bold'>Phone</div>
                <div> 
                  <span className='text-stone-800 font-bold mr-3'>:</span>
                  {faculty[selectedRowIndex].phone}
                </div>
                
                <div className='text-stone-800 font-bold'>Email</div>
                <div> 
                  <span className='text-stone-800 font-bold mr-3'>:</span>
                  {faculty[selectedRowIndex].email}
                </div>
              </div>
            </div>

            <div className='w-full flex flex-row items-center mt-4'>
              <div className='text-stone-800 font-bold'>Roles</div> 
                <span className='text-stone-800 font-bold mr-3 flex flex-row'>:</span>
                {selectedFacultyRoles.map((item, index)=>item.role=="SA"&&(
                  <div key={index} className='flex flex-row w-fit justify-between items-center mr-2 py-2 px-3 bg-stone-800 text-white text-sm font-medium rounded-full space-x-2'>
                    <div>{item.role}</div>
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

          <div className='flex flex-wrap'>
            <div className=''>
              <div className='mr-5 mt-5 mb-1 text-stone-800 text-md font-semibold'>Select Programme</div>
                <select 
                  className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'
                  onChange={e=>{setProgram(e.target.value)}}
                >
                  <option value={null}>NIL</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.Arch">B.Arch</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="PhD">PhD</option>
                </select>
            </div>

            {/* <div className='mr-5'>
              <div className='mt-5 mb-1 text-stone-800 text-md font-semibold'>Select Department</div>
                <select 
                  className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'
                  onChange={e=>{setDept(e.target.value)}}
                >
                  <option value={null}>-- select --</option>
                  <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                  <option value="Civil Enginering">Civil Enginering</option>
                  <option value="Applied Electronics and Instrumentation Engineering">Applied Electronics and Instrumentation Engineering</option>
                  <option value="Electronics Engineering">Electronics Engineering</option>
                  <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Industrial Engineering">Industrial Engineering</option>
                  <option value="Architecture">Architecture</option>
                </select>
            </div> */}

            <div className='mr-5'>
              <div className='mt-5 mb-1 text-stone-800 text-md font-semibold'>Select Course</div>
                <select 
                  className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'
                  onChange={e=>{setCourse(e.target.value)}}
                >
                  <option value={null}>-- select --</option>
                  <option value="ug">ug</option>
                  <option value="pg">pg</option>
                </select>
            </div>

            <div className='mr-5'>
              <div className='mt-5 mb-1 text-stone-800 text-md font-semibold'>Select Semester</div>
                <select 
                  className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'
                  onChange={e=>{setSem(e.target.value)}}
                >
                  <option value={null}>NIL</option>
                  <option value="s1">s1</option>
                  <option value="s2">s2</option>
                  <option value="s3">s3</option>
                  <option value="s4">s4</option>
                  <option value="s5">s5</option>
                  <option value="s6">s6</option>
                  <option value="s7">s7</option>
                  <option value="s8">s8</option>
                  {dept=="Architecture"&&(<><option value="s9">s9</option>
                  <option value="s10">s10</option></>)}
                </select>
            </div>

            <div className='mr-5'>
              <div className='mt-5 mb-1 text-stone-800 text-md font-semibold'>Select Batch</div>
                <select 
                  className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'
                  onChange={e=>{setBatchName(e.target.value)}}
                >
                  <option value={null}>NIL</option>
                  <option value="A">A</option>
                  <option value="B">B</option>      
                </select>
            </div>

            <div className='mr-5'>
              <div className='mt-5 mb-1 text-stone-800 text-md font-semibold'>Enter Year</div>
                <input
                  type="number"
                  min={2000}
                  className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'
                  onChange={e=>{setYear(e.target.value)}}
                />
            </div>

          </div>

          <button 
            className='mt-5 rounded-xl p-2 bg-green-500 w-2/12 text-white font-bold hover:bg-green-700'
            onClick={postRole}
          >
              Update
          </button>
          
        </div>
    )
  }

  const AssignR2=()=>{
    return (  
      <div className='flex flex-col w-11/12 '>
          <div className='text-stone-800 font-bold text-lg'>Faculty - {faculty[selectedRowIndex].name}</div>
          
          <div className='flex flex-row space-x-3 bg-primary p-8 rounded-xl'>
            <div className='grid grid-cols-2 gap-4 w-1/2'>
              <div className='text-stone-800 font-bold'>Name</div>
              <div> 
                <span className='text-stone-800 font-bold mr-3'>:</span>
                {faculty[selectedRowIndex].name}
              </div>

              <div className='text-stone-800 font-bold'>PEN No</div>
              <div> 
                <span className='text-stone-800 font-bold mr-3'>:</span>
                {faculty[selectedRowIndex].penNo}
              </div>
              
            </div>

            <div className='grid grid-cols-2 gap-4 bg-primary w-1/2'>
              
              <div className='text-stone-800 font-bold'>Phone</div>
              <div> 
                <span className='text-stone-800 font-bold mr-3'>:</span>
                {faculty[selectedRowIndex].phone}
              </div>
              
              <div className='text-stone-800 font-bold'>Email</div>
              <div> 
                <span className='text-stone-800 font-bold mr-3'>:</span>
                {faculty[selectedRowIndex].email}
              </div>
            </div>
          </div>

         <div className='flex flex-row'>
          <div className=''>
            <div className='mt-5 mb-1 text-stone-800 text-md font-semibold'>Select Programme</div>
              <select className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'>
                <option value={null}>NIL</option>
                <option value="sa">B.Tech</option>
                <option value="sa">M.Tech</option>
                <option value="sa">PhD</option>
              </select>
          </div>
          <div className='ml-5'>
            <div className='mt-5 mb-1 text-stone-800 text-md font-semibold'>Select Year</div>
              <select className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'>
                <option value={null}>NIL</option>
                <option value="sa">1</option>
                <option value="sa">2</option>
                <option value="sa">3</option>
                <option value="sa">4</option>
              </select>
          </div>
          <div className='ml-5'>
            <div className='mt-5 mb-1 text-stone-800 text-md font-semibold'>Select Batch</div>
              <select className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'>
                <option value={null}>NIL</option>
                <option value="sa">A</option>
                <option value="sa">B</option>
                
              </select>
          </div>
          </div>
          
          
       
          

          <button className='mt-5 rounded-xl p-2 bg-green-500 w-2/12 text-white font-bold hover:bg-green-700'>Add as advisor</button>
          
        </div>
    )
  }

  return (
    <div className='flex flex-col w-full items-center min-h-screen'>
      <div className='flex flex-row justify-between w-11/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Faculty</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>user Name</div>
        </div>
      </div>

      <div className='flex flex-col items-center py-8 space-y-4 w-11/12 mt-8 bg-white rounded-xl overflow-hidden admin-dashbord-height'>
        {/* white box nav bar */}
        <div className='flex flex-row justify-between w-11/12 items-center'>
          <div className='flex flex-row tex-black text-sm font-bold relative'>
              <div
                className='cursor-pointer '
                onClick={()=>{
                  setTabSelected("faculty")
                }}
              >
                  <div>Faculty <span className='ml-2 p-2 text-white bg-stone-800 rounded-lg cursor-default'>20</span></div>
                  <div className={tabSelected=="faculty"?'h-1 self-center w-6/12 bg-stone-800 rounded-full':''}/>
              </div>

              {selectedRowIndex!=-1&& <motion.div initial={{scale:0.8}} animate={{scale:1}}  
                className={'ml-5 -mt-2 cursor-pointer text-green-600 bg-primary p-2 flex items-center rounded-xl '+(tabSelected=="roles"?' bg-green-600 text-white ':'')}
                onClick={()=>{
                  setTabSelected("roles")
                }}
              >
                <div>Show Details</div>
                {/* <div className={tabSelected=="roles"?'mt-2 h-1 w-full self-center bg-stone-800 rounded-full':''}/> */}
              </motion.div>}
          </div>

          {/* <div className='text-sm mb-2'>Showing 1-8 out of 200 results</div> */}
        </div>

        {tabSelected!="roles"&&FacultyList()}
        {tabSelected=="roles"&&AssignRole()}
      </div>
    </div>
  )
}

export default AddStaffAdvisor