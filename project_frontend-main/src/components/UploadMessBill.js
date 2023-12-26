import Uploader from "./Uploader"
import {useContext, useState} from "react"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { baseUrl } from "../baseUrl";
import { saveAs } from 'file-saver'
import excelfile from '../components/messbill-template.xlsx'
import axios from "axios";
import DownloadIcon from '@mui/icons-material/Download';
import { UserContext } from "../Contexts/UserContext";
function UploadMessBill() {
  const [uploaded,setUploaded]=useState(false);
  const [jsonData,setJsonData]=useState([]);
  const [date,setDate]=useState("")
  const {setLoading}=useContext(UserContext)

  const saveFile = () => {
    saveAs(
      // "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      // "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      excelfile,
      "MessBill_Template.xlsx"
    );
  };

  const SubmitHandler = (e) =>{
    e.preventDefault();
    if(!uploaded)
      alert("Upload a file")
    else{
      setLoading(true)
      axios.post(`${baseUrl}/inmate/uploadbill`,{jsonData:jsonData,date:date})
      .then(res=>{
        alert("Submitted")
        setLoading(false)
      })
    }
  }
  return (
    <div className="w-11/12">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold mb-3">Upload Mess Bill</h2>
        <button className='py-2 cursor-pointer hover:bg-stone-600 px-3 bg-stone-800 text-white text-sm font-semibold rounded-2xl' onClick={saveFile}><DownloadIcon/> Download Template</button>
      </div>
        <Uploader uploaded={uploaded} setUploaded={setUploaded} jsonData={jsonData} setJsonData={setJsonData}/>
        <form>
          <div className="grid grid-cols-2 w-6/12 mt-5 gap-y-4 items-center justify-center">
            <label htmlFor="">Month and Year:</label>
            <input type="month" className="border-solid border-2 rounded-lg ml-3 p-1" onChange={(e)=>{setDate(e.target.value)}} required/>
          </div>
        
          <div className="w-full flex items-end justify-end mt-5">
            <button className="ml-auto p-3 bg-stone-800 text-white rounded-xl" onClick={SubmitHandler}><CloudUploadIcon/> Upload Mess Bill</button>
          </div>
        </form>
    </div>
  )
}

export default UploadMessBill