import {useState,useEffect} from 'react'
import MessOutForm from "./MessOutForm"
import MessOutHistory from "./MessOutHistory"
import axios from 'axios'
import MessOutFormEdit from './MessoutFormEdit'
function MessOutPage({noofkdaybefore,setnoofkdaybefore,noofDays,setNoofDays,noofMaxmessoutDays,setnoofMaxmessoutDays,noOfMaxMessOutsinMonth,setnoOfMaxMessOutsinMonth}) {
  const [messOutHistory, setMessOutHistory] = useState([])
  const [isEmpty,setIsEmpty]=useState(true)
  const [editPrevData,seteditPrevData]=useState(false);
  const [prevMessout_id,setPrevMessout_id]=useState(null);
  const [editPrevFromDate,setEditPrevFromDate]=useState();
  const [editPrevToDate,setEditPrevToDate]=useState();

  return (
     
    editPrevData?<div className='w-11/12'>
    <MessOutFormEdit prevMessout_id={prevMessout_id} setEditPrevFromDate={setEditPrevFromDate} editPrevFromDate={editPrevFromDate} editPrevToDate={editPrevToDate}  seteditPrevData={seteditPrevData} isEmpty={isEmpty} setIsEmpty={setIsEmpty} noofkdaybefore={noofkdaybefore} noofDays={noofDays} noofMaxmessoutDays={noofMaxmessoutDays} noOfMaxMessOutsinMonth={noOfMaxMessOutsinMonth} messOutHistory={messOutHistory} setMessOutHistory={setMessOutHistory}/>
    <hr/>
</div>:<div className='w-11/12'>
        <MessOutForm isEmpty={isEmpty} setIsEmpty={setIsEmpty} noofkdaybefore={noofkdaybefore} noofDays={noofDays} noofMaxmessoutDays={noofMaxmessoutDays} noOfMaxMessOutsinMonth={noOfMaxMessOutsinMonth} messOutHistory={messOutHistory} setMessOutHistory={setMessOutHistory}/>
        <hr/>
        <MessOutHistory seteditPrevMessout_id={setPrevMessout_id} setEditPrevFromDate={setEditPrevFromDate} setEditPrevToDate={setEditPrevToDate} editPrevData={editPrevData} seteditPrevData={seteditPrevData} isEmpty={isEmpty} setIsEmpty={setIsEmpty} messOutHistory={messOutHistory} setMessOutHistory={setMessOutHistory} setnoofkdaybefore={setnoofkdaybefore} setNoofDays={setNoofDays} setnoofMaxmessoutDays={setnoofMaxmessoutDays} setnoOfMaxMessOutsinMonth={setnoOfMaxMessOutsinMonth}/>
    </div>
 
  )
}

export default MessOutPage