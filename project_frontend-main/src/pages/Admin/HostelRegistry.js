import React, { useState,useEffect,useContext } from 'react'
import {motion} from "framer-motion" 
import { baseUrl } from '../../baseUrl'
import axios from 'axios'
import { UserContext } from '../../Contexts/UserContext'
function HostelRegistry() {

  const {setLoading} = useContext(UserContext)
  useEffect(() => {
    setLoading(true)
    axios.get(`${baseUrl}/warden/hostelregistry`)
    .then(res=>{
      setLoading(true)
      console.log(res.data)
      setInmateData(res.data)
      for(let i=0;i<inmateData.length;i++){
        if(inmateData[i].hostel=="MH"){
          inmateDataMH.push(inmateData[i])
        }
        else{
          inmateDataLH.push(inmateData[i])
        }
    }
    setLoading(false)

    })
  }, [])

  const [inmateData,setInmateData]=useState([])
  var inmateDataMH=[]
  var inmateDataLH=[]

  
  // const inmateDataMH=[
  //   {
  //     hostelAdmNo:"1235",
  //     name:"xyz",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   },
  //   {
  //     hostelAdmNo:"2434",
  //     name:"xyz",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   },
  //   {
  //     hostelAdmNo:"1234",
  //     name:"xyz",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   },
  //   {
  //     hostelAdmNo:"1234",
  //     name:"xyz",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   },
  //   {
  //     hostelAdmNo:"1234",
  //     name:"xyz",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   },
  //   {
  //     hostelAdmNo:"1234",
  //     name:"xyz",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   },
  //   {
  //     hostelAdmNo:"1234",
  //     name:"xyz",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   },
  //   {
  //     hostelAdmNo:"1234",
  //     name:"xyz",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   }
  // ]

  // const inmateDataLH=[
  //   {
  //     hostelAdmNo:"1289",
  //     name:"pqr",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   },
  //   {
  //     hostelAdmNo:"1289",
  //     name:"pqr",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   },
  //   {
  //     hostelAdmNo:"1289",
  //     name:"pqr",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   },
  //   {
  //     hostelAdmNo:"1289",
  //     name:"pqr",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   },
  //   {
  //     hostelAdmNo:"1289",
  //     name:"pqr",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   },
  //   {
  //     hostelAdmNo:"1289",
  //     name:"pqr",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   },
  //   {
  //     hostelAdmNo:"1289",
  //     name:"pqr",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   },
  //   {
  //     hostelAdmNo:"1289",
  //     name:"pqr",
  //     dept:"cse",
  //     phone:"9876857465",
  //     email:"xyz@gmail.com",
  //     from:"01-02-2022",
  //     to:"09-02-2022"
  //   }
  // ]

  const [hostelDataSelected, setHostelDataSelected] = useState(inmateDataMH)
  const [tabSelected, setTabSelected] = useState("MH")
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
  const [selectedHostel, setSelectedHostel] = useState(null)

  const HostelList=()=>{
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

          {/* filter and export*/}
          <div className='flex flex-row space-x-2 items-center'>
            <div className='py-2 cursor-pointer hover:bg-stone-600 px-3 bg-stone-800 text-white text-sm font-semibold rounded-2xl'>Filter</div>
            <div className='py-2 cursor-pointer hover:bg-stone-600 px-3 bg-stone-800 text-white text-sm font-semibold rounded-2xl'>Export</div>
          </div>
        </div>

        {/* inmates list */}
        <div className='w-11/12 overflow-y-scroll no-scrollbar'>
          <table className='w-full table-fixed'>
              <tr className='bg-primary text-left sticky top-0'>
                <th className='py-3'>Hostel Admission Number</th>
                <th>Name</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Email</th>
                <th>From Date</th>
                <th>To Date</th>
              </tr>
                {inmateData.map((user, index)=>{
                  var fdate=new Date(user.fromdate)
                  var tdate=new Date(user.todate)
                  return(
                  <tr 
                    key={index+1}
                    className={'border-b border-slate-200 border-solid hover:bg-gray-300'}
                  >
                    <td className='break-all py-3'>{user.hostel_admission_no}</td>
                    <td className='break-all'>{user.name}</td>
                    <td className='break-all'>{user.department}</td>
                    <td className='break-all'>{user.mobile_no}</td>
                    <td className='break-all'>{user.email}</td>
                    <td className='break-all'>{fdate.getDate()+'/'+fdate.getMonth()+'/'+fdate.getFullYear()}</td>
                    <td className='break-all'>{tdate.getDate()+'/'+tdate.getMonth()+'/'+tdate.getFullYear()}</td>
                  </tr>
                )})}
          </table>
        </div>
      </>
    )
  }

  return (
    <div className='flex flex-col w-full items-center min-h-screen h-full'>
      <div className='flex flex-row justify-between w-11/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Hostel Registry</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>user Name</div>
        </div>
      </div>

      <div className='flex flex-col items-center py-8 space-y-4 w-11/12 mt-8 bg-white rounded-xl admin-dashbord-height'>
        {/* white box nav bar */}
        <div className='flex flex-row justify-between w-11/12 items-center'>
          <div className='flex flex-row tex-black text-sm font-bold relative'>
              <div
                className='cursor-pointer '
                onClick={()=>{
                  setHostelDataSelected(inmateDataMH)
                  setTabSelected("MH")
                }}
              >
                  {/* <div>Mens Hostel <span className='ml-2 p-2 text-white bg-stone-800 rounded-lg cursor-default'>200</span></div> */}
                  <div>Mens Hostel</div>
                  <div className={tabSelected=="MH"?'h-1 self-center w-12/12 bg-stone-800 rounded-full':''}/>
              </div>

              <div 
                className='ml-5 cursor-pointer'
                onClick={()=>{
                  setHostelDataSelected(inmateDataLH)
                  setTabSelected("LH")
                }}
              >
                {/* <div>Ladies Hostel <span className='ml-2 p-2 text-white bg-stone-800 rounded-lg cursor-default'>200</span></div> */}
                <div>Ladies Hostel</div>
                <div className={tabSelected=="LH"?'h-1 w-12/12 self-center bg-stone-800 rounded-full':''}/>
              </div>
          </div>

          {/* <div className='text-sm mb-2'>Showing 1-8 out of 200 results</div> */}
        </div>

        <HostelList />
      </div>
    </div>
  )
}

export default HostelRegistry