import { useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
function MessManagementWarden(){

    const submitHandler=()=>{

    }
    const[isEdit,setIsEdit]=useState();
    const[noofDays,setNoofDays]=useState();
    return(
        <div className="flex items-center mt-5 mb-5">
        <p className="font-semibold">Minimum Number of Days for Mess Out: 
          {isEdit?<input type="number" min="1" max="100" className="border-solid border-2 rounded-lg ml-3 p-1 w-20" 
            value={noofDays} onChange={(e)=>{setNoofDays(e.target.value)}}/>:<span className="ml-3">{noofDays}</span>}
        </p>
        {!isEdit?<button className="submit-button-black ml-5" onClick={()=>{setIsEdit(!isEdit)}}><EditIcon/> Edit</button>:
        <button className="submit-button-black text-sm ml-5" onClick={submitHandler}><CheckIcon className="text-sm"/> Confirm</button>}
     </div>
    )
}

export default MessManagementWarden