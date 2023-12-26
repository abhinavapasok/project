import axios from 'axios'
import {useEffect,useContext, useState} from 'react'
import { UserContext } from '../Contexts/UserContext'
import { baseUrl } from '../baseUrl'
import DownloadIcon from '@mui/icons-material/Download';
import BlockIcon from '@mui/icons-material/Block';
import ApplicationDialog from './ApplicationDialog';
const ApplicationListWarden=({setCertificates,setAppsno,certificates})=>{
    const {user,setLoading} = useContext(UserContext)
    const [open,setOpen] = useState(false)
    const [details,setDetails] = useState({})
    // const [certificates,setCertificates] = useState([])
    useEffect(() => {
        axios.get(`${baseUrl}/warden/getcertificateapplications`)
        .then(res=>{
        //   console.log("hello")
          console.log(res.data)
          setCertificates(res.data)
          setAppsno(res.data.length)
        })
      }, [])

      const displayModal = (admissionno,studentname,programme,certificatename,applieddate,application_id,application_form)=>{
        setOpen(true)
        setDetails({admissionno:admissionno,studentname:studentname,programme:programme,certificatename:certificatename,applieddate:applieddate,application_id:application_id,application_form:application_form})
      }

    return (
      // <div className='w-full'>
      <>
        {/* inmates list */}
        {/* <div className='w-11/12 overflow-y-scroll no-scrollbar'>
          <table className='w-full relative table-auto'>
              <tr className='rounded-xl p-3 bg-primary text-center'>
                <th className='p-3'>Admission Number</th>
                <th className='p-3'>Name</th>
                <th className='p-3'>Course</th>
                <th className='p-3'>Semester</th>
                <th className='p-3'>Certificate Name</th>
                <th className='p-3'>Applied Date</th>
              </tr>
              {certificates.map((user, index)=>(
                <tr 
                  className='border-b text-center border-slate-200 border-solid hover:bg-gray-300'
                  key={index}>
                  <td className='p-3'>{user.admissionno}</td>
                  <td className='p-3'>{user.name}</td>
                  <td className='p-3'>{user.course}</td>
                  <td className='p-3'>{user.semester}</td>
                  <td className='p-3'>{user.cname}</td>
                  <td className='p-3'>{user.date.slice(0,10)}</td>
                </tr>
              ))}
          </table>
        </div> */}
        <div className='w-11/12 overflow-y-scroll no-scrollbar'>
          <table className='w-full relative table-auto'>
              <tr className='rounded-xl p-3 bg-primary text-center'>
                <th className='p-3'>Sl.No</th>
                <th className='p-3'>Admission Number</th>
                <th className='p-3'>Name</th>
                <th className='p-3'>Programme</th>
                <th className='p-3'>Certificate Name</th>
                <th className='p-3'>Applied Date</th>
                <th className='p-3'>Status</th>
                {/* <th className='p-3'>Status</th> */}
                {/* <th className='p-3'>Download</th> */}
              </tr>
              {certificates.map((user, index)=>{
                var newdate=new Date(user.date)
                var convertedDate=newdate.getDate()+"/"+(newdate.getMonth()+1)+"/"+newdate.getFullYear()
                return(
                <tr 
                  className='border-b text-center border-slate-200 border-solid hover:bg-gray-300'
                  key={index}>
                  <td className='p-3'>{index+1}</td>
                  <td className='p-3'>{user.admission_no}</td>
                  <td className='p-3 capitalize'>{user.studentname}</td>
                  <td className='p-3 capitalize'>{user.programme}</td>
                  <td className='p-3'>{user.certificatename}</td>
                  <td className='p-3'>{convertedDate}</td>
                  <td className='p-3'><button onClick={()=>{displayModal(user.admission_no,user.studentname,user.programme,user.certificatename,convertedDate,user.application_id,user.application_form)}}className='submit-button-black'>View/Approve</button></td>
                  {/* <td className='p-3'>{user.approved?"Approved":(user.rejected?"Rejected":"In Progress")}</td>
                  <td className='p-3'>{user.approved?<DownloadIcon className='cursor-pointer'/>:<BlockIcon/>}</td> */}
                </tr>
              )})}
          </table>
        </div>
        <ApplicationDialog open={open} setOpen={setOpen} details={details}/>
      </>
    )
  }

export default ApplicationListWarden