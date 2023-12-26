import {useState,useContext} from 'react'
import {baseUrl} from '../baseUrl'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import {UserContext} from '../Contexts/UserContext'

export default function FormDialog({open,setOpen,modalText,modalHeading,field,certificateId}) {

  const [details,setDetails]=useState({})
  const [fullWidth, setFullWidth] = useState(true); 
  const {user}=useContext(UserContext)

  
  const submitForm = (e)=>{
    e.preventDefault();
    setOpen(false);
    axios.post(`${baseUrl}/inmate/applycertificate`,{...details,user_id:user.user_id,certificate_id:certificateId})
    .then(res=>{
      console.log(res)
    })

  }
  const handleClose = () => {
    setOpen(false);
  };

  
  const renderFields=()=>{
    const render=[]
    var index=0
    var fields=JSON.parse(field)
    for(var fieldKey in fields)
    {
      var radioFields=[]
      if(fields[fieldKey].type==="radio")
      {
        //pushing radio items to  radioFields array to render
        console.log("inside radio")
        for(var index in fields[fieldKey]["radioFields"])
        {
          radioFields.push(fields[fieldKey]["radioFields"][index])
        }

        console.log(radioFields)
      }

      render.push(fields[fieldKey].type==="radio"?
      (
        <div className='w-full space-x-4 py-2 flex flex-row items-center '>
          <label className='font-bold text-stone-800'>{fields[fieldKey].label}</label>
          {radioFields.map((item, key)=>(
            <div key={key} className='flex space-x-2 flex-row items-center'>
              <input 
                type="radio" 
                name={fields[fieldKey].name}  
                value={item} 
                className=""
                onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}}
              />
              <label >{item}</label>
            </div>
          ))}
        </div>
      )
      :
      (<div className='w-full space-y-2 py-2 flex flex-col'>
        <label className='font-bold text-stone-800'>{fields[fieldKey].label}</label>
        <div className='flex flex-row space-x-2 items-center'>
        {fields[fieldKey].tag=="input"&&(
            <input 
              className='w-full py-2 px-3 rounded-xl ring-2 ring-slate-200 focus:outline-none' 
              name={fields[fieldKey].name} 
              type={fields[fieldKey].type}
              onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}}
            />)
          }

          {fields[fieldKey].tag=="textarea"&&(
            <textarea 
              className='w-full py-2 px-3 rounded-xl ring-2 ring-slate-200 focus:outline-none' 
              name={fields[fieldKey].name} 
              onChange={(e)=>{setDetails({...details,[e.target.name]:e.target.value})}}
              // type={fields[fieldKey].type}
            />)
          }
        </div>
      </div>))

      index+=1
    }
    return (<div className='w-full overflow-y-auto flex flex-col px-3'>
      {render.map(inputDiv=>inputDiv)}
    <div className='flex items-center justify-end mt-3'>
      <button type="submit" onSubmit={submitForm} className='submit-button-black'>Submit</button>
    </div>
    
    </div>)

  }

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={fullWidth}
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title" className='text-black font-semibold flex items-center justify-between capitalize'>
          {modalHeading}
          <CloseIcon className="cursor-pointer" onClick={handleClose}/>
        </DialogTitle>
        <DialogContent className="w-full">
        <form action="" onSubmit={submitForm}className="w-full">
            {renderFields()}
        </form>
        </DialogContent>
          
      </Dialog>
  );
}
