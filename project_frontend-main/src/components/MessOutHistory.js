import axios from "axios"
import { useState,useContext,useEffect } from "react"
import { baseUrl } from "../baseUrl"
import { UserContext } from "../Contexts/UserContext"
import ConfirmDialog from '../components/ConfirmDialog'
function MessOutHistory({seteditPrevMessout_id,setEditPrevToDate,setEditPrevFromDate,seteditPrevData,messOutHistory,setMessOutHistory,isEmpty,setIsEmpty,setnoofkdaybefore,setNoofDays,setnoofMaxmessoutDays,setnoOfMaxMessOutsinMonth}) {

  const {user,setLoading}=useContext(UserContext)

  const [open1, setOpen1] = useState(false);
  const [modalHeading,setModalHeading]=useState("")
  const [modalText,setModalText]=useState("")
  const [cancelFromDate,setCancelFromDate]=useState("")
  const [cancelToDate,setCancelToDate]=useState("")
  const [user_messAttendance,setuserMessAttendance]=useState(0);
  const [tempfrom,setTempFrom]=useState("")
  const [tempto,setTempTo]=useState("")
  useEffect(() => {
    setLoading(true)
    const url=user.hostel==="MH"?`${baseUrl}/inmate/mess-requirements`:`${baseUrl}/inmate/mess-requirements-LH`;
        axios.get(url)
        .then((res)=>{
        setnoofkdaybefore(res.data.daysK[0].value)
        setNoofDays(res.data.min[0].value)
        setnoofMaxmessoutDays(res.data.max[0].value)
        setnoOfMaxMessOutsinMonth(res.data.maxinmonth[0].value)
        })
    axios.get(`${baseUrl}/inmate/messouthistory`,{params:{user_id:user.user_id}})
    .then(res=>{
      setMessOutHistory(res.data.rows)
      setuserMessAttendance(res.data.user_mess_attendance)
      if(res.data.rows.length>0){
        setIsEmpty(false)
      }
      setLoading(false)
    })
  }, [])

  const dateConverter = (inputdate)=>{
    const date=new Date(inputdate);
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
}



  const cancelMessOut = (fromdate,todate)=>{
    setLoading(true)
    axios.delete(`${baseUrl}/inmate/cancelmessout`,{
      params:{
        user_id:user.user_id,
        fromdate:fromdate,
        todate:todate
      }
    })
    .then(res=>{
      console.log(res)
      setMessOutHistory(messOutHistory.filter(item=>item.fromdate!=tempfrom && item.todate!=tempto))
      setLoading(false)
    })
  }

  const today = ()=>{
    const date=new Date();
    return date.getTime();
  }
  const CheckDate = ()=>{
    const date=new Date();
    date.setDate(date.getDate()-15);
    console.log(date)
    return date.getTime();
  }
  
   
       return (
         <>
           <div className='w-12/12 overflow-x-scroll'>
           <h1 className="font-semibold text-black text-lg mb-3 mt-3">Mess Attendance for Month : {user_messAttendance}</h1>
             <h1 className="font-semibold text-black text-lg mb-3 mt-3">Mess Out History</h1>
             {isEmpty?<p>No MessOut History</p>:<table className='w-full relative table-auto'>
                 <tr className='rounded-xl p-3 bg-primary text-center'>
                   <th className='p-3'>Sl.No</th>
                   <th className='p-3'>From Date</th>
                   <th className='p-3'>Mess in Date</th>
                   <th className='p-3'>Number of Days</th>
                   {/* <th className='p-3'>Edit</th> */}
                 </tr>
                 {messOutHistory.map((user, index)=>{
                   var fdate=new Date(user.fromdate)
                   var actualfdate=fdate.getDate()+'/'+(fdate.getMonth()+1)+'/'+fdate.getFullYear()
                   if(user.showtodate)
                   { 
                    var tdate=new Date(user.todate)                 
                    var actualtdate=tdate.getDate()+'/'+(tdate.getMonth()+1)+'/'+tdate.getFullYear()
                    }
     

                   return(
                    <tr 
                      key={index}
                      className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}
                    >
                      <td className='p-3'>{index+1}</td>
                      <td className='p-3'>{actualfdate}</td>
                      <td className='p-3'>{user.showtodate?actualtdate:""}</td>
                      <td className='p-3'>{user.showtodate?((tdate.getTime()-fdate.getTime())/(1000 * 3600 * 24)):""}</td>
                      {/* <td className='p-3'>{user.showtodate?CheckDate()<tdate.getTime()&& today()>tdate.getTime()?<button className="submit-button-black" onClick={()=>{
                        seteditPrevMessout_id(user.messout_id);
                        seteditPrevData(true)
                        setEditPrevFromDate(fdate);
                        setEditPrevToDate(tdate)
                      }}>Edit</button>:'':''}</td> */}
                    </tr>
                 )
                })}
             </table>}
           </div>
           <ConfirmDialog open={open1} setOpen={setOpen1} modalHeading={modalHeading} modalText={modalText} confirmFunction={()=>{cancelMessOut(cancelFromDate,cancelToDate)}}/>
         </>
       )
     }


export default MessOutHistory