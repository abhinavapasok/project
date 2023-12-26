import {useState,useEffect, useContext} from "react"
import axios from 'axios'
import { baseUrl } from "../baseUrl"
import { UserContext } from "../Contexts/UserContext"
function MessBill() {
  const [messbill, setMessBill] = useState([])
  const [tabSelected, setTabSelected] = useState(1)
  const {user,setLoading} = useContext(UserContext)
  useEffect(() => {
    setLoading(true)
    axios.get(`${baseUrl}/inmate/viewmessbill`,{params:{user_id:user.user_id}})
    .then(res=>{
      setMessBill(res.data)
      setLoading(false)
    })
    
  }, [])
  
    return (
      // <div className='w-full'>
         <>
           {/* inmates list */}
           <div className='w-11/12'>
             <h2 className='font-semibold text-lg mb-2'>Under Construction</h2>
             {/* <table className='w-full relative table-auto'>
                 <tr className='rounded-xl p-3 bg-primary text-center'>
                   <th className='p-3'>Sl.No</th>
                   <th className='p-3'>Month</th>
                   <th className='p-3'>Attendance</th>
                   <th className='p-3'>Mess Charge</th>
                   <th className='p-3'>Extras</th>
                   <th className='p-3'>Feast</th>
                   <th className='p-3'>L.F</th>
                   <th className='p-3'>A.F</th>
                   <th className='p-3'>Total</th>
                   <th className='p-3'>Dues</th>
                 </tr>
                 {messbill.map((user, index)=>(
                   <tr 
                     key={index+1}
                     className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}
                   >
                     <td className='p-3'>{index+1}</td>
                     <td className='p-3'>{user.month}</td>
                     <td className='p-3'>{user.attendance}</td>
                     <td className='p-3'>{user.mess_charge}</td>
                     <td className='p-3'>{user.extras}</td>
                     <td className='p-3'>{user.feast}</td>
                     <td className='p-3'>{user.lf}</td>
                     <td className='p-3'>{user.af}</td>
                     <td className='p-3'>{user.total}</td>
                     <td className='p-3'>{user.dues}</td>
                   </tr>
                 ))}
             </table> */}
           </div>
         </>
       )
     }


export default MessBill