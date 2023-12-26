import {useState,useContext, useEffect} from 'react'
import { baseUrl } from '../../baseUrl'
import axios from 'axios'
import {UserContext} from '../../Contexts/UserContext'
export default function RoomChange(){
    const [preferredRoom,setPreferredRoom]=useState("")
    const [changeReason,setChangeReason]=useState("")
    const {user,setLoading} = useContext(UserContext)

    const submitHandler = (e)=>{
        e.preventDefault();
        setLoading(true)
        axios.post(`${baseUrl}/inmate/roomchange`,{
            user_id:user.user_id,
            preferredRoom:preferredRoom,
            changeReason:changeReason
        })
        .then(res=>{
            alert("Room Change Request Submitted")
            setPreferredRoom("")
            setChangeReason("")
            setLoading(false)
        })
    }

    return(
        <div className="w-11/12">
            <h2 className="font-bold text-black mb-3">Your Room No: B214</h2>
            <form action="" onSubmit={submitHandler}>
                <div className="grid grid-cols-2 gap-y-4 w-6/12">
                <label htmlFor="">New preferred room:</label>
                <input type="text" name="" id="" placeholder="Enter preferred room" className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" value={preferredRoom} onChange={(e)=>{setPreferredRoom(e.target.value)}} required/>
                <label htmlFor="">Reason for Room Change:</label>
                <textarea name="" id="" rows="5" placeholder="Type a valid reason.." className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" value={changeReason} onChange={(e)=>{setChangeReason(e.target.value)}} required></textarea>
                </div>
                <div className="w-full flex items-end justify-end mt-5">
                    <button className="ml-auto p-3 bg-stone-800 text-white rounded-xl" type="submit">Submit Request</button>
                </div>
            </form>
        </div>
    )
}