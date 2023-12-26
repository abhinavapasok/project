import React, { useState,useEffect, useContext } from 'react'
import RankList from '../../components/RankList'
import {motion} from 'framer-motion'
import DoneIcon from '@mui/icons-material/Done';
import MessExpenseList from '../Sergeant/MessExpenseList';
import axios from 'axios';
import { UserContext } from '../../Contexts/UserContext';
import { baseUrl } from '../../baseUrl';
import SupplierList from '../../components/Supplierlist';
function AdmissionHostelOffice() {
  const [modal, setModal] = useState(null) //modal showing columns

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
  const backdropClickHandler = (event) => {
    if (event.target === event.currentTarget) {
        setModal(null)
    }
  }

  useEffect(() => {
    if(modal!=null)
      RenderModal()
  }, [])


  const RenderModal=(item)=>{
    setModal(
        <div onClick={backdropClickHandler} className="bg-slate-500/[.8] z-20 fixed inset-0 flex justify-center items-center">
          <div className='flex flex-col bg-white rounded-2xl w-6/12 h-3/4 p-3 relative overflow-hidden'>

            <div
                      // className='absolute top-1 right-1 flex justify-center items-center bg-red-500 aspect-square w-7 h-7 cursor-pointer text-center text-xs font-bold text-white rounded-full hover:bg-red-700'
                      className='absolute top-1 right-1 cursor-pointer text-red-500 cursor-pointer rounded-full hover:text-red-700'
                      onClick={()=>{
                          setModal(null)
                      }}
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                  </div>
                  <div className='ml-5 mt-5'>
                    <h1 className='font-semibold text-lg text-black'>Steven Grant</h1>
                    <h1 className='font-semibold text-md text-black'>S1 CSE</h1>
                    <div className='grid grid-cols-2 mt-2'>
                      <h2>Admission Criteria :</h2>
                      <h2>KEAM</h2>
                      <h2>Year of Admission :</h2>
                      <h2>2022</h2>
                      <h2>Qualifying Exam :</h2>
                      <h2>KEAM</h2>
                      <h2>Qualifying Exam Rank :</h2>
                      <h2>944</h2>
                      <h2>Admission Number :</h2>
                      <h2>180287</h2>
                      <h2>University Number :</h2>
                      <h2>TVE22CS042</h2>
                      <h2>Date of Birth :</h2>
                      <h2>21/04/2002</h2>
                      <h2>Category :</h2>
                      <h2>OBC</h2>
                      <h2>Religion :</h2>
                      <h2>Hindu</h2>
                      <h2>BPL :</h2>
                      <h2>No</h2>
                      <h2>Eligible for Fee Concession :</h2>
                      <h2>Yes</h2>
                      <h2>Annual Income :</h2>
                      <h2>180000</h2>
                      <h2>Residential Address :</h2>
                      <h2>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Kochi-560016</h2>
                      <h2>Parent Name :</h2>
                      <h2>Marc Spector</h2>
                      <h2>Parent Address :</h2>
                      <h2>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Kochi-560016</h2>
                    </div>
                  </div>
                  
                  
              </div>
          </div>
      )

  }

  const ranks=[
    {
      SlNo:1,
      Name:"Marc",
      AdmissionNo:180245,
      Income:10000,
      ExamRank:510,
      Branch:"CSE",
      Rank:1
    },
    {
      SlNo:2,
      Name:"Steven",
      AdmissionNo:180287,
      Income:100000,
      ExamRank:610,
      Branch:"CSE",
      Rank:2
    },
    {
      SlNo:3,
      Name:"Jake",
      AdmissionNo:180201,
      Income:100000,
      ExamRank:710,
      Branch:"CSE",
      Rank:3
    },
    {
      SlNo:4,
      Name:"Jake",
      AdmissionNo:180201,
      Income:100000,
      ExamRank:710,
      Branch:"CSE",
      Rank:4
    },
    {
      SlNo:5,
      Name:"Jake",
      AdmissionNo:180201,
      Income:100000,
      ExamRank:710,
      Branch:"CSE",
      Rank:5
    },
    {
      SlNo:6,
      Name:"Jake",
      AdmissionNo:180201,
      Income:100000,
      ExamRank:710,
      Branch:"CSE",
      Rank:6
    }
    
    
]
  
  const applications=[
    {
      SlNo:1,
      Name:"Steven",
      AdmNo:"1505",
      Branch:"CSE"
    },
    {
      SlNo:2,
      Name:"Steven",
      AdmNo:"1505",
      Branch:"CSE"
    },
    {
      SlNo:3,
      Name:"Steven",
      AdmNo:"1505",
      Branch:"CSE"
    },
    {
      SlNo:4,
      Name:"Steven",
      AdmNo:"1505",
      Branch:"CSE"
    },
    {
      SlNo:5,
      Name:"Steven",
      AdmNo:"1505",
      Branch:"CSE"
    },
    {
      SlNo:6,
      Name:"Steven",
      AdmNo:"1505",
      Branch:"CSE"
    },

  ]
  const [hostel,setHostel]=useState("MH");
  const [tabSelected, setTabSelected] = useState(3)
  const [users,setUsers]=useState(applications)
  return (
    <div className='flex flex-col w-full items-center min-h-screen h-full overflow-y-scroll'>
      {modal&&modal}
      <div className='flex flex-row justify-between w-11/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Hostel Admission</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>user Name</div>
        </div>
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}  className='flex flex-col items-center py-8 space-y-4 w-11/12 mt-8 bg-white rounded-xl'>
      <div className='flex flex-row justify-between w-11/12 items-center'>
          <div className='flex flex-row text-black text-sm font-bold relative mb-3'>
              {/* <div
                className='cursor-pointer '
                onClick={()=>{
                  setTabSelected(1)
                }}
              >
                  <div>Current Rank List </div>
                  <div className={tabSelected===1?'mt-2 h-1 self-center w-12/12 bg-stone-800 rounded-full':''}/>
              </div> */}

              {/* <div
                className='ml-5 cursor-pointer '
                onClick={()=>{
                  setTabSelected(2)
                }}
              >
                  <div>Waiting List </div>
                  <div className={tabSelected===2?'mt-2 h-1 self-center w-12/12 bg-stone-800 rounded-full':''}/>
              </div> */}
              <div
                className='ml-5 cursor-pointer '
                onClick={()=>{
                  setTabSelected(3)
                }}
              >
                  <div>Mess Expense </div>
                  <div className={tabSelected===3?'mt-2 h-1 self-center w-12/12 bg-stone-800 rounded-full':''}/>
              </div>
           
              <div
                className='ml-5 cursor-pointer '
                onClick={()=>{
                  setTabSelected(4)
                }}
              >
                  <div>Supplier List </div>
                  <div className={tabSelected===4?'mt-2 h-1 self-center w-12/12 bg-stone-800 rounded-full':''}/>
              </div>

              <div
                className='ml-5 cursor-pointer '
                onClick={()=>{
                  setTabSelected(5)
                }}
              >
                  <div>Payment to process</div>
                  <div className={tabSelected===5?'mt-2 h-1 self-center w-12/12 bg-stone-800 rounded-full':''}/>
              </div>
              <div>
              
              </div>

              {/* <div
                className='ml-5 cursor-pointer '
                onClick={()=>{
                  setTabSelected(3)
                }}
              >
                  <div>Received Applications </div>
                  <div className={tabSelected===3?'mt-2 h-1 self-center w-12/12 bg-stone-800 rounded-full':''}/>
              </div> */}

          </div>
          </div>
          {/* <div className='flex items-center justify-start w-11/12'>
          <select onChange={(e)=>{setHostel(e.target.value)}}  className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'>
                <option value="MH">Mens Hostel</option>
                <option value="LH">Ladies Hostel</option>
          </select>     
          </div> */}
          {tabSelected===1&& <div className='w-11/12'>
            <table className='w-full relative table-auto'>
            <tr className='rounded-xl p-3 bg-primary text-center'>
                <th className='p-3'>Sl.No</th>
                <th className='p-3'>Name</th>
                <th className='p-3'>Admission No.</th>
                <th className='p-3'>Annual Income</th>
                <th className='p-3'>Qualifying Exam Rank</th>
                <th className='p-3'>Branch</th>
                <th className='p-3'>Rank</th>
                <th className='p-3'></th>
                <th className='p-3'></th>
              </tr>
              {ranks.map((user, index)=>(
                <tr 
                  className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}>
                  <td className='p-3'>{user.SlNo}</td>
                  <td className='p-3'>{user.Name}</td>
                  <td className='p-3'>{user.AdmissionNo}</td>
                  <td className='p-3'>{user.Income}</td>
                  <td className='p-3'>{user.ExamRank}</td>
                  <td className='p-3'>{user.Branch}</td>
                  <td className='p-3'>{user.Rank}</td>
                  <td className='p-3'><button className='submit-button-black'>Verify</button></td>
                  <td className='p-3'><button className='submit-button-black'>Remove</button></td>
                </tr>
              ))}
          </table>
            </div>}
          {tabSelected===2&& <div className='w-11/12'>
          <table className='w-full relative table-auto'>
              <tr className='rounded-xl p-3 bg-primary text-center'>
                <th className='p-3'>Sl.No</th>
                <th className='p-3'>Name</th>
                <th className='p-3'>Admission No.</th>
                <th className='p-3'>Branch</th>
                
              </tr>
              {users.map((user, index)=>(
                <tr 
                  className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}>
                  <td className='p-3'>{user.SlNo}</td>
                  <td className='p-3'>{user.Name}</td>
                  <td className='p-3'>{user.AdmNo}</td>
                  <td className='p-3'>{user.Branch}</td>
                </tr>
              ))}
          </table>
          </div>}
          {tabSelected===3&&<MessExpenseList paymentinitiated={false} suppliers={suppliers} setSuppliers={setSuppliers}/>}
          
          {tabSelected==4&& <SupplierList suppliers={suppliers} setSuppliers={setSuppliers}/>}

          {tabSelected==5&& <MessExpenseList paymentinitiated={true} suppliers={suppliers} setSuppliers={setSuppliers}/>}
       
          {/* {tabSelected===3&& <div className='w-11/12'>
          <table className='w-full relative table-auto'>
              <tr className='rounded-xl p-3 bg-primary text-center'>
                <th className='p-3'>Sl.No</th>
                <th className='p-3'>Name</th>
                <th className='p-3'>Admission No.</th>
                <th className='p-3'>Branch</th>
                <th className='p-3'></th>
              </tr>
              {users.map((user, index)=>(
                <tr 
                  className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}>
                  <td className='p-3'>{user.SlNo}</td>
                  <td className='p-3'>{user.Name}</td>
                  <td className='p-3'>{user.AdmNo}</td>
                  <td className='p-3'>{user.Branch}</td>
                  <td className='p-3'><button className='submit-button-black' onClick={()=>{RenderModal()}}>View Details</button></td>
                </tr>
              ))}
          </table>
          </div>

          } */}
      </motion.div>
    </div>
  )
}

export default AdmissionHostelOffice