import {useState} from 'react'
import {motion} from 'framer-motion'
const ViewComplaints = (props)=>{
    const comps=[
        {
            Name:"Athul",
            Roomno:"B214",
            Complaint:"Fan not working"
        },
        {
            Name:"Sreyas",
            Roomno:"B214",
            Complaint:"Broken Table"
        },
        {
            Name:"Shijin",
            Roomno:"B212",
            Complaint:"Light not working"
        },
        {
            Name:"Shuhaib",
            Roomno:"B212",
            Complaint:"lksj flkjsldkfj alskfj lkasj flksj flksajf "
        }
        
        
        
    ]
    const [complaints, setComplaints] = useState(comps)
    return(
        <div className='flex flex-col w-full items-center min-h-screen h-full'>
      <div className='flex flex-row justify-between w-11/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Complaints</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>user Name</div>
        </div>
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}  className='flex flex-col items-center py-8 space-y-4 w-11/12 mt-8 bg-white rounded-xl admin-dashbord-height'>
      
        <table className='w-11/12 relative table-auto'>
              <tr className='rounded-xl p-3 bg-primary text-center'>
                <th className='p-3'>Sl.No</th>
                <th className='p-3'>Name</th>
                <th className='p-3'>Room No.</th>
                <th className='p-3'>Complaint</th>
              </tr>
              {complaints.map((user, index)=>(
                <tr
                  key={index} 
                  className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}
                >
                  <td className='p-3'>{index+1}</td>
                  <td className='p-3'>{user.Name}</td>
                  <td className='p-3'>{user.Roomno}</td>
                  <td className='p-3'>{user.Complaint}</td>
                </tr>
              ))}
          </table>
      </motion.div>
    </div>
        
    )
}
export default ViewComplaints