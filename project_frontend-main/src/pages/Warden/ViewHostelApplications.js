import {useState,useEffect,useContext} from 'react'
import {baseUrl} from '../../baseUrl'
import { UserContext } from '../../Contexts/UserContext'
import axios from 'axios'
function ViewHostelApplications() {
  const [applications,setApplications] = useState([])
  const {setLoading}= useContext(UserContext)
  useEffect(() => {
    setLoading(true)
    axios.get(`${baseUrl}/warden/gethostelapplications`)
    .then(res=>{
      setApplications(res.data)
      setLoading(false)
    })
}, [])

  const generateHandler = ()=>{
      axios.get(`${baseUrl}/warden/generateranklist`)
      .then(res=>console.log(res))
  }

  return (
    <div className='w-11/12'>
    <div className='flex items-center justify-between w-4/12'>
      <select className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'>
            <option value="mh">Mens Hostel</option>
            <option value="lh">Ladies Hostel</option>
      </select>    
      <select className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'>
            <option value="firstyear">First Year</option>
            <option value="secondyear">Second Year</option>
            <option value="thirdyear">Third Year</option>
            <option value="fourthyear">Fourth Year</option>
      </select> 
    </div>
      <div className="flex items-center justify-end mb-5">
        <button className="bg-stone-800 text-white p-2 rounded-lg text-sm mr-5" onClick={generateHandler}>Generate RankList</button>
      </div>
      <table className='w-full relative table-auto'>
              <tr className='rounded-xl p-3 bg-primary text-center'>
                <th className='p-3'>Sl.No</th>
                <th className='p-3'>Name</th>
                <th className='p-3'>Admission No.</th>
                <th className='p-3'>Branch</th>
                <th className='p-3'>Semester</th>
                <th className='p-3'>Rank</th>
                <th className='p-3'>Rank</th>
              </tr>
              {applications.map((user, index)=>(
                <tr
                  key={index} 
                  className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}
                >
                  <td className='p-3'>{index+1}</td>
                  <td className='p-3 capitalize'>{user.name}</td>
                  <td className='p-3'>{user.user_id}</td>
                  <td className='p-3'>{user.Income}</td>
                  <td className='p-3'>{user.ExamRank}</td>
                  <td className='p-3'>{user.Branch}</td>
                  <td className='p-3'>{user.Rank}</td>
                </tr>
              ))}
          </table>
      </div>
  )
}

export default ViewHostelApplications