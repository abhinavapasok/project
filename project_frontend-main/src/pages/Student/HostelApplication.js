import {useState,useContext,useEffect} from "react"
import {motion} from "framer-motion" 
import axios from 'axios'
import RankList from "../../components/RankList"
import {UserContext} from '../../Contexts/UserContext'
import {baseUrl} from '../../baseUrl'

function HostelApplication() {
  const [currpage,setCurrPage]=useState(1)
  const [tabSelected, setTabSelected] = useState(1)
  const [admno,setAdmno]=useState(180287)
  const {user}=useContext(UserContext)
  const [details,setDetails]=useState({})

  useEffect(() => {
    axios.get(`${baseUrl}/student/checkapplied`,{params:{userid:user.user_id}})
    .then(res=>console.log(res))
  }, [])
  
  const submitHandler =()=>{
    setDetails({...details,user_id:user.user_id})
    axios.post('http://localhost:8080/student/hostelapplication',details)
    .then(res=>console.log(res))
  }

  return (
    <div className='flex flex-col w-full items-center'>
      <div className='flex flex-row justify-between w-10/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Apply for Hostel</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>user Name</div>
        </div>
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} className='w-10/12 mt-12 bg-white rounded-xl text-left p-5'>
        {currpage===1 && <div><h2 className="font-bold">Rules</h2>
        <ol className="list-decimal pl-5 pt-2 ">
            <li>Admission shall be confined to the regular full time students who are in the current nominal roll of the college prepared from time to time by the College of Engineering, Thiruvananthapuram. </li>
            <li>The warden shall have powers to issue instructions and standing orders to regulate the internal matters of the hostel and the warden's decision shall be final in all matters connected with the hostel. </li>
        </ol>
        <div className="w-full flex items-end justify-end mt-5">
            <motion.button whileHover={{x:10, backgroundColor:'green'}}  className="ml-auto p-3 bg-stone-800 text-white rounded-xl" onClick={()=>setCurrPage(currpage+1)}>Proceed to Apply</motion.button>
        </div></div>}

        {currpage===2 && <div><h2 className="font-bold">Personal Details</h2>
        <form action="">
            <div className="grid grid-cols-2 gap-y-3 w-6/12">
              <label htmlFor="" className="mt-2">Admission Number</label>
              <input type="text" name="user_id"  value={user.user_id} className="px-2 py-1 ring-slate-200 ring-2 rounded-xl outline-none" disabled/>
              <label htmlFor="" className="mt-2">Admission Criteria</label>
              <select name="admission_criteria" id="" value={details.admission_criteria} onChange={(e)=>setDetails({...details,[e.target.name]:e.target.value})} className="px-2 py-1 ring-slate-200 ring-2 rounded-xl outline-none">
                <option value="">Select an option</option>
                <option value="KEAM">KEAM</option>
                <option value="NATA">NATA</option>
                <option value="GoI(CSAB)">GoI(CSAB)</option>
                <option value="PMJK">PMJK</option>
                <option value="Lateral">Lateral Entry</option>
                <option value="Gate">GATE</option>
              </select>
              <label htmlFor="" className="mt-2">Year of Admission</label>
              <input type="number" name="yearofadmission"  value={details.yearofadmission} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} className="p-2 ring-slate-200 ring-2 rounded-xl outline-none"/>
              <label htmlFor="" className="mt-2">Qualifying Exam</label>
              <select name="exam_type" id=""  value={details.exam_type} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} className="p-2 ring-slate-200 ring-2 rounded-xl outline-none">
                <option value="">Select an option</option>
                <option value="KEAM">KEAM</option>
                <option value="NATA">NATA</option>
                <option value="GoI(CSAB)">GoI(CSAB)</option>
                <option value="PMJK">PMJK</option>
                <option value="Lateral">Lateral Entry</option>
                <option value="Gate">GATE</option>
              </select>
              <label htmlFor="" className="mt-2">Qualifying Exam Rank</label>
              <input type="number" name="rank"  value={details.rank} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} className="p-2 ring-slate-200 ring-2 rounded-xl outline-none"/>
              <label htmlFor="" className="mt-2">University Number</label>
              <input type="text" name="universityno" value={details.universityno} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} className="p-2 ring-slate-200 ring-2 rounded-xl outline-none"/>
              <label className="mt-2">University CGPA</label>
              <input type="number" name="cgpa" value={details.cgpa} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} className="p-2 ring-slate-200 ring-2 rounded-xl outline-none"></input>
            </div>
          <div className="w-full flex items-center justify-between mt-5">
              <motion.button whileHover={{x:-10, backgroundColor:'red'}}  className="p-3 bg-stone-800 text-white rounded-xl" onClick={()=>setCurrPage(currpage-1)}>Back</motion.button>
              <motion.button whileHover={{x:10, backgroundColor:'green'}}  className="p-3 bg-stone-800 text-white rounded-xl" onClick={()=>setCurrPage(currpage+1)}>Next</motion.button>
          </div>
        </form></div>}  

        {currpage===3 && <div><h2 className="font-bold">Personal Details</h2>
        <form action="">
            <div className="grid grid-cols-2 gap-y-3 w-6/12">
              <label htmlFor="" className="mt-2">Date of Birth</label>
              <input type="date" name="dob" value={details.dob} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} className="p-2 ring-slate-200 ring-2 rounded-xl outline-none"/>
              <label htmlFor="" className="mt-2">Category</label>
              <input type="text" name="category" value={details.category} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}}  className="p-2 ring-slate-200 ring-2 rounded-xl outline-none"/>
              <label htmlFor="" className="mt-2">Religion</label>
              <select name="religion" id=""  value={details.religion} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} className="p-2 ring-slate-200 ring-2 rounded-xl outline-none">
                <option value="">Select an option</option>
                <option value="hindu">Hindu</option>
                <option value="christian">Christian</option>
                <option value="muslim">Muslim</option>
              </select>
              <label htmlFor="" className="mt-2">Caste</label>
              <input type="text" name="caste"  value={details.caste} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} className="px-2 py-1 ring-slate-200 ring-2 rounded-xl outline-none"/>
              <label htmlFor="" className="mt-2">BPL ?</label>
              <div className="flex items-center">
                <input type="radio" onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} name="bpl" value="Yes" className="border-solid border-2 mt-2 px-1"/><label htmlFor="" className="ml-1 mr-4">Yes</label>
                <input type="radio" onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} name="bpl" value="No" className="border-solid border-2 mt-2 px-1"/><label htmlFor="" className="ml-1">No</label>
              </div>
              <label htmlFor="" className="mt-2">Eligible for Fee Concession?</label>
              <div className="flex items-center">
                <input type="radio" onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} name="eligible_for_concession" value="Yes" className="border-solid border-2 rounded-lg mt-2 px-1"/><label htmlFor="" className="ml-1 mr-4">Yes</label>
                <input type="radio" onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} name="eligible_for_concession" value="No" className="border-solid border-2 rounded-lg mt-2 px-1"/><label htmlFor="" className="ml-1">No</label>
              </div>
              
              <label htmlFor="" className="mt-2">Annual Income</label>
              <input type="number" name="annual_income" value={details.annual_income} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} className="px-2 py-1 ring-slate-200 ring-2 rounded-xl outline-none"/>
              <label htmlFor="" className="mt-2">Residential Address</label>
              <textarea type="text" name="present_address" value={details.present_address} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}}  className="px-2 py-1 ring-slate-200 ring-2 rounded-xl outline-none"/>
            </div>
            <div className="w-full flex items-center justify-between mt-5">
              <motion.button whileHover={{x:-10, backgroundColor:'red'}}  className="p-3 bg-stone-800 text-white rounded-xl" onClick={()=>setCurrPage(currpage-1)}>Back</motion.button>
              <motion.button whileHover={{x:10, backgroundColor:'green'}}  className="p-3 bg-stone-800 text-white rounded-xl" onClick={()=>setCurrPage(currpage+1)}>Next</motion.button>
          </div>
        </form></div>}  

        {currpage===4 && <div><h2 className="font-bold">Personal Details</h2>
        <form action="">
            <div className="grid grid-cols-2 gap-y-3 w-6/12">
              <label htmlFor="" className="mt-2">Parent Name</label>
              <input type="text" name="parent_name" value={details.parent_name} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} className="px-2 py-1 ring-slate-200 ring-2 rounded-xl outline-none"/>
              <label htmlFor="" className="mt-2">Parent Mobile Number</label>
              <input type="text" name="parent_number" value={details.parent_number} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} className="px-2 py-1 ring-slate-200 ring-2 rounded-xl outline-none"/>
              <label htmlFor="" className="mt-2">Local Guardian Name</label>
              <input type="text" name="local_guardian_name" value={details.local_guardian_name} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} className="px-2 py-1 ring-slate-200 ring-2 rounded-xl outline-none"/>
              <label htmlFor="" className="mt-2">Local Guardian Mobile Number</label>
              <input type="text" name="local_guardian_number" value={details.local_guardian_number} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} className="px-2 py-1 ring-slate-200 ring-2 rounded-xl outline-none"/>
              <label htmlFor="" className="mt-2">Parent Address</label>
              <textarea type="text" name="parent_address" value={details.parent_address} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}} className="px-2 py-1 ring-slate-200 ring-2 rounded-xl outline-none"/>
              <label htmlFor="" className="mt-2">Local Guardian Address</label>
              <textarea type="text" name="local_guardian_address" value={details.local_guardian_address} onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}}  className="px-2 py-1 ring-slate-200 ring-2 rounded-xl outline-none"/>
            </div>
            <div className="w-full flex items-center justify-between mt-5">
              <motion.button whileHover={{x:-10, backgroundColor:'red'}}  className="p-3 bg-stone-800 text-white rounded-xl" onClick={()=>setCurrPage(currpage-1)}>Back</motion.button>
              <motion.button whileHover={{x:10, backgroundColor:'green'}}  className="p-3 bg-stone-800 text-white rounded-xl" onClick={()=>setCurrPage(currpage+1)} type="submit">Next</motion.button>
          </div>
        </form></div>}  

        {currpage==5 && <div>
        <p className="font-semibold text-black mb-3">Enter Semester Exam Marks (if applicable)</p> 
        <div className="grid grid-cols-2 gap-2 w-1/2 mt-3"> 
          <p>S1: </p> <input className="p-2 ring-slate-200 ring-2 rounded-xl outline-none" type="number"/>
          <p>S2: </p> <input className="p-2 ring-slate-200 ring-2 rounded-xl outline-none" type="number"/>
          <p>S3: </p> <input className="p-2 ring-slate-200 ring-2 rounded-xl outline-none" type="number"/>
          <p>S4: </p> <input className="p-2 ring-slate-200 ring-2 rounded-xl outline-none" type="number"/>
          <p>S5: </p> <input className="p-2 ring-slate-200 ring-2 rounded-xl outline-none" type="number"/>
          <p>S6: </p> <input className="p-2 ring-slate-200 ring-2 rounded-xl outline-none" type="number"/>
          <p>S7: </p> <input className="p-2 ring-slate-200 ring-2 rounded-xl outline-none" type="number"/>
          <p>S8: </p> <input className="p-2 ring-slate-200 ring-2 rounded-xl outline-none" type="number"/>
        </div>
        <div className="w-full flex items-center justify-between mt-5">
              <motion.button whileHover={{x:-10, backgroundColor:'red'}}  className="p-3 bg-stone-800 text-white rounded-xl" onClick={()=>setCurrPage(currpage-1)}>Back</motion.button>
              <motion.button whileHover={{x:10, backgroundColor:'green'}}  className="p-3 bg-stone-800 text-white rounded-xl" onClick={()=>{submitHandler();setCurrPage(currpage+1)}} type="submit">Submit Application</motion.button>
        </div>
        </div>}
        {currpage===6 && <div>
          <div className='flex flex-row tex-black text-sm font-bold relative mb-5'>
              <div
                className='cursor-pointer '
                onClick={()=>{
                  setTabSelected(1)
                }}
              >
                  <div>View Status</div>
                  <div className={tabSelected===1?'mt-2 h-1 self-center w-12/12 bg-stone-800 rounded-full':''}/>
              </div>

              <div 
                className='ml-5 cursor-pointer'
                onClick={()=>{
                  setTabSelected(2)
                }}
              >
                <div>View Detailed RankList</div>
                <div className={tabSelected===2?'mt-2 h-1 w-12/12 self-center bg-stone-800 rounded-full':''}/>
              </div>
              <div 
                className='ml-5 cursor-pointer'
                onClick={()=>{
                  setTabSelected(3)
                }}
              >
                <div>Raise Complaint</div>
                <div className={tabSelected===3?'mt-2 h-1 w-12/12 self-center bg-stone-800 rounded-full':''}/>
                </div>
          </div>
          {tabSelected===1&& <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}} className="flex flex-col items-center justify-center">
            <h2 className="font-semibold text-green-700 text-lg mt-5 mb-5">Congratulations!! You have been allotted to Men's Hostel</h2>
            <div className="flex items-center justify-center w-full mt-5 mb-5">
              <div className="flex flex-col items-center justify-center p-5 bg-purple-800 rounded-lg mr-5">
                <h2 className="text-lg font-semibold text-white">Your Rank</h2>
                <hr/>
                <h1 className="text-2xl font-bold text-white">1</h1>
              </div>

              <div className="flex flex-col items-center justify-center p-5 bg-teal-700 rounded-lg ml-5">
                <h2 className="text-lg font-semibold text-white">Allotted Room</h2>
                <hr/>
                <h1 className="text-2xl font-bold text-white">Pending..</h1>
              </div>
            </div>
          
          </motion.div>
          }
          {tabSelected===2&& <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}>
            <h1 className="font-semibold text-lg mb-5 mt-3">RankList</h1>
            <RankList admno={admno}/>
          </motion.div>
            
          }
          {tabSelected===3&& <motion.div className="pt-5" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}>
            <form action="">
                <div className="grid grid-cols-2 gap-y-4 w-6/12">
                <label htmlFor="">Complaint:</label>
                <textarea name="" id="" rows="5" placeholder="Enter your complaint" className="border-solid border-2 rounded-lg ml-3 p-1" required></textarea>
                </div>
                <div className="w-full flex items-end justify-end mt-5">
                    <button className="ml-auto p-3 bg-stone-800 text-white rounded-xl">Submit Complaint</button>
                </div>
            </form>
            </motion.div>}
          </div>
      
        }
      </motion.div>
    </div>

  )
}

export default HostelApplication