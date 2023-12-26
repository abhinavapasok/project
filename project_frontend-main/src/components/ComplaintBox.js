import axios from 'axios';
import {useState,useContext} from 'react'
import { baseUrl } from '../baseUrl';
import {UserContext} from '../Contexts/UserContext'
import AlertDialog from './AlertDialog';
import ConfirmDialog from './ConfirmDialog';
export default function ComplaintBox(){
    const [complaint,setComplaint]=useState("")
    const {user,setLoading} =useContext(UserContext)
    const [open1,setOpen1]=useState(false);
    const [open2,setOpen2]=useState(false);
    const [modalHeading,setModalHeading]=useState("");
    const [modalText,setModalText]=useState("")
    const submitComplaint =()=>{
        setLoading(true)
        axios.post(`${baseUrl}/inmate/complaint-box`,{
            user_id:user.user_id,
            complaint:complaint
        })
        .then(res=>{
            if(res.data.status=="ok")
            {
                setModalHeading("Complaint registered .")
                setModalText("Your complaint has been registered  successfully .")
                setOpen1(true)
            }
            else{
                throw new Error("something went wrong");
            }

        }).catch((err)=>{
            setModalHeading("Something went wrong .")
            setModalText("Could n't Register your complaint please try again after sometime and if still issue persist please contact the developer .")
            setOpen1(true)
        }).finally(()=>{
            setLoading(false);
        })
    }

    const confirmationAlert=(e)=>{
        e.preventDefault();
        setModalHeading("Register Complaint .")
        setModalText("Are You sure . you want to register the complaint ?")
        setOpen2(true)
    }
    return(
        <div className="w-11/12">
            <h2 className="font-bold text-black mb-3">Your Admission No: {user.user_id}</h2>
            <form action="" onSubmit={confirmationAlert}>
                <div className="flex w-11/12">
                <label htmlFor="complaint m-4 ">Complaint:</label>
                <textarea name="complaint" id="complaint" rows="5" placeholder="Enter your complaint" className="w-full py-2 px-3 m-2 rounded-xl ring-2 ring-slate-300 focus:outline-none" value={complaint} onChange={(e)=>{setComplaint(e.target.value)}} required></textarea>
                </div>
                <div className="w-full flex items-end justify-end mt-5">
                    <button type="submit" className="ml-auto p-3 bg-stone-800 text-white rounded-xl">Submit Complaint</button>
                </div>
            </form>
            <AlertDialog
        open={open1}
        setOpen={setOpen1}
        modalHeading={modalHeading}
        modalText={modalText}
      />
      <ConfirmDialog
        open={open2}
        setOpen={setOpen2}
        modalHeading={modalHeading}
        modalText={modalText}
        confirmFunction={submitComplaint}
      />
        </div>
    )
}