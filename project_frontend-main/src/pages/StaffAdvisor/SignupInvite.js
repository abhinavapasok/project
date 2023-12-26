import React,{useContext, useState} from 'react'
import Uploader from '../../components/Uploader'
import { saveAs } from "file-saver";
import excelfile from "../../components/sample-template.xlsx"
import axios from 'axios'
import {baseUrl} from '../../baseUrl'
import DownloadIcon from '@mui/icons-material/Download';
import TelegramIcon from '@mui/icons-material/Telegram';
import { UserContext } from '../../Contexts/UserContext';
function SignupInvite() {
  const saveFile = () => {
    saveAs(
      // "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      // "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      excelfile,
      "SignUp_Link_Excel_Template.xlsx"
    );
  };

  const [uploaded,setUploaded]=useState(false);
  const [jsonData,setJsonData]=useState([]);
  const [indEmail,setIndEmail]=useState("");
  const [indAdmno,setIndAdmno]=useState("");
  const [indName,setIndName]=useState("");
  const {setLoading,user} =useContext(UserContext)

  const sendEmail = (e)=>{
    e.preventDefault()
    axios.post(`${baseUrl}/staffadvisor/signupinvite`,{jsonData,UserId:user.user_id})
    .then(res=>{
      console.log(res)
    })
  }
  const sendIndEmail = (e)=>{
    e.preventDefault()
    axios.post(`${baseUrl}/staffadvisor/signupinvite`,{jsonData:[{EmailId:indEmail,Name:indName,AdmissionNo:indAdmno}],UserId:user.user_id})
    .then(res=>console.log(res))
  }
  return (
    <div className='flex flex-col w-full items-center'>
      <div className='flex flex-row justify-between w-11/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Signup Invite</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>user Name</div>
        </div>
      </div>

      <div className='w-11/12 mt-12 bg-white rounded-lg'>

        <div className='mx-auto w-11/12'>

        {/* search and filter */}
        <div className='bg-white rounded-lg w-full items-center p-3 justify-between'>
          <div className='text-sm font-bold mt-3'>Send signup link (individually)</div>
          <form onSubmit={sendIndEmail}>
           <div className='w-full grid grid-cols-2 gap-y-3 mt-3'>
            <label htmlFor="">Email: </label>
              <input type="email" 
                value={indEmail}
                placeholder="Enter email of student" 
                className="px-2 py-1 ring-slate-200 ring-2 rounded-xl outline-none" 
                onChange={e=>{setIndEmail(e.target.value)}} required/>
             <label htmlFor="">Admission No: </label> 
              <input type="text" 
                value={indAdmno} 
                placeholder="Enter admission no of student"
                className="px-2 py-1 ring-slate-200 ring-2 rounded-xl outline-none" 
                onChange={e=>{setIndAdmno(e.target.value)}} required/>
              <label htmlFor="">Name: </label>
              <input type="text" 
                value={indName} 
                placeholder="Enter name of student"
                className="px-2 py-1 ring-slate-200 ring-2 rounded-xl outline-none"
                onChange={e=>{setIndName(e.target.value)}} required/>
           </div>
           <div className='flex items-center justify-end w-full mt-2'>
              <button type="submit" className='py-2 cursor-pointer hover:bg-stone-600 px-3 bg-stone-800 text-white text-sm font-semibold rounded-2xl'><TelegramIcon/> Send Invite Email</button>
            </div>
           </form>
        </div>  
        
        <hr className='border-2 border-slate-200'/>
      <div className='w-full flex flex-row items-center justify-between mt-5'>
        <div className='text-sm font-bold p-3'>Send signup link to group (Using Excel Sheet)</div>
        <button className='py-2 cursor-pointer hover:bg-stone-600 px-3 bg-stone-800 text-white text-sm font-semibold rounded-2xl ' onClick={saveFile}><DownloadIcon/> Download Template</button>
      </div>
      <Uploader uploaded={uploaded} setUploaded={setUploaded} jsonData={jsonData} setJsonData={setJsonData}/>
      
      <div className="w-full flex items-end justify-end mt-5 ml-3">
          <button onClick={sendEmail} className='mr-3 mb-3 p-3 py-2 cursor-pointer hover:bg-stone-600 px-3 bg-stone-800 text-white text-sm font-semibold rounded-2xl'><TelegramIcon/> Send Invite Emails</button>
      </div>
      </div>
      </div>
    </div>
  )
}

export default SignupInvite