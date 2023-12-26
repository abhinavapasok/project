import axios from 'axios';
import {useState,useContext} from 'react'
import AlertDialog from './AlertDialog';
import ConfirmDialog from './ConfirmDialog';
import {UserContext} from '../Contexts/UserContext'
import { TrafficRounded } from '@mui/icons-material';
import { baseUrl } from '../baseUrl';
export default function HostelOut(){
    const [fromDate,setFromDate]=useState("")
    const [toDate,setToDate]=useState("")
    const [modalText,setModalText]=useState("")
    const [modalHeading,setModalHeading]=useState("")
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [days,setDays]=useState(0)
    const [reason,setReason]=useState("")
    const {user,setLoading}=useContext(UserContext)
    const submitForm = ()=>{
        setLoading(TrafficRounded)
        axios.post(`${baseUrl}/inmate/hostelout`,{
                    user_id:user.user_id,
                    fromDate:fromDate,
                    toDate:toDate,
                    reason:reason
                }).then((res)=>{
                    alert("Submitted Hostel Out")
                    console.log(res)
                    setFromDate("")
                    setToDate("")
                    setReason("")
                    setLoading(false)
                })
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        var fdate=new Date(fromDate)
        var tdate=new Date(toDate)
        if(fdate.getTime()>tdate.getTime()){
            setModalHeading("Invalid Date")
            setModalText("Check the dates entered.")
            setOpen1(true)
        }
        else{
                var days=(tdate.getTime()-fdate.getTime())/(1000 * 3600 * 24)
                setDays(days)
                setModalHeading("Confirmation")
                setModalText("You have entered Hostel Out for "+days+" days from "+fromDate+" to "+toDate+". Do you want to confirm?")
                setOpen2(true)
            }

        }
        
    
    
    return(
        <div className='w-11/12'>
        <form onSubmit={submitHandler}>
            <div className='grid grid-cols-2 w-6/12 gap-4 mb-3'>
                <label htmlFor="">From Date:</label>  <input type="date" className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" value={fromDate} onChange={(e)=>{setFromDate(e.target.value)}} required/>
                <label htmlFor="">To Date:</label> <input type="date" className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" value={toDate} onChange={(e)=>{setToDate(e.target.value)}} required/>
                <label htmlFor="">Reason:</label> <textarea className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" placeholder="Type something..." value={reason} onChange={(e)=>{setReason(e.target.value)}}/>
            </div>
            <div className="w-full flex items-end justify-end mt-5">
                <button className="ml-auto p-3 bg-stone-800 text-white rounded-xl">Submit</button>
            </div>    
        </form>
        <AlertDialog open={open1} setOpen={setOpen1} modalHeading={modalHeading} modalText={modalText}/>
        <ConfirmDialog open={open2} setOpen={setOpen2} modalHeading={modalHeading} modalText={modalText} confirmFunction={submitForm}/>
    </div>
    )
}