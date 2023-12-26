import axios from 'axios'
import {useEffect,useContext,useState} from 'react'
import { UserContext } from '../Contexts/UserContext'
import { baseUrl } from '../baseUrl'
import DownloadIcon from '@mui/icons-material/Download';
import BlockIcon from '@mui/icons-material/Block';
import DownloadDialog from './DownloadDialog';
const ApplicationList=({setCertificates,setAppsno,certificates})=>{
    const {user,setLoading} = useContext(UserContext)
    const [open,setOpen] = useState(false)
    const [certificateText,setCertificateText] = useState("")
    const [certificateName,setCertificateName] = useState("")
    useEffect(() => {
        setLoading(true)
        axios.get(`${baseUrl}/inmate/viewcertificates`,{params:{user_id:user.user_id}})
        .then(res=>{
          console.log(res.data)
          setCertificates(res.data)
          setAppsno(res.data.length)
          setLoading(false)
        })
      }, [])

      const downloadCertificate = (certificateId,applicationId,certificateName)=>{
        // setLoading(true)
        console.log(certificateId)
        axios.get(`${baseUrl}/certificates/download`,{
          params:{
            admission_no: user.user_id,
            certificate_id:certificateId,
            application_id: applicationId
          }
        })
        .then(res=>{
          console.log(res.data['certificateContent'])
          setCertificateText(res.data['certificateContent'])
          setCertificateName(certificateName)
          setLoading(false)
          setOpen(true)

        })
      }
    return (
      // <div className='w-full'>
      <>
        {/* inmates list */}
        <div className='w-11/12 overflow-y-scroll no-scrollbar'>
          <table className='w-full relative table-auto'>
              <tr className='rounded-xl p-3 bg-primary text-center'>
                <th className='p-3'>Sl.No</th>
                <th className='p-3'>Certificate Type</th>
                <th className='p-3'>Applied Date</th>
                <th className='p-3'>Status</th>
                <th className='p-3'>Status</th>
                <th className='p-3'>Download</th>
              </tr>
              {certificates.map((certificate, index)=>{
                var patharray=certificate.path.split("-")
                return(
                <tr 
                  className='border-b text-center border-slate-200 border-solid hover:bg-gray-300'
                  key={index}>
                  <td className='p-3'>{index+1}</td>
                  <td className='p-3 capitalize'>{certificate.name}</td>
                  <td className='p-3'>{certificate.date.slice(0,10)}</td>
                  <td className='p-3'>{patharray[certificate.status]}</td>
                  <td className='p-3'>{certificate.approved?"Approved":(certificate.rejected?"Rejected":"In Progress")}</td>
                  <td className='p-3'>{certificate.approved?<DownloadIcon className="cursor-pointer" onClick={()=>{downloadCertificate(certificate.certificate_id,certificate.application_id,certificate.name)}}></DownloadIcon>:<BlockIcon/>}</td>
                </tr>
              )})}
          </table>
        </div>
        <DownloadDialog open={open} setOpen={setOpen} certificateText={certificateText} certificateName={certificateName}/>
      </>
    )
  }

export default ApplicationList