import axios from 'axios'
import { useEffect,useContext, useState } from 'react'
import { baseUrl } from '../baseUrl'
import {UserContext} from '../Contexts/UserContext'
const CurrentMessInmates = (props)=>{
    const {user,setLoading} = useContext(UserContext)
    var date = new Date();
    var dateFormat = date.getFullYear() + "-" +((date.getMonth()+1).length != 2 ? "0" + (date.getMonth() + 1) : (date.getMonth()+1)) + "-" + (date.getDate().length != 2 ?"0" + date.getDate() : date.getDate());
    const [selectedDate, setSelectedDate] = useState(dateFormat);
    const[selectedHostel,setSelectedHostel]=useState("MH");
 
  useEffect(() => {
    if(user.stage=='inmate')
    {
        setSelectedHostel(user.hostel)
    }
    setLoading(true)
    axios.get(`${baseUrl}/inmate/viewmessinmates?date=${selectedDate}&&hostel=${selectedHostel}`)
    .then(res=>{
      props.setInmates(res.data)
      setLoading(false)
    })
  }, [selectedHostel,selectedDate])
    
    return(
     <>
         <div className="flex items-center justify-between w-4/12 p">
          {user.stage=="inmate"?<select
            className="p-3 ring-slate-200 ring-2 rounded-xl outline-none"
          >
            <option >{user.hostel==="MH"?'Mens Hostel':'Ladies Hostel'}</option>
          </select>:<select
          defaultValue={selectedHostel}
            onChange={(e) => {
              setSelectedHostel(e.target.value);
            }}
            className="p-3 ring-slate-200 ring-2 rounded-xl outline-none"
          >
            <option value="MH">Mens Hostel</option>
            <option value="LH">Ladies Hostel</option>
          </select>}
          {/* <select className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'>
            <option value="firstyear">First Year</option>
            <option value="secondyear">Second Year</option>
            <option value="thirdyear">Third Year</option>
            <option value="fourthyear">Fourth Year</option>
      </select>  */}
        </div>
        <div className="flex items-center justify-between w-12/12 py-4">
    
          <p className="font-semibold mr-2">Select Date </p>
          <input
           defaultValue={selectedDate}
            onChange={(e) => {
               
              setSelectedDate(e.target.value);
            }}
            type="date"
          ></input>
        </div>
        <div className="flex items-center justify-between w-11/12 py-4">
          <p className="font-semibold">No Of Requests : {props.inmates.length}</p>
        </div>
        <div className='w-11/12 overflow-x-scroll'>
        <table className='w-11/12 relative table-auto'>
              <tr className='rounded-xl p-3 bg-primary text-center'>
                <th className='p-3'>Sl.No</th>
                <th className='p-3'>Name</th>
                <th className='p-3'>Hostel Admission No.</th>
                <th className='p-3'>Room No.</th>
              </tr>
              {props.inmates.map((user, index)=>(
                <tr 
                  key={index}
                  className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}
                >
                  <td className='p-3'>{index+1}</td>
                  <td className='p-3'>{user.name}</td>
                  <td className='p-3'>{user.hostel_admission_no}</td>
                  <td className='p-3'>{user.block_name} - {user.room_no}</td>
                </tr>
              ))}
          </table>
          </div>
          </>
          
    )
}
export default CurrentMessInmates